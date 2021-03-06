/**
 * Drawing of diagram using canvas
 * Added by: Ballares, Justine
 */

var fretHeight = 20;
var stringWidth = 20;
var textOffsetY = -3;

/**
 * This will remove X in the array to be able to get all the numbers in the array
 */
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

/**
 * This will draw all the existing canvas for chords
 */
function initChords() {
    $('.chord').each(function () {
        var chord = $(this).attr('chord');
        drawChord(chord, this);
    });
}

/**
 * This will draw the chord specified to the canvas specified
 * This was implemented using the uberchord API
 */
function drawChord(chordName, canvas) {
    chordName = chordName.replace(/#/g, '%23');
    var c = canvas;
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var chordStrings;
    var chordFingering;
    var fret;

    /**
     * Retrieve the specified chord on the api
     */
    $.getJSON("https://api.uberchord.com/v1/chords/" + chordName, function (data) {
        chord = data;
    }).then(function () {

        var cs = chord[0].strings;

        /**
         * Split the string into array and convert the element to number if possible
         */
        chordStrings = cs.split(' ').map(function (item) {
            if (item != "X") {
                return parseInt(item, 10);
            } else {
                return "X";
            }

        });

        fret = Math.min.apply(Math, removeX(chordStrings));
        /**
         * Reduce the numbers so that frets from the beginning will not be displayed
         * and display the fret of the starting chord
         */
        if (fret > 0) {
            chordStrings = chordStrings.map(function (item) {
                if (item != "X") {
                    return item - (fret - 1);
                } else {
                    return "X";
                }
            });
        }

        var f = chord[0].fingering;

        /**
         * Split the string into array and convert the element to number if possible
         */
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

            ctx.moveTo(offsetX + stringWidth, 20 + fretHeight);
            ctx.lineTo(offsetX + stringWidth, 20 + stringH + fretHeight);

            /**
             * This will get display the finger position if it is not X
             */
            ctx.fillStyle = 'black';
            if (chordFingering[i] == 'X' && chordStrings[i] != 'X') {
                ctx.fillText(0, x, y + 20);
            } else {
                ctx.fillText(chordFingering[i], x, y + 20);
            }

            ctx.stroke();

            if (i == chordStrings.length - 1 && fret != 0) {

                ctx.fillText(fret + ' fret', x + 20, y + 20);
            }
            var offsetX = offsetX + stringWidth;
        }

        /**
         * Display the chord name in the canvas
         */
        displayName = chord[0].enharmonicChordName.replace(/,/g, '');
        if (displayName.includes('b')) {
            displayName = chord[0].chordName.replace(/,/g, '');
        }
        ctx.fillText(displayName, 63, (maxPos - minPos + 4) * fretHeight);
        ctx.font = "14px Arial";

        /**
         * Display the string standard tuning
         */
        ctx.fillText('E', stringWidth - 5, 15);
        ctx.fillText('A', (stringWidth * 2) - 5, 15);
        ctx.fillText('D', (stringWidth * 3) - 5, 15);
        ctx.fillText('G', (stringWidth * 4) - 5, 15);
        ctx.fillText('B', (stringWidth * 5) - 5, 15);
        ctx.fillText('E', (stringWidth * 6) - 5, 15);

        ctx.font = "18px Arial";
    });




}

/**
 * This will draw the chord specified to the canvas specified but for this the chord name will not be shown
 * This was implemented using the uberchord API
 * It was used for the chord diagram quiz
 */
function drawBlankChord(chordName, canvas) {
    chordName = chordName.replace(/#/g, '%23');
    var c = canvas;
    var ctx = c.getContext('2d');

    ctx.font = "18px Arial";

    var chord;
    var chordStrings;
    var chordFingering;
    var fret;

    /**
     * Retrieve the specified chord on the api
     */
    $.getJSON("https://api.uberchord.com/v1/chords/" + chordName, function (data) {
        chord = data;
    }).then(function () {

        var cs = chord[0].strings;

        /**
         * Split the string into array and convert the element to number if possible
         */
        chordStrings = cs.split(' ').map(function (item) {
            if (item != "X") {
                return parseInt(item, 10);
            } else {
                return "X";
            }

        });

        fret = Math.min.apply(Math, removeX(chordStrings));
        /**
         * Reduce the numbers so that frets from the beginning will not be displayed
         * and display the fret of the starting chord
         */
        if (fret > 0) {
            chordStrings = chordStrings.map(function (item) {
                if (item != "X") {
                    return item - (fret - 1);
                } else {
                    return "X";
                }
            });
        }

        var f = chord[0].fingering;

        /**
         * Split the string into array and convert the element to number if possible
         */
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

            ctx.moveTo(offsetX + stringWidth, 20 + fretHeight);
            ctx.lineTo(offsetX + stringWidth, 20 + stringH + fretHeight);

            /**
             * This will get display the finger position if it is not X
             */
            ctx.fillStyle = 'black';
            if (chordFingering[i] == 'X' && chordStrings[i] != 'X') {
                ctx.fillText(0, x, y + 20);
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

        /**
         * Display the string standard tuning
         */
        ctx.fillText('E', stringWidth - 5, 15);
        ctx.fillText('A', (stringWidth * 2) - 5, 15);
        ctx.fillText('D', (stringWidth * 3) - 5, 15);
        ctx.fillText('G', (stringWidth * 4) - 5, 15);
        ctx.fillText('B', (stringWidth * 5) - 5, 15);
        ctx.fillText('E', (stringWidth * 6) - 5, 15);

        ctx.font = "18px Arial";
    });
}