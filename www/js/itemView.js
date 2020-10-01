var itemView = (function() {

    const fixedPath = '/demo/fixedpath/item';
    const listPath = '/demo/list/';

    const writeFixedPath = function() {
        storageService.writeItem(fixedPath, {
            id: 1,
            ts: new Date().toString()
        });
    }

    const subscribeFixedPath = function() {
        storageService.subscribeItem(fixedPath, (item) => {
            console.log("update received", item);
            let updateTarget = document.getElementById("updateTarget");
            updateTarget.innerText = item.ts;
        });
    }

    const subscribeListPath = function() {
        storageService.subscribeList(listPath, (action, obj) => {
            console.log("update received: " + action, obj);
        });
    }

    // init
    subscribeFixedPath();
    subscribeListPath();


    // public
    return {
        writeFixedPath
    }
})();