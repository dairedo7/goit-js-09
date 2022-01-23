import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const dateTimeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start');
let body = document.querySelector('body');

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

startBtn.disabled = true;
body.style.backgroundColor = "azure";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
            return;
        };
        startBtn.disabled = false;
    },
}

const fp = flatpickr(dateTimeInput, options);

let deadLine = null;
let timerID = null;

startBtn.addEventListener('click', () => {
    timerID = setInterval(() => {
        deadLine = new Date(dateTimeInput.value);
        const calcTimeToDeadLine = convertMs(Number(deadLine) - Number(new Date()));
        console.log(calcTimeToDeadLine);

        if (calcTimeToDeadLine.seconds === 0) {
            clearInterval(timerID);
            Notiflix.Notify.failure('Time is up!');
            body.style.backgroundColor = 'red';
        }

        document.querySelector('[data-days]').textContent = addLeadingZero(calcTimeToDeadLine.days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(calcTimeToDeadLine.hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(calcTimeToDeadLine.minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(calcTimeToDeadLine.seconds);
    }, 1000);
});

require('flatpickr/dist/themes/dark.css');
