const inpt = document.getElementById('Taskinput')
const btn = document.getElementById('addTask')
const list = document.getElementById('Tasklist')

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToUI(task.text, task.completed));
}

function saveTasks() {
    const tasks = [...list.children].map(li => ({
        text: li.querySelector('.task-text').innerText,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToUI(task, completed = false) {
    if (!task.trim()) return;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
    });

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = task;
    span.classList.add('task-text');
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add('delete');
    delBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    if (completed) li.classList.add('completed');
    list.appendChild(li);
    saveTasks();
}

btn.addEventListener('click', function() {
    addTaskToUI(inpt.value);
    inpt.value = '';
});

inpt.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTaskToUI(inpt.value);
        inpt.value = '';
    }
});

loadTasks();
