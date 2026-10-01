import React, { useState } from 'react';
import { UNITS } from '../data/courses';
import {
  LockIcon,
  BookOpenIcon,
  CheckIcon,
  ArrowDownIcon,
  AtomIcon,
  MicroscopeIcon,
  TrophyIcon,
  LightningIcon,
  CpuBoltIcon,
  MathIcon,
  LinkIcon,
  BulbBoltIcon
} from './ReiconIcons';
import { PlaybookIcon } from './PlaybookIcon';
import { LoopyArrowConnector } from './LoopyArrowConnector';
import { JumpAheadModal } from './JumpAheadModal';

export const HomeScreen = ({
  userState,
  onStartLesson,
  onOpenGuidebook,
  onPlaySound,
  onShowToast,
  onConfirmJumpAhead
}) => {
  const allLessonIds = UNITS.flatMap((u) => u.lessons.map((l) => l.id));
  const [jumpAheadTarget, setJumpAheadTarget] = useState(null);

  const isLessonCompleted = (lessonId) => {
    return userState.completedLessons && userState.completedLessons.includes(lessonId);
  };

  const isLessonActive = (lessonId) => {
    if (isLessonCompleted(lessonId)) return false;
    const firstUncompleted = allLessonIds.find((id) => !isLessonCompleted(id));
    return firstUncompleted === lessonId;
  };

  const isLessonLocked = (lessonId) => {
    if (isLessonCompleted(lessonId) || isLessonActive(lessonId)) return false;

    // Check userState.unlockedLessons (lessons explicitly unlocked via Jump Ahead)
    if (userState.unlockedLessons && userState.unlockedLessons.includes(lessonId)) return false;

    const lessonIndex = allLessonIds.indexOf(lessonId);

    // First lesson in the curriculum is unlocked by default
    if (lessonIndex === 0) return false;

    // Or if previous lesson was completed
    if (lessonIndex > 0 && isLessonCompleted(allLessonIds[lessonIndex - 1])) return false;

    return true;
  };

  // Card click: start if unlocked, or trigger Jump Ahead Checkpoint if locked
  const handleCardClick = (lesson) => {
    if (isLessonLocked(lesson.id)) {
      onPlaySound('click');
      const unit = UNITS.find((u) => u.lessons.some((l) => l.id === lesson.id));
      setJumpAheadTarget({ lesson, unit });
      return;
    }
    onPlaySound('click');
    onStartLesson(lesson);
  };

  // Tag info helper
  const getTagInfo = (lesson, completed, active) => {
    if (lesson.isLab) return { label: 'Practical Lab', icon: '🧪', type: 'lab' };
    if (lesson.isBoss) return { label: 'Boss Challenge', icon: '🏆', type: 'boss' };
    if (completed) return { label: 'Completed Lesson', icon: '▶', type: 'video' };
    if (active) return { label: 'Current Exercise', icon: '✏️', type: 'exercise' };
    if (lesson.type === 'bit_toggle' || lesson.type === 'door_challenge') return { label: 'Exercise', icon: '✏️', type: 'exercise' };
    return { label: 'Concept', icon: '💡', type: 'concept' };
  };

  // Render standalone vector icon without background
  const renderCardGraphic = (lesson, completed, active) => {
    if (lesson.isLab || lesson.labActivity) {
      return (
        <div className="card-graphic-wrapper">
          <MicroscopeIcon size={46} color="#0284C7" />
        </div>
      );
    }
    if (lesson.isBoss || lesson.milestone) {
      return (
        <div className="card-graphic-wrapper">
          <TrophyIcon size={46} color="#F59E0B" />
        </div>
      );
    }
    if (lesson.type === 'bit_toggle') {
      return (
        <div className="card-graphic-wrapper">
          <CpuBoltIcon size={46} color="#38BDF8" />
        </div>
      );
    }
    if (lesson.type === 'door_challenge') {
      return (
        <div className="card-graphic-wrapper">
          <BulbBoltIcon size={46} color="#F43F5E" />
        </div>
      );
    }
    if (lesson.mathActivity) {
      return (
        <div className="card-graphic-wrapper">
          <MathIcon size={46} color="#8B5CF6" />
        </div>
      );
    }
    if (lesson.circuitActivity || lesson.codeCircuit) {
      return (
        <div className="card-graphic-wrapper">
          <AtomIcon size={46} color="#00CD9C" />
        </div>
      );
    }
    if (lesson.video || lesson.type === 'video') {
      return (
        <div className="card-graphic-wrapper">
          <PlaybookIcon size={46} color="#10B981" />
        </div>
      );
    }
    if (completed || lesson.type === 'story_intro') {
      return (
        <div className="card-graphic-wrapper">
          <BookOpenIcon size={46} color="#10B981" className="journey-book-icon" />
        </div>
      );
    }
    return (
      <div className="card-graphic-wrapper">
        <MathIcon size={46} color="#8B5CF6" />
      </div>
    );
  };

  const scrollToNextActive = () => {
    onPlaySound('click');
    const activeEl = document.querySelector('.journey-card.card-active');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollBy({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-duo-screen">
      <div className="duo-learning-path">
        
        {/* Top Header Card: Square Glass Surface with Purple Gradient & Glow */}
        <div className="journey-start-wrapper">
          <div className="journey-start-header">
            <div className="journey-start-glass-card">
              <div className="journey-start-inner">
                <div className="journey-flag-box">
                  <span className="journey-flag-icon">🏁</span>
                </div>
                <div className="journey-start-content">
                  <span className="journey-flag-text">Start your journey</span>
                </div>
              </div>
              <div className="journey-card-glow-reflection" />
            </div>
          </div>

          {/* Loopy dashed arrow connector from Header to First Unit Card */}
          <LoopyArrowConnector color="purple" variant="loop" className="start-header-connector" />
        </div>

        {UNITS.map((unit) => {
          return (
            <section key={unit.id} className={`duo-unit-section unit-theme-${unit.id}`}>
              {/* Unit Header Card */}
              <div className="uiverse-unit-sticky-container">
                <div className="uiverse-unit-card">
                  <div className="uiverse-card-left">
                    <div className="uiverse-card-badge">
                      <span className="uiverse-badge-icon">{unit.icon || '⚛️'}</span>
                      <span>SECTION 1, UNIT {unit.id}</span>
                    </div>
                    <h2 className="uiverse-card-heading">{unit.title}</h2>
                  </div>

                  <div className="uiverse-card-right">
                    <button
                      className="uiverse-accept-btn"
                      onClick={() => {
                        onPlaySound('click');
                        onOpenGuidebook?.(unit);
                      }}
                      title="Open Unit Guidebook"
                    >
                      <BookOpenIcon size={16} color="#FFFFFF" />
                      <span>GUIDEBOOK</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Path Cards Track */}
              <div className="journey-cards-track">
                {unit.lessons.map((lesson, idx) => {
                  const completed = isLessonCompleted(lesson.id);
                  const active = isLessonActive(lesson.id);
                  const locked = isLessonLocked(lesson.id);
                  const tagInfo = getTagInfo(lesson, completed, active);

                  const cardStateClass = completed
                    ? 'card-completed'
                    : active
                    ? 'card-active'
                    : locked
                    ? 'card-locked'
                    : 'card-unlocked';

                  const cardTypeClass = `card-type-${tagInfo.type}`;

                  // Connector color for next step
                  const connectorColor = completed
                    ? 'emerald'
                    : active
                    ? 'purple'
                    : lesson.isLab
                    ? 'sky'
                    : 'slate';

                  return (
                    <React.Fragment key={lesson.id}>
                      {/* Topic separator divider lines */}
                      {idx === 3 && (
                        <div className="duo-topic-divider-line">
                          <div className="topic-divider-rule left-rule" />
                          <span className="topic-divider-label">
                            Section 1 · What is Quantum Computing?
                          </span>
                          <div className="topic-divider-rule right-rule" />
                        </div>
                      )}

                      {idx === 5 && (
                        <div className="duo-topic-divider-line">
                          <div className="topic-divider-rule left-rule" />
                          <span className="topic-divider-label">
                            Section 1 · Practical Quantum Lab
                          </span>
                          <div className="topic-divider-rule right-rule" />
                        </div>
                      )}

                      {/* Journey Card with cleanly integrated tags inside and direct click */}
                      <div
                        className={`journey-card ${cardStateClass} ${cardTypeClass}`}
                        onClick={() => handleCardClick(lesson)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCardClick(lesson);
                          }
                        }}
                      >
                        {/* Top Right Checkmark Badge for completed cards */}
                        {completed && (
                          <div className="card-check-circle" title="Completed">
                            <CheckIcon size={16} color="#FFFFFF" />
                          </div>
                        )}

                        {/* Active Indicator Pulse Ring */}
                        {active && <div className="card-active-ring" />}

                        {/* Locked Indicator Badge */}
                        {locked && (
                          <div className="card-lock-indicator" title="Locked">
                            <LockIcon size={14} color="#94A3B8" />
                          </div>
                        )}

                        {/* Main 2-Column Content */}
                        <div className="card-main-content">
                          {/* Left Column Illustration */}
                          <div className="card-left-illustration">
                            {renderCardGraphic(lesson, completed, active)}
                          </div>

                          {/* Right Column Content with Clean Integrated Tag */}
                          <div className="card-right-text">
                            <div className="card-tag-row">
                              <span className={`card-tag-badge tag-theme-${tagInfo.type}`}>
                                <span className="tag-badge-icon">{tagInfo.icon}</span>
                                <span className="tag-badge-label">{tagInfo.label}</span>
                              </span>
                            </div>
                            <h3 className="journey-card-heading">{lesson.title}</h3>
                            <p className="journey-card-subtitle">{lesson.summary}</p>
                          </div>
                        </div>
                      </div>

                      {/* Loopy Dashed Arrow Connector to Next Card */}
                      {idx < unit.lessons.length - 1 && (
                        <LoopyArrowConnector
                          color={connectorColor}
                          variant={idx % 2 === 0 ? 'loop' : 'loop-alt'}
                        />
                      )}
                    </React.Fragment>
                  );
                })}

              </div>
            </section>
          );
        })}
      </div>

      {/* Floating Scroll to Active Lesson Button */}
      <button
        className="duo-floating-down-btn"
        onClick={scrollToNextActive}
        title="Jump to Next Lesson"
        aria-label="Scroll to active lesson"
      >
        <ArrowDownIcon size={20} color="#38BDF8" />
      </button>

      {/* Jump Ahead Checkpoint Modal */}
      {jumpAheadTarget && (
        <JumpAheadModal
          targetLesson={jumpAheadTarget.lesson}
          targetUnit={jumpAheadTarget.unit}
          allLessons={allLessonIds.map((id) => {
            for (const u of UNITS) {
              const found = u.lessons.find((l) => l.id === id);
              if (found) return { ...found, unitId: u.id };
            }
            return { id };
          })}
          onConfirmJump={(unlockedIds, bonusXP) => {
            onConfirmJumpAhead?.(unlockedIds, bonusXP);
          }}
          onStartTargetLesson={(lesson) => {
            setJumpAheadTarget(null);
            onStartLesson(lesson);
          }}
          onClose={() => setJumpAheadTarget(null)}
          onPlaySound={onPlaySound}
        />
      )}
    </div>
  );
};

export default HomeScreen;
