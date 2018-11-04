function searchTab() {
    var song = $('#tab-search').val();

    var tabResults;
    $.getJSON('https://www.songsterr.com/a/ra/songs.json?pattern=' + song, function (data) {
        console.log(data);
        tabResults = data;
    }).then(function () {
        var tableContent = "";
        tabResults.forEach(el => {
            tableContent +=
                `<tr>
                <th scope="row">` + el.id + `</th>
                <td>` + el.title + `</td>
                <td>` + el.artist.name + `</td>
                <td><a class="btn btn-primary" href="http://www.songsterr.com/a/wa/song?id=` + el.id + `" target="_blank">View<a></td>
            </tr>`;
        });

        $('#tab-table-body').html(tableContent);
    });
}