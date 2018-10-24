var Settings = {
    container: document.getElementById("guitar-tuner"),
    backgroundColor: "white",
    notOkayColor: "red",
    okayColor: "green",
    fontColor: "black"
};

function initializeTuner() {
    var tuners = [
        new OnlineTuner.Controller.GuitareTuner(
            new OnlineTuner.Widget.CircleWidget(
                Settings.container,
                Settings.backgroundColor,
                Settings.notOkayColor,
                Settings.okayColor,
                Settings.fontColor
            )
        )
    ];

    new OnlineTuner.Analyser(tuners).install(function () {
        console.log("Succesfully initialized");

    }, function (errorMessage) {
        console.error("Oops, this shouldn't happen", errorMessage);
    });
}

initializeTuner();