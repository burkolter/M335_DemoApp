var geolocationView = (function() {

    const updateInitPosition = function() {
        geolocationService.getPosition()
            .then((location) => {
                document.getElementById("coordsInit").innerText = location.coords.latitude + " / " + location.coords.longitude;
            })
            .catch((error) => {
                document.getElementById("coordsInit").innerText = "(failure)";
            })
    }

    return {
        updateInitPosition
    }
})();