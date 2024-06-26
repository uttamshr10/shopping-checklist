const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

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

    if(isEditMode){
        const editItem = itemList.querySelector('.edit-mode');
        removeFromLocal(editItem.textContent);
        editItem.classList.remove('edit-mode');
        editItem.remove();
        isEditMode = false;
    } else {
        if (checkDuplicate(inputValue)){
            alert('The value you entered already exists.');
            return;
        }
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
    } else {
        setItemToEdit(e.target);
    }
}

const setItemToEdit = item => {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(it => it.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
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

const checkDuplicate = item => {
    const localStorageValue = itemsFromLocal();
    return localStorageValue.includes(item);
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
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
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
