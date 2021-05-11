export class Timer {
  constructor(timerContainer, timerTemplate, duration) {
    this._timerContainer = timerContainer;
    this._timerTemplate = timerTemplate;
    this._duration = parseInt(duration);

    this._startTimer = this._startTimer.bind(this);
  }

  _getTemplate() {
    const timerElement = this._timerTemplate.content
      .querySelector(".timer")
      .cloneNode(true);

    return timerElement;
  }

  _setTimer() {}

  _startTimer() {
    let timerDisplay = this._timer.querySelector(".timer__duration");
    let timerDuration = this._duration; // in minutes
    let currentTime = Date.parse(new Date());
    let duration = new Date(currentTime + timerDuration * 60 * 1000); // when the timer is supposed to end, date string

    function getTimeRemaining(endTime) {
      const totalTime = Date.parse(endTime) - Date.parse(new Date());
      const seconds = Math.floor((totalTime / 1000) % 60);
      const minutes = Math.floor((totalTime / 1000 / 60) % 60);
      const hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
      return {
        totalTime,
        hours,
        minutes,
        seconds,
      };
    }

    function updateTime() {
      const time = getTimeRemaining(duration);
      timerDisplay.innerText = `${("0" + time.hours).slice(-2)}:${(
        "0" + time.minutes
      ).slice(-2)}:${("0" + time.seconds).slice(-2)}`;
      if (time.totalTime <= 0) {
        clearInterval(this._timerInterval);
        this._handleTimerEnd();
      }
    }

    this._timerInterval = setInterval(updateTime.bind(this), 1000);
    updateTime.bind(this)();
  }

  _handleTimerEnd() {
    this._deleteDisplay();
    this._makeNotification();
  }

  _makeNotification() {
    if (Notification.permission == "granted") {
      const notif = new Notification(`From the Bindary: Your timer is up!`);
    } else {
      alert(`You haven't enabled notifications yet! Your timer is up!`);
    }
  }

  _createDisplay() {
    this._timer = this._getTemplate();
    this._timer.style.display = "flex";
    this._timerContainer.append(this._timer);
    this._startTimer();
    // makes + fills the window that has the timer info, delete btn
  }

  _deleteDisplay() {
    this._timer.remove();
    clearInterval(this._timerInterval);
    // removes the window if this timer is deleted
  }

  run() {
    // when this is called, the timer method execution cascade starts
    this._createDisplay();
    this._timer
      .querySelector(".timer__delete-button")
      .addEventListener("click", () => {
        this._deleteDisplay();
      });
    // next, add timer display stuff to it
  }
}
