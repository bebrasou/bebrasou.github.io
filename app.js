function clocknow() {
    const days = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    let currentDate = new Date();
    var hour = currentDate.getHours();
    var min = currentDate.getMinutes();
    var sec = currentDate.getSeconds();
    var day = days[currentDate.getDay() - 1];
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    var test = day + ", " + hour + ":" + min + ":" + sec;

    const clock = document.getElementById("clock");
    clock.textContent = test;

    console.log(clock.textContent);
}
setInterval(clocknow, 1000);

function blur() {
    let currentDate = new Date();
    var day = currentDate.getDay();
    // Получение всех элементов по их id
    const days = {
        1: document.getElementById("ponedelnik"), // Понедельник
        2: document.getElementById("vtornik"), // Вторник
        3: document.getElementById("sreda"), // Среда
        4: document.getElementById("chetverg"), // Четверг
        5: document.getElementById("pyatnica"), // Пятница
    };

    // Если сегодня суббота (6) или воскресенье (0), убираем блюр со всех дней
    if (day === 0 || day === 6) {
        for (let key in days) {
            if (days[key]) {
                days[key].style.filter = "none"; // Убираем блюр
            }
        }
        return; // Прекращаем выполнение функции
    }

    // Применяем фильтр ко всем дням, кроме текущего
    for (let key in days) {
        if (days[key]) {
            if (parseInt(key) === day) {
                days[key].style.filter = "none"; // Убираем блюр для текущего дня
            } else {
                days[key].style.filter = "blur(1px)"; // Добавляем блюр для остальных дней
            }
        }
    }
}

window.onload = function () {
    blur();
};
