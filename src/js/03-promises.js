const delayEl =document.querySelector('input[name="delay"]');
const stepEl =document.querySelector('input[name="step"]');
const amountEl =document.querySelector('input[name="amount"]');
const form =document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve,reject)=>{
  setTimeout(()=>{ if (shouldResolve) {
    resolve ({position,delay});
  } else {
    reject ({position,delay});
  }},delay);
});
}
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  
  
  const delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);
  for(let i=0;i<amount;i++){
    createPromise(i+1,delay+i*step)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
  form.reset();
});
