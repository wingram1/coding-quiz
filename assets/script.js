//set up variables based on html id's
var timeLeft = document.querySelector("#time-left");
var highScoresDisplay = document.querySelector("#high-scores");
var startButton = document.querySelector("#start-button");
var container = document.querySelector(".content-container")

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
        answerCorrect: "3",
        wrong1: "4",
        wrong2: "6",
        wrong3: "8"
    },
    questionThree = {
        question: "What is 2 + 3?",
        answerCorrect: "3",
        wrong1: "4",
        wrong2: "6",
        wrong3: "8"
    },
    questionFour = {
        question: "What is 3 + 3?",
        answerCorrect: "3",
        wrong1: "4",
        wrong2: "6",
        wrong3: "8"
    },
    questionFive = {
        question: "What is 2 + 2?",
        answerCorrect: "3",
        wrong1: "4",
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

    //function to loop through five questions
    for (let i = 0; i <=5; i++) {
        var currentQuestion = i;
        console.log(currentQuestion);
        nextQuestion(currentQuestion);

        //clear container for next question
        deleteContent();
    };
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

//TODO: generate answers in random order

    var randomAnswerOrder = function(answerBank) {

    }; //todo very incomplete
//     var answerA = document.createElement("h2");
//     answerA.className = "content";
//     answerA.id= "answer";
//     answerA.innerHTML = "A: " + currentQuestion.A;
//     container.appendChild(answerA);

//     var answerB = document.createElement("h2");
//     answerB.className = "content";
//     answerB.id= "answer";
//     answerB.innerHTML = "B: " + currentQuestion.B;
//     container.appendChild(answerB);

//     var answerC = document.createElement("h2");
//     answerC.className = "content";
//     answerC.id= "answer";
//     answerC.innerHTML = "C: " + currentQuestion.C;
//     container.appendChild(answerC);

//     var answerD = document.createElement("h2");
//     answerD.className = "content";
//     answerD.id= "answer";
//     answerD.innerHTML = "D: " + currentQuestion.D;
//     container.appendChild(answerD);
};


//TODO: create finish screen (upload score and name to localStorage)


//TODO: create high scores screen (get from localStorage, display on the screen)


//button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);