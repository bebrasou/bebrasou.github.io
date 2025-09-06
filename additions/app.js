const rec = document.querySelector('.rec');
const additions = document.querySelector('#additions');

function updateRecHeight() {
    const additionsHeight = additions.offsetHeight; // высота таблицы
    rec.style.height = `${additionsHeight * 1.08}px`; // +10%
}

// Вызов при загрузке страницы
window.addEventListener('load', updateRecHeight);
// Вызов при изменении размера окна
window.addEventListener('resize', updateRecHeight);
