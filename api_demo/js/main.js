function processChord(response) {
    var contentToAdd = '';
    contentToAdd += '<table>\n' +
        '<th>Tuning</th>\n' +
        '<th>Chord</th>\n' +
        '<th>Chord Image</th>\n';
    response.objects.forEach(element => {
        contentToAdd += '<tr>\n';
        contentToAdd += '<td>' + element.instrument.tuning + '</td>\n';
        contentToAdd += '<td><div>' + element.name + '</div></td>\n';
        contentToAdd += '<td><div class="chord-display">' + element.name + '</div></td>\n';
        // contentToAdd += '<td><img src="' + element.image_url + '"></td>\n';
        contentToAdd += '</tr>\n';

    });
    contentToAdd += '</table>';
    
    $('#chord-content').html(contentToAdd);
    // $.getScript("http://jtab.tardate.com/javascripts/raphael.js", function (script, textStatus, jqXHR) {

    // });

    // $.getScript("http://jtab.tardate.com/javascripts/jtab.js", function (script, textStatus, jqXHR) {

    // });
}

$(function () {
    $('#chord-btn').click(function (e) {
        e.preventDefault();
        var chord = $('#chord-input').val();
        $.ajax({
            url: "http://api.guitarparty.com/v2/chords/?query=" + chord,
            success: function (response) {
                processChord(response);
                jtab.render($('.chord-display'), $('.chord-display').html());
                // $.ajax({
                //     url: "http://api.guitarparty.com" + response.objects[0].uri + "?variations=true",
                //     success: function (res) {
                //         processChord(res);
                //     }
                // });
            }
        });
    });
    // $('#chord-btn').on('click', function () {
    //     var chord = $('#chord-input').val();
    //     $.ajax({
    //         url: "http://api.guitarparty.com/v2/chords/?query=" + chord,
    //         success: function (response) {
    //             processChord(response);
    //         }
    //     });
    // });
});