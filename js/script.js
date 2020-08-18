const app = document.querySelector('.app'),
    showButton = document.querySelector('.show__btn');

// Making a request
window.addEventListener('load', function () {
    const xml = new XMLHttpRequest();
    xml.open('GET', 'http://localhost:3000/people');
    xml.setRequestHeader('Content-type', 'application/json');

    xml.onload = () => {
        if (xml.status >= 400) {
            throw new Error('Something went wrong(');
        } else {
            const data = JSON.parse(xml.response);
            makingCard(data);
        }
    }

    xml.send();
})

// Making UI elements from received data base
function makingCard(data) {
    data.forEach(element => {
        showButton.disabled = false;
        const phoneIcon = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" class="svg-inline--fa fa-phone-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" width="18px" height: "18px" viewBox="0 0 512 512"><path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>`;
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <img class='card__img' src='${element.photo}'>
        <div class='name'>${element.name} ${element.surname.toUpperCase()}</div>
        <div class='age'>Yoshim ${element.age} da</div>
        <div class='number__block'>
            <div class='number__block-mask' onclick='showNumber(event)'>${phoneIcon}Tanishish</div>
            <a href='tel:${element.number}' class='number__link'>+${element.number}</a>
        </div>
        `
        // Adding card element inside of app div
        app.appendChild(card);
        // Showing cards
        showButton.addEventListener('click', () => {
            app.classList.add('show');
            showButton.style.display = 'none';
        })
    })
}

// Showing the number of cards
function showNumber(event) {
    target = event.target;
    target.style.top = '-100%';
}
