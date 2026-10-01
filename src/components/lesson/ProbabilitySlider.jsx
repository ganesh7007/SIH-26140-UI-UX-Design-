import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

export const ProbabilitySlider = ({
  data,
  onComplete,
  onPlaySound
}) => {
  // data: {
  //   prompt: "Tune the superposition state to have a 75% probability of measuring |0⟩:",
  //   targetProb0: 75,
  //   tolerance: 2,
  //   rewardXP: 20,
  //   explanation: "When |α|² = 0.75, the amplitude α = √3/2 ≈ 0.866 and β = 1/2 = 0.5.",
  //   hints: ["Recall that P(|0⟩) = |α|².", "If P(|0⟩) is 75%, P(|1⟩) must be 25% because probabilities sum to 100%."]
  // }

  const [prob0, setProb0] = useState(50);
  const [checkedState, setCheckedState] = useState(null); // 'correct' | 'wrong' | null
  const [wrongCount, setWrongCount] = useState(0);

  const prob1 = 100 - prob0;
  const alpha = Math.sqrt(prob0 / 100).toFixed(3);
  const beta = Math.sqrt(prob1 / 100).toFixed(3);

  const handleSliderChange = (e) => {
    setProb0(Number(e.target.value));
    setCheckedState(null);
  };

  const handleCheck = () => {
    const target = data.targetProb0 ?? 75;
    const tol = data.tolerance ?? 2;
    const isCorrect = Math.abs(prob0 - target) <= tol;

    if (isCorrect) {
      setCheckedState('correct');
      if (onPlaySound) onPlaySound('correct');
    } else {
      setCheckedState('wrong');
      setWrongCount((prev) => prev + 1);
      if (onPlaySound) onPlaySound('wrong');
    }
  };

  return (
    <div className="math-activity-card probability-slider-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.prompt}</h3>
      </div>

      <div className="prob-slider-interactive-stage">
        {/* State Vector Display */}
        <div className="prob-state-display-box">
          <span className="state-math-display">
            |ψ⟩ = <strong className="alpha-val">{alpha}</strong>|0⟩ +{' '}
            <strong className="beta-val">{beta}</strong>|1⟩
          </span>
          <span className="prob-norm-sub">|α|² + |β|² = {(Number(alpha)**2 + Number(beta)**2).toFixed(2)} = 1.00</span>
        </div>

        {/* Dual Probability Bar */}
        <div className="prob-dual-bar-container">
          <div className="prob-bar-label-row">
            <span>P(|0⟩) = {prob0}%</span>
            <span>P(|1⟩) = {prob1}%</span>
          </div>
          <div className="prob-bar-track">
            <div
              className="prob-bar-fill-0"
              style={{ width: `${prob0}%` }}
              title={`|0⟩: ${prob0}%`}
            />
            <div
              className="prob-bar-fill-1"
              style={{ width: `${prob1}%` }}
              title={`|1⟩: ${prob1}%`}
            />
          </div>
        </div>

        {/* Slider Input */}
        <div className="prob-slider-control-row">
          <span className="slider-edge-tag">0% |0⟩</span>
          <input
            type="range"
            min="0"
            max="100"
            value={prob0}
            onChange={handleSliderChange}
            className="quantum-prob-slider"
            aria-label="Adjust probability of |0⟩"
          />
          <span className="slider-edge-tag">100% |0⟩</span>
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
              <h4>✓ Target State Configured! +{data.rewardXP || 20} QXP</h4>
              <p>{data.explanation}</p>
            </div>
          ) : (
            <div>
              <h4>Not quite at the target probability.</h4>
              <p>Adjust the slider closer to the requested probability of |0⟩.</p>
            </div>
          )}
        </div>
      )}

      {/* Action Row */}
      <div className="math-actions-row">
        {checkedState !== 'correct' ? (
          <button type="button" className="btn-math-check" onClick={handleCheck}>
            Check Probability
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

export default ProbabilitySlider;
