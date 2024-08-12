document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    var myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        addCloseButton(myNodelist[i]);
    }

    document.querySelector('ul').addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            updateTask(ev.target.textContent.slice(0, -1), ev.target.classList.contains('checked'));
        }
    }, false);
});

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must enter a task!");
        return;
    }
    
    li.appendChild(document.createTextNode(inputValue));
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";

    addCloseButton(li);
    saveTask(inputValue, false);
}

function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        removeTask(div.textContent.slice(0, -1));
    }
}

function saveTask(task, completed) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task: task, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTracker();
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(item) {
        if (!item.removed) { 
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(item.task));
            if (item.completed) {
                li.classList.add('checked');
            }
            document.getElementById("myUL").appendChild(li);
            addCloseButton(li);
            updateTracker();
        }
        updateTracker();
    });
}

function updateTask(task, completed) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(item) {
        if (item.task === task) {
            item.completed = completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTracker();
}

function removeTask(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function(item) {
        return item.task !== task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTracker();
}

function updateTracker() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var activeTasks = tasks.filter(function(item) {
        return !item.removed;
    });
    var completedTasks = activeTasks.filter(function(item) {
        return item.completed;
    }).length;
    var totalTasks = activeTasks.length;
    
    localStorage.setItem('completedTasks', completedTasks);
    localStorage.setItem('totalTasks', totalTasks);
}
