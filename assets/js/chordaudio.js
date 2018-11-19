/**
 * Script for playing audio of chords
 * Addeded by: Ballares, Justine
 */

 /**
  * Add function for the button to play the audio
  */
function play(chord) {
    var audio = $('audio[chord="' + chord + '"]')[0];
    audio.currentTime = 0;
    audio.play();
}

/**
 * Display a button that will be used to play the sound of chord
 */
function chordAudio() {
    $(document).ready(function () {
        $('.chord-audio').each(function () {
            var chord = $(this).attr('chord');
            var res = chord.replace('#', '%23');
            var htmlContent = '<audio chord="' + chord + '" src="assets/audio/' + res + '.AAC"></audio>';
            htmlContent += '<a class="btn btn-primary au" onclick="play(\'' + chord + '\')">Play</a>';
            $(this).html(htmlContent);
        });
    });
}

/**
 * Display a button that will be used to play the sound of chord.
 * This will automatically play the sound once loaded which is used in the quiz.
 */
function chordAudioQuiz() {
    $(document).ready(function () {
        $('.chord-audio').each(function () {
            var chord = $(this).attr('chord');
            var res = chord.replace('#', '%23');
            var htmlContent = '<audio chord="' + chord + '" src="assets/audio/' + res + '.AAC" autoplay></audio>';
            htmlContent += '<a class="btn btn-primary au" onclick="play(\'' + chord + '\')">Play</a>';
            $(this).html(htmlContent);
        });
    });
}
