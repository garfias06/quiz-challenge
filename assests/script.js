// Questions and answers stored in arrays within an array so each question w/answer will have an index number which goes from 0 to 4
// I understand this is an object that stores data as objects too 
var questions=[
    {
        question:"How many championships does LeBron James have?",
        answers:[
            {text:"1", correct: false},
            {text:"6", correct: false},
            {text:"4", correct: true},
            {text:"11", correct: false}
        ]
    },
    {
        question:"What year was LeBron James drafted?",
        answers:[
            {text:"2003", correct: true},
            {text:"2004", correct: false},
            {text:"2000", correct: false},
            {text:"2015", correct: false}
        ] 
    },
    {
        question:"NBA all time scoring spot?",
        answers:[
            {text:"1st place", correct: true},
            {text:"3rd place", correct: false},
            {text:"6th place", correct: false},
            {text:"10th place", correct: false}
        ]
    },
    {
        question:"He has played for...in his NBA career",
        answers:[
            {text:"1 team", correct: false},
            {text:"4 teams", correct: false},
            {text:"6 teams", correct: false},
            {text:"3 teams", correct: true}
        ]
    },
    {
        question:"He won his first championship in...",
        answers:[
            {text:"2007", correct: false},
            {text:"2016", correct: false},
            {text:"2012", correct: true},
            {text:"2021", correct: false}
        ]
    }
];

// getting elements from html file and stored them as variables
var questionsElement=document.getElementById("questions");
var answersElement=document.getElementById("answers");
var nextBtn=document.getElementById("next");

// Storing questions index and score for questions

var questionsIndex=0;
var score=0;

// 
function quiz(){
questionsIndex=0;
score=0;
// the name of this button will be replaced later as a "restart game"
next.innerHTML="NEXT QUESTION";
showQuestions();
};

function showQuestions(){
    // this function will hide-reset answers every time next question shows
    resetState();
    // variable to store questions index
var cQuestion=questions[questionsIndex];
var actualQuestion=questionsIndex + 1;
// adding the question number to the html file using innerHTML to select the specific element 
questionsElement.innerHTML=actualQuestion + ". " + cQuestion.question;

// adding answers to buttons

cQuestion.answers.forEach(answer => {
    var button=document.createElement("button");
    // adding each answer from array index to the html file, its adding to button element
    button.innerHTML=answer.text;
    button.classList.add("answerbtn");
    answers.appendChild(button);
// this will validate if the selected answer is either true or false
    if (answer.correct){
        button.dataset.correct=answer.correct;
    }
    // when clicking on answers button it will select the answer
    button.addEventListener("click", pickAnswer);
});
}


function pickAnswer(e){
    var btnSelected=e.target;
    var correctAnswer=btnSelected.dataset.correct==="true";
    // if answer is correct it will add a new class for each button, new background color was added for correct and incorrect answer
    if(correctAnswer){
        btnSelected.classList.add("correct");
        score++;
    }else{
        btnSelected.classList.add("incorrect");
        score--;
    }
    // I could add time interval here
    nextBtn.style.display="block";
}

function showNextButton(){
    questionsIndex++;
    if(questionsIndex<questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionsElement.innerHTML= "Score: " + score + " out of 5";
    nextBtn.innerHTML="RESTART QUIZ";
    nextBtn.style.display="block";
} 

nextBtn.addEventListener("click",()=>{
if(questionsIndex<questions.length){
    showNextButton();
}else{
    quiz();
}
})

function resetState(){
    nextBtn.style.display= "none";
// it removes all previous answers
while(answersElement.firstChild){
    answersElement.removeChild(answersElement.firstChild);
}
}
quiz();  


