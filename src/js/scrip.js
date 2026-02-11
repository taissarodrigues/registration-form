const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const lastNameinput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = [
        {
            id: "name",
            label: "First Name",
            validator: nameIsValid
        },
        {
            id: "lastName",
            label: "Last Name",
            validator: nameIsValid
        },
        {
            id: "email",
            label: "Email",
            validator: emailIsValid
        },
        {
            id: "password",
            label: "Password",
            validator: passwordIsValid
        },
    ]

    const errorIcon = '<img src="/src/img/icon-error.svg" class="error-icon" alt="error icon">';

    fields.forEach(function(field){
        const input = document.getElementById(field.id);
        const inputField = input.closest(".input-field");
        const inputValue = input.value.trim();
        
        const errorMessage = inputField.querySelector(".error-message");
        console.log(inputValue);
        errorMessage.innerHTML = '';
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');

        // limpa mensagem antes de validar
        const fieldValidador = field.validator(inputValue);

        if (!fieldValidador.isValid) {
            errorMessage.innerHTML = `${fieldValidador.errorMessage}${errorIcon}`;
            inputField.classList.add('invalid');
            inputField.classList.remove('valid');
    
            return
            //declarei o errorMessage como vazio para nao precisar do else
        } 

    })


    // const name = document.querySelector("#name");


});



function isEmpty(value) {
    return value  === '';
}

function nameIsValid(value) {

    const validator = {
        isValid: true,
        errorMessage: null
    };


    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'First Name cannot be empty';
        return validator;
    }
    const minLength = 3;

    if (value.length < minLength) {
        validator.isValid = false;
        validator.errorMessage = `Deve ter pelo menos ${minLength} caracteres`;
        return validator;
    }

    const nameRegex = /^[A-Za-z]/;

    if (!nameRegex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'First Name must contain only letters';
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
const passworIcons = document.querySelectorAll(".password-icon");

passworIcons.forEach(icon => {
    icon.addEventListener("click", function() {
        const input = this.parentElement.querySelector('form-control');
        input.type = input.type === "password" ? "text" : "password";
        this.classList.toggle("fa-eye");
    })
})
