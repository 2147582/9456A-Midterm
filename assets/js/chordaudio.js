function play(chord) {
    var audio = $('audio[chord=' + chord + ']')[0];
    audio.currentTime = 0;
    audio.play();
}

$(document).ready(function () {
    $('.chord-audio').each(function () {
        var chord = $(this).attr('chord');
        var htmlContent = '<audio chord="' + chord + '" src="assets/audio/' + chord + '.AAC"></audio>';
        htmlContent += '<a class="btn btn-primary" onclick="play(\'' + chord + '\')">Play</a>';
        $(this).html(htmlContent);
    });
});