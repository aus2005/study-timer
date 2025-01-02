document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar(); 
});

function updateProgressBar() {
    var tasks = document.querySelectorAll('ul li'); 
    var totalTasks = tasks.length;  
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
