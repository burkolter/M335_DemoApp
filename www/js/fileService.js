var fileService = (function() {



    const createFile = function(fileName) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

            console.log('file system open: ' + fs.name);
            fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

                console.log("fileEntry is file? " + fileEntry.isFile.toString());
                // fileEntry.name == 'someFile.txt'
                // fileEntry.fullPath == '/someFile.txt'
                // writeFile(fileEntry, null);

            }, onErrorCreateFile => { console.warn("could not create file"); });

        }, onErrorLoadFs => { console.warn("could not create file"); });
    }

    const writeFile = function(fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
            };

            fileWriter.onerror = function(e) {
                console.log("Failed file write: " + e.toString());
            };

            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj = new Blob(['some file data'], { type: 'text/plain' });
            }

            fileWriter.write(dataObj);
        });
    };


    const writeToFile = function(fileName, data) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

            console.log('file system open: ' + fs.name);
            fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

                console.log("fileEntry is file? " + fileEntry.isFile.toString());
                // fileEntry.name == 'someFile.txt'
                // fileEntry.fullPath == '/someFile.txt'

                writeFile(fileEntry, data);

            }, onErrorCreateFile => { console.warn("could not create file"); });

        }, onErrorLoadFs => { console.warn("could not create file"); });
    }

    const readFile = function(fileEntry, cb) {

        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function() {
                console.log("Successful file read: " + this.result);
                cb(this.result);
            };

            reader.readAsText(file);

        }, onErrorReadFile => {
            console.warn("could not read file");
        });
    }

    const readFromFile = function(fileName, cb) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

            console.log('file system open: ' + fs.name);
            fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

                console.log("fileEntry is file? " + fileEntry.isFile.toString());
                // fileEntry.name == 'someFile.txt'
                // fileEntry.fullPath == '/someFile.txt'

                readFile(fileEntry, cb);

            }, onErrorCreateFile => { console.warn("could not read file"); });

        }, onErrorLoadFs => { console.warn("could not read file"); });
    }

    // public
    return {
        createFile,
        writeToFile,
        readFromFile
    }
})();