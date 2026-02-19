const form = document.querySelector("#form");

const fields = [
    { id: "name", label: "First Name", validator: nameIsValid },
    { id: "lastName", label: "Last Name", validator: nameIsValid },
    { id: "email", label: "Email", validator: emailIsValid },
    { id: "password", label: "Password", validator: passwordIsValid }
];

const errorIcon = '<img src="/src/img/icon-error.svg" class="error-icon" alt="error icon">';

function validateField(field) {
    const input = document.getElementById(field.id);
    const inputField = input.closest(".input-field");
    const inputValue = input.value.trim();
    const errorMessage = inputField.querySelector(".error-message");

    // limpa o estado anterior
    errorMessage.innerHTML = "";
    inputField.classList.remove("invalid", "valid");

    const fieldValidador = field.validator(inputValue, field.label);

    if (!fieldValidador.isValid) {
        errorMessage.innerHTML = `${fieldValidador.errorMessage}${errorIcon}`;
        inputField.classList.add("invalid");
        return false;
    }
    

    inputField.classList.add("valid");
    return true;
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
// verificar se todos os campos são válidos, enviar o formulario e mostrar a mensagem de sucesso
    let isFormValidAll = true; 

    fields.forEach(function (field) {
        const isValid = validateField(field);

        if (!isValid) {
            isFormValidAll = false;
        }
    });
   
    if (isFormValidAll) {
        alert("Form submitted successfully!");
        this.reset()
        
    } 
});

fields.forEach(function (field) {
    const input = document.getElementById(field.id);

    input.addEventListener("input", function () {
        validateField(field);
    });
});

function isEmpty(value) {
    return value  === '';
}

function nameIsValid(value, label) {

    const validator = {
        isValid: true,
        errorMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = `${label} cannot be empty`;
        return validator;
    }

    const minLength = 3;

    if (value.length < minLength) {
        validator.isValid = false;
        validator.errorMessage = `${label} must have at least ${minLength} characters`;
        return validator;
    }

    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = `${label} must contain only letters`;
        return validator;
    }

    return validator;
}

function emailIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if (isEmpty(value)) {   
        validator.isValid = false;
        validator.errorMessage = 'Email cannot be empty';
        return validator;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Please enter a valid email address';
        return validator;
    }

    return validator;
}
function passwordIsValid(value) {
    const validator = {
        isValid: true,
        errorMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Password cannot be empty';
        return validator;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character';
        return validator;
    }
    return validator;
}
const passwordIcons = document.querySelectorAll(".password-icon");

passwordIcons.forEach(icon => {
    icon.addEventListener("click", function() {
        const input = this.parentElement.querySelector('.form-control');
        input.type = input.type === "password" ? "text" : "password";
        this.classList.toggle("fa-eye");
    })
})
