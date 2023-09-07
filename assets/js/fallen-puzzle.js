$(function() {
    //get the ids of certain elements and store them in variables.
    var submitAnswer = $("#submit");

    //store all the input fields in the grid into an aray.
    var allInputs = [$("#a1"), $("#a2"), $("#a3"), $("#a5"), $("#a6"), $("#a7"), $("#a8"), $("#a9"), $("#a11"), $("#a12"), $("#a14"), $("#a15"), $("#a16"), $("#a17"), $("#a18"), $("#a19"), $("#a21"), $("#a22"), $("#a23"), $("#a24"), $("#a25"), $("#a26"), $("#a27"), $("#a28"), $("#a29"), $("#a30"), 
                        $("#b3"), $("#b4"), $("#b5"), $("#b7"), $("#b8"), $("#b10"), $("#b11"), $("#b12"), $("#b13"), $("#b14"), $("#b16"), $("#b17"), $("#b19"), $("#b20"), $("#b21"), $("#b22"), $("#b23"), $("#b24"), $("#b25"), $("#b27"), $("#b28"),
                        $("#c1"), $("#c2"), $("#c3"), $("#c4"), $("#c5"), $("#c6"), $("#c7"), $("#c8"), $("#c9"), $("#c11"), $("#c12"), $("#c13"), $("#c14"), $("#c15"), $("#c16"), $("#c17"), $("#c18"), $("#c19"), $("#c21"), $("#c22"), $("#c23"), $("#c24"), $("#c25"), $("#c26"), $("#c27"), $("#c28"), 
                        $("#d5"), $("#d6"), $("#d7"), $("#d9"), $("#d10"), $("#d12"), $("#d13"), $("#d14"), $("#d15"), $("#d16"), $("#d17"), $("#d18"), $("#d20"), $("#d21"), $("#d22"), $("#d23"), $("#e1"), $("#e2"), $("#e3"), $("#e4"), $("#e5"), $("#e6"), $("#e7"), $("#e8"), $("#e9"), $("#e10"), $("#e11"), $("#e13"), $("#e14"), $("#e16"), $("#e17")];

    //put the answer in a string.
    var answer = "bpiworkstoensuresafeguardsareinplacetoprotectnhresidentsreceivingservicesandtoprotectdhhsinvestmentsinnh"

    function checkResult(event) {
        var userAnswer = "";
        for(var i = 0; i < allInputs.length; i++) {
            userAnswer += allInputs[i][0].value;
        }
        
        if(userAnswer === answer) {
            console.log("correct answer");
        }
        else {
            console.log("incorrect answer");
        }
    }

    submitAnswer.on("click", checkResult);
});