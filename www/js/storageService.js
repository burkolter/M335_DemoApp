var storageService = (function() {

    let dbObj; // connection object

    let firebaseConfig = {
        apiKey: "AIzaSyAN7KYUoLs8MNWeacthhM-7SdPBBmyxpiU",
        authDomain: "test-uek.firebaseapp.com",
        databaseURL: "https://test-uek.firebaseio.com",
        projectId: "test-uek",
        storageBucket: "test-uek.appspot.com",
        messagingSenderId: "865737561532",
        appId: "1:865737561532:web:f8888d3fb66e4bc39587b9",
        measurementId: "G-YVKWSVL9DN"
    };


    const connectToFirebase = function() {
        let defaultProject = firebase.initializeApp(firebaseConfig);

        console.log('firebase-connection', defaultProject);

        dbObj = firebase.database();
    }

    const writeItem = function(path, data) {
        let ref = dbObj.ref(path);
        ref.set(data);

        console.log("Item added to firebase: " + path + "/" + data.id + ", " + data);
    }

    const removePath = function(path) {
        let ref = dbObj.ref(path);
        ref.remove();

        console.log("path deleted: " + path);
    }

    const readItems = function(path) {
        let ref = dbObj.ref(path);
        let res = ref.once('value');

        console.log("retrieved", res);

        return res;
    }

    // initialize
    connectToFirebase();

    writeItem("/demo/test/bla/", { id: 10, ts: new Date().toString() });
    readItems("/demo/test/bla/").then((snapshot) => {
        var items = new Array();

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            items.push(item);
        })

        console.log(items);
    });

    // public
    return {
        writeItem
    }
})();