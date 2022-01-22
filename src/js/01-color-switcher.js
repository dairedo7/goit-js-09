const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerID = null;

const handleClick = (evt) => {
    let color = getRandomHexColor();
    console.log(evt);
    document.body.style.background = color;
}

startBtn.addEventListener('click', () => {
    timerID = setInterval(handleClick, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerID);

    stopBtn.disabled = true;
    startBtn.disabled = false;
})


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
