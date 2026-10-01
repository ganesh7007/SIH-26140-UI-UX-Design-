import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

/**
 * Normalizes mathematical strings for quantum equivalence comparison.
 */
export const normalizeMathExpression = (expr) => {
  if (!expr) return '';
  let clean = expr
    .replace(/\s+/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/');

  // Specific quantum equivalences
  const equivalences = [
    { regex: /^(π\/2|0\.5π|\(1\/2\)π|1\/2\*π|1\/2π|0\.5\*π|π\*0\.5)$/i, canonical: 'π/2' },
    { regex: /^(π\/4|0\.25π|\(1\/4\)π|1\/4\*π|1\/4π|0\.25\*π)$/i, canonical: 'π/4' },
    { regex: /^(1\/√2|√2\/2|\(√2\)\/2|1\/\(√2\)|0\.707)$/i, canonical: '1/√2' },
    { regex: /^(√3\/2|\(√3\)\/2|0\.866)$/i, canonical: '√3/2' },
    { regex: /^(π|1π|1\.0π)$/i, canonical: 'π' },
    { regex: /^(2π|2\.0π)$/i, canonical: '2π' },
    { regex: /^(0|0\.0|\+0|-0)$/i, canonical: '0' },
    { regex: /^(1|1\.0|\+1)$/i, canonical: '1' }
  ];

  for (const eq of equivalences) {
    if (eq.regex.test(clean)) {
      return eq.canonical;
    }
  }

  return clean;
};

export const FormulaBuilder = ({
  data,
  onComplete,
  onPlaySound
}) => {
  // data: {
  //   prompt: "Construct the rotation angle θ required to rotate |0⟩ to |+⟩ around Y-axis:",
  //   targetSymbol: "θ =",
  //   canonicalAnswer: "π/2",
  //   tokens: ["π", "2", "4", "√", "/", "+", "-", "θ", "i", "1"],
  //   explanation: "Rotating |0⟩ to |+⟩ via Ry(θ) requires θ = π/2.",
  //   rewardXP: 20,
  //   hints: ["Recall that |+⟩ lies on the X-axis of the Bloch sphere.", "The angle from the Z-axis (+|0⟩) to X-axis is 90 degrees or π/2 radians."]
  // }

  const [expressionTokens, setExpressionTokens] = useState([]);
  const [checkedState, setCheckedState] = useState(null); // 'correct' | 'wrong' | null
  const [wrongCount, setWrongCount] = useState(0);

  const handleAddToken = (tok) => {
    if (onPlaySound) onPlaySound('click');
    setExpressionTokens((prev) => [...prev, tok]);
    setCheckedState(null);
  };

  const handleBackspace = () => {
    if (expressionTokens.length === 0) return;
    if (onPlaySound) onPlaySound('click');
    setExpressionTokens((prev) => prev.slice(0, -1));
    setCheckedState(null);
  };

  const handleClear = () => {
    if (onPlaySound) onPlaySound('click');
    setExpressionTokens([]);
    setCheckedState(null);
  };

  const handleCheck = () => {
    if (expressionTokens.length === 0) return;
    const constructed = expressionTokens.join('');
    const normConstructed = normalizeMathExpression(constructed);
    const normTarget = normalizeMathExpression(data.canonicalAnswer);

    const isMatch = normConstructed === normTarget;

    if (isMatch) {
      setCheckedState('correct');
      if (onPlaySound) onPlaySound('correct');
    } else {
      setCheckedState('wrong');
      setWrongCount((prev) => prev + 1);
      if (onPlaySound) onPlaySound('wrong');
    }
  };

  return (
    <div className="math-activity-card formula-builder-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.prompt}</h3>
      </div>

      {/* Interactive Expression Display Screen */}
      <div className="formula-display-stage">
        <div className="formula-equation-row">
          <span className="formula-target-label">{data.targetSymbol || 'Equation ='}</span>
          <div className={`formula-tokens-tray ${checkedState ? `tray-${checkedState}` : ''}`}>
            {expressionTokens.length === 0 ? (
              <span className="tray-placeholder">Tap or drag symbols below to build...</span>
            ) : (
              expressionTokens.map((tok, idx) => (
                <span
                  key={idx}
                  className="constructed-token-chip"
                  onClick={() => {
                    if (checkedState !== 'correct') {
                      if (onPlaySound) onPlaySound('click');
                      setExpressionTokens((prev) => prev.filter((_, i) => i !== idx));
                      setCheckedState(null);
                    }
                  }}
                  title="Click to remove token"
                >
                  {tok}
                </span>
              ))
            )}
          </div>
        </div>

        {expressionTokens.length > 0 && checkedState !== 'correct' && (
          <div className="formula-control-buttons">
            <button
              type="button"
              className="btn-token-action"
              onClick={handleBackspace}
              title="Backspace"
            >
              ⌫ Delete
            </button>
            <button
              type="button"
              className="btn-token-action"
              onClick={handleClear}
              title="Clear all"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Draggable/Clickable Token Palette */}
      <div className="formula-token-palette">
        <span className="palette-title">Available Math Symbols:</span>
        <div className="palette-grid">
          {data.tokens.map((tok, idx) => (
            <button
              key={idx}
              type="button"
              className="math-symbol-btn"
              onClick={() => handleAddToken(tok)}
            >
              {tok}
            </button>
          ))}
        </div>
      </div>

      {/* Validation Feedback */}
      {checkedState && (
        <div
          className={`math-feedback-banner ${
            checkedState === 'correct' ? 'feedback-success' : 'feedback-wrong'
          }`}
        >
          {checkedState === 'correct' ? (
            <div>
              <h4>✓ Correct Expression! +{data.rewardXP || 20} QXP</h4>
              <p>{data.explanation}</p>
            </div>
          ) : (
            <div>
              <h4>⚠️ Not quite equivalent</h4>
              <p>Review the formula symbols. Remember to check order of operations!</p>
            </div>
          )}
        </div>
      )}

      {/* Action Row */}
      <div className="math-actions-row">
        {checkedState !== 'correct' ? (
          <button
            type="button"
            className="btn-math-check"
            disabled={expressionTokens.length === 0}
            onClick={handleCheck}
          >
            Validate Formula
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
            Continue →
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

export default FormulaBuilder;
