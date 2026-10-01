import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

export const CodeCircuitSplit = ({
  data,
  onComplete,
  onPlaySound
}) => {
  // data: {
  //   title: "Code + Circuit Synchronization",
  //   prompt: "Select the correct Qiskit operation in code to prepare the Bell state (|00⟩ + |11⟩)/√2:",
  //   targetGoal: "Create Bell state on q[0] and q[1]",
  //   codeSnippets: [
  //     { id: "opt1", line1: "qc.h(0)", line2: "qc.cx(0, 1)", isCorrect: true, desc: "H on qubit 0, then CNOT(0,1)" },
  //     { id: "opt2", line1: "qc.x(0)", line2: "qc.x(1)", isCorrect: false, desc: "X on qubit 0, X on qubit 1" },
  //     { id: "opt3", line1: "qc.h(0)", line2: "qc.h(1)", isCorrect: false, desc: "H on both qubits (no entanglement)" }
  //   ],
  //   explanation: "Applying H(0) creates equal superposition, and CNOT(0,1) entangles qubit 1 with qubit 0, producing |Φ⁺⟩.",
  //   rewardXP: 30,
  //   hints: ["First qubit needs superposition (|0⟩ -> |+⟩).", "Second gate must entangle the two qubits using a two-qubit gate."]
  // }

  const [selectedSnippetId, setSelectedSnippetId] = useState(data.codeSnippets?.[0]?.id || null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const activeSnippet = data.codeSnippets?.find((s) => s.id === selectedSnippetId) || data.codeSnippets?.[0];

  const handleSelectSnippet = (id) => {
    if (onPlaySound) onPlaySound('click');
    setSelectedSnippetId(id);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleCheck = () => {
    if (!activeSnippet) return;
    const correct = Boolean(activeSnippet.isCorrect);
    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      if (onPlaySound) onPlaySound('correct');
    } else {
      setWrongCount((prev) => prev + 1);
      if (onPlaySound) onPlaySound('wrong');
    }
  };

  return (
    <div className="math-activity-card split-code-circuit-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.title || data.prompt}</h3>
        {data.targetGoal && <p className="circuit-activity-subtitle">🎯 Goal: {data.targetGoal}</p>}
      </div>

      <div className="split-view-container">
        {/* LEFT COLUMN: Quantum Code Editor View */}
        <div className="split-code-column">
          <div className="code-column-header">
            <span className="code-dot dot-red" />
            <span className="code-dot dot-yellow" />
            <span className="code-dot dot-green" />
            <span className="code-file-title">main.py (Qiskit)</span>
          </div>

          <div className="code-editor-body">
            <div className="code-line-static">
              <span className="code-ln">1</span>
              <span className="code-kw">from</span> qiskit <span className="code-kw">import</span> QuantumCircuit
            </div>
            <div className="code-line-static">
              <span className="code-ln">2</span>
              qc = QuantumCircuit(2, 2)
            </div>
            <div className="code-line-static">
              <span className="code-ln">3</span>
              <span className="code-comment"># Interactive Operation Selection:</span>
            </div>

            {/* Selectable Snippets in Code */}
            <div className="code-snippets-options-list">
              {data.codeSnippets.map((snippet, idx) => {
                const isSelected = selectedSnippetId === snippet.id;
                return (
                  <div
                    key={snippet.id}
                    className={`code-snippet-block ${isSelected ? 'snippet-active' : ''}`}
                    onClick={() => handleSelectSnippet(snippet.id)}
                  >
                    <div className="snippet-selection-radio">
                      <span className="radio-circle">{isSelected ? '●' : '○'}</span>
                      <span className="snippet-opt-tag">Option {idx + 1}</span>
                    </div>
                    <div className="snippet-code-text">
                      <span className="code-ln">{4 + idx * 2}</span>
                      <span className="code-func">{snippet.line1}</span>
                    </div>
                    <div className="snippet-code-text">
                      <span className="code-ln">{5 + idx * 2}</span>
                      <span className="code-func">{snippet.line2}</span>
                    </div>
                    <span className="snippet-desc-tag">{snippet.desc}</span>
                  </div>
                );
              })}
            </div>

            <div className="code-line-static" style={{ marginTop: '6px' }}>
              <span className="code-ln">10</span>
              qc.measure_all()
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Synced Quantum Circuit */}
        <div className="split-circuit-column">
          <div className="circuit-column-header">
            <span className="circuit-col-title">⚛️ Circuit Diagram</span>
            <span className="circuit-live-indicator">LIVE SYNC</span>
          </div>

          <div className="split-circuit-diagram">
            {/* Qubit 0 Line */}
            <div className="split-wire-row">
              <div className="split-wire-tag">
                <span className="split-qname">q[0]</span>
                <span className="split-qstate">|0⟩</span>
              </div>
              <div className="split-wire-track">
                <div className="split-wire-line" />
                {activeSnippet?.line1?.includes('h(0)') && (
                  <div className="split-gate-badge gate-h">H</div>
                )}
                {activeSnippet?.line1?.includes('x(0)') && (
                  <div className="split-gate-badge gate-x">X</div>
                )}
                {activeSnippet?.line2?.includes('cx(0') && (
                  <div className="split-gate-cnot-ctrl">●</div>
                )}
                <div className="split-wire-line" />
                <div className="split-measure-node">⚡</div>
              </div>
            </div>

            {/* Qubit 1 Line */}
            <div className="split-wire-row" style={{ marginTop: '14px' }}>
              <div className="split-wire-tag">
                <span className="split-qname">q[1]</span>
                <span className="split-qstate">|0⟩</span>
              </div>
              <div className="split-wire-track">
                <div className="split-wire-line" />
                {activeSnippet?.line2?.includes('h(1)') && (
                  <div className="split-gate-badge gate-h">H</div>
                )}
                {activeSnippet?.line2?.includes('x(1)') && (
                  <div className="split-gate-badge gate-x">X</div>
                )}
                {activeSnippet?.line2?.includes('cx(0, 1)') && (
                  <div className="split-gate-cnot-target">⊕</div>
                )}
                <div className="split-wire-line" />
                <div className="split-measure-node">⚡</div>
              </div>
            </div>

            {/* Qubit CNOT vertical line if present */}
            {activeSnippet?.line2?.includes('cx(0, 1)') && (
              <div className="cnot-connection-vertical-line" />
            )}
          </div>

          <div className="circuit-sync-meta-box">
            <span className="sync-meta-lbl">Quantum State Flow:</span>
            <p className="sync-meta-desc">
              {activeSnippet?.isCorrect
                ? 'Input |00⟩ → H(0) → (|00⟩+|10⟩)/√2 → CNOT → (|00⟩+|11⟩)/√2'
                : 'Circuit updates in real-time as you select python instructions.'}
            </p>
          </div>
        </div>
      </div>

      {/* Validation Feedback */}
      {isChecked && (
        <div
          className={`math-feedback-banner ${
            isCorrect ? 'feedback-success' : 'feedback-wrong'
          }`}
        >
          {isCorrect ? (
            <div>
              <h4>✓ Perfect Code-Circuit Match! +{data.rewardXP || 30} QXP</h4>
              <p>{data.explanation}</p>
            </div>
          ) : (
            <div>
              <h4>⚠️ Not quite the target Bell state</h4>
              <p>Check which gates generate superposition and entanglement between q[0] and q[1].</p>
            </div>
          )}
        </div>
      )}

      {/* Action Row */}
      <div className="math-actions-row">
        {!isChecked || !isCorrect ? (
          <button
            type="button"
            className="btn-math-check"
            disabled={!selectedSnippetId}
            onClick={handleCheck}
          >
            Run Code & Verify Circuit
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
            Continue Learning →
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

export default CodeCircuitSplit;
