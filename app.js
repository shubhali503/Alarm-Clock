const currentTime = document.querySelector("h1");
const setHours = document.querySelector(".hour");
const setMinutes = document.querySelector(".minute");
const setAmPm = document.querySelector(".am-pm");
const setAlarmButton = document.querySelector(".set-alarm-btn");
const alarmsContainer = document.querySelector(".alarms-container");

const ringtone = new Audio("./ringtone.mp3");

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
    setInterval(getCurrentTime, 1000);
    fetchAlarm();
  });

  // Event Listener added to Set Alarm Button
  setAlarmButton.addEventListener("click", getInput);


//   Displaying current time
function getCurrentTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    currentTime.innerHTML = time;
  
    return time;
  }

  // Fetching alarms from local storage
  function fetchAlarm() {
    const alarms = checkAlarms();
  
    alarms.forEach((time) => {
      setAlarm(time, true);
    });
  }

  // Checking whether alarms are present in local storage
  function checkAlarms() {
    let alarms = [];
    const isPresent = localStorage.getItem("alarms");
    if (isPresent) alarms = JSON.parse(isPresent);
  
    return alarms;
  }

  function getInput(e) {
    e.preventDefault();
    const hourValue = setHours.value;
    const minuteValue = setMinutes.value;
    const amPmValue = setAmPm.value;
  
    const alarmTime = `${parseInt(hourValue)}:${minuteValue} ${amPmValue}`

    setAlarm(alarmTime);
  }

  function setAlarm(time, fetching = false) {
    const alarm = setInterval(() => {
      if (time === getCurrentTime()) {
        alert("Alarm Ringing");
        ringtone.play();
        ringtone.loop = true;
      }
      console.log("running");
    }, 500);
  
    displayAlarms(time, alarm);
    
    if (!fetching) {
      saveAlarm(time);
    }
  }

//   Displaying all alarms
  function displayAlarms(time, intervalId) {
    const alarm = `
    <div class="alarm mb d-flex">
        <div class="time">${time}</div>
        <button class="btn delete-btn" data-id=${intervalId}>Delete</button>
    </div>
    `;

    alarmsContainer.innerHTML += alarm;
    
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(deletebtn => {
        deletebtn.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));
    });
  }

  // Saving alarm to local storage
  function saveAlarm(time) {
    const alarms = checkAlarms();
  
    alarms.push(time);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }

//   Deleting alarm
  function deleteAlarm(event, time, intervalId) {
    const self = event.target;
  
    clearInterval(intervalId);
  
    const alarm = self.parentElement;
    console.log(time);
  
    deleteAlarmFromLocal(time);
    alarm.remove();
  }
  
  function deleteAlarmFromLocal(time) {
    const alarms = checkAlarms();
  
    const index = alarms.indexOf(time);
    alarms.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }