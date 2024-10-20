// AI helped with this code
// Function to add reminders with local storage
function addReminder() {
    const reminderText = document.getElementById('reminderText').value;
    const reminderDate = document.getElementById('reminderDate').value;
    
    if (reminderText && reminderDate) {
        const reminderItem = `${reminderText} - ${reminderDate}`;
        
        // Add reminder to localStorage
        let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.push(reminderItem);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        
        // Update the UI
        updateReminders();
        
        // Clear input fields
        document.getElementById('reminderText').value = '';
        document.getElementById('reminderDate').value = '';
    } else {
        alert("Please fill out both fields.");
    }
}

// Function to update reminders on the page
function updateReminders() {
    const reminderContainer = document.getElementById('reminders-container');
    reminderContainer.innerHTML = ''; // Clear current reminders

    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    reminders.forEach(reminder => {
        const reminderItem = document.createElement('div');
        reminderItem.className = 'reminder-item';
        reminderItem.textContent = reminder;
        reminderContainer.appendChild(reminderItem);
    });
}

// Function to clear all reminders
function clearReminders() {
    // Clear reminders from localStorage
    localStorage.removeItem('reminders');
    
    // Update the UI to reflect no reminders
    updateReminders();
}

// Load reminders when the page loads
window.onload = function() {
    updateReminders();
};

// Dark mode toggle function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const header = document.querySelector("header");
    header.classList.toggle("dark-mode");
    const remindersContainer = document.getElementById("alerts-reminders-section");
    remindersContainer.classList.toggle("dark-mode");
}
