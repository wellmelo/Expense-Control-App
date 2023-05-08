/* Função completa primeiro modelo
        function validateFields() {
            // precisa... pegar o valor do campo de email
            const email = document.getElementById("email").value;
            // verificar se o email não é vazio e se o email é válido
            if (!email) {
                document.getElementById('recover-password-button').disabled = true;
            } else if (validateEmail(email)) {
                // se verdadeiro, então habilitar o botão de recuperar senha
                document.getElementById('recover-password-button').disabled = false;
            } else {
                // se falso, então desabilitar o botão de recuperar senha.
                document.getElementById('recover-password-button').disabled = true;
            }
        } */

// Simpleficando a validação de e-mail
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = document.getElementById('email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() {
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('email-required-error').style.display = 'block';
    } else {
        document.getElementById('email-required-error').style.display = 'none';
    }

    if (validateEmail(email)) {
        document.getElementById('email-invalid-error').style.display = 'none';
    } else {
        document.getElementById('email-invalid-error').style.display = 'block';
    }
}

function togglePasswordErrors() {
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('password-required-error').style.display =
            'block';
    } else {
        document.getElementById('password-required-error').style.display =
            'none';
    }
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    document.getElementById('recover-password-button').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled =
        !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password || password.length < 6) {
        return false;
    }
    return true;
}

// função para validar o email
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

/*
const passwordInput = document.getElementById('password');
const passwordMessage = document.getElementById('password-message');

passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 6) {
        passwordMessage.classList.add('hide_password');
    } else {
        passwordMessage.classList.remove('hide_password');
    }
});
*/
