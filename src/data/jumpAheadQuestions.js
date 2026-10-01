import { UNITS } from './courses';

// Question Bank across topics for Jump Ahead Checkpoint tests
export const CHECKPOINT_QUESTION_BANK = [
  // 1. Fundamentals of Computing (Input -> Process -> Output)
  {
    id: 'jp_ipo_choice',
    type: 'choice',
    unitId: 1,
    badge: 'CONCEPT RECALL',
    question: 'In the fundamental computing pipeline, what is the correct order of data flow?',
    options: [
      'Process ➔ Input ➔ Output',
      'Input ➔ Process ➔ Output',
      'Output ➔ Process ➔ Input',
      'Process ➔ Storage ➔ Memory'
    ],
    correct: 1,
    hint: 'First raw data is received, calculations are run, and the result is displayed.',
    explanation: 'All classical and quantum computational systems receive an Input, execute a Process (algorithm), and yield an Output.'
  },
  {
    id: 'jp_ipo_drag',
    type: 'drag_drop',
    unitId: 1,
    badge: 'DRAG & DROP PIPELINE',
    question: 'Build the foundational computing workflow:',
    prompt: 'Tap or drag the correct computing stages into their matching slots:',
    template: [
      'Raw data received: [ ',
      { id: 's1', answer: 'Input' },
      ' ] ➔ Operations executed: [ ',
      { id: 's2', answer: 'Process' },
      ' ] ➔ Final answer delivered: [ ',
      { id: 's3', answer: 'Output' },
      ' ]'
    ],
    options: ['Input', 'Process', 'Output', 'Reboot', 'Screen'],
    hint: 'Think: Input is gathered, Process does the math, Output shows results.',
    explanation: 'The computing pipeline always connects Input data through Processing logic to produce an Output.'
  },

  // 2. Classical Bits & Transistors
  {
    id: 'jp_bit_choice',
    type: 'choice',
    unitId: 1,
    badge: 'BINARY LOGIC',
    question: 'A classical bit in a modern computer can exist in which of the following states?',
    options: [
      'Exclusively 0 OR 1 at any given moment',
      'Both 0 and 1 simultaneously',
      'Any infinite continuous wave of fractions',
      'Only 0 when powered on'
    ],
    correct: 0,
    hint: 'Classical transistors act like binary switches: strictly ON (1) or OFF (0).',
    explanation: 'A classical bit is strictly binary — at any moment in time, it is deterministically either 0 or 1.'
  },
  {
    id: 'jp_bit_drag',
    type: 'drag_drop',
    unitId: 1,
    badge: 'DRAG & DROP MATCH',
    question: 'Match the hardware components to their binary representations:',
    prompt: 'Place the correct terms into the comparison slots:',
    template: [
      'Classical Transistor is either: [ ',
      { id: 's1', answer: '0 or 1' },
      ' ] while a Quantum Qubit can be in: [ ',
      { id: 's2', answer: 'Superposition' },
      ' ]'
    ],
    options: ['0 or 1', 'Superposition', 'Infinite Voltage', 'Zero Power'],
    hint: 'Classical switches are binary; quantum systems allow linear combinations (superposition).',
    explanation: 'Transistors store discrete 0 or 1, while qubits can exist in linear superpositions of |0⟩ and |1⟩.'
  },

  // 3. Logic Gates
  {
    id: 'jp_gate_choice',
    type: 'choice',
    unitId: 1,
    badge: 'LOGIC GATES',
    question: 'What is the output of a classical AND gate when inputs are A = 1 and B = 0?',
    options: ['1', '0', 'Both 0 and 1', '-1'],
    correct: 1,
    hint: 'An AND gate requires BOTH inputs to be 1 to produce 1.',
    explanation: 'In boolean logic, 1 AND 0 equals 0. An AND gate outputs 1 only when all inputs are 1.'
  },

  // 4. Quantum Superposition & Qubits
  {
    id: 'jp_qubit_choice',
    type: 'choice',
    unitId: 2,
    badge: 'QUANTUM THEORY',
    question: 'What unique principle allows a quantum computer to evaluate millions of possibilities at once?',
    options: [
      'Superposition',
      'Faster fan cooling',
      'Adding more monitor displays',
      'Using copper cables instead of optical fiber'
    ],
    correct: 0,
    hint: 'The ability for a quantum state to exist in multiple configurations at the same time.',
    explanation: 'Superposition enables qubits to exist in a linear combination of |0⟩ and |1⟩ simultaneously, processing vast computational paths concurrently.'
  },

  // 5. Interactive Probability / Amplitude Slider
  {
    id: 'jp_prob_slider',
    type: 'slider',
    unitId: 2,
    badge: 'PROBABILITY SLIDER',
    question: 'Tune the quantum superposition state |ψ⟩:',
    prompt: 'Adjust the probability slider so |0⟩ and |1⟩ have an equal 50% chance of measurement:',
    targetVal: 50,
    tolerance: 5,
    unit: '%',
    min: 0,
    max: 100,
    stateVisual: true,
    hint: 'Move the slider to the center (50%) so both state probabilities are balanced equally.',
    explanation: 'When α = β = 1/√2 ≈ 0.707, the probabilities |α|² and |β|² are each exactly 0.50 (50%). This is an equal superposition state (|+⟩).'
  },

  // 6. Quantum Circuit Gates
  {
    id: 'jp_gate_h',
    type: 'gate_match',
    unitId: 3,
    badge: 'QUANTUM CIRCUIT',
    question: 'Which quantum gate transforms a definite basis state |0⟩ into an equal superposition |+⟩?',
    prompt: 'Select the correct gate to insert on the circuit wire:',
    wireState: '|0⟩ ─── [ ? ] ─── |+⟩',
    options: [
      { id: 'H', label: 'Hadamard (H)', desc: 'Creates Superposition from basis states' },
      { id: 'X', label: 'Pauli-X (NOT)', desc: 'Flips |0⟩ to |1⟩ and vice versa' },
      { id: 'Z', label: 'Pauli-Z (Phase)', desc: 'Adds π phase flip to |1⟩' },
      { id: 'M', label: 'Measurement', desc: 'Collapses qubit to classical bit' }
    ],
    correct: 'H',
    hint: 'The Hadamard gate H is known as the "Superposition Creator".',
    explanation: 'Applying the Hadamard (H) gate to |0⟩ produces (|0⟩ + |1⟩)/√2, the balanced |+⟩ superposition state.'
  },
  {
    id: 'jp_gate_x',
    type: 'gate_match',
    unitId: 3,
    badge: 'QUANTUM CIRCUIT',
    question: 'Which quantum gate acts as a quantum bit-flip, flipping |0⟩ into |1⟩?',
    prompt: 'Identify the quantum bit-flip gate:',
    wireState: '|0⟩ ─── [ ? ] ─── |1⟩',
    options: [
      { id: 'X', label: 'Pauli-X (NOT)', desc: 'Bit-flip operator (|0⟩ ➔ |1⟩)' },
      { id: 'H', label: 'Hadamard (H)', desc: 'Superposition creator' },
      { id: 'Y', label: 'Pauli-Y', desc: 'Bit and phase flip' },
      { id: 'I', label: 'Identity (I)', desc: 'Leaves state unchanged' }
    ],
    correct: 'X',
    hint: 'The Pauli-X gate is the quantum equivalent of the classical NOT gate.',
    explanation: 'The Pauli-X gate flips the amplitude of |0⟩ to |1⟩ and |1⟩ to |0⟩, acting as the quantum NOT gate.'
  },

  // 7. Measurement & Collapse
  {
    id: 'jp_measurement_choice',
    type: 'choice',
    unitId: 2,
    badge: 'MEASUREMENT',
    question: 'What happens to a qubit in superposition when a measurement is performed?',
    options: [
      'It irreversibly collapses into a definite classical state (0 or 1)',
      'It multiplies into four duplicate qubits',
      'It creates infinite electric energy',
      'Nothing, it remains in superposition forever'
    ],
    correct: 0,
    hint: 'The act of observing or measuring forces the wave function to collapse.',
    explanation: 'Quantum measurement forces a superposition state to collapse probabilistically into one definite eigenvalue (0 or 1).'
  },

  // 8. Entanglement & Multi-Qubit Systems
  {
    id: 'jp_entangle_drag',
    type: 'drag_drop',
    unitId: 4,
    badge: 'ENTANGLEMENT MATCH',
    question: 'Match the quantum multi-qubit principles:',
    prompt: 'Fill in the blanks with the correct quantum phenomena:',
    template: [
      'Two qubits connected so one dictates the other are: [ ',
      { id: 's1', answer: 'Entangled' },
      ' ] and they can be prepared using a CNOT and a: [ ',
      { id: 's2', answer: 'Hadamard' },
      ' ] gate.'
    ],
    options: ['Entangled', 'Hadamard', 'Unplugged', 'Classical Wire'],
    hint: 'Bell states require creating superposition with H, then applying CNOT to entangle.',
    explanation: 'Quantum Entanglement strongly correlates qubits. The canonical Bell state is formed by applying H to qubit 0 and CNOT controlled on 0 targeting 1.'
  },

  // 9. Quantum Advantage
  {
    id: 'jp_advantage_choice',
    type: 'choice',
    unitId: 4,
    badge: 'QUANTUM ADVANTAGE',
    question: 'Why do quantum computers excel at simulating chemical molecules and cryptography?',
    options: [
      'Nature is inherently quantum mechanical and scales exponentially with molecule size',
      'Quantum computers are cheaper to manufacture in home basements',
      'Classical computers cannot perform division',
      'Quantum computers do not use electricity'
    ],
    correct: 0,
    hint: 'As Richard Feynman famously said, "Nature isn\'t classical, dammit, and if you want to make a simulation of nature, you\'d better make it quantum mechanical!"',
    explanation: 'Simulating quantum mechanical systems requires calculating exponentially growing Hilbert state spaces, which quantum computers naturally mimic.'
  },

  // 10. Complexity Scale Slider
  {
    id: 'jp_complexity_slider',
    type: 'slider',
    unitId: 1,
    badge: 'COMPLEXITY TUNER',
    question: 'Balance the computational complexity threshold:',
    prompt: 'Set the algorithmic scale to 70% to trigger exponential quantum parallelism:',
    targetVal: 70,
    tolerance: 5,
    unit: '%',
    min: 0,
    max: 100,
    stateVisual: false,
    hint: 'Slide towards 70% where classical computation becomes intractable and quantum systems shine.',
    explanation: 'At high problem complexity (such as prime factorization or large-scale molecular modeling), quantum algorithms provide exponential or polynomial speedups over classical algorithms.'
  }
];

/**
 * Returns a tailored list of 8 checkpoint questions for jumping ahead to `targetLesson`.
 * Questions are smartly chosen from prior units and topics so the challenge feels like
 * an authentic Duolingo checkpoint exam.
 */
export function getJumpAheadQuestions(targetLesson, allLessons = []) {
  const targetIndex = allLessons.findIndex((l) => l.id === targetLesson.id);
  const targetUnitId = targetLesson.unitId || (targetIndex >= 0 ? Math.floor(targetIndex / 4) + 1 : 1);

  // Filter questions that are at or below the target unit/topic complexity
  let eligible = CHECKPOINT_QUESTION_BANK.filter((q) => q.unitId <= Math.max(1, targetUnitId));

  // If fewer than 8 eligible, pull from general pool
  if (eligible.length < 8) {
    eligible = [...CHECKPOINT_QUESTION_BANK];
  }

  // Ensure diverse question types: choice, drag_drop, slider, gate_match
  const typesNeeded = ['choice', 'drag_drop', 'slider', 'gate_match'];
  const picked = [];

  // Pick at least 1 of each diverse type if available
  typesNeeded.forEach((t) => {
    const match = eligible.find((q) => q.type === t && !picked.includes(q));
    if (match) picked.push(match);
  });

  // Fill up the rest with high quality questions up to 8
  for (const q of eligible) {
    if (picked.length >= 8) break;
    if (!picked.includes(q)) {
      picked.push(q);
    }
  }

  // If still under 8, pad from bank
  for (const q of CHECKPOINT_QUESTION_BANK) {
    if (picked.length >= 8) break;
    if (!picked.includes(q)) {
      picked.push(q);
    }
  }

  return picked.slice(0, 8);
}
