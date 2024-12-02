// DOM Elements
const input = document.querySelector("#input");
const addBtn = document.querySelector("#add");
const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-template");
const taskCount = document.querySelector("#task-count");
const deleteAllBtn = document.querySelector("#delete-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load saved tasks

// Add Task
addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        updateTasks();
        input.value = ""; // Clear input
    }
});

// Remove Task
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const index = e.target.parentElement.dataset.index;
        tasks.splice(index, 1);
        updateTasks();
    }
});

// Delete All Tasks
deleteAllBtn.addEventListener("click", () => {
    tasks = [];
    updateTasks();
});

// Update Tasks in the DOM and Local Storage
function updateTasks() {
    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear task list
    taskList.innerHTML = "";

    // Render tasks
    tasks.forEach((task, index) => {
        const taskElement = taskTemplate.cloneNode(true);
        taskElement.classList.remove("hide");
        taskElement.querySelector(".task-text").textContent = task.text;
        taskElement.querySelector(".tick").checked = task.completed;
        taskElement.dataset.index = index; // Add index for reference
        taskList.appendChild(taskElement);
    });

    // Update task count
    taskCount.textContent = tasks.length;
}

// Initialize Task List on Page Load
document.addEventListener("DOMContentLoaded", updateTasks);
