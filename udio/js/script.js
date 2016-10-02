$(function() {

  $("#loader").fadeIn();

  setTimeout('$("#loader").fadeOut(); $("#container").css("display", "block");', 1500);

  $("#tutorial").click(function(e) {
    $(".modal-title").html("How to Use");
    $(".modal-body").html("Here is how to use it: ");
    $(".modal-footer").html('<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Got it!<\/a>');
    $('#modal1').openModal();
  });

  /******VALIDATE FILE SIZE*****/

  var fileIsValid = true;

  $('#file').on("change", function() {
    var file = $(this);
    if (!validateFileSize(file)) {
      fileIsValid = false;
      Materialize.toast("Please upload a file below 10 MB!", 3000, 'rounded');
    } else {
      fileIsValid = true;
      Materialize.toast("Thanks for uploading", 3000, 'rounded');
    }
  });

  /****Initialize Firebase*****/

  var config = {
    apiKey: "AIzaSyANAt7rZbqRMv7pfjcqfBqnAtoY7qdSrio",
    authDomain: "project-7260531328188416533.firebaseapp.com",
    databaseURL: "https://project-7260531328188416533.firebaseio.com",
    storageBucket: "project-7260531328188416533.appspot.com",
  };

  firebase.initializeApp(config);

  /*****Initialize Firebase Storage*****/

  var storage = firebase.storage();

  // Create a storage reference from our storage service
  var storageRef = storage.ref();

  $("#upload").click(function(e) {
    e.preventDefault();

    var userName = $("#name").val().trim();
    var fileName = $("#myFileName").val().trim();

    var file = $("#file")[0];

    var fileExt = getExtension(file.files[0].name); //returns the extension

    if (userName && fileName) {
      // Upload the file to the path 'images/rivers.jpg'
      // We can use the 'name' property on the File API to get our file name
      var uploadTask = storageRef.child(userName + '/' + fileName).put(file.files[0]);

      console.log(file.files[0]);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
        $("#loader").fadeIn();

      }, function(error) {
        // Handle unsuccessful uploads
        console.log(error.message);
        $("#loader").fadeIn();
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadurl = uploadTask.snapshot.downloadURL;
        console.log(downloadurl);

        $("#loader").fadeIn();
      });

      Materialize.toast('Uploaded: ' + fileName, 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast

      $("#name").val("");

      $("#file").val("");

    } else {

      Materialize.toast("Please enter a name AND upload a file", 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast
    }

  });

  $("#receive").click(function(e) {
    e.preventDefault();

    var name = $("#name").val();
    var fileName = $("#myFileName").val();

    if (name && fileName) {

      // Create a reference to the file we want to download
      var userRef = storageRef.child(name + "/" + fileName);

      // Get the download URL
      userRef.getDownloadURL().then(function(url) {

        console.log("Download URL: " + url);

        $("#myFrame").attr("src", url);

        $(".modal-title").html("Your File: " + fileName);

        $(".modal-footer").append('<a href="' + url + '" id="download" class="modal-action waves-effect waves-green btn-flat" download="' + fileName + '">Download</a>');

        $('#modal1').openModal();

      }).catch(function(error) {
        switch (error.code) {
          case 'storage/object_not_found':
            // File doesn't exist
            Materialize.toast("File doesn't exist", 3000, 'rounded');
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            Materialize.toast("User doesn't have permission.", 3000, 'rounded');
            break;

          case 'storage/canceled':
            // User canceled the upload
            Materialize.toast("User canceled upload", 3000, 'rounded');
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            Materialize.toast("Unknown error occurred. Please try again later.", 3000, 'rounded');
            break;
        }
      });


    }

    /*  console.log("Type: " + types);

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



    } else {

      Materialize.toast('Please enter a name to receive the respective file', 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast

    }*/


  });


  function validateFileSize(file) {
    var isValid = false;
    var numBytesPerMB = 1048576;
    var totalSize = 0;

    for (var i = 0; i < file.length; i++) {
      totalSize += (file[i].size / numBytesPerMB);
      console.log("File Size of " + file[i].name + ": " + file[i].size + " Bytes");
      console.log("File Size of " + file[i].name + ": " + file[i].size / numBytesPerMB + " MB");
    }

    if (totalSize > 300) {
      isValid = false;
    } else {
      isValid = true;
    }

    return isValid;
  }



});
