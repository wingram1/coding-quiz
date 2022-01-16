//set up variables based on html id's
var highScores = document.querySelector("#high-scores");
var startButton = document.querySelector(".start-button");
var container = document.querySelector(".content-container");
// var currentQuestion = 0;
var questionMarker = 0;
var userScore = 0;
var maxTime = 75;
var timeLeft = 0;
var timerId = null;
var submitBtn = null;
var users = null;
var userId = null;



//create bank of question objects (array)
//TODO: replace with questions pertaining to coding
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
        question: "What is William's favorite food?",
        answerCorrect: "Mac & Cheese",
        wrong1: "The souls of his enemies",
        wrong2: "DeJah",
        wrong3: "Moussaka"
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
        console.log("countDown has completed");
        finishQuiz();
    }
}, 1000);
}

//Function to start the quiz
var startButtonHandler = function(event) {
    console.log("startButton has been clicked.");

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

        console.log("currentQuestion.answerCorrect: " + currentQuestion.answerCorrect);

        var chooseAnswerHandler = function(pickedAnswer) {
            //log pickedAnswer to console
            console.log(pickedAnswer + " has been chosen.");

            //see if answer is correct or wrong
            if (pickedAnswer == currentQuestion.answerCorrect) {
                console.log("You picked the correct answer.");

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
                console.log("You picked the wrong answer.");
                deleteContent();
                questionMarker++;

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

var finishQuiz = function() {
    deleteContent();

    console.log("You have finished the quiz! :)");

    //add existing userScore with time Left
    console.log("Time Left: " + timeLeft);
    console.log("Score from answers: " + userScore);

    var questionsRight = (userScore / 5);
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
    displayScore.className = "content title"
    displayScore.innerHTML = "Congratulations on finishing the quiz! Your score was: " + userScore + ". You got " + questionsRight + " / " + questionBank.length + " questions right!";
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
    retryButton.className = "content start-button";
    retryButton.innerHTML = "Retry the Quiz?";
    buttonContainer.appendChild(retryButton);

    //add event listener for submit button to run scoreSubmitHandler
    var submitButton = document.querySelector(".submit-btn");
    submitButton.addEventListener("click", scoreSubmitHandler);

    function scoreSubmitHandler() {
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
    };

    //add event listener for retry button
    retryButton.addEventListener("click", startButtonHandler);
};

//TODO: have submit high scores button take user to high scores screen
//TODO: create high scores screen (get from localStorage, display on the screen)
//todo: add a button to refresh/reset page

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
    backButtonContainer.innerHTML = "<button class='content start-button back-button'>Back</button>";
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
    quizDescription.innerHTML = "Take the quiz, bitch. If you dare, that is. This quiz don't take no pussies, you gotta have real grit to take this quiz.Get outta here with that pussy ass not-know-it-all shit man, just push the button and take the fuckin' quiz!";
    container.appendChild(quizDescription);

    //create new button container + start button
    var newButtonContainer = document.createElement("div");
    newButtonContainer.className = "content container";
    newButtonContainer.innerHTML = "<button class='content start-button'>START!</button>"
    container.appendChild(newButtonContainer);

    startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", startButtonHandler);
};

//load default html elements inside content container
resetQuiz();

//button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);



//button press to display high scores
highScores.addEventListener("click", highScoresDisplay);

