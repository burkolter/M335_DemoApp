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


    const mapChildSnapshotToObject = function(item, childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        // create object with named properties
        item[childKey] = childData;
    }

    const mapSnapshotToObject = function(snapshot) {
        // default response if branch is empty
        var item = {};

        snapshot.forEach(function(childSnapshot) {
            mapChildSnapshotToObject(item, childSnapshot);
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


    const unsubscribeItem = function(path) {
        let ref = dbObj.ref(path);
        ref.off();
    }

    const subscribeList = function(path, changeCallback) {
        let ref = dbObj.ref(path);

        ref.on('child_added', function(childSnapshot, prevChildKey) {
            let obj = {};
            mapChildSnapshotToObject(obj, childSnapshot);
            changeCallback("child_added", obj, prevChildKey);
        });

        ref.on('child_removed', function(oldChildSnapshot) {
            // only key available
            changeCallback("child_removed", obj.key);
        });

        ref.on('child_changed', function(childSnapshot, prevChildKey) {
            let obj = {};
            mapChildSnapshotToObject(obj, childSnapshot);
            changeCallback("child_changed", obj, prevChildKey);
        });
    };

    const unsubscribeList = function(path) {
        let ref = dbObj.ref(path);
        ref.off();
    }

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
        subscribeItem,
        unsubscribeItem,
        subscribeList,
        unsubscribeList
    };
})();