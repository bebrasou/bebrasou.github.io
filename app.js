

const lessons = {
    1: {
        1: "Хімія 9:00",
        2: "Алгебра 9:55",
        3: "Всесвітня 10:50",
        4: "Фіз-ра 12:00",
        5: "Біологія 12:55",
        6: "Інформат 13:50",
    },
    2: {
        1: "Геометрія 9:00",
        2: "Іст. Укр 9:55",
        3: "Фіз-ра 10:50",
        4: "Фізика 12:00",
        5: "-",
        6: "Мист. 13:50",
        7: "Осн. здор. 14:45",
    },
    3: {
        1: "-",
        2: "-",
        3: "Зар. літ 10:50",
        4: "-",
        5: "-",
        6: "Англ 13:50",
        7: "Укр. мова 14:45",
        8: "Укр. літ 15:40",
    },
    4: {
        1: "-",
        2: "Англ 9:55",
        3: "-",
        4: "-",
        5: "-",
        6: "Фізика 13:50",
        7: "Труди 14:45",
        8: "-",
        9: "-",
    },
    5: {
        1: "-",
        2: "Правознав 9:55",
        3: "-",
        4: "Географія 12:00",
        5: "-",
        6: "-",
        7: "-",
    },
};


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
    let pi = currentDate.getDay() - 1;
    if (pi === -1) pi = 6;
    const day = days[pi];
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    let test = day + " " + hour + ":" + min + ":" + sec;

    const clock = document.getElementById("clocknow");
    clock.textContent = test;

    console.log(clock.textContent);
}
setInterval(clockNow, 1000);

function blur() {
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
    const startDate = new Date("2025-01-04");
    const currentDate = new Date();

    const weeksPassed = Math.floor(
        (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    const value = weeksPassed % 2 === 0 ? 1 : 2;

    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    let uroktime = 10;

    if (currentHour < 9) uroktime = 1;
    if (currentHour === 9 && currentMinute < 55) uroktime = 2;
    if (
        currentDay === 5 &&
        currentHour === 9 &&
        currentMinute < 55 &&
        value === 1
    )
        uroktime = 4; // Правознавство
    if (
        (currentHour === 9 && currentMinute > 55) ||
        (currentHour === 10 && currentMinute < 50)
    )
        uroktime = 3;
    if (
        (currentDay === 1 &&
            currentHour === 9 &&
            currentMinute > 55 &&
            value === 2) ||
        (currentDay === 1 &&
            currentHour === 10 &&
            currentMinute < 50 &&
            value === 2)
    )
        uroktime = 4; // Всесвітня історія
    if (
        (currentHour === 10 && currentMinute > 50) ||
        (currentHour === 11 && currentMinute < 59)
    )
        uroktime = 4;
    if (
        (currentHour === 12 && currentMinute > 0) ||
        (currentHour === 12 && currentMinute < 55)
    )
        uroktime = 5;
    if (
        (currentHour === 12 && currentMinute > 55) ||
        (currentHour === 13 && currentMinute < 50)
    )
        uroktime = 6;
    if (
        (currentDay === 2 &&
            currentHour === 12 &&
            currentMinute > 55 &&
            value === 2) ||
        (currentDay === 2 &&
            currentHour === 13 &&
            currentMinute < 50 &&
            value === 2)
    )
        uroktime = 7;
    if (
        (currentHour === 13 && currentMinute > 50) ||
        (currentHour === 14 && currentMinute < 45)
    )
        uroktime = 7;
    if (
        (currentDay === 2 &&
            currentHour === 13 &&
            currentMinute > 50 &&
            value === 1) ||
        (currentDay === 2 &&
            currentHour === 14 &&
            currentMinute < 45 &&
            value === 1)
    )
        uroktime = 10;
    if (
        (currentHour === 14 && currentMinute > 45) ||
        (currentHour === 15 && currentMinute < 40)
    )
        uroktime = 8;
    if (
        (currentHour === 15 && currentMinute > 40) ||
        (currentHour === 16 && currentMinute < 35)
    )
        uroktime = 9;



    if (!lessons[currentDay]) {
        document.getElementById("lessonName").textContent = "Выходной!";
        return;
    }

    let currentLesson = lessons[currentDay][uroktime];

    const lesson = document.getElementById("lessonName");
    if (uroktime !== 10) {
        while (currentLesson === "-") {
            uroktime++;
            currentLesson = lessons[currentDay][uroktime];
        }
        if (currentLesson === undefined) {
            lesson.textContent = "Уроки завтра!"
        } else
        lesson.textContent = currentLesson;
    }
}
setInterval(nextLesson, 1000);

function countDown() {
    const startDate = new Date("2025-01-04");
    const currentDate = new Date();

    const weeksPassed = Math.floor(
        (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );

    const value = weeksPassed % 2 === 0 ? 1 : 2;
    const clock = document.getElementById("countDown");
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let lessonTime = 10;

    if (currentHour < 9) lessonTime = 1;
    if (currentHour === 9 && currentMinute < 55) lessonTime = 2;
    if (
        currentDay === 5 &&
        currentHour === 9 &&
        currentMinute < 55 &&
        value === 1
    )
        lessonTime = 4;
    if (
        (currentHour === 9 && currentMinute > 55) ||
        (currentHour === 10 && currentMinute < 50)
    )
        lessonTime = 3;
    if (
        (currentDay === 1 &&
            currentHour === 9 &&
            currentMinute > 55 &&
            value === 2) ||
        (currentDay === 1 &&
            currentHour === 10 &&
            currentMinute < 50 &&
            value === 2)
    )
        lessonTime = 4;
    if (
        (currentHour === 10 && currentMinute > 50) ||
        (currentHour === 11 && currentMinute < 59)
    )
        lessonTime = 4;
    if (
        (currentHour === 12 && currentMinute > 0) ||
        (currentHour === 12 && currentMinute < 55)
    )
        lessonTime = 5;
    if (
        (currentHour === 12 && currentMinute > 55) ||
        (currentHour === 13 && currentMinute < 50)
    )
        lessonTime = 6;
    if (
        (currentDay === 2 &&
            currentHour === 12 &&
            currentMinute > 55 &&
            value === 2) ||
        (currentDay === 2 &&
            currentHour === 13 &&
            currentMinute < 50 &&
            value === 2)
    )
        lessonTime = 7;
    if (
        (currentHour === 13 && currentMinute > 50) ||
        (currentHour === 14 && currentMinute < 45)
    )
        lessonTime = 7;
    if (
        (currentDay === 2 &&
            currentHour === 13 &&
            currentMinute > 50 &&
            value === 1) ||
        (currentDay === 2 &&
            currentHour === 14 &&
            currentMinute < 45 &&
            value === 1)
    )
        lessonTime = 10;
    if (
        (currentHour === 14 && currentMinute > 45) ||
        (currentHour === 15 && currentMinute < 40)
    )
        lessonTime = 8;
    if (
        (currentHour === 15 && currentMinute > 40) ||
        (currentHour === 16 && currentMinute < 35)
    )
        lessonTime = 9;

    const time = {
        1: "9:00:00",
        2: "9:55:00",
        3: "10:50:00",
        4: "12:00:00",
        5: "12:55:00",
        6: "13:50:00",
        7: "14:45:00",
        8: "15:40:00",
        9: "16:35:00",
    };

    if (!lessons[currentDay]) {
        document.getElementById("countDown").textContent = "Выходной!";
        return;
    }

    let currentLesson = lessons[currentDay][lessonTime];

    if (lessonTime !== 10) {
        while (currentLesson === "-") {
            lessonTime++;
            currentLesson = lessons[currentDay][lessonTime];
        }
    }

    const timeLeft = time[lessonTime];

    let deadline = `${currentDate.toDateString()} ${timeLeft} GMT+02:00`;

    let t = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    let leftTime = `${hours}:${minutes}:${seconds}`;

    if (lessonTime !== 10 && currentLesson !== undefined) {
        clock.textContent = leftTime;
        console.log(leftTime);
    } else {
        clock.textContent = "Уроки завтра!";
    }
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
    let currentDate = new Date();

    let weeksPassed = Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000));

    let value = (weeksPassed % 2 === 0) ? 1 : 2;

    let smenaClass = (value === 1) ? "smena1" : "smena2";
    let text = (value === 1) ? "Історія" : "Географія";

    const rows = document.querySelectorAll(".container ." + smenaClass);

    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.add("smena");
    }

    const sre = document.getElementById("sre");
    if (sre) {
        sre.textContent = text;
    }
}



window.onload = function () {
    blur()
    nextLesson()
    clockNow()
    change();
};
