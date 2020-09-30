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

authService.signIn('dominik.burkolter@gila-solutions.ch', 'Test12345')
    .then(() => {
        console.log("successfully logged in");
    })
    .catch((error) => {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        console.warn("failure logging in", error);
    });