const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1oJiSoHOtRVTlApoxLbIDbIIxiXahNfQqFB6HljC_0l8/export?format=csv';

const ARABIC_MAP = {
    'أ': 'A1', 'إ': 'A1', 'آ': 'A1', 'ا': 'A1',
    'ب': 'A2', 'ت': 'A3', 'ث': 'A4', 'ج': 'A5', 'ح': 'A6', 'خ': 'A7',
    'د': 'A8', 'ذ': 'A9', 'ر': 'A10', 'ز': 'A11', 'س': 'A12', 'ش': 'A13',
    'ص': 'A14', 'ض': 'A15', 'ط': 'A16', 'ظ': 'A17', 'ع': 'A18', 'غ': 'A19',
    'ف': 'A20', 'ق': 'A21', 'ك': 'A22', 'ل': 'A23', 'م': 'A24', 'ن': 'A25',
    'ه': 'A26', 'ة': 'A26', 'و': 'A27', 'ؤ': 'A27', 'ي': 'A28', 'ى': 'A28', 'ئ': 'A28'
};

const ENGLISH_MAP = {
    'a': 'E1', 'b': 'E2', 'c': 'E3', 'd': 'E4', 'e': 'E5', 'f': 'E6',
    'g': 'E7', 'h': 'E8', 'i': 'E9', 'j': 'E10', 'k': 'E11', 'l': 'E12',
    'm': 'E13', 'n': 'E14', 'o': 'E15', 'p': 'E16', 'q': 'E17', 'r': 'E18',
    's': 'E19', 't': 'E20', 'u': 'E21', 'v': 'E22', 'w': 'E23', 'x': 'E24',
    'y': 'E25', 'z': 'E26'
};

const NUMBER_MAP = {
    '0': 'N0', '1': 'N1', '2': 'N2', '3': 'N3', '4': 'N4',
    '5': 'N5', '6': 'N6', '7': 'N7', '8': 'N8', '9': 'N9'
};

const SYMBOL_MAP = {
    '!': 'S1', '?': 'S2', '؟': 'S2', '.': 'S3', ',': 'S4', '،': 'S4', '@': 'S5', '#': 'S6', '%': 'S7', '&': 'S8',
    ':': 'S9', ';': 'S10', '؛': 'S10', '…': 'S11', '‼': 'S12', '⁉': 'S13',
    '-': 'S14', '+': 'S15', '=': 'S16', '~': 'S17', '^': 'S18', '*': 'S19', '|': 'S20',
    '$': 'S21', '§': 'S22', '¶': 'S23', '°': 'S24', '©': 'S25', '®': 'S26', '™': 'S27',
    '<': 'S28', '>': 'S29', '≤': 'S30', '≥': 'S31', '≠': 'S32', '÷': 'S33', '×': 'S34',
    '√': 'S35', '∞': 'S36',
    '(': 'S37', ')': 'S38', '[': 'S39', ']': 'S40', '{': 'S41', '}': 'S42',
    '⟨': 'S43', '⟩': 'S44',
    '↑': 'S45', '↓': 'S46', '←': 'S47', '→': 'S48', '↔': 'S49', '↕': 'S50',
    '☢': 'S51', '☠': 'S52', '⚠': 'S53', '⏳': 'S54', '⌛': 'S55',
    '🔒': 'S56', '🔓': 'S57', '📡': 'S58', '🧨': 'S59'
};

// Arabic letters mapped to sequential numbers for "ارقام" cipher
const ARABIC_NUMBER_MAP = {
    'ا': '1', 'ب': '2', 'ت': '3', 'ث': '4', 'ج': '5', 'ح': '6', 'خ': '7',
    'د': '8', 'ذ': '9', 'ر': '10', 'ز': '11', 'س': '12', 'ش': '13', 'ص': '14',
    'ض': '15', 'ط': '16', 'ظ': '17', 'ع': '18', 'غ': '19', 'ف': '20', 'ق': '21',
    'ك': '22', 'ل': '23', 'م': '24', 'ن': '25', 'ه': '26', 'و': '27', 'ي': '28'
};

const DISPLAY_ELEMENT = document.getElementById('message-display');
const DEFAULT_TEXT = 'لا توجد رسائل واردة';
let currentOriginalText = ""; // Store for secret reveal
let currentCipherType = "تشفير"; // Default cipher type

// Morse Code Map (Custom per User Request)
const MORSE_MAP = {
    // English
    a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.',
    g: '--.', h: '....', i: '..', j: '.---', k: '-.-', l: '.-..',
    m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.',
    s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
    y: '-.--', z: '--..',

    // Arabic (ITU)
    'ا': '.-', 'أ': '.-',
    'ب': '-...', 'ت': '-', 'ث': '-.-.',
    'ج': '.---', 'ح': '....', 'خ': '---',
    'د': '-..', 'ذ': '--..',
    'ر': '.-.', 'ز': '---.',
    'س': '...', 'ش': '----',
    'ص': '-..-', 'ض': '...-',
    'ط': '..-', 'ظ': '-.--',
    'ع': '.-.-', 'غ': '--.',
    'ف': '..-.', 'ق': '--.-',
    'ك': '-.-', 'ل': '.-..',
    'م': '--', 'ن': '-.',
    'ه': '....', 'ة': '....',
    'و': '.--', 'ي': '..',
    'ء': '.',

    // Numbers
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',

    // Symbols
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
    '-': '-....-', '/': '-..-.', ' ': '/'
};

async function fetchMessages() {
    try {
        const response = await fetch(SHEET_URL + '&t=' + Date.now());
        const text = await response.text();
        const rows = parseCSV(text);

        if (rows.length === 0) {
            updateDisplay(null);
            return;
        }

        if (rows.length === 0) {
            updateDisplay(null);
            return;
        }

        // Find the last valid row (ignore empty rows at the bottom)
        const validRows = rows.filter(r => r.text && r.text.trim() && r.date && r.date.trim());
        // DEBUG: Log validRows to see what we actually have
        console.log("Valid Rows:", validRows);

        if (validRows.length === 0) {
            updateDisplay(null);
            return;
        }

        const lastRow = validRows[validRows.length - 1];
        console.log("Selected Last Row (JSON):", JSON.stringify(lastRow)); // DEBUG STRINGIFY

        processMessage(lastRow.text, lastRow.date, lastRow.ctype);

    } catch (e) {
        console.error('Error fetching messages:', e);
    }
}

function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    // Header: Timestamp, Text, CipherType
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        // Skip empty lines
        if (!lines[i].trim()) continue;

        console.log(`Processing Line ${i}:`, lines[i]); // DEBUG RAW LINE

        const parts = parseCSVLine(lines[i]);
        console.log(`Parsed Parts ${i}:`, parts); // DEBUG PARSED PARTS

        if (parts.length >= 2) {
            // Explicitly get the type string and trim it immediately
            let typeStr = parts[2] ? parts[2].toString().trim() : '';
            if (!typeStr) typeStr = 'تشفير'; // Default

            result.push({
                text: parts[1],
                date: parts[0],
                ctype: typeStr
            });
        }
    }
    return result;
}

function parseCSVLine(line) {
    // Fast path: if no quotes, just split by comma
    if (!line.includes('"')) {
        return line.split(',').map(s => s.trim());
    }

    const result = [];
    let current = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

function parseArabicDate(dateStr) {
    let cleanStr = dateStr
        .replace(/ص/g, 'AM')
        .replace(/م/g, 'PM');

    let date = new Date(cleanStr);

    if (isNaN(date.getTime())) {
        const parts = cleanStr.match(/(\d{1,2}:\d{2}(?::\d{2})?)\s*(AM|PM)?\s*(\d{4}\/\d{1,2}\/\d{1,2})/i);
        if (parts) {
            const reorganized = `${parts[3]} ${parts[1]} ${parts[2] || ''}`;
            date = new Date(reorganized);
        }
    }
    return date;
}

function processMessage(text, dateStr, ctype = 'تشفير') {
    const msgDate = parseArabicDate(dateStr);
    const now = new Date();

    console.log("Raw Date:", dateStr);
    console.log("Parsed Date:", msgDate);
    console.log("Cipher Type (ctype):", ctype);
    console.log("Now:", now);

    if (isNaN(msgDate.getTime())) {
        console.error("Invalid date:", dateStr);
        updateDisplay(null);
        return;
    }

    const diffMs = now - msgDate;
    const diffMins = diffMs / 1000 / 60;

    console.log("Diff Mins:", diffMins);

    if (diffMins >= 0 && diffMins <= 10) {
        currentOriginalText = text; // Store for secret reveal
        currentCipherType = ctype;

        let cipher;
        let effectiveType = ctype ? ctype.toString().trim().toLowerCase() : '';
        let processText = text;

        // FAILSAFE: Check if text starts with "morse:/مورس:" or "ارقام:" to force mode
        if (processText.startsWith('morse:') || processText.startsWith('مورس:')) {
            effectiveType = 'morse';
            processText = processText.replace(/^(morse:|مورس:)\s*/i, ''); // Remove prefix
            currentOriginalText = processText; // Update original text to match
        }
        if (processText.startsWith('ارقام:') || processText.toLowerCase().startsWith('numbers:')) {
            effectiveType = 'ارقام';
            processText = processText.replace(/^(ارقام:|numbers:)\s*/i, '');
            currentOriginalText = processText;
        }

        // Check Type
        if (effectiveType.includes('مورس') || effectiveType.includes('morse')) {
            cipher = encipherMorse(processText);
        } else if (effectiveType.includes('ارقام') || effectiveType.includes('numbers')) {
            cipher = encipherNumbers(processText);
        } else {
            cipher = encipher(processText);
        }

        // type code will be displayed separately in top-left
        // (value stored via currentCipherType earlier)

        updateDisplay(cipher);
    } else {
        currentOriginalText = "";
        console.log("Message expired or in future");
        updateDisplay(null);
    }
}

// Morse Code Encoder
function encipherMorse(text) {
    const chars = text.toLowerCase().split('');
    let output = [];

    for (let char of chars) {
        if (char === ' ') {
            output.push('/'); // Word separator in Morse
        } else if (MORSE_MAP[char]) {
            output.push(MORSE_MAP[char]);
        }
        // Ignore unmapped
    }

    return output.join(' ');
}

// Numbers-only Arabic cipher (no spaces preserved)
function encipherNumbers(text) {
    const chars = text.split('');
    let output = [];
    for (let char of chars) {
        if (char === ' ') continue; // drop spaces
        const code = ARABIC_NUMBER_MAP[char];
        if (code) {
            output.push(code);
        }
        // ignore any character that isn't in the map
    }
    return output.join('-');
}

// mapping of cipher types to short codes (for analysts)
const TYPE_CODE = {
    morse: 'A',        // مورس -> A
    تشفير: 'B',        // default encoded map -> B
    ارقام: 'C'         // numbers cipher -> C
};

function getTypeCode(ctype) {
    if (!ctype) return '';
    const key = ctype.toString().trim().toLowerCase();
    if (key.includes('مورس') || key.includes('morse')) return TYPE_CODE.morse;
    if (key.includes('ارقام') || key.includes('numbers')) return TYPE_CODE['ارقام'];
    // anything else treated as general encryption
    return TYPE_CODE['تشفير'];
}

function encipher(text) {
    // New Logic: 
    // Join continuous codes with '-'.
    // Separate words with ' _ '.

    const chars = text.split('');
    let output = [];
    let currentWord = [];

    function flushWord() {
        if (currentWord.length > 0) {
            output.push(currentWord.join('-'));
            currentWord = [];
        }
    }

    for (let char of chars) {
        let code = null;

        // Check Maps explicitly
        if (ARABIC_MAP[char]) {
            code = ARABIC_MAP[char];
        } else if (ENGLISH_MAP[char.toLowerCase()]) {
            code = ENGLISH_MAP[char.toLowerCase()];
        } else if (NUMBER_MAP[char]) {
            code = NUMBER_MAP[char];
        } else if (SYMBOL_MAP[char]) {
            code = SYMBOL_MAP[char];
        } else if (char === ' ') {
            flushWord();
            output.push('_');
            continue; // Skip pushing to word
        }

        if (code) {
            currentWord.push(code);
        } else {
            // Ignore unmapped characters? Or skip?
            // User didn't specify fallback. We skip.
        }
    }

    flushWord();

    // Join with spaces
    // output array will look like: ["A24-A10", "_", "E1-E2"]
    return output.join(' ');
}

function updateDisplay(text) {
    const typeElem = document.getElementById('type-code');
    if (text) {
        DISPLAY_ELEMENT.textContent = text;
        DISPLAY_ELEMENT.style.setProperty('--text-direction', 'ltr');
        // show type code
        if (typeElem) {
            const code = getTypeCode(currentCipherType);
            typeElem.textContent = code || '';
        }

        // Dynamic Font Sizing - More aggressive for mobile
        const isMobile = window.innerWidth < 768;
        let baseFontSize = isMobile ? '1.8rem' : '2.5rem';

        DISPLAY_ELEMENT.style.fontSize = baseFontSize;
        DISPLAY_ELEMENT.style.lineHeight = '1.3';

        // Scale down based on text length
        if (text.length > 40) {
            DISPLAY_ELEMENT.style.fontSize = isMobile ? '1.4rem' : '1.8rem';
            DISPLAY_ELEMENT.style.lineHeight = '1.2';
        }
        if (text.length > 80) {
            DISPLAY_ELEMENT.style.fontSize = isMobile ? '1.1rem' : '1.4rem';
        }
        if (text.length > 120) {
            DISPLAY_ELEMENT.style.fontSize = isMobile ? '0.9rem' : '1.2rem';
        }
        if (text.length > 180) {
            DISPLAY_ELEMENT.style.fontSize = isMobile ? '0.75rem' : '1rem';
        }

    } else {
        DISPLAY_ELEMENT.textContent = DEFAULT_TEXT;
        DISPLAY_ELEMENT.style.setProperty('--text-direction', 'rtl');
        DISPLAY_ELEMENT.style.fontSize = '2.5rem'; // Reset
        if (typeElem) typeElem.textContent = '';
    }
}

// Initial Call
fetchMessages();
setInterval(fetchMessages, 5000);

// ========== AUDIO SYSTEM ==========
let isMuted = false;
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playTone(frequency, duration, type = 'square') {
    if (isMuted || !audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

function playBeep() {
    playTone(800, 0.1);
}

function playCopySound() {
    playTone(1200, 0.05);
    setTimeout(() => playTone(1500, 0.05), 60);
}

function playRefreshSound() {
    playTone(400, 0.1);
    setTimeout(() => playTone(600, 0.1), 100);
}

function playMorseForText(text) {
    if (isMuted) return;
    // Play a simplified beep pattern
    let delay = 0;
    const codes = text.split('-');
    codes.forEach((code, i) => {
        if (code === '_') {
            delay += 200; // Pause for space
        } else {
            setTimeout(() => playTone(700, 0.08), delay);
            delay += 100;
        }
        if (i > 20) return; // Limit for performance
    });
}

function playButtonClick() {
    playTone(500, 0.03);
}

// Mute Toggle
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

muteBtn.addEventListener('click', () => {
    initAudio();
    isMuted = !isMuted;
    muteBtn.classList.toggle('muted', isMuted);
    muteIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    if (!isMuted) playBeep();
});

// Initialize audio on first interaction
document.body.addEventListener('click', () => initAudio(), { once: true });

// ========== COUNTDOWN TIMER ==========
let messageTimestamp = null;
const countdownElement = document.getElementById('countdown-timer');

function updateCountdown() {
    if (!messageTimestamp) {
        countdownElement.textContent = '';
        countdownElement.classList.remove('warning');
        return;
    }

    const now = new Date();
    const expiryTime = new Date(messageTimestamp.getTime() + 10 * 60 * 1000);
    const remaining = expiryTime - now;

    if (remaining <= 0) {
        countdownElement.textContent = 'انتهت';
        countdownElement.classList.add('warning');
        return;
    }

    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    countdownElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    if (remaining < 60000) {
        countdownElement.classList.add('warning');
    } else {
        countdownElement.classList.remove('warning');
    }
}

setInterval(updateCountdown, 1000);

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // R = Refresh
    if (key === 'r') {
        e.preventDefault();
        playRefreshSound();
        fetchMessages();
    }

    // C = Copy
    if (key === 'c') {
        e.preventDefault();
        copyToClipboard();
    }
});

// ========== COPY LOGIC ==========
function copyToClipboard() {
    const text = DISPLAY_ELEMENT.textContent;
    if (text && text !== DEFAULT_TEXT) {
        navigator.clipboard.writeText(text).then(() => {
            playCopySound();
            const original = DISPLAY_ELEMENT.style.textShadow;
            DISPLAY_ELEMENT.style.textShadow = "0 0 15px #ff5555";
            setTimeout(() => {
                DISPLAY_ELEMENT.style.textShadow = original;
            }, 300);
        });
    }
}

// Copy Button (Red Button)
document.querySelector('.red-btn').addEventListener('click', () => {
    playButtonClick();
    copyToClipboard();
});

// Double-tap to Copy
let lastTapTime = 0;
DISPLAY_ELEMENT.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        copyToClipboard();
    }
    lastTapTime = now;
});

// ========== SECRET DECODE (Green Button - 20 clicks) ==========
let greenClickCount = 0;
document.querySelector('.green-btn').addEventListener('click', () => {
    greenClickCount++;
    playButtonClick();

    const btn = document.querySelector('.green-btn');
    btn.style.transform = "translateY(2px)";
    setTimeout(() => btn.style.transform = "none", 100);

    if (greenClickCount >= 20) {
        if (currentOriginalText) {
            DISPLAY_ELEMENT.textContent = currentOriginalText;
            DISPLAY_ELEMENT.style.fontSize = '2rem';
            DISPLAY_ELEMENT.style.setProperty('--text-direction', 'rtl');
            playTone(1000, 0.3); // Success sound
        }
        greenClickCount = 0;
    }
});

// ========== SCROLL LOGIC (D-Pad) ==========
const screen = document.querySelector('.lcd-screen');
const SCROLL_AMOUNT = 80;

function handleScroll(direction) {
    playButtonClick();
    screen.scrollBy({ top: direction * SCROLL_AMOUNT, behavior: 'smooth' });
}

document.querySelector('.d-btn.up').addEventListener('click', (e) => {
    e.preventDefault();
    handleScroll(-1);
});

document.querySelector('.d-btn.down').addEventListener('click', (e) => {
    e.preventDefault();
    handleScroll(1);
});

document.querySelector('.d-btn.left').addEventListener('click', () => {
    playButtonClick();
    screen.scrollBy({ left: -50, behavior: 'smooth' });
});

document.querySelector('.d-btn.right').addEventListener('click', () => {
    playButtonClick();
    screen.scrollBy({ left: 50, behavior: 'smooth' });
});

// ========== UPDATE PROCESS MESSAGE TO STORE TIMESTAMP ==========
// Override processMessage to also store timestamp for countdown
const originalProcessMessage = processMessage;
// Update processMessage wrapper to accept ctype
processMessage = function (text, dateStr, ctype) {
    const msgDate = parseArabicDate(dateStr);
    const now = new Date();
    const diffMs = now - msgDate;
    const diffMins = diffMs / 1000 / 60;

    if (diffMins >= 0 && diffMins <= 10) {
        messageTimestamp = msgDate;
        // Play morse-like sound for new message (using encipher fallback if needed)
        // We just use encipher() here for the sound pattern generation regardless of mode for now
        setTimeout(() => playMorseForText(encipher(text)), 500);
    } else {
        messageTimestamp = null;
    }

    originalProcessMessage(text, dateStr, ctype);
};

