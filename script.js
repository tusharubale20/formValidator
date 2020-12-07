const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// displays error
function showError(inputField, message) {
    const parentFormControl = inputField.parentElement;
    parentFormControl.className = "form-control error";
    const small = parentFormControl.querySelector('small');
    small.innerText = message;
}

//displays success
function showSuccess(inputField) {
    const parentFormControl = inputField.parentElement;
    parentFormControl.className ="form-control success";
}

// checks if the email is valid
function checkEmail(inputField) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(inputField.value.trim().toLowerCase())){
        showSuccess(inputField);
    } else {
        showError(inputField, 'Email is not valid');    
    }
}

// checks required fields
function checkRequired(inputFieldArr) {
    inputFieldArr.forEach((inputField) => {
        if(inputField.value.trim() === '') {
            showError(inputField, `Please enter ${getFieldName(inputField)}`);
        } else {
            showSuccess(inputField);
        }
    });
}

// check input length
function checkLength(inputField, minLength, maxLength) {
    const fieldLength = inputField.value.trim().length;
    if(fieldLength < minLength) {
        showError(inputField, `${getFieldName(inputField)} must be at least ${minLength} characters`);
    } else if(fieldLength > maxLength) {
        showError(inputField, `${getFieldName(inputField)} must be less than ${maxLength} characters`);
    } else {
        showSuccess(inputField);
    }
}

//check passwords match
function checkPasswordsMatch(password, password2) {
    if(password2.value.trim().length > 0) {
        if(password.value != password2.value) {
            showError(password2, `Password do not match`);
        } else {
            showSuccess(password2);
        }
    }
}

// returns field name with capital first letter
function getFieldName(inputField) {
    return inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1);
}

// Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkLength(password2, 6, 20);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})