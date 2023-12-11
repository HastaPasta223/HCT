
const quizData = [
  {
    question: '1). What device was used around 3,000 BCE to perform mathematical calculations?',
    options: ['Slide Rule', 'Antikythera Mechanism', 'Abacus', 'Calculating Clock'],
    answer: 'Abacus',
  },
  {
    question: '2). In 205-60 BCE, what ancient device, considered the world\'s first analogous computer, was used for astrology?',
    options: ['Slide Rule', 'Antikythera Mechanism', 'Napier\'s Bones', 'Pascal\'s Calculator'],
    answer: 'Antikythera Mechanism',
  },
  {
    question: '3). Who, in 1614, published work on simplifying arithmetic by introducing logarithms, shortening the time for calculations?',
    options: ['John Napier', 'Wilhelm Schickard', 'Blaise Pascal', 'Charles Babbage'],
    answer: 'John Napier',
  },
  {
    question: '4). What English mathematician invented the earliest version of the slide rule in 1622?',
    options: ['John Napier', 'Wilhelm Schickard', 'William Oughtred', 'Blaise Pascal'],
    answer: 'Wilhelm Schickard',
  },
  {
    question: '5). In 1622, Wilhelm Schickard combined Napier\'s Bones with a toothed wheel system to create what?',
    options: ['Slide Rule', 'Calculating Clock', 'Antikythera Mechanism', 'Abacus'],
    answer: 'Calculating Clock',
  },
  {
    question: '6). What machine, invented in 1642 by Blaise Pascal, was capable of addition and subtraction and was initially created to help with tax calculations?',
    options: ['Antikythera Mechanism', 'Calculating Clock', 'Pascal\'s Calculator', 'Napier\'s Bones'],
    answer: 'Pascal\'s Calculator',
  },
  {
    question: '7). In the 17th century, who documented the binary number system in his article "Explication de l\'Arithmétique Binaire"?',
    options: ['John Napier', 'Wilhelm Schickard', 'Blaise Pascal', 'Gottfried Wilhelm Leibniz'],
    answer: 'Gottfried Wilhelm Leibniz',
  },
  {
    question: '8). Charles Babbage conceptualized the Analytical Engine in 1837. What is considered the first general-purpose mechanical computer?',
    options: ['ENIAC', 'Colossus', 'Analytical Engine', 'Tabulating Machine'],
    answer: 'Analytical Engine',
  },
  {
    question: '9).  Who is considered the first computer programmer and wrote "notes" on the Analytical Engine, including an algorithm for execution?',
    options: ['Ada Lovelace', 'Charles Babbage', 'Herman Hollerith', 'Alan Turing'],
    answer: 'Ada Lovelace',
  },
  {
    question: '10). In 1843, George Edward Scheutz and his son designed a machine inspired by which of Charles Babbage\'s inventions?',
    options: ['Difference Engine', 'Analytical Engine', 'Antikythera Mechanism', 'Pascal\'s Calculator'],
    answer: 'Difference Engine',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) 
  {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult()
{
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz()
  {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() 
{
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) 
  {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
