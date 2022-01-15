//set up variables based on html id's
var timeLeft = document.querySelector("#time-left");
var highScoresDisplay = document.querySelector("#high-scores");
var startButton = document.querySelector("#start-button");

console.log(document.getElementsByClassName("content"));

//create bank of question objects (array)
var questionBank = [
    questionOne = {
        Q: "What is 2 + 2?",
        A: "3",
        B: "4",
        C: "6",
        D: "8"
    },
    questionTwo = {
        Q: "What is 3 + 3?",
        A: "3",
        B: "4",
        C: "5",
        D: "6"
    },
];


//delete start-up screen inside <main>



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

    //delete start-up content
    var deleteContent = function() {

        var content = document.getElementsByClassName("content");
            console.log(content);
            while(content.length > 0){
                content[0].parentNode.removeChild(content[0]);
            }
        }  

    deleteContent();
};


//create question container
var newQuestion = function() {

};



//create question generation function



//create finish screen


//create high scores screen (get from localStorage, display on the screen)


//button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);

