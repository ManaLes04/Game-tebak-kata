const words = [
    { word: 'kucing', clue: 'Hewan peliharaan yang imut' },
    { word: 'komputer', clue: 'Alat yang digunakan untuk mengolah data' },
    { word: 'pensil', clue: 'menulis' },
    { word: 'internet', clue: 'Jaringan global yang menghubungkan komputer' },
    { word: 'java', clue: 'Bahasa pemrograman yang terkenal' },
    { word: 'sepatu', clue: 'alas kaki' }
];

let selectedWord;
let hiddenWord;

function initializeGame() {
    const selectedObject = words[Math.floor(Math.random() * words.length)];
    selectedWord = selectedObject.word;
    hiddenWord = '_'.repeat(selectedWord.length).split('');
    document.getElementById('clue').textContent = `Petunjuk: ${selectedObject.clue}`;
    displayWord();
    document.getElementById('feedback').textContent = '';
    document.getElementById('letter-input').value = '';
    document.getElementById('letter-input').disabled = false;
    document.getElementById('guess-button').disabled = false;
}

window.onload = function() {
    initializeGame();
    document.getElementById('guess-button').addEventListener('click', guessLetter);
    document.getElementById('restart-button').addEventListener('click', initializeGame);
};

function displayWord() {
    document.getElementById('word-display').textContent = hiddenWord.join(' ');
}

function guessLetter() {
    const letterInput = document.getElementById('letter-input');
    const guessedLetter = letterInput.value.toLowerCase();

    if (guessedLetter && guessedLetter.length === 1) {
        let isCorrect = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter && hiddenWord[i] === '_') {
                hiddenWord[i] = guessedLetter;
                isCorrect = true;
            }
        }

        if (isCorrect) {
            document.getElementById('feedback').textContent = 'Benar!';
            document.getElementById('feedback').style.color = 'green';
        } else {
            document.getElementById('feedback').textContent = 'Salah!';
            document.getElementById('feedback').style.color = 'red';
        }

        displayWord();
        letterInput.value = '';

        if (!hiddenWord.includes('_')) {
            document.getElementById('feedback').textContent = 'Selamat! Anda menebak kata dengan benar!';
            document.getElementById('feedback').style.color = 'green';
            document.getElementById('guess-button').disabled = true;
            document.getElementById('letter-input').disabled = true;
        }
    } else {
        document.getElementById('feedback').textContent = 'Masukkan satu huruf!';
        document.getElementById('feedback').style.color = 'red';
    }
}
