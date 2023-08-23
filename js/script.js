import Menu from './menuClass.js';

window.addEventListener('DOMContentLoaded', () => {
    /////////////////////////////////////////////////
    // Menu
    /////////////////////////////////////////////////
    const menuItemContainer = document.querySelector('#menuItemContainer')

    const getData = async (url) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Ошибка запроса данных по адресу ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getData('http://localhost:3000/menu')
        .then(data => {

            data.forEach(dataItem => {
                const menu = new Menu(dataItem).render();

                menuItemContainer.insertAdjacentHTML('beforeend', menu)
            })

        })

    axios.get('http://localhost:3000/menu')
        .then(data => { })


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

    /*
    /////////////////////////////////////////////////
    // Sliders version 1
    /////////////////////////////////////////////////
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next');
    const total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let slideIndex = 1;

    showSlide(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
    } else {
        total.textContent = slides.length;
    }

    function showSlide(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => {
            slide.style.display = 'none'
        })

        slides[slideIndex - 1].style.display = 'block'

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }

    function plusSlides(n) {
        showSlide(slideIndex += n)
    }


    prev.addEventListener('click', function () {
        plusSlides(-1)
    })

    next.addEventListener('click', function () {
        plusSlides(1)
    })
    */

    /////////////////////////////////////////////////
    // Sliders version 2
    /////////////////////////////////////////////////
    const slides = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = `0.5s all`;
    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width;
    })

    next.addEventListener('click', () => {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }

    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
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
    //const modalTimerId = setTimeout(openModal, 2000);

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
        bindPostData(form)
    })
    /*with XMLHttpRequest */
    /*
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
    */

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await result.json();
    }

    /* with fetch */
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; margin: 0 auto; `;
            form.append(statusMessage)

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value
            })

            const json = JSON.stringify(object)

            postData('  http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data)
                    //statusMessage.textContent = message.success;
                    showThanksModal(message.success)
                })
                .catch(() => {
                    showThanksModal(message.failure)
                })
                .finally(() => {
                    form.reset();
                });

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