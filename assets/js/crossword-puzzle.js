$(function() {
    //get the local storage variable for this page.
    var result = localStorage.getItem("crossword");

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var inputs = $(".input");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var dialogClue = $("#clue");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#a5")[0], $("#b2")[0], $("#b5")[0], $("#c2")[0], $("#c5")[0], $("#c9")[0], $("#d2")[0], $("#d5")[0], $("#d9")[0], $("#e1")[0], $("#e2")[0], $("#e3")[0], $("#e4")[0], $("#e5")[0], $("#e9")[0], $("#e13")[0], $("#f2")[0], $("#f9")[0], $("#f13")[0], $("#g2")[0], $("#g9")[0], $("#g13")[0], 
                        $("#h2")[0], $("#h9")[0], $("#h13")[0], $("#i2")[0], $("#i3")[0], $("#i4")[0], $("#i5")[0], $("#i6")[0], $("#i7")[0], $("#i8")[0], $("#i9")[0], $("#i10")[0], $("#i11")[0], $("#i12")[0], $("#i13")[0], $("#i14")[0], $("#i15")[0], $("#i16")[0], $("#i17")[0], $("#i18")[0], 
                        $("#j3")[0], $("#j9")[0], $("#j13")[0], $("#k3")[0], $("#k13")[0], $("#l3")[0], $("#l6")[0], $("#l7")[0], $("#l8")[0], $("#l9")[0], $("#l10")[0], $("#l11")[0], $("#l12")[0], $("#l13")[0], $("#l14")[0], $("#l15")[0], $("#l16")[0], $("#l17")[0], $("#l18")[0], $("#m3")[0], $("#m9")[0], $("#m13")[0], 
                        $("#n3")[0], $("#n9")[0], $("#n11")[0], $("#n12")[0], $("#n13")[0], $("#n14")[0], $("#n15")[0], $("#n16")[0], $("#n17")[0], $("#n18")[0], $("#n19")[0], $("#n20")[0], $("#o9")[0], $("#o13")[0], $("#p9")[0], $("#p13")[0], $("#p14")[0], $("#p15")[0], $("#p16")[0], $("#p17")[0], $("#p18")[0], $("#p19")[0], $("#p20")[0], 
                        $("#q5")[0], $("#q9")[0], $("#q14")[0], $("#r4")[0], $("#r5")[0], $("#r6")[0], $("#r7")[0], $("#r8")[0], $("#r9")[0], $("#r10")[0], $("#r14")[0], $("#s5")[0], $("#s9")[0], $("#s14")[0], $("#t5")[0], $("#t9")[0], $("#t14")[0], 
                        $("#u5")[0], $("#u14")[0], $("#u15")[0], $("#u16")[0], $("#u17")[0], $("#u18")[0], $("#v5")[0], $("#w5")[0]];

    //put the answer in a string.
    var answer = "rciovgceawatermicbnolvlieabbottandcostellorgteiastopimaginingtoahicottontailnotrailroadtlsfrisbeeyoslusubmatchle";

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
            localStorage.setItem("crossword", "correct");
            correctAnswer();
        }
        else {
            localStorage.setItem("crossword", "wrong");
            incorrectAnswer();
        }
    }

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