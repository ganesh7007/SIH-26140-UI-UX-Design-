/* ============================================
   QubitQuest — Application Logic
   ============================================ */

// ---- Course Data ----
const COURSE_DATA = [
  {
    unit: 1, title: 'Quantum World', icon: '🌌',
    lessons: [
      {
        id: 'u1l1', title: 'What is Quantum Computing?', icon: '⚛️',
        explanation: 'Quantum computing harnesses the principles of quantum mechanics — superposition, entanglement, and interference — to process information in fundamentally new ways. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously.',
        question: 'What is the quantum equivalent of a classical bit?',
        answers: ['Byte', 'Qubit', 'Register', 'Circuit'],
        correct: 1,
        hint: 'Think about the fundamental unit of quantum information.',
        demoType: null
      },
      {
        id: 'u1l2', title: 'Classical Bits vs Qubits', icon: '🔀',
        explanation: 'A classical bit can be either 0 or 1 at any given time. A qubit, however, can be in a state |0⟩, |1⟩, or a superposition of both. This is written as α|0⟩ + β|1⟩, where α and β are complex probability amplitudes.',
        question: 'A classical bit can be in how many states at once?',
        answers: ['One', 'Two', 'Infinite', 'Zero'],
        correct: 0,
        hint: 'Classical bits are deterministic — they are in a definite state.',
        demoType: null
      },
      {
        id: 'u1l3', title: 'Superposition', icon: '🌊',
        explanation: 'Superposition allows a qubit to be in a combination of |0⟩ and |1⟩ simultaneously. When measured, the qubit "collapses" into one of these states with a probability determined by its amplitudes. This is one of the key advantages of quantum computing.',
        question: 'What happens when you measure a qubit in superposition?',
        answers: ['It stays in superposition', 'It collapses to |0⟩ or |1⟩', 'It becomes entangled', 'It disappears'],
        correct: 1,
        hint: 'Measurement forces a definite outcome.',
        demoType: 'superposition'
      },
      {
        id: 'u1l4', title: 'Your First Qubit', icon: '✨', milestone: true,
        explanation: 'Congratulations! You\'re about to interact with your first qubit. A qubit starts in the |0⟩ state. By applying quantum gates, you can manipulate its state. The Hadamard gate (H) puts a qubit into an equal superposition of |0⟩ and |1⟩.',
        question: 'What gate puts a qubit into superposition?',
        answers: ['X Gate', 'Z Gate', 'Hadamard Gate', 'CNOT Gate'],
        correct: 2,
        hint: 'This gate creates an equal probability of measuring 0 or 1.',
        demoType: 'superposition'
      }
    ]
  },
  {
    unit: 2, title: 'Qubits & Measurement', icon: '📏',
    lessons: [
      {
        id: 'u2l1', title: 'Qubit States', icon: '🎯',
        explanation: 'A qubit\'s state is described by a vector in a two-dimensional complex space. The basis states |0⟩ and |1⟩ form the computational basis. Any qubit state can be written as |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.',
        question: 'What must α² + β² equal for a valid qubit state?',
        answers: ['0', '1', '2', 'π'],
        correct: 1,
        hint: 'The total probability must sum to certainty.',
        demoType: null
      },
      {
        id: 'u2l2', title: 'Probability Amplitudes', icon: '📊',
        explanation: 'The coefficients α and β in |ψ⟩ = α|0⟩ + β|1⟩ are called probability amplitudes. The probability of measuring |0⟩ is |α|² and measuring |1⟩ is |β|². These amplitudes are complex numbers, enabling interference effects.',
        question: 'If a qubit has amplitude α = 1/√2 for |0⟩, what is the probability of measuring |0⟩?',
        answers: ['1/√2', '1/2', '1/4', '1'],
        correct: 1,
        hint: 'Probability is the square of the amplitude.',
        demoType: null
      },
      {
        id: 'u2l3', title: 'Measurement', icon: '🔬',
        explanation: 'Measurement is a fundamental operation in quantum computing. When you measure a qubit, you get a classical result: either 0 or 1. After measurement, the qubit\'s state collapses to the measured state. This process is irreversible — you cannot recover the original superposition.',
        question: 'After measuring a qubit, can you recover its original superposition state?',
        answers: ['Yes, always', 'No, measurement is irreversible', 'Only with entanglement', 'Only on Tuesdays'],
        correct: 1,
        hint: 'Measurement fundamentally changes the quantum state.',
        demoType: 'measurement'
      },
      {
        id: 'u2l4', title: 'Quantum State Collapse', icon: '💥', milestone: true,
        explanation: 'When a qubit in superposition is measured, its state "collapses" to one of the basis states. This is sometimes called wave function collapse. The probability of each outcome is determined by the amplitudes. This is a cornerstone of quantum mechanics.',
        question: 'What is the term for a qubit changing from superposition to a definite state?',
        answers: ['Entanglement', 'Interference', 'State Collapse', 'Decoherence'],
        correct: 2,
        hint: 'The wave function changes abruptly upon measurement.',
        demoType: 'measurement'
      }
    ]
  },
  {
    unit: 3, title: 'Quantum Gates', icon: '🚪',
    lessons: [
      {
        id: 'u3l1', title: 'What is a Quantum Gate?', icon: '🔧',
        explanation: 'Quantum gates are the building blocks of quantum circuits, similar to logic gates in classical computing. They are unitary operations that transform qubit states. Unlike classical gates, quantum gates are reversible — every quantum gate has an inverse.',
        question: 'Are quantum gates reversible?',
        answers: ['No', 'Yes', 'Only some', 'Only for single qubits'],
        correct: 1,
        hint: 'Quantum operations must preserve information.',
        demoType: null
      },
      {
        id: 'u3l2', title: 'X Gate', icon: '❌',
        explanation: 'The X gate (also called the NOT gate or Pauli-X gate) flips a qubit\'s state: |0⟩ → |1⟩ and |1⟩ → |0⟩. It\'s the quantum equivalent of a classical NOT gate. Its matrix representation is [[0,1],[1,0]].',
        question: 'What does the X gate do to |0⟩?',
        answers: ['Keeps it as |0⟩', 'Changes it to |1⟩', 'Puts it in superposition', 'Entangles it'],
        correct: 1,
        hint: 'X is the quantum NOT gate.',
        demoType: null
      },
      {
        id: 'u3l3', title: 'Y and Z Gates', icon: '🔄',
        explanation: 'The Y gate applies a rotation around the Y-axis of the Bloch sphere, while the Z gate applies a phase flip: it leaves |0⟩ unchanged but maps |1⟩ → -|1⟩. Together with X, these three Pauli gates form a fundamental set of single-qubit operations.',
        question: 'What does the Z gate do to |1⟩?',
        answers: ['Flips to |0⟩', 'Adds a negative phase: -|1⟩', 'Creates superposition', 'Nothing'],
        correct: 1,
        hint: 'The Z gate is a phase gate.',
        demoType: null
      },
      {
        id: 'u3l4', title: 'Hadamard Gate', icon: '🌀', milestone: true,
        explanation: 'The Hadamard (H) gate is one of the most important quantum gates. It creates an equal superposition: H|0⟩ = (|0⟩+|1⟩)/√2 and H|1⟩ = (|0⟩-|1⟩)/√2. Applying H twice returns the qubit to its original state: HH = I.',
        question: 'What happens when you apply the Hadamard gate twice?',
        answers: ['Double superposition', 'Qubit returns to original state', 'Qubit is destroyed', 'State becomes random'],
        correct: 1,
        hint: 'H is its own inverse.',
        demoType: 'superposition'
      }
    ]
  },
  {
    unit: 4, title: 'Quantum Circuits', icon: '🔌',
    lessons: [
      {
        id: 'u4l1', title: 'Reading Circuits', icon: '📋',
        explanation: 'Quantum circuits are read left to right. Each horizontal line represents a qubit. Gates are applied in order from left to right. The circuit starts with qubit initialization and ends with measurement. Multi-qubit gates are shown as vertical connections between qubit lines.',
        question: 'In which direction are quantum circuits read?',
        answers: ['Right to left', 'Top to bottom', 'Left to right', 'Bottom to top'],
        correct: 2,
        hint: 'Like reading text in English.',
        demoType: null
      },
      {
        id: 'u4l2', title: 'Applying Gates', icon: '⚙️',
        explanation: 'When we apply a gate to a qubit, we multiply the gate\'s matrix by the qubit\'s state vector. For example, applying X to |0⟩: X|0⟩ = [[0,1],[1,0]]·[1,0]ᵀ = [0,1]ᵀ = |1⟩. Multiple gates are applied sequentially by matrix multiplication.',
        question: 'How do we mathematically apply a gate to a qubit?',
        answers: ['Addition', 'Matrix multiplication', 'Division', 'Subtraction'],
        correct: 1,
        hint: 'Gates are represented as matrices.',
        demoType: null
      },
      {
        id: 'u4l3', title: 'Circuit Depth', icon: '📐',
        explanation: 'Circuit depth is the longest path of sequential gates in a circuit. It determines how long a quantum computation takes. Minimizing circuit depth is crucial because qubits lose their quantum properties (decohere) over time. Parallel gates on different qubits don\'t increase depth.',
        question: 'Why is minimizing circuit depth important?',
        answers: ['To save electricity', 'Because qubits decohere over time', 'For aesthetics', 'It isn\'t important'],
        correct: 1,
        hint: 'Qubits are fragile quantum objects.',
        demoType: null
      },
      {
        id: 'u4l4', title: 'Build Your First Circuit', icon: '🏗️', milestone: true,
        explanation: 'Time to build! A simple circuit: start with |0⟩, apply Hadamard (H) to create superposition, then apply X to flip, then H again, and finally measure. Each step transforms the quantum state in a specific way.',
        question: 'In the circuit |0⟩ → H → X → H → Measure, what is the first gate applied?',
        answers: ['X', 'Measure', 'H (Hadamard)', 'CNOT'],
        correct: 2,
        hint: 'Reading left to right, the first gate after initialization.',
        demoType: 'circuit'
      }
    ]
  },
  {
    unit: 5, title: 'Entanglement', icon: '🔗',
    lessons: [
      {
        id: 'u5l1', title: 'What is Entanglement?', icon: '🤝',
        explanation: 'Quantum entanglement is a phenomenon where two or more qubits become correlated in such a way that the quantum state of each qubit cannot be described independently. Measuring one qubit instantly determines the state of its entangled partner, regardless of distance.',
        question: 'What happens when you measure one qubit in an entangled pair?',
        answers: ['Nothing to the other', 'The other\'s state is instantly determined', 'Both qubits are destroyed', 'The entanglement strengthens'],
        correct: 1,
        hint: 'Einstein called this "spooky action at a distance."',
        demoType: null
      },
      {
        id: 'u5l2', title: 'Bell States', icon: '🔔',
        explanation: 'Bell states are the four maximally entangled two-qubit states. The most famous is |Φ+⟩ = (|00⟩ + |11⟩)/√2. To create a Bell state, apply H to the first qubit, then CNOT with the first as control and second as target.',
        question: 'How many Bell states exist?',
        answers: ['2', '4', '8', '1'],
        correct: 1,
        hint: 'Named after physicist John Bell.',
        demoType: null
      },
      {
        id: 'u5l3', title: 'Correlated Qubits', icon: '🧲',
        explanation: 'In the Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2, if you measure the first qubit and get |0⟩, the second qubit will also be |0⟩ with 100% certainty. Similarly, measuring |1⟩ on the first guarantees |1⟩ on the second. The outcomes are perfectly correlated.',
        question: 'In |Φ+⟩, if qubit 1 is measured as |1⟩, what is qubit 2?',
        answers: ['|0⟩', '|1⟩', 'Random', 'Superposition'],
        correct: 1,
        hint: 'The qubits always agree in this Bell state.',
        demoType: null
      },
      {
        id: 'u5l4', title: 'Entanglement Challenge', icon: '🏆', milestone: true,
        explanation: 'Entanglement is a key resource in quantum computing. It enables quantum teleportation, superdense coding, and is essential for quantum error correction. Without entanglement, quantum computers would offer no advantage over classical ones for many tasks.',
        question: 'Which of these is NOT enabled by entanglement?',
        answers: ['Quantum teleportation', 'Superdense coding', 'Classical bit flipping', 'Quantum error correction'],
        correct: 2,
        hint: 'One of these is purely classical.',
        demoType: null
      }
    ]
  },
  {
    unit: 6, title: 'Interference', icon: '〰️',
    lessons: [
      {
        id: 'u6l1', title: 'Quantum Interference', icon: '🌊',
        explanation: 'Quantum interference occurs when probability amplitudes combine. Like waves in water, quantum amplitudes can add together (constructive) or cancel out (destructive). This is crucial for quantum algorithms — we amplify correct answers and suppress wrong ones.',
        question: 'What is quantum interference analogous to?',
        answers: ['Electric current', 'Wave interference', 'Gravity', 'Magnetism'],
        correct: 1,
        hint: 'Think about waves in a pond.',
        demoType: null
      },
      {
        id: 'u6l2', title: 'Constructive Interference', icon: '📈',
        explanation: 'Constructive interference happens when amplitudes add together, increasing the probability of a particular outcome. In quantum algorithms, we engineer circuits so that the amplitudes for correct answers constructively interfere, making them more likely to be measured.',
        question: 'What does constructive interference do to probability?',
        answers: ['Decreases it', 'Increases it', 'No effect', 'Makes it negative'],
        correct: 1,
        hint: 'Amplitudes reinforce each other.',
        demoType: null
      },
      {
        id: 'u6l3', title: 'Destructive Interference', icon: '📉',
        explanation: 'Destructive interference occurs when amplitudes cancel each other out. This reduces the probability of measuring incorrect answers. By combining constructive and destructive interference, quantum algorithms can efficiently find solutions.',
        question: 'What happens when two amplitudes of equal magnitude but opposite sign combine?',
        answers: ['They double', 'They cancel to zero', 'They become complex', 'Nothing'],
        correct: 1,
        hint: '+A and -A sum to zero.',
        demoType: null
      },
      {
        id: 'u6l4', title: 'Interference Challenge', icon: '🎖️', milestone: true,
        explanation: 'The double-slit experiment beautifully demonstrates quantum interference. A single quantum particle passing through two slits creates an interference pattern, showing it traveled through both paths simultaneously. This pattern disappears if you try to observe which slit it passes through.',
        question: 'What happens to the interference pattern if you observe which slit a particle passes through?',
        answers: ['It gets stronger', 'It disappears', 'It moves', 'Nothing changes'],
        correct: 1,
        hint: 'Observation affects quantum systems.',
        demoType: null
      }
    ]
  },
  {
    unit: 7, title: 'Quantum Algorithms', icon: '🧮',
    lessons: [
      {
        id: 'u7l1', title: 'Why Quantum Algorithms?', icon: '🚀',
        explanation: 'Quantum algorithms can solve certain problems exponentially faster than the best known classical algorithms. This "quantum advantage" comes from exploiting superposition, entanglement, and interference. Not all problems benefit — quantum computers are not universally faster.',
        question: 'Are quantum computers faster than classical computers for ALL problems?',
        answers: ['Yes, always', 'No, only for certain problems', 'Only for math', 'They are slower'],
        correct: 1,
        hint: 'Quantum advantage is problem-specific.',
        demoType: null
      },
      {
        id: 'u7l2', title: 'Deutsch Algorithm', icon: '🔍',
        explanation: 'The Deutsch algorithm was the first to demonstrate quantum advantage. Given a function f(x) that maps one bit to one bit, it determines whether f is constant (f(0)=f(1)) or balanced (f(0)≠f(1)) with just ONE query, while classically you need TWO.',
        question: 'How many queries does the Deutsch algorithm need?',
        answers: ['0', '1', '2', '4'],
        correct: 1,
        hint: 'This is the quantum advantage — fewer queries needed.',
        demoType: null
      },
      {
        id: 'u7l3', title: "Grover's Algorithm", icon: '🔎',
        explanation: "Grover's algorithm provides a quadratic speedup for unstructured search problems. To find a specific item in an unsorted list of N items, a classical computer needs O(N) queries, while Grover's algorithm needs only O(√N). It uses amplitude amplification.",
        question: "What speedup does Grover's algorithm provide?",
        answers: ['Linear', 'Quadratic', 'Exponential', 'Cubic'],
        correct: 1,
        hint: 'O(N) becomes O(√N).',
        demoType: null
      },
      {
        id: 'u7l4', title: 'Search Challenge', icon: '🏅', milestone: true,
        explanation: "Grover's algorithm works by repeatedly applying two operations: an oracle that marks the target state, and a diffusion operator that amplifies the marked state's amplitude. After about √N iterations, the target state has near-100% probability of being measured.",
        question: "How many times should Grover's algorithm iterate for N items?",
        answers: ['N times', 'N² times', '√N times', 'log(N) times'],
        correct: 2,
        hint: 'The number of iterations matches the speedup factor.',
        demoType: null
      }
    ]
  },
  {
    unit: 8, title: 'Quantum Programming', icon: '💻',
    lessons: [
      {
        id: 'u8l1', title: 'Quantum Programming Concepts', icon: '📝',
        explanation: 'Quantum programming involves designing quantum circuits using high-level languages and SDKs. Programs define qubit allocations, gate applications, and measurements. The paradigm is different from classical programming — you think in terms of quantum states and transformations.',
        question: 'What is the fundamental building block of quantum programs?',
        answers: ['Loops', 'Quantum circuits', 'Variables', 'Functions'],
        correct: 1,
        hint: 'Programs are expressed as sequences of gates on qubits.',
        demoType: null
      },
      {
        id: 'u8l2', title: 'Quantum SDKs', icon: '📦',
        explanation: 'Several quantum computing SDKs exist: Qiskit (IBM), Cirq (Google), PennyLane (Xanadu), and Q# (Microsoft). These provide tools to create circuits, simulate them, and run them on real quantum hardware. Most support Python and provide visualization tools.',
        question: 'Which company developed Qiskit?',
        answers: ['Google', 'IBM', 'Microsoft', 'Amazon'],
        correct: 1,
        hint: 'This company also has cloud quantum hardware.',
        demoType: null
      },
      {
        id: 'u8l3', title: 'Build a Circuit', icon: '🔨',
        explanation: 'A typical quantum program: 1) Initialize qubits in |0⟩ state, 2) Apply quantum gates to create the desired computation, 3) Measure the qubits, 4) Interpret results. Most programs run multiple times ("shots") to build up probability distributions.',
        question: 'Why do quantum programs run multiple times (shots)?',
        answers: ['For fun', 'To build probability distributions', 'Because they fail often', 'To warm up the computer'],
        correct: 1,
        hint: 'Quantum measurements are probabilistic.',
        demoType: 'circuit'
      },
      {
        id: 'u8l4', title: 'Run a Quantum Program', icon: '▶️', milestone: true,
        explanation: 'Running a quantum program involves compiling your high-level circuit into hardware-native gates, optimizing the circuit, and executing it on either a simulator or real quantum hardware. Results are typically returned as a dictionary of measurement outcomes and their counts.',
        question: 'What is the process of converting high-level circuits to hardware gates called?',
        answers: ['Simulation', 'Compilation/Transpilation', 'Measurement', 'Entanglement'],
        correct: 1,
        hint: 'Similar to classical code compilation.',
        demoType: null
      }
    ]
  },
  {
    unit: 9, title: 'Advanced Quantum Computing', icon: '🧬',
    lessons: [
      {
        id: 'u9l1', title: 'Quantum Fourier Transform', icon: '🎵',
        explanation: "The Quantum Fourier Transform (QFT) is the quantum analog of the discrete Fourier transform. It transforms quantum amplitudes from the computational basis to the frequency basis. QFT is exponentially faster than the classical FFT and is a key component of many quantum algorithms, including Shor's algorithm.",
        question: 'What classical algorithm is QFT analogous to?',
        answers: ['Binary Search', 'Fast Fourier Transform', 'Bubble Sort', 'Dijkstra\'s'],
        correct: 1,
        hint: 'Both transform data to the frequency domain.',
        demoType: null
      },
      {
        id: 'u9l2', title: 'Phase Estimation', icon: '🎯',
        explanation: 'Quantum Phase Estimation (QPE) is an algorithm that estimates the eigenvalue (phase) of a unitary operator. Given U|ψ⟩ = e^(2πiθ)|ψ⟩, QPE finds θ. It uses the QFT and is crucial for many quantum algorithms, including factoring and quantum simulation.',
        question: 'What does QPE estimate?',
        answers: ['Qubit count', 'Eigenvalue phase of a unitary operator', 'Circuit depth', 'Entanglement degree'],
        correct: 1,
        hint: 'The "P" stands for Phase.',
        demoType: null
      },
      {
        id: 'u9l3', title: 'Quantum Error Correction', icon: '🛡️',
        explanation: 'Quantum error correction (QEC) protects quantum information from errors caused by decoherence and noise. Unlike classical error correction, QEC must handle both bit-flip and phase-flip errors without measuring (and destroying) the quantum state. It encodes logical qubits across multiple physical qubits.',
        question: 'What types of errors must quantum error correction handle?',
        answers: ['Only bit flips', 'Only phase flips', 'Both bit and phase flips', 'No errors exist in quantum computing'],
        correct: 2,
        hint: 'Quantum systems have more ways to go wrong than classical ones.',
        demoType: null
      },
      {
        id: 'u9l4', title: 'Noise and Decoherence', icon: '🌫️', milestone: true,
        explanation: 'Decoherence is the process by which quantum systems lose their quantum properties through interaction with the environment. This is the main challenge in building practical quantum computers. Coherence time — how long a qubit maintains its quantum state — is a key metric for quantum hardware.',
        question: 'What is the main challenge in building practical quantum computers?',
        answers: ['Cost', 'Size', 'Decoherence', 'Programming difficulty'],
        correct: 2,
        hint: 'Qubits are extremely sensitive to their environment.',
        demoType: null
      }
    ]
  },
  {
    unit: 10, title: 'Quantum Mastery', icon: '👑',
    lessons: [
      {
        id: 'u10l1', title: "Shor's Algorithm", icon: '🔐',
        explanation: "Shor's algorithm can factor large integers exponentially faster than any known classical algorithm. This has profound implications for cryptography, as RSA encryption relies on the difficulty of factoring. It uses the QFT and modular exponentiation.",
        question: "What problem does Shor's algorithm solve efficiently?",
        answers: ['Sorting', 'Searching', 'Integer factoring', 'Graph coloring'],
        correct: 2,
        hint: 'This threatens current encryption methods.',
        demoType: null
      },
      {
        id: 'u10l2', title: 'Quantum Cryptography', icon: '🔑',
        explanation: 'Quantum Key Distribution (QKD) uses quantum mechanics to create provably secure encryption keys. The BB84 protocol, for example, uses the no-cloning theorem: any eavesdropping attempt disturbs the quantum states and is detectable.',
        question: 'What quantum principle makes eavesdropping detectable in QKD?',
        answers: ['Superposition', 'Entanglement', 'No-cloning theorem', 'Interference'],
        correct: 2,
        hint: 'You cannot perfectly copy an unknown quantum state.',
        demoType: null
      },
      {
        id: 'u10l3', title: 'Variational Algorithms', icon: '📈',
        explanation: 'Variational Quantum Eigensolver (VQE) and QAOA are hybrid classical-quantum algorithms. They use a parameterized quantum circuit optimized by a classical computer. These are promising for near-term quantum devices and applications in chemistry, optimization, and machine learning.',
        question: 'What makes variational algorithms "hybrid"?',
        answers: ['They use two qubits', 'They combine classical and quantum processing', 'They run on two computers', 'They use two programming languages'],
        correct: 1,
        hint: 'Think about which parts are classical and which are quantum.',
        demoType: null
      },
      {
        id: 'u10l4', title: 'Final Quantum Challenge', icon: '🌟', milestone: true,
        explanation: 'You\'ve completed the entire Quantum Computing course! You now understand qubits, gates, circuits, entanglement, interference, algorithms, and advanced topics. The quantum computing revolution is just beginning, and you\'re ready to be part of it.',
        question: 'Which of these is a near-term quantum computing application?',
        answers: ['Time travel', 'Drug discovery via molecular simulation', 'Teleporting humans', 'Infinite energy'],
        correct: 1,
        hint: 'Simulating molecules is one of the most promising applications.',
        demoType: null
      }
    ]
  }
];

const ACHIEVEMENTS = [
  { id: 'first_qubit', name: 'First Qubit', icon: '🏆', desc: 'Complete Unit 1', condition: (s) => s.completedUnits.includes(0) },
  { id: 'gate_explorer', name: 'Gate Explorer', icon: '⚛️', desc: 'Complete Unit 3 (Quantum Gates)', condition: (s) => s.completedUnits.includes(2) },
  { id: 'entangled', name: 'Entangled', icon: '🔗', desc: 'Complete Unit 5 (Entanglement)', condition: (s) => s.completedUnits.includes(4) },
  { id: 'quantum_thinker', name: 'Quantum Thinker', icon: '🧠', desc: 'Complete 10 lessons', condition: (s) => s.completedLessons.length >= 10 },
  { id: 'streak_7', name: 'Streak Master', icon: '🔥', desc: 'Reach a 7-day streak', condition: (s) => s.streak >= 7 },
  { id: 'xp_500', name: 'XP Hunter', icon: '⚡', desc: 'Earn 500 total XP', condition: (s) => s.xp >= 500 },
  { id: 'circuit_builder', name: 'Circuit Builder', icon: '🔌', desc: 'Complete Unit 4 (Circuits)', condition: (s) => s.completedUnits.includes(3) },
  { id: 'algorithm_ace', name: 'Algorithm Ace', icon: '🧮', desc: 'Complete Unit 7 (Algorithms)', condition: (s) => s.completedUnits.includes(6) },
  { id: 'quantum_master', name: 'Quantum Master', icon: '🌌', desc: 'Complete all 10 units', condition: (s) => s.completedUnits.length >= 10 },
  { id: 'perfect_circuit', name: 'Perfect Circuit', icon: '💫', desc: 'Complete 5 lessons without mistakes', condition: (s) => s.perfectLessons >= 5 },
  { id: 'gem_collector', name: 'Gem Collector', icon: '💎', desc: 'Collect 500 Quantum Gems', condition: (s) => s.gems >= 500 },
  { id: 'dedicated', name: 'Dedicated Learner', icon: '📖', desc: 'Complete 20 lessons', condition: (s) => s.completedLessons.length >= 20 },
];

const LEVELS = [
  { name: 'Quantum Beginner', xp: 100 },
  { name: 'Qubit Explorer', xp: 250 },
  { name: 'Circuit Builder', xp: 500 },
  { name: 'Quantum Navigator', xp: 800 },
  { name: 'Algorithm Apprentice', xp: 1200 },
  { name: 'Quantum Engineer', xp: 1800 },
  { name: 'Quantum Researcher', xp: 2500 },
  { name: 'Quantum Master', xp: 3500 },
];

const LEADERBOARD_DATA = [
  { name: 'QuantumNinja', xp: 1275, avatar: '🥷', league: 'Diamond' },
  { name: 'QubitMaster', xp: 912, avatar: '🧑‍🔬', league: 'Diamond', self: true },
  { name: 'EntangleMe', xp: 515, avatar: '🧑‍💻', league: 'Gold' },
  { name: 'Superposition', xp: 511, avatar: '👩‍🔬', league: 'Gold' },
  { name: 'QuantumLearner', xp: 496, avatar: '🧑‍🎓', league: 'Gold' },
  { name: 'WaveFn', xp: 423, avatar: '🌊', league: 'Silver' },
  { name: 'BlochSphere', xp: 389, avatar: '🌐', league: 'Silver' },
  { name: 'GateKeeper', xp: 301, avatar: '🚪', league: 'Silver' },
  { name: 'PhaseShift', xp: 255, avatar: '🔄', league: 'Bronze' },
  { name: 'QubitJunior', xp: 198, avatar: '🐣', league: 'Bronze' },
];

const AVATAR_OPTIONS = {
  face: ['🧑‍🔬', '👩‍🔬', '👨‍🔬', '🧑‍💻', '👩‍💻', '👨‍💻', '🧑‍🎓', '🧙'],
  hair: ['💇', '💇‍♀️', '💇‍♂️', '👱', '👱‍♀️', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳'],
  outfit: ['🥼', '👔', '👕', '🧥', '🦺', '👗', '🥻', '🧑‍🚀'],
  aura: ['🟣', '🔵', '🟢', '🔴', '🟡', '⚪', '🌈', '✨'],
  accessory: ['🎓', '🕶️', '👓', '🎩', '👑', '🎧', '⌚', '💍'],
  companion: ['⚛️', '🌀', '✨', '💫', '🌟', '🔮', '🧿', '🪐']
};

const CHEST_TYPES = [
  { id: 'common', name: 'Common Quantum Chest', emoji: '📦', color: '#94A3B8', rewards: ['💎 10 Gems', '⚡ 5 XP Boost'] },
  { id: 'rare', name: 'Rare Quantum Chest', emoji: '🎁', color: '#8B5CF6', rewards: ['💎 50 Gems', '🛡️ Streak Protection', '⚡ 25 XP Boost'] },
  { id: 'epic', name: 'Epic Quantum Chest', emoji: '👑', color: '#D946EF', rewards: ['💎 100 Gems', '🎨 Qubi Skin', '⚡ 50 XP Boost'] },
  { id: 'legendary', name: 'Legendary Quantum Chest', emoji: '🌟', color: '#FFC83D', rewards: ['💎 250 Gems', '🏅 Rare Badge', '🎨 Exclusive Qubi Skin', '⚡ 100 XP Boost'] },
];

const QUBI_MESSAGES = {
  welcome: "Welcome to QubitQuest! Let's explore quantum computing! ✨",
  correct: ["Great job! 🎉", "Quantum genius! ⚛️", "Perfect! You're on fire! 🔥", "Excellent work! 🌟"],
  wrong: ["Not quite — try again! 💪", "Almost! Think quantum! 🤔", "Don't worry, learning is a journey! 🌊"],
  hint: "Need a hint? Tap me! 💡",
  celebrate: "You did it! Amazing! 🎊",
  streak: "Keep that streak going! 🔥",
  idle: ["Ready to learn? ⚛️", "Let's explore qubits! 🌀", "Quantum awaits! ✨"]
};

// ---- Default State ----
const DEFAULT_STATE = {
  xp: 912,
  gems: 711,
  streak: 6,
  bestStreak: 12,
  completedLessons: ['u1l1', 'u1l2', 'u1l3'],
  completedUnits: [],
  unlockedAchievements: ['xp_500', 'gem_collector'],
  questProgress: {
    lessonsToday: 1,
    correctAnswers: 2,
    xpToday: 40,
    perfectLessons: 0
  },
  monthlyXP: 360,
  theme: 'dark',
  sound: true,
  animations: 'full',
  notifications: true,
  highContrast: false,
  reducedMotion: false,
  avatar: '🧑‍🔬',
  avatarSelections: { face: '🧑‍🔬', hair: '💇', outfit: '🥼', aura: '🟣', accessory: '🎓', companion: '⚛️' },
  perfectLessons: 2,
  chestsOpened: [],
  chestAvailable: ['common', 'rare'],
  streakDays: [21, 22, 23, 24, 25, 26] // days of month with streak
};

// ---- State Management ----
let state;
function loadState() {
  try {
    const saved = localStorage.getItem('qubitquest_state');
    if (saved) {
      state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } else {
      state = { ...DEFAULT_STATE };
    }
  } catch {
    state = { ...DEFAULT_STATE };
  }
}
function saveState() {
  localStorage.setItem('qubitquest_state', JSON.stringify(state));
}

// ---- Navigation ----
let currentScreen = 'home';
let currentLessonData = null;
let currentLessonStep = 0; // 0=intro, 1=question, 2=feedback
let lessonMistakes = 0;

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) {
    el.classList.add('active');
    currentScreen = screen;
  }
  // Update nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen);
  });
  // Show/hide topbar and nav for lesson/demo/chest screens
  const immersiveScreens = ['lesson', 'demo', 'unit-complete', 'chest'];
  const topbar = document.getElementById('top-bar');
  const nav = document.getElementById('bottom-nav');
  if (immersiveScreens.includes(screen)) {
    topbar.style.display = 'none';
    nav.style.display = 'none';
  } else {
    topbar.style.display = '';
    nav.style.display = '';
  }
  // Refresh screen content
  if (screen === 'home') renderLearningPath();
  if (screen === 'leaderboard') renderLeaderboard();
  if (screen === 'quests') renderQuests();
  if (screen === 'rewards') { renderAchievements(); renderChests(); }
  if (screen === 'profile') renderProfile();
  if (screen === 'streak') renderStreak();
  if (screen === 'settings') renderSettings();
  if (screen === 'avatar') renderAvatarCustomizer();
  if (screen === 'courses') renderCourses();

  updateTopBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Level Calculation ----
function getLevel() {
  let lvl = 0;
  let totalXPForNext = LEVELS[0].xp;
  let xpInLevel = state.xp;
  for (let i = 0; i < LEVELS.length; i++) {
    if (state.xp >= LEVELS[i].xp) {
      lvl = i + 1;
      xpInLevel = state.xp - LEVELS[i].xp;
      totalXPForNext = (i + 1 < LEVELS.length) ? LEVELS[i + 1].xp - LEVELS[i].xp : 1000;
    } else {
      xpInLevel = (i === 0) ? state.xp : state.xp - LEVELS[i - 1].xp;
      totalXPForNext = (i === 0) ? LEVELS[0].xp : LEVELS[i].xp - LEVELS[i - 1].xp;
      break;
    }
  }
  const levelNum = Math.min(lvl + 1, LEVELS.length);
  const levelName = lvl < LEVELS.length ? LEVELS[lvl].name : LEVELS[LEVELS.length - 1].name;
  return { level: levelNum, name: levelName, xpInLevel, xpNeeded: totalXPForNext };
}

// ---- Top Bar Update ----
function updateTopBar() {
  document.getElementById('stat-streak').textContent = state.streak;
  document.getElementById('stat-xp').textContent = state.xp;
  document.getElementById('stat-gems').textContent = state.gems;
  // Update rank based on leaderboard
  const sortedLB = [...LEADERBOARD_DATA].map(p => ({ ...p, xp: p.self ? state.xp : p.xp }));
  sortedLB.sort((a, b) => b.xp - a.xp);
  const rank = sortedLB.findIndex(p => p.self) + 1;
  document.getElementById('stat-rank').textContent = '#' + rank;
  // Level card
  const lv = getLevel();
  document.getElementById('level-badge').textContent = lv.level;
  document.getElementById('level-name').textContent = lv.name;
  const pct = Math.min(100, (lv.xpInLevel / lv.xpNeeded) * 100);
  document.getElementById('level-progress-fill').style.width = pct + '%';
  document.getElementById('level-xp-text').textContent = lv.xpInLevel + ' / ' + lv.xpNeeded + ' XP';
  // Avatar
  document.getElementById('topbar-avatar').querySelector('span').textContent = state.avatar;
}

// ---- Learning Path ----
function renderLearningPath() {
  const container = document.getElementById('learning-path');
  container.innerHTML = '';

  let allLessonIndex = 0;
  COURSE_DATA.forEach((unit, ui) => {
    const unitSection = document.createElement('div');
    unitSection.className = 'unit-section';

    // Unit header
    const header = document.createElement('div');
    header.className = 'unit-header';
    header.innerHTML = `<h2>UNIT ${unit.unit}</h2><h3>${unit.icon} ${unit.title}</h3>`;
    unitSection.appendChild(header);

    // Nodes
    const nodesContainer = document.createElement('div');
    nodesContainer.className = 'path-nodes';

    unit.lessons.forEach((lesson, li) => {
      const node = document.createElement('button');
      const isCompleted = state.completedLessons.includes(lesson.id);
      const prevLesson = li > 0 ? unit.lessons[li - 1] : (ui > 0 ? COURSE_DATA[ui - 1].lessons[COURSE_DATA[ui - 1].lessons.length - 1] : null);
      const isPrevCompleted = prevLesson ? state.completedLessons.includes(prevLesson.id) : true;
      const isCurrent = !isCompleted && isPrevCompleted;
      const isLocked = !isCompleted && !isCurrent;
      const isFirst = ui === 0 && li === 0 && !isCompleted;

      node.className = 'lesson-node';
      if (isCompleted) node.classList.add('completed');
      else if (isFirst) node.classList.add('start-here', 'current');
      else if (isCurrent) node.classList.add('current');
      else if (isLocked) node.classList.add('locked');
      if (lesson.milestone) node.classList.add('milestone');

      node.innerHTML = `<span>${lesson.icon}</span><span class="node-label">${lesson.title.split(' ').slice(0, 2).join(' ')}</span>`;

      if (!isLocked) {
        node.addEventListener('click', () => startLesson(ui, li));
      } else {
        node.addEventListener('click', () => {
          showQubiMessage("Complete previous lessons first! 🔒");
        });
      }

      nodesContainer.appendChild(node);
      allLessonIndex++;
    });

    unitSection.appendChild(nodesContainer);
    container.appendChild(unitSection);
  });
}

// ---- Lesson System ----
function startLesson(unitIdx, lessonIdx) {
  const unit = COURSE_DATA[unitIdx];
  const lesson = unit.lessons[lessonIdx];
  currentLessonData = { unitIdx, lessonIdx, lesson, unit };
  currentLessonStep = 0;
  lessonMistakes = 0;
  showScreen('lesson');
  renderLessonContent();
}

function renderLessonContent() {
  const { lesson, unitIdx, lessonIdx, unit } = currentLessonData;
  const container = document.getElementById('lesson-content');
  const totalSteps = lesson.demoType ? 4 : 3;
  const progressPct = ((currentLessonStep + 1) / totalSteps) * 100;
  document.getElementById('lesson-progress-fill').style.width = progressPct + '%';

  if (currentLessonStep === 0) {
    // Intro / Explanation
    container.innerHTML = `
      <div class="lesson-card">
        <div class="lesson-illustration">${lesson.icon}</div>
        <h2>${lesson.title}</h2>
        <div class="lesson-explanation">${lesson.explanation}</div>
        <div class="lesson-continue-area">
          <button class="btn-primary btn-3d" id="btn-lesson-continue">CONTINUE</button>
        </div>
      </div>
    `;
    document.getElementById('btn-lesson-continue').addEventListener('click', () => {
      if (lesson.demoType) {
        currentLessonStep = 1;
        renderLessonDemo();
      } else {
        currentLessonStep = 1;
        renderLessonQuestion();
      }
    });
  }
}

function renderLessonQuestion() {
  const { lesson } = currentLessonData;
  const container = document.getElementById('lesson-content');
  container.innerHTML = `
    <div class="lesson-card">
      <div class="lesson-illustration">${lesson.icon}</div>
      <p class="lesson-question">${lesson.question}</p>
      <div class="answer-options">
        ${lesson.answers.map((a, i) => `<button class="answer-btn" data-idx="${i}">${String.fromCharCode(65 + i)}. ${a}</button>`).join('')}
      </div>
      <div id="lesson-feedback-area"></div>
      <div class="lesson-continue-area">
        <button class="btn-primary btn-3d hidden" id="btn-lesson-next">CONTINUE</button>
      </div>
    </div>
  `;

  const answerBtns = container.querySelectorAll('.answer-btn');
  answerBtns.forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), answerBtns));
  });
}

function handleAnswer(idx, allBtns) {
  const { lesson } = currentLessonData;
  const feedbackArea = document.getElementById('lesson-feedback-area');
  const nextBtn = document.getElementById('btn-lesson-next');

  if (idx === lesson.correct) {
    // Correct!
    allBtns.forEach(b => b.disabled = true);
    allBtns[idx].classList.add('correct');
    feedbackArea.innerHTML = `<div class="lesson-feedback correct-feedback">✅ Correct! Well done!</div>`;
    nextBtn.classList.remove('hidden');

    // Award XP
    addXP(5, 'Correct answer');
    state.questProgress.correctAnswers++;
    saveState();

    showQubiMessage(QUBI_MESSAGES.correct[Math.floor(Math.random() * QUBI_MESSAGES.correct.length)]);

    nextBtn.addEventListener('click', () => completeLesson());
  } else {
    // Wrong
    lessonMistakes++;
    allBtns[idx].classList.add('wrong');
    allBtns[idx].disabled = true;
    feedbackArea.innerHTML = `<div class="lesson-feedback wrong-feedback">❌ Not quite. ${lesson.hint} Try again!</div>`;
    showQubiMessage(QUBI_MESSAGES.wrong[Math.floor(Math.random() * QUBI_MESSAGES.wrong.length)]);
  }
}

function renderLessonDemo() {
  const { lesson } = currentLessonData;
  const container = document.getElementById('lesson-content');

  if (lesson.demoType === 'superposition') {
    container.innerHTML = `
      <div class="demo-container">
        <h2>Superposition Demo</h2>
        <p>This qubit starts in the |0⟩ state. Apply the Hadamard gate to put it into superposition!</p>
        <div class="qubit-demo-sphere state-zero" id="demo-sphere">|0⟩</div>
        <p class="qubit-state-label" id="demo-state-label">State: |0⟩</p>
        <div class="prob-bars">
          <div class="prob-bar-item">
            <div class="prob-bar-track">
              <div class="prob-bar-fill bar-zero" id="prob-zero" style="height:100%"></div>
            </div>
            <div class="prob-bar-label">|0⟩</div>
          </div>
          <div class="prob-bar-item">
            <div class="prob-bar-track">
              <div class="prob-bar-fill bar-one" id="prob-one" style="height:0%"></div>
            </div>
            <div class="prob-bar-label">|1⟩</div>
          </div>
        </div>
        <div class="demo-btn-row">
          <button class="btn-primary btn-3d" id="btn-hadamard" style="font-size:0.85rem;padding:12px 20px">APPLY HADAMARD</button>
          <button class="btn-secondary" id="btn-measure" style="font-size:0.85rem;padding:12px 20px">MEASURE</button>
        </div>
        <div class="lesson-continue-area" style="margin-top:16px">
          <button class="btn-primary btn-3d" id="btn-demo-continue">CONTINUE TO QUESTION</button>
        </div>
      </div>
    `;

    let demoState = 'zero'; // zero, super, collapsed
    const sphere = document.getElementById('demo-sphere');
    const stateLabel = document.getElementById('demo-state-label');
    const probZero = document.getElementById('prob-zero');
    const probOne = document.getElementById('prob-one');

    document.getElementById('btn-hadamard').addEventListener('click', () => {
      if (demoState === 'zero' || demoState === 'collapsed') {
        demoState = 'super';
        sphere.className = 'qubit-demo-sphere state-super';
        sphere.textContent = '|0⟩+|1⟩';
        stateLabel.textContent = 'State: (|0⟩ + |1⟩) / √2';
        probZero.style.height = '50%';
        probOne.style.height = '50%';
        showQubiMessage("The qubit is now in superposition! ✨");
      } else {
        demoState = 'zero';
        sphere.className = 'qubit-demo-sphere state-zero';
        sphere.textContent = '|0⟩';
        stateLabel.textContent = 'State: |0⟩';
        probZero.style.height = '100%';
        probOne.style.height = '0%';
      }
    });

    document.getElementById('btn-measure').addEventListener('click', () => {
      if (demoState === 'super') {
        const result = Math.random() < 0.5 ? 0 : 1;
        demoState = 'collapsed';
        if (result === 0) {
          sphere.className = 'qubit-demo-sphere state-zero';
          sphere.textContent = '|0⟩';
          stateLabel.textContent = 'Measured: |0⟩ — State collapsed!';
          probZero.style.height = '100%';
          probOne.style.height = '0%';
        } else {
          sphere.className = 'qubit-demo-sphere state-one';
          sphere.textContent = '|1⟩';
          stateLabel.textContent = 'Measured: |1⟩ — State collapsed!';
          probZero.style.height = '0%';
          probOne.style.height = '100%';
        }
        showQubiMessage("The qubit collapsed! That's quantum measurement! 🔬");
      } else {
        showQubiMessage("Put the qubit in superposition first! 🌀");
      }
    });

    document.getElementById('btn-demo-continue').addEventListener('click', () => {
      currentLessonStep = 2;
      renderLessonQuestion();
    });

  } else if (lesson.demoType === 'measurement') {
    container.innerHTML = `
      <div class="demo-container">
        <h2>Measurement Demo</h2>
        <p>Observe how measurement collapses a quantum state. The qubit starts in superposition.</p>
        <div class="qubit-demo-sphere state-super" id="demo-sphere2">|0⟩+|1⟩</div>
        <p class="qubit-state-label" id="demo-state-label2">State: (|0⟩ + |1⟩) / √2</p>
        <p id="measure-count" style="color:var(--text-muted);font-size:0.85rem;margin:8px 0">Measurements: 0</p>
        <div class="prob-bars">
          <div class="prob-bar-item">
            <div class="prob-bar-track">
              <div class="prob-bar-fill bar-zero" id="prob-zero2" style="height:50%"></div>
            </div>
            <div class="prob-bar-label">|0⟩: <span id="count-zero">0</span></div>
          </div>
          <div class="prob-bar-item">
            <div class="prob-bar-track">
              <div class="prob-bar-fill bar-one" id="prob-one2" style="height:50%"></div>
            </div>
            <div class="prob-bar-label">|1⟩: <span id="count-one">0</span></div>
          </div>
        </div>
        <div class="demo-btn-row">
          <button class="btn-primary btn-3d" id="btn-measure2" style="font-size:0.85rem;padding:12px 20px">MEASURE QUBIT</button>
          <button class="btn-secondary" id="btn-reset-measure" style="font-size:0.85rem;padding:12px 20px">RESET</button>
        </div>
        <div class="lesson-continue-area" style="margin-top:16px">
          <button class="btn-primary btn-3d" id="btn-demo-continue2">CONTINUE TO QUESTION</button>
        </div>
      </div>
    `;

    let zeros = 0, ones = 0, total = 0;
    const sphere2 = document.getElementById('demo-sphere2');
    const stateLabel2 = document.getElementById('demo-state-label2');

    document.getElementById('btn-measure2').addEventListener('click', () => {
      const result = Math.random() < 0.5 ? 0 : 1;
      total++;
      if (result === 0) zeros++; else ones++;
      document.getElementById('count-zero').textContent = zeros;
      document.getElementById('count-one').textContent = ones;
      document.getElementById('measure-count').textContent = `Measurements: ${total}`;
      const pctZ = total > 0 ? (zeros / total) * 100 : 50;
      const pctO = total > 0 ? (ones / total) * 100 : 50;
      document.getElementById('prob-zero2').style.height = pctZ + '%';
      document.getElementById('prob-one2').style.height = pctO + '%';
      // Flash the sphere
      if (result === 0) {
        sphere2.className = 'qubit-demo-sphere state-zero';
        sphere2.textContent = '|0⟩';
        stateLabel2.textContent = `Measured: |0⟩ (${zeros}/${total})`;
      } else {
        sphere2.className = 'qubit-demo-sphere state-one';
        sphere2.textContent = '|1⟩';
        stateLabel2.textContent = `Measured: |1⟩ (${ones}/${total})`;
      }
      setTimeout(() => {
        sphere2.className = 'qubit-demo-sphere state-super';
        sphere2.textContent = '|0⟩+|1⟩';
        stateLabel2.textContent = `State reset to superposition (${total} measurements)`;
      }, 800);
    });

    document.getElementById('btn-reset-measure').addEventListener('click', () => {
      zeros = 0; ones = 0; total = 0;
      document.getElementById('count-zero').textContent = 0;
      document.getElementById('count-one').textContent = 0;
      document.getElementById('measure-count').textContent = 'Measurements: 0';
      document.getElementById('prob-zero2').style.height = '50%';
      document.getElementById('prob-one2').style.height = '50%';
      sphere2.className = 'qubit-demo-sphere state-super';
      sphere2.textContent = '|0⟩+|1⟩';
      stateLabel2.textContent = 'State: (|0⟩ + |1⟩) / √2';
    });

    document.getElementById('btn-demo-continue2').addEventListener('click', () => {
      currentLessonStep = 2;
      renderLessonQuestion();
    });

  } else if (lesson.demoType === 'circuit') {
    container.innerHTML = `
      <div class="demo-container">
        <h2>Quantum Circuit Builder</h2>
        <p>Build a circuit by clicking gates. Watch the qubit state evolve!</p>
        <div class="circuit-demo" id="circuit-demo">
          <span style="font-weight:800;color:var(--text-secondary)">|0⟩</span>
          <div class="circuit-wire"></div>
          <button class="circuit-gate" data-gate="H" id="gate-h">H</button>
          <div class="circuit-wire"></div>
          <button class="circuit-gate" data-gate="X" id="gate-x">X</button>
          <div class="circuit-wire"></div>
          <button class="circuit-gate" data-gate="H2" id="gate-h2">H</button>
          <div class="circuit-wire"></div>
          <span style="font-weight:800;color:var(--text-secondary)">📏</span>
        </div>
        <p class="qubit-state-label" id="circuit-state">State: |0⟩</p>
        <div class="qubit-demo-sphere state-zero" id="circuit-sphere" style="width:100px;height:100px;font-size:1.5rem">|0⟩</div>
        <div class="demo-btn-row">
          <button class="btn-secondary" id="btn-circuit-reset" style="font-size:0.85rem;padding:10px 16px">RESET CIRCUIT</button>
        </div>
        <div class="lesson-continue-area" style="margin-top:16px">
          <button class="btn-primary btn-3d" id="btn-demo-continue3">CONTINUE TO QUESTION</button>
        </div>
      </div>
    `;

    let circuitStep = 0;
    const gates = ['gate-h', 'gate-x', 'gate-h2'];
    const states = [
      { label: '|0⟩', cls: 'state-zero', text: '|0⟩' },
      { label: '(|0⟩+|1⟩)/√2', cls: 'state-super', text: '|+⟩' },
      { label: '(|1⟩+|0⟩)/√2 → flip', cls: 'state-one', text: '|-⟩' },
      { label: '|1⟩', cls: 'state-one', text: '|1⟩' },
    ];

    function updateCircuit() {
      gates.forEach((g, i) => {
        document.getElementById(g).classList.toggle('active-gate', i < circuitStep);
      });
      const s = states[circuitStep];
      document.getElementById('circuit-state').textContent = 'State: ' + s.label;
      document.getElementById('circuit-sphere').className = 'qubit-demo-sphere ' + s.cls;
      document.getElementById('circuit-sphere').textContent = s.text;
      document.getElementById('circuit-sphere').style.width = '100px';
      document.getElementById('circuit-sphere').style.height = '100px';
      document.getElementById('circuit-sphere').style.fontSize = '1.5rem';
    }

    gates.forEach((g, i) => {
      document.getElementById(g).addEventListener('click', () => {
        if (i === circuitStep && circuitStep < 3) {
          circuitStep++;
          updateCircuit();
          if (circuitStep === 3) {
            showQubiMessage("Circuit complete! You transformed |0⟩ to |1⟩! 🎉");
          }
        }
      });
    });

    document.getElementById('btn-circuit-reset').addEventListener('click', () => {
      circuitStep = 0;
      updateCircuit();
    });

    document.getElementById('btn-demo-continue3').addEventListener('click', () => {
      currentLessonStep = 2;
      renderLessonQuestion();
    });
  }
}

function completeLesson() {
  const { lesson, unitIdx, lessonIdx, unit } = currentLessonData;

  // Mark lesson as complete
  if (!state.completedLessons.includes(lesson.id)) {
    state.completedLessons.push(lesson.id);
    addXP(10, 'Lesson complete');
    state.gems += 5;
    state.questProgress.lessonsToday++;
    state.questProgress.xpToday += 10;

    if (lessonMistakes === 0) {
      addXP(20, 'Perfect lesson!');
      state.perfectLessons++;
      state.questProgress.perfectLessons++;
    }

    // Check if unit is complete
    const unitLessons = unit.lessons.map(l => l.id);
    const allDone = unitLessons.every(id => state.completedLessons.includes(id));
    if (allDone && !state.completedUnits.includes(unitIdx)) {
      state.completedUnits.push(unitIdx);
      addXP(50, 'Unit complete!');
      state.gems += 25;
      // Add a chest reward
      if (!state.chestAvailable.includes('epic')) {
        state.chestAvailable.push('epic');
      }
    }

    // Check achievements
    checkAchievements();
    saveState();

    // Show unit complete or go home
    if (allDone && state.completedUnits.includes(unitIdx)) {
      document.getElementById('celebration-title').textContent = 'Unit Complete!';
      document.getElementById('celebration-subtitle').textContent = `You've mastered ${unit.title}!`;
      showScreen('unit-complete');
      fireConfetti();
    } else {
      // Show a quick success state then return
      showScreen('home');
      showQubiMessage(QUBI_MESSAGES.celebrate);
    }
  } else {
    showScreen('home');
  }
}

// ---- XP System ----
function addXP(amount, reason) {
  state.xp += amount;
  state.questProgress.xpToday += amount;
  state.monthlyXP = Math.min(500, state.monthlyXP + amount);
  saveState();
  showXPPopup('+' + amount + ' XP');
  updateTopBar();
  // Update leaderboard
  LEADERBOARD_DATA.forEach(p => { if (p.self) p.xp = state.xp; });
}

function showXPPopup(text) {
  const popup = document.getElementById('xp-popup');
  popup.textContent = text;
  popup.classList.remove('hidden', 'animate');
  void popup.offsetWidth;
  popup.classList.add('animate');
  setTimeout(() => popup.classList.add('hidden'), 1600);
}

// ---- Achievements ----
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id) && ach.condition(state)) {
      state.unlockedAchievements.push(ach.id);
      showQubiMessage(`🏆 Achievement Unlocked: ${ach.name}!`);
    }
  });
  saveState();
}

function renderAchievements() {
  const container = document.getElementById('achievements-container');
  container.innerHTML = ACHIEVEMENTS.map(ach => {
    const unlocked = state.unlockedAchievements.includes(ach.id);
    return `
      <div class="achievement-card ${unlocked ? 'unlocked achievement-unlock-anim' : 'locked'}" data-id="${ach.id}">
        <div class="achievement-icon">${ach.icon}</div>
        <div class="achievement-name">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
      </div>
    `;
  }).join('');
}

// ---- Chests ----
function renderChests() {
  const container = document.getElementById('chests-container');
  container.innerHTML = CHEST_TYPES.map(chest => {
    const available = state.chestAvailable.includes(chest.id);
    const opened = state.chestsOpened.includes(chest.id);
    return `
      <div class="chest-card ${available ? 'chest-available' : ''} ${opened ? 'chest-opened' : ''}" data-chest="${chest.id}">
        <div class="chest-emoji">${chest.emoji}</div>
        <h4>${chest.name}</h4>
        <p>${opened ? 'Opened' : available ? 'Tap to open!' : 'Locked'}</p>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.chest-card.chest-available:not(.chest-opened)').forEach(card => {
    card.addEventListener('click', () => openChestScreen(card.dataset.chest));
  });
}

function openChestScreen(chestId) {
  const chest = CHEST_TYPES.find(c => c.id === chestId);
  if (!chest) return;
  showScreen('chest');
  document.getElementById('chest-title').textContent = chest.name;
  document.getElementById('chest-subtitle').textContent = 'Tap to open!';
  document.getElementById('chest-reward-reveal').classList.add('hidden');
  document.getElementById('btn-open-chest').classList.remove('hidden');
  document.getElementById('btn-chest-done').classList.add('hidden');
  document.getElementById('chest-box').className = 'chest-box';
  document.getElementById('chest-glow').classList.remove('active');

  document.getElementById('btn-open-chest').onclick = () => {
    const box = document.getElementById('chest-box');
    const glow = document.getElementById('chest-glow');

    // Shake
    box.classList.add('shaking');
    glow.classList.add('active');
    setTimeout(() => {
      box.classList.remove('shaking');
      box.classList.add('opening');
      // Show reward
      setTimeout(() => {
        const reward = chest.rewards[Math.floor(Math.random() * chest.rewards.length)];
        document.getElementById('chest-reward-icon').textContent = reward.split(' ')[0];
        document.getElementById('chest-reward-name').textContent = reward;
        document.getElementById('chest-reward-reveal').classList.remove('hidden');
        document.getElementById('chest-subtitle').textContent = 'You received:';
        document.getElementById('btn-open-chest').classList.add('hidden');
        document.getElementById('btn-chest-done').classList.remove('hidden');

        // Award gems
        state.gems += 25;
        state.chestsOpened.push(chestId);
        state.chestAvailable = state.chestAvailable.filter(c => c !== chestId);
        saveState();
        updateTopBar();
        fireConfetti();
      }, 700);
    }, 600);
  };

  document.getElementById('btn-chest-done').onclick = () => showScreen('rewards');
}

// ---- Quests ----
function renderQuests() {
  const quests = [
    { icon: '📖', title: 'Complete 2 lessons', current: state.questProgress.lessonsToday, target: 2 },
    { icon: '✅', title: 'Answer 5 questions correctly', current: state.questProgress.correctAnswers, target: 5 },
    { icon: '⚡', title: 'Earn 50 XP', current: state.questProgress.xpToday, target: 50 },
    { icon: '💯', title: 'Perfect 1 lesson', current: state.questProgress.perfectLessons, target: 1 },
  ];

  const container = document.getElementById('daily-quest-list');
  container.innerHTML = quests.map((q, i) => {
    const done = q.current >= q.target;
    const pct = Math.min(100, (q.current / q.target) * 100);
    return `
      <div class="quest-card ${done ? 'quest-complete' : ''}" data-quest="${i}">
        <div class="quest-icon">${q.icon}</div>
        <div class="quest-info">
          <h4>${q.title}</h4>
          <div class="quest-progress-bar"><div class="quest-progress-fill" style="width:${pct}%"></div></div>
          <span class="quest-progress-text">${Math.min(q.current, q.target)} / ${q.target}</span>
        </div>
        <button class="quest-reward-btn ${done ? 'claimable' : ''}" data-quest-idx="${i}" ${!done ? 'disabled' : ''}>
          ${done ? '🎁' : '🔒'}
        </button>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.quest-reward-btn.claimable').forEach(btn => {
    btn.addEventListener('click', () => {
      addXP(25, 'Quest reward');
      state.gems += 15;
      btn.classList.remove('claimable');
      btn.classList.add('claimed');
      btn.textContent = '✅';
      btn.disabled = true;
      saveState();
      showQubiMessage("Quest reward claimed! 🎉");
    });
  });

  // Monthly quest
  const mPct = Math.min(100, (state.monthlyXP / 500) * 100);
  document.getElementById('monthly-quest-fill').style.width = mPct + '%';
  document.getElementById('monthly-quest-text').textContent = state.monthlyXP + ' / 500 XP';
  // Update milestones
  const milestones = document.getElementById('monthly-milestones');
  if (milestones) {
    const mils = milestones.querySelectorAll('.milestone');
    const thresholds = [100, 250, 500];
    mils.forEach((m, i) => {
      if (state.monthlyXP >= thresholds[i]) {
        m.classList.add('achieved');
      } else {
        m.classList.remove('achieved');
      }
    });
  }
}

// ---- Leaderboard ----
function renderLeaderboard() {
  // Update self XP
  LEADERBOARD_DATA.forEach(p => { if (p.self) p.xp = state.xp; });
  const sorted = [...LEADERBOARD_DATA].sort((a, b) => b.xp - a.xp);

  // Podium (top 3)
  const podiumOrder = [sorted[1], sorted[0], sorted[2]]; // 2nd, 1st, 3rd
  const podiumContainer = document.getElementById('podium');
  podiumContainer.innerHTML = podiumOrder.map((p, i) => {
    const place = i === 0 ? 2 : i === 1 ? 1 : 3;
    const medal = place === 1 ? '🥇' : place === 2 ? '🥈' : '🥉';
    return `
      <div class="podium-place">
        <div class="podium-avatar">${p.avatar}</div>
        <div class="podium-name">${p.name}</div>
        <div class="podium-xp">${p.xp} XP</div>
        <div class="podium-pedestal">${medal}</div>
      </div>
    `;
  }).join('');

  // Full list
  const listContainer = document.getElementById('leaderboard-list');
  listContainer.innerHTML = sorted.map((p, i) => `
    <div class="lb-row ${p.self ? 'lb-self' : ''}">
      <div class="lb-rank">${i + 1}</div>
      <div class="lb-avatar">${p.avatar}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name} ${p.self ? '(You)' : ''}</div>
        <div class="lb-league">${p.league} League</div>
      </div>
      <div class="lb-xp">${p.xp} XP</div>
    </div>
  `).join('');
}

// ---- Streak ----
function renderStreak() {
  document.getElementById('streak-count-big').textContent = state.streak;
  document.getElementById('best-streak').textContent = state.bestStreak;

  // Calendar (current month, simplified)
  const cal = document.getElementById('streak-calendar');
  const today = new Date();
  const dayOfMonth = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  let calHTML = '';
  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  dayLabels.forEach(d => { calHTML += `<div class="streak-cal-day" style="font-weight:800;font-size:0.6rem;opacity:0.5">${d}</div>`; });
  for (let i = 0; i < firstDayOfWeek; i++) calHTML += '<div class="streak-cal-day"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const isStreak = state.streakDays.includes(d);
    const isToday = d === dayOfMonth;
    calHTML += `<div class="streak-cal-day ${isStreak ? 'streak-active' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
  }
  cal.innerHTML = calHTML;

  // Weekly dots
  const weekDots = document.getElementById('streak-week-dots');
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDayIdx = (today.getDay() + 6) % 7; // Monday = 0
  weekDots.innerHTML = dayNames.map((d, i) => {
    const done = i <= currentDayIdx && state.streakDays.includes(dayOfMonth - (currentDayIdx - i));
    return `
      <div class="week-dot">
        <div class="week-dot-circle ${done ? 'done' : ''}">${done ? '✓' : ''}</div>
        <div class="week-dot-label">${d}</div>
      </div>
    `;
  }).join('');
}

// ---- Profile ----
function renderProfile() {
  document.getElementById('profile-avatar-large').querySelector('span').textContent = state.avatar;
  document.getElementById('profile-xp').textContent = state.xp;
  document.getElementById('profile-streak').textContent = state.streak;
  document.getElementById('profile-lessons').textContent = state.completedLessons.length;
  document.getElementById('profile-gems').textContent = state.gems;
  document.getElementById('profile-achievements').textContent = state.unlockedAchievements.length;
  document.getElementById('profile-units').textContent = state.completedUnits.length;
  const lv = getLevel();
  document.getElementById('profile-level').textContent = `Level ${lv.level} · ${lv.name}`;

  const achList = document.getElementById('profile-achievements-list');
  achList.innerHTML = ACHIEVEMENTS.map(ach => {
    const earned = state.unlockedAchievements.includes(ach.id);
    return `<div class="profile-ach-badge ${earned ? 'earned' : ''}" title="${ach.name}">${ach.icon}</div>`;
  }).join('');
}

// ---- Courses ----
function renderCourses() {
  const totalLessons = COURSE_DATA.reduce((acc, u) => acc + u.lessons.length, 0);
  const pct = (state.completedLessons.length / totalLessons) * 100;
  const fill = document.getElementById('course-qc-progress');
  if (fill) fill.style.width = pct + '%';
}

// ---- Avatar Customizer ----
function renderAvatarCustomizer() {
  const categories = document.querySelectorAll('.avatar-cat-btn');
  const optionsContainer = document.getElementById('avatar-options');
  const preview = document.getElementById('avatar-preview-emoji');

  function showCategory(cat) {
    categories.forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
    const opts = AVATAR_OPTIONS[cat] || [];
    const selected = state.avatarSelections[cat];
    optionsContainer.innerHTML = opts.map(opt => `
      <div class="avatar-option ${opt === selected ? 'selected' : ''}" data-opt="${opt}" data-cat="${cat}">${opt}</div>
    `).join('');

    optionsContainer.querySelectorAll('.avatar-option').forEach(opt => {
      opt.addEventListener('click', () => {
        state.avatarSelections[opt.dataset.cat] = opt.dataset.opt;
        if (opt.dataset.cat === 'face') {
          state.avatar = opt.dataset.opt;
          preview.textContent = state.avatar;
        }
        saveState();
        showCategory(cat);
      });
    });
  }

  preview.textContent = state.avatar;
  categories.forEach(c => {
    c.addEventListener('click', () => showCategory(c.dataset.cat));
  });
  showCategory('face');
}

// ---- Settings ----
function renderSettings() {
  // Theme
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === state.theme);
  });
  // Animations
  document.querySelectorAll('.anim-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.anim === state.animations);
  });
  document.getElementById('setting-sound').checked = state.sound;
  document.getElementById('setting-notif').checked = state.notifications;
  document.getElementById('setting-contrast').checked = state.highContrast;
  document.getElementById('setting-motion').checked = state.reducedMotion;
}

function applyTheme(theme) {
  state.theme = theme;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  saveState();
}

function applyAccessibility() {
  document.documentElement.setAttribute('data-contrast', state.highContrast ? 'high' : '');
  document.documentElement.setAttribute('data-motion', state.reducedMotion ? 'reduced' : '');
}

// ---- Qubi Mascot ----
let qubiTimeout;
function showQubiMessage(msg) {
  const qubi = document.getElementById('qubi-global');
  const bubble = document.getElementById('qubi-speech');
  qubi.classList.remove('hidden');
  bubble.classList.remove('hidden');
  bubble.textContent = msg;
  clearTimeout(qubiTimeout);
  qubiTimeout = setTimeout(() => {
    bubble.classList.add('hidden');
  }, 3500);
}

function showQubiIdle() {
  const qubi = document.getElementById('qubi-global');
  qubi.classList.remove('hidden');
}

// ---- Particle Background ----
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 30;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = ['139,92,246', '217,70,239', '244,114,182', '34,211,238', '56,189,248'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
      // Add small glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity * 0.15})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ---- Confetti ----
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const PIECE_COUNT = 80;
  const colors = ['#8B5CF6', '#D946EF', '#F472B6', '#22D3EE', '#FFC83D', '#5BEA55', '#38BDF8'];

  for (let i = 0; i < PIECE_COUNT; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 15 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3,
      opacity: 1
    });
  }

  let frame = 0;
  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;
      if (p.opacity > 0 && p.y < canvas.height + 20) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });
    frame++;
    if (alive && frame < 200) {
      requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animateConfetti();
}

// ---- Event Listeners ----
function initEvents() {
  // Bottom nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
  });

  // Top bar buttons
  document.getElementById('btn-avatar-topbar').addEventListener('click', () => showScreen('profile'));
  document.getElementById('btn-streak-topbar').addEventListener('click', () => showScreen('streak'));
  document.getElementById('btn-rank-topbar').addEventListener('click', () => showScreen('leaderboard'));
  document.getElementById('btn-settings-topbar').addEventListener('click', () => showScreen('settings'));

  // Lesson close
  document.getElementById('lesson-close-btn').addEventListener('click', () => showScreen('home'));
  document.getElementById('demo-close-btn').addEventListener('click', () => showScreen('home'));

  // Unit complete continue
  document.getElementById('btn-celebration-continue').addEventListener('click', () => showScreen('home'));

  // Profile -> Avatar
  document.getElementById('btn-customize-avatar').addEventListener('click', () => showScreen('avatar'));
  document.getElementById('avatar-back-btn').addEventListener('click', () => showScreen('profile'));
  document.getElementById('btn-save-avatar').addEventListener('click', () => {
    saveState();
    updateTopBar();
    showScreen('profile');
    showQubiMessage("Avatar updated! Looking great! ✨");
  });

  // Settings back
  document.getElementById('settings-back-btn').addEventListener('click', () => showScreen('home'));

  // Theme toggle
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyTheme(btn.dataset.theme);
    });
  });

  // Animation toggle
  document.querySelectorAll('.anim-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.anim-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.animations = btn.dataset.anim;
      state.reducedMotion = btn.dataset.anim === 'reduced';
      applyAccessibility();
      saveState();
    });
  });

  // Settings toggles
  document.getElementById('setting-sound').addEventListener('change', (e) => { state.sound = e.target.checked; saveState(); });
  document.getElementById('setting-notif').addEventListener('change', (e) => { state.notifications = e.target.checked; saveState(); });
  document.getElementById('setting-contrast').addEventListener('change', (e) => { state.highContrast = e.target.checked; applyAccessibility(); saveState(); });
  document.getElementById('setting-motion').addEventListener('change', (e) => {
    state.reducedMotion = e.target.checked;
    if (e.target.checked) {
      state.animations = 'reduced';
      document.querySelectorAll('.anim-opt').forEach(b => b.classList.toggle('active', b.dataset.anim === 'reduced'));
    }
    applyAccessibility();
    saveState();
  });

  // Reset data
  document.getElementById('btn-reset-data').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('qubitquest_state');
      location.reload();
    }
  });

  // Active course card
  document.getElementById('course-qc').addEventListener('click', () => showScreen('home'));

  // Qubi click
  document.getElementById('qubi-global').addEventListener('click', () => {
    const msgs = QUBI_MESSAGES.idle;
    showQubiMessage(msgs[Math.floor(Math.random() * msgs.length)]);
  });
}

// ---- Initialize ----
function init() {
  loadState();
  applyTheme(state.theme);
  applyAccessibility();
  initEvents();
  initParticles();
  updateTopBar();
  renderLearningPath();
  showQubiIdle();

  // Show welcome message after a short delay
  setTimeout(() => {
    showQubiMessage(QUBI_MESSAGES.welcome);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', init);
