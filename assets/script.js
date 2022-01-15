//set up variables based on html id's
var timeLeft = document.querySelector("#time-left");
var highScoresDisplay = document.querySelector("#high-scores");
var startButton = document.querySelector("#start-button");
var container = document.querySelector(".content-container");
var currentQuestion = 0;
var userScore = 0;

//create bank of question objects (array)
var questionBank = [
    questionOne = {
        question: "What is 1 + 2?",
        answerCorrect: "3",
        wrong1: "4",
        wrong2: "6",
        wrong3: "8"
    },
    questionTwo = {
        question: "What is 1 + 3?",
        answerCorrect: "4",
        wrong1: "3",
        wrong2: "6",
        wrong3: "8"
    },
    questionThree = {
        question: "What is 2 + 3?",
        answerCorrect: "5",
        wrong1: "4",
        wrong2: "6",
        wrong3: "8"
    },
    questionFour = {
        question: "What is 3 + 3?",
        answerCorrect: "6",
        wrong1: "4",
        wrong2: "5",
        wrong3: "8"
    },
    questionFive = {
        question: "What is 2 + 2?",
        answerCorrect: "4",
        wrong1: "5",
        wrong2: "6",
        wrong3: "8"
    },
];

//delete start-up screen inside <main>
    //delete start-up content
var deleteContent = function() {

    var content = document.getElementsByClassName("content");
        console.log(content);
        while(content.length > 0){
            content[0].parentNode.removeChild(content[0]);
        }
    }  


//Function to start the quiz
var startButtonHandler = function(event) {
    var targetEl = event.target;
    console.log("startButton has been clicked.");
    var timeLeft = 10;
    
    //start timer
    var countDown = setInterval(function() {
        document.querySelector("#time-left").innerHTML = "Time Left: " + timeLeft;
        timeLeft--;
    
        if (timeLeft < 0) {
            clearInterval(countDown);
            console.log("countDown has completed");
        }
    }, 1000);

    //delete content inside the container
    deleteContent();

    //Start nextQuestion function
    nextQuestion(currentQuestion);
};

//create question generation function
var nextQuestion = function(questionIndex) {
    var currentQuestion = questionBank[questionIndex];

    var questionEl = document.createElement("h1");
    questionEl.className = "content";
    questionEl.id= "question";
    questionEl.innerHTML = currentQuestion.question;
    container.appendChild(questionEl);

    debugger;

    var answerChoices = [
        currentQuestion.answerCorrect,
        currentQuestion.wrong1,
        currentQuestion.wrong2,
        currentQuestion.wrong3
    ];

    //shuffle answers
    shuffleAnswers(answerChoices)

    //create answer elements
    var answerA = document.createElement("h2");
    answerA.className = "content";
    answerA.id= "answer";
    answerA.innerHTML = "A: " + answerChoices[0];
    container.appendChild(answerA);

    var answerB = document.createElement("h2");
    answerB.className = "content";
    answerB.id= "answer";
    answerB.innerHTML = "B: " + answerChoices[1];
    container.appendChild(answerB);

    var answerC = document.createElement("h2");
    answerC.className = "content";
    answerC.id= "answer";
    answerC.innerHTML = "C: " + answerChoices[2];
    container.appendChild(answerC);

    var answerD = document.createElement("h2");
    answerD.className = "content";
    answerD.id= "answer";
    answerD.innerHTML = "D: " + answerChoices[3];
    container.appendChild(answerD);

    //TODO: let user choose answer
    //TODO: if pickedAnswer === currentQuestion.answerCorrect, then userScore++ && NextQuestion(); && display correct
        //todo else if pickedAnswer === currentQuestion.answerWrong1/2/3, then nextQuestion(); && display correct

    //TODO: when no more questions, display score and have user enter name to be stored in localStorage
    //TODO: display highscores in localStorage

    //TODO: add more questions (not important rn, just get code functioning)


};

//function to put answer properties into an array and shuffle
var shuffleAnswers = function(answerBank) {
    //log old answers array
    console.log("OLD: " + answerBank);

    //set variable 
    var currentIndex = answerBank.length, temporaryValue, randomIndex;

    // USE FISHER-YATES SHUFFLE TO SHUFFLE ARRAY
    while (currentIndex !== 0) {
        //randomize randomIndex
        randomIndex = Math.floor(Math.random() * currentIndex);
        //decrease currentIndex
        currentIndex--;

        //set temporary value to old index
        temporaryValue = answerBank[currentIndex];
        //set currentIndex to the randomized value
        answerBank[currentIndex] = answerBank[randomIndex];
        //set the random index to the old current index
        answerBank[randomIndex] = temporaryValue;
    }
    //log answerChoices to ensure the function worked
    console.log("FINAL: " + answerBank);
    return answerBank;
}; 

//TODO: have nextQuestion() pause the for loop to allow the user to answer the question


//TODO: create finish screen (upload score and name to localStorage)


//TODO: create high scores screen (get from localStorage, display on the screen)


//button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);