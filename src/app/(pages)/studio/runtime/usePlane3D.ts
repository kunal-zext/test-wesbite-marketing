"use client";

import { useEffect } from "react";
import { getAssembly } from "./assembly";

/**
 * The section 04 aeroplane, in WebGL.
 *
 * The airframe is generated, not modelled — there is no asset to download. Two
 * builders do all the work:
 *
 *   lathe()  revolves a radius profile to make fuselage sections and engine
 *            ducts, so the hull is a continuous curved surface rather than a
 *            faceted cylinder.
 *   panel()  extrudes a tapered, swept planform to make wings, tailplanes, the
 *            fin and the winglets, each with a bevelled edge that catches the
 *            key light the way a real aerofoil does.
 *
 * `three` is already fetched for the hero shader, so this shares that chunk and
 * adds nothing to the network.
 *
 * Every part carries a home transform and a scatter transform; the frame loop
 * lerps between them by `k` from the assembly store, then applies `fly` to the
 * whole group. Solid bodies get a wireframe overlay at a threshold high enough
 * to skip the tessellation seams, so only true structural edges draw and the
 * aircraft reads as a technical drawing rather than a product render.
 *
 * The loop idles whenever the canvas is offscreen or the tab is in the
 * background, and repaints once on resize — the same discipline as the hero, so
 * a second context costs nothing while you are elsewhere on the page.
 */

type PartSpec = {
  /** Home transform: where the piece sits on the finished aircraft. */
  pos: [number, number, number];
  rot?: [number, number, number];
  /** Where it drifts to when fully scattered, and how it tumbles getting there. */
  scatter: [number, number, number];
  spin: [number, number, number];
};

export function usePlane3D(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      // Pixel ratio is set in applySize, where the canvas width is known.

      const scene = new THREE.Scene();
      /*
       * A long lens — 26°, where a hero shot would use 38. The canvas spans the
       * whole section now and the aircraft spends most of its time well off
       * centre, and a wide lens shears whatever it renders near the frame edge.
       * Winding the focal length in and the camera back keeps the airframe
       * square to the viewer wherever it happens to be on the page.
       */
      const FOV = 26;
      const cam = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
      const EYE = new THREE.Vector3(0.125, 0.22, 0.967); // unit; the viewing angle
      // The airframe's visual mass sits slightly below and behind the origin
      // (wings and belly pod hang under it), so aim a little low of centre.
      const AIM = new THREE.Vector3(0, -0.35, 0);
      /*
       * Framed by width rather than parked at a fixed distance. The canvas is
       * now the section, so its aspect is whatever the viewport makes it, and a
       * fixed distance would size the aircraft differently on every screen.
       * These are the world widths the frame spans, so it holds the same share
       * of the page everywhere.
       *
       * It still dollies between the two: scattered, the parts occupy roughly
       * twice the volume the assembled aircraft does, and a framing that suits
       * one crops the other. Pulling back as it comes apart also sells the
       * shot — the aircraft grows into frame as it builds itself.
       */
      const HALF_ANGLE = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      /*
       * Read off the container rather than fixed here. The section rearranges
       * at 1000px — the aircraft goes from a wide canvas it shares with the
       * copy to a narrow band of its own — and the framing that suits one is
       * useless for the other. The layout owns that decision, so it declares
       * it; see --plane-frame and --plane-rest in the stylesheet.
       */
      let frameAssembled = 26;
      let frameScattered = 31;
      let restFrac = 0.6;
      const readLayout = () => {
        const cs = getComputedStyle(canvas);
        const f = Number.parseFloat(cs.getPropertyValue("--plane-frame"));
        const r = Number.parseFloat(cs.getPropertyValue("--plane-rest"));
        if (Number.isFinite(f) && f > 0) {
          frameAssembled = f;
          // Scattered needs about a fifth more room whatever the framing is.
          frameScattered = f * 1.19;
        }
        if (Number.isFinite(r)) restFrac = r;
      };
      readLayout();
      /*
       * Distance at which the frame spans `w` across. The floor keeps enough
       * vertical room for the stage-five climb on very wide, short sections,
       * where framing on width alone would put the top of the arc off screen.
       */
      const distFor = (w: number) =>
        Math.max(w / (2 * cam.aspect * HALF_ANGLE), 3.6 / HALF_ANGLE);
      cam.position.copy(EYE).multiplyScalar(distFor(frameAssembled));
      cam.lookAt(AIM);

      /* ---- lighting ---------------------------------------------------- */
      scene.add(new THREE.AmbientLight(0x8899ff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(4, 6, 5);
      scene.add(key);
      // Rim in brand purple, from behind and below, to pick out the silhouette.
      const rim = new THREE.PointLight(0x8c52ff, 34, 26);
      rim.position.set(-5, -3, -4);
      scene.add(rim);
      const fill = new THREE.PointLight(0x6a7cff, 16, 24);
      fill.position.set(5, -1, 4);
      scene.add(fill);

      /* ---- materials --------------------------------------------------- */
      /*
       * The page background is near-black, so a dark hull disappears into it.
       * The body is lit a good way up from the section's own surface tone and
       * the edges run brighter than --acc, which is tuned for text on flat
       * background rather than for a line sitting on top of a lit solid.
       *
       * DoubleSide because the ducts and aerofoils are open or mirrored shells;
       * back-face culling would punch holes in them from some angles.
       */
      const body = new THREE.MeshStandardMaterial({
        color: 0x2b2560,
        metalness: 0.55,
        roughness: 0.38,
        emissive: 0x3d2b8a,
        emissiveIntensity: 0.55,
        // Opaque: the departure no longer fades, so there is nothing to animate
        // here and no reason to pay for a transparent pass every frame.
        side: THREE.DoubleSide,
      });
      const wire = new THREE.LineBasicMaterial({
        color: 0xc9baff,
        transparent: true,
        opacity: 0.8,
      });

      /* ---- the aircraft ------------------------------------------------ */
      const group = new THREE.Group();
      /*
       * YZX so the three rotation terms read as an aircraft's own axes: roll
       * about the fuselage is applied first, then pitch, then heading. Under
       * the default XYZ the roll term is a world-axis spin, which skews the
       * stage-five turn instead of banking into it.
       */
      group.rotation.order = "YZX";
      scene.add(group);

      const parts: Array<{
        obj: import("three").Group;
        home: import("three").Vector3;
        homeRot: import("three").Euler;
        scatter: import("three").Vector3;
        spin: import("three").Euler;
      }> = [];

      const add = (geo: import("three").BufferGeometry, spec: PartSpec) => {
        const holder = new THREE.Group();
        holder.add(new THREE.Mesh(geo, body));
        // 30° threshold: high enough to skip the lathe's radial seams and the
        // extrusion's bevel facets, low enough to keep every real corner.
        holder.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), wire));
        group.add(holder);
        parts.push({
          obj: holder,
          home: new THREE.Vector3(...spec.pos),
          homeRot: new THREE.Euler(...(spec.rot ?? [0, 0, 0])),
          scatter: new THREE.Vector3(...spec.scatter),
          spin: new THREE.Euler(...spec.spin),
        });
      };

      /* ---- geometry builders ------------------------------------------- */

      /**
       * Revolve a radius profile and lay the axis along +X (nose forward).
       * Profile entries are [radius, station], station running aft → forward
       * about the piece's own centre so the home position places it.
       */
      const lathe = (profile: Array<[number, number]>, seg = 28) => {
        const g = new THREE.LatheGeometry(
          profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.001), y)),
          seg,
        );
        g.rotateZ(-Math.PI / 2);
        return g;
      };

      /*
       * Sections are lapped, not butted. A lathe is an open tube, and the
       * material is DoubleSide, so two sections meeting end to end show the
       * dark inside of the tube as a ring at every joint — which is what made
       * the hull read as a stack of segments rather than one body. Each section
       * carries a constant-radius collar continuing aft, and each section aft
       * is a hair wider than the one it receives, so the joint is shingled the
       * way a real fuselage is and no open rim is ever left facing the camera.
       */
      const LAP = 0.12;

      /** A fuselage section tapering smoothly between two radii. */
      const section = (
        len: number,
        rAft: number,
        rFwd: number,
        lap = LAP,
        steps = 8,
      ) => {
        const pts: Array<[number, number]> = [];
        if (lap > 0) pts.push([rAft, -len / 2 - lap]);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          // Smoothstep the taper so sections meet without a visible crease.
          const e = t * t * (3 - 2 * t);
          pts.push([rAft + (rFwd - rAft) * e, -len / 2 + len * t]);
        }
        return lathe(pts);
      };

      /** The nose, on an ogive curve rather than a straight cone. */
      const nose = (len: number, r: number, lap = LAP, steps = 10) => {
        const pts: Array<[number, number]> = [];
        if (lap > 0) pts.push([r, -len / 2 - lap]);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          pts.push([r * Math.pow(1 - t, 0.62), -len / 2 + len * t]);
        }
        return lathe(pts);
      };

      /**
       * A tapered, swept aerofoil panel. Chord runs along X (nose +), span
       * along Z, thickness along Y. `side` mirrors it for the opposite wing —
       * the point order reverses with it so the winding stays outward.
       */
      const panel = (o: {
        span: number;
        root: number;
        tip: number;
        sweep: number;
        thick: number;
        side: 1 | -1;
      }) => {
        const { span, root, tip, sweep, thick, side } = o;
        const pts: Array<[number, number]> = [
          [root / 2, 0], // root leading edge
          [root / 2 - sweep, span], // tip leading edge
          [root / 2 - sweep - tip, span], // tip trailing edge
          [-root / 2, 0], // root trailing edge
        ];
        const use =
          side < 0
            ? pts.map(([x, y]) => [x, -y] as [number, number]).reverse()
            : pts;
        const shape = new THREE.Shape(
          use.map(([x, y]) => new THREE.Vector2(x, y)),
        );
        const g = new THREE.ExtrudeGeometry(shape, {
          depth: thick,
          bevelEnabled: true,
          bevelThickness: thick * 0.34,
          bevelSize: thick * 0.5,
          bevelSegments: 2,
          curveSegments: 1,
        });
        g.translate(0, 0, -thick / 2);
        g.rotateX(-Math.PI / 2);
        return g;
      };

      /** The same planform stood upright, for the fin and the winglets. */
      const finPanel = (o: Parameters<typeof panel>[0]) => {
        const g = panel(o);
        g.rotateX(Math.PI / 2);
        return g;
      };

      /**
       * An engine nacelle: a duct with a lipped intake, made by lathing the
       * outer skin forward-to-aft and the inner skin back again.
       */
      const duct = (len: number, r: number) => {
        const h = len / 2;
        return lathe([
          [r, h],
          [r * 1.14, h * 0.55],
          [r * 1.13, -h * 0.3],
          [r * 0.9, -h],
          [r * 0.79, -h],
          [r * 0.94, -h * 0.3],
          [r * 0.95, h * 0.55],
          [r * 0.92, h],
        ]);
      };

      /** A low blister — the canopy and the belly pod are the same shape. */
      const blister = (sx: number, sy: number, sz: number) => {
        const g = new THREE.SphereGeometry(1, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        g.scale(sx, sy, sz);
        return g;
      };

      /* ---- the parts ---------------------------------------------------- */

      /*
       * Fuselage, nose at +X, running -3.4 → +3.5. Radii step outward by 0.006
       * per joint going aft — invisible at 1.5% of the radius, but enough that
       * each section is unambiguously received by the one behind it.
       */
      add(nose(1.0, 0.394), {
        pos: [3.0, 0, 0],
        scatter: [2.6, 2.2, 1.4],
        spin: [0.9, 1.4, 0.6],
      });
      add(section(1.1, 0.454, 0.4), {
        pos: [1.95, 0, 0],
        scatter: [1.4, -2.6, 2.2],
        spin: [-1.1, 0.7, 1.3],
      });
      add(section(1.6, 0.46, 0.46), {
        pos: [0.6, 0, 0],
        scatter: [-1.8, 2.8, -1.6],
        spin: [0.6, -1.2, 0.9],
      });
      // No collar: this one receives the tailcone rather than entering anything.
      add(section(1.4, 0.406, 0.466, 0), {
        pos: [-0.9, 0, 0],
        scatter: [2.4, -1.6, -2.4],
        spin: [1.3, 0.9, -0.8],
      });
      /*
       * The tailcone sweeps up, the way it does on anything with a rear door.
       * The rotation has to hinge on the joint, though, not on the section's
       * own centre — a part rotates about its position, so spinning it about
       * the middle lifts the forward face as well and leaves a step where it
       * meets the barrel (0.208 on a hull of radius 0.4, so half a radius out).
       *
       * Shifting the geometry until its forward end sits on the local origin
       * makes the home position the hinge, so the joint stays put and only the
       * aft end rises.
       *
       * This one is butted rather than lapped, unlike the joints forward of it.
       * Overlapping a tilted cone means shrinking it until its low side clears
       * the hull it enters, and the leftover annulus shows as a step. Butting
       * at the hinge costs nothing instead: the tilt contributes no offset at
       * the hinge station itself, so 0.400 meets 0.406 concentrically and the
       * surfaces leave tangent. The crease appears only aft of the joint, which
       * is exactly where an upswept tail should have one.
       */
      const TAILCONE_LEN = 1.8;
      const tailcone = section(TAILCONE_LEN, 0.05, 0.4, 0);
      tailcone.translate(-TAILCONE_LEN / 2, 0, 0);
      add(tailcone, {
        pos: [-1.6, 0, 0],
        rot: [0, 0, -0.13],
        scatter: [-3.0, -2.4, 1.2],
        spin: [-0.8, 1.6, 1.1],
      });

      // Canopy and belly fairing.
      // Long and shallow: a taller dome sits proud of the spine and reads as a
      // block bolted to the roof rather than a windscreen fairing.
      add(blister(0.92, 0.15, 0.3), {
        pos: [2.0, 0.29, 0],
        scatter: [2.8, 2.6, -1.8],
        spin: [1.4, -0.8, 1.0],
      });
      add(blister(0.78, 0.22, 0.4), {
        pos: [0.72, -0.46, 0],
        rot: [Math.PI, 0, 0],
        scatter: [0.6, -3.0, 1.8],
        spin: [-1.5, 0.6, -0.9],
      });

      // Wings. Root chord 2.3 tapering to 0.8 at the tip over 3.3 of span.
      const WING = { span: 3.3, root: 2.3, tip: 0.8, sweep: 1.45, thick: 0.13 };
      add(panel({ ...WING, side: 1 }), {
        pos: [0.3, -0.14, -0.36],
        rot: [0, 0, 0.03],
        scatter: [-1.2, 3.0, 3.2],
        spin: [1.2, -0.9, 1.4],
      });
      add(panel({ ...WING, side: -1 }), {
        pos: [0.3, -0.14, 0.36],
        rot: [0, 0, 0.03],
        scatter: [1.6, -3.2, -3.0],
        spin: [-1.4, 1.1, -1.2],
      });

      // Winglets, canted outboard off each tip.
      const TIP = { span: 0.62, root: 0.78, tip: 0.42, sweep: 0.34, thick: 0.09 };
      add(finPanel({ ...TIP, side: 1 }), {
        pos: [-0.72, -0.09, -3.62],
        rot: [-0.34, 0, 0],
        scatter: [-2.0, 2.6, -3.4],
        spin: [1.5, 0.8, -1.1],
      });
      add(finPanel({ ...TIP, side: 1 }), {
        pos: [-0.72, -0.09, 3.62],
        rot: [0.34, 0, 0],
        scatter: [2.2, -2.4, 3.4],
        spin: [-1.3, -1.0, 1.2],
      });

      /*
       * Engines. Outboard at roughly half span and well under the wing: any
       * closer in and the near nacelle projects straight over the nose from
       * this camera angle, reading as a ring around the fuselage.
       */
      add(duct(1.05, 0.28), {
        pos: [0.78, -0.6, -1.85],
        scatter: [3.2, 1.4, 2.6],
        spin: [0.9, 1.5, -1.0],
      });
      add(duct(1.05, 0.28), {
        pos: [0.78, -0.6, 1.85],
        scatter: [-2.8, 1.8, -2.2],
        spin: [-1.2, -1.3, 0.8],
      });
      // Pylons bridge nacelle to wing, so they start at the engine's crown.
      const PYLON = { span: 0.5, root: 0.78, tip: 0.6, sweep: 0.1, thick: 0.09 };
      add(finPanel({ ...PYLON, side: -1 }), {
        pos: [0.66, -0.62, -1.85],
        scatter: [1.0, 2.4, 1.2],
        spin: [1.6, 0.4, 1.2],
      });
      add(finPanel({ ...PYLON, side: -1 }), {
        pos: [0.66, -0.62, 1.85],
        scatter: [-1.4, -2.0, -1.4],
        spin: [-0.7, 1.7, -1.5],
      });

      /*
       * Empennage. Both surfaces root into the tailcone, which is now both
       * rising and narrowing along its length, so the stations are taken off
       * the hull rather than guessed: at x -2.45 the axis has climbed to 0.110
       * and the radius is down to 0.196, and at x -2.35 they are 0.097/0.225.
       * Rooting on the axis rather than the crown keeps the join buried under
       * the skin from every angle instead of floating off the spine.
       */
      const TAIL = { span: 1.35, root: 1.0, tip: 0.42, sweep: 0.6, thick: 0.09 };
      add(panel({ ...TAIL, side: 1 }), {
        pos: [-2.45, 0.11, -0.14],
        rot: [0, 0, -0.06],
        scatter: [-2.2, 2.0, 2.8],
        spin: [1.1, -1.4, 0.7],
      });
      add(panel({ ...TAIL, side: -1 }), {
        pos: [-2.45, 0.11, 0.14],
        rot: [0, 0, -0.06],
        scatter: [-2.6, -1.4, -2.6],
        spin: [-1.0, 1.2, -1.1],
      });
      add(
        finPanel({ span: 1.5, root: 1.35, tip: 0.5, sweep: 0.88, thick: 0.1, side: 1 }),
        {
          pos: [-2.35, 0.1, 0],
          rot: [0, 0, -0.09],
          scatter: [-1.0, 3.2, -1.0],
          spin: [0.8, 1.0, 1.6],
        },
      );

      /* ---- pointer parallax -------------------------------------------- */
      const point = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        point.x = (e.clientX / window.innerWidth) * 2 - 1;
        point.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      /* ---- sizing ------------------------------------------------------- */
      const applySize = () => {
        const w = Math.round(canvas.clientWidth);
        const h = Math.round(canvas.clientHeight);
        if (!w || !h) return;
        // Re-read here rather than once on mount: crossing the breakpoint is a
        // resize, and it changes the framing as much as the canvas box does.
        readLayout();
        /*
         * Held lower on a phone. This is a second WebGL context on a device
         * that is already running the hero's, and a wireframe over a dark hull
         * is a forgiving thing to sample slightly softer — where a shortfall
         * would show first is fill rate, not edges.
         */
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 700 ? 1.3 : 1.6));
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        // Resizing clears the buffer; repaint now in case the loop is idle.
        renderer.render(scene, cam);
      };
      const ro = new ResizeObserver(applySize);
      ro.observe(canvas);
      applySize();

      /* ---- loop --------------------------------------------------------- */
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

      // Two scratch vectors, not one: `a.lerp(b)` mutates `a`, so sharing a
      // single temp between the value and the target makes every part lerp
      // toward itself and freeze at whichever end wrote last.
      const tmpPos = new THREE.Vector3();
      const tmpTo = new THREE.Vector3();
      const lerp = THREE.MathUtils.lerp;
      let raf = 0;

      const draw = (time: number) => {
        const { k, fly } = reduced ? { k: 0, fly: 0 } : getAssembly();

        parts.forEach((p) => {
          // Home → scatter, driven entirely by k.
          tmpTo.copy(p.scatter).add(p.home);
          tmpPos.copy(p.home).lerp(tmpTo, k);
          p.obj.position.copy(tmpPos);
          p.obj.rotation.set(
            p.homeRot.x + p.spin.x * k,
            p.homeRot.y + p.spin.y * k,
            p.homeRot.z + p.spin.z * k,
          );
        });

        const dist = distFor(lerp(frameAssembled, frameScattered, k));
        cam.position.copy(EYE).multiplyScalar(dist);
        cam.lookAt(AIM);

        // Half-extents of what the frame covers, so the flight path can be laid
        // out as fractions of the section rather than in world units that would
        // mean something different on every viewport.
        const halfH = dist * HALF_ANGLE;
        const halfW = halfH * cam.aspect;

        const idle = reduced ? 0 : Math.sin(time * 0.00035) * 0.09;
        const settle = 1 - fly;

        /*
         * Stage five is the departure. It used to translate straight out and
         * fade, which read fine when the canvas was a box in the corner — but
         * against a full-section canvas, leaving the frame means leaving the
         * page. So it flies the section instead: off its rest station on the
         * right, through a climbing right-hand turn, across to the far side,
         * and it stays there at full opacity.
         *
         * The climb is eased ahead of the crossing (fly^0.55 against fly^1.35)
         * so it is above the headline before it is over it. The copy sits
         * mid-left and a straight diagonal would cut right through it.
         */
        /*
         * The heading is front-loaded rather than eased symmetrically. Turning
         * through 180° means passing through the moment the aircraft points
         * straight at the camera, where it is nothing but a silhouette; on a
         * symmetric curve that moment lands mid-traverse, at the centre of the
         * section, where it is largest and reads as a dive rather than a turn.
         * Front-loaded, it happens early and small over on the right, and the
         * whole crossing is then flown in clean side profile.
         */
        const turn = 1 - Math.pow(1 - fly, 2.2);
        // Banks into the turn and rolls level well before the far side.
        const bank = Math.sin(Math.PI * Math.min(1, fly / 0.62)) * 0.44;
        /*
         * A fairly emphatic nose-up — the camera looks down on the scene from
         * about 13°, which eats most of a subtle climb attitude, and a banked
         * aircraft seen from above with a level nose reads as diving.
         */
        const pitch = Math.sin(Math.PI * Math.min(1, fly / 0.8)) * 0.34;
        const near = Math.sin(Math.PI * fly);
        const cross = Math.pow(fly, 1.15);
        const climb = Math.pow(fly, 0.55);

        group.position.set(
          lerp(halfW * restFrac, halfW * -0.5, cross),
          /*
           * 0.40, not the 0.62 the arc looks like it wants. The camera is tilted
           * down onto the aim point, so a climb in world Y lifts more than its
           * share of the frame — measured, 0.62 of the half-height projects to
           * 0.69 of it. The pin also releases while the aircraft is still near
           * the top of the arc, so the section is already scrolling under it,
           * and anything higher loses the fin off the top of the viewport. At
           * 1280x800 — the shortest section this runs on, since the whole thing
           * drops out under 1100 — 0.40 left the fin about 10px clear, which is
           * no margin at all.
           */
          halfH * 0.35 * climb,
          // Swings toward the viewer through the turn, then draws away.
          near * 1.0 - fly * 2.4,
        );
        group.rotation.y =
          (-0.32 + idle + point.x * 0.16) * settle - Math.PI * turn;
        group.rotation.z = (0.04 + point.y * 0.06) * settle + pitch;
        group.rotation.x = 0.06 * settle + bank;

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
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        parts.forEach((p) =>
          p.obj.children.forEach((c) => {
            const m = c as import("three").Mesh;
            m.geometry?.dispose();
          }),
        );
        body.dispose();
        wire.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [canvasRef]);
}
