/**
 * Route loading state.
 *
 * A quiet progress hairline over a content skeleton, rather than a full white
 * screen with a spinner and the word "Loading…" — which was the first thing a
 * visitor saw on every navigation.
 */
export default function Loading() {
  return (
    <div className="page-top pb-32" role="status" aria-label="Loading page">
      <div className="shell">
        <div className="h-px w-full overflow-hidden bg-line">
          <div className="h-full w-1/3 animate-[loading-sweep_1.1s_ease-in-out_infinite] bg-signal-500" />
        </div>
        <div className="mt-14 max-w-[38rem] space-y-4">
          <div className="h-3 w-28 rounded bg-ink-100" />
          <div className="h-12 w-full rounded bg-ink-100" />
          <div className="h-12 w-4/5 rounded bg-ink-100" />
        </div>
      </div>
      <style>{`
        @keyframes loading-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
