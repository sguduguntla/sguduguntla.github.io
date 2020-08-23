$(document).ready(function () {
  let randNum = Math.floor(Math.random() * 50) + 1;
  let guesses = [];

  $("form").submit(function (e) {
    e.preventDefault();

    if ($("button").html() !== "Guess") {
      $("#hintLabel").text("");
      $("#alert").html("");
      $("input").attr("disabled", false);
      $("button").html("Guess");
      $("#tryNum").text(5);
      $("input").val("");
      randNum = Math.floor(Math.random() * 50) + 1;
      guesses = [];
      return false;
    }

    const input = parseInt($("input").val().trim());

    if (guesses.includes(input)) {
      $("#alert").html(
        `<div class="alert alert-danger" role="alert">You already guessed this number!</div>`
      );
      $("#hintLabel").text("");
      return false;
    }

    guesses.push(input);

    $("#tryNum").text(5 - guesses.length);

    if (input > randNum) {
      $("#hintLabel").text("LOWERR!!");
    } else if (input < randNum) {
      $("#hintLabel").text("HIGHERR!!");
    } else {
      $("#hintLabel").text("");
      $("#alert").html(
        `<div class="alert alert-success" role="alert">YOU GUESSED IT!!! The number was ${randNum}. The password is: <strong>luckIsOnYourSide</strong></div>`
      );
      $("input").attr("disabled", true);
      $("button").html("Play Again");
      return false;
    }

    if (guesses.length === 5) {
      $("#hintLabel").text("");
      $("#alert").html(
        `<div class="alert alert-danger" role="alert">Your 5 tries are complete!!! The number was ${randNum}.</div>`
      );
      $("input").attr("disabled", true);
      $("button").html("Play Again");
      return false;
    }
  });
});
