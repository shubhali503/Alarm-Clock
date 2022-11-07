import { Alarm } from './Alarm.js';
import { addFiveMinutesInTime, generateRandomID, getCurrentHourMinuteTime } from './TimeUtils.js';
const ringtone = new Audio("./assets/ringtone.mp3");
export class AlarmManager {

    constructor() {
        this.alarms = [];
        this.snoozeLimit = 3;
    }

    getAllAlarms() {
        return this.alarms;
    }

    addAlarm(time, addToStorage, id) {
        // Generate a random alarm ID
        let alarmID;
        if (id) {
            alarmID = id
        } else {
            alarmID = generateRandomID();
        }
        const al = new Alarm(alarmID, time);
        const intervalID = setInterval(() => {
            if (time === getCurrentHourMinuteTime()) {
                ringtone.play();
            }
        }, 500);

        // Saving interval ID in alarm for future use.
        al.setIntervalID(intervalID);

        this.alarms.push(al);

        if (addToStorage) {
            this.addAlarmsToLocalStorage();
        }
        return al.toString();
    }

    deleteAlarm(id) {
        id = parseInt(id);
        const alarm = this.alarms.find(alarm => alarm.getID() === id);
        clearInterval(alarm.getIntervalID())
        let newAlarms = this.alarms.filter(alarm => alarm.getID() !== id);
        this.alarms = newAlarms;
        this.addAlarmsToLocalStorage()
    }

    addAlarmsToLocalStorage() {
        let strigifiedAlarms = this.alarms.map(alarm => alarm.toString());
        localStorage.setItem("alarms", JSON.stringify(strigifiedAlarms));
    }

    snoozeAlarm(id) {

        id = parseInt(id);
        const alarm = this.alarms.find(alarm => alarm.getID() === id);
        const newAlarms = this.alarms.filter(alarm => alarm.getID() !== id);

        if (alarm.getNumSnoozed() >= this.snoozeLimit) {
            alert('Alarm cannot be snoozed more than 3 times.')
            return;
        }

        clearInterval(alarm.getIntervalID());
        const newTime = addFiveMinutesInTime(alarm.time);
        alarm.setTime(newTime);

        const intervalID = setInterval(() => {
            if (newTime === getCurrentHourMinuteTime()) {
                ringtone.play();
            }
        }, 500);

        // Saving interval ID in alarm for future use.
        alarm.setIntervalID(intervalID);
        alarm.incrementNumSnoozed();
        newAlarms.push(alarm);
        this.alarms = newAlarms;
        this.addAlarmsToLocalStorage();
        return newTime;
    }
}