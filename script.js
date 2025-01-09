// Get elements
const tasksContainer = document.querySelector('#tasks'); // The container where tasks are displayed
const taskInput = document.querySelector('#newtask input'); // The input field for new tasks
const addButton = document.querySelector('#push'); // The button to add new tasks

// Load tasks from localStorage when the page loads
window.onload = function () {
    // Get tasks from localStorage or set to an empty array if nothing is saved
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Add each saved task to the UI
    savedTasks.forEach(task => {
        addTaskToUI(task.text, task.completed);
    });
};

// Add a new task when the button is clicked
addButton.onclick = function () {
    if (taskInput.value.length == 0) {
        alert("Please Enter a Task"); // Show an alert if the input is empty
    } else {
        // Retrieve saved tasks from localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Create a new task object with text and completion status
        const newTask = { text: taskInput.value, completed: false };
        // Add the new task to the saved tasks array
        savedTasks.push(newTask);
        // Save the updated tasks array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        // Add the new task to the UI
        addTaskToUI(taskInput.value, false);
        // Clear the input field after adding the task
        taskInput.value = "";
    }
};

// Add a task to the UI
function addTaskToUI(taskText, isCompleted) {
    // Add a task element with a delete button and optional "completed" class
    tasksContainer.innerHTML += `
        <div class="task">
            <span id="taskname" class="${isCompleted ? 'completed' : ''}" onclick="toggleCompletion('${taskText}')">
                ${taskText}
            </span>
            <button class="delete" title="Delete" onclick="deleteTask('${taskText}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;
}

// Toggle the completion status of a task
function toggleCompletion(taskText) {
    // Retrieve saved tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Update the completed status of the task that matches the given text
    const updatedTasks = savedTasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed; // Toggle the completed status
        }
        return task; // Return the task object
    });
    // Save the updated tasks array back to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update the UI by toggling the "completed" class for the clicked task
    const taskElements = document.querySelectorAll('#taskname');
    taskElements.forEach(task => {
        if (task.textContent === taskText) {
            task.classList.toggle('completed');
        }
    });
}

// Delete a task
function deleteTask(taskText) {
    // Retrieve saved tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Filter out the task that matches the given text
    const updatedTasks = savedTasks.filter(task => task.text !== taskText);
    // Save the updated tasks array back to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Remove the task from the UI
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach(task => {
        if (task.querySelector('#taskname').textContent === taskText) {
            task.remove();
        }
    });
}
