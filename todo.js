document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    
    document.querySelector('ul').addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            updateProgressBar();  // Update progress bar after task completion
        }
    });
});

function updateProgressBar() {
    var tasks = document.querySelectorAll('ul li');  
    var totalTasks = tasks.length;  // Total number of tasks
    var completedTasks = 0;

    // Count completed tasks
    tasks.forEach(function(task) {
        if (task.classList.contains('checked')) {
            completedTasks++;
        }
    });

    var percentageComplete = (totalTasks === 0) ? 0 : (completedTasks / totalTasks) * 100;

    var progressText = document.getElementById('progressText');
    progressText.innerHTML = `You have completed ${completedTasks} out of ${totalTasks} tasks (${percentageComplete.toFixed(2)}%)`;

    var progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentageComplete + '%';  
}

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
    updateProgressBar();  //Update the progress bar adding a task
}

function addCloseButton(li) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    span.onclick = function() {
        var div = this.parentElement;
        div.remove();  
        updateProgressBar();  // Update the progress bar after deleting a task
    }
}
