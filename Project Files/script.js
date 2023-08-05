let tasks = [];
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = "";

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="toggleCompletion(${index})">${task.completed ? 'Mark Uncompleted' : 'Mark Completed'}</button>
        `;
        taskList.appendChild(newTask);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function clearAll() {
    tasks = [];
    localStorage.removeItem("tasks");
    displayTasks();
}
