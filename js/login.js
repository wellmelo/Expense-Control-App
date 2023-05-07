const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');

// TUDO OK
nameInput.addEventListener('input', function () {
    if (nameInput.value.length > 13) {
        nameError.style.display = 'block';
        nameInput.value = nameInput.value.slice(0, 13);
    } else {
        nameError.style.display = 'none';
    }
});

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
};

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = '/game';
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
