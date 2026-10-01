import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

/**
 * Lightweight Quantum State Simulator for Single/Two Qubit circuits.
 */
function simulateCircuit(initialState = '|0⟩', gates = []) {
  let finalStateLabel = initialState;
  let prob0 = 100;
  let prob1 = 0;
  let isSuperposition = false;

  if (initialState === '|1⟩') {
    prob0 = 0;
    prob1 = 100;
  } else if (initialState === '|+⟩') {
    prob0 = 50;
    prob1 = 50;
    isSuperposition = true;
  }

  gates.forEach((g) => {
    if (!g) return;
    if (g === 'X') {
      if (finalStateLabel === '|0⟩') {
        finalStateLabel = '|1⟩';
        prob0 = 0;
        prob1 = 100;
      } else if (finalStateLabel === '|1⟩') {
        finalStateLabel = '|0⟩';
        prob0 = 100;
        prob1 = 0;
      } else if (finalStateLabel.includes('|+⟩')) {
        finalStateLabel = '|+⟩';
        prob0 = 50;
        prob1 = 50;
      } else if (finalStateLabel.includes('|-⟩')) {
        finalStateLabel = '-|-⟩';
        prob0 = 50;
        prob1 = 50;
      }
    } else if (g === 'H') {
      if (finalStateLabel === '|0⟩') {
        finalStateLabel = '|+⟩ = (|0⟩ + |1⟩)/√2';
        prob0 = 50;
        prob1 = 50;
        isSuperposition = true;
      } else if (finalStateLabel === '|1⟩') {
        finalStateLabel = '|-⟩ = (|0⟩ - |1⟩)/√2';
        prob0 = 50;
        prob1 = 50;
        isSuperposition = true;
      } else if (finalStateLabel.includes('|+⟩')) {
        finalStateLabel = '|0⟩';
        prob0 = 100;
        prob1 = 0;
        isSuperposition = false;
      } else if (finalStateLabel.includes('|-⟩')) {
        finalStateLabel = '|1⟩';
        prob0 = 0;
        prob1 = 100;
        isSuperposition = false;
      }
    } else if (g === 'Z') {
      if (finalStateLabel === '|0⟩') {
        finalStateLabel = '|0⟩';
        prob0 = 100;
        prob1 = 0;
      } else if (finalStateLabel === '|1⟩') {
        finalStateLabel = '-|1⟩';
        prob0 = 0;
        prob1 = 100;
      } else if (finalStateLabel.includes('|+⟩')) {
        finalStateLabel = '|-⟩ = (|0⟩ - |1⟩)/√2';
        prob0 = 50;
        prob1 = 50;
      } else if (finalStateLabel.includes('|-⟩')) {
        finalStateLabel = '|+⟩ = (|0⟩ + |1⟩)/√2';
        prob0 = 50;
        prob1 = 50;
      }
    } else if (g === 'Y') {
      if (finalStateLabel === '|0⟩') {
        finalStateLabel = 'i|1⟩';
        prob0 = 0;
        prob1 = 100;
      } else if (finalStateLabel === '|1⟩') {
        finalStateLabel = '-i|0⟩';
        prob0 = 100;
        prob1 = 0;
      }
    } else if (g === 'CNOT') {
      finalStateLabel = '(|00⟩ + |11⟩)/√2 (Bell State)';
      prob0 = 50;
      prob1 = 50;
    }
  });

  return {
    stateLabel: finalStateLabel,
    prob0,
    prob1,
    isSuperposition
  };
}

export const CircuitBuilderActivity = ({
  data = {},
  onComplete,
  onPlaySound
}) => {
  const expectedGate =
    data.correctGate ||
    data.targetGate ||
    (data.targetState === '|+⟩'
      ? 'H'
      : data.targetState === '|1⟩'
      ? 'X'
      : data.targetState === '|-⟩'
      ? 'Z'
      : 'H');

  const [placedGate, setPlacedGate] = useState(null);
  const [hasRun, setHasRun] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const availableGates = data?.availableGates || data?.gates || ['H', 'X', 'Z', 'Y'];

  const handleSelectGate = (gate) => {
    if (onPlaySound) onPlaySound('click');
    setPlacedGate(gate);
    setHasRun(false);
    setSimulationResult(null);
  };

  const handleRemoveGate = () => {
    if (onPlaySound) onPlaySound('click');
    setPlacedGate(null);
    setHasRun(false);
    setSimulationResult(null);
  };

  const handleRunCircuit = () => {
    if (!placedGate) return;
    if (onPlaySound) onPlaySound('click');
    setIsSimulating(true);

    setTimeout(() => {
      const result = simulateCircuit(data.initialState || '|0⟩', [placedGate]);
      setSimulationResult(result);
      setHasRun(true);
      setIsSimulating(false);

      const isCorrect =
        placedGate === expectedGate ||
        (data.targetState && result.stateLabel.includes(data.targetState));

      if (isCorrect) {
        if (onPlaySound) onPlaySound('correct');
      } else {
        setWrongCount((prev) => prev + 1);
        if (onPlaySound) onPlaySound('wrong');
      }
    }, 450);
  };

  const isSuccess =
    hasRun &&
    (placedGate === expectedGate ||
      (data.targetState && simulationResult?.stateLabel?.includes(data.targetState)));

  const subtitleText = data.prompt || data.goal || (data.targetState ? `Target State: ${data.targetState}` : `Apply the ${expectedGate} gate to transform the state.`);

  return (
    <div className="math-activity-card circuit-activity-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.title || subtitleText}</h3>
        {subtitleText && (
          <p className="circuit-activity-subtitle">{subtitleText}</p>
        )}
      </div>

      {/* Visual Circuit Diagram Wire */}
      <div className="circuit-stage-board">
        <div className="circuit-wire-row">
          <div className="wire-qubit-label">
            <span className="qubit-reg-name">q[0]</span>
            <span className="qubit-init-state">{data.initialState || '|0⟩'}</span>
          </div>

          <div className="wire-line-track">
            <div className="wire-connector-line" />

            {/* Target Gate Slot */}
            <div
              className={`circuit-wire-slot ${placedGate ? 'slot-occupied' : 'slot-waiting'}`}
              onClick={placedGate ? handleRemoveGate : null}
              title={placedGate ? 'Click to remove gate' : 'Select a gate below'}
            >
              {placedGate ? (
                <div className="placed-gate-chip">
                  <span className="gate-letter-text">{placedGate}</span>
                  {!hasRun && <span className="gate-remove-badge">×</span>}
                </div>
              ) : (
                <span className="slot-empty-icon">?</span>
              )}
            </div>

            <div className="wire-connector-line" />

            {/* Measurement Gauge Box */}
            <div className="circuit-wire-measure">
              <span className="measure-meter-icon">⚡</span>
              <span className="measure-label">Measure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Gate Palette */}
      <div className="circuit-gate-palette">
        <span className="palette-label">Available Quantum Gates:</span>
        <div className="circuit-gate-grid">
          {availableGates.map((gate) => {
            const isSelected = placedGate === gate;
            return (
              <button
                key={gate}
                type="button"
                className={`circuit-gate-btn-item ${isSelected ? 'gate-btn-active' : ''}`}
                onClick={() => handleSelectGate(gate)}
              >
                <span className="gate-chip-icon">{gate}</span>
                <span className="gate-name-label">
                  {gate === 'H'
                    ? 'Hadamard'
                    : gate === 'X'
                    ? 'Pauli-X'
                    : gate === 'Z'
                    ? 'Pauli-Z'
                    : gate === 'Y'
                    ? 'Pauli-Y'
                    : gate === 'CNOT'
                    ? 'Ctrl-NOT'
                    : `${gate} Gate`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulation Execution & State Readout */}
      {isSimulating && (
        <div className="circuit-simulating-spinner">
          <span className="pulse-atom">⚛️</span>
          <span>Simulating unitary matrix evolution on Quantum Processor...</span>
        </div>
      )}

      {hasRun && simulationResult && (
        <div
          className={`circuit-result-panel ${
            isSuccess ? 'circuit-result-success' : 'circuit-result-wrong'
          }`}
        >
          <div className="circuit-result-header">
            {isSuccess ? (
              <div className="result-headline-row">
                <span className="result-badge-check">✓ Circuit Valid!</span>
                <span className="result-state-pill">⚛️ State: {simulationResult.stateLabel}</span>
              </div>
            ) : (
              <div className="result-headline-row">
                <span className="result-badge-warn">⚠️ State Mismatch</span>
                <span className="result-state-pill">Result: {simulationResult.stateLabel}</span>
              </div>
            )}
          </div>

          <div className="circuit-prob-bars-grid">
            <div className="prob-bar-col">
              <span className="prob-col-label">P(|0⟩)</span>
              <div className="prob-meter-v">
                <div
                  className="prob-meter-fill-0"
                  style={{ height: `${simulationResult.prob0}%` }}
                />
              </div>
              <span className="prob-col-pct">{simulationResult.prob0}%</span>
            </div>

            <div className="prob-bar-col">
              <span className="prob-col-label">P(|1⟩)</span>
              <div className="prob-meter-v">
                <div
                  className="prob-meter-fill-1"
                  style={{ height: `${simulationResult.prob1}%` }}
                />
              </div>
              <span className="prob-col-pct">{simulationResult.prob1}%</span>
            </div>
          </div>

          <p className="circuit-result-explanation">
            {isSuccess ? (data.explanation || `Successfully transformed the quantum wire using the ${placedGate} gate, reaching state ${simulationResult.stateLabel}.`) : 'This circuit produces a different state. Try another gate to achieve the target state.'}
          </p>
        </div>
      )}

      {/* Action Row */}
      <div className="math-actions-row">
        {!hasRun || !isSuccess ? (
          <button
            type="button"
            className="btn-math-check btn-run-circuit"
            disabled={!placedGate || isSimulating}
            onClick={handleRunCircuit}
          >
            ▶ RUN CIRCUIT
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
            Continue (+{data.rewardXP || 25} QXP) →
          </button>
        )}
      </div>

      {/* Progressive Multi-Tier Hints */}
      {data.hints && data.hints.length > 0 && (
        <ProgressiveHint
          hints={data.hints}
          wrongAttempts={wrongCount}
          threshold={2}
          onPlaySound={onPlaySound}
        />
      )}
    </div>
  );
};

export default CircuitBuilderActivity;
