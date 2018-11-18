var API_KEY = 'ed09cac3481bed883129a60d90b65b9af0b435be';
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Guitarparty-Api-Key', API_KEY);
    }
});

$(document).ready(function () {
    $('#song-search').submit(function (e) {
        e.preventDefault();
        searchSongs();

    });

    $("body").on('DOMSubtreeModified', "#song-table-body", function () {
        $('.view-song').click(function (e) {
            e.preventDefault();
            var songURL = $(this).attr('href');
            viewSong(songURL);
        });
    });
});

function searchSongs() {
    var searchString = $('#search-text').val();
    $.ajax({
        type: "GET",
        url: "http://api.guitarparty.com/v2/songs/?query=" + searchString,
        success: function (response) {
            var htmlContent = "";
            if (response.objects_count > 0) {
                response.objects.forEach(el => {
                    htmlContent += "<tr>";
                    htmlContent += "<td>" + el.title + "</td>";
                    htmlContent += "<td>";
                    el.authors.forEach(author => {
                        htmlContent += author.name + ', ';
                    });
                    htmlContent += "<td><a class='view-song' href='http://api.guitarparty.com" + el.uri + "'>View</a></td>";
                    htmlContent += "</td>";
                    htmlContent += "</tr>";
                });
            } else {
                $('#notfound').html('<div class="alert alert-danger" role="alert">Sorry song or author not found!</div>');
            }


            $('#song-table-body').html(htmlContent);
        }
    });
}

function viewSong(songURL) {
    $.ajax({
        type: "GET",
        url: songURL,
        success: function (response) {
            var songBody = "";
            var chordList = "";
            var authors = "Authors: ";
            var chordList = "Chords: ";
            response.authors.forEach(el => {
                authors += el.name + ",";
            });
            
            for(let x = 0; x < response.chords.length; x++){
                debugger;
                chordList += response.chords[x].name + "\t";
            }

            songBody += response.body_chords_html;
            $('#song-title').html(response.title);
            $('#song-authors').html(authors);
            $('#chord-list').html(chordList);
            $('#song-body').html(songBody);
        }
    }).then(function () {
        $('#song-modal').modal('toggle');
    });
}