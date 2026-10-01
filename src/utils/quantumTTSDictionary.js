/**
 * Quantum and Mathematical Terminology Pronunciation Dictionary & Formatter
 *
 * Ensures technical terms, Dirac bra-ket notations, Greek symbols,
 * and quantum gates are spoken naturally by SpeechSynthesis.
 */

export const QUANTUM_REPLACEMENTS = [
  // Dirac Bra-Ket Notations & States
  { pattern: /\|0⟩/g, replacement: ' zero state ' },
  { pattern: /\|1⟩/g, replacement: ' one state ' },
  { pattern: /\|00⟩/g, replacement: ' zero zero state ' },
  { pattern: /\|01⟩/g, replacement: ' zero one state ' },
  { pattern: /\|10⟩/g, replacement: ' one zero state ' },
  { pattern: /\|11⟩/g, replacement: ' one one state ' },
  { pattern: /\|ψ⟩/g, replacement: ' quantum state psi ' },
  { pattern: /\|φ⟩/g, replacement: ' quantum state phi ' },
  { pattern: /\|Ψ⟩/g, replacement: ' quantum state capital Psi ' },
  { pattern: /\|Φ⟩/g, replacement: ' quantum state capital Phi ' },
  { pattern: /⟨0\|/g, replacement: ' bra zero ' },
  { pattern: /⟨1\|/g, replacement: ' bra one ' },
  { pattern: /⟨ψ\|/g, replacement: ' bra psi ' },
  { pattern: /⟨φ\|/g, replacement: ' bra phi ' },

  // Greek Symbols in Quantum Physics
  { pattern: /\bα\b/g, replacement: 'alpha' },
  { pattern: /\bβ\b/g, replacement: 'beta' },
  { pattern: /\bγ\b/g, replacement: 'gamma' },
  { pattern: /\bθ\b/g, replacement: 'theta' },
  { pattern: /\bλ\b/g, replacement: 'lambda' },
  { pattern: /\bπ\b/g, replacement: 'pi' },
  { pattern: /\bψ\b/g, replacement: 'psi' },
  { pattern: /\bφ\b/g, replacement: 'phi' },
  { pattern: /\bΨ\b/g, replacement: 'Psi' },
  { pattern: /\bΦ\b/g, replacement: 'Phi' },
  { pattern: /\bℏ\b/g, replacement: 'h-bar' },

  // Math Notation & Operators
  { pattern: /1\/√2/g, replacement: 'one over the square root of two' },
  { pattern: /√2/g, replacement: 'square root of two' },
  { pattern: /√/g, replacement: 'square root of ' },
  { pattern: /E\s*=\s*mc²/g, replacement: 'Energy equals mass times the speed of light squared' },
  { pattern: /²/g, replacement: ' squared' },
  { pattern: /³/g, replacement: ' cubed' },
  { pattern: /≠/g, replacement: ' does not equal ' },
  { pattern: /≈/g, replacement: ' approximately equals ' },
  { pattern: /≤/g, replacement: ' is less than or equal to ' },
  { pattern: /≥/g, replacement: ' is greater than or equal to ' },
  { pattern: /➔|→/g, replacement: ' leads to ' },
  { pattern: /⊕/g, replacement: ' XOR ' },
  { pattern: /⊗/g, replacement: ' tensor product with ' },
  { pattern: /\^/g, replacement: ' to the power of ' },
  { pattern: /\+/g, replacement: ' plus ' },
  { pattern: /=/g, replacement: ' equals ' },

  // Quantum Gates & Common Acronyms
  { pattern: /\bH-Gate\b|\bH Gate\b/gi, replacement: 'Hadamard gate' },
  { pattern: /\bX-Gate\b|\bX Gate\b|\bPauli-X\b/gi, replacement: 'Pauli-X NOT gate' },
  { pattern: /\bY-Gate\b|\bY Gate\b|\bPauli-Y\b/gi, replacement: 'Pauli-Y gate' },
  { pattern: /\bZ-Gate\b|\bZ Gate\b|\bPauli-Z\b/gi, replacement: 'Pauli-Z phase flip gate' },
  { pattern: /\bCNOT\b|\bC-NOT\b/gi, replacement: 'Controlled NOT gate' },
  { pattern: /\bQubit\b/gi, replacement: 'Qubit' },
  { pattern: /\bQubits\b/gi, replacement: 'Qubits' }
];

/**
 * Converts a raw text or quantum expression into naturally speakable English for TTS.
 * If custom narrationText is provided, it is prioritized and formatted.
 */
export function formatForNarration(text, customNarrationText) {
  if (customNarrationText && typeof customNarrationText === 'string') {
    return cleanUpTTS(customNarrationText);
  }

  if (!text || typeof text !== 'string') return '';

  let spoken = text;

  // Apply quantum symbol replacements
  QUANTUM_REPLACEMENTS.forEach(({ pattern, replacement }) => {
    spoken = spoken.replace(pattern, replacement);
  });

  return cleanUpTTS(spoken);
}

/**
 * Strips distracting emojis and markdown symbols while preserving punctuation for natural pauses.
 */
export function cleanUpTTS(text) {
  if (!text || typeof text !== 'string') return '';

  return text
    // Remove emojis
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{200D}\u{FE0F}]/gu, '')
    // Remove markdown formatting (bold, italic, code ticks, hashtags)
    .replace(/[*_#`~[\]]/g, '')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits text into readable sentences with punctuation preserved.
 */
export function splitIntoSentences(text) {
  if (!text || typeof text !== 'string') return [];

  // Match sentence ending punctuation (., !, ?) followed by whitespace or end of string
  const rawSentences = text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (rawSentences.length === 0 && text.trim()) {
    return [text.trim()];
  }

  return rawSentences;
}
