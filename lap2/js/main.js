var alarmList = [];

let list = document.getElementById("alarmList");

let selectTag = document.querySelectorAll("select");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value=${i}>${i}</option>`;
  selectTag[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value=${i}>${i}</option>`;
  selectTag[1].firstElementChild.insertAdjacentHTML("afterend", option);
  selectTag[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

function currentTime() {
  var time = new Date();

  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();

  var session = "";

  if (hours >= 12) {
    session = "PM";
  } else {
    session = "AM";
  }

  if (hours > 12) {
    hours -= 12;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let timeCurrent = `${hours}:${minutes}:${seconds} ${session}`;
  alarmList.map((alarm) => {
    if (alarm.time === timeCurrent) {
      window.alert("alarm ring");
    }
  });

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  document.getElementById("session").innerHTML = session;
}

setInterval(currentTime, 1000);

function displayAlarm(alarm) {
  var div = document.createElement("div");

  div.innerHTML = `
                    <div>
                        ${alarm.time}
                    </div>  

                    <div>
                        <button id="${alarm.id}" class="delete">Delete</button>
                    </div>
	`;

  list.append(div);
  return;
}

function display() {
  list.innerHTML = "";

  alarmList.map((alarm) => displayAlarm(alarm));
}

function addAlarm() {
  let hour = document.getElementById("hoursInput").value;

  let minute = document.getElementById("minutesInput").value;

  let second = document.getElementById("secondsInput").value;

  let amPM = document.getElementById("sessionInput").value;

  if (hour === "Hour" || minute === "Minute" || second === "Second") {
    window.alert("Enter Correct values HH:MM:SS !!");
    return;
  }

  window.alert(`Alarm set for ${hour} : ${minute} : ${second} ${amPM}`);

  let alarmTime = {
    time: `${hour}:${minute}:${second} ${amPM}`,
    id: Date.now().toString(),
  };

  alarmList.push(alarmTime);

  document.getElementById("hoursInput").value = "Hour";
  document.getElementById("minutesInput").value = "Minute";
  document.getElementById("secondsInput").value = "Second";
  document.getElementById("sessionInput").value = "AM";
  return;
}

function removeAlarm(alarmId) {
  let newAlarmList = alarmList.filter((alarm) => alarm.id != alarmId);
  alarmList = newAlarmList;
  return;
}

document.addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target;

  if (target.className === "setAlarmBtn") {
    addAlarm();
  } else if (target.className === "delete") {
    removeAlarm(target.id);
  }

  display();
});
