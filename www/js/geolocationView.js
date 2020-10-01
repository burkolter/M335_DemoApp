var geolocationView = (function() {

    const updateInitPosition = function() {
        geolocationService.getPosition()
            .then((location) => {
                let elem = document.getElementById("coordsInit");
                if (elem) {
                    elem.innerText = location.coords.latitude + " / " + location.coords.longitude;
                }
            })
            .catch((error) => {
                let elem = document.getElementById("coordsInit");
                if (elem) {
                    elem.innerText = "(failure)";
                }
            })
    }

    return {
        updateInitPosition
    }
})();