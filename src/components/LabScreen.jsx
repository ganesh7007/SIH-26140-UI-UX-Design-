import React, { useState, useEffect } from 'react';
import { BASIC_QUANTUM_LABS, INITIAL_LAB_PROGRESS } from '../data/quantumLabsData';
import QuantumLabDashboard from './lab/QuantumLabDashboard';
import LabWorkspace from './lab/LabWorkspace';
import LabCompletionModal from './lab/LabCompletionModal';
import './lab/QuantumLab.css';

// Freeform state simulator imports (if user switches to Freeform Mode)
import { GhostSmile } from './GhostSmile';
import { ChartScatter } from './ChartScatter';
import { PersonCheckingLaboratory } from './PersonCheckingLaboratory';
import { AnimateIcon } from './AnimateIcon';
import { LightningIcon } from './ReiconIcons';
import Loader from './ui/loader-1';

export const LabScreen = ({
  userState,
  setUserState,
  onPlaySound = () => {},
  onShowToast = () => {}
}) => {
  // Main screen mode: 'guided' (gamified labs) | 'freeform' (state simulator)
  const [labMode, setLabMode] = useState('guided');

  // Currently active lab in workspace (null = dashboard)
  const [activeLab, setActiveLab] = useState(null);

  // Completed lab modal celebration
  const [completedLabData, setCompletedLabData] = useState(null);

  // Lab progress state (saved to localStorage)
  const [labProgress, setLabProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('qubitquest_lab_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading lab progress:', e);
    }
    return INITIAL_LAB_PROGRESS;
  });

  // Save lab progress
  useEffect(() => {
    try {
      localStorage.setItem('qubitquest_lab_progress', JSON.stringify(labProgress));
    } catch (e) {
      console.error('Error saving lab progress:', e);
    }
  }, [labProgress]);

  // Handle Starting a Lab
  const handleStartLab = (lab) => {
    setActiveLab(lab);
  };

  // Handle Completing a Lab
  const handleCompleteLab = (lab) => {
    const isAlreadyCompleted = labProgress.completedLabIds.includes(lab.id);
    const updatedCompleted = isAlreadyCompleted
      ? labProgress.completedLabIds
      : [...labProgress.completedLabIds, lab.id];

    const newEarnedQXP = (labProgress.earnedQXP || 0) + (isAlreadyCompleted ? Math.round(lab.xpReward / 2) : lab.xpReward);
    const newBadges = lab.badge && !labProgress.unlockedBadges?.includes(lab.badge.id)
      ? [...(labProgress.unlockedBadges || []), lab.badge.id]
      : (labProgress.unlockedBadges || []);

    const updatedProgress = {
      ...labProgress,
      completedLabIds: updatedCompleted,
      earnedQXP: newEarnedQXP,
      unlockedBadges: newBadges
    };

    setLabProgress(updatedProgress);
    setCompletedLabData(lab);

    // Sync XP to userState if available
    if (setUserState) {
      setUserState((prev) => ({
        ...prev,
        xp: (prev.xp || 0) + (isAlreadyCompleted ? Math.round(lab.xpReward / 2) : lab.xpReward)
      }));
    }

    if (onShowToast) {
      onShowToast({
        type: 'xp',
        title: `${lab.title} Completed!`,
        message: `Earned +${lab.xpReward} QXP & Badge: ${lab.badge?.name || 'Quantum Explorer'}`,
        amount: `+${lab.xpReward} QXP`
      });
    }
  };

  // Continue to Next Lab
  const handleContinueNextLab = () => {
    if (!completedLabData) return;
    const currentIndex = BASIC_QUANTUM_LABS.findIndex((l) => l.id === completedLabData.id);
    setCompletedLabData(null);

    if (currentIndex < BASIC_QUANTUM_LABS.length - 1) {
      const nextLab = BASIC_QUANTUM_LABS[currentIndex + 1];
      setActiveLab(nextLab);
    } else {
      setActiveLab(null);
    }
  };

  // Reset Progression to Lab 01
  const handleResetProgress = () => {
    const resetState = {
      completedLabIds: [],
      currentActiveLabId: 'lab-01',
      earnedQXP: 0,
      labStreak: 3,
      unlockedBadges: []
    };
    setLabProgress(resetState);
    setActiveLab(null);
    setCompletedLabData(null);
  };

  // ==========================================
  // FREEFORM SIMULATOR STATE
  // ==========================================
  const [freeformTab, setFreeformTab] = useState('superposition');
  const [superState, setSuperState] = useState({ alpha: 1, beta: 0, stateLabel: '|0⟩' });
  const [superMeasured, setSuperMeasured] = useState(null);

  const applySuperGate = (gate) => {
    onPlaySound('click');
    setSuperMeasured(null);
    if (gate === 'H') {
      if (superState.stateLabel === '|0⟩') {
        setSuperState({ alpha: 1 / Math.SQRT2, beta: 1 / Math.SQRT2, stateLabel: '|+⟩ = (|0⟩ + |1⟩)/√2' });
      } else if (superState.stateLabel === '|1⟩') {
        setSuperState({ alpha: 1 / Math.SQRT2, beta: -1 / Math.SQRT2, stateLabel: '|-⟩ = (|0⟩ - |1⟩)/√2' });
      } else {
        setSuperState({ alpha: 1, beta: 0, stateLabel: '|0⟩' });
      }
    } else if (gate === 'X') {
      if (superState.stateLabel === '|0⟩') {
        setSuperState({ alpha: 0, beta: 1, stateLabel: '|1⟩' });
      } else if (superState.stateLabel === '|1⟩') {
        setSuperState({ alpha: 1, beta: 0, stateLabel: '|0⟩' });
      } else {
        setSuperState({ alpha: 1 / Math.SQRT2, beta: 1 / Math.SQRT2, stateLabel: '|+⟩ = (|0⟩ + |1⟩)/√2' });
      }
    } else if (gate === 'RESET') {
      setSuperState({ alpha: 1, beta: 0, stateLabel: '|0⟩' });
    }
  };

  const measureSuperQubit = () => {
    onPlaySound('correct');
    const prob0 = Math.pow(superState.alpha, 2);
    const result = Math.random() < prob0 ? 0 : 1;
    setSuperMeasured(result);
    if (result === 0) {
      setSuperState({ alpha: 1, beta: 0, stateLabel: '|0⟩ (Collapsed)' });
    } else {
      setSuperState({ alpha: 0, beta: 1, stateLabel: '|1⟩ (Collapsed)' });
    }
  };

  return (
    <div className="quantum-lab-container">
      {/* 1. Guided Gamified Lab Mode */}
      {labMode === 'guided' && (
        <>
          {activeLab ? (
            <LabWorkspace
              lab={activeLab}
              onCompleteLab={handleCompleteLab}
              onBackToDashboard={() => setActiveLab(null)}
              onPlaySound={onPlaySound}
            />
          ) : (
            <QuantumLabDashboard
              labProgress={labProgress}
              onStartLab={handleStartLab}
              onOpenFreeformSimulator={() => setLabMode('freeform')}
              onResetProgress={handleResetProgress}
              onPlaySound={onPlaySound}
            />
          )}

          {/* Completion Celebration Modal */}
          {completedLabData && (
            <LabCompletionModal
              lab={completedLabData}
              streak={labProgress.labStreak || 3}
              onContinue={handleContinueNextLab}
              onBackToDashboard={() => {
                setCompletedLabData(null);
                setActiveLab(null);
              }}
              onPlaySound={onPlaySound}
            />
          )}
        </>
      )}

      {/* 2. Freeform State Simulator Mode */}
      {labMode === 'freeform' && (
        <div className="freeform-lab-wrapper">
          <div className="freeform-top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <button
              type="button"
              className="btn-secondary btn-3d"
              onClick={() => {
                onPlaySound('click');
                setLabMode('guided');
              }}
            >
              ← Back to Guided Labs
            </button>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--purple)' }}>Freeform Sandbox</span>
          </div>

          <div className="lab-screen-wrapper">
            <div className="screen-header">
              <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <AnimateIcon animateOnClick>
                  <PersonCheckingLaboratory size={32} color="currentColor" />
                </AnimateIcon>{' '}
                Freeform Quantum Laboratory
              </h1>
              <p>Interactive State Sandbox & Tomography</p>
            </div>

            {/* Sandbox Card */}
            <div className="lab-card-main">
              <div className="lab-section-header">
                <h3>Superposition & State Vector Sandbox</h3>
                <span className="lab-badge">Hadamard (H) & Pauli (X)</span>
              </div>

              <div className="state-math-display">
                <span>|ψ⟩ = </span>
                <span className="math-highlight">{superState.stateLabel}</span>
              </div>

              <div className="superposition-sphere-container">
                <div className={`qubit-sphere-visual ${superState.alpha > 0 && superState.beta > 0 ? 'qubit-state-super' : superState.alpha > 0 ? 'qubit-state-0' : 'qubit-state-1'}`}>
                  <span>{superMeasured !== null ? superMeasured : superState.alpha > 0 && superState.beta > 0 ? 'Ψ' : superState.alpha > 0 ? '0' : '1'}</span>
                </div>
                {superMeasured !== null && (
                  <div className="measurement-toast">
                    Collapsed to definite state <strong>|{superMeasured}⟩</strong>!
                  </div>
                )}
              </div>

              <div className="quantum-prob-meter-group">
                <div className="prob-meter-row">
                  <span className="prob-meter-label">|0⟩ Probability</span>
                  <div className="prob-meter-track">
                    <div className="prob-meter-fill fill-0" style={{ width: `${Math.round(Math.pow(superState.alpha, 2) * 100)}%` }}></div>
                  </div>
                  <span className="prob-meter-val">{Math.round(Math.pow(superState.alpha, 2) * 100)}%</span>
                </div>
                <div className="prob-meter-row">
                  <span className="prob-meter-label">|1⟩ Probability</span>
                  <div className="prob-meter-track">
                    <div className="prob-meter-fill fill-1" style={{ width: `${Math.round(Math.pow(superState.beta, 2) * 100)}%` }}></div>
                  </div>
                  <span className="prob-meter-val">{Math.round(Math.pow(superState.beta, 2) * 100)}%</span>
                </div>
              </div>

              <div className="lab-action-grid">
                <button className="btn-primary btn-3d" onClick={() => applySuperGate('H')}>
                  + H Gate (Superposition)
                </button>
                <button className="btn-primary btn-3d" onClick={() => applySuperGate('X')}>
                  + X Gate (Bit Flip)
                </button>
                <button className="btn-secondary btn-3d" onClick={measureSuperQubit}>
                  ⚡ Measure Qubit
                </button>
                <button className="btn-secondary btn-3d" onClick={() => applySuperGate('RESET')}>
                  Reset (|0⟩)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabScreen;
