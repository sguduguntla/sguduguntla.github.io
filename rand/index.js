(function () {
  const answers = {
    0: "8",
    1: "even",
    2: "10fastfingers.com",
    3: "nappy",
    4: "thai",
    5: "skates by the bay",
    6: "shotgunning",
    7: "4.40",
    8: "sreeharsha11@gmail.com",
    9: "elijah",
    10: "house of pho",
    11: "chaat bhavan",
  };

  const password = [4, 5, 6, 8, 3, 8, 2, 5, 9, 2, 9, 7];

  const questions = {
    1: {
      type: "text",
      question:
        "What is the correct spelling of the only four letter word that I spelled incorrectly in the letter?",
      hints: [
        "It's just an every day word, nothing special.",
        "Put the text in Word and Google docs and use spell checker",
        "Read page 2",
        "Second paragraph",
      ],
    },
    2: {
      type: "text",
      question: "What website did I do my typing tests on to impress you?",
      hints: [
        "Just the website name + .com is fine, don't need http or www.",
        "Read page 3",
        "Read first paragraph",
      ],
    },
    3: {
      type: "text",
      question: "What kind of baby are you?",
      hints: [
        "What you love doing as an adjective!",
        "Read page 4",
        "Read last paragraph",
      ],
    },
    4: {
      type: "text",
      question: "What is my favorite type of food?",
      hints: [
        "I can't get enough of it and can keep eating it",
        "Consists of fried rice or noodles",
        "From different continent",
      ],
    },
    5: {
      type: "text",
      question:
        "What is the name of the restaurant we got special treatment at the Berkeley Marina?",
      hints: [
        "Oh, how relaxing it was to sit by the BAY",
        "If only it was winter, we could SKATE on the icy bay",
        "Search up sushi in Berkeley Marina on Google and find it",
      ],
    },
    5: {
      type: "text",
      question:
        "What is the name of the restaurant we got special treatment at the Berkeley Marina?",
      hints: [
        "Oh, how relaxing it was to sit by the BAY",
        "If only it was winter, we could SKATE on the icy bay",
        "Search up sushi in Berkeley Marina on Google and find it",
      ],
    },
    6: {
      type: "text",
      question:
        "What is the crazy thing you do at Habitat parties that I always miss out on?",
      hints: [
        "Something no one ever expects from you, but you do it",
        "Involves making a hole",
        "Chugging",
      ],
    },
    7: {
      type: "number",
      question:
        "What is the current price of the egg and cheese bagel at the Blue Door Café? Dollar sign not needed.",
      hints: ["Search on Google", "Search on Yelp", "View 'Full Menu' on Yelp"],
    },
    8: {
      type: "email",
      question: "What is my personal email?",
      hints: [
        "Gotta test this since someone didn't know it recently :P",
        "Gmail",
      ],
    },
    9: {
      type: "text",
      question:
        "What is the name of the guy in the youtube video that taught how to kiss properly?",
      hints: [
        "Google and Youtube are your friends",
        "Search 'How to Kiss' on youtube",
        "The guy is white",
        "Quite literally, his shirt is white",
      ],
    },
    10: {
      type: "text",
      question:
        "What is the Pho place that I always want to take you to, but it never happens because it is back home?",
      hints: [
        "It is closer to me!",
        "Sunnyvale",
        "El Camino",
        "Looks like a house",
      ],
    },
    11: {
      type: "text",
      question: "What is the name of the closest Chaat place to House of Pho?",
      hints: ["You've been here before!", "Use Google maps"],
    },
  };

  $(document).on("click", ".hintBtn", function (e) {
    let ul = $($(this)[0]).parent().next().next().next();
    if (!ul.hasClass("list-group")) {
      ul = ul.next();
    }
    $(ul.children()).each(function (i, elem) {
      if ($(elem).hasClass("d-none")) {
        $(elem).removeClass("d-none");
        return false;
      }
    });
  });

  $(document).on("click", ".nextBtn", function (e) {
    const qNum = $(this).index(".nextBtn");
    const input = $($(this).parent().prev().children()[1])
      .val()
      .toLowerCase()
      .trim();
    const br = $($(this)[0]).parent().next().next();

    if ($(br).next().hasClass("alert")) {
      $(br).next().remove();
    }

    if (input === answers[qNum]) {
      const parentDiv = $($(this)[0]).parent().parent();
      let newPass = password.slice(0, qNum + 1).join(" ");
      for (let i = 0; i < password.length - (qNum + 1); i++) {
        newPass += " X";
      }
      $("h2").text(newPass);
      $(br).after(
        `<div class="alert alert-success" role="alert">Perfect! Voila!</div>`
      );
      const nextQuestion = questions[qNum + 1];
      if (!nextQuestion) {
        return false;
      }
      const { question, hints, type } = nextQuestion;
      let html = `<div>
      <div class="form-group align-middle mt-2">
          <label for="exampleFormControlInput1">${question}</label>
          <input type="${type}" class="form-control" />
      </div>
      <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary nextBtn">Next</button>
          <button type="button" class="btn btn-warning hintBtn">Get Hint</button>
      </div>
      <br />
      <br />`;
      let ul = `<ul class="list-group">`;
      hints.forEach((hint) => {
        ul += `<li class="list-group-item d-none">${hint}</li>`;
      });
      ul += "</ul>";
      html += ul + "</div>";
      if (qNum + 2 === password.length) {
        html += `<button type="button" class="btn btn-primary scrollBtn">Scroll Up</button>`
        $("#phonePic").removeClass('d-none');
      }
      parentDiv.after(html);
    } else {
      $(br).after(
        `<div class="alert alert-danger" role="alert">Oops! Wrong answer. Feel free to use hints for help.</div>`
      );
    }
  });

  $(document).on("click", ".scrollBtn", function (e) {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);   
  });
})();
