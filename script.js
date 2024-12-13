const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultContainer = document.getElementById('result-container')
const scoreElement = document.getElementById('score')
const commentElement = document.getElementById('comment')
const restartButton = document.getElementById('restart-btn')

let shuffledQuestions, currentQuestionIndex
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
restartButton.addEventListener('click', restartGame)

function startGame() {
  score = 0
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  resultContainer.classList.add('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  if (correct) {
    score++
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    showResult()
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function showResult() {
  questionContainerElement.classList.add('hide')
  resultContainer.classList.remove('hide')
  scoreElement.innerText = `Your score: ${score} / ${shuffledQuestions.length}`
  if (score === shuffledQuestions.length) {
    commentElement.innerText = 'Excellent! You got all answers right!'
  } else if (score >= shuffledQuestions.length * 0.7) {
    commentElement.innerText = 'Great job! You did well!'
  } else if (score >= shuffledQuestions.length * 0.4) {
    commentElement.innerText = 'Good try! But you can do better next time.'
  } else {
    commentElement.innerText = 'Oops! Better luck next time!'
  }
}

function restartGame() {
  resultContainer.classList.add('hide')
  startButton.classList.remove('hide')
}

const questions = [
  {
    question: "If two's company and three's a crowd, what are four and five?",
    answers: [
      { text: 'A party', correct: false },
      { text: 'A crowd', correct: false },
      { text: 'A group of friends', correct: false },
      { text: 'Nine', correct: true }
    ]
  },
  {
    question: 'If you have a bowl with six apples and you take away four, how many do you have?',
    answers: [
      { text: '2', correct: false },
      { text: '4', correct: true },
      { text: '6', correct: false },
      { text: '10', correct: false }
    ]
  },
  {
    question: 'How many months have 28 days?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: false },
      { text: '12', correct: true },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'What has keys but can’t open locks?',
    answers: [
      { text: 'A map', correct: false },
      { text: 'A piano', correct: true },
      { text: 'A computer', correct: false },
      { text: 'A lockbox', correct: false }
    ]
  },
  {
    question: 'If a rooster lays an egg on top of a barn, which way does the egg roll?',
    answers: [
      { text: 'Left', correct: false },
      { text: 'Right', correct: false },
      { text: 'Down', correct: false },
      { text: 'Roosters don’t lay eggs', correct: true }
    ]
  },
  {
    question: 'You have a match. You go into a room with an oil lamp, a candle, and a fireplace. What do you light first?',
    answers: [
      { text: 'The candle', correct: false },
      { text: 'The fireplace', correct: false },
      { text: 'The match', correct: true },
      { text: 'The oil lamp', correct: false }
    ]
  },
  {
    question: 'If you have three apples and you take away two, how many do you have?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: true },
      { text: '3', correct: false },
      { text: 'None', correct: false }
    ]
  },
  {
    question: 'What can travel around the world while staying in the corner?',
    answers: [
      { text: 'A plane', correct: false },
      { text: 'A stamp', correct: true },
      { text: 'A letter', correct: false },
      { text: 'A corner', correct: false }
    ]
  },
  {
    question: 'How much dirt is in a hole that is 3 feet deep, 6 feet long, and 4 feet wide?',
    answers: [
      { text: 'None', correct: true },
      { text: '3 cubic feet', correct: false },
      { text: '72 cubic feet', correct: false },
      { text: 'A lot', correct: false }
    ]
  },
  {
    question: 'If a plane crashes on the border of the U.S. and Canada, where do they bury the survivors?',
    answers: [
      { text: 'In Canada', correct: false },
      { text: 'In the U.S.', correct: false },
      { text: 'Nowhere', correct: false },
      { text: 'They don’t bury survivors', correct: true }
    ]
  }
]
