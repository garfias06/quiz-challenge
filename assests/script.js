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
var highscores = []

// !experiment
// // Hiding questions and answers
// function resetQuiz() {
//     questionsElement.style.display = "none";
//     answersElement.style.display = "none";
// }



// !REAL QUIZ
function quiz() {
    // the name of this button will be replaced later as a "restart quiz"
    // next.innerHTML = "NEXT QUESTION";
    questionsElement.classList.remove('hide')
    answersElement.classList.remove('hide')
    startBtn.classList.add('hide')
    timer.textContent = secondsLeft
    timerId = setInterval(function () {
        secondsLeft--
        timer.textContent = secondsLeft + ' Secs Left'
    }, 1000);
    showQuestions();
};

function showQuestions() {

    answersElement.innerHTML = ''
    // variable to store questions index
    var cQuestion = questions[questionsIndex];

    // adding the question number to the html file using innerHTML to select the specific element 
    questionsElement.textContent = cQuestion.question;

    // adding answers to buttons

    cQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        // adding each answer from array index to the html file, its adding to button element
        button.textContent = answer.text;
        button.classList.add("answerbtn");

        // when clicking on answers button it will select the answer
        button.setAttribute('value', answer.correct);
        button.addEventListener("click", pickAnswer);

        answersElement.appendChild(button);
        // this will validate if the selected answer is either true or false


    });
}

function pickAnswer(e) {

    if (this.value === "false") {
        secondsLeft -= 5;
        timer.textContent = secondsLeft + ' Secs Left'

        // // if answer is correct it will add a new class for each button, new background color was added for correct and incorrect answer
        // //
        // this.classList.add("correct");
        // score += 20;

    }
    // else {
    // this.classList.add("incorrect");



    // }
    // !Experiment for time
    // I could add time interval here.
    questionsIndex++;
    if (questionsIndex === questions.length || secondsLeft === 0) {

        showScore();
    } else {
        showQuestions()
    }


}


// This will show final score
function showScore() {
    // resetState();
    document.getElementById('score').textContent = "Score: " + secondsLeft;

    submitS.classList.remove('hide')
    questionsElement.classList.add('hide')
    answersElement.classList.add('hide')
    
    // // renderScore();
}

function submitScore(e){
    e.preventDefault()
    var initials = document.getElementById("initials");
    var scoreIn = {
        score: secondsLeft,
        initials: initials.value
    };

    highscores.push(scoreIn)
    localStorage.setItem("scoreIn", JSON.stringify(highscores));
}

submitS.addEventListener('submit',submitScore )




// // quiz();  
// resetQuiz();




// Starts quiz by clicking on start quiz button
startBtn.addEventListener("click", quiz);