import React from 'react';
import { CloseIcon, BookOpenIcon, CheckIcon } from './ReiconIcons';

export const GuidebookModal = ({ unit, onClose, onPlaySound }) => {
  if (!unit) return null;

  const keyTakeaways = [
    {
      title: 'Qubit Superposition',
      desc: 'Unlike classical bits that are strictly 0 or 1, a qubit exists in a superposition state |ψ⟩ = α|0⟩ + β|1⟩ with probability amplitudes.'
    },
    {
      title: 'Dirac Bra-Ket Notation',
      desc: 'State vectors are denoted as kets |ψ⟩, while complex conjugate row vectors are bras ⟨ψ|. The inner product is ⟨ψ|φ⟩.'
    },
    {
      title: 'Quantum Measurement',
      desc: 'Measuring a qubit collapses its wavefunction probabilistically to either |0⟩ with probability |α|² or |1⟩ with probability |β|².'
    }
  ];

  return (
    <div className="guidebook-modal-backdrop" onClick={onClose}>
      <div className="guidebook-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="guidebook-modal-header">
          <div className="guidebook-header-left">
            <span className="guidebook-badge">SECTION 1, UNIT {unit.id} GUIDEBOOK</span>
            <h2 className="guidebook-modal-title">{unit.title}</h2>
          </div>
          <button
            className="guidebook-close-btn"
            onClick={() => {
              onPlaySound?.('click');
              onClose();
            }}
            aria-label="Close Guidebook"
          >
            <CloseIcon size={24} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Content Body */}
        <div className="guidebook-modal-body">
          {/* Key Concepts Section */}
          <div className="guidebook-section">
            <h3 className="guidebook-section-title">
              <span className="guidebook-title-icon">📖</span> Key Quantum Concepts
            </h3>
            <div className="guidebook-cards-grid">
              {keyTakeaways.map((item, idx) => (
                <div key={idx} className="guidebook-concept-card">
                  <div className="concept-card-bullet">
                    <CheckIcon size={16} color="var(--mint-duo)" />
                  </div>
                  <div>
                    <h4 className="concept-card-title">{item.title}</h4>
                    <p className="concept-card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unit Lessons Overview */}
          <div className="guidebook-section">
            <h3 className="guidebook-section-title">
              <span className="guidebook-title-icon">🎯</span> Unit Curriculum
            </h3>
            <div className="guidebook-lessons-list">
              {unit.lessons?.map((l, index) => (
                <div key={l.id} className="guidebook-lesson-row">
                  <div className="guidebook-lesson-idx">{index + 1}</div>
                  <div className="guidebook-lesson-info">
                    <span className="guidebook-lesson-name">{l.title}</span>
                    <span className="guidebook-lesson-desc">{l.summary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="guidebook-modal-footer">
          <button
            className="guidebook-gotit-btn"
            onClick={() => {
              onPlaySound?.('click');
              onClose();
            }}
          >
            GOT IT!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidebookModal;
