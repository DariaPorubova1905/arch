//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      days: '', hours: '', minutes: '', seconds: '',
      daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
    };
    this._start();
  }
  static declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }
  _calc() {
    const diff = this._deadline - new Date();
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this._out.days = days < 10 ? '0' + days : days;
    this._out.hours = hours < 10 ? '0' + hours : hours;
    this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
    this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
    this._out.daysTitle = CountdownTimer.declensionNum(days, ['день', 'дня', 'дней']);
    this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
    this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
    this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);