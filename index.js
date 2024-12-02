const input = document.querySelector("#input");
const addBtn = document.querySelector("#add");
const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-template");
const taskCount = document.querySelector("#task-count");
const deleteAllBtn = document.querySelector("#delete-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        updateTasks();
        input.value = ""; // Clear input
    }
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const index = e.target.parentElement.dataset.index;
        tasks.splice(index, 1);
        updateTasks();
    }
});


deleteAllBtn.addEventListener("click", () => {
    tasks = [];
    updateTasks();
});

function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = taskTemplate.cloneNode(true);
        taskElement.classList.remove("hide");
        taskElement.querySelector(".task-text").textContent = task.text;
        taskElement.querySelector(".tick").checked = task.completed;
        taskElement.dataset.index = index;
        taskList.appendChild(taskElement);
    });

    taskCount.textContent = tasks.length;
}

document.addEventListener("DOMContentLoaded", updateTasks);
