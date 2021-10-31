function timer (id, deadline) {

    "use strict";

    function showTimeleft(deadline) {

        return Date.parse(deadline) - Date.parse(new Date());

    }

    function showDhms(shortDate) {

        let z = showTimeleft(shortDate);

        let days = Math.floor(z / (1000 * 60 * 60 * 24));
        let hours = Math.floor(z / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(z / (1000 * 60) % 60);
        let seconds = Math.floor((z / 1000) % 60);

        // console.log(`сейчас ${Date()}`);
        // console.log(`до ${deadline} осталось ${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`);  

        return {
            total: z,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function updateTimer(selector, timeLimit) {

        const timerBlock = document.querySelector(selector),
            days = timerBlock.querySelector('#days'),
            hours = timerBlock.querySelector('#hours'),
            minutes = timerBlock.querySelector('#minutes'),
            seconds = timerBlock.querySelector('#seconds'),
            timeInterval = setInterval(updateclock, 1000);

        updateclock();

        function updateclock() {
            const currentTime = showDhms(timeLimit);

            days.innerHTML = getZero(currentTime.days);
            hours.innerHTML = getZero(currentTime.hours);
            minutes.innerHTML = getZero(currentTime.minutes);
            seconds.innerHTML = getZero(currentTime.seconds);

            if (currentTime.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = "00";
                hours.innerHTML = "00";
                minutes.innerHTML = "00";
                seconds.innerHTML = "00";
            }
        }
    }

    updateTimer(id, deadline);

}

export default timer;