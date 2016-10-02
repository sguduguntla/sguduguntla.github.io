function getData(name, callback) {
    var query = new Parse.Query("Thing");

    query.equalTo("name", name);
    query.limit(1);

    var fileUrls;
    var types;

    query.find({
        success: function(users) {
            var error = false;
            $.each(users, function(i, user) {

                if (user.get("file").url() != undefined) {

                    unzipFile(user.get("file").url(), function(allFiles) {

                        fileUrls = allFiles;

                        console.log(fileUrls[0]);

                        types = user.get("type");

                        callback(fileUrls, types, error);

                    }); //fileUrls is an array that holds all the files in the zip
                } else {

                    error = true;

                    displayErrorMessage(name);

                }

            });

            //callback(fileUrls, types, error);
        },
        error: function(error) {
            displayErrorMessage(name);
        }

    });
}

function unzipFile(zipFileToLoad, callback) {

    var fileReader = new FileReader();

    var allFiles = [];

    var blob = null;

    var request = new XMLHttpRequest();

    request.responseType = "blob";

    request.onreadystatechange = function() {

        if (request.readyState == 4 && request.status == 200) {
            blob = request.response;

            fileReader.onload = function(fileLoadedEvent) {
                var zipFileLoaded = new JSZip(fileLoadedEvent.target.result);

                for (var nameOfFileContainedInZipFile in zipFileLoaded.files) {

                    var fileContainedInZipFile = zipFileLoaded.files[nameOfFileContainedInZipFile];

                    allFiles.push(fileContainedInZipFile);
                }

                callback(allFiles);

            };

            fileReader.readAsArrayBuffer(blob);
        }

    };

    request.open('GET', zipFileToLoad);

    request.send();
}

function getExtension(filename) {
    var parts = filename.split('.');

    return parts[parts.length - 1];


}

function isSVG(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'svg':

            return true;
    }
    return false;

}

function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'tiff':
        case 'jpeg':
        case 'ico':
            //etc
            return true;
    }
    return false;
}

function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case 'mov':
        case 'm4a':
            // etc
            return true;
    }
    return false;
}

function isPdf(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'pdf':
            // etc
            return true;
    }
    return false;
}

function deferredAddZip(url, filename, zip) {
    var deferred = $.Deferred();
    JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
            deferred.reject(err);
        } else {
            zip.file(filename, data, {
                binary: true
            });
            deferred.resolve(data);
        }
    });
    return deferred;
}

function uploadData(name, file, origFileNames, callback) {
    var Thing = Parse.Object.extend("Thing");

    var thing = new Thing();

    var allFileNames = [];

    var zip = new JSZip();

    var deferreds = [];

    var typeArr = [];

    for (var i = 0; i < file.files.length; i++) {

        var file2 = file.files[0];

        var fileName = "";

        fileName = origFileNames[i];

        var arr;

        if (isImage(origFileNames[i])) {

            typeArr.push("image");

        } else if (isVideo(origFileNames[i])) {

            typeArr.push("video");

        } else if (isPdf(origFileNames[i])) {

            typeArr.push("pdf");

        } else if (isSVG(origFileNames[i])) {

            typeArr.push("svg");

        } else {

            typeArr.push("misc");

        }

        var url = URL.createObjectURL(file.files[i]);

        deferreds.push(deferredAddZip(url, fileName, zip));

        allFileNames.push(fileName);

    }

    thing.set("type", typeArr);

    $.when.apply($, deferreds).done(function() {
        var content = zip.generate({
            type: "base64"
        });

        var newFileName = name + ".zip";
        var parseFile = new Parse.File(newFileName, {
            base64: content
        });

        thing.set("file", parseFile);

        thing.set("name", name);

        thing.save();

        callback(allFileNames);

    }).fail(function(err) {
        console.log("There was an error zipping");
    });
}

function deleteUser(name, callback) {
    var Thing = Parse.Object.extend("Thing");

    var thing = new Thing();

    var query = new Parse.Query("Thing");

    query.equalTo("name", name);

    query.find({
        success: function(users) {
            var error = true;
            $.each(users, function(i, user) {
                error = false;
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: false

                }, function(isConfirm) {
                    if (user.get("file").url() != undefined) {
                        if (isConfirm) {
                            swal("Deleted!", "Deleted user: " + name, "success");
                            user.destroy({});
                        } else {
                            swal("Cancelled", "The user: " + name + " has not been deleted. :)", "error");
                        }

                    } else {
                        displayErrorMessage(name);
                    }
                });

            });

            callback(name, error);
        },
        error: function(error) {
            displayErrorMessage(name);
        }
    });
}

function displayErrorMessage(name) {
    Materialize.toast('Couldn\'t find user: ' + name, 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast
}
