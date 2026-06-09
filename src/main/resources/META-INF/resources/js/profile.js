function showFieldError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);
    if (field) field.classList.add('is-invalid');
    if (msg) msg.textContent = message;
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

function validateAndUpdate() {
    let valid = true;
    const email = document.getElementById('updateEmail').value.trim();
    const phone = document.getElementById('updatePhone').value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError('updateEmail', 'updateEmailMsg', '올바른 이메일 형식이 아닙니다.');
        valid = false;
    } else {
        clearFieldError('updateEmail');
    }

    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
        showFieldError('updatePhone', 'updatePhoneMsg', '010-0000-0000 형식으로 입력해주세요.');
        valid = false;
    } else {
        clearFieldError('updatePhone');
    }

    if (valid) document.getElementById('updateForm').submit();
}

async function validateAndChangePassword() {
    let valid = true;
    const currentPw = document.getElementById('currentPwInput').value;
    const newPw = document.getElementById('newPwInput').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;

    if (!currentPw) {
        showFieldError('currentPwInput', 'currentPwMsg', '현재 비밀번호를 입력해주세요.');
        valid = false;
    } else {
        clearFieldError('currentPwInput');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(newPw)) {
        showFieldError('newPwInput', 'newPwMsg', '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.');
        valid = false;
    } else {
        clearFieldError('newPwInput');
    }

    if (newPw !== newPwConfirm) {
        showFieldError('newPwConfirm', 'newPwConfirmMsg', '새 비밀번호가 일치하지 않습니다.');
        valid = false;
    } else {
        clearFieldError('newPwConfirm');
    }

    if (!valid) return;

    document.getElementById('currentPassword').value = await hashPassword(currentPw);
    document.getElementById('newPassword').value = await hashPassword(newPw);
    document.getElementById('pwForm').submit();
}

function showMessage(el, className, message) {
    if (!el) return;
    el.className = `alert ${className}`;
    el.textContent = message;
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/profile/info')
        .then((res) => res.json())
        .then((data) => {
            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', data.username);
                new bootstrap.Tooltip(profileLink);
            }

            const username = document.getElementById('infoUsername');
            const email = document.getElementById('infoEmail');
            const phone = document.getElementById('infoPhone');
            const profileImg = document.getElementById('profileImg');
            const updateEmail = document.getElementById('updateEmail');
            const updatePhone = document.getElementById('updatePhone');

            if (username) username.textContent = data.username;
            if (email) email.textContent = data.email;
            if (phone) phone.textContent = data.phone;
            if (profileImg && data.profileImage) profileImg.src = '/uploads/profile/' + data.profileImage;
            if (updateEmail) updateEmail.value = data.email;
            if (updatePhone) updatePhone.value = data.phone;
        });

    const updateBtn = document.getElementById('updateSubmitBtn');
    if (updateBtn) updateBtn.addEventListener('click', validateAndUpdate);

    const passwordBtn = document.getElementById('passwordSubmitBtn');
    if (passwordBtn) passwordBtn.addEventListener('click', validateAndChangePassword);

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const success = params.get('success');
    const updateMsg = document.getElementById('updateMsg');
    const pwMsg = document.getElementById('pwMsg');

    if (success === 'updated') {
        showMessage(updateMsg, 'alert-success', '개인정보가 수정되었습니다.');
    } else if (error === 'duplicate_email') {
        showMessage(updateMsg, 'alert-danger', '이미 사용 중인 이메일입니다.');
    }

    if (error === 'wrong_password') {
        showToast('현재 비밀번호가 일치하지 않습니다.', 'danger');
        showMessage(pwMsg, 'alert-danger', '현재 비밀번호가 일치하지 않습니다.');
    }

    if (success === 'password_changed') {
        showToast('비밀번호가 변경 완료, 로그인 페이지로 이동합니다.', 'success');
        setTimeout(function () {
            window.location.href = '/logout?next=login';
        }, 3500);
    }

    const uploadMessages = {
        invalid_type: 'jpg, png, gif, webp 파일만 가능합니다.',
        too_large: '파일 크기는 5MB 이하여야 합니다.',
        upload_fail: '업로드 실패. 다시 시도해주세요.',
    };
    const uploadErrorMsg = document.getElementById('uploadErrorMsg');
    if (uploadErrorMsg && uploadMessages[error]) {
        uploadErrorMsg.textContent = uploadMessages[error];
        uploadErrorMsg.classList.remove('d-none');
    }
});
