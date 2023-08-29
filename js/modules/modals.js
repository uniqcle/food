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