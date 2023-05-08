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
function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById('recover-password-button').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login-button').disabled =
        !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = document.getElementById('email').value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password || password.length < 6) {
        return false;
        alert('A senha deve ter pelo menos 6 caracteres.');
    }
    return true;
}

// função para validar o email
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const passwordInput = document.getElementById('password');
const passwordMessage = document.getElementById('password-message');

passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length >= 6) {
        passwordMessage.classList.add('hide_password');
    } else {
        passwordMessage.classList.remove('hide_password');
    }
});
