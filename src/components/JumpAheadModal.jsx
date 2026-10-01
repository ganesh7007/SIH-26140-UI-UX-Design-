import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  CloseIcon,
  CheckIcon,
  LockIcon,
  LightningIcon,
  TrophyIcon,
  AtomIcon,
  CupTrophy
} from './ReiconIcons';
import { getJumpAheadQuestions } from '../data/jumpAheadQuestions';
import './JumpAheadModal.css';

export const JumpAheadModal = ({
  targetLesson,
  targetUnit,
  allLessons = [],
  onConfirmJump,
  onStartTargetLesson,
  onClose,
  onPlaySound
}) => {
  // Screen state: 'intro' | 'quiz' | 'result'
  const [screen, setScreen] = useState('intro');

  // Load 8 tailored checkpoint questions
  const questions = useMemo(() => {
    return getJumpAheadQuestions(targetLesson, allLessons);
  }, [targetLesson, allLessons]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Per-question interactive states
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [dragSlots, setDragSlots] = useState({});
  const [sliderVal, setSliderVal] = useState(50);
  const [selectedGate, setSelectedGate] = useState(null);

  // Answer checking state: null | 'correct' | 'wrong'
  const [checkedState, setCheckedState] = useState(null);

  const currentQ = questions[currentIndex] || {};

  // Reset per-question states when currentIndex changes
  useEffect(() => {
    setSelectedChoice(null);
    setDragSlots({});
    setSliderVal(currentQ.type === 'slider' ? 25 : 50);
    setSelectedGate(null);
    setCheckedState(null);
  }, [currentIndex, currentQ.type]);

  // Play sound helper
  const playSfx = (name) => {
    if (onPlaySound) {
      try {
        onPlaySound(name);
      } catch {
        // Fallback safe
      }
    }
  };

  // Determine if the user has answered the current question to enable "CHECK"
  const isAnswered = () => {
    if (checkedState !== null) return true;
    if (currentQ.type === 'choice') {
      return selectedChoice !== null;
    }
    if (currentQ.type === 'drag_drop') {
      const slotCount = (currentQ.template || []).filter((t) => typeof t === 'object').length;
      return Object.keys(dragSlots).length === slotCount;
    }
    if (currentQ.type === 'slider') {
      return true; // Slider has initial value
    }
    if (currentQ.type === 'gate_match') {
      return selectedGate !== null;
    }
    return false;
  };

  // Handle Drag & Drop interactions
  const handleSelectDragOption = (word) => {
    if (checkedState) return;
    const slots = currentQ.template.filter((t) => typeof t === 'object');
    const emptySlot = slots.find((s) => !dragSlots[s.id]);
    if (emptySlot) {
      playSfx('click');
      setDragSlots((prev) => ({ ...prev, [emptySlot.id]: word }));
    }
  };

  const handleRemoveSlot = (slotId) => {
    if (checkedState) return;
    playSfx('click');
    setDragSlots((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  // Check the current answer
  const handleCheckAnswer = () => {
    if (checkedState !== null) {
      // Advance to next question or results
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Complete checkpoint
        const finalScore = score + (checkedState === 'correct' ? 1 : 0);
        const passed = Math.round((finalScore / questions.length) * 100) >= 70;
        if (passed) {
          playSfx('fanfare');
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
          // Unlock target lesson + all skipped prior lessons
          const targetIndex = allLessons.findIndex((l) => l.id === targetLesson.id);
          const unlockedIds = targetIndex >= 0 ? allLessons.slice(0, targetIndex + 1).map((l) => l.id) : [targetLesson.id];
          onConfirmJump?.(unlockedIds, 50);
        } else {
          playSfx('wrong');
        }
        setScreen('result');
      }
      return;
    }

    let isCorrect = false;

    if (currentQ.type === 'choice') {
      isCorrect = selectedChoice === currentQ.correct;
    } else if (currentQ.type === 'drag_drop') {
      const slots = currentQ.template.filter((t) => typeof t === 'object');
      isCorrect = slots.every((s) => dragSlots[s.id] === s.answer);
    } else if (currentQ.type === 'slider') {
      const diff = Math.abs(sliderVal - currentQ.targetVal);
      isCorrect = diff <= (currentQ.tolerance || 5);
    } else if (currentQ.type === 'gate_match') {
      isCorrect = selectedGate === currentQ.correct;
    }

    if (isCorrect) {
      setCheckedState('correct');
      setScore((prev) => prev + 1);
      playSfx('correct');
    } else {
      setCheckedState('wrong');
      playSfx('wrong');
    }
  };

  // Calculate skipped lessons count
  const targetIndex = allLessons.findIndex((l) => l.id === targetLesson.id);
  const skippedCount = Math.max(1, targetIndex);
  const percentScore = Math.round((score / questions.length) * 100);
  const isPassed = percentScore >= 70;

  // Keyboard shortcut: Enter to check/continue
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && screen === 'quiz' && isAnswered()) {
        e.preventDefault();
        handleCheckAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, checkedState, selectedChoice, dragSlots, sliderVal, selectedGate]);

  return (
    <div className="modal-overlay jump-modal-overlay">
      <div className="jump-modal-backdrop" onClick={screen === 'quiz' ? undefined : onClose} />

      <div className="jump-modal-container">
        {/* ================= SCREEN 1: INTRO & BRIEFING ================= */}
        {screen === 'intro' && (
          <div className="jump-intro-view">
            {/* Top Close Button */}
            <button className="jump-close-btn" onClick={onClose} aria-label="Close">
              <CloseIcon size={20} />
            </button>

            {/* Header Badge & Illustration */}
            <div className="jump-badge-row">
              <span className="jump-pill-badge">
                <LightningIcon size={14} color="#F59E0B" /> JUMP AHEAD CHECKPOINT
              </span>
            </div>

            <div className="jump-target-preview-card">
              <div className="jump-target-icon-wrap">
                <span className="jump-target-emoji">{targetLesson.icon || '⚛️'}</span>
              </div>
              <div className="jump-target-info">
                <span className="jump-unit-sub">{targetUnit?.title || 'Quantum Curriculum'}</span>
                <h2 className="jump-target-title">{targetLesson.title}</h2>
                <p className="jump-target-summary">{targetLesson.summary}</p>
              </div>
            </div>

            <div className="jump-briefing-box">
              <h3 className="briefing-heading">⚡ How Jumping Ahead Works</h3>
              <p className="briefing-description">
                Pass a quick <strong>8-question checkpoint challenge</strong> to prove your quantum fundamentals and jump ahead to this lesson!
              </p>

              <div className="briefing-requirements-grid">
                <div className="req-item">
                  <span className="req-icon">🎯</span>
                  <div className="req-text">
                    <strong>70% Passing Score</strong>
                    <span>Answer at least 6 of 8 questions correctly.</span>
                  </div>
                </div>

                <div className="req-item">
                  <span className="req-icon">🔓</span>
                  <div className="req-text">
                    <strong>Instant Path Unlock</strong>
                    <span>Unlocks <strong>{targetLesson.title}</strong> and all preceding lessons.</span>
                  </div>
                </div>

                <div className="req-item">
                  <span className="req-icon">📌</span>
                  <div className="req-text">
                    <strong>Flexible Exploration</strong>
                    <span>Preceding lessons remain empty (without a completion tick) so you can still learn them for full XP!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Things to Remember Card */}
            <div className="jump-remember-card">
              <div className="remember-title-row">
                <span className="remember-icon">💡</span>
                <strong>Things to Remember:</strong>
              </div>
              <ul className="remember-list">
                <li>Questions cover topics up to this section (Logic, Qubits, Gates & Circuits).</li>
                <li>You will get diverse question types: Recall, Drag & Drop Match, and Probability Sliders.</li>
                <li>Instant feedback and explanations are provided on each answer.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="jump-action-row">
              <button
                className="jump-primary-btn"
                onClick={() => {
                  playSfx('click');
                  setScreen('quiz');
                }}
              >
                <span>Take Checkpoint Challenge ({questions.length} Questions) ⚡</span>
              </button>
              <button className="jump-secondary-btn" onClick={onClose}>
                Maybe Later (Stay on Path)
              </button>
            </div>
          </div>
        )}

        {/* ================= SCREEN 2: INTERACTIVE QUIZ ================= */}
        {screen === 'quiz' && (
          <div className="jump-quiz-view">
            {/* Top Navigation & Progress Bar */}
            <div className="jump-quiz-header">
              <button
                className="jump-quiz-close"
                onClick={() => {
                  if (window.confirm('Leave checkpoint? Your progress will not be saved.')) {
                    onClose();
                  }
                }}
                aria-label="Exit"
              >
                <CloseIcon size={20} />
              </button>

              <div className="jump-progress-track">
                <div
                  className="jump-progress-fill"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="jump-score-meter">
                <span className="jump-score-text">
                  Q {currentIndex + 1}/{questions.length}
                </span>
                <span className="jump-correct-badge">
                  ✓ {score}
                </span>
              </div>
            </div>

            {/* Question Body */}
            <div className="jump-quiz-body">
              <div className="jump-question-badge-row">
                <span className="jump-q-type-badge">{currentQ.badge || 'QUANTUM CHECK'}</span>
              </div>

              <h2 className="jump-q-title">{currentQ.question}</h2>
              {currentQ.prompt && <p className="jump-q-prompt">{currentQ.prompt}</p>}

              {/* RENDER QUESTION BY TYPE */}
              {/* Type 1: Choice */}
              {currentQ.type === 'choice' && (
                <div className="jump-choices-grid">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedChoice === idx;
                    let stateClass = '';
                    if (checkedState !== null) {
                      if (idx === currentQ.correct) stateClass = 'choice-correct';
                      else if (isSelected && checkedState === 'wrong') stateClass = 'choice-wrong';
                    } else if (isSelected) {
                      stateClass = 'choice-selected';
                    }

                    return (
                      <button
                        key={idx}
                        className={`jump-choice-card ${stateClass}`}
                        disabled={checkedState !== null}
                        onClick={() => {
                          playSfx('click');
                          setSelectedChoice(idx);
                        }}
                      >
                        <span className="choice-letter-badge">{String.fromCharCode(65 + idx)}</span>
                        <span className="choice-text">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Type 2: Drag & Drop */}
              {currentQ.type === 'drag_drop' && (
                <div className="jump-drag-stage">
                  <div className="jump-template-sentence">
                    {currentQ.template.map((token, idx) => {
                      if (typeof token === 'string') {
                        return (
                          <span key={idx} className="static-token">
                            {token}
                          </span>
                        );
                      }
                      const placedVal = dragSlots[token.id];
                      let slotState = '';
                      if (checkedState) {
                        slotState = placedVal === token.answer ? 'slot-correct' : 'slot-wrong';
                      }

                      return (
                        <span
                          key={token.id}
                          className={`drag-slot-target ${placedVal ? 'filled' : 'empty'} ${slotState}`}
                          onClick={() => placedVal && handleRemoveSlot(token.id)}
                          title={placedVal ? 'Click to remove' : 'Tap an option below'}
                        >
                          {placedVal || '_______'}
                          {placedVal && !checkedState && <span className="slot-remove-x">×</span>}
                        </span>
                      );
                    })}
                  </div>

                  {/* Options Bank */}
                  <div className="jump-options-bank">
                    <span className="bank-label">Tap options to place into sequence:</span>
                    <div className="bank-chips-row">
                      {currentQ.options.map((opt, idx) => {
                        const isUsed = Object.values(dragSlots).includes(opt);
                        return (
                          <button
                            key={idx}
                            className={`bank-chip ${isUsed ? 'used' : ''}`}
                            disabled={isUsed || checkedState !== null}
                            onClick={() => handleSelectDragOption(opt)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Type 3: Probability Slider */}
              {currentQ.type === 'slider' && (
                <div className="jump-slider-stage">
                  {currentQ.stateVisual && (
                    <div className="slider-state-display">
                      <span className="state-vector">
                        |ψ⟩ = {(Math.sqrt((100 - sliderVal) / 100)).toFixed(2)}|0⟩ +{' '}
                        {(Math.sqrt(sliderVal / 100)).toFixed(2)}|1⟩
                      </span>
                    </div>
                  )}

                  <div className="slider-meter-card">
                    <div className="slider-val-readout">
                      <span className="current-num">{sliderVal}{currentQ.unit || '%'}</span>
                      <span className="target-num">Goal: {currentQ.targetVal}{currentQ.unit || '%'} (±{currentQ.tolerance}%)</span>
                    </div>

                    <input
                      type="range"
                      min={currentQ.min || 0}
                      max={currentQ.max || 100}
                      value={sliderVal}
                      disabled={checkedState !== null}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="jump-range-input"
                    />

                    <div className="slider-labels-row">
                      <span>0%</span>
                      <span className="slider-target-marker" style={{ left: `${currentQ.targetVal}%` }}>
                        ▼ Target
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Type 4: Quantum Gate Match */}
              {currentQ.type === 'gate_match' && (
                <div className="jump-gate-stage">
                  <div className="jump-circuit-wire-banner">
                    <span className="wire-label">{currentQ.wireState || '|0⟩ ─── [ ? ] ─── |+⟩'}</span>
                  </div>

                  <div className="jump-gate-grid">
                    {currentQ.options.map((gate) => {
                      const isSelected = selectedGate === gate.id;
                      let gateClass = '';
                      if (checkedState !== null) {
                        if (gate.id === currentQ.correct) gateClass = 'gate-correct';
                        else if (isSelected && checkedState === 'wrong') gateClass = 'gate-wrong';
                      } else if (isSelected) {
                        gateClass = 'gate-selected';
                      }

                      return (
                        <button
                          key={gate.id}
                          className={`jump-gate-card ${gateClass}`}
                          disabled={checkedState !== null}
                          onClick={() => {
                            playSfx('click');
                            setSelectedGate(gate.id);
                          }}
                        >
                          <div className="gate-icon-tile">{gate.id}</div>
                          <div className="gate-details">
                            <strong className="gate-label">{gate.label}</strong>
                            <span className="gate-desc">{gate.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Footer with Feedback slide-up */}
            <div className={`jump-quiz-footer ${checkedState ? `footer-${checkedState}` : ''}`}>
              {checkedState !== null && (
                <div className="feedback-message-row">
                  {checkedState === 'correct' ? (
                    <div className="feedback-inner correct">
                      <div className="feedback-icon">✓</div>
                      <div className="feedback-text">
                        <strong>Excellent! Correct.</strong>
                        <p>{currentQ.explanation}</p>
                      </div>
                      <span className="xp-gain-badge">+10 XP</span>
                    </div>
                  ) : (
                    <div className="feedback-inner wrong">
                      <div className="feedback-icon">✗</div>
                      <div className="feedback-text">
                        <strong>Good try!</strong>
                        <p>{currentQ.explanation || currentQ.hint}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="footer-button-row">
                <button
                  className={`jump-check-btn ${checkedState ? `btn-${checkedState}` : ''}`}
                  disabled={!isAnswered() && checkedState === null}
                  onClick={handleCheckAnswer}
                >
                  {checkedState === null ? (
                    'CHECK ANSWER'
                  ) : currentIndex + 1 < questions.length ? (
                    'CONTINUE ➔'
                  ) : (
                    'SEE RESULTS 🏁'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 3: RESULTS ================= */}
        {screen === 'result' && (
          <div className="jump-result-view">
            <button className="jump-close-btn" onClick={onClose} aria-label="Close">
              <CloseIcon size={20} />
            </button>

            <div className="result-graphic-container">
              {isPassed ? (
                <div className="result-trophy-wrap">
                  <CupTrophy size={68} color="#FFD700" />
                </div>
              ) : (
                <div className="result-study-wrap">
                  <span className="study-emoji">📖</span>
                </div>
              )}
            </div>

            <h2 className="result-main-title">
              {isPassed ? '🎉 Checkpoint Passed!' : 'Almost There! Keep Practicing'}
            </h2>

            <div className="result-score-pill">
              <span className="score-ratio">
                {score} / {questions.length} Correct
              </span>
              <span className={`score-percent ${isPassed ? 'pass' : 'fail'}`}>
                {percentScore}% {isPassed ? '✓ PASSED' : '(70% needed)'}
              </span>
            </div>

            <p className="result-message">
              {isPassed ? (
                <>
                  Outstanding! You've successfully proven your knowledge of previous topics.
                  <br />
                  <strong>{targetLesson.title}</strong> and all preceding lessons are now unlocked!
                </>
              ) : (
                <>
                  You scored {percentScore}%. You need at least 70% (6/8 correct) to jump ahead.
                  We recommend completing the preceding lessons in order to build a strong foundation!
                </>
              )}
            </p>

            {isPassed && (
              <div className="result-notice-box">
                <span className="notice-icon">✓</span>
                <span className="notice-text">
                  Preceding lessons are unlocked and available to explore anytime.
                  They remain empty (uncompleted) until you study them, so you won't miss any XP!
                </span>
              </div>
            )}

            <div className="result-action-buttons">
              {isPassed ? (
                <>
                  <button
                    className="jump-primary-btn"
                    onClick={() => {
                      playSfx('click');
                      onStartTargetLesson?.(targetLesson);
                    }}
                  >
                    <span>▶ Start {targetLesson.title}</span>
                  </button>
                  <button className="jump-secondary-btn" onClick={onClose}>
                    Return to Learning Path
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="jump-primary-btn"
                    onClick={() => {
                      playSfx('click');
                      setScore(0);
                      setCurrentIndex(0);
                      setScreen('quiz');
                    }}
                  >
                    <span>Try Checkpoint Again 🔄</span>
                  </button>
                  <button className="jump-secondary-btn" onClick={onClose}>
                    Back to Learning Path
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JumpAheadModal;
