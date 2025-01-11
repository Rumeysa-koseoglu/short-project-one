// Get elements from the HTML page
const tasksContainer = document.querySelector('#tasks'); // Container for all tasks
const taskInput = document.querySelector('#newtask input'); // Input field for new tasks
const addButton = document.querySelector('#push'); // Button to add new tasks

// Load tasks from localStorage when the page loads
window.onload = function () {
    // Get saved tasks or use an empty array if there are no saved tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Add each saved task to the UI
    savedTasks.forEach(task => {
        addTaskToUI(task.text, task.completed);
    });
};

// Add a new task when the button is clicked
addButton.addEventListener('click', () => {
    // Check if the input is empty
    if (taskInput.value.trim() === "") {
        alert("Please Enter a Task"); // Show a warning if input is empty
        return; // Stop the function if input is empty
    }

    // Get the task text from the input
    const taskText = taskInput.value.trim();

    // Get the saved tasks from localStorage or use an empty array
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create a new task object with text and completion status
    const newTask = { text: taskText, completed: false };

    // Add the new task to the saved tasks array
    savedTasks.push(newTask);

    // Save the updated task list to localStorage
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    // Add the new task to the UI
    addTaskToUI(taskText, false);

    // Clear the input field after adding the task
    taskInput.value = "";
});

// Function to add a task to the UI
function addTaskToUI(taskText, isCompleted) {
    // Create a new task container (div)
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task'); // Add the 'task' class

    // Create a span for the task name
    const taskSpan = document.createElement('span');
    taskSpan.id = 'taskname'; // Add the ID 'taskname'
    taskSpan.textContent = taskText; // Set the text of the span
    if (isCompleted) taskSpan.classList.add('completed'); // If task is completed, add the class

    // Add a click event to toggle completion of the task
    taskSpan.addEventListener('click', () => toggleCompletion(taskText));

    // Create a delete button for the task
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete'); // Add the 'delete' class
    deleteButton.title = "Delete"; // Add a tooltip
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`; // Add a trash can icon

    // Add a click event to delete the task
    deleteButton.addEventListener('click', () => deleteTask(taskText));

    // Add the span and delete button to the task container
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(deleteButton);

    // Add the task container to the tasks list
    tasksContainer.appendChild(taskDiv);
}

// Function to toggle the completion of a task
function toggleCompletion(taskText) {
    // Get the saved tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the completed status of the matching task
    const updatedTasks = savedTasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed; // Change the completed status
        }
        return task; // Return the task object
    });

    // Save the updated task list to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update the UI for the task
    const taskElements = document.querySelectorAll('#taskname'); // Get all tasks
    taskElements.forEach(task => {
        if (task.textContent === taskText) {
            task.classList.toggle('completed'); // Toggle the 'completed' class
        }
    });
}

// Function to delete a task
function deleteTask(taskText) {
    // Get the saved tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove the task with the matching text
    const updatedTasks = savedTasks.filter(task => task.text !== taskText);

    // Save the updated task list to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Remove the task from the UI
    const taskElements = document.querySelectorAll('.task'); // Get all tasks
    taskElements.forEach(task => {
        if (task.querySelector('#taskname').textContent === taskText) {
            task.remove(); // Remove the task from the UI
        }
    });
}
