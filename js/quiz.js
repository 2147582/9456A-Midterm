//variables
var quiz = [];

quiz[0] = new Question("<div class=\"jtab\">%0/X.2/2.2/3.0/X.0/X.0/X</div>", "Em", "D", "G", "C");
quiz[1] = new Question("<div class=\"jtab\">%0/X.0/X.0/X.2/1.3/3.2/2</div>", "D", "Em", "G", "C");
quiz[2] = new Question("<div class=\"jtab\">%3/1.2/2.0/X.0/X.0/X.3/4</div>", "G", "D", "Em", "C");
quiz[3] = new Question("<div class=\"jtab\">%0/X.3/1.2/2.0/X.1/3.0/X</div>", "C", "D", "Em", "G");

var randomQuestion;
var answers = [];
var currentScore = 0;
var streak = 0;

var incorrect = 0;
var total = 0;

var timer = 30;
var interval = setInterval(function () {
    document.getElementById('count').innerHTML = timer;

    if (timer === 0) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        // or...

        alertify.alert(
            'Results',
            `<div class="grid-x grid-padding-x align-center-middle text-center">
                <div class="clipped-circle-graph" data-clipped-circle-graph data-percent="` + ((total - incorrect) / total * 100).toFixed(2) + `">
                    <div class="clipped-circle-graph-progress">
                        <div class="clipped-circle-graph-progress-fill"></div>
                    </div>
                    <div class="clipped-circle-graph-percents">
                        <div class="clipped-circle-graph-percents-wrapper">
                            <span class="clipped-circle-graph-percents-number"></span>
                            <span class="clipped-circle-graph-percents-units">of 100</span>
                        </div>
                    </div>
                </div>
                <div class="cell small-6">
                    <p>Your accuracy is ` + ((total - incorrect) / total * 100).toFixed(2) + `</p>
                    <p>Your score is ` + currentScore + `</p>
                </div>
            </div>`,
            // 'Your time is up!<br>Your score is ' + currentScore + '<br>Your accuracy is ' + ((currentScore / (currentScore + incorrect)) * 100).toFixed(2) + '%',
            function () {
                window.location = '/';
            }).set({
            'closableByDimmer': false
        });
        $("[data-clipped-circle-graph]").each(function () {
            var $graph = $(this),
                percent = parseInt($graph.data('percent'), 10),
                deg = 30 + (300 * percent) / 100;
            if (percent > 50) {
                $graph.addClass('gt-50');
            }
            $graph.find('.clipped-circle-graph-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
            $graph.find('.clipped-circle-graph-percents-number').html(percent + '%');
        });
    }
    timer--;
}, 1000);

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
        alertify.set('notifier', 'delay', '3');
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Correct <b>+1</b>');

        if (streak === 3) {
            timer += 3;
            streak = 0;
            alertify.success('Time Bonus <b>+3</b>');
        }
        jtab.render($('#question'));
    } else {
        alertify.set('notifier', 'delay', '3');
        alertify.set('notifier', 'position', 'top-right');
        alertify.error('Wrong <b>-1</b>');
        adjustScore(false);
    }
}