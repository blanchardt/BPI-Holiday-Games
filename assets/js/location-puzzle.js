$(function() {
    //get the local storage variable for this page.
    var result = localStorage.getItem("location");

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogPreClue = $("#pre-clue");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#pic1")[0], $("#pic2")[0], $("#pic3")[0], $("#pic4")[0], $("#pic5")[0], $("#pic6")[0], $("#pic7")[0], $("#pic8")[0]];

    //put the answer in a string.
    var answers = [1, 4, 6, 1, 5, 6, 3, 5];

    //output the clue
    function correctAnswer() {
        dialogText.attr("style", "color: limegreen");
        dialogText.text("Congratulations for successfully completing the game.");
        dialogPreClue.text("Here is your clue for the grand prize.");
        dialogClue.text("1814");
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

    function checkResult(event, myYes) {
        event.preventDefault();

        var totalCorrect = 0;

        //check for any incorrect answers.
        for(var i = 0; i < allInputs.length; i++) {
            if(allInputs[i].value == answers[i]) {
                totalCorrect++;
            }
        }
        
        if(totalCorrect >= 6) {
            localStorage.setItem("location", "correct");
            correctAnswer();
        }
        else {
            localStorage.setItem("location", "wrong");
            incorrectAnswer();
        }
    }

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