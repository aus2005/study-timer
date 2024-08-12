document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
});

function updateProgressBar() {
    var completedTasks = parseInt(localStorage.getItem('completedTasks')) || 0;
    var totalTasks = parseInt(localStorage.getItem('totalTasks')) || 1; // Avoid division by zero
    var percentageComplete = (completedTasks / totalTasks) * 100;

    var progressText = document.getElementById('progressText');
    progressText.innerHTML = `You have completed ${completedTasks} out of ${totalTasks} tasks (${percentageComplete.toFixed(2)}%)`;

    var progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentageComplete + '%';
}
