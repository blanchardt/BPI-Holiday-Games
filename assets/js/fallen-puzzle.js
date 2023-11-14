$(function() {
    //get the local storage variable for this page.
    var result = localStorage.getItem("fallen");

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var inputs = $(".input");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#a1")[0], $("#a2")[0], $("#a3")[0], $("#a5")[0], $("#a6")[0], $("#a7")[0], $("#a8")[0], $("#a9")[0], $("#a11")[0], $("#a12")[0], $("#a14")[0], $("#a15")[0], $("#a16")[0], $("#a17")[0], $("#a18")[0], $("#a19")[0], $("#a21")[0], $("#a22")[0], $("#a23")[0], $("#a24")[0], $("#a25")[0], $("#a26")[0], $("#a27")[0], $("#a28")[0], $("#a29")[0], $("#a30")[0], 
                        $("#b3")[0], $("#b4")[0], $("#b5")[0], $("#b7")[0], $("#b8")[0], $("#b10")[0], $("#b11")[0], $("#b12")[0], $("#b13")[0], $("#b14")[0], $("#b16")[0], $("#b17")[0], $("#b19")[0], $("#b20")[0], $("#b21")[0], $("#b22")[0], $("#b23")[0], $("#b24")[0], $("#b25")[0], $("#b27")[0], $("#b28")[0],
                        $("#c1")[0], $("#c2")[0], $("#c3")[0], $("#c4")[0], $("#c5")[0], $("#c6")[0], $("#c7")[0], $("#c8")[0], $("#c9")[0], $("#c11")[0], $("#c12")[0], $("#c13")[0], $("#c14")[0], $("#c15")[0], $("#c16")[0], $("#c17")[0], $("#c18")[0], $("#c19")[0], $("#c21")[0], $("#c22")[0], $("#c23")[0], $("#c24")[0], $("#c25")[0], $("#c26")[0], $("#c27")[0], $("#c28")[0], 
                        $("#d5")[0], $("#d6")[0], $("#d7")[0], $("#d9")[0], $("#d10")[0], $("#d12")[0], $("#d13")[0], $("#d14")[0], $("#d15")[0], $("#d16")[0], $("#d17")[0], $("#d18")[0], $("#d20")[0], $("#d21")[0], $("#d22")[0], $("#d23")[0], $("#e1")[0], $("#e2")[0], $("#e3")[0], $("#e4")[0], $("#e5")[0], $("#e6")[0], $("#e7")[0], $("#e8")[0], $("#e9")[0], $("#e10")[0], $("#e11")[0], $("#e13")[0], $("#e14")[0], $("#e16")[0], $("#e17")[0]];

    //put the answer in a string.
    var answer = "bpiworkstoensuresafeguardsareinplacetoprotectnhresidentsreceivingservicesandtoprotectdhhsinvestmentsinnh"

    //output the clue
    function correctAnswer() {
        dialogText.attr("style", "color: limegreen");
        dialogText.text("correct answer");
        dialogClue.text("Here is your clue!");
        dialogBox.dialog("open");
    }

    //let the know the user got the incorrect answer
    function incorrectAnswer() {
        dialogText.text("incorrect answer");
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
        var userAnswer = "";
        for(var i = 0; i < allInputs.length; i++) {
            userAnswer += allInputs[i].value;
        }
        
        //check if answers are correct, if they are output the clue otherwise let them know they are incorrect.
        if(userAnswer.toLocaleLowerCase() === answer) {
            localStorage.setItem("fallen", "correct");
            correctAnswer();
        }
        else {
            localStorage.setItem("fallen", "wrong");
            incorrectAnswer();
        }
    }

    //after the specific charaters are inputed tab over to the next field.
    inputs.keyup(function (event) {
        //check if the key was a letter
        if(event.originalEvent.keyCode >= 65 && event.originalEvent.keyCode <= 90) {
            var currentIndex = allInputs.indexOf(event.target)
            //went to https://stackoverflow.com/questions/23888537/auto-tab-to-next-input-field-when-fill-4-characters to learn about how to focus onto another
            //input field after pressing a button.  Also credited in the readme file.
            if(allInputs[currentIndex + 1]) {
                allInputs[currentIndex + 1].focus()
            }
        }
    });

    //only allow certain characters to be entered in the boxes.
    inputs.keydown(function (event) {
        //check if the key was a letter
        if(!(event.originalEvent.keyCode === 9 || event.originalEvent.keyCode === 8 || event.originalEvent.keyCode === 46 || event.originalEvent.keyCode >= 65 && event.originalEvent.keyCode <= 90)) {
            console.log(event.originalEvent.keyCode);
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