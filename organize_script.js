let pantryData = {};

function addItem() {
    let primaryUnit = document.getElementById('primary_unit').value;
    let location = document.getElementById('location').value;
    let shelf = document.getElementById('shelf').value;
    let item = document.getElementById('item').value;
    let quantity = document.getElementById('quantity').value;
    let dateAdded = document.getElementById('date_added').value;
    let expirationDate = document.getElementById('expiration_date').value;

    let newRow = [location, shelf, item, quantity, dateAdded, expirationDate];

    if (!pantryData[primaryUnit]) {
        pantryData[primaryUnit] = [];
    }

    pantryData[primaryUnit].push(newRow);
    renderTable();
    document.getElementById('pantry-form').reset();
}

function renderTable() {
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';  

    for (let unit in pantryData) {
        let section = document.createElement('div');
        section.classList.add('primary-unit-section');

        let header = document.createElement('h3');
        header.textContent = unit;
        section.appendChild(header);

        let table = document.createElement('table');
        table.classList.add('pantry-table');
        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');

        ['Location', 'Shelf', 'Item', 'Quantity', 'Date Added', 'Expiration Date'].forEach(col => {
            let th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement('tbody');
        pantryData[unit].forEach((row, rowIndex) => {
            let tr = document.createElement('tr');
            row.forEach((cellData, cellIndex) => {
                let td = document.createElement('td');
                td.textContent = cellData || '';
                td.contentEditable = true;  
                td.addEventListener('blur', () => {
                    pantryData[unit][rowIndex][cellIndex] = td.textContent;
                });
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        tableContainer.appendChild(section);
    }
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";

    Object.keys(pantryData).forEach(unit => {
        csvContent += unit + "\n";
        csvContent += "Location,Shelf,Item,Quantity,Date Added,Expiration Date\n";

        pantryData[unit].forEach(row => {
            csvContent += row.join(",") + "\n";
        });

        csvContent += "\n"; 
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pantry_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importFromCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        const rows = text.split("\n").map(row => row.split(","));
        
        let currentUnit = "";
        rows.forEach((row) => {
            if (row.length === 1 && row[0]) {
                currentUnit = row[0];
                pantryData[currentUnit] = [];
            } else if (row.length === 6 && currentUnit) {
                pantryData[currentUnit].push(row);
            }
        });

        renderTable();  
    };

    reader.readAsText(file);
}

function clearTable() {
    pantryData = {};  
    renderTable();    
}
