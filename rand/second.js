(function () {
    const answers = {
      0: "i love it",
      1: "milkbomb",
      2: "michael",
      3: "koinonia",
      4: "someone like you",
      5: "19",
      6: "you",
    };
  
    const questions = {
      1: {
        type: "text",
        question:
          "What dessert place did we go to the night we went to Jupiter for dinner?",
        hints: [
          "The night we had a fireplace and we ate outside at the cafe",
          "Ice cream filled donuts",
          "Next to McDonalds!",
          "Go to 23 mins 24 secs in the video",
        ],
      },
      2: {
        type: "text",
        question: "What is the first name of the male singer in the final song in the video with the large collage?",
        hints: [
          "Go to 1 hour 7 mins in the video",
          "Try searching up the lyrics?",
          "Use Siri and ask it to hear the song",
          "Female singer is Megan Trainor!",
        ],
      },
      3: {
        type: "text",
        question: "What is the name of the camp from 5th grade science camp?",
        hints: [
          "This one's easy!!",
          "Go to 3 minutes 00 secs in the video",
        ],
      },
      4: {
        type: "text",
        question: "What is the name of the song you sang in the video in our Addison apartment?",
        hints: [
          "Go to 34 minutes 42 secs in the video",
          "Adele!",
        ],
      },
      5: {
        type: "number",
        question:
          "How many people gave you friendly messages at the end not including me?",
        hints: [
          "Count them!!",
          "Go to 50 mins 03 secs in the video where it starts",
          "In case I counted wrong by accident, just try entering numbers near your number haha",
        ],
      },
      6: {
        type: "text",
        question:
          "Who has a better jawline? Type 'me' if it's you or 'you' if it's me",
        hints: [
          "There's only one right answer!",
          "Come on, you know who it is!",
          "Seriously!",
        ],
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
        if (qNum + 2 === 6) {
          html += `<button type="button" class="btn btn-primary scrollBtn">Scroll Up</button>`;
          $("#passwordDiv").removeClass('d-none');
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
  