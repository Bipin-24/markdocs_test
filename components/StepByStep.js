import React from 'react';

export default function StepByStep({ steps = [], initial = 0 }) {
  const [active, setActive] = React.useState(initial);
  const total = steps.length;
  const mediaRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActive((i) => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  React.useEffect(() => {
    if (!mounted) return;
    // Autoplay media per step if it's a video
    const el = mediaRef.current;
    if (el && el.tagName === 'VIDEO') {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  }, [active, mounted]);

  const step = steps[active] || {};
  const hotspots = step.hotspots || [];

  return (
    <div className="stepper overlay" role="group" aria-label="Step by step tutorial">
      <div className="mediaOverlayWrap">
        <div className="mediaStage">
          {step.video ? (
            <video ref={mediaRef} key={`v-${active}`} src={step.video} controls poster={step.poster} className="media" />
          ) : step.gif ? (
            <img ref={mediaRef} key={`g-${active}`} src={step.gif} alt={step.title || 'Step'} className="media" />
          ) : step.img ? (
            <img ref={mediaRef} key={`i-${active}`} src={step.img} alt={step.title || 'Step'} className="media" />
          ) : (
            <div className="media placeholder">No media</div>
          )}
          {/* Hotspots overlay */}
          {mounted && hotspots.length > 0 && (
            <div className="hotspots">
              {hotspots.map((h, idx) => (
                <div
                  key={idx}
                  className="hotspot"
                  style={{ left: h.x, top: h.y, width: h.w, height: h.h }}
                  title={h.label || ''}
                >
                  {h.label && <span className="hotLabel">{h.label}</span>}
                </div>
              ))}
            </div>
          )}
          {/* Compact overlay at bottom */}
          <div className="overlayBar">
            <span className="badge">{active + 1}</span>
            <span className="title">{step.title || `Step ${active + 1}`}</span>
            <div className="navBtns">
              <button
                className="navBtn"
                onClick={() => setActive((i) => Math.max(i - 1, 0))}
                disabled={active === 0}
                aria-label="Previous step"
              >
                &#8592;
              </button>
              <button
                className="navBtn"
                onClick={() => setActive((i) => Math.min(i + 1, total - 1))}
                disabled={active === total - 1}
                aria-label="Next step"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stepper.overlay { max-width: 900px; margin: 2rem auto; border: 1px solid var(--dark-2); border-radius: 16px; background: var(--light); padding: 0; box-shadow: 0 2px 16px rgba(20,115,230,0.04); }
        .mediaOverlayWrap { position: relative; width: 100%; }
        .mediaStage { position: relative; width: 100%; }
        .media { width: 100%; min-height: 460px; min-width: 100%; border-radius: 16px; border: 1px solid var(--dark-2); background: #000; animation: fadeIn 250ms ease; display: block; }
        .media.placeholder { display: grid; place-items: center; height: 460px; background: #f5f7fa; color: #777; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hotspots { position: absolute; inset: 0; pointer-events: none; }
        .hotspot { position: absolute; border: 2px solid #ffbf47; border-radius: 6px; background: rgba(255,191,71,0.12); }
        .hotLabel { position: absolute; top: -1.6rem; left: 0; background: #ffbf47; color: #1b1b1b; font-size: 12px; padding: 2px 6px; border-radius: 4px; }
        .overlayBar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgb(247, 120, 149); /* lighter pink/red background */
          border-radius: 0 0 16px 16px;
          padding: 0.12rem 0;
          font-size: 0.95rem;
          min-height: 28px;
          pointer-events: auto;
          box-shadow: 0 2px 8px rgba(20,115,230,0.10);
          max-width: 100%;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1.5px solid #fff;
          font-weight: 700;
          background: #fff;
          color: #1473e6;
          font-size: 0.95rem;
        }
        .title {
          font-weight: 500;
          font-size: 0.98rem;
          color: #fff; /* white text for contrast on dark background */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .navBtns { display: flex; gap: 0.25rem; margin-left: auto; }
        .navBtn {
          background: #fff;
          border: 1.5px solid #fff;
          color: #1473e6;
          border-radius: 6px;
          width: 28px;
          height: 28px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .navBtn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .navBtn:not(:disabled):hover {
          background: #0d5bb5;
          color: #fff;
          border-color: #0d5bb5;
        }
        @media (max-width: 700px) { .stepper.overlay { padding: 0.5rem; } .media { min-height: 320px; } .overlayBar { font-size: 0.88rem; padding: 0.08rem 0; min-height: 22px; left: 0; right: 0; bottom: 0; max-width: 100%; border-radius: 0 0 12px 12px; } .badge { width: 18px; height: 18px; font-size: 0.8rem; } }
      `}</style>
    </div>
  );
}