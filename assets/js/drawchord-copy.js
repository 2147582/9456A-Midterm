var fretHeight = 20;
var stringWidth = 20;
var textOffsetY = -3;

function removeX(array) {
    var searchTerm = 'x';
    cleanArray = [];

    for (n = 0; n <= array.length - 1; n++) {
        if (array[n] != searchTerm) {
            cleanArray.push(parseInt(array[n]));
        }
    }
    return cleanArray;
}

function initChords() {
    var chords;
    //get json from root directory/js/chords.json
    $.getJSON("assets/js/chords.json", function (data) {
        chords = data;
    }).then(function () {
        $('.chord').each(function () {
            var chord = $(this).attr('chord');
            drawChord(chord, this, chords);
        })
    });
}

function drawChord(chordName, canvas, arr = chords) {
    var c = canvas;
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var offsetY = 20;
    var offsetX = 0;


    for (n = 0; n <= arr.list.length - 1; n++) {
        if (arr.list[n].name + arr.list[n].type == chordName) {
            chord = arr.list[n];
        }
    }

    var maxPos = Math.max.apply(Math, removeX(chord.placement)) + 1;
    var minPos = Math.min.apply(Math, removeX(chord.placement));
    console.log(chord.placement);

    for (f = minPos; f <= maxPos + 1; f++) {
        ctx.beginPath();

        if (f == minPos && chord.fret == 0) {
            ctx.lineWidth = 4;
        } else {
            ctx.lineWidth = 1;
        }
        //draw the frets
        ctx.moveTo(0 + stringWidth, offsetY + fretHeight);
        ctx.lineTo(100 + stringWidth, offsetY + fretHeight);
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        var offsetY = offsetY + 20;
    }

    for (i = 0; i < chord.placement.length; i++) {
        var stringH = (maxPos - minPos + 1) * fretHeight;

        if (chord.placement[i] == 'x') {
            var y = fretHeight + textOffsetY;
        } else {
            var y = (fretHeight * chord.placement[i]) + fretHeight + textOffsetY;
        }

        var x = stringWidth + offsetX - (stringWidth / 4);

        //draw the strings
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y - 10, 10, 10);

        ctx.moveTo(offsetX + stringWidth, 20 + fretHeight);
        ctx.lineTo(offsetX + stringWidth, 20 + stringH + fretHeight);

        ctx.fillStyle = 'black';
        if (chord.fret != 0 && chord.fingering[i] != 0) {
            ctx.fillText(chord.fingering[i], x, y + 20);
        } else {
            ctx.fillText(chord.fingering[i], x, y + 20);
        }

        ctx.stroke();

        if (i == chord.placement.length - 1 && chord.fret != 0) {

            ctx.fillText(chord.fret + ' fret', x + 20, y + 20);
        }
        var offsetX = offsetX + stringWidth;
    }
    ctx.fillText(chord.name + chord.type, 63, (maxPos - minPos + 4) * fretHeight);
    ctx.font = "14px Arial";
    ctx.fillText('E', stringWidth - 5, 15);
    ctx.fillText('A', (stringWidth * 2) - 5, 15);
    ctx.fillText('D', (stringWidth * 3) - 5, 15);
    ctx.fillText('G', (stringWidth * 4) - 5, 15);
    ctx.fillText('B', (stringWidth * 5) - 5, 15);
    ctx.fillText('E', (stringWidth * 6) - 5, 15);

    ctx.font = "18px Arial";
}


function drawBlankChord(chordName, canvas, arr = chords) {
    var c = canvas;
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var offsetY = 20;
    var offsetX = 0;


    for (n = 0; n <= arr.list.length - 1; n++) {
        if (arr.list[n].name + arr.list[n].type == chordName) {
            chord = arr.list[n];
        }
    }

    var maxPos = Math.max.apply(Math, removeX(chord.placement)) + 1;
    var minPos = Math.min.apply(Math, removeX(chord.placement));
    console.log(chord.placement);

    for (f = minPos; f <= maxPos + 1; f++) {
        ctx.beginPath();

        if (f == minPos && chord.fret == 0) {
            ctx.lineWidth = 4;
        } else {
            ctx.lineWidth = 1;
        }
        //draw the frets
        ctx.moveTo(0 + stringWidth, offsetY + fretHeight);
        ctx.lineTo(100 + stringWidth, offsetY + fretHeight);
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        var offsetY = offsetY + 20;
    }

    for (i = 0; i < chord.placement.length; i++) {
        var stringH = (maxPos - minPos + 1) * fretHeight;

        if (chord.placement[i] == 'x') {
            var y = fretHeight + textOffsetY;
        } else {
            var y = (fretHeight * chord.placement[i]) + fretHeight + textOffsetY;
        }

        var x = stringWidth + offsetX - (stringWidth / 4);

        //draw the strings
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y - 10, 10, 10);

        ctx.moveTo(offsetX + stringWidth, 20 + fretHeight);
        ctx.lineTo(offsetX + stringWidth, 20 + stringH + fretHeight);

        ctx.fillStyle = 'black';
        if (chord.fret != 0 && chord.fingering[i] != 0) {
            ctx.fillText(chord.fingering[i], x, y + 20);
        } else {
            ctx.fillText(chord.fingering[i], x, y + 20);
        }

        ctx.stroke();

        if (i == chord.placement.length - 1 && chord.fret != 0) {

            ctx.fillText(chord.fret + ' fret', x + 20, y + 20);
        }
        var offsetX = offsetX + stringWidth;
    }
    ctx.font = "14px Arial";
    ctx.fillText('E', stringWidth - 5, 15);
    ctx.fillText('A', (stringWidth * 2) - 5, 15);
    ctx.fillText('D', (stringWidth * 3) - 5, 15);
    ctx.fillText('G', (stringWidth * 4) - 5, 15);
    ctx.fillText('B', (stringWidth * 5) - 5, 15);
    ctx.fillText('E', (stringWidth * 6) - 5, 15);

    ctx.font = "18px Arial";
}