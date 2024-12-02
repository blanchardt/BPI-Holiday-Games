$(function() {
    //get the local storage variable for this page.
    var result = localStorage.getItem("matching");

    // Selects element by class
    var timeEl = $(".time"); //document.querySelector(".time");

    var secondsLeft = 90;

    //set up the countdown
    function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.text(secondsLeft + " seconds left till until finished.");
            //timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

            if (secondsLeft === 0) {
                // Stops execution of action at set interval
                clearInterval(timerInterval);
                // Set the text and submit the result.
                timeEl.text("Times Up!");
                submitResult();
            }

        }, 1000);
    }

    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");
    var dialogBox = $("#result");
    var dialogText = $("#message");
    var messageBox = $("#before-start");
    var messageText = $("#premessage");
    var messageButton = $("#close-button");
    var dialogPreClue = $("#pre-clue");
    var dialogClue = $("#clue");
    var grid = $(".matching-grid");

    //store all the card fields in the grid into an aray.
    var allInputs = [$("#1a"), $("#1b"), $("#1c"), $("#1d"), $("#1e"), $("#1f"), 
                        $("#2a"), $("#2b"), $("#2c"), $("#2d"), $("#2e"), $("#2f"),
                        $("#3a"), $("#3b"), $("#3c"), $("#3d"), $("#3e"), $("#3f"), 
                        $("#4a"), $("#4b"), $("#4c"), $("#4d"), $("#4e"), $("#4f"), 
                        $("#5a"), $("#5b"), $("#5c"), $("#5d"), $("#5e"), $("#5f"), 
                        $("#6a"), $("#6b"), $("#6c"), $("#6d"), $("#6e"), $("#6f")];

    //store the answers in an array.
    var answer = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "Z", "Z", "Y", "Y", "X", "X", "W", "W", "0", "0", "1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"];

    //create variable to keep track of how many cards have been revealed and the score.
    var revealed = 0;
    var score = 0;

    //keep track of the cards revealed.
    var revealedCard1;
    var revealedCard2;

    //Went to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array to learn of a way to randomize arrays.
    //randomize the array
    function shuffle() {
        let currentIndex = allInputs.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [allInputs[currentIndex], allInputs[randomIndex]] = [
                allInputs[randomIndex], allInputs[currentIndex]];

            //set the balue of the cards.
            allInputs[currentIndex].attr("data-number", answer[currentIndex]);
        }
    }

    //output the clue
    function showResult(total) {
        dialogText.attr("style", "color: limegreen");
        dialogText.text("Thank you for playing the game.");
        dialogPreClue.text("Please Screenshot your score before exiting.");
        dialogClue.text("Score: " + total);
        dialogBox.dialog("open");
    }

    //warn the user about the timer
    function startMessage() {
        messageText.text("Once you hit start the timer will start.  Find as many matches as you can before time runs out.")
        messageBox.dialog("open");
    }

    //check if user already completed the game or not, they can only complete it once.
    function checkIfCompleted() {
        if ($.isNumeric(result)) {
            showResult(result);
        }
        else {
            shuffle();
            startMessage();
        }
    }

    function submitResult(event, myYes) {
        submitResult();
    }
    function submitResult() {
        //Reveal the players score
        localStorage.setItem("matching", score);
        showResult(score);
    }

    //only allow certain characters to be entered in the boxes.
    grid.click(function (event) {
        //get the element that was clicked on.
        var element = event.target;

        //do something if the element has a class of box
        if (element.matches(".box")) {
            var state = element.getAttribute("data-state");

            // Use an if statement to conditionally render the value on the card as long as there aren't already 2 cards revealed.
            if (state === "hidden" && revealed < 2) {
                // If the card is clicked while the state is "hidden", we set .textContent to the number
                element.textContent = element.dataset.number;
                element.textContent = element.getAttribute("data-number");

                // Using the dataset property, we change the state to visible because the user can now see the number
                element.dataset.state = "visible";
                element.setAttribute("data-state", "visible");
                revealed++;
                if (revealed == 1) {
                    revealedCard1 = element;
                }
                else if (revealed == 2) {
                    revealedCard2 = element;
                    if (revealedCard1.getAttribute("data-number") == revealedCard2.getAttribute("data-number")) {
                        score++;
                        revealed = 0;
                    }
                    else { 
                        //wait a couple seconds
                        setTimeout(function () {
                            revealed = 0;

                            //reset the cards and let the player continue playing.
                            revealedCard1.textContent = "";
                            revealedCard1.setAttribute("data-state", "hidden");
                            revealedCard2.textContent = "";
                            revealedCard2.setAttribute("data-state", "hidden");

                        }, 1500);
                    }
                }
            } else {
                // 'Hide' the number by setting .textContent to an empty string
                element.textContent = "";
                // Use .setAttribute() method
                element.setAttribute("data-state", "hidden");
            }
        }
    });


    //Have messagebox close on button press
    messageButton.click(function () {
        messageBox.dialog("close");

        //start the timer
        setTime();
    });

    dialogBox.dialog({
        modal: true,
        resizable: false,
        draggable: false,
        width: 500,
        autoOpen: false
    });
    messageBox.dialog({
        modal: true,
        resizable: false,
        draggable: false,
        width: 500,
        autoOpen: false
    });

    submitAnswer.on("click", submitResult);

    checkIfCompleted();
});