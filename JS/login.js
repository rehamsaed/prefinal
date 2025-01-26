const imgIcone = document.querySelector(".PasswordIcone");
const passwordInput = document.getElementById("passwordInput");
const emailInput = document.getElementById("emailInput");
const btnlogin = document.querySelector(".btnlogin");
const errorMessage1 = document.getElementsByClassName("error")[0];
const errorMessage2 = document.getElementsByClassName("error")[1];

imgIcone.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; 
        imgIcone.src = "../Images/view.png"; 
    } else {
        passwordInput.type = "password"; 
        imgIcone.src = "../Images/hide.png"; 
    }
});

emailInput.addEventListener("keydown", function () {
    errorMessage1.style.visibility = "hidden";
});

passwordInput.addEventListener("keydown", function () {
    errorMessage2.style.visibility = "hidden";
});

btnlogin.addEventListener("click", function () {
    let isValid = true;
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");


    if (emailInput.value.trim() === "") {
        errorMessage1.textContent = "This field is required";
        errorMessage1.style.visibility = "visible"; 
        isValid = false;
    } else {
        errorMessage1.style.visibility = "hidden";  
    }

    if (emailInput.value.trim() !== "" && emailInput.value.trim() !== storedEmail) {
        errorMessage1.textContent = "This email does not exist";
        errorMessage1.style.visibility = "visible"; 
        isValid = false;
    }

    if (passwordInput.value.trim() === "") {
        errorMessage2.textContent = "This field is required";
        errorMessage2.style.visibility = "visible"; 
        isValid = false;
    } else {
        errorMessage2.style.visibility = "hidden";  
    }


    if (passwordInput.value.trim() !== "" && passwordInput.value.trim() !== storedPassword) {
        errorMessage2.textContent = "This password is incorrect";
        errorMessage2.style.visibility = "visible"; 
        isValid = false;
    }


    if (isValid) {
        window.location.href ="../StartExam.html" 
    }
});

const Register=document.querySelector(".Register")
Register.addEventListener("click",function(){
    window.location.href ="../SignUp.html" 
})

