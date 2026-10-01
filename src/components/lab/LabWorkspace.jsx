import React, { useState, useRef, useEffect } from 'react';
import Loader from '../ui/loader-1';

export const LabWorkspace = ({
  lab,
  onCompleteLab,
  onBackToDashboard,
  onPlaySound = () => {}
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = lab.steps[currentStepIndex];

  // Interactive step states
  const [selectedPredictOption, setSelectedPredictOption] = useState(null);
  const [isPredictAnswered, setIsPredictAnswered] = useState(false);

  const [qubitState, setQubitState] = useState('uninitialized'); // 'uninitialized' | 'zero' | 'one' | 'super'
  const [placedGate, setPlacedGate] = useState(null);
  const [invalidGateWarning, setInvalidGateWarning] = useState(null);

  const [isExecuting, setIsExecuting] = useState(false);
  const [showPencilLoader, setShowPencilLoader] = useState(false);
  const loaderTimeoutRef = useRef(null);

  // Measurement states (for Lab 04)
  const [singleMeasurementResult, setSingleMeasurementResult] = useState(null);
  const [shotCounts, setShotCounts] = useState({ zeros: 0, ones: 0, total: 0 });
  const [isMeasuringBatch, setIsMeasuringBatch] = useState(false);

  // Explanation challenge state
  const [selectedExplainOption, setSelectedExplainOption] = useState(null);
  const [isExplainAnswered, setIsExplainAnswered] = useState(false);

  // Progressive Hint System
  const [hintIndex, setHintIndex] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);

  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  // Handle Hint Request
  const handleOpenHint = () => {
    onPlaySound('click');
    setShowHintModal(true);
  };

  const handleNextHint = () => {
    onPlaySound('click');
    if (hintIndex < lab.progressiveHints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  // Step 1: Handle Prediction
  const handleSelectPredict = (index) => {
    if (isPredictAnswered) return;
    setSelectedPredictOption(index);
    setIsPredictAnswered(true);

    if (index === currentStep.correctOption) {
      onPlaySound('correct');
    } else {
      onPlaySound('error');
    }
  };

  // Step 2: Handle Initialization (Lab 01)
  const handleInitializeQubit = () => {
    onPlaySound('correct');
    setQubitState('zero');
  };

  // Step 2: Handle Gate Placement (Labs 02, 03, 05)
  const handlePlaceGate = (gate) => {
    onPlaySound('click');
    setInvalidGateWarning(null);

    if (lab.targetGate && gate !== lab.targetGate) {
      onPlaySound('error');
      setInvalidGateWarning(`⚠️ The ${gate} gate doesn't fulfill the mission objective for this circuit. Try another gate!`);
      return;
    }

    setPlacedGate(gate);
    if (gate === 'X') setQubitState('one');
    else if (gate === 'H') setQubitState('super');
    else if (gate === 'Z') setQubitState('zero');
    onPlaySound('correct');
  };

  // Step 3: Run Circuit Execution
  const handleRunCircuit = (durationMs = 900) => {
    onPlaySound('click');
    setIsExecuting(true);
    setShowPencilLoader(false);

    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
    }

    loaderTimeoutRef.current = setTimeout(() => {
      setShowPencilLoader(true);
    }, 500);

    setTimeout(() => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
        loaderTimeoutRef.current = null;
      }
      setShowPencilLoader(false);
      setIsExecuting(false);
      onPlaySound('correct');
      // Advance to next step
      setCurrentStepIndex((prev) => prev + 1);
    }, durationMs);
  };

  // Step 4: Single Measurement (Lab 04)
  const handleSingleMeasurement = () => {
    onPlaySound('click');
    const outcome = Math.random() < 0.5 ? '0' : '1';
    setSingleMeasurementResult(outcome);
    setQubitState(outcome === '0' ? 'zero' : 'one');
    onPlaySound('correct');
  };

  // Step 4: Batch Measurement (Lab 04)
  const handleBatchMeasurement = (totalShots = 25) => {
    onPlaySound('click');
    setIsMeasuringBatch(true);
    let zeros = 0;
    let ones = 0;

    for (let i = 0; i < totalShots; i++) {
      if (Math.random() < 0.5) zeros++;
      else ones++;
    }

    setTimeout(() => {
      setShotCounts({ zeros, ones, total: totalShots });
      setIsMeasuringBatch(false);
      onPlaySound('correct');
    }, 600);
  };

  // Step 5: Handle Explanation Challenge
  const handleSelectExplain = (index) => {
    if (isExplainAnswered) return;
    setSelectedExplainOption(index);
    setIsExplainAnswered(true);

    if (index === currentStep.correctOption) {
      onPlaySound('correct');
    } else {
      onPlaySound('error');
    }
  };

  // Complete Lab Handler
  const handleFinishLab = () => {
    onPlaySound('correct');
    onCompleteLab(lab);
  };

  return (
    <div className="lab-workspace-wrapper">
      {/* Top Navigation Bar */}
      <div className="lab-workspace-nav">
        <button
          type="button"
          className="btn-secondary lab-nav-back-btn"
          onClick={() => {
            onPlaySound('click');
            onBackToDashboard();
          }}
        >
          ← Exit Lab
        </button>

        <div className="lab-nav-center">
          <span className="lab-nav-badge">{lab.labNumber}</span>
          <h2 className="lab-nav-title">{lab.title}</h2>
        </div>

        <div className="lab-nav-actions">
          <button
            type="button"
            className="btn-secondary lab-hint-trigger-btn"
            onClick={handleOpenHint}
          >
            💡 Hint ({hintIndex + 1}/{lab.progressiveHints.length})
          </button>
        </div>
      </div>

      {/* Progressive Step Breadcrumbs */}
      <div className="lab-step-progress-row">
        {lab.steps.map((step, idx) => {
          let stepStatus = 'future';
          if (idx < currentStepIndex) stepStatus = 'done';
          else if (idx === currentStepIndex) stepStatus = 'active';

          return (
            <div key={idx} className={`lab-step-indicator ${stepStatus}`}>
              <span className="step-num">{idx + 1}</span>
              <span className="step-name">{step.type.toUpperCase()}</span>
            </div>
          );
        })}
      </div>

      {/* Main Workspace Card */}
      <div className="lab-workspace-canvas">
        {/* Step Title & Instruction Header */}
        <div className="workspace-step-header">
          <h3 className="step-headline">{currentStep.title}</h3>
          {currentStep.instruction && (
            <p className="step-instruction-text">{currentStep.instruction}</p>
          )}
        </div>

        {/* =========================================================================
            1. PREDICT STEP
            ========================================================================= */}
        {currentStep.type === 'predict' && (
          <div className="lab-interactive-step step-predict-box">
            <p className="predict-prompt-text">{currentStep.prompt}</p>

            <div className="predict-options-list">
              {currentStep.options.map((optionText, idx) => {
                let statusClass = '';
                if (isPredictAnswered) {
                  if (idx === currentStep.correctOption) statusClass = 'correct-opt';
                  else if (idx === selectedPredictOption) statusClass = 'wrong-opt';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`predict-option-btn ${statusClass}`}
                    onClick={() => handleSelectPredict(idx)}
                  >
                    <span className="opt-letter-pill">{String.fromCharCode(65 + idx)}</span>
                    <span className="opt-text-label">{optionText}</span>
                  </button>
                );
              })}
            </div>

            {isPredictAnswered && (
              <div className={`predict-feedback-banner ${selectedPredictOption === currentStep.correctOption ? 'feedback-success' : 'feedback-notice'}`}>
                <p>{currentStep.explanation}</p>
                <button
                  type="button"
                  className="btn-primary btn-3d step-continue-btn"
                  onClick={() => {
                    onPlaySound('click');
                    setCurrentStepIndex((prev) => prev + 1);
                  }}
                >
                  Continue to Next Step →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            2. INITIALIZE STEP (Lab 01)
            ========================================================================= */}
        {currentStep.type === 'initialize' && (
          <div className="lab-interactive-step step-initialize-box">
            <div className="qubit-console-center">
              <div className={`qubit-sphere-large ${qubitState === 'zero' ? 'qubit-active-zero' : 'qubit-uninitialized'}`}>
                <span>{qubitState === 'zero' ? '|0⟩' : '?'}</span>
              </div>
              <span className="qubit-state-tag">
                State: <strong>{qubitState === 'zero' ? '|0⟩ (Ground State)' : 'Unprepared'}</strong>
              </span>
            </div>

            {qubitState === 'uninitialized' ? (
              <button
                type="button"
                className="btn-primary btn-3d glow-primary lab-action-button"
                onClick={handleInitializeQubit}
              >
                ⚛️ {currentStep.actionLabel}
              </button>
            ) : (
              <div className="step-completed-action-row">
                <div className="init-success-banner">✓ Qubit successfully initialized into |0⟩!</div>
                <button
                  type="button"
                  className="btn-primary btn-3d step-continue-btn"
                  onClick={() => {
                    onPlaySound('click');
                    setCurrentStepIndex((prev) => prev + 1);
                  }}
                >
                  Proceed to Experiment →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            3. BUILD CIRCUIT STEP (Labs 02, 03, 05)
            ========================================================================= */}
        {currentStep.type === 'build' && (
          <div className="lab-interactive-step step-build-box">
            {/* Interactive Circuit Wire */}
            <div className="circuit-wire-wrapper">
              <span className="wire-state-prefix">|0⟩</span>
              <div className="wire-line-track">
                <div className={`gate-drop-slot ${placedGate ? 'gate-slotted' : 'gate-empty'}`}>
                  {placedGate ? (
                    <span className="slotted-gate-token">{placedGate}</span>
                  ) : (
                    <span className="slot-placeholder">Drop / Click Gate Here</span>
                  )}
                </div>
              </div>
              <span className="wire-measure-box">M</span>
            </div>

            {invalidGateWarning && (
              <div className="invalid-gate-alert">{invalidGateWarning}</div>
            )}

            {/* Available Gates Palette */}
            <div className="gate-palette-area">
              <span className="palette-title">Available Quantum Operations:</span>
              <div className="gate-palette-buttons">
                {(lab.availableGates || ['X', 'H', 'Z']).map((gate) => (
                  <button
                    key={gate}
                    type="button"
                    className={`gate-palette-btn ${gate === lab.targetGate ? 'target-highlight' : ''}`}
                    onClick={() => handlePlaceGate(gate)}
                  >
                    [ {gate} ]
                  </button>
                ))}
              </div>
            </div>

            {placedGate && (
              <div className="build-ready-banner">
                <span>✓ Circuit assembled with <strong>[{placedGate}]</strong> gate!</span>
                <button
                  type="button"
                  className="btn-primary btn-3d step-continue-btn"
                  onClick={() => {
                    onPlaySound('click');
                    setCurrentStepIndex((prev) => prev + 1);
                  }}
                >
                  Ready to Run Circuit →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            4. RUN STEP
            ========================================================================= */}
        {currentStep.type === 'run' && (
          <div className="lab-interactive-step step-run-box">
            <div className="qubit-run-preview">
              <div className="circuit-wire-wrapper compact">
                <span className="wire-state-prefix">{lab.initialState || '|0⟩'}</span>
                <div className="wire-line-track">
                  <div className="gate-drop-slot gate-slotted">
                    <span className="slotted-gate-token">{placedGate || (lab.id === 'lab-01' ? 'INIT' : 'H')}</span>
                  </div>
                </div>
                <span className="wire-measure-box">M</span>
              </div>
            </div>

            {/* Delayed Loading Overlay */}
            {showPencilLoader && (
              <div className="sim-loading-modal-overlay">
                <Loader size="48px" />
                <p className="loading-sim-text">Executing Quantum Hardware Simulation...</p>
              </div>
            )}

            <button
              type="button"
              className="btn-primary btn-3d glow-primary lab-action-button"
              disabled={isExecuting}
              onClick={() => handleRunCircuit(1100)}
            >
              {isExecuting ? 'SIMULATING WAVEFUNCTION...' : `▶ ${currentStep.actionLabel}`}
            </button>
          </div>
        )}

        {/* =========================================================================
            5. SINGLE MEASURE STEP (Lab 04)
            ========================================================================= */}
        {currentStep.type === 'single_measure' && (
          <div className="lab-interactive-step step-single-measure-box">
            <div className="qubit-console-center">
              <div className={`qubit-sphere-large ${singleMeasurementResult === '0' ? 'qubit-active-zero' : singleMeasurementResult === '1' ? 'qubit-active-one' : 'qubit-state-super'}`}>
                <span>{singleMeasurementResult !== null ? singleMeasurementResult : 'Ψ'}</span>
              </div>
              <span className="qubit-state-tag">
                State: <strong>{singleMeasurementResult !== null ? `Collapsed to |${singleMeasurementResult}⟩` : 'Superposition |+⟩'}</strong>
              </span>
            </div>

            {singleMeasurementResult === null ? (
              <button
                type="button"
                className="btn-primary btn-3d glow-primary lab-action-button"
                onClick={handleSingleMeasurement}
              >
                ⚡ {currentStep.actionLabel}
              </button>
            ) : (
              <div className="step-completed-action-row">
                <div className="measurement-result-callout">
                  The continuous quantum state collapsed into a discrete classical outcome: <strong>{singleMeasurementResult}</strong>!
                </div>
                <button
                  type="button"
                  className="btn-primary btn-3d step-continue-btn"
                  onClick={() => {
                    onPlaySound('click');
                    setCurrentStepIndex((prev) => prev + 1);
                  }}
                >
                  Proceed to Multi-Shot Statistics →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            6. MULTI MEASURE STEP (Lab 04)
            ========================================================================= */}
        {currentStep.type === 'multi_measure' && (
          <div className="lab-interactive-step step-multi-measure-box">
            {shotCounts.total === 0 ? (
              <button
                type="button"
                className="btn-primary btn-3d glow-primary lab-action-button"
                disabled={isMeasuringBatch}
                onClick={() => handleBatchMeasurement(25)}
              >
                {isMeasuringBatch ? 'COLLECTING 25 SHOTS...' : `📊 ${currentStep.actionLabel}`}
              </button>
            ) : (
              <div className="multi-shot-results-dashboard">
                <div className="shot-bar-card">
                  <div className="shot-bar-header">
                    <span>|0⟩ Outcomes</span>
                    <strong>{shotCounts.zeros} / {shotCounts.total} ({Math.round((shotCounts.zeros / shotCounts.total) * 100)}%)</strong>
                  </div>
                  <div className="shot-bar-track">
                    <div className="shot-bar-fill fill-0" style={{ width: `${(shotCounts.zeros / shotCounts.total) * 100}%` }}></div>
                  </div>
                </div>

                <div className="shot-bar-card">
                  <div className="shot-bar-header">
                    <span>|1⟩ Outcomes</span>
                    <strong>{shotCounts.ones} / {shotCounts.total} ({Math.round((shotCounts.ones / shotCounts.total) * 100)}%)</strong>
                  </div>
                  <div className="shot-bar-track">
                    <div className="shot-bar-fill fill-1" style={{ width: `${(shotCounts.ones / shotCounts.total) * 100}%` }}></div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary btn-3d step-continue-btn"
                  style={{ marginTop: '16px' }}
                  onClick={() => {
                    onPlaySound('click');
                    setCurrentStepIndex((prev) => prev + 1);
                  }}
                >
                  Observe Distribution →
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            7. OBSERVE STEP
            ========================================================================= */}
        {currentStep.type === 'observe' && (
          <div className="lab-interactive-step step-observe-box">
            {currentStep.stateVector && (
              <div className="state-vector-display">
                <span className="vector-label">Wavefunction:</span>
                <span className="vector-equation">{currentStep.stateVector}</span>
              </div>
            )}

            {/* Probability Meters */}
            {(currentStep.probability0 !== undefined || currentStep.probability1 !== undefined) && (
              <div className="quantum-prob-meter-group">
                <div className="prob-meter-row">
                  <span className="prob-meter-label">|0⟩ Probability</span>
                  <div className="prob-meter-track">
                    <div className="prob-meter-fill fill-0" style={{ width: `${currentStep.probability0}%` }}></div>
                  </div>
                  <span className="prob-meter-val">{currentStep.probability0}%</span>
                </div>
                <div className="prob-meter-row">
                  <span className="prob-meter-label">|1⟩ Probability</span>
                  <div className="prob-meter-track">
                    <div className="prob-meter-fill fill-1" style={{ width: `${currentStep.probability1}%` }}></div>
                  </div>
                  <span className="prob-meter-val">{currentStep.probability1}%</span>
                </div>
              </div>
            )}

            <div className="observe-summary-banner">
              <span className="summary-icon">🔍</span>
              <p className="summary-text">{currentStep.summary}</p>
            </div>

            <button
              type="button"
              className="btn-primary btn-3d step-continue-btn"
              onClick={() => {
                onPlaySound('click');
                setCurrentStepIndex((prev) => prev + 1);
              }}
            >
              Continue to Explanation Challenge →
            </button>
          </div>
        )}

        {/* =========================================================================
            8. EXPLAIN STEP
            ========================================================================= */}
        {currentStep.type === 'explain' && (
          <div className="lab-interactive-step step-explain-box">
            <p className="predict-prompt-text">{currentStep.prompt}</p>

            <div className="predict-options-list">
              {currentStep.options.map((optionText, idx) => {
                let statusClass = '';
                if (isExplainAnswered) {
                  if (idx === currentStep.correctOption) statusClass = 'correct-opt';
                  else if (idx === selectedExplainOption) statusClass = 'wrong-opt';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`predict-option-btn ${statusClass}`}
                    onClick={() => handleSelectExplain(idx)}
                  >
                    <span className="opt-letter-pill">{String.fromCharCode(65 + idx)}</span>
                    <span className="opt-text-label">{optionText}</span>
                  </button>
                );
              })}
            </div>

            {isExplainAnswered && (
              <div className="predict-feedback-banner feedback-success">
                <p>{currentStep.explanation}</p>
                <button
                  type="button"
                  className="btn-primary btn-3d glow-primary step-continue-btn"
                  onClick={handleFinishLab}
                >
                  🎉 Complete Lab & Claim QXP →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progressive Hint Modal */}
      {showHintModal && (
        <div className="lab-modal-overlay" onClick={() => setShowHintModal(false)}>
          <div className="lab-hint-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="hint-modal-header">
              <span className="hint-modal-badge">💡 Progressive Hint {hintIndex + 1} of {lab.progressiveHints.length}</span>
              <button
                type="button"
                className="hint-close-btn"
                onClick={() => setShowHintModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="hint-modal-text">{lab.progressiveHints[hintIndex]}</p>

            <div className="hint-modal-actions">
              {hintIndex < lab.progressiveHints.length - 1 ? (
                <button
                  type="button"
                  className="btn-secondary btn-3d"
                  onClick={handleNextHint}
                >
                  Need Another Hint? →
                </button>
              ) : (
                <span className="final-hint-label">This is the final hint for this lab.</span>
              )}
              <button
                type="button"
                className="btn-primary btn-3d"
                onClick={() => setShowHintModal(false)}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabWorkspace;
