"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BUDGET, PROJECT_TYPES, TIMELINES } from "../data";
import Bot, { type Emote as BotEmote } from "./Bot";

const STEPS = 3;


/**
 * The debris. Everything a project brief usually arrives buried under — it
 * rains onto the section with real gravity, piles up on the floor, and the
 * face kicks the lot off screen before asking its three clean questions.
 */
const NOISE = [
  "FULL NAME*",
  "COMPANY*",
  "PHONE*",
  "JOB TITLE*",
  "BUDGET RANGE*",
  "30 MORE FIELDS*",
];

/**
 * The shapes that fall with the words: page-palette confetti, one CSS class
 * each. They obey the same physics and take the same kicks.
 */
const SHAPES = [
  "zx-fshape--dot-a",
  "zx-fshape--dot-w",
  "zx-fshape--sq-b",
  "zx-fshape--sq-a",
  "zx-fshape--ring-w",
  "zx-fshape--ring-b",
  "zx-fshape--tri-a",
  "zx-fshape--tri-b",
] as const;

const LINE_INTRO = "Right. The contact form.";
const LINE_PILE = "You know this part.";
const LINE_CLEAR = "We skip all of it.";
const LINE_DONE = "Three questions. Nothing else.";
const QUESTIONS = [
  "What are we building?",
  "What's the shape of it?",
  "Who's asking?",
];
const SENT_LINE = "Got it. A real person reads this within 24 hours.";

type Expr = "idle" | "happy" | "wide" | "down" | "joy";
/**
 * The act, in order: the noise rains in and piles up → the face announces the
 * cleanup → sweeps the floor, kicking everything off → one beat of "There." →
 * live, asking questions.
 */
type Stage =
  | "idle"
  | "intro"
  | "rain"
  | "pile"
  | "clear"
  | "sweep"
  | "after"
  | "live";

/** Typewriter for the dialogue; instant under reduced motion. */
function useTyped(target: string, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target.length);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= target.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 42);
    return () => clearInterval(id);
  }, [target, active]);
  return { text: target.slice(0, n), done: n >= target.length };
}

/**
 * The word physics. A deliberately small rigid-ish body sim — gravity,
 * restitution against the floor, wall bounces, spin — run imperatively on the
 * chip elements so nothing re-renders per frame. The face's leading edge is
 * fed in during the sweep; any grounded word it reaches takes an impulse up
 * and out and is culled once it leaves the stage.
 */
type Body = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  hw: number;
  hh: number;
  rest: boolean;
  kicked: boolean;
  gone: boolean;
};

function createNoiseSim(
  stage: HTMLDivElement,
  onSettled: () => void,
  onCleared: () => void,
) {
  const W = stage.clientWidth;
  const H = stage.clientHeight;
  const floor = H - 12;
  const G = 1500;

  const spawn = (el: HTMLSpanElement, i: number, word: boolean): Body => {
    stage.appendChild(el);
    const hw = el.offsetWidth / 2;
    const hh = el.offsetHeight / 2;
    return {
      el,
      // Kept a body-width clear of both edges so nothing ever rests half
      // outside the frame; staggered high above it so the rain streams in.
      x: 44 + hw + Math.random() * Math.max(40, W - 88 - hw * 2),
      y: -60 - i * 78 - Math.random() * 60,
      vx: (Math.random() - 0.5) * 110,
      vy: 0,
      // Words fall nearly straight — a nudge of tilt, still readable. The
      // shapes are free to tumble.
      a: (Math.random() - 0.5) * (word ? 10 : 180),
      va: (Math.random() - 0.5) * (word ? 46 : 320),
      hw,
      hh,
      rest: false,
      kicked: false,
      gone: false,
    };
  };
  const items: Array<{ el: HTMLSpanElement; word: boolean }> = [
    ...NOISE.map((w) => {
      const el = document.createElement("span");
      el.className = "zx-fword";
      el.textContent = w;
      return { el, word: true };
    }),
    ...SHAPES.map((cls) => {
      const el = document.createElement("span");
      el.className = "zx-fshape " + cls;
      return { el, word: false };
    }),
  ];
  // Shuffle-ish interleave so shapes fall among the words, not after them.
  items.sort(() => Math.random() - 0.5);
  const bodies: Body[] = items.map((it, i) => spawn(it.el, i, it.word));
  const isWord = new Map(bodies.map((b, i) => [b, items[i].word]));

  let faceFront = -Infinity;
  let sweeping = false;
  let settledFired = false;
  let clearedFired = false;
  let raf = 0;
  let last = performance.now();

  const tick = (t: number) => {
    raf = requestAnimationFrame(tick);
    // Clamped high enough that a background-throttled tab still advances
    // the world visibly per frame instead of freezing it.
    const dt = Math.min(0.06, (t - last) / 1000);
    last = t;

    let allRest = true;
    let allGone = true;

    for (const b of bodies) {
      if (b.gone) continue;
      allGone = false;

      if (sweeping && !b.kicked && b.x - b.hw < faceFront) {
        // The kick: up, out, and spinning — always in the sweep's direction.
        b.kicked = true;
        b.rest = false;
        b.vx = 470 + Math.random() * 380;
        b.vy = -(520 + Math.random() * 420);
        b.va = 300 + Math.random() * 320;
      }

      if (!b.rest) {
        b.vy += G * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.va * dt;

        if (!b.kicked) {
          // Floor, with a little bounce left in it.
          if (b.y + b.hh > floor && b.vy > 0) {
            b.y = floor - b.hh;
            // Enough restitution that everything visibly bounces back up
            // once or twice before it settles.
            b.vy *= -0.52;
            b.vx *= 0.8;
            b.va *= 0.55;
            // Words square themselves up a little on every bounce.
            if (isWord.get(b)) b.a *= 0.55;
            if (Math.abs(b.vy) < 90) {
              b.rest = true;
              b.vy = 0;
              b.va = 0;
              if (isWord.get(b)) b.a = Math.max(-7, Math.min(7, b.a));
            }
          }
          // Side walls only matter while it rains.
          if (b.x - b.hw < 40 && b.vx < 0) b.vx *= -0.7;
          if (b.x + b.hw > W - 40 && b.vx > 0) b.vx *= -0.7;
        } else if (b.x - b.hw > W + 60 || b.y - b.hh > H + 80) {
          b.gone = true;
          b.el.style.opacity = "0";
          continue;
        }
      }
      if (!b.rest && !b.kicked) allRest = false;

      b.el.style.transform = `translate3d(${(b.x - b.hw).toFixed(1)}px, ${(b.y - b.hh).toFixed(1)}px, 0) rotate(${b.a.toFixed(1)}deg)`;
    }

    // Never after the sweep begins: kicked bodies do not count against
    // allRest, so a late pile (throttled tabs) would otherwise report
    // "settled" mid-sweep and rewind the show.
    if (!settledFired && allRest && !sweeping) {
      settledFired = true;
      onSettled();
    }
    if (sweeping && !clearedFired && allGone) {
      clearedFired = true;
      cancelAnimationFrame(raf);
      onCleared();
    }
  };
  raf = requestAnimationFrame(tick);

  return {
    sweep(front: number) {
      sweeping = true;
      faceFront = front;
    },
    /**
     * The curtain: fade whatever is still airborne and declare the floor
     * clear. The sweep guard calls this so a throttled tab can never strand
     * the act mid-kick.
     */
    finish() {
      if (clearedFired) return;
      clearedFired = true;
      cancelAnimationFrame(raf);
      bodies.forEach((b) => {
        if (!b.gone) {
          b.gone = true;
          b.el.style.opacity = "0";
        }
      });
      onCleared();
    },
    destroy() {
      cancelAnimationFrame(raf);
      bodies.forEach((b) => b.el.remove());
    },
  };
}

/**
 * Three-step scoping form, hosted by Unit 05, the studio robot.
 *
 * The entrance: project noise rains into the section and piles up under real
 * gravity; the face announces "Let me make this simple for you", descends to
 * the floor, sweeps across it kicking every word off screen, comes back,
 * says "There. Three questions." — and the form appears.
 *
 * Note: like the source design, submitting only advances to the confirmation
 * state — nothing is posted anywhere yet. Wire `onSubmit` to the contact
 * endpoint when this page goes live.
 */
export default function ScopeForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [when, setWhen] = useState<string | null>(null);
  const [budget, setBudget] = useState<number>(BUDGET.start);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const [stage, setStage] = useState<Stage>("idle");
  const [expr, setExpr] = useState<Expr>("idle");
  const [actKey, setActKey] = useState(0);
  const [burst, setBurst] = useState<Array<{ dx: number; dy: number; c: number }>>([]);
  const happyT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const entityRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<ReturnType<typeof createNoiseSim> | null>(null);

  // The act begins when the section is actually on screen. Reduced motion
  // skips the theatre entirely.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setStage("live");
          return;
        }
        setStage("intro");
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The rain: spawn the sim; it reports back when the pile has settled and
  // later when the sweep has cleared the floor.
  useEffect(() => {
    if (stage !== "rain") return;
    const stg = stageRef.current;
    if (!stg) {
      setStage("live");
      return;
    }
    setExpr("wide");
    simRef.current = createNoiseSim(
      stg,
      // Forward-only, and each on a breath: the face looks at the pile
      // before it speaks, and at the empty floor before it says so.
      () =>
        setTimeout(
          () => setStage((s) => (s === "rain" ? "pile" : s)),
          750,
        ),
      () =>
        setTimeout(
          () => setStage((s) => (s === "live" ? s : "after")),
          650,
        ),
    );
    // Safety net: if something never settles, talk anyway.
    const guard = setTimeout(() => setStage((s) => (s === "rain" ? "pile" : s)), 6500);
    return () => clearTimeout(guard);
  }, [stage]);

  // Tear the sim down only when the whole component goes.
  useEffect(() => () => simRef.current?.destroy(), []);

  const line = sent
    ? SENT_LINE
    : stage === "intro" || stage === "rain"
      ? LINE_INTRO
      : stage === "pile"
        ? LINE_PILE
        : stage === "clear" || stage === "sweep"
          ? LINE_CLEAR
          : stage === "after"
            ? LINE_DONE
            : stage === "live"
              ? QUESTIONS[step]
              : "";
  const { text, done } = useTyped(line, stage !== "idle");

  // The intro hangs a beat, and then the rain answers the question.
  useEffect(() => {
    if (stage !== "intro" || !done) return;
    const t = setTimeout(() => setStage("rain"), 650);
    return () => clearTimeout(t);
  }, [stage, done]);

  // "A lot at once, right?" hangs, then the promise, then the work.
  useEffect(() => {
    if (stage !== "pile" || !done) return;
    const t = setTimeout(() => setStage("clear"), 850);
    return () => clearTimeout(t);
  }, [stage, done]);
  useEffect(() => {
    if (stage !== "clear" || !done) return;
    const t = setTimeout(() => setStage("sweep"), 550);
    return () => clearTimeout(t);
  }, [stage, done]);

  // The sweep: the face descends to the stage floor and crosses it; its
  // leading edge is fed to the sim, which does the actual kicking.
  useEffect(() => {
    if (stage !== "sweep") return;
    const ent = entityRef.current;
    const stg = stageRef.current;
    const sim = simRef.current;
    if (!ent || !stg || !sim) {
      setStage("after");
      return;
    }
    setExpr("idle");
    const er = ent.getBoundingClientRect();
    const sr = stg.getBoundingClientRect();
    const dy = sr.bottom - er.bottom;
    const travel = sr.width - (er.left - sr.left) - er.width * 0.55;
    const D = 3300;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      const x = e * travel;
      ent.style.transform = `translate(${x.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      // The kicking edge, in stage-local coordinates.
      sim.sweep(er.left - sr.left + x + er.width * 0.72);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    // However slow the tab, the act finishes: anything still airborne fades
    // and the show moves on.
    const guard = setTimeout(() => simRef.current?.finish(), 5600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(guard);
    };
  }, [stage]);

  // Floor cleared → glide home, then deliver the closer.
  useEffect(() => {
    if (stage !== "after") return;
    const ent = entityRef.current;
    if (ent) {
      ent.style.transition = "transform 0.55s var(--ease)";
      ent.style.transform = "translate(0, 0)";
      const t0 = setTimeout(() => {
        ent.style.transition = "";
      }, 600);
      return () => clearTimeout(t0);
    }
  }, [stage]);

  // Closer delivered → live, questions on.
  useEffect(() => {
    if (stage !== "after" || !done) return;
    const t = setTimeout(() => setStage("live"), 1050);
    return () => clearTimeout(t);
  }, [stage, done]);

  const pleased = useCallback(() => {
    setExpr("happy");
    setActKey((k) => k + 1);
    if (happyT.current) clearTimeout(happyT.current);
    happyT.current = setTimeout(() => setExpr("idle"), 800);
  }, []);

  const pct = (budget - BUDGET.min) / (BUDGET.max - BUDGET.min);

  const setFromX = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    const raw = BUDGET.min + p * (BUDGET.max - BUDGET.min);
    setBudget(Math.round(raw / BUDGET.step) * BUDGET.step);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromX(e.clientX);
    const up = () => {
      setDragging(false);
      setExpr("idle");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromX]);

  const onNext = () => {
    if (step < STEPS - 1) {
      setStep((s) => s + 1);
      pleased();
      return;
    }
    setSent(true);
    setExpr("joy");
    setActKey((k) => k + 1);
    setBurst(
      Array.from({ length: 18 }, (_, i) => ({
        dx: (Math.random() - 0.5) * 260,
        dy: -60 - Math.random() * 180,
        c: i % 3,
      })),
    );
  };

  const onBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const ready = stage === "live";

  /*
   * The robot's read on the moment. The sweep maps to drive — treads
   * rolling as it crosses the floor kicking — and the sent state holds happy
   * with the arm up via cheer.
   */
  const botEmote: BotEmote =
    sent || expr === "joy" || expr === "happy"
      ? "happy"
      : stage === "sweep"
        ? "drive"
        : expr === "down"
          ? "down"
          : expr === "wide" || stage === "rain"
            ? "curious"
            : "idle";

  return (
    <div ref={rootRef}>
      <div className="zx-shead">
        {/* Last in the running order; see the section map in page.tsx. */}
        <span className="zx-snum">08</span>
        <span>Scope your project</span>
        <span className="zx-sline" />
        <span>{sent ? "Sent" : `Step ${step + 1} of ${STEPS}`}</span>
      </div>

      <div className="zx-fface-grid" ref={gridRef} data-stage={stage}>
        {/* The debris stage: rains over the whole section, clipped to it. */}
        <div className="zx-fstage" ref={stageRef} aria-hidden="true" />

        <div className="zx-fentity" data-stage={stage} ref={entityRef}>
          <Bot
            emote={botEmote}
            speaking={stage !== "idle" && !done}
            pw={0.85 + pct * 0.45}
            cheer={sent}
          />
          {burst.length > 0 && (
            <div className="zx-fburst" aria-hidden="true">
              {burst.map((b, i) => (
                <i
                  key={i}
                  data-c={b.c}
                  style={
                    {
                      "--bx": `${b.dx.toFixed(0)}px`,
                      "--by": `${b.dy.toFixed(0)}px`,
                      "--bd": `${(i * 0.03).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className="zx-fdialog">
          <h2 className="zx-msr">{sent ? "Sent" : QUESTIONS[step]}</h2>
          <p className="zx-fsay" aria-hidden="true">
            {text}
            <span className="zx-fcaret" data-on={done ? "0" : "1"} />
          </p>

          <div className="zx-fmain" data-ready={ready ? "1" : "0"}>
            <div className="zx-fwrap">
              <div
                className="zx-fstep"
                data-active={!sent && step === 0 ? "1" : "0"}
              >
                <div className="zx-chips">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      className="zx-chip"
                      type="button"
                      key={t}
                      aria-pressed={type === t}
                      onClick={() => {
                        setType(t);
                        pleased();
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="zx-fstep"
                data-active={!sent && step === 1 ? "1" : "0"}
              >
                <div className="zx-sliderhead">
                  <span className="zx-slidercap">Budget</span>
                  <span className="zx-sliderval">
                    {budget >= BUDGET.max ? "€250k+" : `€${budget}k`}
                  </span>
                </div>
                <div
                  className="zx-slider"
                  ref={sliderRef}
                  role="slider"
                  aria-label="Budget"
                  aria-valuemin={BUDGET.min}
                  aria-valuemax={BUDGET.max}
                  aria-valuenow={budget}
                  aria-valuetext={
                    budget >= BUDGET.max ? "€250k or more" : `€${budget}k`
                  }
                  tabIndex={0}
                  data-drag={dragging ? "1" : "0"}
                  onPointerDown={(e) => {
                    setDragging(true);
                    setExpr("wide");
                    setFromX(e.clientX);
                    e.currentTarget.setPointerCapture?.(e.pointerId);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                      setBudget((v) => Math.min(BUDGET.max, v + BUDGET.step));
                    }
                    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                      setBudget((v) => Math.max(BUDGET.min, v - BUDGET.step));
                    }
                  }}
                >
                  <div className="zx-slidertrack" />
                  <div
                    className="zx-sliderfill"
                    style={{ width: `${pct * 100}%` }}
                  />
                  <div
                    className="zx-sliderknob"
                    style={{ left: `${pct * 100}%` }}
                  />
                </div>
                <div className="zx-sliderends">
                  <span>€25k</span>
                  <span>€250k+</span>
                </div>

                <div
                  className="zx-slidercap"
                  style={{ marginTop: "clamp(24px,3vw,38px)", marginBottom: 14 }}
                >
                  Timeline
                </div>
                <div className="zx-chips">
                  {TIMELINES.map((t) => (
                    <button
                      className="zx-chip"
                      type="button"
                      key={t}
                      aria-pressed={when === t}
                      onClick={() => {
                        setWhen(t);
                        pleased();
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="zx-fstep"
                data-active={!sent && step === 2 ? "1" : "0"}
              >
                <div className="zx-fieldgrid">
                  <label className="zx-label">
                    <span className="zx-labeltext">Name</span>
                    <input
                      className="zx-field"
                      type="text"
                      placeholder="Alex Moreira"
                      onFocus={() => setExpr("down")}
                      onBlur={() => setExpr("idle")}
                    />
                  </label>
                  <label className="zx-label">
                    <span className="zx-labeltext">Email</span>
                    <input
                      className="zx-field"
                      type="email"
                      placeholder="alex@company.com"
                      onFocus={() => setExpr("down")}
                      onBlur={() => setExpr("idle")}
                    />
                  </label>
                  <label className="zx-label zx-label--wide">
                    <span className="zx-labeltext">One line about the project</span>
                    <input
                      className="zx-field"
                      type="text"
                      placeholder="We sell industrial sensors and our site looks like 2014."
                      onFocus={() => setExpr("down")}
                      onBlur={() => setExpr("idle")}
                    />
                  </label>
                </div>
              </div>

              {sent && (
                <div className="zx-fdone" data-open="1">
                  <p className="zx-fdonetext">
                    Usually Marta, usually faster. If it&rsquo;s a fit,
                    you&rsquo;ll get a calendar link and a one-page take on your
                    current site.
                  </p>
                </div>
              )}
            </div>

            {!sent && (
              <div className="zx-fnav">
                <button
                  className="zx-btn zx-btn--ghost zx-btn--back"
                  type="button"
                  data-mag="1"
                  disabled={step === 0}
                  onClick={onBack}
                >
                  <span>Back</span>
                  <span className="zx-btnarrow" aria-hidden="true">
                    ←
                  </span>
                </button>
                <button
                  className="zx-btn zx-btn--acc"
                  type="button"
                  data-mag="2"
                  data-label="next"
                  onClick={onNext}
                >
                  <span>{step === STEPS - 1 ? "Send it" : "Continue"}</span>
                  <span className="zx-btnarrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
