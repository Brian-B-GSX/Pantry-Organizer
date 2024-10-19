// Initialize shopping list from local storage
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

function addShoppingItem() {
    const itemInput = document.getElementById('shopping-item');
    const itemName = itemInput.value.trim();

    if (itemName) {
        shoppingList.push(itemName);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); // Save to local storage
        itemInput.value = '';
        updateShoppingList();
    } else {
        alert("Please enter an item name.");
    }
}

function updateShoppingList() {
    const listElement = document.getElementById('shopping-list');
    listElement.innerHTML = ''; // Clear the current list

    shoppingList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });
}

function clearShoppingList() {
    shoppingList = [];
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); // Clear from local storage
    updateShoppingList();
}

function printShoppingList() {
    const printWindow = window.open('', 'PRINT', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Shopping List</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>My Shopping List</h1>');
    printWindow.document.write('<ul>');
    
    shoppingList.forEach(item => {
        printWindow.document.write(`<li>${item}</li>`);
    });
    
    printWindow.document.write('</ul>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Load shopping list when the page loads
window.onload = function() {
    updateShoppingList();
};

// Dark mode toggle function
function toggleDarkMode() {
    const body = document.body;
    const themeToggleButton = document.getElementById("theme-toggle");
    
    // Toggle dark mode class
    body.classList.toggle("dark-mode");
    
    // Toggle button text
    if (body.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "Toggle Light Mode";
    } else {
        themeToggleButton.textContent = "Toggle Dark Mode";
    }
}
