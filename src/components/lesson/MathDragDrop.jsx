import React, { useState } from 'react';
import ProgressiveHint from './ProgressiveHint';

export const MathDragDrop = ({
  data,
  onComplete,
  onPlaySound
}) => {
  // data: {
  //   prompt: "Complete the single-qubit quantum state equation:",
  //   template: ["|ψ⟩ = α|0⟩ + ", { id: "slot1", answer: "β" }, "|1⟩"],
  //   options: ["β", "α", "γ", "δ"],
  //   explanation: "In standard notation, |ψ⟩ = α|0⟩ + β|1⟩ where α and β are probability amplitudes.",
  //   rewardXP: 15,
  //   hints: ["Remember that α is the amplitude for |0⟩.", "What Greek letter conventionally denotes the amplitude for |1⟩?"]
  // }

  const [placedItems, setPlacedItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedPoolItem, setSelectedPoolItem] = useState(null);
  const [checkedState, setCheckedState] = useState(null); // 'correct' | 'wrong' | null
  const [wrongCount, setWrongCount] = useState(0);

  const slots = data?.template?.filter((t) => typeof t === 'object' && t.id) || [];
  const isFilled = slots.every((s) => placedItems[s.id]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer?.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    const item = draggedItem || e.dataTransfer?.getData('text/plain');
    if (item) {
      if (onPlaySound) onPlaySound('click');
      setPlacedItems((prev) => ({ ...prev, [slotId]: item }));
      setCheckedState(null);
      setDraggedItem(null);
      setSelectedPoolItem(null);
    }
  };

  // Tap-to-place fallback for mobile & accessibility
  const handlePoolItemClick = (item) => {
    if (onPlaySound) onPlaySound('click');
    if (selectedPoolItem === item) {
      setSelectedPoolItem(null);
    } else {
      setSelectedPoolItem(item);
      // Auto-place in first empty slot if any
      const emptySlot = slots.find((s) => !placedItems[s.id]);
      if (emptySlot) {
        setPlacedItems((prev) => ({ ...prev, [emptySlot.id]: item }));
        setCheckedState(null);
        setSelectedPoolItem(null);
      }
    }
  };

  const handleSlotClick = (slotId) => {
    if (selectedPoolItem) {
      if (onPlaySound) onPlaySound('click');
      setPlacedItems((prev) => ({ ...prev, [slotId]: selectedPoolItem }));
      setCheckedState(null);
      setSelectedPoolItem(null);
    } else if (placedItems[slotId]) {
      // Remove item
      if (onPlaySound) onPlaySound('click');
      setPlacedItems((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
      setCheckedState(null);
    }
  };

  const handleReset = () => {
    if (onPlaySound) onPlaySound('click');
    setPlacedItems({});
    setCheckedState(null);
    setSelectedPoolItem(null);
  };

  const handleCheck = () => {
    if (!isFilled) return;

    const allCorrect = slots.every((s) => placedItems[s.id] === s.answer);
    if (allCorrect) {
      setCheckedState('correct');
      if (onPlaySound) onPlaySound('correct');
    } else {
      setCheckedState('wrong');
      setWrongCount((prev) => prev + 1);
      if (onPlaySound) onPlaySound('wrong');
    }
  };

  return (
    <div className="math-activity-card">
      <div className="math-activity-header">
        <h3 className="math-prompt-title">{data.prompt}</h3>
      </div>

      {/* Target Equation Display with Slots */}
      <div className="math-equation-stage">
        <div className="equation-container">
          {data.template.map((token, idx) => {
            if (typeof token === 'string') {
              return (
                <span key={idx} className="equation-static-text">
                  {token}
                </span>
              );
            }
            const slot = token;
            const filledVal = placedItems[slot.id];
            let slotClass = 'equation-drop-slot';
            if (filledVal) slotClass += ' slot-filled';
            if (checkedState === 'correct') slotClass += ' slot-correct';
            if (checkedState === 'wrong') slotClass += ' slot-wrong';

            return (
              <div
                key={slot.id || idx}
                className={slotClass}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot.id)}
                onClick={() => handleSlotClick(slot.id)}
                title="Tap or drag component here"
              >
                {filledVal ? (
                  <span className="placed-token-pill">
                    {filledVal}
                    {checkedState !== 'correct' && (
                      <span className="remove-token-x">×</span>
                    )}
                  </span>
                ) : (
                  <span className="slot-placeholder">___</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Component Pool */}
      <div className="math-pool-wrapper">
        <span className="pool-label">Available Components (Drag or tap to place):</span>
        <div className="math-components-pool">
          {data.options.map((opt, idx) => {
            const isSelected = selectedPoolItem === opt;
            return (
              <button
                key={idx}
                type="button"
                className={`math-token-chip ${isSelected ? 'token-selected' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, opt)}
                onClick={() => handlePoolItemClick(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {checkedState && (
        <div
          className={`math-feedback-banner ${
            checkedState === 'correct' ? 'feedback-success' : 'feedback-wrong'
          }`}
        >
          {checkedState === 'correct' ? (
            <div>
              <h4>✓ Correct! +{data.rewardXP || 15} QXP</h4>
              <p>{data.explanation}</p>
            </div>
          ) : (
            <div>
              <h4>Not quite. Try Again!</h4>
              <p>Check the components and replace the incorrect tokens.</p>
            </div>
          )}
        </div>
      )}

      {/* Action Controls */}
      <div className="math-actions-row">
        {checkedState !== 'correct' ? (
          <>
            <button
              type="button"
              className="btn-math-reset"
              onClick={handleReset}
              disabled={Object.keys(placedItems).length === 0}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn-math-check"
              disabled={!isFilled}
              onClick={handleCheck}
            >
              Check Equation
            </button>
          </>
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

export default MathDragDrop;
