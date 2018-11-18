//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
    window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var request = window.indexedDB.open("gtDatabase", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("scores", {
        keyPath: "id",
        autoIncrement: true
    });
}


function readAll() {
    var objectStore = db.transaction("scores").objectStore("scores");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            //display highest score
        } else {
            alert("No more entries!");
        }
    };
}

function recordScore(score, accuracy, level, type) {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hour = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    var request = db.transaction(["scores"], "readwrite")
        .objectStore("scores")
        .add({
            score: score,
            accuracy: accuracy,
            level: level,
            type: type,
            date: year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
        });

    request.onsuccess = function (event) {
        console.log('Successfully recorded')
    };

    request.onerror = function (event) {
        alert("Unable to record");
    }
}