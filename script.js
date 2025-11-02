const startButton = document.querySelector(".start-button");
const main = document.querySelector("main");

let currentScore = 0;
let currentQuestion = 0;

function loadQuestion(questionNumber) {
  main.innerHTML = "";

  // top div
  let topDiv = document.createElement("div");
  topDiv.classList.add("flex", "justify-between", "items-center", "gap-3");

  // h2 - question title
  let h2 = document.createElement("h2");
  h2.classList.add("question", "text-3xl", "font-semibold", "mb-0");
  h2.innerText = questions[questionNumber].question;
  topDiv.append(h2);

  // timer
  let timerSpan = document.createElement("span");
  timerSpan.classList.add(
    "bg-amber-600",
    "text-white",
    "p-3",
    "rounded-md",
    "font-bold",
    "text-xl"
  );
  topDiv.append(timerSpan);

  let time = 10;
  let timer;

  function timeLeft() {
    timerSpan.innerText = String(time).padStart(2, "0");
    if (time > 0) {
      time--;
    } else if (time === 0) {
      clearInterval(timer);
      showAnswer();
    }
  }

  timeLeft();
  timer = setInterval(timeLeft, 1000);

  // div - options
  let optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options", "mt-5");

  // button - option buttons
  questions[questionNumber].options.forEach((option) => {
    let optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.classList.add(
      "option",
      "border-2",
      "rounded-md",
      "text-start",
      "w-full",
      "p-4",
      "my-2",
      "cursor-pointer",
      "transition-all",
      "duration-300",
      "ease-in-out"
    );
    optionButton.innerText = option;
    optionsDiv.append(optionButton);
  });

  const allOptionButtons = optionsDiv.querySelectorAll(".option");

  // showing answer when the user selected an option
  function showAnswer() {
    allOptionButtons.forEach((option) => {
      clearInterval(timer);
      nextButton.classList.remove("opacity-60", "pointer-events-none");
      if (questions[questionNumber].correctAnswer == option.innerText) {
        option.classList.add("optionTrue");
      } else {
        option.classList.add("optionFalse");
      }
    });
  }

  //
  allOptionButtons.forEach((option) => {
    option.addEventListener("click", () => {
      showAnswer();
      clearInterval(timeLeft);

      if (questions[questionNumber].correctAnswer == option.innerText) {
        currentScore++;
      }
    });
  });

  // div - question count and next button
  let bottomDiv = document.createElement("div");
  bottomDiv.classList.add("flex", "justify-between", "items-center", "mt-5");

  // span - question count
  let infoSpan = document.createElement("span");
  infoSpan.classList.add("question-count", "p-1", "px-3", "rounded-md");
  infoSpan.textContent = `${questionNumber + 1}/${questions.length}`;
  bottomDiv.append(infoSpan);

  //span - next button
  let nextButtonSpan = document.createElement("span");
  nextButtonSpan.classList.add(
    "next-button",
    "p-2",
    "rounded-md",
    "cursor-pointer",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "opacity-60",
    "pointer-events-none"
  );
  nextButtonSpan.textContent = "Next";
  bottomDiv.append(nextButtonSpan);

  main.append(topDiv, optionsDiv, bottomDiv);

  currentQuestion++;

  const nextButton = document.querySelector(".next-button");

  nextButtonSpan.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
      loadQuestion(currentQuestion);
    } else {
      main.innerHTML = `<h2 class="text-center text-2xl font-bold mb-10">
        Congratulations! You have finished the quiz.
      </h2>
      <h2 class="text-center text-xl font-bold mb-10">Your score is <span class="">${currentScore} out of ${questions.length}</span></h2>
      <button
        class="start-button start-again block mx-auto cursor-pointer p-3 rounded-md transition-all duration-300 ease-in-out"
      >
        Start again
      </button>`;

      const startAgainButton = document.querySelector(".start-again");
      startAgainButton.addEventListener("click", () => {
        currentQuestion = 0;
        currentScore = 0;
        loadQuestion(currentQuestion);
      });
    }
  });
}

// starting the quiz with star button
startButton.addEventListener("click", () => {
  loadQuestion(currentQuestion);
});
