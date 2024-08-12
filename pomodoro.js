var pmdr = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    workDuration: 25,
    breakDuration: 5,
    isBreak: false,
    audio: new Audio('chime-sound-7143.mp3'), 

    init: function() {
        var self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillerDom = document.querySelector('#filler');
        this.interval = setInterval(function() {
            self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#work').onclick = function() {
            self.startWork.apply(self);
        };
        document.querySelector('#break').onclick = function() {
            self.startBreak.apply(self);
        };
        document.querySelector('#stop').onclick = function() {
            self.stopTimer.apply(self);
        };
        document.querySelector('#saveSettings').onclick = function() {
            self.saveSettings.apply(self);
        };
        document.querySelector('#loadSettings').onclick = function() {
            self.loadSettings.apply(self);
        };
        this.updateTaskProgress();
    },
    
    resetVariables: function(mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },

    startWork: function() {
        this.isBreak = false;
        this.resetVariables(this.workDuration, 0, true);
    },

    startBreak: function() {
        this.isBreak = true;
        this.resetVariables(this.breakDuration, 0, true);
    },

    stopTimer: function() {
        this.resetVariables(this.workDuration, 0, false);
        this.updateDom();
    },

    toDoubleDigit: function(num) {
        return num < 10 ? "0" + parseInt(num, 10) : num;
    },

    updateDom: function() {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight += this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + 'px';
    },

    intervalCallback: function() {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },

    timerComplete: function() {
        this.audio.play(); // Play sound when time is up
        this.started = false;
        this.fillerHeight = 0;
        if (this.isBreak) {
            alert("Break time over. Lets get back to work!");
            this.startWork(); 
        } else {
            alert("Work time over. Take a break!");
            this.startBreak(); 
        }
        this.updateTaskProgress();
    },

    saveSettings: function() {
        var workMinutes = parseInt(prompt("Enter work duration in minutes:", this.workDuration), 10);
        var breakMinutes = parseInt(prompt("Enter break duration in minutes:", this.breakDuration), 10);
        if (!isNaN(workMinutes) && workMinutes > 0) {
            this.workDuration = workMinutes;
        }
        if (!isNaN(breakMinutes) && breakMinutes > 0) {
            this.breakDuration = breakMinutes;
        }
        alert("Settings saved!");
    },

    updateTaskProgress: function() {
        var tasks = document.querySelectorAll('.todo-item');
        var completedTasks = 0;
        tasks.forEach(function(task) {
            if (task.classList.contains('checked')) {
                completedTasks++;
            }
        });
        localStorage.setItem('completedTasks', completedTasks);
        localStorage.setItem('totalTasks', tasks.length);
    }
};

function showSection(sectionId) {
    document.getElementById('timerSection').style.display = 'none';
    document.getElementById('todoSection').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}

window.onload = function() {
    pmdr.init();
};
