$(function() {
    //get the local storage variable for this page.
    var result = localStorage.getItem("phrase");

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var inputs = $(".input");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#q1a")[0], $("#q1b")[0], $("#q1c")[0], 
                        $("#q2a")[0], $("#q2b")[0], $("#q2c")[0], $("#q2d")[0], $("#q2e")[0], $("#q2f")[0], 
                        $("#q3a")[0], $("#q3b")[0], $("#q3c")[0], $("#q3d")[0], $("#q3e")[0], $("#q3f")[0], 
                        $("#q4a")[0], $("#q4b")[0], $("#q4c")[0], $("#q4d")[0], 
                        $("#q5a")[0], $("#q5b")[0], $("#q5c")[0], $("#q5d")[0], $("#q5e")[0], $("#q5f")[0], $("#q5g")[0], $("#q5h")[0], 
                        $("#q6a")[0], $("#q6b")[0], $("#q6c")[0], $("#q6d")[0], $("#q6e")[0], $("#q6f")[0], 
                        $("#q7a")[0], $("#q7b")[0], $("#q7c")[0], $("#q7d")[0], $("#q7e")[0], $("#q7f")[0], $("#q7g")[0], $("#q7h")[0], $("#q7i")[0], $("#q7j")[0], 
                        $("#q8a")[0], $("#q8b")[0], $("#q8c")[0], $("#q8d")[0], $("#q8e")[0], $("#q8f")[0], $("#q8g")[0], $("#q8h")[0]];

    //put the answer in a string.
    var allAnswers = ["time","is", "money", "two", "heads", "are", "better", "than", "one", "there", "is", "no", "i", "in", "team", "look", "before", "you", "leap", 
                        "a", "fool", "and", "his", "money", "is", "soon", "parted", "the", "early", "bird", "gets", "the", "worm", "a", "chain", "is", "only", "as", "strong", "as", "its", "weakest", "link", 
                        "a", "stopped", "clock", "is", "right", "twice", "a", "day"];
    var alternateAnswers = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, "teamwork", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "catches", 
                            null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

    //output the clue
    function correctAnswer() {
        dialogText.attr("style", "color: limegreen");
        dialogText.text("Congratulations for successfully completing the game.  Here is your clue for the grand prize.");
        dialogClue.text("Park");
        dialogBox.dialog("open");
    }

    //let the know the user got the incorrect answer
    function incorrectAnswer() {
        dialogText.text("Sorry, you did not successfully complete this game.  Better luck on the next game.");
        dialogClue.text("");
        dialogText.attr("style", "color: red");
        dialogBox.dialog("open");
    }

    //check if user already completed the game or not, they can only complete it once.
    function checkIfCompleted() {
        if (result == "correct") {
            correctAnswer();
        }
        else if (result == "wrong") {
            incorrectAnswer();
        }
    }

    //check the results to see if the user got the correct answers.
    function checkResult(event, myYes) {
        event.preventDefault();
        var allCorrect = true;
        for(var i = 0; i < allInputs.length; i++) {
            var userInput = allInputs[i].value;
            if(!(userInput.toLocaleLowerCase() == allAnswers[i] || userInput.toLocaleLowerCase() == alternateAnswers[i])) {
                allCorrect = false;
                break;
            }
        }
        
        if(allCorrect) {
            localStorage.setItem("phrase", "correct");
            correctAnswer();
        }
        else {
            localStorage.setItem("phrase", "wrong");
            incorrectAnswer();
        }
    }

    //on spacebar and enter keys, tab over to the next field.
    inputs.keyup(function (event) {
        if(event.originalEvent.keyCode === 32 || event.originalEvent.keyCode === 13) {
            event.preventDefault();
            var currentIndex = allInputs.indexOf(event.target)
            //went to https://stackoverflow.com/questions/23888537/auto-tab-to-next-input-field-when-fill-4-characters to learn about how to focus onto another
            //input field after pressing a button.  Also credited in the readme file.
            if(allInputs[currentIndex + 1]) {
                allInputs[currentIndex + 1].focus()
            }
        }
    });

    //prevent the enter key from submitting the form, and spacebar from leaving a space.
    inputs.keydown(function (event) {
        //check if the key was a letter
        if(event.originalEvent.keyCode === 32 || event.originalEvent.keyCode === 13) {
            event.preventDefault();
        }
    });

    dialogBox.dialog({
        modal: true,
        resizable: false,
        draggable: false,
        width: 500,
        autoOpen: false
    });

    submitAnswer.on("click", checkResult);

    checkIfCompleted();
});