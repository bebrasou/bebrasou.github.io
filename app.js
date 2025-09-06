

const lessons = {
            1: { // Понеділок
                1: "Укр. мова 9:00",
                2: "Укр. літ 9:55",
                3: "Географія 10:50",
                4: "Історія України 12:00",
                5: "Фіз-ра 12:55",
                6: "-",
                7: "Громад. освіта 14:45",
            },
            2: { // Вівторок
                1: "Фіз-ра 9:00",
                2: "Укр. мова 9:55",
                3: "Укр. літ 10:50",
                4: "Алгебра 12:00",
                5: "Фізика 12:55",
                6: "Захист України 13:50",
                7: "Мистецтво / Інформ 14:45",
            },
            3: { // Середа
                1: "Укр. мова 9:00",
                2: "Англійська 9:55",
                3: "Укр. літ 10:50",
                4: "Геометрія 12:00",
                5: "Громад. освіта 12:55",
                6: "Мистецтво 13:50",
                7: "-",
                8: "-",
            },
            4: { // Четвер
                1: "Всесвіт. історія 9:00",
                2: "Інформатика 9:55",
                3: "-",
                4: "Захист України 12:00",
                5: "Заруб. літ 12:55",
                6: "Англійська 13:50",
                7: "Фізика 14:45",
            },
            5: { // П'ятниця
                1: "-",
                2: "Біологія 9:55",
                3: "-",
                4: "Хімія 12:00",
                5: "-",
                6: "-",
                7: "-",
            },
        };

function timeLesson(skipLesson) {
    const startDate = new Date("2025-01-04");
    const currentDate = new Date();

    const weeksPassed = Math.floor(
        (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    const value = weeksPassed % 2 === 0 ? 1 : 2;

    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    let timeLesson = 10;

    // if (
    //     currentDay === 5 &&
    //     currentHour === 9 &&
    //     currentMinute < 55 &&
    //     value === 1
    // )
    //     timeLesson = 4; // Всесвіт

    if (currentHour < 9) timeLesson = 1;
    if (currentHour === 9 && currentMinute < 55) timeLesson = 2;

    if (
        (currentHour === 9 && currentMinute > 55) ||
        (currentHour === 10 && currentMinute < 50)
    )
        timeLesson = 3;
    if (
        (currentHour === 10 && currentMinute > 50) ||
        (currentHour === 11 && currentMinute < 59)
    )
        timeLesson = 4;
    if (
        (currentHour === 12 && currentMinute > 0) ||
        (currentHour === 12 && currentMinute < 55)
    )
        timeLesson = 5;
    if (
        (currentHour === 12 && currentMinute > 55) ||
        (currentHour === 13 && currentMinute < 50)
    )
        timeLesson = 6;
    if (
        (currentHour === 13 && currentMinute > 50) ||
        (currentHour === 14 && currentMinute < 45)
    )
        timeLesson = 7;
    if (
        (currentHour === 14 && currentMinute > 45) ||
        (currentHour === 15 && currentMinute < 40)
    )
        timeLesson = 8;

    if (!skipLesson) {
        return timeLesson;
    } else {
        return timeLesson + skipLesson;
    }
}


function clockNow() {
    const days = [
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятница",
        "Субота",
        "Неділя",
    ];
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    let curDay = currentDate.getDay() - 1;
    if (curDay === -1) curDay = 6;
    const day = days[curDay];
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    let timeNow = day + " " + hour + ":" + min + ":" + sec;

    const clock = document.getElementById("clocknow");
    clock.textContent = timeNow;
}
setInterval(clockNow, 1000);

function order() {
    let currentDate = new Date();
    const day = currentDate.getDay();
    const days = {
        1: document.getElementById("monday"), // Понедельник
        2: document.getElementById("tuesday"), // Вторник
        3: document.getElementById("wednesday"), // Среда
        4: document.getElementById("thursday"), // Четверг
        5: document.getElementById("friday"), // Пятница
    };

    if (day === 0 || day === 6) {
        for (let key in days) {
            if (days[key]) {
                days[key].style.order = "0";
            }
        }
        return;
    }

    for (let key in days) {
        if (days[key]) {
            if (parseInt(key) === day) {
                days[key].style.order = "-1";
            } else {

            }
        }
    }
}

function nextLesson() {

    let currentDate = new Date();
    const currentDay = currentDate.getDay();

    let skipLesson = 0;

    let time = timeLesson();

    if (!lessons[currentDay]) {
        document.getElementById("lessonName").textContent = "Вихідний!";
        return;
    }

    let currentLesson = lessons[currentDay][time];

    const lesson = document.getElementById("lessonName");
    if (time !== 10) {
        while (currentLesson === "-") {
            skipLesson++;
            time = timeLesson(skipLesson);
            currentLesson = lessons[currentDay][time];
        }
        if (currentLesson === undefined) {
            lesson.textContent = "Уроки завтра!"
        } else
        lesson.textContent = currentLesson;
    }
}
setInterval(nextLesson, 1000);

function countDown() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    const time = {
        1: "9:00:00",
        2: "9:55:00",
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

    // получаем следующий урок через timeLesson
    let lessonTime = timeLesson();
    let currentLesson = lessons[currentDay][lessonTime];

    while (currentLesson === "-") {
        lessonTime = timeLesson(++lessonTime);
        currentLesson = lessons[currentDay][lessonTime];
    }

    if (!currentLesson) {
        document.getElementById("countDown").textContent = "Уроки завтра!";
        return;
    }

    const deadline = new Date(`${currentDate.toDateString()} ${time[lessonTime]} GMT+02:00`);
    const t = deadline - currentDate;

    let seconds = String(Math.floor((t / 1000) % 60)).padStart(2, "0");
    let minutes = String(Math.floor((t / 1000 / 60) % 60)).padStart(2, "0");
    let hours = String(Math.floor((t / (1000 * 60 * 60)) % 24)).padStart(2, "0");

    document.getElementById("countDown").textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(countDown, 1000);

document.getElementById("clock").addEventListener("click", () => {
    const clockNowElement = document.getElementById("clocknow");
    const countDownElement = document.getElementById("countDown");

    if (clockNowElement.style.display === "none") {
        clockNowElement.style.display = "block";
        countDownElement.style.display = "none";
    } else {
        clockNowElement.style.display = "none";
        countDownElement.style.display = "block";
        countDown();
    }
});


function change() {
    const startDate = new Date("2025-01-04");
    const currentDate = new Date();

    const weeksPassed = Math.floor(
        (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    const value = weeksPassed % 2 === 0 ? 1 : 2;

    const firstWeek = document.querySelectorAll(".firstWeek");

    if (value === 2) {
        for (let i = 0; i < firstWeek.length; i++) {
            firstWeek[i].classList.add("asyncRow");
        }
    }
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

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

// Закрытие при клике вне попапа
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

}

window.onload = function () {
    defendUkraine()
    order()
    nextLesson()
    clockNow()
    change()
};
