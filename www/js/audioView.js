var audioView = (function() {
    let audioElement = document.getElementById("audioItem");

    const playBeep = function() {
        audioElement.play();

        /* Alternativ direkt ein AudioElement anlegen, dann funktioniert das Stop nicht ganz so einfach. Achtet auf mögliche Memory-Leaks
        var audio = new Audio('audio_file.mp3');
        audio.play();
        */
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