//set up variables based on html id's
var timeLeft = document.querySelector("#time-left");
var highScoresDisplay = document.querySelector("#high-scores");
var startButton = document.querySelector("#start-button");

console.log(timeLeft);

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

    
};

//create timer function
// var countDown = function() {
//     console.log("countDown has started.")
//     var currentTime = 75;
//     console.log(currentTime);

//     setInterval(currentTime, 1000)
//         currentTime --;
//         document.getElementById("#time-left").innerHTML = "Time Left: " + currentTime;
//     }

//     console.log("countDown has finished.")
// };

//create question container

//create bank of question objects (array)

//create question generation function



//create finish screen


//create high scores screen (get from localStorage, display on the screen)


//TODO: button press to delete html inside content creator and start generating questions
startButton.addEventListener("click", startButtonHandler);

