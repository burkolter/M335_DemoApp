// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceReady').innerText = "Device loaded";

    geolocationView.updateInitPosition();

    /* not properly working on Browser */
    /*fileService.createFile("data.json");

    setTimeout(() => {
        fileService.writeToFile("data.json", "blajasklfjasökldfj asdfklajsdö lfjasölf");
        setTimeout(() => {
            fileService.readFromFile("data.json", (data) => { console.log("data read"); });
        }, 2000)
    }, 2000);*/
}