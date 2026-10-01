import React, { useMemo } from 'react';
import TheoryVideoSection from './TheoryVideoSection';
import MathDragDrop from './MathDragDrop';
import FormulaBuilder from './FormulaBuilder';
import StepCalculationPuzzle from './StepCalculationPuzzle';
import ProbabilitySlider from './ProbabilitySlider';
import CircuitBuilderActivity from './CircuitBuilderActivity';
import CodeCircuitSplit from './CodeCircuitSplit';
import InteractiveLabSection from './InteractiveLabSection';
import { MascotQubi } from '../MascotQubi';
import { TactileButton } from '../TactileButton';
import { useLessonNarrator } from '../../hooks/useLessonNarrator';
import { VoiceSpeakerButton, NarratedText } from './LessonNarrator';

/**
 * Builds the sequence of active section IDs present in a lesson definition.
 */
export function buildLessonSectionSequence(lesson) {
  const seq = [];

  // 1. Theory Video (if present)
  if (lesson.video) {
    seq.push({ id: 'video', title: 'Theory Video' });
  }

  // 2. Introduction / Story / Theory Card
  if (lesson.learningCard || lesson.hardProblems || lesson.guideMessage || lesson.theory) {
    seq.push({ id: 'theory', title: 'Concept Theory' });
  }

  // 3. Interactive Mini-Game Concept (Bit toggle, Doors, Classifier, Boss)
  if (lesson.type === 'bit_toggle') {
    seq.push({ id: 'bit_toggle', title: 'Bit Simulator' });
  } else if (lesson.type === 'door_challenge') {
    seq.push({ id: 'door_challenge', title: 'Classical Challenge' });
  } else if (lesson.type === 'classify_game') {
    seq.push({ id: 'classify_game', title: 'Tech Classifier' });
  } else if (lesson.type === 'boss_mission') {
    seq.push({ id: 'boss_mission', title: 'Boss Mission' });
  }

  // 4. Mathematical Learning Activity
  if (lesson.mathActivity) {
    seq.push({ id: 'math', title: 'Mathematical Learning' });
  }

  // 5. Interactive Scale / Probability Slider Activity
  if (lesson.sliderActivity) {
    seq.push({ id: 'slider', title: 'Scale & Probability Slider' });
  }

  // 6. Quantum Circuit Activity / Connect Circuit
  if (lesson.circuitActivity) {
    seq.push({ id: 'circuit', title: 'Quantum Circuit' });
  }

  // 6. Split Code + Circuit Connection
  if (lesson.codeCircuit) {
    seq.push({ id: 'code_circuit', title: 'Code & Circuit' });
  }

  // 7. Practical Lab Activity
  if (lesson.labActivity || lesson.isLab || lesson.type === 'practical_lab') {
    seq.push({ id: 'lab', title: 'Quantum Lab' });
  }

  // 8. Reinforcement / Video Quiz Questions
  if (lesson.questions && lesson.questions.length > 0) {
    seq.push({ id: 'quiz', title: 'Quiz & Challenge' });
  }

  // Fallback if empty
  if (seq.length === 0) {
    seq.push({ id: 'theory', title: 'Lesson Intro' });
  }

  return seq;
}

/**
 * Extracts narration items for the active lesson step
 */
export function getSectionNarrationItems(lesson, activeSection, currentQIndex = 0) {
  if (!lesson || !activeSection) return [];
  const items = [];

  if (activeSection.id === 'theory') {
    if (lesson.title) {
      items.push({ id: 'theory-title', visualText: lesson.title });
    }
    const guide = lesson.guideMessage || lesson.summary || lesson.explanation;
    if (guide) {
      items.push({ id: 'theory-guide', visualText: guide });
    }
    if (lesson.learningCard) {
      if (lesson.learningCard.concept && lesson.learningCard.definition) {
        items.push({
          id: 'theory-concept',
          visualText: `${lesson.learningCard.concept}: ${lesson.learningCard.definition}`
        });
      }
      if (lesson.learningCard.exampleInput) {
        items.push({
          id: 'theory-flow',
          visualText: `Input: ${lesson.learningCard.exampleInput}. Process: ${lesson.learningCard.exampleProcess}. Output: ${lesson.learningCard.exampleOutput}.`
        });
      }
    }
  } else if (activeSection.id === 'bit_toggle') {
    items.push({ id: 'bit-title', visualText: lesson.title || 'Classical Computing and Bits' });
    items.push({
      id: 'bit-guide',
      visualText: 'Classical computers use bits. A bit can only be 0 or 1.'
    });
    items.push({
      id: 'bit-caption',
      visualText: 'Your phone, laptop, and computer all use billions of binary switches for digital computation.'
    });
  } else if (activeSection.id === 'door_challenge') {
    items.push({ id: 'door-title', visualText: lesson.title || 'The Search Challenge' });
    items.push({
      id: 'door-guide',
      visualText: 'Classical algorithms must search one by one. Find the hidden treasure behind the five doors.'
    });
  } else if (activeSection.id === 'classify_game') {
    items.push({ id: 'classify-title', visualText: 'Classical or Quantum?' });
    items.push({
      id: 'classify-guide',
      visualText: 'Classify each technology. Does it use classical bits or quantum qubits?'
    });
  } else if (activeSection.id === 'boss_mission') {
    items.push({ id: 'boss-title', visualText: 'Match the Technology' });
    items.push({
      id: 'boss-guide',
      visualText: 'Prove your quantum mastery. Connect each computer to its fundamental information unit.'
    });
  } else if (activeSection.id === 'math' && lesson.mathActivity) {
    items.push({
      id: 'math-title',
      visualText: lesson.mathActivity.title || 'Mathematical Learning'
    });
    if (lesson.mathActivity.instruction) {
      items.push({
        id: 'math-instruction',
        visualText: lesson.mathActivity.instruction,
        narrationText: lesson.mathActivity.spokenInstruction
      });
    }
    if (lesson.mathActivity.formula) {
      items.push({
        id: 'math-formula',
        visualText: lesson.mathActivity.formula,
        narrationText: lesson.mathActivity.spokenFormula
      });
    }
  } else if (activeSection.id === 'slider' && lesson.sliderActivity) {
    items.push({
      id: 'slider-title',
      visualText: lesson.sliderActivity.title || 'Quantum Probability Scale'
    });
    if (lesson.sliderActivity.prompt) {
      items.push({
        id: 'slider-prompt',
        visualText: lesson.sliderActivity.prompt
      });
    }
  } else if (activeSection.id === 'circuit' && lesson.circuitActivity) {
    items.push({
      id: 'circuit-title',
      visualText: lesson.circuitActivity.title || 'Quantum Circuit Simulator'
    });
    if (lesson.circuitActivity.goal) {
      items.push({
        id: 'circuit-goal',
        visualText: lesson.circuitActivity.goal
      });
    }
  } else if (activeSection.id === 'code_circuit' && lesson.codeCircuit) {
    items.push({
      id: 'code-title',
      visualText: lesson.codeCircuit.title || 'Code and Quantum Circuit'
    });
    if (lesson.codeCircuit.description) {
      items.push({
        id: 'code-desc',
        visualText: lesson.codeCircuit.description
      });
    }
  } else if (activeSection.id === 'lab') {
    items.push({
      id: 'lab-title',
      visualText: lesson.title || 'Practical Quantum Lab'
    });
    if (lesson.summary) {
      items.push({
        id: 'lab-desc',
        visualText: lesson.summary
      });
    }
  } else if (activeSection.id === 'quiz' && lesson.questions && lesson.questions[currentQIndex]) {
    const q = lesson.questions[currentQIndex];
    items.push({
      id: `quiz-q-${currentQIndex}`,
      visualText: q.question
    });
  }

  return items;
}

export const LessonSectionRenderer = ({
  lesson,
  currentSectionIndex,
  onSectionIndexChange,
  onCompleteLesson,
  onPlaySound,
  voiceGuidance,
  // Existing mini-game props
  bitSwitchState,
  onToggleBitSwitch,
  openedDoors,
  doorTreasureFound,
  onDoorClick,
  classifyItems,
  classifyIndex,
  classifyFeedback,
  onClassifyChoice,
  bossMatches,
  bossCompleted,
  onBossMatch,
  // Quiz states
  currentQIndex,
  selectedOption,
  isAnswerChecked,
  isCorrect,
  onSelectOption,
  onCheckAnswer,
  onContinueAfterCheck
}) => {
  const sections = buildLessonSectionSequence(lesson);
  const activeSection = sections[currentSectionIndex] || sections[0];

  // Dynamic Narration Queue for the active section
  const narrationSections = useMemo(() => {
    return getSectionNarrationItems(lesson, activeSection, currentQIndex);
  }, [lesson, activeSection, currentQIndex]);

  const sectionKey = `${lesson?.id || ''}-${activeSection?.id || ''}-${currentQIndex}`;

  // Duolingo-style Voice Narrator Hook (Speaks once per section, no looping!)
  const narrator = useLessonNarrator({
    sections: narrationSections,
    sectionKey,
    autoPlay: true,
    defaultRate: 0.95
  });

  const handleNextSection = () => {
    if (onPlaySound) onPlaySound('click');
    narrator.stop();
    if (currentSectionIndex + 1 < sections.length) {
      onSectionIndexChange(currentSectionIndex + 1);
    } else {
      onCompleteLesson();
    }
  };

  const handleTakeQuizFromVideo = () => {
    narrator.stop();
    const quizIdx = sections.findIndex((s) => s.id === 'quiz');
    if (quizIdx !== -1) {
      onSectionIndexChange(quizIdx);
    } else {
      handleNextSection();
    }
  };

  return (
    <div className="modular-lesson-section-content">
      {/* 1. THEORY VIDEO SECTION */}
      {activeSection.id === 'video' && (
        <TheoryVideoSection
          videoData={lesson.video}
          hasQuiz={Boolean(lesson.questions?.length)}
          onTakeQuiz={handleTakeQuizFromVideo}
          onContinue={handleNextSection}
          onPlaySound={onPlaySound}
        />
      )}

      {/* 2. THEORY / STORY / CONCEPT CARD SECTION */}
      {activeSection.id === 'theory' && (
        <div className="intro-lesson-step">
          <div className="session-pill-badge">
            {lesson.sessionNum ? `SESSION ${lesson.sessionNum}` : 'THEORY & FOUNDATIONS'}
          </div>
          
          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text={lesson.title}
              sectionId="theory-title"
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          {/* AI Guide Mascot Dialogue */}
          <div className="lesson-mascot-dialogue">
            <div className="lesson-qubi-small">
              <MascotQubi mood="idle" size={60} />
            </div>
            <p className="lesson-bubble-text" style={{ whiteSpace: 'pre-line' }}>
              <NarratedText
                text={lesson.guideMessage || lesson.summary || lesson.explanation}
                sectionId="theory-guide"
                narrator={narrator}
              />
            </p>
          </div>

          {/* Learning Card: Input -> Process -> Output or General Concept */}
          {lesson.learningCard && (
            <div className="interactive-quantum-box lesson-learn-card">
              <h4 className="learn-card-heading">
                <span style={{ fontSize: '1.2rem' }}>📚</span> {lesson.learningCard.concept}
              </h4>
              <p className="learn-card-def">
                <NarratedText
                  text={lesson.learningCard.definition}
                  sectionId="theory-concept"
                  narrator={narrator}
                />
              </p>

              {lesson.learningCard.exampleInput && (
                <div className="computing-flow-diagram">
                  <div className="flow-step-box">
                    <span className="flow-step-tag">INPUT</span>
                    <span className="flow-step-val">{lesson.learningCard.exampleInput}</span>
                  </div>
                  <span className="flow-step-arrow">➔</span>
                  <div className="flow-step-box flow-box-process">
                    <span className="flow-step-tag">PROCESS</span>
                    <span className="flow-step-val">{lesson.learningCard.exampleProcess}</span>
                  </div>
                  <span className="flow-step-arrow">➔</span>
                  <div className="flow-step-box flow-box-output">
                    <span className="flow-step-tag">OUTPUT</span>
                    <span className="flow-step-val">{lesson.learningCard.exampleOutput}</span>
                  </div>
                </div>
              )}

              {lesson.learningCard.phenomena && (
                <div className="phenomena-grid-list">
                  {lesson.learningCard.phenomena.map((p, idx) => (
                    <div key={idx} className="phenomena-pill-card">
                      <span className="phenomena-icon">{p.icon}</span>
                      <div>
                        <strong>{p.name}</strong>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hard Problems Display */}
          {lesson.hardProblems && (
            <div className="interactive-quantum-box hard-problems-box">
              <h4 className="learn-card-heading">Complex Problems Classical Computers Struggle With:</h4>
              <div className="hard-problems-grid">
                {lesson.hardProblems.map((prob, idx) => (
                  <div key={idx} className="hard-prob-item">
                    <span className="prob-icon">{prob.icon}</span>
                    <span className="prob-name">{prob.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. INTERACTIVE BIT TOGGLE */}
      {activeSection.id === 'bit_toggle' && (
        <div className="interactive-lesson-step">
          <div className="session-pill-badge">SESSION 2 · CLASSICAL COMPUTING</div>
          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text={lesson.title || 'Classical Computing & Bits'}
              sectionId="bit-title"
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          <div className="lesson-mascot-dialogue">
            <div className="lesson-qubi-small">
              <MascotQubi mood="idle" size={54} />
            </div>
            <p className="lesson-bubble-text">
              <NarratedText
                text="Classical computers use BITS. A bit can only be 0 or 1!"
                sectionId="bit-guide"
                narrator={narrator}
              />
            </p>
          </div>

          <div className="interactive-quantum-box bit-switches-container">
            <h4 style={{ margin: '0 0 16px 0', color: '#38BDF8' }}>Interactive Classical Bit Simulator</h4>
            <div className="bit-switches-grid">
              {/* Switch 1 */}
              <div
                className={`bit-switch-card ${bitSwitchState.switch1 ? 'switch-on' : 'switch-off'}`}
                onClick={() => onToggleBitSwitch('switch1')}
              >
                <span className="bulb-icon">{bitSwitchState.switch1 ? '💡' : '🌑'}</span>
                <div className="bit-switch-label">Light {bitSwitchState.switch1 ? 'ON' : 'OFF'}</div>
                <div className="bit-value-pill">{bitSwitchState.switch1 ? '1' : '0'}</div>
                <button type="button" className="switch-toggle-btn">{bitSwitchState.switch1 ? 'SWITCH OFF' : 'SWITCH ON'}</button>
              </div>

              {/* Switch 2 */}
              <div
                className={`bit-switch-card ${bitSwitchState.switch2 ? 'switch-on' : 'switch-off'}`}
                onClick={() => onToggleBitSwitch('switch2')}
              >
                <span className="bulb-icon">{bitSwitchState.switch2 ? '💡' : '🌑'}</span>
                <div className="bit-switch-label">Light {bitSwitchState.switch2 ? 'ON' : 'OFF'}</div>
                <div className="bit-value-pill">{bitSwitchState.switch2 ? '1' : '0'}</div>
                <button type="button" className="switch-toggle-btn">{bitSwitchState.switch2 ? 'SWITCH OFF' : 'SWITCH ON'}</button>
              </div>
            </div>

            <p className="qubit-state-caption" style={{ marginTop: '14px' }}>
              Your Phone 📱, Laptop 💻, and Computer 🖥️ all use billions of these binary switches!
            </p>
          </div>
        </div>
      )}

      {/* 4. DOOR CHALLENGE */}
      {activeSection.id === 'door_challenge' && (
        <div className="interactive-lesson-step">
          <div className="session-pill-badge">SESSION 3 · THE CHALLENGE</div>
          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text={lesson.title || 'The Classical Search Challenge'}
              sectionId="door-title"
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          <div className="lesson-mascot-dialogue">
            <div className="lesson-qubi-small">
              <MascotQubi mood="thinking" size={54} />
            </div>
            <p className="lesson-bubble-text">
              <NarratedText
                text="Classical algorithms must search one-by-one! Find the hidden treasure behind the 5 doors:"
                sectionId="door-guide"
                narrator={narrator}
              />
            </p>
          </div>

          <div className="interactive-quantum-box doors-challenge-box">
            <div className="doors-grid">
              {[1, 2, 3, 4, 5].map((doorNum) => {
                const isOpened = openedDoors[doorNum];
                const isTreasure = doorNum === 4;
                return (
                  <button
                    key={doorNum}
                    type="button"
                    className={`door-card ${isOpened ? (isTreasure ? 'door-treasure' : 'door-empty') : ''}`}
                    onClick={() => onDoorClick(doorNum)}
                  >
                    <div className="door-icon">{isOpened ? (isTreasure ? '💎' : '💨') : '🚪'}</div>
                    <span className="door-title">Door {doorNum}</span>
                    {isOpened && (
                      <span className="door-status-text">{isTreasure ? 'FOUND!' : 'EMPTY'}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {doorTreasureFound ? (
              <div className="treasure-found-banner">
                <h4>🎉 You found the treasure!</h4>
                <p>
                  A classical algorithm had to check door-by-door. But quantum superposition allows evaluating states concurrently!
                </p>
              </div>
            ) : (
              <p className="qubit-state-caption">Tap each door to search classical-style!</p>
            )}
          </div>
        </div>
      )}

      {/* 5. CLASSIFY GAME */}
      {activeSection.id === 'classify_game' && (
        <div className="interactive-lesson-step">
          <div className="session-pill-badge">SESSION 4 · MINI GAME</div>
          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text="Classical or Quantum?"
              sectionId="classify-title"
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          <div className="lesson-mascot-dialogue">
            <div className="lesson-qubi-small">
              <MascotQubi mood="idle" size={54} />
            </div>
            <p className="lesson-bubble-text">
              <NarratedText
                text="Classify each technology! Does it use classical bits or quantum qubits?"
                sectionId="classify-guide"
                narrator={narrator}
              />
            </p>
          </div>

          <div className="interactive-quantum-box classify-card-box">
            <div className="classify-item-card">
              <span className="classify-item-icon">{classifyItems[classifyIndex]?.icon}</span>
              <h3 className="classify-item-name">{classifyItems[classifyIndex]?.name}</h3>
              <span className="classify-item-counter">
                {classifyIndex + 1} of {classifyItems.length}
              </span>
            </div>

            {classifyFeedback && (
              <div className={`classify-feedback ${classifyFeedback}`}>
                {classifyFeedback === 'correct' ? '🎉 Perfect!' : '⚠️ Try again!'}
              </div>
            )}

            <div className="classify-actions-row">
              <button
                type="button"
                className="btn-primary btn-3d btn-classify-classical"
                onClick={() => onClassifyChoice('classical')}
              >
                💻 CLASSICAL
              </button>
              <button
                type="button"
                className="btn-secondary btn-3d btn-classify-quantum"
                onClick={() => onClassifyChoice('quantum')}
              >
                ⚛️ QUANTUM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. FINAL BOSS MISSION */}
      {activeSection.id === 'boss_mission' && (
        <div className="interactive-lesson-step">
          <div className="session-pill-badge">SESSION 8 · FINAL BOSS CHALLENGE</div>
          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text="🏆 Match the Technology"
              sectionId="boss-title"
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          <div className="lesson-mascot-dialogue">
            <div className="lesson-qubi-small">
              <MascotQubi mood="celebrate" size={54} />
            </div>
            <p className="lesson-bubble-text">
              <NarratedText
                text="Prove your quantum mastery! Connect each computer to its fundamental information unit:"
                sectionId="boss-guide"
                narrator={narrator}
              />
            </p>
          </div>

          <div className="interactive-quantum-box boss-mission-box">
            <div className="boss-pairs-container">
              {/* Row 1: Classical */}
              <div className="boss-pair-row">
                <div className="boss-card-left">
                  <span>💻</span> Classical Computer
                </div>
                <span className="boss-connect-arrow">➔</span>
                <div className="boss-choice-group">
                  <button
                    type="button"
                    className={`boss-choice-btn ${bossMatches.classical === 'BIT' ? 'boss-selected-correct' : ''}`}
                    onClick={() => onBossMatch('classical', 'BIT')}
                  >
                    BIT
                  </button>
                  <button
                    type="button"
                    className={`boss-choice-btn ${bossMatches.classical === 'QUBIT' ? 'boss-selected-wrong' : ''}`}
                    onClick={() => onBossMatch('classical', 'QUBIT')}
                  >
                    QUBIT
                  </button>
                </div>
              </div>

              {/* Row 2: Quantum */}
              <div className="boss-pair-row">
                <div className="boss-card-left">
                  <span>⚛️</span> Quantum Computer
                </div>
                <span className="boss-connect-arrow">➔</span>
                <div className="boss-choice-group">
                  <button
                    type="button"
                    className={`boss-choice-btn ${bossMatches.quantum === 'BIT' ? 'boss-selected-wrong' : ''}`}
                    onClick={() => onBossMatch('quantum', 'BIT')}
                  >
                    BIT
                  </button>
                  <button
                    type="button"
                    className={`boss-choice-btn ${bossMatches.quantum === 'QUBIT' ? 'boss-selected-correct' : ''}`}
                    onClick={() => onBossMatch('quantum', 'QUBIT')}
                  >
                    QUBIT
                  </button>
                </div>
              </div>
            </div>

            {bossCompleted && (
              <div className="boss-complete-banner">
                <h4>🎉 MISSION COMPLETE!</h4>
                <p>You have mastered the foundations of Quantum Computing!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. MATHEMATICAL LEARNING SECTION */}
      {activeSection.id === 'math' && lesson.mathActivity && (
        <div className="modular-math-activity-wrapper">
          {lesson.mathActivity.type === 'drag_drop' && (
            <MathDragDrop
              data={lesson.mathActivity}
              onComplete={handleNextSection}
              onPlaySound={onPlaySound}
            />
          )}

          {lesson.mathActivity.type === 'formula_builder' && (
            <FormulaBuilder
              data={lesson.mathActivity}
              onComplete={handleNextSection}
              onPlaySound={onPlaySound}
            />
          )}

          {lesson.mathActivity.type === 'step_calculation' && (
            <StepCalculationPuzzle
              data={lesson.mathActivity}
              onComplete={handleNextSection}
              onPlaySound={onPlaySound}
            />
          )}

          {lesson.mathActivity.type === 'probability_slider' && (
            <ProbabilitySlider
              data={lesson.mathActivity}
              onComplete={handleNextSection}
              onPlaySound={onPlaySound}
            />
          )}
        </div>
      )}

      {/* 7b. INTERACTIVE SCALE / PROBABILITY SLIDER */}
      {activeSection.id === 'slider' && lesson.sliderActivity && (
        <div className="modular-math-activity-wrapper">
          <ProbabilitySlider
            data={lesson.sliderActivity}
            onComplete={handleNextSection}
            onPlaySound={onPlaySound}
          />
        </div>
      )}

      {/* 8. QUANTUM CIRCUIT ACTIVITY */}
      {activeSection.id === 'circuit' && lesson.circuitActivity && (
        <CircuitBuilderActivity
          data={lesson.circuitActivity}
          onComplete={handleNextSection}
          onPlaySound={onPlaySound}
        />
      )}

      {/* 9. CODE + CIRCUIT SPLIT ACTIVITY */}
      {activeSection.id === 'code_circuit' && lesson.codeCircuit && (
        <CodeCircuitSplit
          data={lesson.codeCircuit}
          onComplete={handleNextSection}
          onPlaySound={onPlaySound}
        />
      )}

      {/* 10. PRACTICAL QUANTUM LAB */}
      {activeSection.id === 'lab' && (
        <InteractiveLabSection
          labData={lesson.labActivity || { title: lesson.title, description: lesson.summary }}
          onComplete={handleNextSection}
          onPlaySound={onPlaySound}
        />
      )}

      {/* 11. QUIZ QUESTIONS STEP */}
      {activeSection.id === 'quiz' && lesson.questions && lesson.questions[currentQIndex] && (
        <div className="quiz-question-step">
          <div className="quiz-question-badge">
            <span>Question {currentQIndex + 1} of {lesson.questions.length}</span>
          </div>

          <h2 className="lesson-question-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <NarratedText
              text={lesson.questions[currentQIndex].question}
              sectionId={`quiz-q-${currentQIndex}`}
              narrator={narrator}
            />
            <VoiceSpeakerButton narrator={narrator} />
          </h2>

          <div className="quiz-options-list">
            {lesson.questions[currentQIndex].options.map((opt, idx) => {
              let statusClass = '';
              if (isAnswerChecked) {
                if (idx === lesson.questions[currentQIndex].correct) statusClass = 'correct-choice';
                else if (idx === selectedOption) statusClass = 'wrong-choice';
              } else if (idx === selectedOption) {
                statusClass = 'selected-choice';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={`quiz-choice-btn ${statusClass}`}
                  onClick={() => onSelectOption(idx)}
                >
                  <span className="opt-letter-pill">{String.fromCharCode(65 + idx)}</span>
                  <span className="opt-text-label">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonSectionRenderer;
