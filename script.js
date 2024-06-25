const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');


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

const removeItem = e => {
    if (e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure you want to delete?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

const clearItems = () => {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
}


itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);