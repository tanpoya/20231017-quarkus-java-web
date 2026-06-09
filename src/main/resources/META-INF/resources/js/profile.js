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
            if (username) username.textContent = data.username;
            if (email) email.textContent = data.email;
            if (phone) phone.textContent = data.phone;
            if (profileImg && data.profileImage) {
                profileImg.src = '/uploads/profile/' + data.profileImage;
            }
        });

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const messages = {
        invalid_type: 'jpg, png, gif, webp 파일만 가능합니다.',
        too_large: '파일 크기는 5MB 이하여야 합니다.',
        upload_fail: '업로드 실패. 다시 시도해주세요.',
    };
    const uploadErrorMsg = document.getElementById('uploadErrorMsg');
    if (uploadErrorMsg && messages[error]) {
        uploadErrorMsg.textContent = messages[error];
        uploadErrorMsg.classList.remove('d-none');
    }
});
