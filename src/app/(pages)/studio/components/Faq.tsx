"use client";

import { useEffect, useRef, useState } from "react";
import { FAQS } from "../data";

/**
 * Single-open accordion. Heights are measured from scrollHeight on toggle
 * rather than animated to `auto`, which CSS cannot transition.
 */
export default function Faq() {
  /*
   * The first answer starts open. Left all-closed the section arrives as six
   * questions and no answers — the reader has to work before it gives them
   * anything, and the whole block reads as unfinished. One open panel also
   * shows what the plus signs do without anyone having to guess.
   */
  const [open, setOpen] = useState<number | null>(0);
  const bodies = useRef<Array<HTMLDivElement | null>>([]);

  /*
   * Heights come from a ref, which is still null while the first render runs —
   * so the panel that starts open would paint at zero height and never recover
   * on its own. This forces one re-measure once the refs exist, and a second
   * once the fonts have landed, because the answer's wrapped height changes
   * when the real face replaces the fallback.
   */
  const [, remeasure] = useState(0);
  useEffect(() => {
    const bump = () => remeasure((n) => n + 1);
    bump();
    let live = true;
    void document.fonts?.ready.then(() => {
      if (live) bump();
    });
    return () => {
      live = false;
    };
  }, []);

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
