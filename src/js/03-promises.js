import Notiflix, { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);

  });
  promise.then(({ position, delay }) =>
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
  );
  promise.catch(({ position, delay }) =>
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
  );
}

form.addEventListener('submit', evt => {
  evt.preventDefault();

  const amount = form.elements.amount;
  const firstDelay = form.elements.delay;
  const stepDelay = form.elements.step;

  let firstDelayVal = Number(firstDelay.value);

  for (let i = 0; i < Number(amount.value); i++) {
    createPromise(i, firstDelayVal);
    firstDelayVal += Number(stepDelay.value);
  }
});