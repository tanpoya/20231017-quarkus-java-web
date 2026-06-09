function ensureToast() {
    let toastEl = document.getElementById('liveToast');
    let toastBody = document.getElementById('toastBody');

    if (!toastEl || !toastBody) {
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '9999';
        container.innerHTML = `
            <div id="liveToast" class="toast align-items-center text-white bg-success border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body" id="toastBody">메시지</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>`;
        document.body.appendChild(container);
        toastEl = document.getElementById('liveToast');
        toastBody = document.getElementById('toastBody');
    }

    return { toastEl, toastBody };
}

function showToast(message, type = 'success') {
    const { toastEl, toastBody } = ensureToast();
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastBody.textContent = message;
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
}

function applyTheme(isLightMode) {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');

    body.classList.toggle('light-mode', isLightMode);
    if (btn) {
        btn.textContent = isLightMode ? 'LIGHT' : 'DARK';
    }
    if (navbar) {
        navbar.classList.toggle('navbar-light', isLightMode);
        navbar.classList.toggle('bg-light', isLightMode);
        navbar.classList.toggle('navbar-dark', !isLightMode);
        navbar.classList.toggle('bg-dark', !isLightMode);
    }
}

function toggleTheme() {
    const nextIsLight = !document.body.classList.contains('light-mode');
    localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    applyTheme(nextIsLight);
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(localStorage.getItem('theme') === 'light');

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    document.querySelectorAll('[data-toast-message]').forEach((el) => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            showToast(el.dataset.toastMessage, el.dataset.toastType || 'success');
        });
    });

    const path = window.location.pathname;
    if (path === '/' || path.endsWith('/main_index.html')) {
        showToast('메인 페이지 로딩 완료');
    } else if (path.endsWith('/register')) {
        showToast('회원가입 페이지 로딩 완료');
    } else if (path.endsWith('/register_success')) {
        showToast('회원가입이 완료되었습니다!');
    }
});
