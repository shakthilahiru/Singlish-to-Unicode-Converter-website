// Conversion mapping example (simplified)
const singlishToUnicode = {
    // Vowels
    'a': 'අ',
    'aa': 'ආ',
    'ae': 'ඇ',
    'aae': 'ඈ',
    'i': 'ඉ',
    'ii': 'ඊ',
    'u': 'උ',
    'uu': 'ඌ',
    'e': 'එ',
    'ee': 'ඒ',
    'o': 'ඔ',
    'oo': 'ඕ',
    'au': 'ඖ',
    
    // Consonants
    'k': 'ක්',
    'ka': 'ක',
    'kh': 'ඛ්',
    'kha': 'ඛ',
    'g': 'ග්',
    'ga': 'ග',
    'gh': 'ඝ්',
    'gha': 'ඝ',
    'n~g': 'ඞ්',
    'ch': 'ච්',
    'cha': 'ච',
    'chh': 'ඡ්',
    'chha': 'ඡ',
    'j': 'ජ්',
    'ja': 'ජ',
    'jh': 'ඣ්',
    'jha': 'ඣ',
    'n~j': 'ඤ්',
    't': 'ට්',
    'ta': 'ට',
    'th': 'ඨ්',
    'tha': 'ඨ',
    'd': 'ඩ්',
    'da': 'ඩ',
    'dh': 'ඪ්',
    'dha': 'ඪ',
    'n': 'ණ්',
    'na': 'ණ',
    'p': 'ප්',
    'pa': 'ප',
    'ph': 'ඵ්',
    'pha': 'ඵ',
    'b': 'බ්',
    'ba': 'බ',
    'bh': 'භ්',
    'bha': 'භ',
    'm': 'ම්',
    'ma': 'ම',
    'y': 'ය්',
    'ya': 'ය',
    'r': 'ර්',
    'ra': 'ර',
    'l': 'ල්',
    'la': 'ල',
    'v': 'ව්',
    'va': 'ව',
    'w': 'ව්',
    'wa': 'ව',
    's': 'ස්',
    'sa': 'ස',
    'h': 'හ්',
    'ha': 'හ',
    'lh': 'ළ්',
    'lha': 'ළ',
    'f': 'ෆ්',
    'fa': 'ෆ',
    
    // Vowel Signs
    'ā': 'ා',    'a:': 'ා',
    'æ': 'ැ',    'a.e': 'ැ',
    'ǣ': 'ෑ',    'ae:': 'ෑ',
    'i': 'ි',    '.i': 'ි',
    'ī': 'ී',    'i:': 'ී',
    'u': 'ු',    '.u': 'ු',
    'ū': 'ූ',    'u:': 'ූ',
    'e': 'ෙ',    '.e': 'ෙ',
    'ē': 'ේ',    'e:': 'ේ',
    'o': 'ො',    '.o': 'ො',
    'ō': 'ෝ',    'o:': 'ෝ',
    'au': 'ෞ',   'a.u': 'ෞ',
    
    // Special Characters
    'ṃ': 'ං',    'n.g': 'ං', // Anusvara
    'ḥ': 'ඃ',    'h.h': 'ඃ', // Visarga
    'ṟ': 'ඍ',    'ru': 'ඍ',
    'ṟh': 'ඎ',   'ruu': 'ඎ',
    'ḷ': 'ඏ',
    'ḷh': 'ඐ',
    
    // Numerals
    '0': '෦',
    '1': '෧',
    '2': '෨',
    '3': '෩',
    '4': '෪',
    '5': '෫',
    '6': '෬',
    '7': '෭',
    '8': '෮',
    '9': '෯',
    
    // Punctuation
    '\\|': '।', // Vertical bar to Sinhala period
    '\\/': '෴'  // Slash to Sinhala punctuation
};

// Font mapping
const fontMap = {
    'unicode': 'Noto Sans Sinhala',
    'FMAbaya': 'FM Abhaya',
    'ISIFont': 'ISI-Kaputa'
};

// Conversion function
function convertToSinhala(text) {
    // Sort keys by length to handle longer combinations first
    const sortedKeys = Object.keys(singlishToUnicode)
                          .sort((a, b) => b.length - a.length);
    
    sortedKeys.forEach(key => {
        const regex = new RegExp(key, 'g');
        text = text.replace(regex, singlishToUnicode[key]);
    });
    return text;
}

// Voice Recognition
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'si-LK'; // Sinhala Sri Lanka

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        document.getElementById('singlishInput').value = result;
        updateOutput();
    };
}

document.getElementById('voiceBtn').addEventListener('click', () => {
    recognition.start();
});

// Update output
function updateOutput() {
    const inputText = document.getElementById('singlishInput').value;
    const convertedText = convertToSinhala(inputText);
    const selectedFont = fontMap[document.getElementById('fontSelector').value];
    
    const output = document.getElementById('output');
    output.textContent = convertedText;
    output.style.fontFamily = selectedFont;
}

// Event listeners
document.getElementById('singlishInput').addEventListener('input', updateOutput);
document.getElementById('fontSelector').addEventListener('change', updateOutput);
document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('output').textContent);
});
