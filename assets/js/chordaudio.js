/**
 * Script for playing audio of chords
 * Addeded by: Ballares, Justine
 */

function play(chord) {
    var audio = $('audio[chord="' + chord + '"]')[0];
    audio.currentTime = 0;
    audio.play();
}

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
