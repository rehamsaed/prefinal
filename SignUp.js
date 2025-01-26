function validInput(firstName, lastName, email, password, confirmPassword, errorMsgFirstName,
    errorMsgLastName, errorMsgEmail, errorMsgPassword, errorMsgConfirmPassword) {

    const Required = [
        {
            field: firstName,
            errorMsg: errorMsgFirstName,
            requiredMessage: "Required First Name.",
            validateMessage: "First Name must be letters.",
            validate: (value) => /^[A-Za-z]+$/.test(value)
        },
        {
            field: lastName,
            errorMsg: errorMsgLastName,
            requiredMessage: "Required Last Name.",
            validateMessage: "Last Name must be letters.",
            validate: (value) => /^[A-Za-z]+$/.test(value)
        },
        {
            field: email,
            errorMsg: errorMsgEmail,
            requiredMessage: "Required Email.",
            validateMessage: "Email is not valid.",
            validate: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        },
        {
            field: password,
            errorMsg: errorMsgPassword,
            requiredMessage: "Required Password.",
            validateMessage: "Password must be 8 digits.",
            validate: (value) => /^\d{8}$/.test(value)
        },
        {
            field: confirmPassword,
            errorMsg: errorMsgConfirmPassword,
            requiredMessage: "Required Confirm Password.",
            validateMessage: "Passwords do not match.",
            validate: (value) => value === password.value
        },
    ];


    let valid = true;

    Required.forEach(({ field, errorMsg, requiredMessage, validateMessage, validate }) => {
        const value = field.value.trim();

        if (value === "") {
            errorMsg.innerHTML = requiredMessage;
            errorMsg.style.visibility = "visible";
            valid = false;
        } else if (!validate(value)) {
            errorMsg.innerHTML = validateMessage;
            errorMsg.style.visibility = "visible";
            valid = false;
        } else {
            errorMsg.innerHTML = "";
            errorMsg.style.visibility = "hidden";
        }
    });

    Required.forEach(({ field, errorMsg, requiredMessage, validateMessage, validate }) => {
        field.addEventListener("input", () => {
            const value = field.value.trim();

            if (value === "") {
                errorMsg.innerHTML = requiredMessage;
                errorMsg.style.visibility = "visible";
                valid = false;
            } else if (!validate(value)) {
                errorMsg.innerHTML = validateMessage;
                errorMsg.style.visibility = "visible";
                valid = false;
            } else {
                errorMsg.innerHTML = "";
                errorMsg.style.visibility = "hidden";
                valid = true;
            }
        });
    });
return valid;
}

var inputs = document.querySelectorAll("input");
var signup = document.querySelector("#signbtn");

var firstName = document.querySelector("#firstname");
var lastName = document.querySelector("#lastname");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirmpassword");

var errorMsgFirstName = document.querySelector(".errorMsgFN");
var errorMsgLastName = document.querySelector(".errorMsgLN");
var errorMsgEmail = document.querySelector(".errorMsgE");
var errorMsgPassword = document.querySelector(".errorMsgP");
var errorMsgConfirmPassword = document.querySelector(".errorMsgCP");

var togglePassword = document.querySelector("#togglePassword");
var toggleConfirmPassword = document.querySelector("#toggleConPassword");

signup.addEventListener("click", function (event) {
    event.preventDefault();
    if (validInput(
        firstName,lastName,email,password,confirmPassword,
        errorMsgFirstName,errorMsgLastName,errorMsgEmail,errorMsgPassword,errorMsgConfirmPassword
      )
    ) {
      location.href = "StartExam.html";
    }
});



let isPasswordVisible = false;
let isConfirmPasswordVisible = false;

function InputWidth(input) {
    input.style.width = "25.975rem";
    input.style.height = "3.125rem";
    input.style.marginTop = "1.2rem";
    input.style.borderRadius = "0.625rem";
    input.style.border = "none";
}

togglePassword.addEventListener("click", function () {
    isPasswordVisible = !isPasswordVisible;

    if (isPasswordVisible) {
        password.setAttribute('type', 'text');
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    } else {
        password.setAttribute('type', 'password');
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    }

    InputWidth(password);
});

toggleConfirmPassword.addEventListener("click", function () {
    isConfirmPasswordVisible = !isConfirmPasswordVisible;

    if (isConfirmPasswordVisible) {
        confirmPassword.setAttribute('type', 'text');
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    } else {
        confirmPassword.setAttribute('type', 'password');
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    }

    InputWidth(confirmPassword);
});




inputs.forEach(input => {
    input.addEventListener("input", function () {
        localStorage.setItem(input.id, input.value);
    });
});

window.addEventListener("load", function () {
    inputs.forEach(input => {
        input.value = localStorage.getItem(input.id) || "";
    });
});





