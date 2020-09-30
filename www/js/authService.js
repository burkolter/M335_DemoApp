var authService = (function() {

    const signIn = function(email, password) {
        console.log("try to login " + email);
        return firebase.auth().signInWithEmailAndPassword(email, password); // will return a promise
    };

    const signOut = function() {
        return firebase.auth().signOut(); // will return a promise
    };

    // public
    return {
        signIn,
        signOut
    }
})();