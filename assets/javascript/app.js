$(document).ready(function() {

var timeConv = 120000;
var timeLeft = timeConverter(timeConv);
console.log(timeLeft);
var quizInterval;

function timeConverter(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

function showTime() {
    timeLeft = timeConverter(timeConv)
    $('#remaining').text('Time Remaining: ' + timeLeft)
}

$('#start-btn').on("click", function() {
    // console.log("start button worked");
    // reset();
    makeQuiz();
    showTime();
    $('<button type="button" class="btn btn-primary btn-large mx-auto" id="submit">').text("Submit")
        .appendTo('#submit-place');
    $('#start-btn').hide();
    quizInterval = setInterval(function() { 
        timeConv = timeConv-1000; 
        showTime();
        timeUp();
        }, 1000);
    });
    
var quizQues = [
    {
    question: "What color is the sky?",
    answers: {
        a: "blue",
        b: "orange",
        c: "green",
        d: "none of the above"
        },
    correct: "a",
    },
{
    question: "What color are tomatoes?",
    answers: {
        a: "this is a trick question",
        b: "orange",
        c: "green",
        d: "red"
    },
    correct: "a",
},
{
    question: "What is the capital of Texas?",
    answers: {
        a: "Dallas",
        b: "Round Rock",
        c: "Austin",
        d: "Texas doesn't exist"
    },
    correct: "c",
}
]

function makeQuiz() {
    // var quesAns;
    for (i=0; i<quizQues.length; i++) {
        var ans = quizQues[i].answers;
        var correct = quizQues[i].correct;
        var quesNum = 1+i;

        console.log(ans)
        $('<div>').attr({
            id: i,
            class: "card mb-3",
            style: "width: 80%;"
        }).appendTo('#quiz')

        var questionDiv = $('<div>').text(quesNum + ".  " + quizQues[i].question).addClass('question card-header');
        var cardList = $('<ul>').addClass("list-group list-group-flush");
        // var correctAns = $(quizQues[i].correct);
        
        console.log("correct answer " + quesNum + ": ", correct)
        for (key in ans) {
            var cardItem = $('<li>').addClass("list-group-item");
            var radioBtn = $('<input>').attr({
                type: "radio",
                class:"form-check-input ml-1",
                id: quesNum + key,
                value: key,
                name: quesNum,
                correctAns: correct,
            });
            var btnLabel = $('<label>').attr({
                class: "form-check-label ml-4",
                for: key,
            }) 

            $(btnLabel).text(ans[key]);
            $(cardItem).append(radioBtn, btnLabel);
            $(cardList).append(cardItem);
        }
        var cardForm = $('<form>').attr("id", "cardform" + quesNum);
        $(cardForm).append(cardList);
        $('#'+ i).append(questionDiv, cardForm);

        console.log(quizQues[i].answers);
    }
}


var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;

function updateResults() {
    $('#num-correct').text(numCorrect);
    $('#num-incorrect').text(numIncorrect);
    $('#num-unanswered').text(numUnanswered);
}

function showResults() {
    $('#quiz').hide();
    $('#remaining').text("Below are your results!");
    $('#submit-place').hide();
    var refreshBtn = $('<button type="button" class="btn btn-primary btn-large" id="refresh">').text("Refresh Quiz");

    $('<div>').attr({
        class: "card-group",
        id: "result-cards"
    }).appendTo('#results');
    // add text for correct, incorrect, and unanswered to #results div
    for (i=0; i<3; i++) {
        var resultCard = $('<div>').attr({
            class: "card mx-0 mb-3",
            style: "max-width: 18rem",
            id: "card-" + i,
            });
        var cardHeader = $('<div>').attr({
            class: "card-header",
            id: "header-"+ i,
        });
        var cardBody = $('<div>').attr({
            class: "card-body",
            id: "body-"+ i,
        });

        $(resultCard).append(cardHeader, cardBody);
        $('#result-cards').append(resultCard);
    };

    $('#header-0').text("CORRECT");
    $('#header-1').text("INCORRECT");
    $('#header-2').text("UNANSWERED");
    
    $('<h2>').text(numCorrect).attr('id', 'num-correct').appendTo('#body-0');
    $('<h2>').text(numIncorrect).attr('id', 'num-incorrect').appendTo('#body-1');
    $('<h2>').text(numUnanswered).attr('id', 'num-unanswered').appendTo('#body-2');

    
    // calculate which questions were answered correctly
    if ($("input:radio[name='1']").is(":checked")) {
        var q1val = $("input[name='1']:checked").val();
        if (q1val === quizQues[0].correct) {
            numCorrect++;
            updateResults();
        } else {
            numIncorrect++;
            updateResults();
        }
    } else {
        numUnanswered++;
        updateResults();
    }
    if ($("input:radio[name='3']").is(":checked")) {
        var q2val = $("input[name='2']:checked").val();
        if (q2val === quizQues[1].correct) {
            numCorrect++;
            updateResults();
        } else {
            numIncorrect++;
            updateResults();
        }
    } else {
        numUnanswered++;
        updateResults();
    }
    if ($("input:radio[name='3']").is(":checked")) {
        var q3val = $("input[name='3']:checked").val();
        if (q3val === quizQues[1].correct) {
            numCorrect++;
            updateResults();
        } else {
            numIncorrect++;
            updateResults();
        }
    } else {
        numUnanswered++;
        updateResults();
    }

    // if (q1val === )

    console.log(q1val);
    // calculate which questions were unanswered

    clearInterval(quizInterval);
    timeConv = 120000;

    // append everything to #results
    var br = $('<br>');
    $('#results').append(br, refreshBtn)
}

function timeUp() {
    if (timeConv === 0) {
        clearInterval(quizInterval);
        showResults();
    }
}

$('#submit-place').on("click", showResults);
$('#results').on("click", reset);


function reset() {
    // $('#quiz').show();
    // $('#remaining').show();
    // $('#submit-place').show();
    // var timeConv = 120000;
    location.reload();
}
});

