export const COURSES = [
  {
    id: 'qc',
    title: 'Quantum Computing',
    iconKey: 'atom',
    color: '#00CD9C',
    description: '10 Units · 40 Lessons · In Progress',
    unitsCount: 10,
    lessonsCount: 40,
    active: true
  },
  {
    id: 'qp',
    title: 'Quantum Physics Basics',
    iconKey: 'microscope',
    color: '#38BDF8',
    description: '8 Units · 32 Lessons · Coming Soon',
    unitsCount: 8,
    lessonsCount: 32,
    active: false
  },
  {
    id: 'qa',
    title: 'Quantum Algorithms',
    iconKey: 'math',
    color: '#8B5CF6',
    description: '8 Units · 32 Lessons · Coming Soon',
    unitsCount: 8,
    lessonsCount: 32,
    active: false
  },
  {
    id: 'qpr',
    title: 'Quantum Programming',
    iconKey: 'laptop-code',
    color: '#F43F5E',
    description: '6 Units · 24 Lessons · Coming Soon',
    unitsCount: 6,
    lessonsCount: 24,
    active: false
  }
];

export const UNITS = [
  {
    id: 1,
    section: 1,
    title: 'Introduction to Quantum Computing',
    subtitle: 'Section 1 · Foundations of Computing',
    icon: '⚛️',
    color: '#00CD9C',
    lessons: [
      {
        id: 'u1l1',
        title: 'What is Computing?',
        sessionNum: 1,
        icon: '💡',
        type: 'story_intro',
        summary: 'Understand the core definition of computing: Input → Process → Output.',
        guideMessage: "👋 Welcome, Quantum Explorer!\nBefore entering the Quantum World, let's understand how computing works at its core.",
        video: {
          title: 'What is Computing? Classical vs Quantum',
          url: '',
          duration: '2:45',
          thumbnail: ''
        },
        learningCard: {
          concept: 'Computing means:',
          definition: 'Taking raw information (Input) → Transforming it with rules (Process) → Producing a useful result (Output)',
          exampleInput: 'Input: Numbers 2 and 3',
          exampleProcess: 'Process: Addition (+) operation',
          exampleOutput: 'Output: Result is 5'
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the correct step of computation into the pipeline:',
          template: ['Data is received: [ ', { id: 'slot1', answer: 'Input' }, ' ] ➔ Algorithmic rules run: [ ', { id: 'slot2', answer: 'Process' }, ' ] ➔ Final result: [ ', { id: 'slot3', answer: 'Output' }, ' ]'],
          options: ['Input', 'Process', 'Output', 'Memory', 'Display'],
          explanation: 'All computing systems follow the fundamental pipeline: Input data is received, processed by logic rules, and delivered as an output.',
          rewardXP: 15,
          hints: [
            'First comes receiving raw data.',
            'Next, the processor applies operations.',
            'Finally, the result is produced.'
          ]
        },
        sliderActivity: {
          title: 'Problem Complexity Scale',
          prompt: 'Tune the complexity scale to 50% to balance classical arithmetic and quantum simulations:',
          targetProb0: 50,
          tolerance: 4,
          rewardXP: 15,
          explanation: 'Simple arithmetic sits at low complexity, while molecular and quantum simulations demand massive processing power.',
          hints: [
            'Adjust the scale toward the center at 50%.',
            'Notice how computational resource requirements grow as complexity increases.'
          ]
        },
        circuitActivity: {
          title: 'Basic Logic Processor Circuit',
          prompt: 'Apply the Pauli-X gate to process input qubit |0⟩ into state |1⟩:',
          gates: ['X', 'H', 'Z', 'Y'],
          correctGate: 'X',
          targetGate: 'X',
          targetState: '|1⟩',
          initialState: '|0⟩',
          explanation: 'The X gate executes the logical NOT transformation, flipping input |0⟩ to output |1⟩.',
          hints: [
            'Click on the Pauli-X gate.',
            'Click Run Circuit to process the qubit on the quantum processor.'
          ],
          rewardXP: 20
        },
        rewardXP: 25,
        questions: [
          {
            id: 'q1',
            question: 'Which one is an accurate example of computing in daily life?',
            options: ['Drinking a glass of water', 'A calculator calculating 45 × 12', 'Sleeping on a bed', 'A stone resting on the ground'],
            correct: 1,
            hint: 'Look for receiving numbers, processing math, and giving an answer.',
            explanation: 'A calculator takes user input (45, 12, ×), calculates the product, and shows the output.'
          },
          {
            id: 'q2',
            question: 'In the computing pipeline (Input → Process → Output), what does "Process" mean?',
            options: ['Deleting the monitor screen', 'Applying logical or mathematical rules to data', 'Shutting down the power supply', 'Leaving data unchanged'],
            correct: 1,
            hint: 'Process is the calculation or transformation step.',
            explanation: 'Processing means executing instructions and performing calculations on the input data.'
          },
          {
            id: 'q3',
            question: 'What is the output when a computer receives inputs A = 8 and B = 14 with an ADD operation?',
            options: ['6', '22', '112', '814'],
            correct: 1,
            hint: '8 + 14 = 22.',
            explanation: 'The add operation takes 8 and 14 and produces 22 as the output.'
          },
          {
            id: 'q4',
            question: 'Why do modern scientists need more powerful computing models than ordinary classical computers?',
            options: [
              'Because classical computers can only display black and white',
              'Because simulating complex molecules and quantum physics requires exponential processing',
              'Because calculators use too much electricity',
              'Because classical computers cannot do addition'
            ],
            correct: 1,
            hint: 'Complex nature and molecular bonds scale exponentially with particle count.',
            explanation: 'Simulating quantum molecular systems grows exponentially harder for classical computers.'
          },
          {
            id: 'q5',
            question: 'Which device is a digital computing machine?',
            options: ['A smartphone', 'A wooden spoon', 'A ceramic mug', 'A paper book'],
            correct: 0,
            hint: 'It processes digital electrical signals.',
            explanation: 'A smartphone contains billions of digital transistors executing computer programs.'
          },
          {
            id: 'q6',
            question: 'What is the primary goal of computing?',
            options: ['To generate heat', 'To solve problems and automate data tasks', 'To slow down calculations', 'To replace human speech entirely'],
            correct: 1,
            hint: 'Computing helps us solve calculations and automate workflows.',
            explanation: 'Computing exists to solve problems efficiently, store information, and process complex tasks.'
          }
        ]
      },
      {
        id: 'u1l2',
        title: 'Classical Computing & Bits',
        sessionNum: 2,
        icon: '💻',
        type: 'bit_toggle',
        summary: 'Explore bits (0 and 1) and how phones and laptops process digital data.',
        guideMessage: "Great! 🎉\nNow let's see how your laptop and mobile phone process information using binary switches.",
        learningCard: {
          concept: 'Classical computers use BITS',
          definition: 'A Bit (binary digit) can only hold one of two distinct states: 0 or 1',
          lightOff: 'Switch OFF (Low Voltage) = 0 💡',
          lightOn: 'Switch ON (High Voltage) = 1 💡',
          devices: 'Your Phone 📱, Laptop 💻, and Supercomputers all manipulate billions of binary bits per second.'
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the binary bit values with their switch logic states:',
          template: ['Switch OFF represents bit [ ', { id: 'slot1', answer: '0' }, ' ] and Switch ON represents bit [ ', { id: 'slot2', answer: '1' }, ' ]. Two bits give [ ', { id: 'slot3', answer: '4' }, ' ] total combinations.'],
          options: ['0', '1', '4', '8', '2'],
          explanation: 'A single bit has 2 states (0 or 1). Two bits have 2² = 4 possible states: 00, 01, 10, and 11.',
          rewardXP: 15,
          hints: [
            'OFF is low state (0).',
            'ON is high state (1).',
            '2 to the power of 2 is 4.'
          ]
        },
        sliderActivity: {
          title: 'Transistor Voltage Level Scale',
          prompt: 'Set the digital logic voltage slider to 80% to represent a clean High State (Bit 1):',
          targetProb0: 80,
          tolerance: 4,
          rewardXP: 15,
          explanation: 'In digital hardware, voltages near supply level represent Boolean 1, while voltages near 0V represent Boolean 0.',
          hints: [
            'Slide to 80% to set a high logic level (Bit 1).',
            'Digital circuits use voltage thresholds to distinguish 0 from 1.'
          ]
        },
        circuitActivity: {
          title: 'Classical Inverter (NOT) Operation',
          prompt: 'Apply the Pauli-X gate to invert the bit from state |0⟩ to state |1⟩:',
          gates: ['X', 'Z', 'H', 'Y'],
          correctGate: 'X',
          targetGate: 'X',
          targetState: '|1⟩',
          initialState: '|0⟩',
          explanation: 'The X gate inverts state |0⟩ to state |1⟩, mirroring the behavior of a classical NOT inverter.',
          hints: [
            'Select the Pauli-X gate.',
            'Run the circuit to confirm 100% probability for state |1⟩.'
          ],
          rewardXP: 20
        },
        rewardXP: 25,
        questions: [
          {
            id: 'q1',
            question: 'What are the only two possible states a classical bit can hold at any single moment?',
            options: ['0 or 1', '1 or 2', 'True or Maybe', 'Any fraction between 0 and 1'],
            correct: 0,
            hint: 'Binary means base-2 digits.',
            explanation: 'A classical bit is strictly binary: it can only be 0 or 1.'
          },
          {
            id: 'q2',
            question: 'How many different state combinations can be stored with 3 classical bits?',
            options: ['3', '6', '8', '12'],
            correct: 2,
            hint: 'Formula is 2ⁿ where n = 3 bits (2 × 2 × 2).',
            explanation: '3 classical bits produce 2³ = 8 possible configurations: 000, 001, 010, 011, 100, 101, 110, 111.'
          },
          {
            id: 'q3',
            question: 'In physical computer chips, how are bits physically implemented?',
            options: ['Tiny water pipes', 'Microscopic semiconductor transistors acting as electronic switches', 'Chemical liquids', 'Wooden gears'],
            correct: 1,
            hint: 'Transistors turn electrical current on and off.',
            explanation: 'Computer chips contain billions of silicon transistors that switch electrical current on (1) or off (0).'
          },
          {
            id: 'q4',
            question: 'Can a single classical bit be in state 0 and state 1 simultaneously?',
            options: ['Yes, whenever it gets fast', 'No, a classical bit is strictly deterministic and mutually exclusive', 'Yes, inside smartphones', 'Only when battery is full'],
            correct: 1,
            hint: 'A switch is either ON or OFF, not both at the same time.',
            explanation: 'A classical bit can only be in one state at a time. Simultaneous states require quantum superposition.'
          },
          {
            id: 'q5',
            question: 'If a classical bit holds the value 0, what does applying a NOT gate produce?',
            options: ['0', '1', '2', 'Null'],
            correct: 1,
            hint: 'The NOT gate inverts the input value.',
            explanation: 'NOT(0) flips the value to 1.'
          },
          {
            id: 'q6',
            question: 'What is a collection of 8 bits commonly called in computing?',
            options: ['1 Nibble', '1 Byte', '1 Kilobit', '1 Megabyte'],
            correct: 1,
            hint: '8 bits form 1 Byte.',
            explanation: 'In computing architecture, 8 bits equal 1 Byte of digital information.'
          }
        ]
      },
      {
        id: 'u1l3',
        title: 'The Classical Challenge',
        sessionNum: 3,
        icon: '🚪',
        type: 'door_challenge',
        summary: 'Discover why classical computers struggle with certain complex problems.',
        guideMessage: '🤖 Classical computers are extremely powerful... But some problems scale exponentially and become computationally intractable!',
        hardProblems: [
          { icon: '🧪', name: 'Simulating chemical catalysts & molecules' },
          { icon: '🔐', name: 'Factoring large cryptographic RSA numbers' },
          { icon: '🧬', name: 'Protein folding & drug discovery' },
          { icon: '📊', name: 'Combinatorial supply chain optimization' }
        ],
        challengeDesc: 'Imagine: You have 5 doors. Only one door contains the treasure 💎. A classical computer must check each door one-by-one!',
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the scaling behavior with the computational domain:',
          template: ['Linear searching N items takes [ ', { id: 'slot1', answer: 'O(N)' }, ' ] classical queries, while Quantum Grover search takes only [ ', { id: 'slot2', answer: 'O(√N)' }, ' ] queries.'],
          options: ['O(N)', 'O(√N)', 'O(1)', 'O(N³)', 'O(2ᴺ)'],
          explanation: 'Classical unsorted search checks items sequentially in O(N) steps, whereas quantum amplitude amplification finds targets in O(√N) steps.',
          rewardXP: 15,
          hints: [
            'Sequential classical check takes O(N).',
            'Quantum Grover quadratic speedup takes square root O(√N).'
          ]
        },
        sliderActivity: {
          title: 'Database Search Size Scale',
          prompt: 'Tune the database scale slider to 64% to visualize the quadratic speedup gap:',
          targetProb0: 64,
          tolerance: 4,
          rewardXP: 15,
          explanation: 'As the database size grows from thousands to millions, the quantum advantage expands dramatically.',
          hints: [
            'Move the slider to 64%.',
            'Observe how square root √N stays manageable even when N becomes enormous.'
          ]
        },
        codeCircuit: {
          title: 'Quantum Search Step in Qiskit',
          prompt: 'Select the operation that prepares an equal superposition search space on 2 qubits:',
          targetGoal: 'Prepare uniform search state (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.h(0)', line2: 'qc.h(1)', isCorrect: true, desc: 'Apply Hadamard (H) to all qubits to create equal superposition across all 4 states' },
            { id: 'opt2', line1: 'qc.x(0)', line2: 'qc.x(1)', isCorrect: false, desc: 'Flips qubits to |11⟩ (single classical state only)' },
            { id: 'opt3', line1: 'qc.h(0)', line2: 'qc.x(1)', isCorrect: false, desc: 'Superposition on q0 only, no uniform 2-qubit space' }
          ],
          explanation: 'Applying Hadamard gates across all qubits creates an equal superposition over every possible combination simultaneously.',
          rewardXP: 25,
          hints: [
            'Uniform search requires putting both qubits into superposition.',
            'Hadamard (H) on qubit 0 and qubit 1 creates the 4-state superposition.'
          ]
        },
        rewardXP: 25,
        questions: [
          {
            id: 'q1',
            question: 'Why do certain molecular simulation problems become impossible for classical supercomputers?',
            options: [
              'Because electrons require quantum state descriptions that grow exponentially with molecule size',
              'Because classical supercomputers run out of screen pixels',
              'Because molecules cannot be drawn on screens',
              'Because classical computers cannot store floating point numbers'
            ],
            correct: 0,
            hint: 'Quantum states of N interacting electrons require 2ᴺ parameters.',
            explanation: 'Simulating N quantum particles requires tracking 2ᴺ quantum amplitudes, requiring more memory than all atoms in the universe for large molecules.'
          },
          {
            id: 'q2',
            question: 'If you have an unsorted list of 1,000,000 items, how many queries does a classical computer need in the worst case?',
            options: ['1,000,000 queries', '1,000 queries', '10 queries', '1 query'],
            correct: 0,
            hint: 'It may have to check every single item until the last one.',
            explanation: 'In the worst case, an unsorted classical search must inspect all N (1,000,000) entries.'
          },
          {
            id: 'q3',
            question: 'With Grover quantum algorithm, roughly how many queries are needed to search 1,000,000 items?',
            options: ['About 1,000 queries (√1,000,000)', '1,000,000 queries', '500,000 queries', '0 queries'],
            correct: 0,
            hint: 'Quantum search scales as the square root: √1,000,000 = 1,000.',
            explanation: 'Grover quantum search algorithm provides quadratic speedup, solving the problem in ~1,000 operations.'
          },
          {
            id: 'q4',
            question: 'Which of the following problems is a strong candidate for quantum computational advantage?',
            options: ['Simulating room-temperature nitrogenase catalysts for clean fertilizers', 'Typing a text message', 'Playing an MP3 audio file', 'Adding two small integers'],
            correct: 0,
            hint: 'Look for chemical bond quantum simulation.',
            explanation: 'Understanding complex enzyme catalysts like nitrogenase involves quantum electron correlations that quantum computers can model naturally.'
          },
          {
            id: 'q5',
            question: 'What happens when a classical computer tries to factor a 2048-bit cryptographic key using brute force?',
            options: ['It takes billions of years', 'It finishes in 1 second', 'It overheats the keyboard', 'It prints the answer immediately'],
            correct: 0,
            hint: 'Classical factoring time is super-polynomial/exponential.',
            explanation: 'Factoring 2048-bit numbers classically requires astronomical timescales exceeding the age of the universe.'
          },
          {
            id: 'q6',
            question: 'What is the core limitation of classical sequential search?',
            options: ['It can only test possibilities one path at a time', 'It uses too many colors', 'It requires internet connection', 'It only works at night'],
            correct: 0,
            hint: 'Classical computers must evaluate paths one by one.',
            explanation: 'Classical logic checks paths sequentially, whereas quantum interference allows exploring global state spaces simultaneously.'
          }
        ]
      },
      {
        id: 'u1l4',
        title: 'What is Quantum Computing?',
        sessionNum: 4,
        icon: '⚛️',
        type: 'classify_game',
        summary: 'Meet Qubits and the quantum principles: Superposition, Entanglement, & Interference.',
        guideMessage: '💡 What if we could use the fundamental laws of quantum physics for computation?\n\n👇 Welcome to Quantum Computing ⚛️',
        video: {
          title: 'Quantum Principles: Superposition & Entanglement',
          url: '',
          duration: '3:30',
          thumbnail: ''
        },
        learningCard: {
          concept: 'Instead of only Bits (0 or 1), Quantum computers use QUBITS!',
          phenomena: [
            { icon: '⚛️', name: 'Superposition', desc: 'A qubit can exist in a linear combination of states |0⟩ and |1⟩ simultaneously' },
            { icon: '🔗', name: 'Entanglement', desc: 'Qubits can become linked so that measuring one instantly influences the other' },
            { icon: '🌊', name: 'Interference', desc: 'Quantum wave amplitudes can reinforce correct answers and cancel out wrong ones' }
          ]
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match each quantum computing principle to its definition:',
          template: ['Coexisting in multiple states: [ ', { id: 'slot1', answer: 'Superposition' }, ' ] ➔ Non-local correlation between qubits: [ ', { id: 'slot2', answer: 'Entanglement' }, ' ] ➔ Canceling wrong computational paths: [ ', { id: 'slot3', answer: 'Interference' }, ' ]'],
          options: ['Superposition', 'Entanglement', 'Interference', 'Voltage', 'Transistor'],
          explanation: 'The three pillars of quantum computational speedup are Superposition, Entanglement, and Quantum Interference.',
          rewardXP: 15,
          hints: [
            'Linear combination of 0 and 1 is Superposition.',
            'Linked states across qubits is Entanglement.',
            'Wave amplitude reinforcement/cancellation is Interference.'
          ]
        },
        sliderActivity: {
          title: 'Superposition Probability Balance',
          prompt: 'Set the superposition slider to 50% to prepare the equal superposition state |+⟩ = (|0⟩ + |1⟩)/√2:',
          targetProb0: 50,
          tolerance: 3,
          rewardXP: 20,
          explanation: 'An equal superposition has 50% probability of |0⟩ and 50% probability of |1⟩ with equal amplitude 1/√2 ≈ 0.707.',
          hints: [
            'Adjust the slider to exactly 50%.',
            'Notice that |α|² = 0.50 and |β|² = 0.50.'
          ]
        },
        circuitActivity: {
          title: 'Hadamard Superposition Gate',
          prompt: 'Apply the Hadamard (H) gate to put Qubit 0 into equal superposition |+⟩:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'The Hadamard gate creates the equal superposition state |+⟩ = (|0⟩ + |1⟩)/√2 with a 50/50 probability distribution.',
          hints: [
            'Select the Hadamard (H) gate.',
            'Run the circuit to verify that P(|0⟩) = 50% and P(|1⟩) = 50%.'
          ],
          rewardXP: 25
        },
        rewardXP: 30,
        questions: [
          {
            id: 'q1',
            question: 'What is the fundamental unit of information in a quantum computer called?',
            options: ['Qubit (Quantum Bit)', 'Classical Bit', 'Byte', 'Transistor'],
            correct: 0,
            hint: 'Short for quantum bit.',
            explanation: 'A Qubit (quantum bit) is the basic unit of quantum information.'
          },
          {
            id: 'q2',
            question: 'What does the principle of Superposition allow a qubit to do?',
            options: [
              'Exist in a linear combination of both |0⟩ and |1⟩ states simultaneously',
              'Turn off the computer screen',
              'Hold classical text only',
              'Prevent the computer from consuming electricity'
            ],
            correct: 0,
            hint: 'Superposition enables simultaneous amplitude over 0 and 1.',
            explanation: 'Superposition allows a qubit state |ψ⟩ = α|0⟩ + β|1⟩ to hold probability amplitudes for both outcomes.'
          },
          {
            id: 'q3',
            question: 'What is Quantum Entanglement?',
            options: [
              'When wires inside the computer get physically tangled',
              'A unique quantum correlation where two or more qubits share a unified quantum state',
              'A type of software virus',
              'An error in internet cables'
            ],
            correct: 1,
            hint: 'Einstein called it "spooky action at a distance".',
            explanation: 'Entangled qubits exhibit correlations that cannot be described independently for each individual particle.'
          },
          {
            id: 'q4',
            question: 'How do quantum algorithms use Quantum Interference to find the right answer?',
            options: [
              'By increasing constructive interference for the correct answer and destructive interference for incorrect ones',
              'By blocking all incoming wifi signals',
              'By guessing randomly repeatedly',
              'By turning up the audio volume'
            ],
            correct: 0,
            hint: 'Wave amplitudes can add constructively or cancel destructively.',
            explanation: 'Quantum algorithms orchestrate phase shifts so wrong answers cancel out while the correct answer amplitude is magnified.'
          },
          {
            id: 'q5',
            question: 'Which physical system can be used to build a hardware qubit?',
            options: ['Superconducting Josephson circuits', 'Trapped atomic ions', 'Photons (light particles)', 'All of the above'],
            correct: 3,
            hint: 'Multiple quantum physical architectures exist today.',
            explanation: 'Superconducting circuits, trapped ions, neutral atoms, and photonic circuits are all leading quantum hardware technologies.'
          },
          {
            id: 'q6',
            question: 'What is the state of a qubit before measurement when it has equal amplitudes for |0⟩ and |1⟩?',
            options: ['|+⟩ = (|0⟩ + |1⟩)/√2', '|0⟩ only', '|1⟩ only', 'Undefined noise'],
            correct: 0,
            hint: 'The |+⟩ state is the equal superposition state.',
            explanation: 'Applying a Hadamard gate to |0⟩ produces the |+⟩ = (|0⟩ + |1⟩)/√2 superposition state.'
          }
        ]
      },
      {
        id: 'u1l5',
        title: 'Classical vs Quantum',
        sessionNum: 5,
        icon: '🔀',
        type: 'comparison_game',
        summary: 'Compare classical bits vs quantum states side-by-side.',
        guideMessage: "Let's contrast the classical world and the quantum realm side by side!",
        learningCard: {
          concept: 'Key Differences at a Glance:',
          definition: 'Classical Bit: 0 OR 1 (Deterministic, copyable, sequential processing)\nQuantum Qubit: α|0⟩ + β|1⟩ (Superposition, no-cloning theorem, parallel interference)',
          contrast1: 'State: Bit is binary state (0 or 1). Qubit is a 2D complex vector on the Bloch Sphere.',
          contrast2: 'Copying: Classical data can be freely copied. Unknown quantum states cannot be cloned (No-Cloning Theorem).'
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Complete the comparison chart between Classical and Quantum information:',
          template: ['Classical information is based on [ ', { id: 'slot1', answer: 'Bits' }, ' ] and is [ ', { id: 'slot2', answer: 'Deterministic' }, ' ]. Quantum information uses [ ', { id: 'slot3', answer: 'Qubits' }, ' ] and exhibits [ ', { id: 'slot4', answer: 'Superposition' }, ' ].'],
          options: ['Bits', 'Deterministic', 'Qubits', 'Superposition', 'Voltages', 'Wires'],
          explanation: 'Classical computing is discrete and deterministic, whereas quantum computing leverages continuous probability amplitudes and superposition.',
          rewardXP: 15,
          hints: [
            'Classical uses Bits.',
            'Classical logic is Deterministic.',
            'Quantum uses Qubits.',
            'Quantum enables Superposition.'
          ]
        },
        sliderActivity: {
          title: 'Quantum State Certainty Scale',
          prompt: 'Slide from 0% (pure |0⟩) to 100% (pure |1⟩) and pause at 50% for maximum quantum superposition:',
          targetProb0: 50,
          tolerance: 4,
          rewardXP: 15,
          explanation: 'At 0% and 100%, the qubit behaves like a deterministic classical bit. At 50%, it achieves maximum quantum superposition.',
          hints: [
            'Center the slider at 50%.',
            'Observe how certainty decreases while quantum superposition reaches maximum.'
          ]
        },
        circuitActivity: {
          title: 'Bit Flip vs Superposition Gate',
          prompt: 'Place the Hadamard (H) gate to transition from classical certainty to quantum superposition |+⟩:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'The H gate unlocks quantum superposition, converting pure basis states into balanced quantum mixtures.',
          hints: [
            'Select the Hadamard (H) gate.',
            'Run the circuit to view 50% |0⟩ and 50% |1⟩ probabilities.'
          ],
          rewardXP: 20
        },
        codeCircuit: {
          title: 'Comparing Code: Python Boolean vs Qiskit QuantumCircuit',
          prompt: 'Select the code snippet that creates a 2-qubit entangled Bell State:',
          targetGoal: 'Create Bell State (|00⟩ + |11⟩)/√2 in Qiskit',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.h(0)', line2: 'qc.cx(0, 1)', isCorrect: true, desc: 'Hadamard on qubit 0 followed by CNOT between qubit 0 and qubit 1 creates entanglement' },
            { id: 'opt2', line1: 'qc.x(0)', line2: 'qc.x(1)', isCorrect: false, desc: 'Classical bit flips on both qubits (no entanglement)' },
            { id: 'opt3', line1: 'qc.h(0)', line2: 'qc.h(1)', isCorrect: false, desc: 'Two independent superpositions without entanglement' }
          ],
          explanation: 'Applying H on qubit 0 and CNOT from qubit 0 to qubit 1 entangles the two qubits, generating the famous Bell State (|00⟩ + |11⟩)/√2.',
          rewardXP: 25,
          hints: [
            'First step: Superposition on control qubit (qc.h(0)).',
            'Second step: Entangling two-qubit gate (qc.cx(0, 1)).'
          ]
        },
        rewardXP: 30,
        questions: [
          {
            id: 'q1',
            question: 'In Classical computing, information is stored as ____, while in Quantum it is stored as ____:',
            options: [
              'BIT (0 or 1) vs QUBIT (Quantum State Vector)',
              'QUBIT vs BIT',
              'Voltage vs Current only',
              'Molecules vs Electricity only'
            ],
            correct: 0,
            hint: 'Classical = Bit, Quantum = Qubit.',
            explanation: 'Classical computing uses binary bits, while quantum computing processes quantum state vectors (qubits).'
          },
          {
            id: 'q2',
            question: 'What does the quantum "No-Cloning Theorem" state?',
            options: [
              'It is impossible to create an identical copy of an arbitrary unknown quantum state',
              'Quantum computers cannot be manufactured in factories',
              'You cannot clone a classical hard drive',
              'You cannot print PDF documents'
            ],
            correct: 0,
            hint: 'Unknown quantum states cannot be duplicated without measurement.',
            explanation: 'The No-Cloning Theorem is a fundamental theorem of quantum mechanics preventing the exact copying of unknown quantum states.'
          },
          {
            id: 'q3',
            question: 'How does measurement differ between classical bits and quantum qubits?',
            options: [
              'Reading a classical bit does not change its state, while measuring a qubit collapses its superposition',
              'Measuring a bit deletes the computer files',
              'Reading a qubit is always impossible',
              'There is no difference at all'
            ],
            correct: 0,
            hint: 'Quantum measurement fundamentally collapses wavefunctions.',
            explanation: 'Classical measurement is non-destructive, whereas quantum measurement projects the qubit to a definite basis state, collapsing superposition.'
          },
          {
            id: 'q4',
            question: 'Why can N qubits represent 2ᴺ states simultaneously, while N classical bits represent only 1 of 2ᴺ states at a time?',
            options: [
              'Because qubits form a joint 2ᴺ-dimensional Hilbert space through tensor products',
              'Because qubits are bigger in size',
              'Because quantum computers have larger batteries',
              'Because classical bits are made of plastic'
            ],
            correct: 0,
            hint: 'Tensor product scaling allows multi-qubit superposition.',
            explanation: 'The state space of an N-qubit quantum computer has dimension 2ᴺ, enabling rich multi-state entanglement and superposition.'
          },
          {
            id: 'q5',
            question: 'What is the Bloch Sphere used for in quantum computing?',
            options: [
              'A geometric sphere visualization of all possible pure states of a single qubit',
              'A device to measure room temperature',
              'A 3D video game engine',
              'A type of computer battery'
            ],
            correct: 0,
            hint: 'Points on the surface of the sphere represent single qubit pure states.',
            explanation: 'The Bloch Sphere is a standard geometrical representation of the pure state space of a single qubit.'
          },
          {
            id: 'q6',
            question: 'Can quantum computers completely replace all classical computers for simple tasks like word processing?',
            options: [
              'No, quantum computers are specialized accelerators for specific hard computational algorithms',
              'Yes, classical laptops will disappear tomorrow',
              'Yes, quantum computers only do word processing',
              'No, because quantum computers cannot compute anything'
            ],
            correct: 0,
            hint: 'Quantum computers will work as co-processors alongside classical computers.',
            explanation: 'Quantum processors (QPUs) will work hybrid alongside classical CPUs/GPUs to solve specific complex algorithms.'
          }
        ]
      },
      {
        id: 'u1l6',
        title: 'My First Quantum Lab',
        sessionNum: 6,
        icon: '🧪',
        type: 'practical_lab',
        isLab: true,
        summary: 'Run your first live quantum experiment on Qubit 0!',
        guideMessage: '🧪 Welcome to My First Quantum Lab!\nExperience quantum computing as real technology, not just theoretical concepts!',
        labActivity: {
          title: 'Qubit 0 State Preparation Lab',
          description: 'Initialize Qubit 0, apply the Hadamard gate to generate superposition, and observe state collapse upon measurement.',
          defaultState: '|0⟩',
          gates: ['H', 'X', 'Z', 'Y'],
          rewardXP: 50
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Assemble the normalized state equation for Qubit 0 after applying Hadamard gate:',
          template: ['|ψ⟩ = [ ', { id: 'slot1', answer: '1/√2' }, ' ] |0⟩ + [ ', { id: 'slot2', answer: '1/√2' }, ' ] |1⟩'],
          options: ['1/√2', '1/√2', '1/2', '1', '0'],
          explanation: 'Applying H to |0⟩ produces |+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, where each outcome has |1/√2|² = 1/2 (50%) measurement probability.',
          rewardXP: 15,
          hints: [
            'Amplitude for state |0⟩ is 1/√2.',
            'Amplitude for state |1⟩ is also 1/√2.'
          ]
        },
        sliderActivity: {
          title: 'Measurement Outcome Probability Scale',
          prompt: 'Tune the measurement distribution slider to 50% for equal outcome distribution:',
          targetProb0: 50,
          tolerance: 3,
          rewardXP: 15,
          explanation: 'In an unbiased quantum coin-flip, measuring |+⟩ yields |0⟩ with 50% probability and |1⟩ with 50% probability.',
          hints: [
            'Set slider to 50% |0⟩.',
            'Probabilities for 0 and 1 will balance perfectly.'
          ]
        },
        circuitActivity: {
          title: 'Interactive Gate Sandbox',
          prompt: 'Apply the Hadamard (H) gate to qubit 0 to prepare the superposition state |+⟩:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'The H gate rotates the state vector to the equator of the Bloch sphere, yielding state |+⟩.',
          hints: [
            'Click the Hadamard (H) gate chip.',
            'Click Run Circuit to measure 50% 0 / 50% 1.'
          ],
          rewardXP: 20
        },
        rewardXP: 50,
        badgeReward: 'Quantum Explorer',
        questions: [
          {
            id: 'q1',
            question: 'When Qubit 0 is prepared in state |0⟩ and we apply an H gate, what is the resulting state?',
            options: ['|+⟩ = (|0⟩ + |1⟩)/√2', '|0⟩', '|1⟩', '|-⟩ = (|0⟩ - |1⟩)/√2'],
            correct: 0,
            hint: 'Hadamard turns basis states into superposition states.',
            explanation: 'H|0⟩ = (|0⟩ + |1⟩)/√2 = |+⟩.'
          },
          {
            id: 'q2',
            question: 'If we measure the state |+⟩ = (|0⟩ + |1⟩)/√2 1,000 times, roughly how many times will we observe |0⟩?',
            options: ['Around 500 times (50%)', 'Exactly 1,000 times', '0 times', 'Exactly 250 times'],
            correct: 0,
            hint: 'The probability is |1/√2|² = 50%.',
            explanation: 'Because P(0) = 50%, running 1,000 shots will produce approximately 500 zeros and 500 ones with statistical variance.'
          },
          {
            id: 'q3',
            question: 'After a measurement yields outcome "1", what is the state of the qubit immediately following measurement?',
            options: ['|1⟩ (collapsed)', 'Still in equal superposition |+⟩', '|0⟩', 'Destroyed and gone'],
            correct: 0,
            hint: 'Wavefunction collapses into the measured outcome state.',
            explanation: 'Quantum measurement projects the state into the measured eigenstate, so subsequent measurements will continue to yield 1.'
          },
          {
            id: 'q4',
            question: 'What happens if we apply two Hadamard gates in a row (H followed by H) to |0⟩?',
            options: [
              'It returns back to |0⟩ because H is its own inverse (H² = I)',
              'It stays in superposition permanently',
              'It becomes |1⟩',
              'It creates an error'
            ],
            correct: 0,
            hint: 'The Hadamard gate is unitary and self-inverse: H = H† = H⁻¹.',
            explanation: 'Because H · H = Identity matrix (I), applying H twice restores the original state: H(H|0⟩) = |0⟩.'
          },
          {
            id: 'q5',
            question: 'What does the Pauli-Z gate do to the state |1⟩?',
            options: ['It adds a phase flip, changing |1⟩ to -|1⟩', 'It flips |1⟩ to |0⟩', 'It deletes the qubit', 'It does nothing'],
            correct: 0,
            hint: 'Z|0⟩ = |0⟩ and Z|1⟩ = -|1⟩.',
            explanation: 'The Z gate is a phase-flip operator that leaves |0⟩ unchanged but applies a -1 phase factor to |1⟩.'
          },
          {
            id: 'q6',
            question: 'Why do real quantum computers operate inside cryogenic dilution refrigerators at ~15 millikelvin?',
            options: [
              'To eliminate thermal energy that causes quantum decoherence and noise',
              'Because qubits like cold drinks',
              'To make the computer quiet',
              'To freeze the silicon hard'
            ],
            correct: 0,
            hint: 'Thermal heat vibrates atoms and destroys delicate quantum superposition.',
            explanation: 'Cryogenic cooling near absolute zero prevents ambient heat from causing decoherence and errors in superconducting qubits.'
          }
        ]
      },
      {
        id: 'u1l7',
        title: 'Quick Challenge',
        sessionNum: 7,
        icon: '🧠',
        type: 'knowledge_check',
        summary: 'Test your knowledge on bits, qubits, and quantum mechanics.',
        guideMessage: "🧠 Quick Challenge!\nLet's test what you have discovered across all quantum foundations!",
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the quantum terminology to its scientific definition:',
          template: ['The standard notation for quantum states: [ ', { id: 'slot1', answer: 'Dirac Ket |⟩' }, ' ] ➔ Preserves vector length and probability: [ ', { id: 'slot2', answer: 'Unitary' }, ' ] ➔ Loss of quantum state due to noise: [ ', { id: 'slot3', answer: 'Decoherence' }, ' ]'],
          options: ['Dirac Ket |⟩', 'Unitary', 'Decoherence', 'Binary', 'Transistor'],
          explanation: 'Dirac notation expresses states as kets, unitary gates preserve probability conservation, and decoherence is the loss of quantum coherence caused by environment interaction.',
          rewardXP: 15,
          hints: [
            '|ψ⟩ is a Dirac Ket.',
            'Reversible probability-preserving operator is Unitary.',
            'Noise causing quantum state decay is Decoherence.'
          ]
        },
        sliderActivity: {
          title: 'Quantum Phase Shift Scale',
          prompt: 'Tune the quantum phase slider to 90% (π/2 phase rotation):',
          targetProb0: 90,
          tolerance: 4,
          rewardXP: 15,
          explanation: 'Phase shifts rotate the quantum state vector along the equator of the Bloch sphere.',
          hints: [
            'Slide to 90%.',
            'Phase rotations modify relative angle without changing raw measurement probabilities.'
          ]
        },
        circuitActivity: {
          title: 'Quantum State Pipeline',
          prompt: 'Apply the Pauli-X gate to invert the initial ground state |0⟩ into state |1⟩:',
          gates: ['X', 'H', 'Z', 'Y'],
          correctGate: 'X',
          targetGate: 'X',
          targetState: '|1⟩',
          initialState: '|0⟩',
          explanation: 'The Pauli-X gate inverts the ground state |0⟩ to state |1⟩ with 100% probability.',
          hints: [
            'Select the Pauli-X (NOT) gate.',
            'Click Run Circuit to observe state |1⟩.'
          ],
          rewardXP: 20
        },
        rewardXP: 35,
        questions: [
          {
            id: 'q1',
            question: 'What does a classical computer use as its fundamental unit of data?',
            options: ['Bits (0 or 1)', 'Qubits', 'Photons only', 'Molecules only'],
            correct: 0,
            hint: 'The conventional unit of classical information.',
            explanation: 'Classical computers process data using binary bits.'
          },
          {
            id: 'q2',
            question: 'What is the basic information unit in quantum computing?',
            options: ['Qubit (Quantum bit)', 'Byte', 'Kilobyte', 'Hard drive'],
            correct: 0,
            hint: 'Quantum bit.',
            explanation: 'A qubit is the fundamental unit of quantum information.'
          },
          {
            id: 'q3',
            question: 'Quantum computing algorithms leverage principles from which branch of physics?',
            options: ['Quantum mechanics', 'Classical thermodynamics only', 'Fluid dynamics only', 'Geology'],
            correct: 0,
            hint: 'Physics at atomic and subatomic scale.',
            explanation: 'Quantum computers operate based on the laws of quantum mechanics.'
          },
          {
            id: 'q4',
            question: 'What is the mathematical condition for normalization of state vector α|0⟩ + β|1⟩?',
            options: ['|α|² + |β|² = 1', '|α| + |β| = 2', 'α × β = 1', 'α = β = 0'],
            correct: 0,
            hint: 'Total probability must equal 100% (1).',
            explanation: 'The normalization condition requires that the sum of the squared magnitudes of amplitudes equals 1.'
          },
          {
            id: 'q5',
            question: 'Which gate creates an equal superposition from the basis state |0⟩?',
            options: ['Hadamard (H) gate', 'NOT (X) gate', 'Phase (Z) gate', 'Identity (I) gate'],
            correct: 0,
            hint: 'The H gate.',
            explanation: 'The Hadamard gate transforms |0⟩ into (|0⟩ + |1⟩)/√2.'
          },
          {
            id: 'q6',
            question: 'What is the phenomenon called when two entangled qubits show instantaneous correlations regardless of distance?',
            options: ['Quantum Entanglement', 'Thermal expansion', 'Magnetic attraction', 'Bluetooth sync'],
            correct: 0,
            hint: 'Non-local quantum correlation.',
            explanation: 'Quantum entanglement links particles so their quantum states cannot be described independently.'
          },
          {
            id: 'q7',
            question: 'Why are quantum gates mathematically represented by Unitary matrices?',
            options: ['Because unitary matrices preserve the length of state vectors and conserve total probability', 'Because unitary matrices are easy to type', 'Because classical computers cannot multiply matrices', 'Because matrices have four corners'],
            correct: 0,
            hint: 'U†U = I ensures that state vectors maintain norm 1.',
            explanation: 'Unitary matrices ensure that quantum transformations are reversible and conserve the total probability of 1.'
          }
        ]
      },
      {
        id: 'u1l8',
        title: 'Final Boss Challenge',
        sessionNum: 8,
        icon: '🏆',
        type: 'boss_mission',
        isBoss: true,
        summary: 'Final Mission: Match technologies, earn your badge, and unlock the next topic!',
        guideMessage: '🏆 Final Boss Challenge!\nProve your complete mastery of Unit 1 concepts across interactive challenges!',
        bossMatches: { classical: 'BIT', quantum: 'QUBIT' },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Complete the Grand Quantum Computing summary equation:',
          template: ['A Quantum Computer uses [ ', { id: 'slot1', answer: 'Qubits' }, ' ] in [ ', { id: 'slot2', answer: 'Superposition' }, ' ] governed by [ ', { id: 'slot3', answer: 'Unitary Gates' }, ' ].'],
          options: ['Qubits', 'Superposition', 'Unitary Gates', 'Bits', 'Transistors'],
          explanation: 'Quantum computers harness qubits in superposition transformed by unitary quantum logic gates.',
          rewardXP: 25,
          hints: [
            'Information unit: Qubits.',
            'Coexistence state: Superposition.',
            'Logic operators: Unitary Gates.'
          ]
        },
        sliderActivity: {
          title: 'Quantum Advantage Milestone Scale',
          prompt: 'Tune the quantum advantage meter to 100% to finalize your topic mastery certification:',
          targetProb0: 100,
          tolerance: 3,
          rewardXP: 25,
          explanation: 'You have completed the full foundations curriculum for Unit 1!',
          hints: [
            'Slide all the way to 100%.',
            'Claim your milestone graduation reward!'
          ]
        },
        codeCircuit: {
          title: 'Full Bell-State Entanglement Circuit',
          prompt: 'Select the complete code snippet to generate the entangled state (|00⟩ + |11⟩)/√2:',
          targetGoal: 'Entangle qubit 0 and qubit 1 into Bell state |Φ⁺⟩',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.h(0)', line2: 'qc.cx(0, 1)', isCorrect: true, desc: 'Hadamard on q0, CNOT(0,1) creates canonical Bell state |Φ⁺⟩' },
            { id: 'opt2', line1: 'qc.x(0)', line2: 'qc.x(1)', isCorrect: false, desc: 'Deterministic bit flips on both wires (no entanglement)' },
            { id: 'opt3', line1: 'qc.z(0)', line2: 'qc.z(1)', isCorrect: false, desc: 'Phase gates on |00⟩ leave state unchanged' }
          ],
          explanation: 'H on qubit 0 generates equal superposition, and CNOT entangles qubit 1 with qubit 0, yielding (|00⟩ + |11⟩)/√2.',
          rewardXP: 30,
          hints: [
            'Step 1 creates superposition with H.',
            'Step 2 creates two-qubit entanglement with CNOT.'
          ]
        },
        rewardXP: 100,
        badgeReward: 'Quantum Beginner',
        unlockTopic: 'Classical Bits vs Qubits',
        questions: [
          {
            id: 'q1',
            question: 'What is the primary difference between a classical bit and a quantum qubit?',
            options: [
              'A bit is strictly 0 or 1; a qubit can be in a superposition state α|0⟩ + β|1⟩',
              'A bit is made of gold, a qubit is made of silver',
              'A qubit cannot be measured',
              'There is no difference'
            ],
            correct: 0,
            hint: 'Superposition distinguishes qubits from bits.',
            explanation: 'A bit has binary values 0 or 1, while a qubit can exist in continuous superpositions of basis states.'
          },
          {
            id: 'q2',
            question: 'What does applying a Hadamard (H) gate to state |0⟩ produce?',
            options: ['|+⟩ = (|0⟩ + |1⟩)/√2', '|1⟩', '|0⟩', '0'],
            correct: 0,
            hint: 'Hadamard generates equal superposition.',
            explanation: 'H|0⟩ = (|0⟩ + |1⟩)/√2.'
          },
          {
            id: 'q3',
            question: 'What does the CNOT (Controlled-NOT) gate do when the control qubit is 1?',
            options: [
              'It flips the target qubit (applies X gate to target)',
              'It deletes both qubits',
              'It turns the computer off',
              'It does nothing'
            ],
            correct: 0,
            hint: 'Controlled-NOT flips target if control is 1.',
            explanation: 'When control qubit is |1⟩, CNOT flips the target qubit (|0⟩ ↔ |1⟩). If control is |0⟩, target remains unchanged.'
          },
          {
            id: 'q4',
            question: 'Which of the following is true regarding quantum measurement?',
            options: [
              'Measurement is probabilistic and collapses the quantum superposition into a definite state',
              'Measurement never changes quantum states',
              'Measurement is always 100% predictable without randomness',
              'Measurement can only be performed in darkness'
            ],
            correct: 0,
            hint: 'Wavefunction collapse is probabilistic according to Born rule.',
            explanation: 'Measurement probabilistically projects the state onto one of the measurement basis vectors.'
          },
          {
            id: 'q5',
            question: 'If a single qubit has state |ψ⟩ = (1/2)|0⟩ + (√3/2)|1⟩, what is the probability of measuring 1?',
            options: ['3/4 (75%)', '1/4 (25%)', '1/2 (50%)', '100%'],
            correct: 0,
            hint: 'Probability is |β|² = |√3/2|² = 3/4.',
            explanation: 'Born rule: P(1) = |√3/2|² = 3/4 = 75%.'
          },
          {
            id: 'q6',
            question: 'Congratulations on completing Unit 1! What fundamental concept will you master next in Unit 2?',
            options: [
              'Qubits & Measurement: Dirac Notation, Bloch Sphere, and Probability Amplitudes',
              'How to solder wires onto a motherboard',
              'Writing HTML websites',
              'Classical MS Excel spreadsheets'
            ],
            correct: 0,
            hint: 'Unit 2 explores deep quantum mathematics and measurement.',
            explanation: 'Unit 2 dives deep into state vectors, Hilbert space, the Bloch Sphere, and advanced measurement mechanics!'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    section: 1,
    title: 'Qubits & Measurement',
    subtitle: 'Probability Amplitudes & State Collapse',
    icon: '📏',
    color: '#10B981',
    lessons: [
      {
        id: 'u2l1',
        title: 'Qubit States & Vectors',
        icon: '🎯',
        summary: 'Represent quantum states on 2D complex Hilbert space.',
        explanation: 'Any single qubit state |ψ⟩ = α|0⟩ + β|1⟩ satisfies the normalization condition |α|² + |β|² = 1. This ensures that total measurement probability always equals 100%.',
        video: {
          title: 'Dirac Bra-Ket Notation & State Vectors',
          url: '',
          duration: '3:15'
        },
        learningCard: {
          concept: 'Dirac Bra-Ket Vector Notation:',
          definition: '|ψ⟩ (Ket) represents a column vector of state amplitudes.\n⟨ψ| (Bra) represents its conjugate transpose row vector.\nInner product ⟨ψ|φ⟩ calculates the quantum overlap amplitude.',
          ket0: '|0⟩ = [1, 0]ᵀ (Computational ground state)',
          ket1: '|1⟩ = [0, 1]ᵀ (Computational excited state)'
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Complete the single-qubit quantum state vector equation:',
          template: ['|ψ⟩ = [ ', { id: 'slot1', answer: 'α' }, ' ] |0⟩ + [ ', { id: 'slot2', answer: 'β' }, ' ] |1⟩, where |α|² + |β|² = [ ', { id: 'slot3', answer: '1' }, ' ]'],
          options: ['α', 'β', '1', 'γ', '0', '2'],
          explanation: 'In standard Dirac notation, |ψ⟩ = α|0⟩ + β|1⟩ where α and β are complex probability amplitudes normalized to |α|² + |β|² = 1.',
          rewardXP: 20,
          hints: [
            'α is the amplitude for state |0⟩.',
            'β is the amplitude for state |1⟩.',
            'Total probability sum equals 1.'
          ]
        },
        sliderActivity: {
          title: 'State Vector Amplitude Balance',
          prompt: 'Tune the amplitude slider to 50% to balance |α|² = 0.50 and |β|² = 0.50:',
          targetProb0: 50,
          tolerance: 3,
          rewardXP: 20,
          explanation: 'At 50%, α = 1/√2 and β = 1/√2, forming the equal superposition state |+⟩.',
          hints: [
            'Slide to 50%.',
            'Observe how α and β stay normalized to unit length.'
          ]
        },
        circuitActivity: {
          title: 'State Vector Rotation Gate',
          prompt: 'Apply the Hadamard gate to rotate the state vector from |0⟩ into equal superposition |+⟩:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'The Hadamard gate maps basis state |0⟩ to equal superposition |+⟩ = (|0⟩ + |1⟩)/√2.',
          hints: [
            'Click the Hadamard (H) gate.',
            'Run the circuit to view 50% / 50% state distribution.'
          ],
          rewardXP: 25
        },
        rewardXP: 30,
        questions: [
          {
            id: 'q1',
            question: 'For any physically valid qubit state |ψ⟩ = α|0⟩ + β|1⟩, what must |α|² + |β|² always equal?',
            options: ['1 (100% total probability)', '0', '2', 'π'],
            correct: 0,
            hint: 'The sum of all possible measurement probabilities in universe must be 100%.',
            explanation: 'The normalization condition requires that the sum of squared amplitude magnitudes equals 1.'
          },
          {
            id: 'q2',
            question: 'What is the column vector representation of the standard ground state |0⟩?',
            options: ['[1, 0]ᵀ', '[0, 1]ᵀ', '[1, 1]ᵀ', '[0, 0]ᵀ'],
            correct: 0,
            hint: 'Top component is amplitude for 0.',
            explanation: '|0⟩ has amplitude 1 for state 0 and amplitude 0 for state 1: [1, 0]ᵀ.'
          },
          {
            id: 'q3',
            question: 'In Dirac notation, what is a column state vector denoted as?',
            options: ['Ket vector: |ψ⟩', 'Bra vector: ⟨ψ|', 'Parenthesis: (ψ)', 'Curly brace: {ψ}'],
            correct: 0,
            hint: 'The right-pointing bracket | ⟩ is a ket.',
            explanation: 'In Dirac notation, state vectors are represented as Kets: |ψ⟩.'
          },
          {
            id: 'q4',
            question: 'What is the conjugate transpose row vector ⟨ψ| called?',
            options: ['Bra vector', 'Ket vector', 'Square root', 'Matrix trace'],
            correct: 0,
            hint: 'Bra + Ket = Bracket ⟨ψ|φ⟩.',
            explanation: '⟨ψ| is the Bra vector, and combining with a Ket forms the inner product Bracket ⟨ψ|φ⟩.'
          },
          {
            id: 'q5',
            question: 'If a qubit has amplitude α = 0.6 for |0⟩ and β = 0.8 for |1⟩, is this state properly normalized?',
            options: ['Yes, because 0.6² + 0.8² = 0.36 + 0.64 = 1.00', 'No, 0.6 + 0.8 = 1.4', 'No, numbers must be negative', 'Only on classical computers'],
            correct: 0,
            hint: 'Check |α|² + |β|²: 0.36 + 0.64 = 1.',
            explanation: '0.6² + 0.8² = 0.36 + 0.64 = 1.00, satisfying the normalization condition.'
          },
          {
            id: 'q6',
            question: 'On what mathematical geometric space are single qubit states mapped?',
            options: ['2D Complex Hilbert Space & 3D Bloch Sphere', '1D number line only', 'RGB color triangle', 'Classical periodic table'],
            correct: 0,
            hint: 'Complex 2D vector space mapped onto the Bloch sphere surface.',
            explanation: 'Single qubit states inhabit a 2-dimensional complex Hilbert space ℂ², geometrically visualized on the Bloch Sphere.'
          }
        ]
      },
      {
        id: 'u2l2',
        title: 'Probability Amplitudes',
        icon: '📊',
        summary: 'Understand complex numbers and probabilities in quantum physics.',
        explanation: 'Amplitudes can have negative or imaginary values. This enables destructive interference where amplitudes cancel each other out, removing wrong answers from quantum algorithms!',
        learningCard: {
          concept: 'The Born Rule & Amplitudes:',
          definition: 'Probability is the squared magnitude of amplitude: P(outcome) = |Amplitude|²',
          rule1: 'Amplitudes can be positive, negative, or complex (e.g. +1/√2, -1/√2, +i/√2).',
          rule2: 'Negative amplitudes allow wave cancellation (destructive interference) in quantum algorithms.'
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the amplitude with its measurement probability according to the Born Rule:',
          template: ['Amplitude α = 1/2 gives probability P(0) = [ ', { id: 'slot1', answer: '1/4 (25%)' }, ' ] while amplitude α = √3/2 gives P(0) = [ ', { id: 'slot2', answer: '3/4 (75%)' }, ' ].'],
          options: ['1/4 (25%)', '3/4 (75%)', '1/2 (50%)', '1 (100%)', '0%'],
          explanation: 'Born Rule: P = |Amplitude|². (1/2)² = 1/4 (25%), and (√3/2)² = 3/4 (75%).',
          rewardXP: 20,
          hints: [
            '(1/2)² is 1/4 (25%).',
            '(√3/2)² is 3/4 (75%).'
          ]
        },
        sliderActivity: {
          title: 'Born Rule Probability Tuning',
          prompt: 'Tune the superposition state to have a 75% probability of measuring |0⟩:',
          targetProb0: 75,
          tolerance: 3,
          rewardXP: 25,
          explanation: 'When P(|0⟩) = 75%, |α|² = 0.75 (α ≈ 0.866) and |β|² = 0.25 (β = 0.500).',
          hints: [
            'Recall that P(|0⟩) = |α|² and P(|1⟩) = |β|².',
            'Since total probability is 100%, P(|1⟩) must be 25%.',
            'Move the slider to 75% |0⟩.'
          ]
        },
        circuitActivity: {
          title: 'Phase Rotation Gate',
          prompt: 'Apply the Pauli-Z phase gate to add a relative phase of π to state |1⟩:',
          gates: ['Z', 'X', 'H', 'Y'],
          correctGate: 'Z',
          targetGate: 'Z',
          targetState: '|0⟩',
          initialState: '|0⟩',
          explanation: 'The Pauli-Z gate applies a π phase shift (Z|0⟩ = |0⟩, Z|1⟩ = -|1⟩), creating the negative relative phase.',
          hints: [
            'Click the Pauli-Z gate chip.',
            'Run the circuit to apply the phase transformation.'
          ],
          rewardXP: 25
        },
        rewardXP: 30,
        questions: [
          {
            id: 'q1',
            question: 'Can quantum probability amplitudes be negative numbers or complex numbers?',
            options: ['Yes, amplitudes are complex numbers (a + bi)', 'No, amplitudes must always be positive real numbers', 'Only during holidays', 'Never in quantum mechanics'],
            correct: 0,
            hint: 'Amplitudes are complex; only their squared magnitude is probability.',
            explanation: 'Amplitudes are complex numbers. This allows negative and complex phases that create interference.'
          },
          {
            id: 'q2',
            question: 'If the amplitude for state |0⟩ is α = -1/√2, what is the probability of measuring 0?',
            options: ['1/2 (50%)', '-50%', '0%', '100%'],
            correct: 0,
            hint: 'Probability is |-1/√2|² = (-1/√2) × (-1/√2) = 1/2.',
            explanation: 'The squared magnitude |-1/√2|² = +1/2 = 50%. Probabilities are always non-negative.'
          },
          {
            id: 'q3',
            question: 'What is the key algorithm advantage enabled by negative and complex amplitudes?',
            options: [
              'Destructive interference can cancel out incorrect calculation paths',
              'It makes computer screens turn purple',
              'It removes the need for electricity',
              'It speeds up download speeds of video files'
            ],
            correct: 0,
            hint: 'Phase cancellation eliminates wrong states.',
            explanation: 'Destructive interference allows quantum algorithms to cancel amplitudes of wrong paths so only the correct answer survives.'
          },
          {
            id: 'q4',
            question: 'According to the Born Rule, what is the formula to convert amplitude α to probability P?',
            options: ['P = |α|²', 'P = α + 2', 'P = 2α', 'P = α / 100'],
            correct: 0,
            hint: 'Max Born Nobel-prize winning rule.',
            explanation: 'The Born rule establishes that probability is equal to the squared magnitude |α|².'
          },
          {
            id: 'q5',
            question: 'If a qubit state is |ψ⟩ = (1/√2)|0⟩ - (1/√2)|1⟩, what are the measurement probabilities for 0 and 1?',
            options: ['50% for 0, 50% for 1', '100% for 0, 0% for 1', '0% for 0, 100% for 1', '-50% for 1'],
            correct: 0,
            hint: '|1/√2|² = 0.50 and |-1/√2|² = 0.50.',
            explanation: 'Both |1/√2|² and |-1/√2|² equal 50%. The minus sign affects phase interference, not raw measurement probability.'
          },
          {
            id: 'q6',
            question: 'What is the state |ψ⟩ = (1/√2)|0⟩ - (1/√2)|1⟩ commonly named in quantum computing?',
            options: ['|-⟩ (Minus state)', '|+⟩ (Plus state)', '|0⟩ state', '|1⟩ state'],
            correct: 0,
            hint: 'The minus state | - ⟩ has a relative phase of π (minus sign).',
            explanation: 'The state (1/√2)|0⟩ - (1/√2)|1⟩ is denoted as |-⟩, the negative superposition state.'
          }
        ]
      },
      {
        id: 'u2l3',
        title: 'Measurement & Observation',
        icon: '🔬',
        summary: 'Observe the act of quantum measurement in real time.',
        explanation: 'In quantum mechanics, measurement is not passive. Measuring a qubit projects the state onto either |0⟩ or |1⟩, destroying the pre-existing superposition.',
        learningCard: {
          concept: 'Quantum Measurement Dynamics:',
          definition: 'Measurement projects a continuous superposition into one discrete classical state.',
          step1: 'Before: Qubit is in superposition |ψ⟩ = α|0⟩ + β|1⟩.',
          step2: 'Observation: Wavefunction collapses instantaneously to |0⟩ (with prob |α|²) or |1⟩ (with prob |β|²).',
          step3: 'After: The original superposition is gone. Subsequent measurements will strictly repeat the collapsed value.'
        },
        labActivity: {
          title: 'Superposition Collapse Experiment',
          description: 'Prepare a superposition state and observe state collapse upon measurement.',
          defaultState: '|+⟩',
          gates: ['H', 'X', 'Z'],
          rewardXP: 30
        },
        mathActivity: {
          type: 'drag_drop',
          prompt: 'Match the measurement stage with its quantum state property:',
          template: ['Before measurement: State is in [ ', { id: 'slot1', answer: 'Superposition' }, ' ]. During observation: Wavefunction undergoes [ ', { id: 'slot2', answer: 'Collapse' }, ' ]. After measurement: Result is [ ', { id: 'slot3', answer: 'Deterministic' }, ' ].'],
          options: ['Superposition', 'Collapse', 'Deterministic', 'Infinite', 'Zero'],
          explanation: 'Before measurement the qubit is in superposition; observation causes projective collapse; thereafter the result is deterministic.',
          rewardXP: 20,
          hints: [
            'Before: Superposition.',
            'During: Collapse.',
            'After: Deterministic outcome.'
          ]
        },
        sliderActivity: {
          title: 'Measurement Projection Bias',
          prompt: 'Tune the measurement projection bias slider to 80% |0⟩:',
          targetProb0: 80,
          tolerance: 3,
          rewardXP: 20,
          explanation: 'Biased superposition states will collapse into outcome 0 four times as often as outcome 1.',
          hints: [
            'Slide to 80% |0⟩.',
            'Observe the 4:1 probability ratio.'
          ]
        },
        circuitActivity: {
          title: 'Measurement Gate Circuit',
          prompt: 'Apply the Hadamard (H) gate to prepare an equal superposition |+⟩ before measurement:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'Applying H creates an equal superposition |+⟩ which collapses probabilistically to |0⟩ or |1⟩ upon measurement.',
          hints: [
            'Click the Hadamard (H) gate.',
            'Run the circuit to verify 50% |0⟩ and 50% |1⟩ outcomes.'
          ],
          rewardXP: 25
        },
        rewardXP: 35,
        questions: [
          {
            id: 'q1',
            question: 'Is quantum measurement a reversible operation in standard physics?',
            options: ['No, it is an irreversible state collapse', 'Yes, completely reversible at any time', 'Only when measured quickly', 'Only on mobile devices'],
            correct: 0,
            hint: 'You cannot reconstruct the pre-measurement superposition after collapse.',
            explanation: 'Measurement is fundamentally irreversible: it destroys quantum superposition and projects the state to a basis eigenstate.'
          },
          {
            id: 'q2',
            question: 'If a qubit in state |+⟩ collapses to state |0⟩ upon measurement, what will a second measurement immediately afterward yield?',
            options: ['|0⟩ with 100% certainty', '50% chance of 1', 'A random noise number', 'It reverts to |+⟩'],
            correct: 0,
            hint: 'Once collapsed into |0⟩, the qubit remains in state |0⟩ until transformed by another gate.',
            explanation: 'Because the state has collapsed to |0⟩, immediate subsequent measurements will yield 0 with 100% certainty.'
          },
          {
            id: 'q3',
            question: 'What is the observer effect in quantum mechanics?',
            options: [
              'The act of observing or measuring a quantum system inherently alters its physical state',
              'Looking at a computer screen damages eyesight',
              'Quantum computers require cameras to function',
              'Quantum particles can see human eyes'
            ],
            correct: 0,
            hint: 'Measurement interacts with the system, forcing wavefunction projection.',
            explanation: 'In quantum physics, measurement involves physical interaction that forces the superposition into an eigenstate.'
          },
          {
            id: 'q4',
            question: 'Can you determine both amplitude α and amplitude β of an unknown single qubit from just 1 single measurement?',
            options: [
              'No, a single measurement yields only a single classical bit (0 or 1)',
              'Yes, a single measurement reveals the full wavefunction',
              'Yes, if using a high-resolution screen',
              'Only with classical algorithms'
            ],
            correct: 0,
            hint: '1 shot = 1 bit outcome. Estimating amplitudes requires quantum state tomography over many shots.',
            explanation: 'A single measurement collapses the state to 0 or 1. Reconstructing amplitudes requires repeating preparation and measurement across many runs (tomography).'
          },
          {
            id: 'q5',
            question: 'What is "Quantum State Tomography"?',
            options: [
              'The process of reconstructing a quantum state by measuring many identical copies in different bases',
              'A medical scan of human brains',
              'A method to solder computer chips',
              'A type of classical hard disk format'
            ],
            correct: 0,
            hint: 'Repeated statistical measurements across X, Y, and Z bases.',
            explanation: 'Quantum State Tomography measures an ensemble of identically prepared quantum states to reconstruct the density matrix.'
          },
          {
            id: 'q6',
            question: 'What happens to entanglement when one qubit of an entangled pair is measured?',
            options: [
              'The entangled state collapses, and the other qubit state is instantaneously determined',
              'Nothing happens to either particle',
              'The other qubit disappears into thin air',
              'Entanglement increases to infinity'
            ],
            correct: 0,
            hint: 'Measuring one half of a Bell pair collapses the joint state.',
            explanation: 'Measuring one qubit of an entangled Bell pair instantaneously collapses the joint wavefunction, correlating the outcome of the second qubit.'
          }
        ]
      },
      {
        id: 'u2l4',
        title: 'Quantum State Collapse',
        icon: '💥',
        milestone: true,
        summary: 'Unit 2 Milestone Challenge',
        explanation: 'Test your understanding of measurement collapse and amplitude calculations.',
        learningCard: {
          concept: 'Unit 2 Milestone Summary:',
          definition: '1. State vectors: |ψ⟩ = α|0⟩ + β|1⟩\n2. Normalization: |α|² + |β|² = 1\n3. Measurement: P(0) = |α|², P(1) = |β|²\n4. Collapse: Projection onto basis vectors',
          recap: 'You are now ready to tackle unitary quantum gates and Bloch sphere rotations in Unit 3!'
        },
        mathActivity: {
          type: 'formula_builder',
          prompt: 'Construct the Born Rule probability equation for measuring outcome |0⟩ given amplitude α:',
          targetSymbol: 'P(0) =',
          canonicalAnswer: '|α|²',
          tokens: ['|', 'α', '²', '|α|²', 'β', '+', '1', '0'],
          explanation: 'Born rule: The probability of measuring state 0 is the squared magnitude |α|².',
          rewardXP: 30,
          hints: [
            'Born rule states probability is the squared magnitude of amplitude.',
            'Select the term |α|².'
          ]
        },
        sliderActivity: {
          title: 'Quantum State Normalization Meter',
          prompt: 'Set the normalization balance slider to 100% to confirm total probability conservation:',
          targetProb0: 100,
          tolerance: 3,
          rewardXP: 25,
          explanation: 'Total probability across all orthogonal measurement outcomes is strictly 1.00 (100%).',
          hints: [
            'Move slider to 100%.',
            'Confirms complete probability conservation.'
          ]
        },
        codeCircuit: {
          title: 'Measurement and State Collapse in Qiskit',
          prompt: 'Select the code instruction that measures both qubits and stores outcomes into classical bits:',
          targetGoal: 'Measure quantum circuit into classical register',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.measure_all()', line2: 'counts = sampler.run(qc).result()', isCorrect: true, desc: 'Measures all qubits and collects statistical measurement shots' },
            { id: 'opt2', line1: 'qc.reset(0)', line2: 'qc.reset(1)', isCorrect: false, desc: 'Resets qubits to |0⟩ without recording measurement counts' },
            { id: 'opt3', line1: 'qc.barrier()', line2: 'qc.barrier()', isCorrect: false, desc: 'Visual barrier only, no measurement performed' }
          ],
          explanation: '`qc.measure_all()` attaches measurement meters to all qubits, projecting quantum states into classical registers.',
          rewardXP: 30,
          hints: [
            'Look for measure_all() operation.',
            'Sampler collects measurement shot distributions.'
          ]
        },
        circuitActivity: {
          title: 'Complete Unit 2 Verification Circuit',
          prompt: 'Apply the Hadamard (H) gate to create equal superposition |+⟩ before measuring:',
          gates: ['H', 'X', 'Z', 'Y'],
          correctGate: 'H',
          targetGate: 'H',
          targetState: '|+⟩',
          initialState: '|0⟩',
          explanation: 'The complete Unit 2 circuit prepares the superposition state |+⟩ and feeds it directly into the measurement stage.',
          hints: [
            'Click the Hadamard (H) gate.',
            'Run the circuit to finalize the state preparation pipeline.'
          ],
          rewardXP: 30
        },
        rewardXP: 50,
        badgeReward: 'Quantum Vector Master',
        unlockTopic: 'Quantum Logic Gates & Matrices',
        questions: [
          {
            id: 'q1',
            question: 'If the amplitude for state |0⟩ is α = √3/2, what is the exact probability of measuring 0?',
            options: ['3/4 (75%)', '1/2 (50%)', '1/4 (25%)', '100%'],
            correct: 0,
            hint: '(√3/2)² = 3/4 = 75%.',
            explanation: 'The probability is |√3/2|² = 3/4 = 75%.'
          },
          {
            id: 'q2',
            question: 'If P(0) is 75%, what must the probability P(1) equal for a valid single qubit?',
            options: ['25% (1/4)', '50%', '75%', '0%'],
            correct: 0,
            hint: 'P(0) + P(1) must equal 100%. 100% - 75% = 25%.',
            explanation: 'Because probabilities sum to 100%, P(1) = 1 - 0.75 = 0.25 (25%).'
          },
          {
            id: 'q3',
            question: 'What is the amplitude β corresponding to a probability of 25% (assuming positive real)?',
            options: ['1/2 (0.500)', '1/4', '√3/2', '1'],
            correct: 0,
            hint: '√(1/4) = 1/2.',
            explanation: 'Amplitude β = √(0.25) = 1/2 = 0.500.'
          },
          {
            id: 'q4',
            question: 'Which quantum gate creates a state with equal 50% / 50% probability amplitudes from |0⟩?',
            options: ['Hadamard (H) gate', 'Pauli-X gate', 'Pauli-Z gate', 'Identity gate'],
            correct: 0,
            hint: 'The H gate.',
            explanation: 'H|0⟩ = (1/√2)|0⟩ + (1/√2)|1⟩ with probabilities |1/√2|² = 50% for each state.'
          },
          {
            id: 'q5',
            question: 'Why is wavefunction collapse considered non-unitary?',
            options: [
              'Because measurement is non-reversible and does not preserve pre-measurement linear superpositions',
              'Because measurement uses too much CPU memory',
              'Because unitary matrices only work on paper',
              'Because collapse can only happen in winter'
            ],
            correct: 0,
            hint: 'Unitary operations are reversible; measurement projection is irreversible.',
            explanation: 'Unitary gates are deterministic and reversible (U†U = I). Measurement projection is non-unitary and irreversible.'
          },
          {
            id: 'q6',
            question: 'What will you explore in Unit 3: Quantum Gates?',
            options: [
              'Pauli-X, Pauli-Y, Pauli-Z, Phase Shifts, Hadamard, and Bloch Sphere Rotations',
              'How to write Microsoft Excel formulas',
              'Building mechanical clocks',
              'Installing printer drivers'
            ],
            correct: 0,
            hint: 'Unit 3 covers the full suite of quantum gates and matrix operations.',
            explanation: 'Unit 3 explores single and multi-qubit quantum gates, matrix multiplications, and geometric Bloch sphere rotations!'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    section: 1,
    title: 'Quantum Gates',
    subtitle: 'Pauli Gates, Phase Shifts, and Rotations',
    icon: '🚪',
    color: '#8B5CF6',
    lessons: [
      {
        id: 'u3l1',
        title: 'What is a Quantum Gate?',
        icon: '🔧',
        summary: 'Unitary matrix transformations on quantum states.',
        explanation: 'Quantum logic gates are represented by unitary matrices (U†U = I). Unlike classical AND/OR gates, all quantum operations are reversible and conserve probability.',
        video: {
          title: 'Quantum Gates as Unitary Matrix Transformations',
          url: '',
          duration: '4:10'
        },
        questions: [
          {
            id: 'q1',
            question: 'What mathematical property must quantum gates satisfy?',
            options: ['They must be Unitary matrices', 'They must lose energy', 'They must destroy qubits', 'They must output only 1s'],
            correct: 0,
            hint: 'Unitary means reversible and length-preserving.',
            explanation: 'Quantum gates are unitary operators, preserving state normalization.'
          }
        ]
      },
      {
        id: 'u3l2',
        title: 'Pauli-X Gate (NOT Gate)',
        icon: '❌',
        summary: 'The quantum bit-flip operator.',
        explanation: 'The X gate flips |0⟩ to |1⟩ and |1⟩ to |0⟩. It corresponds to a 180° rotation around the X-axis of the Bloch sphere.',
        mathActivity: {
          type: 'step_calculation',
          title: 'Calculate: Pauli-X Gate on |0⟩',
          prompt: 'Walk through the matrix-vector multiplication step-by-step.',
          rewardXP: 30,
          steps: [
            {
              stepNum: 1,
              instruction: 'Step 1: Identify the column vector representation of |0⟩',
              question: 'What is |0⟩ in vector form?',
              options: ['[1, 0]ᵀ', '[0, 1]ᵀ', '[1, 1]ᵀ', '[1/√2, 1/√2]ᵀ'],
              correct: 0,
              explanation: '|0⟩ is represented as the standard basis column vector [1, 0]ᵀ.'
            },
            {
              stepNum: 2,
              instruction: 'Step 2: Select the Pauli-X unitary matrix',
              question: 'Which 2×2 matrix represents the X gate?',
              options: ['[[0, 1], [1, 0]]', '[[1, 0], [0, 1]]', '[[1, 0], [0, -1]]', '[[0, -i], [i, 0]]'],
              correct: 0,
              explanation: 'Pauli-X is the bit-flip matrix [[0, 1], [1, 0]].'
            },
            {
              stepNum: 3,
              instruction: 'Step 3: Perform matrix multiplication: X · |0⟩',
              question: 'Compute [[0, 1], [1, 0]] · [1, 0]ᵀ:',
              options: ['[0·1 + 1·0, 1·1 + 0·0]ᵀ = [0, 1]ᵀ', '[1·1 + 0·0, 0·1 + 1·0]ᵀ = [1, 0]ᵀ', '[0, 0]ᵀ'],
              correct: 0,
              explanation: 'Row 1: 0·1+1·0=0, Row 2: 1·1+0·0=1 → Result vector is [0, 1]ᵀ.'
            },
            {
              stepNum: 4,
              instruction: 'Step 4: Interpret the final resulting quantum state',
              question: 'Which quantum basis state corresponds to vector [0, 1]ᵀ?',
              options: ['|1⟩', '|0⟩', '|+⟩', '|-⟩'],
              correct: 0,
              explanation: 'The vector [0, 1]ᵀ is |1⟩. Therefore X|0⟩ = |1⟩!'
            }
          ],
          hints: [
            'Start by representing |0⟩ as column vector [1, 0]ᵀ.',
            'Pauli-X has zeros on diagonal and ones on off-diagonal.',
            'Multiplying flips the rows, producing [0, 1]ᵀ = |1⟩.'
          ]
        },
        questions: [
          {
            id: 'q1',
            question: 'Applying an X gate to the state |0⟩ results in:',
            options: ['|1⟩', '|0⟩', 'Superposition', 'Entanglement'],
            correct: 0,
            hint: 'X is the quantum bit-flip NOT gate.',
            explanation: 'X|0⟩ = |1⟩.'
          }
        ]
      },
      {
        id: 'u3l3',
        title: 'Pauli-Y and Pauli-Z Gates',
        icon: '🔄',
        summary: 'Phase-flip and complex rotations.',
        explanation: 'The Z gate leaves |0⟩ unchanged while flipping the phase of |1⟩ to -|1⟩ (Z|1⟩ = -|1⟩). The Y gate combines bit and phase flips with imaginary units.',
        mathActivity: {
          type: 'formula_builder',
          prompt: 'Construct the rotation angle θ required to rotate |0⟩ to |+⟩ around Y-axis on the Bloch sphere:',
          targetSymbol: 'θ =',
          canonicalAnswer: 'π/2',
          tokens: ['π', '2', '4', '√', '/', '+', '-', 'θ', '1'],
          explanation: 'Rotating |0⟩ (north pole) to |+⟩ (equator) requires a 90° angle, which is π/2 radians.',
          rewardXP: 25,
          hints: [
            'The Bloch sphere north pole is at 0 radians, and the equator is at 90 degrees.',
            'Convert 90 degrees to radians: 90° = π/2.',
            'Construct π / 2.'
          ]
        },
        questions: [
          {
            id: 'q1',
            question: 'What does the Pauli-Z gate do to the state |1⟩?',
            options: ['Leaves it as |1⟩', 'Flips it to -|1⟩', 'Flips it to |0⟩', 'Erases it'],
            correct: 1,
            hint: 'Z applies a phase change of 180° (π radians).',
            explanation: 'Z|1⟩ = -|1⟩, known as a phase flip.'
          }
        ]
      },
      {
        id: 'u3l4',
        title: 'Hadamard Gate Deep Dive',
        icon: '🌀',
        milestone: true,
        summary: 'Unit 3 Milestone: Master single-qubit gates.',
        explanation: 'Applying H twice is equal to the Identity gate (H · H = I). It acts as its own inverse!',
        circuitActivity: {
          title: 'Construct Superposition Circuit',
          prompt: 'Place the gate that transforms ground state |0⟩ into equal superposition state |+⟩:',
          initialState: '|0⟩',
          targetState: '|+⟩',
          correctGate: 'H',
          availableGates: ['X', 'H', 'Z', 'Y'],
          explanation: 'The Hadamard (H) gate creates equal superposition (|0⟩ + |1⟩)/√2 from |0⟩.',
          rewardXP: 30,
          hints: [
            'Which gate maps basis states |0⟩ and |1⟩ to superposition states |+⟩ and |-⟩?',
            'It is self-inverse: H² = I.',
            'Select the H (Hadamard) gate.'
          ]
        },
        questions: [
          {
            id: 'q1',
            question: 'What is H · H equal to?',
            options: ['Identity (I)', 'Pauli-X', 'Measurement', 'Zero'],
            correct: 0,
            hint: 'Applying Hadamard twice returns the qubit to its original state.',
            explanation: 'H is self-inverse: H² = I.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    section: 1,
    title: 'Quantum Circuits',
    subtitle: 'Building Multi-Gate Quantum Programs',
    icon: '🔌',
    color: '#EC4899',
    lessons: [
      {
        id: 'u4l1',
        title: 'Reading Quantum Circuits',
        icon: '📋',
        summary: 'How circuit diagrams represent quantum time evolution.',
        explanation: 'Circuits read left to right. Horizontal lines are qubit wires, and vertical connections represent multi-qubit interactions like CNOT.',
        video: {
          title: 'Reading Quantum Circuit Timelines',
          url: '',
          duration: '3:50'
        },
        questions: [
          {
            id: 'q1',
            question: 'In which direction does quantum time flow in a circuit diagram?',
            options: ['Left to Right', 'Right to Left', 'Top to Bottom', 'Bottom to Top'],
            correct: 0,
            hint: 'Time moves forward from left to right.',
            explanation: 'Quantum circuits are executed left-to-right along the timeline.'
          }
        ]
      },
      {
        id: 'u4l2',
        title: 'Applying Sequential Gates',
        icon: '⚙️',
        summary: 'Matrix multiplication in circuit cascades.',
        explanation: 'Applying Gate 1 then Gate 2 corresponds to the matrix multiplication (G2 · G1)|ψ⟩.',
        circuitActivity: {
          title: 'Circuit Cascade: Identity Sequence',
          prompt: 'Select the gate that completes the sequence H → ? to return |+⟩ back to ground state |0⟩:',
          initialState: '|+⟩',
          targetState: '|0⟩',
          correctGate: 'H',
          availableGates: ['H', 'X', 'Z', 'Y'],
          explanation: 'Since H · H = I, applying H to |+⟩ yields |0⟩!',
          rewardXP: 25,
          hints: ['Hadamard is its own inverse.', 'H|+⟩ = |0⟩.']
        },
        questions: [
          {
            id: 'q1',
            question: 'In the circuit |0⟩ → H → X → H, what is the final state?',
            options: ['|1⟩', '|0⟩', '(|0⟩+|1⟩)/√2', 'Entangled'],
            correct: 0,
            hint: 'H X H = Z, and Z|0⟩ = |0⟩? Wait: H|0⟩=|+⟩, X|+⟩=|+⟩, H|+⟩=|0⟩.',
            explanation: 'H X H equals the Z gate. Since Z|0⟩ = |0⟩, the state remains |0⟩!'
          }
        ]
      },
      {
        id: 'u4l3',
        title: 'Circuit Depth & Decoherence',
        icon: '📐',
        summary: 'Why shorter circuits matter for physical quantum hardware.',
        explanation: 'Qubits suffer from environmental noise (decoherence). Minimizing circuit depth ensures operations finish before quantum coherence is lost.',
        questions: [
          {
            id: 'q1',
            question: 'Why do we want to minimize quantum circuit depth?',
            options: ['To avoid qubit decoherence from noise', 'To reduce file size', 'Because gates cost money', 'To make it run backwards'],
            correct: 0,
            hint: 'Quantum states decay over time.',
            explanation: 'Minimizing depth prevents decoherence from destroying quantum information.'
          }
        ]
      },
      {
        id: 'u4l4',
        title: 'Build Your First Circuit',
        icon: '🏗️',
        milestone: true,
        summary: 'Unit 4 Milestone: Construct a working circuit!',
        explanation: 'Use the interactive circuit simulator to build a state preparation circuit.',
        circuitActivity: {
          title: 'Euler Identity: Synthesize Pauli-X',
          prompt: 'Which gate completes the Euler decomposition H → [ ? ] → H to produce a NOT flip on |0⟩?',
          initialState: '|0⟩',
          targetState: '|1⟩',
          correctGate: 'Z',
          availableGates: ['Z', 'X', 'Y', 'CNOT'],
          explanation: 'By the Euler transformation H Z H = X, flipping |0⟩ to |1⟩!',
          rewardXP: 35,
          hints: ['Hadamard transforms between X and Z bases.', 'H · Z · H = X.']
        },
        questions: [
          {
            id: 'q1',
            question: 'Which gate sequence flips |0⟩ to |1⟩ using only H and Z?',
            options: ['H → Z → H', 'H → H → Z', 'Z → Z → H', 'H → Z'],
            correct: 0,
            hint: 'H Z H = X (the NOT gate!).',
            explanation: 'By the Euler rotation identities, H Z H = X, flipping |0⟩ to |1⟩.'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    section: 2,
    title: 'Entanglement & Bell States',
    subtitle: "Einstein's Spooky Action at a Distance",
    icon: '🔗',
    color: '#F59E0B',
    lessons: [
      {
        id: 'u5l1',
        title: 'What is Entanglement?',
        icon: '🤝',
        summary: 'Non-local quantum correlations between multiple qubits.',
        explanation: 'When two qubits are entangled, the state of one qubit cannot be described independently of the other, regardless of distance between them.',
        video: {
          title: 'Quantum Entanglement and Non-Locality',
          url: '',
          duration: '4:20'
        },
        questions: [
          {
            id: 'q1',
            question: 'What did Albert Einstein famously call quantum entanglement?',
            options: ['Spooky action at a distance', 'The ultimate wave', 'Impossible arithmetic', 'Quantum lightning'],
            correct: 0,
            hint: 'He was skeptical of non-local instantaneous collapse.',
            explanation: 'Einstein called it "spooky action at a distance" (spukhafte Fernwirkung).'
          }
        ]
      },
      {
        id: 'u5l2',
        title: 'The Bell States',
        icon: '🔔',
        summary: 'The four maximally entangled two-qubit basis states.',
        explanation: '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2. Created with a Hadamard gate followed by a Controlled-NOT (CNOT) gate.',
        codeCircuit: {
          title: 'Qiskit Code + Circuit: Create Bell State |Φ⁺⟩',
          prompt: 'Select the correct Python/Qiskit operations to generate maximal entanglement between q[0] and q[1]:',
          targetGoal: 'Generate Bell State (|00⟩ + |11⟩)/√2',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.h(0)', line2: 'qc.cx(0, 1)', isCorrect: true, desc: 'H on qubit 0, then CNOT(0,1)' },
            { id: 'opt2', line1: 'qc.x(0)', line2: 'qc.x(1)', isCorrect: false, desc: 'X on qubit 0, X on qubit 1' },
            { id: 'opt3', line1: 'qc.h(0)', line2: 'qc.h(1)', isCorrect: false, desc: 'H on both qubits (uncorrelated)' }
          ],
          explanation: 'qc.h(0) creates equal superposition on q[0], and qc.cx(0,1) entangles q[1] with q[0], producing |Φ⁺⟩.',
          rewardXP: 35,
          hints: [
            'First qubit needs superposition: |0⟩ → |+⟩.',
            'Second gate must entangle the control qubit with the target qubit.',
            'Select Option 1: qc.h(0) and qc.cx(0, 1).'
          ]
        },
        questions: [
          {
            id: 'q1',
            question: 'Which two gates create the Bell state |Φ⁺⟩ from |00⟩?',
            options: ['Hadamard on qubit 0, then CNOT(0,1)', 'Pauli-X on both', 'Two Hadamard gates', 'Measurement on qubit 1'],
            correct: 0,
            hint: 'H creates superposition, CNOT creates entanglement.',
            explanation: 'H on control + CNOT on target generates maximal entanglement.'
          }
        ]
      },
      {
        id: 'u5l3',
        title: 'Correlated Qubits in Practice',
        icon: '🧲',
        summary: 'Quantum teleportation and superdense coding foundations.',
        explanation: 'Measuring the first qubit of |Φ⁺⟩ and getting 0 guarantees that measuring the second qubit will also yield 0 with 100% certainty.',
        questions: [
          {
            id: 'q1',
            question: 'In state (|00⟩ + |11⟩)/√2, if qubit 1 is measured as 1, what will qubit 2 be?',
            options: ['Always 1 (100%)', 'Always 0', 'Random (50%)', 'Undefined'],
            correct: 0,
            hint: 'The states are completely correlated: |00⟩ or |11⟩.',
            explanation: 'The outcomes are perfectly correlated; if one is 1, the other is 1.'
          }
        ]
      },
      {
        id: 'u5l4',
        title: 'Entanglement Challenge',
        icon: '🏆',
        milestone: true,
        summary: 'Unit 5 Milestone: Master quantum correlations!',
        explanation: 'Demonstrate your grasp of multi-qubit states and Bell state properties.',
        questions: [
          {
            id: 'q1',
            question: 'How many classical bits of information can be transmitted using 1 entangled qubit in Superdense Coding?',
            options: ['2 classical bits', '1 classical bit', '4 classical bits', '0 bits'],
            correct: 0,
            hint: 'Entanglement doubles the channel capacity.',
            explanation: 'Superdense coding sends 2 classical bits by sending 1 qubit of an entangled pair.'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    section: 2,
    title: 'Quantum Interference',
    subtitle: 'Constructive and Destructive Wave Combinations',
    icon: '〰️',
    color: '#06B6D4',
    lessons: [
      {
        id: 'u6l1',
        title: 'Principles of Quantum Waves',
        icon: '🌊',
        summary: 'How probability amplitudes interfere like water waves.',
        explanation: 'Just like crests and troughs of ocean waves, positive and negative amplitudes add together or cancel out.',
        questions: [
          {
            id: 'q1',
            question: 'What happens when a +1/2 amplitude meets a -1/2 amplitude for the same state?',
            options: ['Destructive interference (cancels to 0)', 'Constructive interference (doubles)', 'Explosion', 'Nothing'],
            correct: 0,
            hint: '+1/2 + (-1/2) = 0.',
            explanation: 'Equal and opposite amplitudes destructively interfere to zero probability.'
          }
        ]
      },
      {
        id: 'u6l2',
        title: 'Constructive Interference',
        icon: '📈',
        summary: 'Amplifying correct algorithmic answers.',
        explanation: 'Quantum algorithms are crafted so paths leading to the correct answer constructively amplify their probability to near 100%.',
        questions: [
          {
            id: 'q1',
            question: 'In quantum search algorithms, constructive interference is used to:',
            options: ['Boost the probability of measuring the correct answer', 'Slow down the clock speed', 'Cool the processor', 'Lock the qubit'],
            correct: 0,
            hint: 'We want the right answer to be measured with highest probability.',
            explanation: 'Constructive interference boosts the target state probability.'
          }
        ]
      },
      {
        id: 'u6l3',
        title: 'Destructive Interference',
        icon: '📉',
        summary: 'Canceling wrong computation paths.',
        explanation: 'Phase shifts are applied to wrong states so their amplitudes sum to zero.',
        questions: [
          {
            id: 'q1',
            question: 'Destructive interference reduces the measurement probability of wrong states to:',
            options: ['0% (or near 0%)', '50%', '100%', 'Infinity'],
            correct: 0,
            hint: 'Canceling amplitudes removes incorrect answers.',
            explanation: 'Destructive interference drives undesired state probabilities to zero.'
          }
        ]
      },
      {
        id: 'u6l4',
        title: 'Interference Challenge',
        icon: '🎖️',
        milestone: true,
        summary: 'Unit 6 Milestone',
        explanation: 'Synthesize interference principles in quantum circuit design.',
        questions: [
          {
            id: 'q1',
            question: 'The famous double-slit experiment demonstrates that quantum particles behave as:',
            options: ['Both waves and particles', 'Only classical billiard balls', 'Pure energy without mass', 'Sound waves'],
            correct: 0,
            hint: 'Wave-particle duality.',
            explanation: 'Particles exhibit interference patterns, proving wave-particle duality.'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    section: 2,
    title: 'Quantum Algorithms',
    subtitle: 'Deutsch-Jozsa, Grover Search & Speedups',
    icon: '🧮',
    color: '#6366F1',
    lessons: [
      {
        id: 'u7l1',
        title: 'Why Quantum Algorithms?',
        icon: '🚀',
        summary: 'Understanding quantum speedup vs classical complexity.',
        explanation: 'Quantum computers do not make all code faster; they provide polynomial or exponential speedups for specific mathematical structures.',
        questions: [
          {
            id: 'q1',
            question: 'Do quantum computers speed up every type of computer program?',
            options: ['No, only specific algorithms with quantum structure', 'Yes, everything runs at light speed', 'Only web browsers', 'Only video games'],
            correct: 0,
            hint: 'Quantum speedup applies to problems with mathematical structure like factoring or search.',
            explanation: 'Speedups occur only where quantum superposition and interference apply.'
          }
        ]
      },
      {
        id: 'u7l2',
        title: 'Deutsch-Jozsa Algorithm',
        icon: '🔍',
        summary: 'The first deterministic quantum algorithm proving speedup.',
        explanation: 'Determines whether a black-box function is constant or balanced in just ONE single query, whereas classical computing requires 2^(n-1) + 1 queries.',
        questions: [
          {
            id: 'q1',
            question: 'How many evaluations does the Deutsch-Jozsa algorithm need to evaluate an n-bit function?',
            options: ['Exactly 1 query', '2^n queries', 'n/2 queries', 'Infinite queries'],
            correct: 0,
            hint: 'Quantum parallelism queries all inputs in one shot.',
            explanation: 'The algorithm evaluates the global property in a single quantum query.'
          }
        ]
      },
      {
        id: 'u7l3',
        title: "Grover's Search Algorithm",
        icon: '🔎',
        summary: 'Quadratic speedup for unstructured database search.',
        explanation: 'Searching an unsorted database of N items takes O(N) classically, but Grover algorithm finds the target in O(√N) steps using amplitude amplification.',
        questions: [
          {
            id: 'q1',
            question: "What is the time complexity of Grover's algorithm for searching N items?",
            options: ['O(√N)', 'O(N)', 'O(N²)', 'O(log N)'],
            correct: 0,
            hint: 'Square root speedup.',
            explanation: "Grover's algorithm provides quadratic O(√N) speedup."
          }
        ]
      },
      {
        id: 'u7l4',
        title: 'Grover Amplitude Amplification',
        icon: '🏅',
        milestone: true,
        summary: 'Unit 7 Milestone: Quantum search mastery.',
        explanation: 'Repeatedly applying the Oracle and Diffusion operator rotates the state vector directly towards the marked target.',
        questions: [
          {
            id: 'q1',
            question: 'For a database of 1,000,000 items, roughly how many queries does Grover need?',
            options: ['~1,000 queries (√1,000,000)', '1,000,000 queries', '500,000 queries', '1 query'],
            correct: 0,
            hint: 'Take the square root of 1,000,000.',
            explanation: '√1,000,000 = 1,000 queries, a massive 1000x reduction!'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    section: 3,
    title: 'Quantum Programming & SDKs',
    subtitle: 'Qiskit, Cirq, Pennylane & Transpilation',
    icon: '💻',
    color: '#3B82F6',
    lessons: [
      {
        id: 'u8l1',
        title: 'Quantum Programming Concepts',
        icon: '📝',
        summary: 'Writing quantum code in Python.',
        explanation: 'Modern quantum software kits allow engineers to define quantum circuits in Python and dispatch jobs to real cloud quantum processors (QPUs).',
        codeCircuit: {
          title: 'Interactive Qiskit Circuit Construction',
          prompt: 'Select the code instruction that applies a Hadamard gate to qubit 0:',
          targetGoal: 'Put qubit 0 into superposition',
          codeSnippets: [
            { id: 'opt1', line1: 'qc.h(0)', line2: 'qc.measure(0, 0)', isCorrect: true, desc: 'qc.h(0) puts qubit 0 into superposition' },
            { id: 'opt2', line1: 'qc.x(0)', line2: 'qc.measure(0, 0)', isCorrect: false, desc: 'qc.x(0) applies bit-flip NOT gate' },
            { id: 'opt3', line1: 'qc.z(0)', line2: 'qc.measure(0, 0)', isCorrect: false, desc: 'qc.z(0) applies phase-flip gate' }
          ],
          explanation: 'In Qiskit, qc.h(0) applies the Hadamard gate to qubit wire 0.',
          rewardXP: 30,
          hints: ['Hadamard gate function in Qiskit is .h(qubit_index).']
        },
        questions: [
          {
            id: 'q1',
            question: 'What is a physical quantum processor chip called?',
            options: ['QPU (Quantum Processing Unit)', 'GPU', 'CPU', 'TPU'],
            correct: 0,
            hint: 'Quantum equivalent of CPU/GPU.',
            explanation: 'QPUs are hardware chips designed to manipulate physical qubits.'
          }
        ]
      },
      {
        id: 'u8l2',
        title: 'Open Source Quantum SDKs',
        icon: '📦',
        summary: 'Qiskit, Cirq, and Pennylane frameworks.',
        explanation: 'Qiskit (IBM), Cirq (Google), and Pennylane (Xanadu) provide circuit construction, noise modeling, and variational optimization engines.',
        questions: [
          {
            id: 'q1',
            question: 'Which framework is famous for Quantum Machine Learning and differentiable quantum circuits?',
            options: ['PennyLane', 'Excel', 'Notepad', 'Photoshop'],
            correct: 0,
            hint: 'Developed by Xanadu for hybrid QML.',
            explanation: 'PennyLane specializes in quantum differentiable programming and hybrid QML.'
          }
        ]
      },
      {
        id: 'u8l3',
        title: 'Shots & Probability Distributions',
        icon: '🔨',
        summary: 'Why we run quantum programs multiple times (shots).',
        explanation: 'Because quantum measurement produces probabilistic bitstrings, we execute the circuit hundreds of times ("shots") to construct a frequency histogram of states.',
        questions: [
          {
            id: 'q1',
            question: 'What does "running 1024 shots" mean in quantum programming?',
            options: ['Executing and measuring the circuit 1024 times', 'Firing 1024 lasers', 'Using 1024 qubits', 'Writing 1024 lines of code'],
            correct: 0,
            hint: 'Repeated executions give the statistical probability.',
            explanation: 'Each shot is one fresh run and measurement of the circuit.'
          }
        ]
      },
      {
        id: 'u8l4',
        title: 'Circuit Transpilation',
        icon: '▶️',
        milestone: true,
        summary: 'Unit 8 Milestone: Compile to physical hardware.',
        explanation: 'Transpilation rewrites abstract gates into native physical gates supported by the device topology (e.g. CZ, SX, RZ).',
        questions: [
          {
            id: 'q1',
            question: 'What is the role of a quantum transpiler?',
            options: ['Translate high-level gates into hardware-native gates and optimize routing', 'Translate English to Spanish', 'Calculate electricity bill', 'Make qubits larger'],
            correct: 0,
            hint: 'Matches the algorithm to the specific chip architecture.',
            explanation: 'Transpilation maps circuits to chip topology and minimizes gate depth.'
          }
        ]
      }
    ]
  },
  {
    id: 9,
    section: 3,
    title: 'Advanced Quantum Computing',
    subtitle: 'Quantum Fourier Transform & Error Correction',
    icon: '🧬',
    color: '#8B5CF6',
    lessons: [
      {
        id: 'u9l1',
        title: 'Quantum Fourier Transform (QFT)',
        icon: '🎵',
        summary: 'Transforming basis states into phase frequencies exponentially fast.',
        explanation: 'QFT is the quantum analogue of the discrete Fourier transform. While classical FFT takes O(N log N), QFT runs in O((log N)²) = O(n²) gates!',
        questions: [
          {
            id: 'q1',
            question: 'What speedup does the Quantum Fourier Transform provide over classical FFT?',
            options: ['Exponential speedup: O((log N)²) vs O(N log N)', 'No speedup', '10% faster', 'Twice as slow'],
            correct: 0,
            hint: 'Logarithmic polynomial complexity.',
            explanation: 'QFT operates on 2^n states using only O(n²) quantum gates.'
          }
        ]
      },
      {
        id: 'u9l2',
        title: 'Quantum Phase Estimation (QPE)',
        icon: '🎯',
        summary: 'Extracting eigenvalues of unitary operators.',
        explanation: 'QPE estimates the phase θ in U|ψ⟩ = e^(2πiθ)|ψ⟩. It serves as the core subroutine in Shor algorithm and quantum chemistry simulation.',
        questions: [
          {
            id: 'q1',
            question: 'Quantum Phase Estimation uses which quantum transform as its final decoding step?',
            options: ['Inverse Quantum Fourier Transform (QFT†)', 'Hadamard cascade', 'Pauli-X loop', 'Classical sorting'],
            correct: 0,
            hint: 'Applies inverse QFT to readout the phase into computational basis.',
            explanation: 'Inverse QFT converts the phase information into measurable bit probabilities.'
          }
        ]
      },
      {
        id: 'u9l3',
        title: 'Quantum Error Correction (QEC)',
        icon: '🛡️',
        summary: 'Protecting fragile quantum information with surface codes.',
        explanation: 'Due to the No-Cloning Theorem, we cannot copy qubits. Instead, QEC encodes one "logical qubit" across an entangled lattice of dozens of "physical qubits".',
        questions: [
          {
            id: 'q1',
            question: "Why can't quantum error correction simply duplicate qubits like classical computing does?",
            options: ['The No-Cloning Theorem forbids copying unknown quantum states', 'It is too expensive', 'Qubits are too small', 'Classical bits are faster'],
            correct: 0,
            hint: 'A fundamental theorem in quantum mechanics prohibits exact cloning.',
            explanation: 'The No-Cloning theorem proves an unknown quantum state cannot be duplicated.'
          }
        ]
      },
      {
        id: 'u9l4',
        title: 'Fault-Tolerant Quantum Thresholds',
        icon: '🌫️',
        milestone: true,
        summary: 'Unit 9 Milestone: Fault tolerance engineering.',
        explanation: 'When physical error rates drop below the fault-tolerance threshold (~1%), adding more physical qubits exponentially decreases logical errors.',
        questions: [
          {
            id: 'q1',
            question: 'What is a "Logical Qubit"?',
            options: ['A fault-tolerant qubit encoded across multiple physical qubits with error correction', 'A software bug', 'A regular classical bit', 'A math equation only'],
            correct: 0,
            hint: 'Protected from noise by quantum error correction codes.',
            explanation: 'A logical qubit is protected against physical decoherence by redundant entanglement.'
          }
        ]
      }
    ]
  },
  {
    id: 10,
    section: 3,
    title: 'Quantum Mastery',
    subtitle: "Shor's Algorithm, Cryptography & VQE",
    icon: '👑',
    color: '#D946EF',
    lessons: [
      {
        id: 'u10l1',
        title: "Shor's Factoring Algorithm",
        icon: '🔐',
        summary: 'Breaking RSA encryption with period finding.',
        explanation: 'Peter Shor discovered that finding the period of modular exponentiation using QFT allows large numbers to be factored in polynomial time O((log N)³).',
        questions: [
          {
            id: 'q1',
            question: 'Which classical cryptographic system is vulnerable to Shor algorithm?',
            options: ['RSA & Elliptic Curve Cryptography', 'One-Time Pad', 'Post-Quantum Lattice cryptography', 'Morse Code'],
            correct: 0,
            hint: 'RSA relies on the hardness of factoring large prime products.',
            explanation: 'RSA and ECC are broken by polynomial-time quantum period finding.'
          }
        ]
      },
      {
        id: 'u10l2',
        title: 'Quantum Key Distribution (QKD)',
        icon: '🔑',
        summary: 'Unconditionally secure communication via BB84 protocol.',
        explanation: 'QKD uses quantum mechanics to exchange encryption keys. Any eavesdropper (Eve) trying to intercept photons inevitably collapses their states, alerting Alice and Bob!',
        questions: [
          {
            id: 'q1',
            question: 'Why is eavesdropping detectable in the BB84 protocol?',
            options: ['Measurement inevitably disturbs the quantum states and raises the error rate', 'The server beeps', 'Cameras catch the hacker', 'The internet disconnects'],
            correct: 0,
            hint: 'Observation collapses quantum states.',
            explanation: 'Eavesdropping induces measurable state collapse, revealing the intrusion.'
          }
        ]
      },
      {
        id: 'u10l3',
        title: 'Variational Quantum Eigensolvers (VQE)',
        icon: '📈',
        summary: 'Near-term NISQ algorithms for chemistry and material discovery.',
        explanation: 'VQE uses a hybrid loop: quantum processor calculates molecular expectation values, and classical optimizer tunes parameterized gate angles to find ground state energy.',
        questions: [
          {
            id: 'q1',
            question: 'What is VQE primarily used for in modern science?',
            options: ['Simulating molecular bonds and chemical reactions for drug discovery', 'Playing video games', 'Formatting hard drives', 'Streaming movies'],
            correct: 0,
            hint: 'Ground state energy calculations in quantum chemistry.',
            explanation: 'VQE accurately calculates molecular electron ground states for materials and medicine.'
          }
        ]
      },
      {
        id: 'u10l4',
        title: 'The Grand Quantum Master Challenge',
        icon: '🌟',
        milestone: true,
        summary: 'Final Milestone: Prove your quantum supremacy!',
        explanation: 'You have traversed all 10 units! From single qubits to fault-tolerant quantum algorithms, you now possess comprehensive quantum mastery.',
        questions: [
          {
            id: 'q1',
            question: 'What three core quantum properties empower quantum computing supremacy?',
            options: ['Superposition, Entanglement, and Quantum Interference', 'Gravity, Magnetism, and Electricity', 'RAM, SSD, and CPU', 'Addition, Subtraction, and Division'],
            correct: 0,
            hint: 'The holy trinity of quantum information theory.',
            explanation: 'Superposition, Entanglement, and Quantum Interference form the foundation of quantum advantage!'
          }
        ]
      }
    ]
  }
];

export const COURSE_UNITS = UNITS;
