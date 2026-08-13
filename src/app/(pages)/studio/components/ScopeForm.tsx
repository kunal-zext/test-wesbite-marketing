"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BUDGET, PROJECT_TYPES, TIMELINES } from "../data";

const STEPS = 3;

/**
 * Three-step project scoping form.
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
    const up = () => setDragging(false);
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
      return;
    }
    setSent(true);
  };

  const onBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const progress = sent ? 100 : ((step + 1) / STEPS) * 100;

  return (
    <>
      <div className="zx-shead">
        <span className="zx-snum">07</span>
        <span>Scope your project</span>
        <span className="zx-sline" />
        <span>{sent ? "Sent" : `Step ${step + 1} of ${STEPS}`}</span>
      </div>

      <div className="zx-fprogwrap">
        <div className="zx-fprog" style={{ width: `${progress}%` }} />
      </div>

      <div className="zx-fwrap">
        <div className="zx-fstep" data-active={!sent && step === 0 ? "1" : "0"}>
          <h2 className="zx-fh2">
            What are we <em className="zx-serif hero-title-gradient-animated">building</em>?
          </h2>
          <div className="zx-chips">
            {PROJECT_TYPES.map((t) => (
              <button
                className="zx-chip"
                type="button"
                key={t}
                aria-pressed={type === t}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="zx-fstep" data-active={!sent && step === 1 ? "1" : "0"}>
          <h2 className="zx-fh2">
            What&rsquo;s the <em className="zx-serif hero-title-gradient-animated">shape</em> of it?
          </h2>

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
            aria-valuetext={budget >= BUDGET.max ? "€250k or more" : `€${budget}k`}
            tabIndex={0}
            data-drag={dragging ? "1" : "0"}
            onPointerDown={(e) => {
              setDragging(true);
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
            <div className="zx-sliderfill" style={{ width: `${pct * 100}%` }} />
            <div className="zx-sliderknob" style={{ left: `${pct * 100}%` }} />
          </div>
          <div className="zx-sliderends">
            <span>€25k</span>
            <span>€250k+</span>
          </div>

          <div
            className="zx-slidercap"
            style={{ marginTop: "clamp(28px,3.4vw,44px)", marginBottom: 14 }}
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
                onClick={() => setWhen(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="zx-fstep" data-active={!sent && step === 2 ? "1" : "0"}>
          <h2 className="zx-fh2">
            Who&rsquo;s <em className="zx-serif hero-title-gradient-animated">asking</em>?
          </h2>
          <div className="zx-fieldgrid">
            <label className="zx-label">
              <span className="zx-labeltext">Name</span>
              <input className="zx-field" type="text" placeholder="Alex Moreira" />
            </label>
            <label className="zx-label">
              <span className="zx-labeltext">Email</span>
              <input
                className="zx-field"
                type="email"
                placeholder="alex@company.com"
              />
            </label>
            <label className="zx-label zx-label--wide">
              <span className="zx-labeltext">One line about the project</span>
              <input
                className="zx-field"
                type="text"
                placeholder="We sell industrial sensors and our site looks like 2014."
              />
            </label>
          </div>
        </div>

        {sent && (
          <div className="zx-fdone" data-open="1">
            <div className="zx-fdonebig">Got it</div>
            <p className="zx-fdonetext">
              A real person reads this within 24 hours — usually Marta, usually
              faster. If it&rsquo;s a fit, you&rsquo;ll get a calendar link and a
              one-page take on your current site.
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
    </>
  );
}
