// Array to store items
let items = [];

// Add an item to the shelf and to the items array
function addItem() {
    const itemName = document.getElementById('item').value;
    const itemQuantity = document.getElementById('quantity').value;
    const itemShelf = document.getElementById('shelf').value;
    const itemUnit = document.getElementById('unit').value;
    const itemDateAdded = document.getElementById('dateAdded').value;
    const itemExpirationDate = document.getElementById('expirationDate').value;

    const item = {
        item: itemName,
        quantity: itemQuantity,
        shelf: itemShelf,
        unit: itemUnit,
        dateAdded: itemDateAdded,
        expirationDate: itemExpirationDate
    };

    // Add item to the items array
    items.push(item);
    
    // Log items for debugging
    console.log('Items Array:', items);

    // Reset the form after adding
    document.getElementById('item-form').reset();
}

// Open the recipe selection modal
function openRecipeSelector() {
    const modal = document.getElementById('recipe-modal');
    const ingredientOptions = document.getElementById('ingredient-options');
    modal.style.display = 'block';

    ingredientOptions.innerHTML = ''; // Clear previous options

    // Loop through items to create checkboxes
    items.forEach((item, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `ingredient-${index}`;
        checkbox.value = item.item;  // Using the item name as the value

        const label = document.createElement('label');
        label.htmlFor = `ingredient-${index}`;
        label.textContent = item.item;

        ingredientOptions.appendChild(checkbox);
        ingredientOptions.appendChild(label);
        ingredientOptions.appendChild(document.createElement('br'));
    });
}

// Perform a search for recipes using selected ingredients
function searchForRecipes() {
    const selectedIngredients = [];
    items.forEach((item, index) => {
        const checkbox = document.getElementById(`ingredient-${index}`);
        if (checkbox && checkbox.checked) {
            selectedIngredients.push(checkbox.value);
        }
    });

    if (selectedIngredients.length > 0) {
        const query = `https://www.google.com/search?q=recipes+with+${selectedIngredients.join('+')}`;
        // Log the query for debugging
        console.log('Search Query:', query);
        window.open(query, '_blank');  // Open search results in a new tab
    } else {
        alert("Please select at least one ingredient!");
    }
}

// Function to close the modal
function closeRecipeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}

// Ensure the code runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Add your initialization code here if needed
});

