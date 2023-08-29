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