/**
 * Script necessary to play audio exercise
 * Added by: Ballares, Justine
 */

//variables
var quiz;
var randomQuestion;
var answers = [];
var currentScore = 0;
var streak = 0;

var incorrect = 0;
var total = 0;
var timer = 30;

/**
 * This is used to start the activity along with the time limit in identifying the chords.
 */
function startTimer(exerciseNumber) {
    /**
     * Retrieve the json file for the exercise corresponding to the level that is selected
     */
    $.getJSON("assets/js/exercises/chord" + exerciseNumber + ".json", function (data) {
        quiz = data;
    }).then(function () {
        btnProvideQuestion();
    });

    /**
     * Start the timer
     */
    var interval = setInterval(function () {
        document.getElementById('count').innerHTML = timer;

        /**
         * Check if timer is 0 then display the modal containing the accuracy and score of the user
         */
        if (timer === 0) {
            clearInterval(interval);
            document.getElementById('count').innerHTML = 'Done';
            $('#scoreResult').html('<b>Score</b>: ' + currentScore);
            $('#accuracy').html('<b>Accuracy</b>: ' + (((total - incorrect) / total) * 100).toFixed(2));
            $('#scoreModal').modal('toggle');
            recordScore(currentScore, (((total - incorrect) / total) * 100).toFixed(2), exerciseNumber, 'chord');
        }
        timer--;
    }, 1000);
}

/**
 * shuffle the given array
 */
function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

/**
 * Get the random question from the JSON of questions then shuffle the choices for the users.
 */
function btnProvideQuestion() {

    var randomNumber = Math.floor(Math.random() * quiz.length);
    randomQuestion = quiz[randomNumber]; //getQuestion
    answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2, randomQuestion.wrongAnswer3];
    shuffle(answers);

    /**
     * Display the contents (questions and choices)
     */
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
    /**
     * Initialize the diagram of chords to be identified
     */
    $('.chord').each(function () {
        var chord = $(this).attr('chord');
        drawBlankChord(chord, this);
    })
}

/**
 * Add function when one of the choices is clicked
 */
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

/**
 * Add score if the answer is correct and also add the streak
 */
function adjustScore(isCorrect) {
    total++;
    if (isCorrect) {
        currentScore++;
        streak++;
    } else {
        incorrect++;
        streak = 0;
    }
    document.getElementById("score").innerHTML = currentScore;
}

/**
 * check if the answer of the user is correct
 */
function checkAnswer(answer) {

    /**
     * If the answer matches the right answer in the JSON of question adjust the score and provide the next question
     */
    if (answer == randomQuestion.rightAnswer) {
        adjustScore(true);
        btnProvideQuestion();
        $('#notifier').html('<div class="alert alert-success" role="alert">Correct <b>+1</b></div>');
        
        /**
         * Check if the user is correct three times in a row then increase the time by three.
         */
        if (streak === 3) {
            timer += 3;
            streak = 0;
            $('#notifier').html('<div class="alert alert-success" role="alert">Time Bonus <b>+3</b></div>');
        }
    } else {
        $('#notifier').html('<div class="alert alert-danger" role="alert">Wrong</div>');
        adjustScore(false);
    }
}