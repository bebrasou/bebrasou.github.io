const subjectLinks = {
    "Укр. мова": "https://meet.google.com/cii-xqag-hhd" ,
    "Укр. літ": "https://meet.google.com/cii-xqag-hhd" ,
    "Географія": "https://meet.google.com/brv-qerv-atw" ,
    "Історія України": "https://meet.google.com/nrt-ydnw-shy",
    "Фіз-ра": "https://meet.google.com/pps-zkvd-ufp" ,
    "Біологія": "https://meet.google.com/bva-cfqi-fmi" ,
    "Громад. освіта": "https://meet.google.com/nrt-ydnw-shy",
    "Алгебра": "https://meet.google.com/wrd-kquk-icm" ,
    "Фізика": "https://meet.google.com/yyc-mdsj-uff" ,
    "Мистецтво": "https://meet.google.com/oqv-tuzj-fka",
    "Інформатика": "https://meet.google.com/weo-tvty-vez",
    "Англійська": "https://meet.google.com/dhz-riko-mkf" ,
    "Геометрія": "https://meet.google.com/wrd-kquk-icm" ,
    "Хімія": "https://meet.google.com/xfx-scnb-rqt" ,
    "Всесвіт. історія": "https://meet.google.com/nrt-ydnw-shy",
    "Заруб. літ": "https://meet.google.com/rms-jhiy-rsm" ,
    "Астрономія": "https://meet.google.com/yyc-mdsj-uff"
};

const lessons = {
    1: { // Понеділок
        1: "Заруб. літ",
        2: "Укр. мова",
        3: "Мистецтво",
        4: "Укр. літ",
        5: "Фізика",
        6: "Захист України",
        7: "Англійська",
    },
    2: { // Вівторок
        1: "Геометрія",
        2: "Інформатика / Мистецтво",
        3: "Англійська",
        4: "Алгебра",
        5: "Укр. мова",
        6: "Фізика",
        7: "Хімія",
    },
    3: { // Середа
        1: "Біологія",
        2: "Укр. мова",
        3: "Укр. літ",
        4: "Географія",
        5: "Фізика",
        6: "Фіз-ра",
        7: "Історія України",
        8: "Всесвіт. історія",
    },
    4: { // Четвер
        1: "Укр. літ",
        2: "Укр. мова",
        3: "Історія України",
        4: "Астрономія",
        5: "Хімія",
        6: "Алгебра",
        7: "Фіз-ра",
    },
    5: { // П'ятниця
        1: "Геометрія",
        2: "Укр. літ",
        3: "Інформатика",
        4: "Біологія",
        5: "Фіз-ра",
        6: "Захист України",
    },
};

function timeLesson(skipLesson = 0) {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    let timeLesson = 10;

    if (currentHour < 9) timeLesson = 1;
    if (currentHour === 9 && currentMinute < 55) timeLesson = 2;
    if ((currentHour === 9 && currentMinute >= 55) || (currentHour === 10 && currentMinute < 50)) timeLesson = 3;
    if ((currentHour === 10 && currentMinute >= 50) || (currentHour === 11 && currentMinute < 59)) timeLesson = 4;
    if ((currentHour === 12 && currentMinute >= 0) || (currentHour === 12 && currentMinute < 55)) timeLesson = 5;
    if ((currentHour === 12 && currentMinute >= 55) || (currentHour === 13 && currentMinute < 50)) timeLesson = 6;
    if ((currentHour === 13 && currentMinute >= 50) || (currentHour === 14 && currentMinute < 45)) timeLesson = 7;
    if ((currentHour === 14 && currentMinute >= 45) || (currentHour === 15 && currentMinute < 40)) timeLesson = 8;

    return timeLesson + skipLesson;
}

function clockNow() {
    const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятница", "Субота", "Неділя"];
    let currentDate = new Date();
    let hour = String(currentDate.getHours()).padStart(2, "0");
    let min = String(currentDate.getMinutes()).padStart(2, "0");
    let sec = String(currentDate.getSeconds()).padStart(2, "0");
    let curDay = currentDate.getDay() - 1;
    if (curDay === -1) curDay = 6;

    const clock = document.getElementById("clocknow");
    if (clock) clock.textContent = `${days[curDay]} ${hour}:${min}:${sec}`;
}
setInterval(clockNow, 1000);

function order() {
    let currentDate = new Date();
    const day = currentDate.getDay();
    const days = {
        1: document.getElementById("monday"),
        2: document.getElementById("tuesday"),
        3: document.getElementById("wednesday"),
        4: document.getElementById("thursday"),
        5: document.getElementById("friday"),
    };

    if (day === 0 || day === 6) {
        for (let key in days) {
            if (days[key]) days[key].style.order = "0";
        }
        return;
    }

    for (let key in days) {
        if (days[key]) {
            days[key].style.order = (parseInt(key) === day) ? "-1" : "0";
        }
    }
}

function nextLesson() {
    let currentDate = new Date();
    const currentDay = currentDate.getDay();

    if (!lessons[currentDay]) {
        document.getElementById("lessonName").textContent = "Вихідний!";
        return;
    }

    let time = timeLesson();
    let currentLesson = lessons[currentDay][time];
    const lesson = document.getElementById("lessonName");

    if (time !== 10) {
        if (currentLesson === undefined) {
            lesson.textContent = "Уроки завтра!";
        } else {
            lesson.textContent = currentLesson;
        }
    }
}
setInterval(nextLesson, 1000);

function countDown() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const time = {
        1: "09:00:00",
        2: "09:55:00",
        3: "10:50:00",
        4: "12:00:00",
        5: "12:55:00",
        6: "13:50:00",
        7: "14:45:00",
        8: "15:40:00",
    };

    if (!lessons[currentDay]) {
        document.getElementById("countDown").textContent = "Вихідний!";
        return;
    }

    let lessonTime = timeLesson();
    let currentLesson = lessons[currentDay][lessonTime];

    if (!currentLesson) {
        document.getElementById("countDown").textContent = "Уроки завтра!";
        return;
    }

    const deadline = new Date(`${currentDate.toDateString()} ${time[lessonTime]}`);
    const t = deadline - currentDate;

    if (t < 0) {
        document.getElementById("countDown").textContent = "Урок йде!";
        return;
    }

    let seconds = String(Math.floor((t / 1000) % 60)).padStart(2, "0");
    let minutes = String(Math.floor((t / 1000 / 60) % 60)).padStart(2, "0");
    let hours = String(Math.floor((t / (1000 * 60 * 60)) % 24)).padStart(2, "0");

    document.getElementById("countDown").textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(countDown, 1000);

function setupLinks() {
    const links = document.querySelectorAll("a[data-subject]");
    links.forEach(link => {
        const subjectName = link.getAttribute("data-subject");
        if (subjectLinks[subjectName]) {
            link.href = subjectLinks[subjectName];
            link.target = "_blank";
        }
    });
}

function defendUkraine() {
    const lesson6 = document.querySelectorAll('.lesson6');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    lesson6.forEach(row => {
        row.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    if (closePopup) {
        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
}

window.onload = function () {
    setupLinks();
    defendUkraine();
    order();
    nextLesson();
    clockNow();
};
