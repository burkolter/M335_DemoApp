var geolocationService = (function() {

    const getPosition = function() {
        if (navigator.geolocation) {
            // call callback API and make a Promise out of it
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((location) => {
                    resolve(location);
                }, (error) => {
                    reject;
                })
            });
        } else {
            return new Promise((resolve, reject) => {
                reject("geolocation not available");
            });
        }
    }

    return {
        getPosition
    }
})();