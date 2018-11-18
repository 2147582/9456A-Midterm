var fretHeight = 20;
var stringWidth = 20;
var textOffsetY = -3;

function removeX(array) {
    var searchTerm = 'X';
    cleanArray = [];

    for (n = 0; n <= array.length - 1; n++) {
        if (array[n] != searchTerm) {
            cleanArray.push(parseInt(array[n]));
        }
    }
    return cleanArray;
}

function fixFret() {

}

function initChords() {
    $('.chord').each(function () {
        var chord = $(this).attr('chord');
        drawChord(chord, this);
    });
}

function drawChord(chordName, canvas) {
    chordName = chordName.replace(/#/g, '%23');
    var c = canvas;
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var chordStrings;
    var chordFingering;
    var fret;
    $.getJSON("https://api.uberchord.com/v1/chords/" + chordName, function (data) {
        chord = data;
    }).then(function () {
        var cs = chord[0].strings;

        chordStrings = cs.split(' ').map(function (item) {
            if (item != "X") {
                return parseInt(item, 10);
            } else {
                return "X";
            }

        });

        fret = Math.min.apply(Math, removeX(chordStrings));

        chordStrings = chordStrings.map(function (item) {
            if (item != "X") {
                return item - (fret - 1);
            } else {
                return "X";
            }
        });

        var f = chord[0].fingering;

        chordFingering = f.split(' ').map(function (item) {
            if (item != "X") {
                return parseInt(item, 10);
            } else {
                return "X";
            }
        });



        var offsetY = 20;
        var offsetX = 0;

        var maxPos = Math.max.apply(Math, removeX(chordStrings)) + 1;
        var minPos = Math.min.apply(Math, removeX(chordStrings));

        for (f = minPos; f <= maxPos + 1; f++) {
            ctx.beginPath();

            if (f == minPos && fret == 0) {
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
        for (i = 0; i < chordStrings.length; i++) {
            var stringH = (maxPos - minPos + 1) * fretHeight;

            if (chordStrings[i] == 'X') {
                var y = fretHeight + textOffsetY;
            } else {
                var y = (fretHeight * chordStrings[i]) + fretHeight + textOffsetY;
            }

            var x = stringWidth + offsetX - (stringWidth / 4);

            //draw the strings
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y - 10, 10, 10);

            ctx.moveTo(offsetX + stringWidth, 20 + fretHeight);
            ctx.lineTo(offsetX + stringWidth, 20 + stringH + fretHeight);

            ctx.fillStyle = 'black';
            if (fret != 0 && chordFingering[i] != 0) {
                ctx.fillText(chordFingering[i], x, y + 20);
            } else {
                ctx.fillText(chordFingering[i], x, y + 20);
            }

            ctx.stroke();

            if (i == chordStrings.length - 1 && fret != 0) {

                ctx.fillText(fret + ' fret', x + 20, y + 20);
            }
            var offsetX = offsetX + stringWidth;
        }
        displayName = chord[0].chordName.replace(/,/g, '');
        ctx.fillText(displayName, 63, (maxPos - minPos + 4) * fretHeight);
        ctx.font = "14px Arial";
        ctx.fillText('E', stringWidth - 5, 15);
        ctx.fillText('A', (stringWidth * 2) - 5, 15);
        ctx.fillText('D', (stringWidth * 3) - 5, 15);
        ctx.fillText('G', (stringWidth * 4) - 5, 15);
        ctx.fillText('B', (stringWidth * 5) - 5, 15);
        ctx.fillText('E', (stringWidth * 6) - 5, 15);

        ctx.font = "18px Arial";
    });




}

//not yet modified
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
        if (chord.fret != 0 && chordFingering[i] != 0) {
            ctx.fillText(chordFingering[i], x, y + 20);
        } else {
            ctx.fillText(chordFingering[i], x, y + 20);
        }

        ctx.stroke();

        if (i == chordStrings.length - 1 && fret != 0) {

            ctx.fillText(fret + ' fret', x + 20, y + 20);
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