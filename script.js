const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


// Adding Event Listener
const addItem = e => {
    e.preventDefault();
    const inputValue = itemInput.value;
    if (inputValue === ''){
        alert('Please enter item.');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(inputValue));
    
    const button = document.createElement('button');
    button.classList = 'remove-item btn-link text-red';

    const icon = document.createElement('icon');
    icon.classList = 'fa-solid fa-xmark';

    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
}

itemForm.addEventListener('submit', addItem);