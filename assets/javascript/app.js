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
        $('#'+ i).append(questionDiv, cardList);

        console.log(quizQues[i].answers);
    }
}

function showAnswers() {

}

function showResults() {
    $('#quiz').hide();
    $('#remaining').text("Below are your results!");
    $('#submit-place').hide();
    $('<button type="button" class="btn btn-primary btn-large" id="refresh">').text("Refresh Quiz")
        .appendTo('#results');
    clearInterval(quizInterval);
    timeConv = 120000;
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

