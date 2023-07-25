window.addEventListener('DOMContentLoaded', () => {
    /////////////////////////////////////////////////
    // Tabs
    /////////////////////////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.style.display = 'none'
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(tabNumber = 0) {
        tabsContent[tabNumber].style.display = 'block';
        tabs[tabNumber].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContent(2);

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }

    })

    /////////////////////////////////////////////////
    // Timer
    /////////////////////////////////////////////////
    const deadLine = '2024-05-27';

    // разница между deatLine и текущ. временем
    function getTimeRemaining(endTime) {
        let days, hours, mins, secs;

        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            mins = 0;
            secs = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Кол-во дней.  миллисекунд в сутках
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                mins = Math.floor((t / 1000 / 60) % 60),
                secs = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'mins': mins,
            'secs': secs
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        }
        return num
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            mins = timer.querySelector('#minutes'),
            secs = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            mins.innerHTML = getZero(t.mins);
            secs.innerHTML = getZero(t.secs);

            if (t.total <= 0) clearInterval(timeInterval) // если время вышло, таймер останавливаем
        }
    }

    setClock('.timer', deadLine);


})