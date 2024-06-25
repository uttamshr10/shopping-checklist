const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

const showItems = () => {
    const storageItems = itemsFromLocal();
    storageItems.forEach(item => addItemToDom(item));
    resetUI();
}

// Adding Event Listener
const addItem = e => {
    e.preventDefault();
    const inputValue = itemInput.value;
    if (inputValue === ''){
        alert('Please enter item.');
        return;
    }
    addItemToDom(inputValue);

    resetUI();

    addToLocal(inputValue);
}

const addItemToDom = item => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    
    const button = document.createElement('button');
    button.classList = 'remove-item btn-link text-red';
    const icon = document.createElement('icon');
    icon.classList = 'fa-solid fa-xmark';

    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
}


const addToLocal = item => {
    const localStorageValue = itemsFromLocal();
    
    // Adding item to the array
    localStorageValue.push(item);

    // Convert Array to JSON string to store it in localStorage
    localStorage.setItem('items', JSON.stringify(localStorageValue));
}

const itemsFromLocal = () => {
    let localStorageValue;
    if (localStorage.getItem('items') === null){
        localStorageValue = [];
    } else {
        localStorageValue = JSON.parse(localStorage.getItem('items'));
    }
    return localStorageValue;
}

const onClickItem = e => {
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
}

const removeItem = item => {
    if(confirm('Are you sure you want to delete?')){
        item.remove();
        removeFromLocal(item.textContent);
        resetUI();
    }
}

const removeFromLocal = item => {
    let localStorageValue = itemsFromLocal();
    localStorageValue = localStorageValue.filter(it => it !== item);
    
    // Reset local storage variable.
    localStorage.setItem('items', JSON.stringify(localStorageValue));
}


const filterItems = (e) => {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemContent = item.firstChild.textContent.toLowerCase();
        if (itemContent.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

const clearItems = () => {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    resetUI();
}

const resetUI = () => {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

const run = () => {
    itemForm.addEventListener('submit', addItem);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', showItems);
    resetUI();
}

run();
