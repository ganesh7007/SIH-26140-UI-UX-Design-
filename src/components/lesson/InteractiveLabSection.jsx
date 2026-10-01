import React, { useState, useRef, useEffect } from 'react';
import Loader from '../ui/loader-1';

export const InteractiveLabSection = ({
  labData,
  onComplete,
  onPlaySound
}) => {
  const [initialState, setInitialState] = useState(labData?.defaultState || '|0⟩');
  const [selectedGate, setSelectedGate] = useState('H');
  const [labStatus, setLabStatus] = useState('ready'); // 'ready' | 'running' | 'measured'
  const [measuredState, setMeasuredState] = useState(null);
  const [measuredProb, setMeasuredProb] = useState({ p0: 50, p1: 50 });
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);

  const availableGates = labData?.gates || ['H', 'X', 'Z', 'Y'];
  const states = ['|0⟩', '|1⟩', '|+⟩'];

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectState = (st) => {
    if (onPlaySound) onPlaySound('click');
    setInitialState(st);
    setLabStatus('ready');
    setMeasuredState(null);
  };

  const handleSelectGate = (g) => {
    if (onPlaySound) onPlaySound('click');
    setSelectedGate(g);
    setLabStatus('ready');
    setMeasuredState(null);
  };

  const handleRunExperiment = () => {
    if (onPlaySound) onPlaySound('click');
    setLabStatus('running');

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    setTimeout(() => {
      // Calculate output state
      let resState = '|0⟩';
      let p0 = 100;
      let p1 = 0;

      if (selectedGate === 'H') {
        resState = '|+⟩';
        p0 = 50;
        p1 = 50;
      } else if (selectedGate === 'X') {
        if (initialState === '|0⟩') {
          resState = '|1⟩';
          p0 = 0;
          p1 = 100;
        } else if (initialState === '|1⟩') {
          resState = '|0⟩';
          p0 = 100;
          p1 = 0;
        } else {
          resState = '|+⟩';
          p0 = 50;
          p1 = 50;
        }
      } else if (selectedGate === 'Z') {
        resState = initialState === '|+⟩' ? '|-⟩' : initialState;
        p0 = 50;
        p1 = 50;
      } else if (selectedGate === 'Y') {
        resState = initialState === '|0⟩' ? 'i|1⟩' : '-i|0⟩';
        p0 = initialState === '|0⟩' ? 0 : 100;
        p1 = initialState === '|0⟩' ? 100 : 0;
      }

      setMeasuredState(resState);
      setMeasuredProb({ p0, p1 });
      setLabStatus('measured');
      setIsLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      if (onPlaySound) onPlaySound('correct');
    }, 1200);
  };

  return (
    <div className="interactive-lab-container">
      <div className="lab-header-banner">
        <h3 className="lab-title">🧪 {labData?.title || 'Interactive Quantum Lab'}</h3>
        <p className="lab-desc">{labData?.description || 'Experiment with state preparation, quantum gates, and measurements.'}</p>
      </div>

      <div className="lab-workspace-card">
        {/* Step 1: Initial State */}
        <div className="lab-control-group">
          <span className="lab-group-label">1. Prepare Initial Qubit State:</span>
          <div className="lab-state-btn-row">
            {states.map((st) => (
              <button
                key={st}
                type="button"
                className={`lab-state-select-btn ${initialState === st ? 'state-active' : ''}`}
                onClick={() => handleSelectState(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Gate Selection */}
        <div className="lab-control-group">
          <span className="lab-group-label">2. Choose Quantum Gate:</span>
          <div className="lab-gate-btn-row">
            {availableGates.map((g) => (
              <button
                key={g}
                type="button"
                className={`lab-gate-select-btn ${selectedGate === g ? 'gate-active' : ''}`}
                onClick={() => handleSelectGate(g)}
              >
                <span className="lab-gate-symbol">{g}</span>
                <span className="lab-gate-sub">{g === 'H' ? 'Hadamard' : g === 'X' ? 'NOT' : g === 'Z' ? 'Phase' : `${g} Gate`}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Lab Canvas / Stage */}
        <div className="lab-canvas-viewport">
          {isLoading ? (
            <div className="lab-spinner-box">
              <Loader size="54px" color="var(--purple, #9333EA)" />
              <span className="lab-loading-text">Executing pulse sequences on quantum hardware...</span>
            </div>
          ) : (
            <div className="lab-flow-diagram">
              <div className="lab-stage-item">
                <span className="stage-lbl">INPUT</span>
                <div className="stage-bubble bubble-input">{initialState}</div>
              </div>

              <span className="stage-arrow">➔</span>

              <div className="lab-stage-item">
                <span className="stage-lbl">OPERATION</span>
                <div className="stage-bubble bubble-op">[{selectedGate}]</div>
              </div>

              <span className="stage-arrow">➔</span>

              <div className="lab-stage-item">
                <span className="stage-lbl">QUANTUM STATE</span>
                <div className="stage-bubble bubble-state">
                  {labStatus === 'measured' ? measuredState : '?'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Measurement Result Histogram */}
        {labStatus === 'measured' && !isLoading && (
          <div className="lab-measurement-results-card">
            <h4 className="lab-result-headline">⚡ Measurement Outcomes (1024 Shots):</h4>
            <div className="lab-prob-bars-grid">
              <div className="prob-bar-col">
                <span className="prob-col-label">|0⟩ Ground</span>
                <div className="prob-meter-v">
                  <div
                    className="prob-meter-fill-0"
                    style={{ height: `${measuredProb.p0}%` }}
                  />
                </div>
                <span className="prob-col-pct">{measuredProb.p0}%</span>
              </div>

              <div className="prob-bar-col">
                <span className="prob-col-label">|1⟩ Excited</span>
                <div className="prob-meter-v">
                  <div
                    className="prob-meter-fill-1"
                    style={{ height: `${measuredProb.p1}%` }}
                  />
                </div>
                <span className="prob-col-pct">{measuredProb.p1}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Row */}
      <div className="math-actions-row">
        {labStatus !== 'measured' ? (
          <button
            type="button"
            className="btn-math-check btn-run-lab"
            disabled={labStatus === 'running'}
            onClick={handleRunExperiment}
          >
            ▶ RUN QUANTUM EXPERIMENT
          </button>
        ) : (
          <button
            type="button"
            className="btn-math-continue"
            onClick={() => {
              if (onPlaySound) onPlaySound('click');
              onComplete?.();
            }}
          >
            Complete Lab (+{labData?.rewardXP || 50} XP) →
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveLabSection;
