// // const totalTime = 5 * 60; 
// // let timeLeft = totalTime;

// // const timerBar = document.getElementById("timer-bar");
// // const movingCircle = document.getElementById("moving-circle");
// // const timerText = document.querySelector(".timeLeft");


// // const timerInterval = setInterval(() => {
// //     timeLeft--;

// //     const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

// //     timerBar.style.width = `${progressPercentage}%`;

// //     movingCircle.style.left = `${progressPercentage}%`;

// //     const minutes = Math.floor(timeLeft / 60);
// //     const seconds = timeLeft % 60;
// //     timerText.textContent = `Time left ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

// //     if (timeLeft <= 0) {
// //         clearInterval(timerInterval);
// //         location.href="SignUp.html";
// //     }
// // }, 1000); 


//************************************************************************************ */

let currentQuestionIndex = 0;
let questions = [];
let selectedAnswers = [];
let totalScore=0;

fetch('que.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    questions = data;
    questions = questions.sort(() => Math.random() - 0.5);
    if (questions.length > 0) {
      displayQuestion(currentQuestionIndex); 
      updateQuestionNumber(currentQuestionIndex); 
      updateButtonsState(); 
      setupQuestionNav(); 
    } else {
      console.error('No questions found in the JSON file.');
    }
  })
  .catch(error => console.error('Error loading JSON:', error));
//********************************************************* */

function displayQuestion(index) {
  const questionContainer = document.querySelector('.firstQuestionContainer p');
  const choicesContainer = document.querySelector('.firstQuestionAnswer');

  choicesContainer.innerHTML = '';

  if (!questions[index]) {
      console.error(`No question found at index ${index}`);
      return;
  }

  questionContainer.textContent = questions[index].question;

  questions[index].options.forEach((option, i) => {
      const choiceDiv = document.createElement('div');
      choiceDiv.textContent = `${String.fromCharCode(97 + i)}. ${option}`;
      choiceDiv.classList.add(`choice${i + 1}`);
      choiceDiv.classList.add('choice');

      if (selectedAnswers[index] === option) {
          choiceDiv.classList.add('selectedItem');
      }

      choiceDiv.addEventListener('click', () => {

          Array.from(choicesContainer.children).forEach(child => {
              child.classList.remove('selectedItem');
          });

          choiceDiv.classList.add('selectedItem');

          selectedAnswers[index] = option;

          if (option === questions[index].answer) {
              totalScore += 0.2; 
          } 

          console.log(`Current Score: ${totalScore}`);
      });

      choicesContainer.appendChild(choiceDiv);
  });
}

//********************************************************* */
function updateQuestionNumber(index) {
  const numOfQuestion = document.querySelector('.numOfQuestion span');
  numOfQuestion.textContent = index + 1; 
}

function updateButtonsState() {
  const nextButton = document.querySelector('.nextButton');
  const prevButton = document.querySelector('.previousButton');

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }

  if (currentQuestionIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
}

function setupQuestionNav() {
  const navQuestions = document.querySelectorAll('.navQuestions .questionNavItem');

  navQuestions.forEach((questionItem, index) => {
    questionItem.addEventListener('click', () => {
      currentQuestionIndex = index; 
      displayQuestion(currentQuestionIndex); 
      updateQuestionNumber(currentQuestionIndex);
      updateButtonsState(); 
    });
  });
}

document.querySelector('.nextButton').addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    updateQuestionNumber(currentQuestionIndex);
    updateButtonsState();

    document.querySelector('.previousButton').style.opacity = 1;
    document.querySelector('.previousButton').disabled = false;

    if (currentQuestionIndex === questions.length - 1) {
      document.querySelector('.nextButton').disabled = true;
      document.querySelector('.nextButton').style.opacity = 0.7;
    }
  }
});

document.querySelector('.previousButton').style.opacity = 0.7;

document.querySelector('.previousButton').addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    updateQuestionNumber(currentQuestionIndex);
    updateButtonsState();

    if (currentQuestionIndex === 0) {
      document.querySelector('.previousButton').style.opacity = 0.7;
      document.querySelector('.previousButton').disabled = true;
    } else {
      document.querySelector('.previousButton').style.opacity = 1;
      document.querySelector('.previousButton').disabled = false;
    }

    if (currentQuestionIndex < questions.length - 1) {
      document.querySelector('.nextButton').disabled = false;
      document.querySelector('.nextButton').style.opacity = 1;
    }
  }
});

const flagIcons = document.querySelectorAll('.questionsContainer .fa-flag');
flagIcons.forEach((flag) => {
  flag.addEventListener('click', () => {
    const numOfQuestion = flag.closest('.questionsContainer').querySelector('.numOfQuestion span').textContent;
    console.log(`Question Number: ${numOfQuestion}`);

    const questionDiv = document.querySelector(`.Question${numOfQuestion}`);
    
    if (questionDiv) {
      questionDiv.classList.toggle("selected");

      const flagIconInContainer = questionDiv.querySelector('.fa-flag');
      
      if (flagIconInContainer) {
        const currentVisibility = window.getComputedStyle(flagIconInContainer).visibility;
        flagIconInContainer.style.visibility = (currentVisibility === 'hidden') ? 'visible' : 'hidden';
      }
    } else {
      console.log(`No div found for question ${numOfQuestion}`);
    }
  });
});

document.querySelector(".submit").addEventListener("click",function(){
  const finalTotalScore = Math.round(totalScore * 100);
    console.log(totalScore*100);
    localStorage.setItem("totalScore",finalTotalScore)
    if(finalTotalScore>=50){
        window.location.href="result.html"
    }else{
         window.location.href="failer.html"

    }
    
})
