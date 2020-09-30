var authView = (function() {

    const runLogin = function() {

        let eMail = document.getElementById("authEmail").value;
        let password = document.getElementById("authPassword").value;

        authService.signIn(eMail, password)
            .then(() => {
                alert("Anmeldung erfolgreich");
                console.log("successfully logged in");
                console.log(firebase.auth().currentUser)
            })
            .catch((error) => {
                // Handle Errors here.
                alert("Fehler bei der Anmeldung");
                console.warn("failure logging in", error);
            });
    }

    // public
    return {
        runLogin
    }
})();