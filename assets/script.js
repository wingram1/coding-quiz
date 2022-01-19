//set up variables based on html id's
var highScores = document.querySelector("#high-scores");
var startButton = document.querySelector(".red-button");
var container = document.querySelector(".content-container");

//misc variables to be made global
var questionMarker = 0;
var userScore = 0;
var maxTime = 75;
var timeLeft = 0;
var timerId = null;
var submitBtn = null;
var users = null;
var userId = null;



//create bank of question objects (array)
var questionBank = [
    questionOne = {
        question: "Commonly used data types do not include:",
        answerCorrect: "alerts",
        wrong1: "booleans",
        wrong2: "strings",
        wrong3: "numbers"
    },
    questionTwo = {
        question: "The condition in an if / else statement is enclosed with ______.",
        answerCorrect: "parentheses",
        wrong1: "quotes",
        wrong2: "curly brackets",
        wrong3: "square brackets"
    },
    questionThree = {
        question: "Arrays in JavaScript can be used to store ______.",
        answerCorrect: "all of these",
        wrong1: "numbers and strings",
        wrong2: "other arrays",
        wrong3: "booleans"
    },
    questionFour = {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answerCorrect: "quotes",
        wrong1: "commas",
        wrong2: "curly brackets",
        wrong3: "parentheses"
    },
    questionFive = {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerCorrect: "console.log()",
        wrong1: "JavaScript",
        wrong2: "for loops",
        wrong3: "terminal/bash"
    },
];

//function to delete content inside container
var deleteContent = function() {

    var content = document.getElementsByClassName("content");
    while(content.length > 0){
        content[0].parentNode.removeChild(content[0]);
    }
};

var countDown = function(){
    timeLeft = maxTime;
    timerId = setInterval(function() {
    timeLeft--;
    document.querySelector("#time-left").innerHTML = "Time Left: " + timeLeft;

    if (timeLeft <= 0) {
        //stop timer and finish quiz
        clearInterval(timerId);
        timeLeft = 0;
        finishQuiz();
    }
}, 1000);
}

//Function to start the quiz
var startButtonHandler = function(event) {
    //reset variables
    questionMarker = 0;
    timeLeft = maxTime;
    userScore = 0;

    //display max time so it doesn't decrease before displaying in countDown()
    document.querySelector("#time-left").innerHTML = "Time Left: " + timeLeft;
    
    //start timer
    countDown();

    //delete content inside the container
    deleteContent();

    //Start nextQuestion function
    nextQuestion(0);
};

//create question generation function
var nextQuestion = function(questionIndex) {
    if (questionIndex <= (questionBank.length - 1)) {
        var currentQuestion = questionBank[questionIndex];

        var questionEl = document.createElement("h1");
        questionEl.className = "content";
        questionEl.id= "question";
        questionEl.innerHTML = currentQuestion.question;
        container.appendChild(questionEl);

        var answerChoices = [
            currentQuestion.answerCorrect,
            currentQuestion.wrong1,
            currentQuestion.wrong2,
            currentQuestion.wrong3
        ];

        //shuffle answers
        shuffleAnswers(answerChoices)

        var chooseAnswerHandler = function(pickedAnswer) {
            //see if answer is correct or wrong
            if (pickedAnswer == currentQuestion.answerCorrect) {
                //increase user score, delete content and cycle to next question
                userScore += 5;

                deleteContent();
                questionMarker++;

                //create element to display correct
                correctDisplay = document.createElement("h1");
                correctDisplay.className = "content correct-display"
                correctDisplay.innerHTML = "Correct!"

                container.appendChild(correctDisplay);

                nextQuestion(questionMarker);
            }
            else if (pickedAnswer == currentQuestion.wrong1 || pickedAnswer== currentQuestion.wrong2 || pickedAnswer == currentQuestion.wrong3) {
                //delete content and cycle to next question without increasing user score
                deleteContent();
                questionMarker++;

                //subtract time from clock and update html element
                timeLeft -= 10;
                document.querySelector("#time-left").innerHTML = "Time Left: " + timeLeft;

                // create element to display wrong
                wrongDisplay = document.createElement("h1");
                wrongDisplay.className = "content wrong-display"
                wrongDisplay.innerHTML = "Wrong!"

                container.appendChild(wrongDisplay);
                nextQuestion(questionMarker);
            }
        };

        //create answer elements
        var answerA = document.createElement("h2");
        answerA.className = "content answer";
        answerA.id= "answerA";
        answerA.innerHTML = "A: " + answerChoices[0];
        container.appendChild(answerA);
        answerA.addEventListener("click", function(){chooseAnswerHandler(answerChoices[0]); });

        var answerB = document.createElement("h2");
        answerB.className = "content answer";
        answerB.id= "answerB";
        answerB.innerHTML = "B: " + answerChoices[1];
        container.appendChild(answerB);
        answerB.addEventListener("click", function(){chooseAnswerHandler(answerChoices[1]); });

        var answerC = document.createElement("h2");
        answerC.className = "content answer";
        answerC.id= "answerC";
        answerC.innerHTML = "C: " + answerChoices[2];
        container.appendChild(answerC);
        answerC.addEventListener("click", function(){chooseAnswerHandler(answerChoices[2]); });

        var answerD = document.createElement("h2");
        answerD.className = "content answer";
        answerD.id= "answerD";
        answerD.innerHTML = "D: " + answerChoices[3];
        container.appendChild(answerD);
        answerD.addEventListener("click", function(){chooseAnswerHandler(answerChoices[3]); });    
    }
    else {
        //if no more questions, finish quiz
        finishQuiz();
    }
};

//function to put answer properties into an array and shuffle
var shuffleAnswers = function(answerBank) {
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
    return answerBank;
}; 

var finishQuiz = function() {
    //clear content container
    deleteContent();

    //Add variable do user can see their percentage correct
    var questionsRight = (userScore / questionBank.length);

    //Add existing score with userScore
    userScore += timeLeft;

    //stop timer
    timeLeft = 0;
    if (timerId != null) {
        clearInterval(timerId);
        console.log("Your score was: " + userScore);
    } 
    else {
        console.log("Error! timerId == null")
    }

    //display score on screen
    var displayScore = document.createElement("h1");
    displayScore.className = "content title";
    displayScore.innerHTML = "Congratulations on finishing the quiz! Your score was: " + userScore + ".<br> You got " + questionsRight + " / " + questionBank.length + " questions right!";
    container.appendChild(displayScore);

    //create container for input/submit/retry buttons
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "content container";
    buttonContainer.innerHTML = "";
    container.appendChild(buttonContainer);

    var scoreInputContainer = document.createElement("div");
    scoreInputContainer.className = "content score-input";
    scoreInputContainer.innerHTML = "<input type='text' id='name-input' placeholder='Your Name'></input><button class='submit-btn' type='submit'>Submit</button>";
    buttonContainer.appendChild(scoreInputContainer);

    //create retry button
    var retryButton = document.createElement("button");
    retryButton.className = "content red-button";
    retryButton.innerHTML = "Retry the Quiz?";
    buttonContainer.appendChild(retryButton);

    //If score is 0, alert user to tell them they suck at coding.
    if (questionsRight == 0) {
        window.alert("Wow, 0/5? And I thought I was bad at this!");
    }

    //add event listener for submit button to run scoreSubmitHandler
    var submitButton = document.querySelector(".submit-btn");
    submitButton.addEventListener("click", scoreSubmitHandler);

    function scoreSubmitHandler() {
        var userName = document.querySelector("#name-input").value;
        if (userName.length > 15) {
            window.alert("Your name can only be 15 characters or less!")
        } 
        else if (userName.length <= 15) {
            console.log("submitButton has been clicked!");
            var userName = document.querySelector("#name-input").value;
            userId = {
                name: userName,
                score: userScore
            };

            loadScores();
            
            //adds current userId to array
            users.push(userId);

            //re-sort users array based on score
            users.sort((a, b) => {
                return b.score - a.score;
            });

            //save new array back to localStorage
            localStorage.setItem("Users", JSON.stringify(users));

            highScoresDisplay();
        }
    };

    //add event listener for retry button
    retryButton.addEventListener("click", startButtonHandler);
};

var loadScores = function() {
        //LOAD HIGH SCORES
        users = localStorage.getItem("Users");

        //check if any existing users; if not, set to empty array
        if (users === null) {
            users = [];
        } else {
            //turn from string back into js object
            users = JSON.parse(users);
        }
    
        //for loop make new array with just scores
        users.sort((a, b) => {
            return b.score - a.score;
        });
};

//function to display high scores
var highScoresDisplay = function() {
    //stop timer
    timeLeft = 0;
    if (timerId != null) {
        clearInterval(timerId);
    } 
    else {
        console.log("Error! timerId == null")
    }

    //delete existing content
    deleteContent();

    loadScores();

    var listContainer = document.createElement("ol");
    listContainer.className = "content container";
    listContainer.innerHTML = "<h1 class='title content'>HIGH SCORES:</h1>"
    container.appendChild(listContainer);


    //for loop to display each name and score on page
    for (let i=0; i<(users.length); i++) {
        //sets upper limit of 10 users displayed on high scores
        if (i >= 10) {
            break;
        }
        else{
            var workingListItem = document.createElement("li")
            workingListItem.className = "content";
            workingListItem.innerHTML = users[i].name + " ------- " + users[i].score;
            console.log(workingListItem);
            listContainer.appendChild(workingListItem);
        }
    }

    // Create back button
    var backButtonContainer = document.createElement("div");
    backButtonContainer.className = "content container";
    backButtonContainer.innerHTML = "<button class='content red-button back-button'>Back</button>";
    container.appendChild(backButtonContainer);

    var backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", resetQuiz);
}

var resetQuiz = function() {
    //clear any existing content in the container
    deleteContent();

    //create title
    var quizTitle = document.createElement("h1");
    quizTitle.className = "content title";
    quizTitle.innerHTML = "CODING QUIZ"
    container.appendChild(quizTitle);

    //create description
    var quizDescription = document.createElement("h2");
    quizDescription.className = "content description";
    quizDescription.innerHTML = "Try to answer the following code-related question within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds. Good luck!";
    container.appendChild(quizDescription);

    //create new button container + start button
    var newButtonContainer = document.createElement("div");
    newButtonContainer.className = "content container";
    newButtonContainer.innerHTML = "<button class='content red-button'>START!</button>"
    container.appendChild(newButtonContainer);

    startButton = document.querySelector(".red-button");
    startButton.addEventListener("click", startButtonHandler);
};

//load default html elements inside content container
resetQuiz();

//button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);



//button press to display high scores
highScores.addEventListener("click", highScoresDisplay);

