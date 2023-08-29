/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    /////////////////////////////////////////////////
    // Calculator 
    /////////////////////////////////////////////////
    const result = document.querySelector('.calculating__result span');



    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375;
    }

    function initLocalSettings(selector, activeClass) {
        const elems = document.querySelectorAll(selector);

        console.log(elems)

        elems.forEach(elem => {

            console.log(activeClass)
            elem.classList.remove(activeClass)

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Нет данных'
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', ratio)
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex)
                }

                elements.forEach(item => {
                    item.classList.remove(activeClass);
                })
                elem.classList.add(activeClass)

                calcTotal();
            })
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')



    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', e => {

            if (input.value.match(/\D/g)) {
                input.style.border = '5px solid red';
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = + input.value;
                    break;
            }
            calcTotal();
        })
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
}

module.exports = calc; 

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

//import Menu from './menuClass.js';

class Menu {
    constructor({ title, descr, price, img }) {
        this.title = title;
        this.desc = descr;
        this.price = price;
        this.img = img,
            this.priceRate = 2;
    }

    changeRUB() {
        return this.price * this.priceRate
    }

    render() {
        const price = this.changeRUB();



        return `
        <div class="menu__item">
                    <img src="${this.img}" alt="elite">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> руб.</div>
                    </div>
        </div>
        `
    }
}

function cards() {
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
}

module.exports = cards; 

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
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
}

module.exports = forms; 

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((module) => {

function modals() {
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

}

module.exports = modals; 

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {

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
}

module.exports = slider; 

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
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

}

module.exports = tabs; 

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
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

}

module.exports = timer; 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        modals = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    cards();
    slider();
    timer();
    modals();
    forms();
    calc();

})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map