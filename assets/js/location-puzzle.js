$(function() {
    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var inputs = $(".input");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#pic1")[0], $("#pic2")[0], $("#pic3")[0], $("#pic4")[0], $("#pic5")[0], $("#pic6")[0], $("#pic7")[0], $("#pic8")[0]];

    //put the answer in a string.
    var answers = [1, 4, 6, 1, 5, 6, 3, 5]

    function checkResult(event, myYes) {
        event.preventDefault();

        console.log($("#pic1")[0].value);

        var allCorrect = true;

        //check for any incorrect answers.
        for(var i = 0; i < allInputs.length; i++) {
            if(allInputs[i].value != answers[i]) {
                allCorrect = false;
                break;
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
            dialogClue.text("");
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