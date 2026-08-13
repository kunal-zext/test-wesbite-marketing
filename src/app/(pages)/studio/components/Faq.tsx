"use client";

import { useRef, useState } from "react";
import { FAQS } from "../data";

/**
 * Single-open accordion. Heights are measured from scrollHeight on toggle
 * rather than animated to `auto`, which CSS cannot transition.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const bodies = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <div className="zx-acc">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        const body = bodies.current[i];
        return (
          <div className="zx-accitem" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                className="zx-acchead"
                type="button"
                data-mag="1"
                aria-expanded={isOpen}
                aria-controls={`zx-faq-${i}`}
                onClick={() => toggle(i)}
              >
                <span className="zx-accq">{item.q}</span>
                <span className="zx-accicon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              className="zx-accbody"
              id={`zx-faq-${i}`}
              role="region"
              ref={(n) => {
                bodies.current[i] = n;
              }}
              style={{
                maxHeight: isOpen ? `${(body?.scrollHeight ?? 0) + 40}px` : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
