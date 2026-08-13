"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** World radius - larger = bigger sphere + matching orbit rings */
const R = 1.28;
/** Icosphere subdivision: denser = more plexus edges */
const ICOSA_DETAIL = 3;

/** used if CSS vars are unavailable at runtime */
const THEME_PRIMARY = "#8c52ff";
const THEME_SECONDARY = "#8fe0ff";

function hexToVec3(hex: string): THREE.Vector3 {
  const m = hex.replace(/^#/, "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return new THREE.Vector3(0.09, 0.22, 1);
  return new THREE.Vector3(
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  );
}

function themeColorVec3(varName: string, fallbackHex: string): THREE.Vector3 {
  if (typeof window === "undefined") return hexToVec3(fallbackHex);
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return hexToVec3(fallbackHex);
  const hex = raw.match(/#[0-9a-fA-F]{6}/)?.[0];
  if (hex) return hexToVec3(hex);
  const rgb = raw.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/,
  );
  if (rgb) {
    return new THREE.Vector3(+rgb[1] / 255, +rgb[2] / 255, +rgb[3] / 255);
  }
  return hexToVec3(fallbackHex);
}

function vec3ToColor(v: THREE.Vector3): THREE.Color {
  return new THREE.Color(v.x, v.y, v.z);
}

function createOrbitRing(
  radius: number,
  segments: number,
  material: THREE.LineBasicMaterial,
): THREE.LineLoop {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(t) * radius, Math.sin(t) * radius, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.LineLoop(geo, material);
}

export default function SphereObject() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const primaryV = themeColorVec3("--color-primary", THEME_PRIMARY);
    const secondaryV = themeColorVec3("--color-secondary", THEME_SECONDARY);
    const colorPrimary = vec3ToColor(primaryV);
    const colorSecondary = vec3ToColor(secondaryV);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.75);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className =
      "absolute inset-0 block h-full w-full touch-none";
    container.appendChild(renderer.domElement);

    const icosaGeo = new THREE.IcosahedronGeometry(R, ICOSA_DETAIL);
    const wireGeo = new THREE.WireframeGeometry(icosaGeo);

    const lineMat = new THREE.LineBasicMaterial({
      color: colorPrimary,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
    });

    const wireframe = new THREE.LineSegments(wireGeo, lineMat);

    const pointMat = new THREE.PointsMaterial({
      color: colorSecondary,
      transparent: true,
      opacity: 0.82,
      size: 2,
      sizeAttenuation: false,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
    });

    const nodes = new THREE.Points(icosaGeo, pointMat);

    const ringMat = new THREE.LineBasicMaterial({
      color: colorPrimary.clone().lerp(colorSecondary, 0.35),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
    });

    const ringRadii = [R * 1.1, R * 1.22, R * 1.34];
    const orbitGroup = new THREE.Group();
    const ringGeos: THREE.BufferGeometry[] = [];

    const r0 = createOrbitRing(ringRadii[0], 112, ringMat);
    r0.rotation.x = Math.PI / 2;
    orbitGroup.add(r0);
    ringGeos.push(r0.geometry as THREE.BufferGeometry);

    const r1 = createOrbitRing(ringRadii[1], 112, ringMat);
    r1.rotation.y = Math.PI / 3.2;
    r1.rotation.x = Math.PI / 2.45;
    orbitGroup.add(r1);
    ringGeos.push(r1.geometry as THREE.BufferGeometry);

    const r2 = createOrbitRing(ringRadii[2], 112, ringMat);
    r2.rotation.z = Math.PI / 4.1;
    r2.rotation.x = Math.PI / 2.15;
    r2.rotation.y = -Math.PI / 5.5;
    orbitGroup.add(r2);
    ringGeos.push(r2.geometry as THREE.BufferGeometry);

    const group = new THREE.Group();
    group.rotation.order = "XYZ";
    group.rotation.x = 0;
    group.rotation.y = 0.35;
    group.add(wireframe);
    group.add(nodes);
    group.add(orbitGroup);
    scene.add(group);

    const disposables: Array<THREE.BufferGeometry | THREE.Material> = [
      icosaGeo,
      wireGeo,
      lineMat,
      pointMat,
      ringMat,
      ...ringGeos,
    ];

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      group.rotation.y += 0.0018;
      renderer.render(scene, camera);
    };
    tick();

    const setSize = () => {
      const w = container.clientWidth;
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const pr = Math.min(renderer.getPixelRatio(), 2);
      pointMat.size = Math.min(3.2, 1.75 * pr);
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      for (const d of disposables) {
        d.dispose();
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-h-[min(40vh,360px)] max-w-[min(100%,360px)] overflow-hidden pointer-events-none lg:mx-0 lg:max-h-[min(52vh,740px)] lg:max-w-[min(100%,740px)]"
      aria-hidden
    />
  );
}
