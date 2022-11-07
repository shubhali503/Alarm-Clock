export class Alarm {
    constructor(id, time) {
        this.id = id;
        this.time = time;
        this.numSnoozed = 0;
    }
    toString() {
        return {
            id: this.id,
            time: this.time,
            numSnoozed: this.numSnoozed,
            intervalID: this.intervalID
        }
    }
    setIntervalID(intervalID) {
        this.intervalID = intervalID;
    }
    getIntervalID() {
        return this.intervalID;
    }
    getID() {
        return this.id;
    }
    getTime() {
        return this.time;
    }
    setTime(time) {
        this.time = time;
    }
    getNumSnoozed() {
        return this.numSnoozed;
    }
    incrementNumSnoozed() {
        this.numSnoozed = this.numSnoozed + 1;
    }
}