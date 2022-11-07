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
}