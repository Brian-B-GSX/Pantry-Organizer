// Array to hold all items
let items = [];

// Add item to the table and list
function addItem() {
    const unit = document.getElementById('unit').value;
    const shelf = document.getElementById('shelf').value;
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;
    const dateAdded = document.getElementById('dateAdded').value;
    const expirationDate = document.getElementById('expirationDate').value;

    if (unit && shelf && item && quantity && dateAdded && expirationDate) {
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
    } else {
        alert("Please fill in all fields");
    }
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
        </tr>
    `;

    filteredItems.forEach((item) => {
        tableHTML += `
            <tr>
                <td>${item.unit}</td>
                <td>${item.shelf}</td>
                <td>${item.item}</td>
                <td>${item.quantity}</td>
                <td>${item.dateAdded}</td>
                <td>${item.expirationDate}</td>
            </tr>
        `;
    });

    tableHTML += '</table>';
    tableContainer.innerHTML = tableHTML;
}

// Clear the table and items
function clearTable() {
    items = [];
    displayItems(items);
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
    };

    reader.readAsText(file);
}
