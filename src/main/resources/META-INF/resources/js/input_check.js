function validateAndShowModal() {
    let valid = true;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!/^[a-zA-Z0-9]{4,20}$/.test(username)) {
        showError('username', '아이디는 4~20자 영문/숫자만 가능합니다.');
        valid = false;
    } else {
        clearError('username');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
        showError('password', '비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearError('password');
    }

    if (password !== passwordConfirm) {
        showError('passwordConfirm', '비밀번호가 일치하지 않습니다.');
        valid = false;
    } else {
        clearError('passwordConfirm');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', '올바른 이메일 형식이 아닙니다.');
        valid = false;
    } else {
        clearError('email');
    }

    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
        showError('phone', '010-0000-0000 형식으로 입력해주세요.');
        valid = false;
    } else {
        clearError('phone');
    }

    if (valid) showConfirmModal();
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(fieldId + 'Msg');
    if (field) field.classList.add('is-invalid');
    if (msg) msg.textContent = message;
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function showConfirmModal() {
    document.getElementById('confirmUsername').textContent = document.getElementById('username').value.trim();
    document.getElementById('confirmEmail').textContent = document.getElementById('email').value.trim();
    document.getElementById('confirmPhone').textContent = document.getElementById('phone').value.trim();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).show();
}

async function submitRegister() {
    const password = document.getElementById('password').value;
    document.getElementById('hashedPassword').value = await hashPassword(password);
    document.getElementById('registerForm').submit();
}

document.addEventListener('DOMContentLoaded', function () {
    const registerBtn = document.getElementById('registerSubmitBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', validateAndShowModal);
    }

    const confirmBtn = document.getElementById('confirmRegisterBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', submitRegister);
    }

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error === 'duplicate_username') {
        showError('username', '이미 사용 중인 아이디입니다.');
    } else if (error === 'duplicate_email') {
        showError('email', '이미 사용 중인 이메일입니다.');
    }
});
