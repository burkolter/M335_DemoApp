var itemView = (function() {

    const fixedPath = '/demo/fixedpath/item';

    const writeFixedPath = function() {
        storageService.writeItem(fixedPath, {
            id: 1,
            ts: new Date().toString()
        });
    }

    const subscribeFixedPath = function() {
        storageService.subscribeItems(fixedPath, (item) => {
            console.log("update received", item);
            let updateTarget = document.getElementById("updateTarget");
            updateTarget.innerText = item.ts;
        });
    }

    // init
    subscribeFixedPath();

    // public
    return {
        writeFixedPath
    }
})();