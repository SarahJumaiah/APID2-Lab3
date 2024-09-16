let inp = document.getElementById("inp");
let imgUrlInput = document.getElementById("imgUrl");
let btn = document.getElementById("btn");
let imageContainer = document.getElementById("imageContainer");

function renderCard(data) {
    let container = document.createElement('div');
    container.classList.add('col-md-4', 'mb-4');

    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = data.imgUrl;
    img.alt = data.name;
    img.style.width ="100%"
    img.style.height = "50vh"

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let text = document.createElement('p');
    text.classList.add('card-text');
    text.innerText = data.name;

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.innerText = 'Delete';

    deleteBtn.addEventListener('click', () => {
        fetch(`https://66e7e68bb17821a9d9da6e50.mockapi.io/login/${data.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(() => container.remove());
    });

    cardBody.appendChild(text);
    cardBody.appendChild(deleteBtn);

    card.appendChild(img);
    card.appendChild(cardBody);

    container.appendChild(card);
    imageContainer.appendChild(container);
}

window.addEventListener('DOMContentLoaded', () => {
    fetch("https://66e7e68bb17821a9d9da6e50.mockapi.io/login")
        .then(response => response.json())
        .then(data => data.forEach(item => renderCard(item)));
});

btn.addEventListener("click", () => {
    if (inp.value.trim() === "" || imgUrlInput.value.trim() === "") {
        alert("Both fields are required.");
        return;
    }

    fetch("https://66e7e68bb17821a9d9da6e50.mockapi.io/login", {
        method: 'POST',
        body: JSON.stringify({
            name: inp.value,
            imgUrl: imgUrlInput.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => renderCard(data));

    inp.value = '';
    imgUrlInput.value = '';
});
