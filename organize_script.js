// AI helped with writing the JS code
// Array to hold all items
let items = JSON.parse(localStorage.getItem('items')) || []; // Load items from localStorage if available

// Add item to the table and list
function addItem() {
    const unit = document.getElementById('unit').value;
    const shelf = document.getElementById('shelf').value;
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    const dateAdded = document.getElementById('dateAdded').value;
    const expirationDate = document.getElementById('expirationDate').value;

    // Form validation - check that all fields are filled and expiration date is valid
    if (!unit || !shelf || !item || !quantity || !dateAdded || !expirationDate) {
        alert("Please fill in all fields");
        return;
    }

    if (!validateDates(dateAdded, expirationDate)) {
        alert("Expiration date must be later than the date added.");
        return;
    }

    // Create a new item object
    const newItem = {
        unit,
        shelf,
        item,
        quantity,
        dateAdded,
        expirationDate
    };

    items.push(newItem);
    displayItems(items);
    checkForExpiringItems();
    updateItemCount(); // Update item count when a new item is added
    saveItems(); // Save items to localStorage
    clearForm(); // Clear the form inputs after adding
}

// Form validation: check if expiration date is later than the date added
function validateDates(dateAdded, expirationDate) {
    const addedDate = new Date(dateAdded);
    const expDate = new Date(expirationDate);
    return expDate > addedDate;
}

// Clear the form after adding an item
function clearForm() {
    document.getElementById('unit').value = '';
    document.getElementById('shelf').value = '';
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('dateAdded').value = '';
    document.getElementById('expirationDate').value = '';
}

// Update item count display
function updateItemCount() {
    const itemCountElement = document.getElementById('item-count');
    itemCountElement.innerText = `Total Items: ${items.length}`; // Update the text with the current count
}

// Display items in the table
function displayItems(filteredItems) {
    const tableContainer = document.getElementById('table-container');
    if (filteredItems.length === 0) {
        tableContainer.innerHTML = '<p>No items to display.</p>';
        return;
    }

    let tableHTML = '<table>';
    tableHTML += `
        <tr>
            <th>Unit</th>
            <th>Shelf</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Date Added</th>
            <th>Expiration Date</th>
            <th>Action</th>
        </tr>
    `;

    filteredItems.forEach((item, index) => {
        tableHTML += `
            <tr>
                <td>${item.unit}</td>
                <td>${item.shelf}</td>
                <td>${item.item}</td>
                <td>${item.quantity}</td>
                <td>${item.dateAdded}</td>
                <td>${item.expirationDate}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
}

// Check for items expiring within 3 days and display alerts
function checkForExpiringItems() {
    const alertsContainer = document.getElementById('alerts-container');
    alertsContainer.innerHTML = ''; // Clear previous alerts

    const today = new Date();

    items.forEach(item => {
        const expDate = new Date(item.expirationDate);
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 3 && diffDays >= 0) {
            const alertMessage = `${item.item} will be expiring in ${diffDays} days. Exp. Date is ${item.expirationDate}`;
            const alertElement = document.createElement('p');
            alertElement.textContent = alertMessage;
            alertsContainer.appendChild(alertElement);
        }
    });
}

// Remove an item from the list and update the display
function removeItem(index) {
    items.splice(index, 1);
    displayItems(items);
    checkForExpiringItems();
    updateItemCount();
    saveItems(); // Save updated items to localStorage
}

// Clear the table and items
function clearTable() {
    items = [];
    displayItems(items);
    document.getElementById('alerts-container').innerHTML = ''; // Clear alerts when clearing the table
    updateItemCount(); // Update item count after clearing the table
    saveItems(); // Save empty state to localStorage
}

// Search and filter items
function filterItems() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const unitFilter = document.getElementById('unitFilter').value;

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.item.toLowerCase().includes(searchQuery);
        const matchesUnit = unitFilter === 'all' || item.unit === unitFilter;

        return matchesSearch && matchesUnit;
    });

    displayItems(filteredItems);
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

// Google Search for Recipes Based on Items
function searchGoogle() {
    const pantryItems = items.map(item => item.item).join(' and '); // Join items with " and "
    if (pantryItems) {
        const searchQuery = `recipes including ${encodeURIComponent(pantryItems)}`; // Construct the search query
        const googleSearchURL = `https://www.google.com/search?q=${searchQuery}`; // Create Google search URL
        window.open(googleSearchURL, '_blank'); // Open the search in a new tab
    } else {
        alert("You need to add items to your list before searching for recipes.");
    }
}

// CSV Export
function exportToCSV() {
    const csvContent = items.map(item =>
        `${item.unit},${item.shelf},${item.item},${item.quantity},${item.dateAdded},${item.expirationDate}`
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'smartshelf_items.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// CSV Import
function importFromCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const lines = e.target.result.split('\n');
        items = lines.map(line => {
            const [unit, shelf, item, quantity, dateAdded, expirationDate] = line.split(',');
            return { unit, shelf, item, quantity, dateAdded, expirationDate };
        });
        displayItems(items);
        checkForExpiringItems();
        updateItemCount(); // Update item count after importing
        saveItems(); // Save imported items to localStorage
    };

    reader.readAsText(file);
}

// Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');

    // Apply the dark mode class to all relevant sections
    document.getElementById('form-section').classList.toggle('dark-mode');
    document.getElementById('table-container').classList.toggle('dark-mode');
    document.getElementById('alerts-section').classList.toggle('dark-mode');
    document.querySelectorAll('th').forEach(th => th.classList.toggle('dark-mode'));
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));

    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Check and apply saved theme on page load
window.onload = function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        toggleDarkMode();
    }

    // Load saved items and display them
    displayItems(items);
    checkForExpiringItems();
    updateItemCount();
};

// Print the items in the list
function printItemList() {
    const printContent = document.getElementById('table-container').innerHTML;
    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write(`
        <html>
            <head><title>Print Items</title></head>
            <body>${printContent}</body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
}
