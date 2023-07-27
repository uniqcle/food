import Menu from './menuClass.js';
import data from './menu-data.js';

const menuItemContainer = document.querySelector('#menuItemContainer')

data.forEach(dataItem => {
    const menu = new Menu(dataItem);
    menuItemContainer.insertAdjacentHTML('beforeend', menu.render())
})