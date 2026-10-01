import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

export const StepCalculationPuzzle = ({
  data,
  onComplete,
  onPlaySound
}) => {
  // data: {
  //   title: "Calculate: Pauli-X Gate on |0⟩",
  //   prompt: "Apply the X gate to the ground state |0⟩ step-by-step.",
  //   rewardXP: 25,
  //   steps: [
  //     {
  //       stepNum: 1,
  //       instruction: "Step 1: Identify the column vector representation of |0⟩",
  //       question: "What is |0⟩ in vector form?",
  //       options: ["[1, 0]ᵀ", "[0, 1]ᵀ", "[1, 1]ᵀ", "[1/√2, 1/√2]ᵀ"],
  //       correct: 0,
  //       explanation: "|0⟩ is represented as the standard basis column vector [1, 0]ᵀ."
  //     },
  //     {
  //       stepNum: 2,
  //       instruction: "Step 2: Select the Pauli-X unitary matrix",
  //       question: "Which 2×2 matrix represents the X gate?",
  //       options: ["[[0, 1], [1, 0]]", "[[1, 0], [0, 1]]", "[[1, 0], [0, -1]]", "[[0, -i], [i, 0]]"],
  //       correct: 0,
  //       explanation: "Pauli-X is the bit-flip matrix [[0, 1], [1, 0]]."
  //     },
  //     {
  //       stepNum: 3,
  //       instruction: "Step 3: Perform matrix multiplication: X · |0⟩",
  //       question: "Compute [[0, 1], [1, 0]] · [1, 0]ᵀ:",
  //       options: ["[0·1 + 1·0, 1·1 + 0·0]ᵀ = [0, 1]ᵀ", "[1·1 + 0·0, 0·1 + 1·0]ᵀ = [1, 0]ᵀ", "[0, 0]ᵀ"],
  //       correct: 0,
  //       explanation: "Multiplying gives row1: 0·1+1·0=0, row2: 1·1+0·0=1 -> [0, 1]ᵀ."
  //     },
  //     {
  //       stepNum: 4,
  //       instruction: "Step 4: Interpret the final resulting quantum state",
  //       question: "Which quantum basis state corresponds to vector [0, 1]ᵀ?",
  //       options: ["|1⟩", "|0⟩", "|+⟩", "|-⟩"],
  //       correct: 0,
  //       explanation: "The vector [0, 1]ᵀ corresponds to the excited state |1⟩. Therefore, X|0⟩ = |1⟩!"
  //     }
  //   ],
  //   hints: ["Start by writing down the standard basis vectors.", "Remember that Pauli-X acts like a classical NOT gate."]
  // }

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);

  const currentStep = data.steps[activeStepIndex];
  const isFinished = completedSteps.length === data.steps.length;

  const handleSelectOption = (idx) => {
    if (isAnswerChecked) return;
    if (onPlaySound) onPlaySound('click');
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentStep.correct;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      if (onPlaySound) onPlaySound('correct');
      if (!completedSteps.includes(activeStepIndex)) {
        setCompletedSteps((prev) => [...prev, activeStepIndex]);
      }
    } else {
      setWrongCount((prev) => prev + 1);
      if (onPlaySound) onPlaySound('wrong');
    }
  };

  const handleNextStep = () => {
    if (onPlaySound) onPlaySound('click');
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setWrongCount(0);

    if (activeStepIndex + 1 < data.steps.length) {
      setActiveStepIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="math-activity-card step-calc-puzzle-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.title || data.prompt}</h3>
      </div>

      {/* Step Tracker Pills */}
      <div className="step-puzzle-progress-bar">
        {data.steps.map((step, idx) => {
          const isDone = completedSteps.includes(idx);
          const isCurrent = idx === activeStepIndex;
          let dotClass = 'step-tracker-pill';
          if (isDone) dotClass += ' pill-done';
          else if (isCurrent) dotClass += ' pill-active';

          return (
            <div key={idx} className={dotClass}>
              <span className="step-num-circle">{isDone ? '✓' : idx + 1}</span>
              <span className="step-mini-label">Step {idx + 1}</span>
            </div>
          );
        })}
      </div>

      {!isFinished ? (
        <div className="step-current-stage">
          <div className="step-instruction-card">
            <span className="step-instruction-tag">CURRENT STEP {activeStepIndex + 1} OF {data.steps.length}</span>
            <h4 className="step-instruction-text">{currentStep.instruction}</h4>
            <p className="step-question-sub">{currentStep.question}</p>
          </div>

          <div className="step-options-grid">
            {currentStep.options.map((opt, idx) => {
              let optClass = 'step-choice-card';
              if (isAnswerChecked) {
                if (idx === currentStep.correct) optClass += ' choice-correct';
                else if (idx === selectedOption) optClass += ' choice-wrong';
              } else if (idx === selectedOption) {
                optClass += ' choice-selected';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={optClass}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span className="opt-letter-tag">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-math-code">{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswerChecked && (
            <div
              className={`math-feedback-banner ${
                isCorrect ? 'feedback-success' : 'feedback-wrong'
              }`}
            >
              {isCorrect ? (
                <div>
                  <h4>✓ Step {activeStepIndex + 1} Solved!</h4>
                  <p>{currentStep.explanation}</p>
                </div>
              ) : (
                <div>
                  <h4>Not quite. Try Again</h4>
                  <p>Re-evaluate the matrix multiplication or state vector.</p>
                </div>
              )}
            </div>
          )}

          <div className="math-actions-row">
            {!isAnswerChecked ? (
              <button
                type="button"
                className="btn-math-check"
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
              >
                Verify Step
              </button>
            ) : isCorrect ? (
              <button
                type="button"
                className="btn-math-continue"
                onClick={handleNextStep}
              >
                {activeStepIndex + 1 < data.steps.length ? 'Next Step →' : 'Complete Calculation →'}
              </button>
            ) : (
              <button
                type="button"
                className="btn-math-reset"
                onClick={() => {
                  setIsAnswerChecked(false);
                  setSelectedOption(null);
                }}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Calculation Completed Celebration */
        <div className="calculation-complete-stage">
          <div className="calc-success-badge">⚛️</div>
          <h3 className="calc-success-title">Calculation Mastered!</h3>
          <p className="calc-success-desc">
            You walked through the rigorous matrix-vector calculation and solved the quantum operation.
          </p>
          <div className="calc-reward-pill">+{data.rewardXP || 25} QXP Earned</div>
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
        </div>
      )}

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

export default StepCalculationPuzzle;
