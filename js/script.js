window.addEventListener('DOMContentLoaded', () => {

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


})