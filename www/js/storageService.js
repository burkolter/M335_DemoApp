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
    };

    const writeItem = function(path, data) {
        let ref = dbObj.ref(path);
        ref.set(data);

        console.log("Item added to firebase: " + path + "/" + data.id + ", " + data);
    };

    const removePath = function(path) {
        let ref = dbObj.ref(path);
        ref.remove();

        console.log("path deleted: " + path);
    };

    const mapSnapshotToObject = function(snapshot) {
        // default response if branch is empty
        var item = {};

        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            // create object with named properties
            item[childKey] = childData;
        })

        return item;
    };

    const readItems = function(path) { // returns a Promise
        let ref = dbObj.ref(path);
        let res = ref.once('value').then(mapSnapshotToObject);
        return res;
    };


    const subscribeItem = function(path, changeCallback) {
        let ref = dbObj.ref(path);

        ref.on('value', (snapshot) => {
            let obj = mapSnapshotToObject(snapshot);
            changeCallback(obj);
        });
    };

    // initialize
    connectToFirebase();

    // Demo-Usage
    /*
    writeItem("/demo/test/bla", { id: 10, ts: new Date().toString() });
    readItems("/demo/test/bla").then((items) => {
        console.log("data received", items);
    });
    storageService.subscribeItem("/demo/test/bla", (item) => {
            console.log("update received", item);
            ...
        });
    */

    // public
    return {
        writeItem,
        readItems,
        removePath,
        subscribeItem
    };
})();