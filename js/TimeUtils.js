export function getCurrentHourMinuteTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    return time;
}


export function getCurrentHourMinuteSecondTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
    return time;
}

export function generateRandomID() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
}

export function addFiveMinutesInTime(time) {
    const timeValue = time.split(" ")[0];
    const AMPM = time.split(" ")[1];
    let minuteValue = parseInt(timeValue.split(":")[1]);
    let hourValue = parseInt(timeValue.split(":")[0]);
    minuteValue = (minuteValue + 5) % 60;

    if (minuteValue <= 5) {
        hourValue = (hourValue + 1) % 12;
    }
    return `${hourValue}:${minuteValue < 10 ? "0" + minuteValue : minuteValue} ${AMPM}`;
}