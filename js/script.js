

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        cards = require('./modules/cards'),
        slider = require('./modules/slider'),
        timer = require('./modules/timer'),
        modals = require('./modules/modals'),
        forms = require('./modules/forms'),
        calc = require('./modules/calc');

    tabs();
    cards();
    slider();
    timer();
    modals();
    forms();
    calc();

})