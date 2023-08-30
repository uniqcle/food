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

const getData = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Ошибка запроса данных по адресу ${url}, status: ${res.status}`)
    }

    return await res.json();
}

export { postData, getData }