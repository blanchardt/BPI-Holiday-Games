$(function() {
    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#person1")[0], $("#person2")[0], $("#person3")[0], $("#person4")[0], $("#person5")[0], $("#person6")[0], $("#person7")[0]];

    //put the answer in a string.
    var answers = [7, 1, 6, 5, 3, 2, 4]

    function checkResult(event, myYes) {
        event.preventDefault();

        var allCorrect = true;
        var totalIncorrect = 0;

        //check for any incorrect answers.
        for(var i = 0; i < allInputs.length; i++) {
            if(allInputs[i].value != answers[i]) {
                allCorrect = false;
                totalIncorrect++;
            }
        }
        
        if(allCorrect) {
            dialogText.attr("style", "color: limegreen");
            dialogText.text("correct answer");
            dialogClue.text("Here is your clue!");
            dialogBox.dialog("open");
        }
        else {
            dialogText.text("incorrect answer");
            dialogClue.text(`You got ${totalIncorrect} incorrect out of ${allInputs.length}`);
            dialogText.attr("style", "color: red");
            dialogBox.dialog("open");
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

    submitAnswer.on("click", checkResult);
});