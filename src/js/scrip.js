const form = document.querySelector("#form")
const nameInput = document.querySelector("#name")
const lastNameinput = document.querySelector("#lastName")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const messageTextarea = document.querySelector("#message")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // verifica se o nome esta vazio.

    if (nameInput.value === "") {
        alert ("Por favor, preencha o seu nome");
        return;
    }

      alert("Formulário enviado com sucesso!");

});