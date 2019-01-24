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
    $('<button type="button" class="btn btn-primary btn-large" id="submit">').text("Submit")
        .appendTo('#submit-place');
    $('#start-btn').hide();
    quizInterval = setInterval(function() { 
        timeConv = timeConv-1000; 
        showTime();
        timeUp()
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
    correct: "a"
},
{
    question: "What color are tomatoes?",
    answers: {
        a: "this is a trick question",
        b: "orange",
        c: "green",
        d: "red"
    },
    correct: "a"
},
{
    question: "What is the capital of Texas?",
    answers: {
        a: "Dallas",
        b: "Round Rock",
        c: "Austin",
        d: "Texas doesn't exist"
    },
    correct: "c"
}
]

function makeQuiz() {
    // var quesAns;
    for (i=0; i<quizQues.length; i++) {
        // console.log(quizQues[i].question)

        // quesAns = [];
        // for(letter in questions[i].answers){
        //     $('<input type="radio" name="rbtnCount">').answers.push
        // }

        $('<p>').text(quizQues[i].question).addClass('question').appendTo('#quiz');
        $('<label>').text(quizQues[i].answers).addClass('answer').appendTo('#quiz');

        console.log(quizQues[i].answers);
    }
}
// makeQuiz();

function showAnswers() {

}

function showResults() {
    $('#quiz').hide();
    $('#remaining').hide();
    $('#submit-place').hide();
    $('<button type="button" class="btn btn-primary btn-large" id="refresh">').text("Refresh Quiz")
        .appendTo('#results');
    clearInterval(quizInterval);
    timeConv = 120000;
}

function timeUp() {
    if (timeConv === 0) {
        clearInterval(quizInterval);
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

