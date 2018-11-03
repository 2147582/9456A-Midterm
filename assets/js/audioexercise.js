//variables
var quiz = [];

quiz[0] = new Question('<audio></audio>', "Em", "D", "G", "C");
quiz[1] = new Question('<canvas class="chord" chord="D" width="180" height="200"></canvas>', "D", "Em", "G", "C");
quiz[2] = new Question('<canvas class="chord" chord="G" width="180" height="200"></canvas>', "G", "D", "Em", "C");
quiz[3] = new Question('<canvas class="chord" chord="C" width="180" height="200"></canvas>', "C", "D", "Em", "G");

var randomQuestion;
var answers = [];
var currentScore = 0;
var streak = 0;

var incorrect = 0;
var total = 0;

var timer = 30;

function startTimer() {
    var interval = setInterval(function () {
        document.getElementById('count').innerHTML = timer;

        if (timer === 0) {
            clearInterval(interval);
            document.getElementById('count').innerHTML = 'Done';
            $('#scoreResult').html('<b>Score</b>: ' + currentScore);
            $('#accuracy').html('<b>Accuracy</b>: ' + (((total - incorrect) / total) * 100).toFixed(2));
            $('#scoreModal').modal('toggle');

        }
        timer--;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function (event) {
    btnProvideQuestion();
});

function Question(question, rightAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3;
};

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function btnProvideQuestion() {

    var randomNumber = Math.floor(Math.random() * quiz.length);
    randomQuestion = quiz[randomNumber]; //getQuestion
    answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2, randomQuestion.wrongAnswer3];
    shuffle(answers);

    document.getElementById("question").innerHTML = randomQuestion.question;
    document.getElementById("answerA").value = answers[0];
    document.getElementById("answerA").innerHTML = answers[0];
    document.getElementById("answerB").value = answers[1];
    document.getElementById("answerB").innerHTML = answers[1];
    document.getElementById("answerC").value = answers[2];
    document.getElementById("answerC").innerHTML = answers[2];
    document.getElementById("answerD").value = answers[3];
    document.getElementById("answerD").innerHTML = answers[3];

    var chords;

    //get json from root directory/js/chords.json
    $.getJSON("assets/js/chords.json", function (data) {
        chords = data;
    }).then(function () {
        $('.chord').each(function () {
            var chord = $(this).attr('chord');
            drawBlankChord(chord, this, chords);
        })

    });
}

function answerA_clicked() {
    var answerA = document.getElementById("answerA").value;
    checkAnswer(answerA);
}

function answerB_clicked() {
    var answerB = document.getElementById("answerB").value;
    checkAnswer(answerB);
}

function answerC_clicked() {
    var answerC = document.getElementById("answerC").value;

    checkAnswer(answerC);
}

function answerD_clicked() {
    var answerD = document.getElementById("answerD").value;

    checkAnswer(answerD);
}

function adjustScore(isCorrect) {
    // debugger;
    total++;
    if (isCorrect) {
        currentScore++;
        streak++;
    } else {
        incorrect++;
        streak = 0;
        if (currentScore > 0) {
            currentScore--;
        }
    }
    document.getElementById("score").innerHTML = currentScore;
}

function checkAnswer(answer) {

    if (answer == randomQuestion.rightAnswer) {
        adjustScore(true);
        btnProvideQuestion();
        $('#notifier').html('<div class="alert alert-success" role="alert">Correct <b>+1</b></div>');

        if (streak === 3) {
            timer += 3;
            streak = 0;
            $('#notifier').html('<div class="alert alert-success" role="alert">Time Bonus <b>+3</b></div>');
        }
    } else {
        $('#notifier').html('<div class="alert alert-danger" role="alert">Wrong <b>-1</b></div>');
        adjustScore(false);
    }
}