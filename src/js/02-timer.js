import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let timerId = null;

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      startButton.setAttribute("disabled", true);
    } else {
      startButton.removeAttribute("disabled");
    };
    startButton.addEventListener('click',(event)=>{
      timerId = setInterval(()=>{
      startButton.setAttribute("disabled", true);
      const intervalTime =new Date();
      const endTime= selectedDate-intervalTime;
      if(endTime <= 0){
        clearInterval(timerId);
        return;
      };
      const {days,hours,minutes,seconds}=convertMs(endTime);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent=addLeadingZero(minutes);
      secondsEl.textContent=addLeadingZero(seconds);
     
    },1000)}
    );
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
    };
    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }
  },
});
