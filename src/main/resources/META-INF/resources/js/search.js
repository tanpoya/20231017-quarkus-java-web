const CHAMPIONS = [
    { name: '아트록스', engName: 'Aatrox', role: '전사', lane: '탑', img: '/image/mini_Aatrox.jpeg', difficulty: '상', modalId: 'modalAatrox' },
    { name: '사일러스', engName: 'Sylas', role: '마법사', lane: '정글/미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Sylas.png', difficulty: '중', modalId: 'modalSylas' },
    { name: '애니비아', engName: 'Anivia', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Anivia.png', difficulty: '상', modalId: 'modalAnivia' },
    { name: '브라이어', engName: 'Briar', role: '전사', lane: '정글', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Briar.png', difficulty: '중', modalId: 'modalBriar' },
    { name: '잭스', engName: 'Jax', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jax.png', difficulty: '중', modalId: 'modalJax' },
    { name: '징크스', engName: 'Jinx', role: '원거리 딜러', lane: '바텀', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Jinx.png', difficulty: '중', modalId: 'modalJinx' },
    { name: '멜', engName: 'Mel', role: '마법사', lane: '미드', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Mel.png', difficulty: '중', modalId: 'modalMel' },
    { name: '유나라', engName: 'Yunara', role: '원거리 딜러', lane: '바텀', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Yunara.png', difficulty: '중', modalId: 'modalYunara' },
    { name: '자헨', engName: 'Zaahen', role: '전사', lane: '탑', img: 'https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Zaahen.png', difficulty: '상', modalId: 'modalZaahen' },
];

const NEWS = [
    { title: '새로운 챔피언 출시', desc: '2026 시즌 이벤트와 신규 챔피언 소식을 확인하세요.', category: '게임 업데이트' },
    { title: '패치 노트 16.4', desc: '챔피언 밸런스와 아이템 업데이트 내용을 확인하세요.', category: '패치 노트' },
];

function switchCategory(type, el) {
    document.querySelectorAll('.search-category-item').forEach((item) => item.classList.remove('active'));
    if (el) el.classList.add('active');

    const champion = document.getElementById('resultChampion');
    const news = document.getElementById('resultNews');
    if (champion) champion.style.display = type === 'champion' ? 'block' : 'none';
    if (news) news.style.display = type === 'news' ? 'block' : 'none';
}

function openChampionModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl || !window.bootstrap) return;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        const target = query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/';
        window.location.href = target;
        return;
    }

    const q = query.trim().toLowerCase();
    if (!q) {
        window.location.href = '/';
        return;
    }

    document.getElementById('searchKeywordDisplay').textContent = `"${query.trim()}" 검색 결과`;

    const champResults = CHAMPIONS.filter((c) =>
        c.name.includes(q) ||
        c.engName.toLowerCase().includes(q) ||
        c.role.includes(q) ||
        c.lane.includes(q)
    );
    const newsResults = NEWS.filter((n) =>
        n.title.toLowerCase().includes(q) ||
        n.desc.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );

    document.getElementById('champCount').textContent = `(${champResults.length})`;
    document.getElementById('newsCount').textContent = `(${newsResults.length})`;

    const champList = document.getElementById('championResultList');
    champList.innerHTML = champResults.length === 0
        ? `<div class="no-result"><h4>검색 결과 없음</h4><p>"${query.trim()}"에 해당하는 챔피언이 없습니다.</p></div>`
        : champResults.map((c) => `
            <div class="search-result-card d-flex align-items-center p-0 overflow-hidden"
                 role="button" tabindex="0" data-bs-toggle="modal" data-bs-target="#${c.modalId}" data-modal-id="${c.modalId}">
                <img src="${c.img}" alt="${c.name}">
                <div class="p-3">
                    <div style="font-weight:700; font-size:1rem; color:#111;">${c.name} <span style="color:#888; font-size:0.85rem;">(${c.engName})</span></div>
                    <div style="color:#555; font-size:0.9rem; margin-top:4px;">역할: ${c.role} &nbsp;|&nbsp; 라인: ${c.lane} &nbsp;|&nbsp; 난이도: ${c.difficulty}</div>
                </div>
            </div>`).join('');

    const newsList = document.getElementById('newsResultList');
    newsList.innerHTML = newsResults.length === 0
        ? `<div class="no-result"><h4>검색 결과 없음</h4><p>"${query.trim()}"에 해당하는 뉴스가 없습니다.</p></div>`
        : newsResults.map((n) => `
            <div class="search-result-card p-3">
                <span style="font-size:0.75rem; background:#c8253a; color:#fff; padding:2px 8px; border-radius:3px;">${n.category}</span>
                <div style="font-weight:700; font-size:1rem; color:#111; margin-top:8px;">${n.title}</div>
                <div style="color:#555; font-size:0.9rem; margin-top:4px;">${n.desc}</div>
            </div>`).join('');

    switchCategory('champion', document.querySelector('.search-category-item'));
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('d-none');
    document.querySelectorAll('section:not(#searchResults)').forEach((section) => section.classList.add('d-none'));
    searchResults.classList.remove('d-none');
    searchResults.style.display = 'block';

    document.querySelectorAll('[data-modal-id]').forEach((card) => {
        card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openChampionModal(card.dataset.modalId);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            performSearch(document.getElementById('searchInput').value);
        });
    }

    document.querySelectorAll('[data-search-category]').forEach((item) => {
        item.addEventListener('click', function () {
            switchCategory(item.dataset.searchCategory, item);
        });
    });

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    if (initialQuery) {
        const input = document.getElementById('searchInput');
        if (input) input.value = initialQuery;
        performSearch(initialQuery);
    }
});
