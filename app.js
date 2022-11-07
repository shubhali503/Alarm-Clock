import { AlarmManager } from "./js/AlarmManager.js";
import { getCurrentHourMinuteSecondTime } from "./js/TimeUtils.js";

const currentTime = document.querySelector("h1");
const setHours = document.querySelector(".hour");
const setMinutes = document.querySelector(".minute");
const setAmPm = document.querySelector(".am-pm");
const setAlarmButton = document.querySelector(".set-alarm-btn");
const alarmsContainer = document.querySelector(".alarms-container");

let alarmManager;

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  setHours.firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  setMinutes.firstElementChild.insertAdjacentHTML("afterend", option);
}

window.addEventListener("DOMContentLoaded", (event) => {
  // Update time on screen
  setInterval(getCurrentTime, 1000);

  // Initialize alarm manager
  alarmManager = new AlarmManager();

  // Set alarms from local storage if present
  let alarms = getAlarmsFromLocalStorage();
  if (alarms) {
    alarms.forEach((alarm) => {
      alarmManager.addAlarm(alarm.time, false, alarm.id);
      displayAlarm(alarm.id, alarm.time);
    });
  }
});

function displayAlarm(id, time) {
  const alarmDiv = `
    <div class="alarm mb d-flex">
        <div class="time">${time}</div>
        <div class="btn-wrapper">
            <button class="snooze-btn" data-snooze-id=${id}>Snooze</button>
            <button class="delete-btn" data-id=${id}>Delete</button>
        </div>
    </div>
    `;
  alarmsContainer.innerHTML += alarmDiv;
  alarmsContainer
    .querySelectorAll(`[data-id="${id}"]`)[0]
    .addEventListener("click", (e) => {
      const self = e.target;
      const parent = self.parentElement.parentElement;
      parent.remove();
      alarmManager.deleteAlarm(e.target.dataset.id);
    });
}

function getAlarmsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("alarms"));
}

//   Displaying current time
function getCurrentTime() {
  currentTime.innerHTML = getCurrentHourMinuteSecondTime();
}

function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const amPmValue = setAmPm.value;
  const alarmTime = `${parseInt(hourValue)}:${minuteValue} ${amPmValue}`;
  let alarm = alarmManager.addAlarm(alarmTime, true);
  displayAlarm(alarm.id, alarm.time);
}

// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener("click", getInput);
