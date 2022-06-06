let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;
let target;

// для ввода значения игрока
const humanGuessInput = document.getElementById('human-guess');
// номер текущего раунда
const roundNumberDisplay = document.getElementById('round-number');
// значение игрока, изначально - ?
const computerGuessDisplay = document.getElementById('computer-guess');
// счёт игрока
const humanScoreDisplay = document.getElementById('human-score');
// счёт компьютера
const computerScoreDisplay = document.getElementById('computer-score');
// цель
const targetNumberDisplay = document.getElementById('target-number');
// блок для случая победы компьютера
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round')

guessButton.addEventListener('click', () => {
  // генерация цели
  const generateTarget = () => {
  return Math.floor(Math.random() * 10);
};
  target = generateTarget();
  // получение предположения игрока
  const currentHumanGuess = humanGuessInput.value;
  // получение случайного предположения компьютера, от 0 до 9
  const computerGuess = Math.floor(Math.random() * 10);

  // отображение предположения компьютера и цели
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;
  
  // определяем победителя
  const compareGuesses = (humanGuess, computerGuess, target) => {
  const humanDifference = Math.abs(target - humanGuess);
  const computerDifference = Math.abs(target - computerGuess);
  if (humanDifference <= computerDifference) {
    return true;
  } else {
    return false;
  }
};
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
  const winner = humanIsWinner ? 'human' : 'computer'

  // обновление счёта
  const updateScore = (winner) => {
  if (winner === 'human') {
    humanScore++;
  } else if (winner === 'computer') {
    computerScore++;
  }
};
  updateScore(winner);

  // отображение победителя
  if (humanIsWinner) {
    guessButton.innerText = 'Вы выиграли!!!!!'
    guessButton.classList.toggle('winning-text')
  } else {
    computerWinsDisplay.innerText = 'Компьютер выиграл!!!!!';
  }

  // отображение текущего счёта игроков
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;
  
  // установка отключенного состояния для кнопки
  guessButton.setAttribute('disabled', true)
  nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
  // увеличение числа раундов
  const advanceRound = () => {
  currentRoundNumber++;
};
  advanceRound();
  // отобразить новое число раундов
  roundNumberDisplay.innerText = currentRoundNumber;

  // Установите правильное отключенное состояние для кнопок
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // сброс предположений для следующего раунда
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Выбрать цифру!';
  humanGuessInput.value = '';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});

// далее настройки кнопок '+', '-'
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

const handleValueChange = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

humanGuessInput.addEventListener('input', function(e) {
  handleValueChange(e.target.value);
});
