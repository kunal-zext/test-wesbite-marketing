"use client";

import { useEffect } from "react";
import { setPointerPower } from "./pointer";

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

/**
 * Domain-warped simplex FBM, lit as if it were a surface: a fake normal from
 * the warp gradient drives diffuse, specular and fresnel terms, then the accent
 * colour is added on top. The pointer pushes the field outward, which is what
 * makes it read as fluid rather than as a moving texture.
 */
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uPow;
uniform float uInt; uniform vec3 uAcc;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float s = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++){ s += a * snoise(p); p = p * 2.04 + vec2(1.7, 9.2); a *= 0.5; }
  return s;
}

void main(){
  vec2 uv = vUv;
  float asp = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2((uv.x - 0.5) * asp, uv.y - 0.5);
  vec2 mp = vec2((uMouse.x - 0.5) * asp, uMouse.y - 0.5);
  vec2 dv = p - mp;
  float d = length(dv);
  float infl = exp(-d * 3.4) * uPow;
  p += normalize(dv + vec2(0.0001)) * infl * 0.20;

  float t = uTime * 0.05;
  vec2 sp = p * 1.5;
  vec2 q = vec2(fbm(sp + vec2(0.0, t)), fbm(sp + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(fbm(sp + 1.8*q + vec2(1.7, 9.2) + t*1.6), fbm(sp + 1.8*q + vec2(8.3, 2.8) - t*1.2));
  float f = fbm(sp + 2.2 * r);

  vec3 n = normalize(vec3(r.x * 1.1, r.y * 1.1, 1.0));
  vec3 L = normalize(vec3(0.4, 0.75, 0.55));
  float diff = clamp(dot(n, L), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 24.0);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 3.0);

  vec3 col = mix(vec3(0.020,0.021,0.026), vec3(0.062,0.066,0.075), smoothstep(-1.0, 1.2, f));

  col += uAcc * pow(diff, 3.0) * 0.10 * uInt;
  col += uAcc * spec * 0.75 * uInt;
  col += uAcc * fres * 0.05 * uInt;

  float c1 = abs(fract(f * 2.0 + uTime * 0.015) - 0.5) * 2.0;
  col += uAcc * smoothstep(0.93, 1.0, c1) * 0.09 * uInt;
  col += uAcc * infl * 0.50 * uInt;
  col += vec3(1.0) * pow(infl, 2.2) * 0.12;

  float vg = smoothstep(1.35, 0.20, length(vec2((uv.x - 0.5) * asp, uv.y - 0.5)));
  col *= mix(0.45, 1.05, vg);

  gl_FragColor = vec4(col, 1.0);
}
`;

type FluidOptions = {
  /** 0–2. Scales how strongly the accent colour reads against the base. */
  intensity?: number;
  accent: string;
};

/**
 * Mounts the hero shader onto a canvas.
 *
 * `three` is imported dynamically so its ~600KB never lands in the page's
 * initial JS — it is fetched only for pointer-capable, motion-tolerant visitors
 * once the canvas exists. The loop caps devicePixelRatio at 1.6 and stops
 * entirely when the canvas scrolls offscreen or the tab is hidden, so the GPU
 * is idle for most of the page.
 */
export function useFluid(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { intensity = 1, accent }: FluidOptions,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        });
      } catch {
        // No WebGL: the CSS radial gradient behind the canvas is the fallback.
        canvas.style.display = "none";
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const cam = new THREE.Camera();
      const uniforms = {
        uRes: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.55) },
        uPow: { value: 0 },
        uInt: { value: intensity },
        uAcc: { value: new THREE.Color(accent) },
      };
      scene.add(
        new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.ShaderMaterial({
            uniforms,
            vertexShader: VERT,
            fragmentShader: FRAG,
          }),
        ),
      );

      let last = performance.now();

      const applySize = () => {
        const w = Math.round(canvas.clientWidth);
        const h = Math.round(canvas.clientHeight);
        // Mid-layout the element can report zero; writing that would blank the
        // buffer and set an aspect ratio of NaN.
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        uniforms.uRes.value.set(w * dpr, h * dpr);
        /*
         * Resizing the drawing buffer clears it to black. If the loop happens to
         * be paused at that moment — offscreen, or the tab in the background —
         * nothing would ever repaint it and the hero would stay solid black, so
         * draw one frame here rather than waiting for the next animation frame.
         */
        renderer.render(scene, cam);
      };

      /*
       * ResizeObserver on the canvas, not a window resize listener: it reports
       * the settled post-layout size, and it also catches size changes that come
       * from the layout rather than the window — which a resize listener misses
       * entirely. The old code ran once before layout had settled and left the
       * buffer at 1351x741 while the element displayed at 1351x767.
       */
      const ro = new ResizeObserver(applySize);
      ro.observe(canvas);
      applySize();

      const target = { x: 0.5, y: 0.55 };
      const cur = { x: 0.5, y: 0.55 };
      let power = 0;
      let targetPower = 0;
      let lastMove = 0;
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
        targetPower = 1;
        lastMove = performance.now();
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      /*
       * Two independent reasons to idle, tracked separately.
       *
       * Collapsing them into one flag is what stopped the fluid for good after a
       * tab switch: hiding the tab set the flag false, and nothing could set it
       * back, because the IntersectionObserver only fires when the intersection
       * actually changes — and returning to the tab does not change it.
       */
      let inView = true;
      let tabVisible = !document.hidden;

      const io = new IntersectionObserver(
        (entries) => {
          inView = entries[0].isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      const onVis = () => {
        tabVisible = !document.hidden;
        if (tabVisible) {
          // Coming back, restart the clock so the paused interval does not land
          // as one huge dt, and repaint now instead of waiting a frame.
          last = performance.now();
          renderer.render(scene, cam);
        }
      };
      document.addEventListener("visibilitychange", onVis);

      let raf = 0;
      let t = 0;
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(50, now - last);
        last = now;
        if (!inView || !tabVisible) return;
        t += dt * 0.001;
        if (now - lastMove > 220) targetPower = 0;
        power += (targetPower - power) * 0.055;
        // Published so the headline's 3D separation tracks the same energy.
        setPointerPower(power);
        cur.x += (target.x - cur.x) * 0.075;
        cur.y += (target.y - cur.y) * 0.075;
        uniforms.uTime.value = t;
        uniforms.uMouse.value.set(cur.x, cur.y);
        uniforms.uPow.value = power;
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(loop);

      teardown = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [canvasRef, intensity, accent]);
}
