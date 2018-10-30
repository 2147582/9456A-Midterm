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

function drawChord(chordName, canvasID, arr = chords) {
    var c = document.getElementById(canvasID);
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var offsetY = 0;
    var offsetX = 0;


    for (n = 0; n <= arr.list.length - 1; n++) {
        if (arr.list[n].name + arr.list[n].type == chordName) {
            chord = arr.list[n];
        }
    }

    var maxPos = Math.max.apply(Math, removeX(chord.placement)) + 1;
    var minPos = Math.min.apply(Math, removeX(chord.placement));
    ctx.fillText(chord.name + chord.type, 63, (maxPos + 2) * 20);
    console.log(chord.placement);

    for (f = minPos; f <= maxPos + 1; f++) {
        ctx.beginPath();

        if (f == 0) {
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
    ctx.font = "14px Arial";
    ctx.fillText('E', stringWidth - 5, 15);
    ctx.fillText('A', (stringWidth * 2) - 5, 15);
    ctx.fillText('D', (stringWidth * 3) - 5, 15);
    ctx.fillText('G', (stringWidth * 4) - 5, 15);
    ctx.fillText('B', (stringWidth * 5) - 5, 15);
    ctx.fillText('E', (stringWidth * 6) - 5, 15);
    
    ctx.font = "18px Arial";
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

        ctx.moveTo(offsetX + stringWidth, 0 + fretHeight);
        ctx.lineTo(offsetX + stringWidth, stringH + fretHeight);

        ctx.fillStyle = 'black';
        ctx.fillText(chord.fingering[i], x, y);

        ctx.stroke();

        if (i == chord.placement.length - 1) {
            ctx.fillText(chord.fret + ' fret', x + 20, y);
        }
        var offsetX = offsetX + stringWidth;
    }
}


function drawChord2(chordName, canvasID, arr = chords) {
    var c = document.getElementById(canvasID);
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var offsetY = 0;
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

        if (f == 0) {
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
    ctx.font = "14px Arial";
    ctx.fillText('E', stringWidth - 5, 15);
    ctx.fillText('A', (stringWidth * 2) - 5, 15);
    ctx.fillText('D', (stringWidth * 3) - 5, 15);
    ctx.fillText('G', (stringWidth * 4) - 5, 15);
    ctx.fillText('B', (stringWidth * 5) - 5, 15);
    ctx.fillText('E', (stringWidth * 6) - 5, 15);
    
    ctx.font = "18px Arial";
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

        ctx.moveTo(offsetX + stringWidth, 0 + fretHeight);
        ctx.lineTo(offsetX + stringWidth, stringH + fretHeight);

        ctx.fillStyle = 'black';
        ctx.fillText(chord.fingering[i], x, y);

        ctx.stroke();

        if (i == chord.placement.length - 1) {
            ctx.fillText(chord.fret + ' fret', x + 20, y);
        }
        var offsetX = offsetX + stringWidth;
    }
}