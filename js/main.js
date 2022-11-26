let main = document.querySelector("main");
let modal = document.querySelector(".modal-window");
let modalHeadClose = modal.querySelector(".card__header .btn.card__close");
let modalFooterClose = modal.querySelector(".card__footer button");
let modalAddItemBtn = modal.querySelectorAll(".card__footer button")[1];
let modalForm = modal.querySelector("form");

let addItemBtn = document.querySelector(".stock-items-container__btn");
let itemsList = document.querySelector(".stock-items-list");

function openModal() {
    modal.classList.add('modal-window--open');
}

function closeModal() {
    modal.classList.remove('modal-window--open');
}

function findInputParent(inputName) {
    let input = modalForm.querySelector('input[name='+ inputName +']');
    let inputGroup = input.closest('.input-group');

    return inputGroup;
}
 
function dataValid(data) {
 
    let errors = [];

    if (data.title.length <= 3) {
        let input = findInputParent('title');
 
        input.classList.add('invalid');

        errors.push('title')
    }

    if (!isFloat(circumference(data.price))) {
        let input = findInputParent('price');
 
        input.classList.add('invalid');

        errors.push('price')
    }

    if (data.date.length != 19) {
        let input = findInputParent('date');
 
        input.classList.add('invalid');

        errors.push('date')
    }

    return errors;
}

function getCardTemplate(data, index) {

    let dateAndTime = data.date.split(' ');

    return `
        <div class="stock-item">
            <div class="cells">
                <div class="cell cell--number">${index}</div>
                <div class="cell cell--title">${data.title}</div>
                <div class="cell cell--price">${data.price}</div>
                <div class="cell cell--date">
                    <span>${dateAndTime[0]}</span> 
                    <span>${dateAndTime[1]}</span>
                </div>
            </div>
        </div>
    `;
}

function getStorageItems() {
    let cardItemsName = 'cardItems';
    let cardItems = window.localStorage.getItem(cardItemsName);

    if (!cardItems) {
       return [];
    }

    let items = JSON.parse(window.localStorage.getItem(cardItemsName));

    return items;
}

function saveData(data) {
    let cardItemsName = 'cardItems';
    let cardItems = window.localStorage.getItem(cardItemsName);

    if (!cardItems) {
        window.localStorage.setItem(cardItemsName, JSON.stringify([], true));
    }
    
    let items = JSON.parse(window.localStorage.getItem(cardItemsName));
    items.push(data);

    window.localStorage.setItem(cardItemsName, JSON.stringify(items));
}

function addItem() {
    let data = getFormData(modalForm);

    if (dataValid(data).length === 0) {
        itemsList.innerHTML = "";
    
        saveData(data);

        let items = getStorageItems();
        let htmlCards = "";
        items.forEach((element, index) => {
            let card = getCardTemplate(element, ++index);
            htmlCards += card;
        });

        itemsList.innerHTML += htmlCards;
        closeModal();
    }
 
}

modalAddItemBtn.addEventListener('click', addItem);
modalHeadClose.addEventListener('click', closeModal);
modalFooterClose.addEventListener('click', closeModal);
addItemBtn.addEventListener('click', openModal);

window.addEventListener('DOMContentLoaded', function (event) {
    itemsList.innerHTML = "";
    
    let items = getStorageItems();

    let htmlCard = "";
    items.forEach(function(item, index) {
        let card = getCardTemplate(item, ++index);
        htmlCard += card;
    });

    itemsList.innerHTML = htmlCard;
});