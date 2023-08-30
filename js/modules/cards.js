//import Menu from './menuClass.js';
import { getData } from '../services/services';

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

export default cards; 