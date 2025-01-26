let timeInSeconds = 5 * 60;

    const timerElement = document.getElementById("timer");

    function updateTimer() {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      timerElement.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeInSeconds > 0) {
        timeInSeconds--;
      } else {
        clearInterval(timerInterval);
        console.log("Time's up!");
     
      }
    }


    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); 
 
//     //****************************************************************** */
//     let questions = [];
//     let shuffledQuestions = []; 
//     let currentQuestionIndex = 0; 
//     let score = 0; 

//     const questionElement = document.getElementById("question");
//     const optionsContainer = document.getElementById("options");
//     const prevBtn = document.getElementById("prev-btn");
//     const nextBtn = document.getElementById("next-btn");
//     const startBtn = document.getElementById("start-btn");
//     const submitBtn = document.getElementById("submit-btn");
//     const examTitle = document.getElementById("exam-title");


//     function shuffleArray(arr) {
//       const shuffled = [...arr];
//       for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//       }
//       return shuffled;
//     }

//     async function fetchQuestions() {
//       try {
//         const response = await fetch("que.json");
//         if (!response.ok) {
//           throw new Error(`Failed to load questions: ${response.status}`);
//         }
//         questions = await response.json();
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         examTitle.textContent = "Failed to load questions. Please try again.";
//       }
//     }


//     function showQuestion(index) {
//       const questionData = shuffledQuestions[index];
//       questionElement.textContent = `${index + 1}. ${questionData.question}`;
//       questionElement.style.display = "block";

  
//       optionsContainer.innerHTML = ""; 
//       questionData.options.forEach((option, i) => {
//         const label = document.createElement("label");
//         const radio = document.createElement("input");
//         radio.type = "radio";
//         radio.name = `question-${index}`;
//         radio.value = option;
//         radio.id = `option-${index}-${i}`;

//         label.appendChild(radio);
//         label.appendChild(document.createTextNode(option));
//         optionsContainer.appendChild(label);
//         optionsContainer.appendChild(document.createElement("br"));
//       });
//       optionsContainer.style.display = "block"; 
//     }


 
//     nextBtn.addEventListener("click", () => {
//       if (currentQuestionIndex < shuffledQuestions.length - 1) {
//         currentQuestionIndex++;
//         showQuestion(currentQuestionIndex);
//       }

//       prevBtn.disabled = currentQuestionIndex === 0;
//       nextBtn.disabled = currentQuestionIndex === shuffledQuestions.length - 1;
//     });

  
//     prevBtn.addEventListener("click", () => {
//       if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         showQuestion(currentQuestionIndex);
//       }

//       prevBtn.disabled = currentQuestionIndex === 0;
//       nextBtn.disabled = currentQuestionIndex === shuffledQuestions.length - 1;
//     });


//     submitBtn.addEventListener("click", () => {
//       alert(`Your final score is: ${score} out of ${shuffledQuestions.length}`);
//       nextBtn.disabled = true;
//       prevBtn.disabled = true;
//       submitBtn.disabled = true;
//     });
//     window.onload = async () => {
//         await fetchQuestions();
//         if (questions.length > 0) {
//           shuffledQuestions = shuffleArray(questions); 
//           currentQuestionIndex = 0; 
//           showQuestion(currentQuestionIndex);
  
         
//           nextBtn.disabled = false;
//           prevBtn.disabled = true;
//           submitBtn.disabled = false;
//           examTitle.textContent = "Exam in progress...";
//         }
//       };



// Constants for exam
let questions = [];
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answers = []; // Array to store answers

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const examTitle = document.getElementById("exam-title");

// Shuffle questions array
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fetch questions
async function fetchQuestions() {
  try {
    const response = await fetch("que.json");
    if (!response.ok) {
      throw new Error(`Failed to load questions: ${response.status}`);
    }
    questions = await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    examTitle.textContent = "Failed to load questions. Please try again.";
  }
}

// Show question and options
function showQuestion(index) {
  const questionData = shuffledQuestions[index];
  questionElement.textContent = `${index + 1}. ${questionData.question}`;
  questionElement.style.display = "block";

  optionsContainer.innerHTML = "";
  questionData.options.forEach((option, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${index}`;
    radio.value = option;
    radio.id = `option-${index}-${i}`;
    radio.checked = answers[index] === option; // Check the previously selected answer

    // Save the selected answer when a user clicks
    radio.addEventListener("change", () => {
      answers[index] = option; // Store answer in the array
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement("br"));
  });
  optionsContainer.style.display = "block";
}

// Next button event
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === shuffledQuestions.length - 1;
});

// Previous button event
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === shuffledQuestions.length - 1;
});

// Submit button event
submitBtn.addEventListener("click", () => {
  let correctAnswers = 0;
  shuffledQuestions.forEach((question, index) => {
    if (answers[index] === question.answer) {
      correctAnswers++;
    }
  });
  alert(`Your final score is: ${correctAnswers} out of ${shuffledQuestions.length}`);
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  submitBtn.disabled = true;
});

// On page load
window.onload = async () => {
  await fetchQuestions();
  if (questions.length > 0) {
    shuffledQuestions = shuffleArray(questions); 
    currentQuestionIndex = 0; 
    showQuestion(currentQuestionIndex);

    nextBtn.disabled = false;
    prevBtn.disabled = true;
    submitBtn.disabled = false;
    examTitle.textContent = "Exam in progress...";
  }
};
