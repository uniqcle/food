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


    /////////////////////////////////////////////////
    // Modal 
    /////////////////////////////////////////////////
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''
    }

    function openModal() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }
    // навешиваем события на кнопки
    modalTrigger.forEach(trigger => {
        trigger.addEventListener('click', function () {
            openModal()
        })
    });



    //если кликает по области вне модальн. окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // закрываем по клавише esc
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    })

    // открываем модальн. окное по истечении 2 сек. 
    const modalTimerId = setTimeout(openModal, 2000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // означает что пользователь долистал до конца страницы.
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    //window.addEventListener('scroll', showModalByScroll);


    /////////////////////////////////////////////////
    // Forms
    /////////////////////////////////////////////////
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! С вами свяжутся.',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(form => {
        postData(form)
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; margin: 0 auto; `;
            form.append(statusMessage)

            const request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:8000/server.php');
            //request.setRequestHeader('Content-type', 'multipart/form-data')
            request.setRequestHeader('Content-Type', 'application/json')

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value
            })

            const json = JSON.stringify(object)
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response)
                    //statusMessage.textContent = message.success;
                    showThanksModal(message.success)
                    form.reset();
                } else {
                    //statusMessage.textContent = message.failure;
                    showThanksModal(message.failure)
                }
            })
        })
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide')
            closeModal();
        }, 4000)
    }

})