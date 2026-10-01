/**
 * Quantum Labs Data Model
 * Extensible data structure supporting Basic, Intermediate, and Advanced Quantum Computing Labs.
 */

export const BASIC_QUANTUM_LABS = [
  {
    id: 'lab-01',
    labNumber: 'LAB 01',
    icon: '⚛️',
    title: 'Meet Your First Qubit',
    shortDescription: 'Discover what a qubit is and how a quantum system initializes into the ground state |0⟩.',
    difficulty: 'Beginner',
    difficultyColor: '#10B981',
    estimatedTime: '3 min',
    xpReward: 50,
    badge: {
      id: 'qubit_explorer',
      name: 'Qubit Explorer',
      icon: '⚛️',
      description: 'Initialized and measured your very first physical qubit.'
    },
    prerequisiteLab: null,
    conceptsLearned: [
      'What a quantum bit (qubit) is',
      'Ground state representation: |0⟩',
      'System initialization in quantum computing',
      'Running a baseline quantum measurement'
    ],
    progressiveHints: [
      'In quantum mechanics, all standard computations begin by initializing qubits to a known ground state.',
      'Look for the "INITIALIZE" button on the quantum console to prepare the qubit in |0⟩.',
      'Once initialized, click "RUN EXPERIMENT" to measure the state on the quantum hardware.'
    ],
    initialState: '|0⟩',
    steps: [
      {
        type: 'predict',
        title: 'Step 1: Quantum State Prediction',
        prompt: 'Before running any quantum gates, when a qubit is prepared from ground rest, what state do you expect it to hold?',
        options: [
          'State |0⟩ with 100% certainty',
          'State |1⟩ with 100% certainty',
          'A 50/50 superposition of |0⟩ and |1⟩',
          'Random noise with no defined state'
        ],
        correctOption: 0,
        explanation: 'Correct! By convention in quantum computing, qubits are always initialized to the ground state |0⟩ before any operations begin.'
      },
      {
        type: 'initialize',
        title: 'Step 2: Initialize the Qubit',
        instruction: 'Click "Initialize Qubit" to prepare the physical qubit into the |0⟩ quantum state.',
        actionLabel: 'INITIALIZE QUBIT'
      },
      {
        type: 'run',
        title: 'Step 3: Run Quantum Experiment',
        instruction: 'Execute the measurement on the initialized qubit to observe the classical readout.',
        actionLabel: 'RUN EXPERIMENT'
      },
      {
        type: 'observe',
        title: 'Step 4: Observe Measurement',
        measuredState: '0',
        probability0: 100,
        probability1: 0,
        summary: 'Measurement Result: 0 (100%). The qubit was measured in the ground state |0⟩.'
      },
      {
        type: 'explain',
        title: 'Step 5: Understand Why',
        prompt: 'Why was the measurement outcome 0 with 100% certainty?',
        options: [
          'Because the qubit was prepared in |0⟩ and no quantum gates were applied to alter its wavefunction',
          'Because quantum measurement is always fixed to 0 by nature',
          'Because classical computers cannot simulate 1',
          'Because the qubit lost coherence immediately'
        ],
        correctOption: 0,
        explanation: 'Exactly! Since the qubit remained in |0⟩ with amplitude 1.0, the measurement probability |⟨0|0⟩|² is 100%.'
      }
    ]
  },
  {
    id: 'lab-02',
    labNumber: 'LAB 02',
    icon: '🔄',
    title: 'Flip the Qubit',
    shortDescription: 'Discover the Pauli-X gate — the quantum equivalent of the classical NOT gate that transforms |0⟩ into |1⟩.',
    difficulty: 'Beginner',
    difficultyColor: '#10B981',
    estimatedTime: '4 min',
    xpReward: 75,
    badge: {
      id: 'quantum_inverter',
      name: 'Quantum Inverter',
      icon: '🔄',
      description: 'Mastered single-qubit bit flips using the Pauli-X gate.'
    },
    prerequisiteLab: 'lab-01',
    conceptsLearned: [
      'The Pauli-X Gate as a quantum NOT operation',
      'State transition: |0⟩ → X → |1⟩',
      'Placing gates onto a quantum circuit wire',
      'Measuring a flipped state with 100% probability of 1'
    ],
    progressiveHints: [
      'Think about which gate changes the bit value from 0 to 1.',
      'In classical logic, a NOT gate inverts bits. In quantum computing, this is the Pauli-X gate.',
      'Drag or click the [ X ] gate into the circuit slot on the wire, then run the circuit.'
    ],
    availableGates: ['X', 'H', 'Z'],
    targetGate: 'X',
    initialState: '|0⟩',
    steps: [
      {
        type: 'predict',
        title: 'Step 1: Gate Operation Prediction',
        prompt: 'If a qubit starts in state |0⟩ and you pass it through a Pauli-X gate, what will the final state be?',
        options: [
          'State |1⟩ (Bit Flip)',
          'State |0⟩ (No change)',
          'Superposition |+⟩',
          'The qubit is destroyed'
        ],
        correctOption: 0,
        explanation: 'Spot on! The Pauli-X gate rotates the state vector 180° around the X-axis of the Bloch sphere, flipping |0⟩ to |1⟩ and |1⟩ to |0⟩.'
      },
      {
        type: 'build',
        title: 'Step 2: Build the Circuit',
        instruction: 'Place the Pauli-X gate into the circuit wire to flip the qubit.',
        circuitGoal: 'Insert X gate'
      },
      {
        type: 'run',
        title: 'Step 3: Run Quantum Circuit',
        instruction: 'Execute the circuit through the quantum simulator to measure the flipped state.',
        actionLabel: 'RUN CIRCUIT'
      },
      {
        type: 'observe',
        title: 'Step 4: Observe the Inversion',
        measuredState: '1',
        probability0: 0,
        probability1: 100,
        summary: 'Result: |1⟩ (100%). The Pauli-X gate inverted the ground state |0⟩ into excited state |1⟩.'
      },
      {
        type: 'explain',
        title: 'Step 5: Interactive Challenge',
        prompt: 'Which mathematical operation represents applying the Pauli-X gate to |0⟩?',
        options: [
          'X|0⟩ = |1⟩',
          'X|0⟩ = |0⟩',
          'X|0⟩ = (|0⟩ + |1⟩)/√2',
          'X|0⟩ = 0'
        ],
        correctOption: 0,
        explanation: 'Correct! In matrix mechanics, X = [[0, 1], [1, 0]], so X[1, 0]ᵀ = [0, 1]ᵀ which is |1⟩.'
      }
    ]
  },
  {
    id: 'lab-03',
    labNumber: 'LAB 03',
    icon: '🌌',
    title: 'Create Superposition',
    shortDescription: 'Discover the famous Hadamard gate (H) and transform a classical bit into a true quantum superposition |+⟩.',
    difficulty: 'Intermediate',
    difficultyColor: '#8B5CF6',
    estimatedTime: '5 min',
    xpReward: 100,
    badge: {
      id: 'superposition_starter',
      name: 'Superposition Starter',
      icon: '🌌',
      description: 'Unlocked genuine quantum superposition using the Hadamard gate.'
    },
    prerequisiteLab: 'lab-02',
    conceptsLearned: [
      'The Hadamard Gate (H) and basis transformation',
      'Creating the superposition state |+⟩ = (|0⟩ + |1⟩)/√2',
      'Quantum probability amplitudes vs classical probabilities',
      'Equal 50% / 50% probability distribution upon measurement'
    ],
    progressiveHints: [
      'We want to create an equal mixture where the qubit is neither strictly 0 nor strictly 1.',
      'The gate named after French mathematician Jacques Hadamard creates equal superposition.',
      'Select the [ H ] gate and insert it into the circuit wire.'
    ],
    availableGates: ['H', 'X', 'Z'],
    targetGate: 'H',
    initialState: '|0⟩',
    steps: [
      {
        type: 'predict',
        title: 'Step 1: Superposition Concept',
        prompt: 'When the Hadamard gate (H) acts on |0⟩, what happens to the qubit?',
        options: [
          'It enters a superposition state |+⟩ where measuring 0 or 1 is equally likely (50% each)',
          'It flips deterministically to 1 with 100% probability',
          'It resets permanently to 0',
          'It randomly outputs 0 or 1 without any underlying wave state'
        ],
        correctOption: 0,
        explanation: 'Exactly right! H transforms |0⟩ into |+⟩ = (|0⟩ + |1⟩)/√2, giving amplitude 1/√2 for both basis states.'
      },
      {
        type: 'build',
        title: 'Step 2: Place the Hadamard Gate',
        instruction: 'Insert the Hadamard [ H ] gate onto the quantum wire.',
        circuitGoal: 'Insert H gate'
      },
      {
        type: 'run',
        title: 'Step 3: Execute Superposition Circuit',
        instruction: 'Run the quantum circuit to generate the superposition state vector.',
        actionLabel: 'RUN SUPERPOSITION CIRCUIT'
      },
      {
        type: 'observe',
        title: 'Step 4: Mathematical Representation',
        stateVector: '|+⟩ = (|0⟩ + |1⟩) / √2',
        probability0: 50,
        probability1: 50,
        summary: 'Quantum State: |+⟩. The qubit is now in an equal superposition of |0⟩ and |1⟩ with 50% probability each.'
      },
      {
        type: 'explain',
        title: 'Step 5: Probability Calculation Challenge',
        prompt: 'According to Born\'s Rule, if the amplitude of |0⟩ is 1/√2, what is the probability P(0) = |1/√2|² of measuring 0?',
        options: [
          '50% (0.50)',
          '25% (0.25)',
          '75% (0.75)',
          '100% (1.00)'
        ],
        correctOption: 0,
        explanation: 'Brilliant! |1/√2|² = 1/2 = 50%. The probability is the absolute square of the quantum amplitude.'
      }
    ]
  },
  {
    id: 'lab-04',
    labNumber: 'LAB 04',
    icon: '📊',
    title: 'Measure the Qubit',
    shortDescription: 'Explore the collapse of the wavefunction and discover how repeated quantum measurements reveal probability distributions.',
    difficulty: 'Intermediate',
    difficultyColor: '#8B5CF6',
    estimatedTime: '5 min',
    xpReward: 100,
    badge: {
      id: 'wave_collapser',
      name: 'Waveform Collapser',
      icon: '📊',
      description: 'Mastered quantum measurement statistics and wavefunction collapse.'
    },
    prerequisiteLab: 'lab-03',
    conceptsLearned: [
      'Wavefunction collapse during measurement',
      'Single shot measurement yields exactly 1 classical bit',
      'Repeated measurements build empirical probability distributions',
      'Law of large numbers in quantum tomography'
    ],
    progressiveHints: [
      'When measuring a superposition state |+⟩, a single measurement collapses it to 0 OR 1.',
      'To see the 50/50 probability, run multiple measurement shots (e.g. 20 shots).',
      'Click "FIRE 20 SHOTS" to watch the real-time statistical tally emerge.'
    ],
    initialState: '|+⟩',
    steps: [
      {
        type: 'predict',
        title: 'Step 1: Measurement Paradox',
        prompt: 'If a qubit is in superposition |+⟩ and you measure it once on a physical detector, what will you see on your screen?',
        options: [
          'Either a classical "0" or "1" (the superposition collapses)',
          'A fractional value like 0.5',
          'Both 0 and 1 simultaneously on the same display',
          'Nothing, because measuring erases the data'
        ],
        correctOption: 0,
        explanation: 'Correct! Quantum measurement forces the continuous quantum state to collapse into a single discrete classical eigenvalue (0 or 1).'
      },
      {
        type: 'single_measure',
        title: 'Step 2: Single-Shot Measurement',
        instruction: 'Click "Measure Single Qubit" to trigger a single wavefunction collapse event.',
        actionLabel: 'MEASURE SINGLE SHOT'
      },
      {
        type: 'multi_measure',
        title: 'Step 3: Multi-Shot Statistical Experiment',
        instruction: 'Quantum probability distributions emerge over many runs. Fire 25 experimental shots to collect measurement statistics.',
        actionLabel: 'FIRE 25 EXPERIMENTAL SHOTS'
      },
      {
        type: 'observe',
        title: 'Step 4: Statistical Distribution',
        summary: 'Notice that while each individual shot was random, the aggregate distribution converges closely to ~50% |0⟩ and ~50% |1⟩.'
      },
      {
        type: 'explain',
        title: 'Step 5: Statistical Law',
        prompt: 'What is the key takeaway of quantum measurement?',
        options: [
          'A single measurement gives one classical outcome, while repeating the experiment reveals the underlying probability distribution',
          'Quantum states can never be measured or observed in reality',
          'Every shot must always give alternating 0, 1, 0, 1 in strict sequence',
          'Measuring a qubit converts it into classical electricity permanently'
        ],
        correctOption: 0,
        explanation: 'Spot on! This is why quantum computers run algorithms with hundreds of "shots" to construct the probability distribution of the answer.'
      }
    ]
  },
  {
    id: 'lab-05',
    labNumber: 'LAB 05',
    icon: '🏆',
    title: 'Build Your First Quantum Circuit',
    shortDescription: 'Combine initialization, gate placement, and measurement into a complete working quantum circuit.',
    difficulty: 'Advanced',
    difficultyColor: '#EC4899',
    estimatedTime: '6 min',
    xpReward: 150,
    badge: {
      id: 'circuit_builder',
      name: 'Quantum Circuit Builder',
      icon: '🏆',
      description: 'Engineered and executed an end-to-end quantum circuit from scratch.'
    },
    prerequisiteLab: 'lab-04',
    conceptsLearned: [
      'Full quantum workflow: Init → Gate → Measure',
      'Constructing and executing custom quantum algorithms',
      'Quantum circuit diagram interpretation',
      'Unlocking Intermediate Quantum Labs'
    ],
    progressiveHints: [
      'Your mission: Prepare |0⟩, create a superposition with the Hadamard gate, and attach a measurement detector.',
      'Place the [ H ] gate into the empty circuit slot between |0⟩ and Measure.',
      'Click "RUN COMPLETE CIRCUIT" to execute your end-to-end quantum algorithm.'
    ],
    availableGates: ['H', 'X', 'Z'],
    targetGate: 'H',
    initialState: '|0⟩',
    steps: [
      {
        type: 'predict',
        title: 'Step 1: Circuit Architecture Design',
        prompt: 'To construct a quantum random number generator (QRNG) that outputs 0 and 1 with equal probability, which circuit design is needed?',
        options: [
          'Initialize |0⟩ → Apply Hadamard (H) → Measure',
          'Initialize |0⟩ → Apply Pauli-X → Measure',
          'Initialize |0⟩ → Apply Pauli-Z → Measure',
          'Initialize |0⟩ → No gates → Measure'
        ],
        correctOption: 0,
        explanation: 'Correct! |0⟩ with an H gate creates the state |+⟩, which produces unbiased quantum randomness upon measurement.'
      },
      {
        type: 'build',
        title: 'Step 2: Construct the Circuit',
        instruction: 'Assemble your circuit: Place the Hadamard [ H ] gate into the wire slot.',
        circuitGoal: 'Insert H gate to complete circuit'
      },
      {
        type: 'run',
        title: 'Step 3: Execute End-to-End Circuit',
        instruction: 'Launch your custom quantum circuit on the simulator.',
        actionLabel: 'RUN COMPLETE CIRCUIT'
      },
      {
        type: 'observe',
        title: 'Step 4: Circuit Execution Telemetry',
        stateVector: '|ψ⟩ = 1/√2|0⟩ + 1/√2|1⟩',
        probability0: 50,
        probability1: 50,
        summary: 'Circuit Executed Successfully ✓ State |+⟩ created and measured with expected distribution 0 ≈ 50%, 1 ≈ 50%.'
      },
      {
        type: 'explain',
        title: 'Step 5: Final Graduation Challenge',
        prompt: 'Why does this quantum circuit produce both 0 and 1 measurement outcomes?',
        options: [
          'Because the Hadamard gate creates a quantum superposition of states before measurement',
          'Because the simulator has a software error that cannot decide',
          'Because the Pauli-X gate was executed secretly',
          'Because qubits always flip states when traveling through wires'
        ],
        correctOption: 0,
        explanation: 'Congratulations! You have successfully mastered the fundamentals of quantum states, gates, superposition, and circuits!'
      }
    ]
  }
];

export const INITIAL_LAB_PROGRESS = {
  completedLabIds: [],
  currentActiveLabId: 'lab-01',
  earnedQXP: 0,
  labStreak: 3,
  unlockedBadges: []
};
