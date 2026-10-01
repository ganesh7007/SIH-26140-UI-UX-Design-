import React from 'react';
import { useDelayedLoading } from './useDelayedLoading';
import Loader from './loader-1';
import { TactileButton } from '../TactileButton';

// Simulated API fetch with configurable response time
const simulateFetchData = (delayMs = 1500, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load quantum experiment data.'));
      } else {
        resolve({
          title: 'Quantum State Teleportation Protocol',
          qubits: 3,
          fidelity: '99.4%',
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }, delayMs);
  });
};

export const DelayedLoaderDemo = () => {
  // Initialize delayed loading hook with 500ms threshold
  const { isLoading, data, error, execute, reset } = useDelayedLoading(
    (duration, fail) => simulateFetchData(duration, fail),
    500 // 500ms delay before showing spinner
  );

  return (
    <div className="delayed-loader-card p-6 bg-slate-900/60 rounded-2xl border border-white/10 text-center max-w-md mx-auto my-6">
      <h3 className="text-xl font-bold text-white mb-2">Delayed Loading Pattern</h3>
      <p className="text-sm text-slate-400 mb-6">
        Spinner only shows if fetch takes longer than 500ms. If the request completes in under 500ms, no spinner flickers!
      </p>

      {/* Loading Area with Orbital Pulse Animation */}
      <div className="min-h-[220px] flex items-center justify-center relative bg-slate-950/40 rounded-xl border border-white/5 p-4 mb-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
            <Loader size="48px" />
            <span className="text-sm font-semibold text-purple-400 mt-2">Loading data...</span>
          </div>
        )}

        {!isLoading && data && (
          <div className="text-left bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-4 w-full">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              ✓ Data Received ({data.timestamp})
            </span>
            <h4 className="text-base font-bold text-white">{data.title}</h4>
            <div className="flex gap-4 mt-2 text-xs text-slate-300">
              <span>Qubits: <strong className="text-cyan-400">{data.qubits}</strong></span>
              <span>Fidelity: <strong className="text-emerald-400">{data.fidelity}</strong></span>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-rose-400 text-sm font-medium bg-rose-950/30 border border-rose-500/30 p-3 rounded-lg w-full">
            ✕ {error.message}
          </div>
        )}

        {!isLoading && !data && !error && (
          <span className="text-sm text-slate-500">Click a button below to test data fetching</span>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col gap-3">
        <TactileButton
          variant="purple"
          onClick={() => execute(1800, false)}
          disabled={isLoading}
        >
          Slow Fetch (1.8s &gt; 500ms Spinner)
        </TactileButton>

        <TactileButton
          variant="success"
          onClick={() => execute(300, false)}
          disabled={isLoading}
        >
          Fast Fetch (300ms &lt; 500ms Instant)
        </TactileButton>
      </div>
    </div>
  );
};

export default DelayedLoaderDemo;
