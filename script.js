// Conversion mapping example (simplified)
const singlishToUnicode = {
    'a': 'අ',
    'aa': 'ආ',
    'tha': 'ථ',
    // Add complete mapping here
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
