var audioView = (function() {

    let beep = new Audio('media/sos-morse-code_daniel-simion.mp3');

    const sleep = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const playBeep = async function() {
        /* HTML-Element auslesen und abspielen */
        let audioElement = document.getElementById("audioItem");
        audioElement.play();

        /* Alternativ direkt ein AudioElement anlegen.
        var audio = new Audio('audio_file.mp3');
        audio.play();
        */
        await sleep(5000);
        beep.play();
    }

    const pauseBeep = function() {
        audioElement.pause();
    }

    //document.getElementById("playAudioButton").addEventListener("click", playBeep);

    return {
        playBeep,
        pauseBeep
    }
})();