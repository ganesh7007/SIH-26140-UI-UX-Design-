import React, { useState, useEffect, useRef } from 'react';
import { MascotQubi } from './MascotQubi';
import { GemSparkle } from './GemSparkle';
import {
  HeartIcon,
  CloseIcon,
  CheckIcon,
  LightningIcon,
  TargetIcon,
  TrophyIcon,
  ShieldIcon
} from './ReiconIcons';
import { TactileButton } from './TactileButton';
import { useVoiceGuidance } from '../hooks/useVoiceGuidance';
import { VoiceQuestionReader, SpeakerIcon } from './VoiceQuestionReader';
import { LessonSectionRenderer, buildLessonSectionSequence } from './lesson/LessonSectionRenderer';
import { ProgressiveHint } from './lesson/ProgressiveHint';
import { browserTTS } from '../services/ttsService';

export const LessonModal = ({
  lesson,
  onClose,
  onComplete,
  onPlaySound
}) => {
  const sections = buildLessonSectionSequence(lesson);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [firstTryMistakes, setFirstTryMistakes] = useState(0);
  const [questionWrongCount, setQuestionWrongCount] = useState(0);

  // Voice Guided Learning Hook
  const voiceGuidance = useVoiceGuidance();

  // Stop voice when component unmounts
  useEffect(() => {
    return () => {
      voiceGuidance.stop();
      browserTTS.cancel();
    };
  }, [voiceGuidance]);

  // Stop voice when transitioning between sections or completing
  useEffect(() => {
    voiceGuidance.stop();
    browserTTS.cancel();
  }, [sectionIndex, isCompleted]);

  // Bit Toggle State
  const [bitSwitchState, setBitSwitchState] = useState({ switch1: false, switch2: true });
  const handleToggleBitSwitch = (key) => {
    onPlaySound('click');
    setBitSwitchState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 5 Doors Challenge State
  const [openedDoors, setOpenedDoors] = useState({});
  const [doorTreasureFound, setDoorTreasureFound] = useState(false);
  const handleDoorClick = (doorIdx) => {
    if (openedDoors[doorIdx]) return;
    onPlaySound('click');
    const isTreasure = doorIdx === 4;
    setOpenedDoors((prev) => ({ ...prev, [doorIdx]: true }));
    if (isTreasure) {
      setDoorTreasureFound(true);
      onPlaySound('correct');
    }
  };

  // Classify Game State
  const classifyItems = [
    { id: 'item1', name: 'Laptop Computer', icon: '💻', type: 'classical' },
    { id: 'item2', name: 'Quantum Processor', icon: '⚛️', type: 'quantum' },
    { id: 'item3', name: 'Smartphone', icon: '📱', type: 'classical' },
    { id: 'item4', name: 'Superconducting Qubit Chip', icon: '🌀', type: 'quantum' }
  ];
  const [classifyIndex, setClassifyIndex] = useState(0);
  const [classifyFeedback, setClassifyFeedback] = useState(null);
  const [classifyWrongCount, setClassifyWrongCount] = useState(0);

  const handleClassifyChoice = (choice) => {
    const currentItem = classifyItems[classifyIndex];
    const correct = currentItem.type === choice;
    onPlaySound(correct ? 'correct' : 'wrong');
    setClassifyFeedback(correct ? 'correct' : 'wrong');

    if (!correct) {
      setClassifyWrongCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setClassifyFeedback(null);
      if (correct && classifyIndex + 1 < classifyItems.length) {
        setClassifyIndex((prev) => prev + 1);
        setClassifyWrongCount(0);
      } else if (correct) {
        // Move to next section
        handleNextSection();
      }
    }, 800);
  };

  // Final Boss Matching Mission State
  const [bossMatches, setBossMatches] = useState({ classical: null, quantum: null });
  const [bossCompleted, setBossCompleted] = useState(false);
  const [bossWrongCount, setBossWrongCount] = useState(0);

  const handleBossMatch = (tech, target) => {
    onPlaySound('click');
    const nextMatches = { ...bossMatches, [tech]: target };
    setBossMatches(nextMatches);

    const isWrongMatch =
      (tech === 'classical' && target !== 'BIT') ||
      (tech === 'quantum' && target !== 'QUBIT');

    if (isWrongMatch) {
      setBossWrongCount((prev) => prev + 1);
    }

    if (nextMatches.classical === 'BIT' && nextMatches.quantum === 'QUBIT') {
      onPlaySound('correct');
      setBossCompleted(true);
    }
  };

  const questions = lesson.questions || [];
  const currentQuestion = questions[currentQIndex];

  // Calculate Progress bar percentage
  const totalSections = Math.max(1, sections.length);
  const progressPct = isCompleted
    ? 100
    : Math.min(95, Math.round(((sectionIndex + 1) / (totalSections + 1)) * 100));

  const activeSection = sections[sectionIndex] || sections[0];

  const handleSelectOption = (index) => {
    if (isAnswerChecked) return;
    onPlaySound('click');
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const correct = selectedOption === currentQuestion.correct;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      onPlaySound('correct');
      voiceGuidance.speakFeedback('Correct!');
    } else {
      onPlaySound('wrong');
      const nextWrong = questionWrongCount + 1;
      setQuestionWrongCount(nextWrong);
      setFirstTryMistakes((prev) => prev + 1);

      if (nextWrong < 2) {
        voiceGuidance.speakFeedback("Not quite right. Try again!");
      } else {
        voiceGuidance.speakFeedback("A hint is now ready to help you solve this!");
      }
    }
  };

  const handleTryAgain = () => {
    onPlaySound('click');
    voiceGuidance.stop();
    setIsAnswerChecked(false);
    setSelectedOption(null);
  };

  const handleContinueAfterCheck = () => {
    onPlaySound('click');
    voiceGuidance.stop();
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setQuestionWrongCount(0);

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      handleNextSection();
    }
  };

  const handleNextSection = () => {
    if (sectionIndex + 1 < sections.length) {
      setSectionIndex((prev) => prev + 1);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    voiceGuidance.stop();
    browserTTS.cancel();
    setIsCompleted(true);
    onPlaySound('complete');
  };

  const handleClose = () => {
    voiceGuidance.stop();
    browserTTS.cancel();
    onClose();
  };

  return (
    <div className="lesson-modal-overlay">
      {/* Top Header Navigation */}
      <div className="lesson-topbar">
        <button
          type="button"
          className="lesson-close-btn"
          onClick={handleClose}
          aria-label="Close Lesson"
        >
          <CloseIcon size={20} color="currentColor" />
        </button>

        <div className="lesson-progress-container">
          <div className="lesson-progress-bar">
            <div className="lesson-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="lesson-hearts">
          <HeartIcon size={20} color="#EF4444" fill="#EF4444" />
          <HeartIcon size={20} color="#EF4444" fill="#EF4444" />
          <HeartIcon size={20} color="#EF4444" fill="#EF4444" />
        </div>
      </div>

      {/* Lesson Body Content */}
      <div className="lesson-content">
        {!isCompleted ? (
          <LessonSectionRenderer
            lesson={lesson}
            currentSectionIndex={sectionIndex}
            onSectionIndexChange={setSectionIndex}
            onCompleteLesson={finishLesson}
            onPlaySound={onPlaySound}
            voiceGuidance={voiceGuidance}
            // Interactive props
            bitSwitchState={bitSwitchState}
            onToggleBitSwitch={handleToggleBitSwitch}
            openedDoors={openedDoors}
            doorTreasureFound={doorTreasureFound}
            onDoorClick={handleDoorClick}
            classifyItems={classifyItems}
            classifyIndex={classifyIndex}
            classifyFeedback={classifyFeedback}
            onClassifyChoice={handleClassifyChoice}
            bossMatches={bossMatches}
            bossCompleted={bossCompleted}
            onBossMatch={handleBossMatch}
            // Quiz props
            currentQIndex={currentQIndex}
            selectedOption={selectedOption}
            isAnswerChecked={isAnswerChecked}
            isCorrect={isCorrect}
            onSelectOption={handleSelectOption}
            onCheckAnswer={handleCheckAnswer}
            onContinueAfterCheck={handleContinueAfterCheck}
          />
        ) : (
          /* CELEBRATION / COMPLETION SCREEN */
          <div className="celebration-step-container">
            <div style={{ textAlign: 'center' }}>
              <MascotQubi mood="celebrate" size={110} />
              <h1 className="celebration-title">
                {lesson.isBoss ? '🎉 TOPIC COMPLETE!' : '🎉 Lesson Complete!'}
              </h1>
              <p className="celebration-subtitle">
                {lesson.isBoss
                  ? 'You completed INTRODUCTION TO QUANTUM COMPUTING ⚛️'
                  : `You mastered all activities in ${lesson.title}!`}
              </p>
            </div>

            {/* Mastered Concepts Checkmarks */}
            <div className="mastered-concepts-card">
              <span className="mastered-card-heading">🏆 Concepts Mastered:</span>
              <div className="mastered-items-list">
                <div className="mastered-item-row">
                  <span className="mastered-check-icon">✓</span>
                  <span>Quantum Theory & Superposition Concepts</span>
                </div>
                {lesson.mathActivity && (
                  <div className="mastered-item-row">
                    <span className="mastered-check-icon">✓</span>
                    <span>Mathematical Representation & Calculation</span>
                  </div>
                )}
                {lesson.circuitActivity && (
                  <div className="mastered-item-row">
                    <span className="mastered-check-icon">✓</span>
                    <span>Quantum Circuit & Gate Mechanics</span>
                  </div>
                )}
                {lesson.codeCircuit && (
                  <div className="mastered-item-row">
                    <span className="mastered-check-icon">✓</span>
                    <span>Qiskit Code & Circuit Synchronization</span>
                  </div>
                )}
                <div className="mastered-item-row">
                  <span className="mastered-check-icon">✓</span>
                  <span>Interactive Validation & Problem Solving</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="celebration-stats-card">
              <div className="celeb-stat-item">
                <span className="celeb-stat-icon">
                  <LightningIcon size={22} color="#FACC15" />
                </span>
                <span className="celeb-stat-val">+{lesson.rewardXP || 25} XP</span>
                <span className="celeb-stat-lbl">EARNED</span>
              </div>
              <div className="celeb-stat-item">
                <span className="celeb-stat-icon">
                  <GemSparkle size={24} color="#22D3EE" />
                </span>
                <span className="celeb-stat-val">+10</span>
                <span className="celeb-stat-lbl">GEMS</span>
              </div>
              <div className="celeb-stat-item">
                <span className="celeb-stat-icon">
                  <TargetIcon size={22} color="#F43F5E" />
                </span>
                <span className="celeb-stat-val">{firstTryMistakes === 0 ? '100%' : '92%'}</span>
                <span className="celeb-stat-lbl">ACCURACY</span>
              </div>
            </div>

            {lesson.badgeReward && (
              <div className="unlocked-badge-card">
                <span className="unlocked-badge-icon">🏅</span>
                <div className="unlocked-badge-info">
                  <span className="badge-name">{lesson.badgeReward} Badge Unlocked!</span>
                  <span className="badge-desc">Added to your Quantum Profile</span>
                </div>
              </div>
            )}

            {lesson.unlockTopic && (
              <div className="next-topic-unlock-card">
                <span className="unlock-icon">🔓</span>
                <div className="unlock-info">
                  <span className="unlock-title">NEXT TOPIC UNLOCKED</span>
                  <span className="unlock-name">{lesson.unlockTopic}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar with Action Controls */}
      {(isCompleted || ['theory', 'bit_toggle', 'door_challenge', 'boss_mission', 'quiz'].includes(activeSection?.id)) && (
        <div className="lesson-bottom-bar">
          {/* Quiz Feedback Banner */}
          {!isCompleted && activeSection?.id === 'quiz' && isAnswerChecked && currentQuestion && (
            <div className={`lesson-feedback-box ${isCorrect ? 'feedback-success' : 'feedback-wrong'}`}>
              <div className="feedback-icon">
                {isCorrect ? <CheckIcon size={24} color="#00CD9C" /> : <CloseIcon size={24} color="#EF4444" />}
              </div>
              <div className="feedback-text" style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <h4>
                    {isCorrect
                      ? 'Nicely done!'
                      : questionWrongCount >= 2
                      ? 'Still not quite right'
                      : 'Not quite right'}
                  </h4>
                  {(isCorrect || questionWrongCount >= 2) && (
                    <button
                      type="button"
                      className="solution-voice-btn"
                      onClick={() => voiceGuidance.speak(currentQuestion.explanation)}
                      aria-label="Listen to solution explanation"
                    >
                      <SpeakerIcon size={14} /> Listen to Explanation
                    </button>
                  )}
                </div>
                <p>
                  {isCorrect
                    ? currentQuestion.explanation
                    : questionWrongCount >= 2
                    ? '💡 A hint is now available below! Tap the pop-up to view guidance and try again.'
                    : 'Think carefully about the concept and give it another try.'}
                </p>
              </div>
            </div>
          )}

          {/* Section Navigation Buttons */}
          {!isCompleted && (
            <>
              {activeSection?.id === 'theory' && (
                <TactileButton
                  variant="purple"
                  onClick={() => {
                    onPlaySound('click');
                    handleNextSection();
                  }}
                >
                  START INTERACTIVE ACTIVITY →
                </TactileButton>
              )}

              {activeSection?.id === 'bit_toggle' && (
                <TactileButton
                  variant="success"
                  onClick={() => {
                    onPlaySound('click');
                    handleNextSection();
                  }}
                >
                  CONTINUE (+15 XP) →
                </TactileButton>
              )}

              {activeSection?.id === 'door_challenge' && (
                <TactileButton
                  variant={doorTreasureFound ? 'success' : 'purple'}
                  disabled={!doorTreasureFound}
                  onClick={() => {
                    onPlaySound('click');
                    handleNextSection();
                  }}
                >
                  {doorTreasureFound ? 'CONTINUE TO QUANTUM (+15 XP) →' : 'FIND THE TREASURE FIRST 💎'}
                </TactileButton>
              )}

              {activeSection?.id === 'boss_mission' && (
                <TactileButton
                  variant={bossCompleted ? 'success' : 'purple'}
                  disabled={!bossCompleted}
                  onClick={() => {
                    onPlaySound('click');
                    handleNextSection();
                  }}
                >
                  {bossCompleted ? 'CLAIM VICTORY (+100 XP) →' : 'MATCH ALL PAIRS FIRST'}
                </TactileButton>
              )}

              {activeSection?.id === 'quiz' && (
                <>
                  {!isAnswerChecked ? (
                    <TactileButton
                      variant="purple"
                      disabled={selectedOption === null}
                      onClick={handleCheckAnswer}
                    >
                      CHECK ANSWER
                    </TactileButton>
                  ) : isCorrect ? (
                    <TactileButton
                      variant="success"
                      onClick={handleContinueAfterCheck}
                    >
                      CONTINUE →
                    </TactileButton>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                      <TactileButton
                        variant="purple"
                        onClick={handleTryAgain}
                      >
                        {questionWrongCount >= 2 ? 'TRY WITH HINT ↺' : 'TRY AGAIN ↺'}
                      </TactileButton>
                      {questionWrongCount >= 2 && (
                        <TactileButton
                          variant="danger"
                          onClick={handleContinueAfterCheck}
                        >
                          CONTINUE →
                        </TactileButton>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {isCompleted && (
            <TactileButton
              variant="success"
              onClick={() => {
                onPlaySound('click');
                onComplete(lesson, firstTryMistakes === 0);
              }}
            >
              CONTINUE TO NEXT LESSON →
            </TactileButton>
          )}
        </div>
      )}

      {/* Bottom Pop-up Hint for Quiz Questions (Triggered after 2 wrong attempts) */}
      {!isCompleted && activeSection?.id === 'quiz' && currentQuestion && (
        <ProgressiveHint
          hint={currentQuestion.hint || currentQuestion.explanation}
          hints={currentQuestion.hints}
          wrongAttempts={questionWrongCount}
          threshold={2}
          onPlaySound={onPlaySound}
        />
      )}

      {/* Bottom Pop-up Hint for Classify Mini-Game */}
      {!isCompleted && activeSection?.id === 'classify_game' && (
        <ProgressiveHint
          hint="Remember: Classical devices (laptops, phones) process binary bits (0 or 1). Quantum devices (superconducting chips, processors) manipulate qubits in superposition."
          wrongAttempts={classifyWrongCount}
          threshold={2}
          onPlaySound={onPlaySound}
        />
      )}

      {/* Bottom Pop-up Hint for Boss Matching Mission */}
      {!isCompleted && activeSection?.id === 'boss_mission' && (
        <ProgressiveHint
          hint="Pairing Hint: Classical Computers encode data into Bits. Quantum Computers harness Qubits."
          wrongAttempts={bossWrongCount}
          threshold={2}
          onPlaySound={onPlaySound}
        />
      )}
    </div>
  );
};

export default LessonModal;
