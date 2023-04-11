// Questions and answers stored in arrays within an array so each question w/answer will have an index number which goes from 0 to 4
// I understand this is an object that stores data as objects too 
var questions = [
    {
        question: "How many championships does LeBron James have?",
        answers: [
            { text: "1", correct: false },
            { text: "6", correct: false },
            { text: "4", correct: true },
            { text: "11", correct: false }
        ]
    },
    {
        question: "What year was LeBron James drafted?",
        answers: [
            { text: "2003", correct: true },
            { text: "2004", correct: false },
            { text: "2000", correct: false },
            { text: "2015", correct: false }
        ]
    },
    {
        question: "NBA all time scoring spot?",
        answers: [
            { text: "1st place", correct: true },
            { text: "3rd place", correct: false },
            { text: "6th place", correct: false },
            { text: "10th place", correct: false }
        ]
    },
    {
        question: "He has played for...in his NBA career",
        answers: [
            { text: "1 team", correct: false },
            { text: "4 teams", correct: false },
            { text: "6 teams", correct: false },
            { text: "3 teams", correct: true }
        ]
    },
    {
        question: "He won his first championship in...",
        answers: [
            { text: "2007", correct: false },
            { text: "2016", correct: false },
            { text: "2012", correct: true },
            { text: "2021", correct: false }
        ]
    }
];

// getting elements from html file and stored them as variables
var questionsElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");
var nextBtn = document.getElementById("next");
// start Button and timer
var startBtn = document.getElementById("btn");
var timer = document.getElementById("clock");
var secondsLeft = 60;
// variables for form
var submitS = document.getElementById("form");
var save = document.getElementById("save");
// Storing questions index and score for questions
var questionsIndex = 0;
var score = 0;
var timerId;
var highscores = [];

// !REAL QUIZ
function quiz() {
    // Once the quiz starts it will show questions and answers that were hidden before the quiz started, this shows once we click the start button
    questionsElement.classList.remove('hide');
    answersElement.classList.remove('hide');
    // this will hide the start button once clicked
    startBtn.classList.add('hide');
    timer.textContent = secondsLeft;
    timerId = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + ' Secs left'
    }, 1000);

    showQuestions();
};

function showQuestions() {

    answersElement.innerHTML = '';
    // variable to store questions index
    var cQuestion = questions[questionsIndex];

    //the content in questions element on html file will be equal to the question from the questionsIndex
    questionsElement.textContent = cQuestion.question;

    cQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        // adding each answer from array index to the html file, its adding to button element
        button.textContent = answer.text;
        button.classList.add("answerbtn");

        //setting an attribute to button, each button will show possible answers
        button.setAttribute('value', answer.correct);
        button.addEventListener("click", pickAnswer);

        answersElement.appendChild(button);
    });
}

// Validating when clicking on an answer
function pickAnswer() {

    if (this.value === "false") {
        secondsLeft -= 5;
        timer.textContent = secondsLeft + ' Secs Left'
    }
    if (this.value === "true") {
        score += 20;
    }
    questionsIndex++;

    if (questionsIndex === questions.length || timer === 0) {
        showScore();
        clearInterval(timerId);
        
    } else {
        showQuestions();
    }
}

// This will show final score
function showScore() {
    
    document.getElementById('score').textContent = "Score: " + score + "points";
    // form will show
    submitS.classList.remove('hide');
    // questions and answers will be hidden
    questionsElement.classList.add('hide');
    answersElement.classList.add('hide');
}

// submitting score to local storage
function submitScore(e){
    e.preventDefault();
    var initials = document.getElementById("initials");
    var scoreIn = {
        score: score,
        initials: initials.value
    };

    highscores.push(scoreIn);
    localStorage.setItem("scoreIn", JSON.stringify(highscores));   
}


submitS.addEventListener('submit', submitScore);

// Starts quiz by clicking on start quiz button
startBtn.addEventListener("click", quiz);