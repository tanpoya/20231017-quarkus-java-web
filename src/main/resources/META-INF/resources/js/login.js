function showError(fieldId, messageId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(messageId);
    if (field) field.classList.add('is-invalid');
    if (msg) msg.textContent = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function validateAndLogin() {
    let valid = true;
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    if (!/^[a-zA-Z0-9]{4,20}$/.test(username)) {
        showError('usernameInput', 'usernameMsg', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('usernameInput');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
        showError('passwordInput', 'passwordMsg', '비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearError('passwordInput');
    }

    if (valid) submitLogin();
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);
    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginSubmitBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', validateAndLogin);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === '1') {
        showError('passwordInput', 'passwordMsg', '아이디 또는 패스워드가 올바르지 않습니다.');
    }
});
