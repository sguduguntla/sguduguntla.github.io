$(function() {

    $("#loader").fadeIn();

    setTimeout('$("#loader").fadeOut(); $("#container").css("display", "block");', 1500);

    Parse.$ = jQuery;
    Parse.initialize("XaLXrt9Kx1TBjElM9bJhGd1LBPNkrAFiRbFXntkE", "pHtZGICbR77OdBvxscb10lkA2uepHNk73Lt6Za83");

    var fileIsValid = true;

    $('#file').bind("change", function() {
        var file  = document.getElementById("file");
        if (!validateFileSize(file)) {
            fileIsValid = false;
            Materialize.toast("Please upload a file below 10 MB!", 3000, 'rounded');
        } else {
            fileIsValid = true;
        }
    });

    $("#tutorial").click(function(e) {
        $(".modal-title").html("How to Use");
        $(".modal-body").html("Here is how to use it: ");
        $(".modal-footer").html('<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Got it!<\/a>');
        $('#modal1').openModal();

    });

    $("#delete").click(function(e) {
        e.preventDefault();

        var name = $("#name").val();

        if (name != "") {

            deleteUser(name, function(name, error) {

                if (error) {
                    displayErrorMessage(name);
                }

                $("#name").val("");
            });

        } else {

            Materialize.toast('Please enter the name of the user you would like to delete', 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast


        }

    });


    $("#upload").click(function(e) {
        e.preventDefault();

        var name = $("#name").val();

        console.log($("#file")[0].files[0]);

        var file = document.getElementById("file");

        if (validateFileSize(file) && fileIsValid) {
            var origFileNames = [];

            for (var j = 0; j < file.files.length; j++) {
                origFileNames.push(file.files[j].name);
            }

            if (name != "" && origFileNames.length > 0) {

                uploadData(name, file, origFileNames, function(allFileNames) {

                    var uploadStr = "Uploaded: ";
                    for (var i = 0; i < allFileNames.length; i++) {
                        if (i < allFileNames.length - 1) {
                            uploadStr += (allFileNames[i] + ", ");
                        } else {
                            uploadStr += allFileNames[i];
                        }
                    }

                    Materialize.toast(uploadStr, 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast

                    $("#name").val("");

                    $("#file").val("");
                });

            } else {


                Materialize.toast("Please enter a name AND upload a file", 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast
            }

        } else {

            Materialize.toast("Please upload a file below 10 MB!", 3000, 'rounded');
        }

    });

    $("#receive").click(function(e) {
        e.preventDefault();

        var name = $("#name").val();

        if (name != "") {

            getData(name, function(fileUrls, types, error) {
                console.log("File URLs: " + fileUrls);
                console.log("Type: " + types);

                var modalWidth = $("#modal1").width();
                var modalHeight = $("#modal1").height();

                $(".modal-footer").html("");

                $(".modal-body").html("");

                //Scaling Down the image to the modal
                for (var i = 0; i < types.length; i++) {
                    if (types[i] == "image" && !error) {
                        var image = new Image();

                        image.src = URL.createObjectURL(fileUrls[i]);

                        var width;
                        var height;

                        image.onload = function() {

                            resizeImage(this.width, this.height, modalWidth, modalHeight, URL.createObjectURL(fileUrls[i]));

                            //$(".modal-footer").html("");

                            var str = "";

                            str += '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close<\/a>';


                            str += '<a href="#!" id="download" class="modal-action waves-effect waves-green btn-flat" download="">Download<\/a>';


                            $(".modal-footer").html(str);


                      //      $(".modal-title").html("Your File: " + name + "." + getExtension(fileUrls[i]));


                            $("#download").attr("href", URL.createObjectURL(fileUrls[i]));


                            $('#modal1').openModal();

                        }


                    } else if (types[i] == "video" && !error) {

                        var str = "";

                        var newWidth = modalWidth - 80;

                        str += "<video width='" + newWidth + "' height='480' class='responsive-video' controls>";
                        str += "<source src='" + URL.createObjectURL(fileUrls[i]) + "'>";
                        str += "</video>";

                        $('.modal-body').append(str);

                        var str2 = "";

                        str2 += '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close<\/a>';

                        str2 += '<a href="#!" id="download" class="modal-action waves-effect waves-green btn-flat" download="">Download<\/a>';

                        $(".modal-footer").html(str2);


                      //  $(".modal-title").html("Your File: " + name + "." + getExtension(fileUrl[i]));


                        $("#download").attr("href", URL.createObjectURL(fileUrls[i]));


                        $('#modal1').openModal();


                    } else if (types[i] == "pdf" && !error) {


                        var str = "";

                        var newWidth = modalWidth - 80;

                        str += '<object data="' + URL.createObjectURL(fileUrls[i]) + '" type="application/pdf" width="' + newWidth + '" height="300">';

                        str += 'alt : <a href=\"' + URL.createObjectURL(fileUrls[i]) + '\"><\/a>';
                        str += '<\/object>';


                        $('.modal-body').append(str);

                        //$(".modal-footer").html("");

                        var str2 = "";

                        str2 += '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close<\/a>';

                        str2 += '<a href="#!" id="download" class="modal-action waves-effect waves-green btn-flat" download="">Download<\/a>';

                        $(".modal-footer").html(str2);


                     //   $(".modal-title").html("Your File: " + name + "." + getExtension(fileUrls[i]));


                        $("#download").attr("href", URL.createObjectURL(fileUrls[i]));


                        $('#modal1').openModal();


                    } else if (types[i] == "misc" && !error) {
                        var str = "";

                        var newWidth = modalWidth - 120;

                        //str += '<img src="filePic.png" class="center" width=' + newWidth + ' height="300" alt="Pic is not available"/>';

                        alert(fileUrls[0]);

                        str += '<iframe width="' + newWidth + '" height="300" src="' + URL.createObjectURL(fileUrls[i]) + '"></iframe>';

                        $('.modal-body').append(str);

                       // $(".modal-footer").html("");

                        var str2 = "";

                        str2 += '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close<\/a>';

                        str2 += '<a href="#!" id="download" class="modal-action waves-effect waves-green btn-flat" download="">Download<\/a>';

                        $(".modal-footer").html(str2);


                     //   $(".modal-title").html("Your File: " + name + "." + getExtension(fileUrls[i]));


                        $("#download").attr("href", URL.createObjectURL(fileUrls[i]));


                        $('#modal1').openModal();
                    } else if (types[i] == "svg" && !error) {

                        var str = "";

                        var newWidth = modalWidth - 120;

                        str += '<img src="' + URL.createObjectURL(fileUrls[i]) + '" class="center" width=' + newWidth + ' height="300" alt="Pic is not available"/>';

                        $('.modal-body').append(str);

                        //$(".modal-footer").html("");

                        var str2 = "";

                        str2 += '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close<\/a>';

                        str2 += '<a href="#!" id="download" class="modal-action waves-effect waves-green btn-flat" download="">Download<\/a>';

                        $(".modal-footer").html(str2);


                      //  $(".modal-title").html("Your File: " + name + "." + getExtension(fileUrls[i]));


                        $("#download").attr("href", URL.createObjectURL(fileUrls[i]));


                        $('#modal1').openModal();


                    } else {
                        displayErrorMessage(name);
                    }
                }


            });
        } else {

            Materialize.toast('Please enter a name to receive the respective file', 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast

        }


    });

    function validateFileSize(file) {
        var isValid = false;
        var numBytesPerMB = 1048576;
        var totalSize = 0;

        for (var i = 0; i < file.files.length; i++) {
            totalSize += (file.files[i].size / numBytesPerMB);
            console.log("File Size of " + file.files[i].name + ": " + file.files[i].size + " Bytes");
            console.log("File Size of " + file.files[i].name + ": " + file.files[i].size / numBytesPerMB + " MB");
        }

        if (totalSize > 10) {
            isValid = false;
        } else {
            isValid = true;
        }

        return isValid;
    }

    function resizeImage(width, height, modalWidth, modalHeight, fileUrl) {

        var newWidth = width;
        var newHeight = height;

        var counter = 0;
        var scaledDown = 0;

        while (newWidth >= modalWidth - 80) {
            counter++;
            newWidth = newWidth / 1.5;
            newHeight = newHeight / 1.5;
        }

        var correctWidth = newWidth;
        var correctHeight = newHeight;

        scaledDown = 1.5 * counter;


        $('.modal-body').append("<img class='materialboxed' src='" + fileUrl + "' width=" + correctWidth + " height=" + correctHeight + " /><p>Scaled down by: " + scaledDown + "x<\/p><p>Original Size: " + width + " X " + height + "<\/p><p>Download the original size below<\/p>");

        $('.materialboxed').materialbox();

    }
});