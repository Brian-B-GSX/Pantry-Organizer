function addReminder() {
    const reminderText = document.getElementById('reminderText').value;
    const reminderDate = document.getElementById('reminderDate').value;
    
    if (reminderText && reminderDate) {
        const reminderContainer = document.getElementById('reminders-container');
        const reminderItem = document.createElement('div');
        reminderItem.className = 'reminder-item';
        reminderItem.textContent = `${reminderText} - ${reminderDate}`;
        
        reminderContainer.appendChild(reminderItem);
        
        // Clear input fields
        document.getElementById('reminderText').value = '';
        document.getElementById('reminderDate').value = '';
    } else {
        alert("Please fill out both fields.");
    }
}

// Dark mode toggle function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const header = document.querySelector("header");
    header.classList.toggle("dark-mode");
    const remindersContainer = document.getElementById("alerts-reminders-section");
    remindersContainer.classList.toggle("dark-mode");
}
