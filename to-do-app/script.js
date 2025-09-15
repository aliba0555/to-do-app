const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));
const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

let tasks = getTasks();
const taskList = document.getElementById("taskList");

// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = `col-md-6 task-card ${task.status === "Completed" ? "completed" : ""}`;
    card.innerHTML = `
      <h5>${task.title}</h5>
      <p>${task.description || ""}</p>
      <p><b>Status:</b> ${task.status}</p>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-warning" onclick="openEdit(${task.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(card);
  });
}

// Add Task
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const newTask = {
    id: Date.now(),
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    status: document.getElementById("status").value
  };
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
  this.reset();
});

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

// Open Edit Modal
function openEdit(id) {
  const task = tasks.find(t => t.id === id);
  document.getElementById("editId").value = task.id;
  document.getElementById("editTitle").value = task.title;
  document.getElementById("editDescription").value = task.description;
  document.getElementById("editStatus").value = task.status;
  new bootstrap.Modal(document.getElementById("editModal")).show();
}

// Update Task
document.getElementById("editForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("editId").value);
  tasks = tasks.map(task =>
    task.id === id
      ? {
          ...task,
          title: document.getElementById("editTitle").value,
          description: document.getElementById("editDescription").value,
          status: document.getElementById("editStatus").value
        }
      : task
  );
  saveTasks(tasks);
  renderTasks();
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});

renderTasks();
