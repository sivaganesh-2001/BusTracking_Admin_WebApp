const form = document.getElementById('adlogin');
const adminusername = document.getElementById('adminUsername');
const adminpassword = document.getElementById('adminPassword');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        form.submit(); // Submit the form if validation passes
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const adminusernameValue = adminusername.value.trim();
    const adminpasswordValue = adminpassword.value.trim();

    let isValid = true;

    if (adminusernameValue === '') {
        setError(adminusername, 'Username is required');
        isValid = false;
    } else {
        setSuccess(adminusername);
    }

    if (adminpasswordValue === '') {
        setError(adminpassword, 'Password is required');
        isValid = false;
    } else if (adminpasswordValue.length < 8) {
        setError(adminpassword, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(adminpassword);
    }

    return isValid; // Return the validation status
};
