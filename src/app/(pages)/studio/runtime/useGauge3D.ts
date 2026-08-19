"use client";

import { useEffect } from "react";
import { getGauge } from "./gauge";

/**
 * The metrics gyroscope, in WebGL.
 *
 * A three-ring gimbal with a spin axis through it — the instrument an aircraft
 * measures with, tying this section to the aeroplane. Built from primitives,
 * wearing the aeroplane's materials exactly, so the two read as one kit.
 *
 * Motion runs on two clocks: the outer gimbal is the scroll's, turning a
 * quarter-revolution per metric and eased toward its target; the inner rings
 * precess on wall time, so the instrument stays alive while the reader holds
 * still. Reduced motion leaves only the scroll clock.
 *
 * Idles offscreen and in hidden tabs, repainting once on resize.
 */
export function useGauge3D(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      cam.position.set(0.6, 0.55, 4.6);
      cam.lookAt(0, 0, 0);

      /* ---- lighting: the aeroplane's rig ------------------------------ */
      scene.add(new THREE.AmbientLight(0x8899ff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(4, 6, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0x8c52ff, 30, 26);
      rim.position.set(-5, -3, -4);
      scene.add(rim);
      const fill = new THREE.PointLight(0x6a7cff, 14, 24);
      fill.position.set(5, -1, 4);
      scene.add(fill);

      /* ---- materials: the aeroplane's hull ---------------------------- */
      const body = new THREE.MeshStandardMaterial({
        color: 0x1a2348,
        metalness: 0.55,
        roughness: 0.38,
        emissive: 0x1a2348,
        emissiveIntensity: 1.15,
      });
      const edge = new THREE.LineBasicMaterial({
        color: 0xbdeeff,
        transparent: true,
        opacity: 0.75,
      });
      const tip = new THREE.MeshBasicMaterial({ color: 0xbdeeff });

      /* ---- the gimbal -------------------------------------------------- */
      // A cyan rim line just outside a torus tube, so every ring carries the
      // same lit-edge signature as the airframe's panels.
      const rimLine = (r: number) => {
        const pts: import("three").Vector3[] = [];
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        return new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          edge,
        );
      };
      const ring = (r: number, tube: number) => {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.TorusGeometry(r, tube, 18, 96), body));
        // On the outer equator, a hair above the metal: the aeroplane draws
        // its edges on the surface, and a line floated off the tube reads as
        // a detached halo rather than a lit rim. The 1.06 is only there to
        // keep the line from z-fighting the torus it sits on.
        g.add(rimLine(r + tube * 1.06));
        return g;
      };

      const outer = new THREE.Group();
      const mid = new THREE.Group();
      const inner = new THREE.Group();
      scene.add(outer);
      outer.add(ring(1.0, 0.03));
      outer.add(mid);
      mid.add(ring(0.8, 0.026));
      mid.rotation.x = Math.PI / 2; // gimbal axes start orthogonal
      mid.add(inner);
      inner.add(ring(0.62, 0.022));
      inner.rotation.y = Math.PI / 2;

      // The spin axis: a rod through the innermost ring with cyan tips — the
      // part of a gyroscope that actually holds its direction.
      const axis = new THREE.Group();
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 1.5, 12),
        body,
      );
      axis.add(rod);
      const tipGeo = new THREE.SphereGeometry(0.045, 16, 12);
      const t1 = new THREE.Mesh(tipGeo, tip);
      t1.position.y = 0.75;
      const t2 = new THREE.Mesh(tipGeo, tip);
      t2.position.y = -0.75;
      axis.add(t1, t2);
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 14), body);
      axis.add(hub);
      inner.add(axis);

      // A resting tilt, so the assembly presents three-quarter on arrival the
      // way the aircraft does, instead of flat-on like a diagram.
      scene.rotation.set(0.42, -0.35, 0.08);

      /* ---- sizing ------------------------------------------------------ */
      const applySize = () => {
        const w = Math.round(canvas.clientWidth);
        const h = Math.round(canvas.clientHeight);
        if (!w || !h) return;
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio || 1, w < 700 ? 1.3 : 1.6),
        );
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        renderer.render(scene, cam);
      };
      const ro = new ResizeObserver(applySize);
      ro.observe(canvas);
      applySize();

      /* ---- loop -------------------------------------------------------- */
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
      };
      document.addEventListener("visibilitychange", onVis);

      let shown = 0; // eased copy of the scroll progress
      let raf = 0;
      const draw = (t: number) => {
        // The scroll clock: chase the target rather than jumping to it, so a
        // fast wheel flick lands with follow-through instead of a snap.
        shown += (getGauge() - shown) * 0.09;
        outer.rotation.z = -shown * Math.PI * 1.5;

        // The idle clock: slow precession, held off under reduced motion.
        if (!reduced) {
          const s = t * 0.001;
          mid.rotation.z = Math.sin(s * 0.31) * 0.5 + s * 0.11;
          inner.rotation.x = s * 0.23;
          axis.rotation.y = s * 1.7; // the rotor itself spins fastest
        }

        renderer.render(scene, cam);
      };
      const tick = (t: number) => {
        raf = requestAnimationFrame(tick);
        if (!inView || !tabVisible) return;
        draw(t);
      };
      raf = requestAnimationFrame(tick);

      teardown = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose();
        });
        body.dispose();
        edge.dispose();
        tip.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [canvasRef]);
}
