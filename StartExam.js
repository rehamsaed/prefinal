var greeting = document.querySelector(".nameLogin");

let firstName = localStorage.getItem("firstname");
  let lastName = localStorage.getItem("lastname");
//   console.log(firstName,lastName)

  // Set the content of the spans if values are found
  if (firstName && lastName) {
    document.getElementById("firstName").textContent = localStorage.getItem("firstname");
    document.getElementById("lastName").textContent = localStorage.getItem("lastname");
  } else {
    // Optionally, handle case where no names are stored
    document.getElementById("firstName").textContent = "Guest";
    document.getElementById("lastName").textContent = "";
  }

let startButton =document.querySelector("#startbtn");

startButton.addEventListener("click",function(){
  location.href="Exam.html"
})