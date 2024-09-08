let pantryData = [];

// Add item to the table and array
function addItem() {
    let location = document.getElementById('location').value;
    let shelf = document.getElementById('shelf').value;
    let item = document.getElementById('item').value;
    let quantity = document.getElementById('quantity').value;
    let dateAdded = document.getElementById('date_added').value;
    let expirationDate = document.getElementById('expiration_date').value;

    let newRow = [location, shelf, item, quantity, dateAdded, expirationDate];
    pantryData.push(newRow);
    updateTable();
}

// Update table with current pantry data
function updateTable() {
    let tbody = document.querySelector("#pantry-table tbody");
    tbody.innerHTML = "";  // Clear current table rows

    pantryData.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(cellData => {
            let td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Export pantry data to CSV
function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add column headers
    csvContent += "Location,Shelf,Item,Quantity,Date Added,Expiration Date\n";

    pantryData.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pantry_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Import CSV and populate table
function importCSV(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        let rows = e.target.result.split("\n");
        pantryData = rows.slice(1).map(row => row.split(","));
        updateTable();
    };
    reader.readAsText(file);
}

// Clear table and data
function clearTable() {
    pantryData = [];
    updateTable();
}
