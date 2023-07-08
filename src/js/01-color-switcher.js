const startEl= document.querySelector('button[data-start]');
const stopEl= document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
startEl.addEventListener('click',()=>{
    timerId = setInterval(() => {
        
        bodyEl.style.backgroundColor=`${getRandomHexColor()}`;
        
      }, 1000);
      startEl.setAttribute('disabled','');
      stopEl.removeAttribute('disabled','');
});
stopEl.addEventListener('click',()=>{
    clearInterval(timerId);
    startEl.removeAttribute('disabled','');
    stopEl.setAttribute('disabled','')
})