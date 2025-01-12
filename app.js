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
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    let pi = currentDate.getDay() - 1;
    if (pi === -1) pi = 6;
    const day = days[pi];
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    var test = day + " " + hour + ":" + min + ":" + sec;

    const clock = document.getElementById("clock");
    clock.textContent = test;

    console.log(clock.textContent);
}
setInterval(clocknow, 1000);

function blur() {
    let currentDate = new Date();
    const day = currentDate.getDay();
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

function dz() {
    const switchCheckbox = document.querySelector('.switch input[type="checkbox"]');
    const rows = document.querySelectorAll(".container tr");

    if (switchCheckbox.checked) {
        rows.forEach((row) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.checked) {
                row.classList.add("highlight");
            } else {
                row.classList.remove("highlight");
            }
        });
    } else {
        rows.forEach((row) => {
            row.classList.remove("highlight");
        });
    }
}

function sledurok() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    let uroktime = 0;

    if (currentHour < 9) uroktime = 1;
    if (currentHour === 9 && currentMinute < 55) uroktime = 2;
    if (currentHour === 9 && currentMinute > 55 || currentHour === 10 && currentMinute < 50) uroktime = 3;
    if (currentHour === 10 && currentMinute > 50 || currentHour === 12 && currentMinute < 0) uroktime = 4;
    if (currentHour === 12 && currentMinute > 0 || currentHour === 12 && currentMinute < 55) uroktime = 5;
    if (currentHour === 12 && currentMinute > 55 || currentHour === 13 && currentMinute < 50) uroktime = 6;
    if (currentHour === 13 && currentMinute > 50 || currentHour === 14 && currentMinute < 45) uroktime = 7;
    if (currentHour === 14 && currentMinute > 45 || currentHour === 15 && currentMinute < 40) uroktime = 8;
    if (currentHour === 15 && currentMinute > 40 || currentHour === 16 && currentMinute < 35) uroktime = 9;

    const lessons = {
        1: {
            1: "Хімія 9:00",
            2: "Алгебра 9:55",
            3: "Всесвітня 10:50",
            4: "Фіз-ра 12:00",
            5: "Фізика 12:55",
            6: "Інформатика 13:50",
        },
        2: {
            1: "Геометрія 9:00",
            2: "Іст. Укр 9:55",
            3: "Фіз-ра 10:50",
            4: "Фізика 12:00",
            5: "Алгебра 12:55",
            6: "Мистецтво 13:50",
            7: "Осн. здор. 14:45",
        },
        3: {
            1: "- 9:00",
            2: "- 9:55",
            3: "Зар. літ 10:50",
            4: "Геогр/Іст 12:00",
            5: "Фіз-ра 12:55",
            6: "Англійська 13:50",
            7: "Укр. мова 14:45",
            8: "Укр. літ 15:40",
        },
        4: {
            1: "- 9:00",
            2: "Англійська 9:55",
            3: "Геометрія 10:50",
            4: "- 12:00",
            5: "Зар. літ 12:55",
            6: "Фізика 13:50",
            7: "Труди 14:45",
            8: "Укр. мова 15:40",
            9: "Укр. літ 16:35",
        },
        5: {
            1: "Інформатика 9:00",
            2: "Правознав 9:55",
            3: "Англійська 10:50",
            4: "Географія 12:00",
            5: "Хімія 12:55",
            6: "Біологія 13:50",
            7: "Фізика 14:45",
        },
    };

    const currentLesson = lessons[currentDay] ? lessons[currentDay][uroktime] : "Нет уроков";
    const lesson = document.getElementById("urokname");
    lesson.textContent = currentLesson;
}
setInterval(sledurok, 60000);

function smena() {
    const startDate = new Date('2025-01-01'); // Укажите дату отсчета (ГГГГ-ММ-ДД)
    const currentDate = new Date();
    const rows1 = document.querySelectorAll(".container .smena1");
    const rows2 = document.querySelectorAll(".container .smena2");

    // Вычисляем количество недель, прошедших с момента startDate
    const weeksPassed = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000));

    // Определяем значение (1 или 2) в зависимости от текущей недели
    const value = (weeksPassed % 2 === 0) ? 1 : 2;

    if (value === 1) {
        rows1.forEach((row) => {
            row.classList.add("smena");
        });
    }

    if (value === 2) {
        rows2.forEach((row) => {
            row.classList.add("smena");
        });
    }
}

window.onload = function () {
    blur(), sledurok(), clocknow(), smena();
};
