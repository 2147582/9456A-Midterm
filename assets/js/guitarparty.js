var API_KEY = 'ed09cac3481bed883129a60d90b65b9af0b435be';
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Guitarparty-Api-Key', API_KEY);
    }
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
                    htmlContent += "<td><a href='http://api.guitarparty.com" + el.uri + "'>View</a></td>";
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

$(document).ready(function () {
    $('#song-search').submit(function (e) {
        e.preventDefault();
        searchSongs();
    });
});