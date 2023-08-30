import { postData } from '../services/services';

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

export default forms; 