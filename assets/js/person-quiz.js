$(function() {
    //get the local storage variable for this page.
    var triesCompleted = localStorage.getItem("tries");
    var result = localStorage.getItem("baby");

    //store the remaining amount of tries here.
    var triesRemaining = 3 - triesCompleted;

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var dialogBox = $("#result");
    var dialogBoxFinal = $("#final-result");
    var dialogResult = $("#quiz-result");
    var dialogText = $("#message");
    var dialogTries = $("#tries");
    var dialogBox = $("#result");
    var finalDialogText = $("#final-message");
    var finalDialogPreClue = $("#pre-clue");
    var finalDialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#person1")[0], $("#person2")[0], $("#person3")[0], $("#person4")[0], $("#person5")[0], $("#person6")[0], $("#person7")[0]];

    //put the answer in a string.
    var answers = [7, 1, 6, 5, 3, 2, 4];

    //output the clue
    function finalCorrectAnswer() {
        finalDialogText.attr("style", "color: limegreen");
        finalDialogText.text("Congratulations for successfully completing the game.");
        finalDialogPreClue.text("Here is your clue for the grand prize.");
        finalDialogClue.text("The nation’s oldest");
        dialogBoxFinal.dialog("open");
    }

    //let the user know they got the incorrect answer and all out of tries.
    function finalIncorrectAnswer() {
        finalDialogText.text("Sorry, you did not successfully complete this game.  This was the last game.  Hope you enjoyed playing.");
        finalDialogPreClue.text(`You have ${triesRemaining} tries remaining.`);
        finalDialogText.attr("style", "color: red");
        dialogBoxFinal.dialog("open");
    }

    //let the know the user got the incorrect answer
    function incorrectAnswer(totalCorrect) {
        dialogResult.text("Sorry, you did not successfully complete this game.  Better luck next try.");
        dialogText.text(`You got ${totalCorrect} correct out of ${allInputs.length}`);
        if (triesRemaining === 1) {
            dialogTries.text(`You have ${triesRemaining} try remaining.`);
        }
        else {
            dialogTries.text(`You have ${triesRemaining} tries remaining.`);
        }
        dialogResult.attr("style", "color: red");
        dialogBox.dialog("open");
    }

    //check if user already completed the game or not, they can only complete it once.
    function checkIfCompleted() {
        if (result == "correct") {
            finalCorrectAnswer();
        }
        else if (result == "wrong") {
            finalIncorrectAnswer();
        }
    }

    function checkResult(event, myYes) {
        event.preventDefault();

        var allCorrect = true;
        var totalCorrect = 0;

        //check for any incorrect answers.
        for(var i = 0; i < allInputs.length; i++) {
            if(allInputs[i].value != answers[i]) {
                allCorrect = false;
            }
            else {
                totalCorrect++;
            }
        }
        
        if(allCorrect) {
            localStorage.setItem("baby", "correct");
            finalCorrectAnswer();
        }
        else {
            triesRemaining = 3 - ++triesCompleted;
            localStorage.setItem("tries", triesCompleted);
            if (triesCompleted === 3) {
                localStorage.setItem("baby", "wrong");
                finalIncorrectAnswer();
            }
            else {
                incorrectAnswer(totalCorrect);
            }
        }
    }

    dialogBox.dialog({
        modal: true,
        resizable: false,
        draggable: false,
        width: 500,
        autoOpen: false,
        buttons: [
            {
              text: "Confirm",
              closeOnEscape: false,
              click: function() {
                $(this).dialog( "close" );
              }
            }
          ]
    });

    dialogBoxFinal.dialog({
        modal: true,
        resizable: false,
        draggable: false,
        width: 500,
        autoOpen: false
    });

    submitAnswer.on("click", checkResult);

    checkIfCompleted();
});