// global character count, resets on each setInterval call
let charCount = 0;

const intervals = [0];

let maxWPM;

// listens for character inputs, increment charCount with each keypress
document.addEventListener('keypress', (e) => {
  // console.log(charCount);
  charCount++;
});
// stores WPM, updated on each setInterval call
let value;
let weighted;
let prevWeighted;

// caluclates WPM, recalculates on each setInterval call
function wpm(num) {
  console.log('wpm fired!');
  const result = (num / 5) * 30;
  charCount = 0;
  value = result;
  wpmNumber.innerHTML = result.toString();

  

  if (intervals.length > 3 && weighted > prevWeighted) {
    // POST message to chat
    postMessage(Math.floor(weighted));
    console.log('triggered');
    playSound();
  }

  intervals.push(value);
  
  maxWPM = Math.max(...intervals);
  maxWpmElement.innerHTML = 'Max: ' + maxWPM;

  prevWeighted = weighted;

  weighted = intervals.reduce((a,b) => {
    return a + b;
  }) / intervals.length;
  weightedAvg.innerHTML = 'Avg: ' + Math.floor(weighted);

}


// dynamically updates WPM, at rate of value passed as second argument
function timer() {
  setInterval(() => wpm(charCount), 2000)
}

// CREATE AND APPEND VISUAL ELEMENTS

// Main Container
const container = document.createElement('zdiv');
container.id = 'zzx-container';
document.body.appendChild(container);

// Row Div Containers
const topRow = document.createElement('zdiv');
topRow.className = 'row';
container.appendChild(topRow);

const midRow = document.createElement('zdiv');
midRow.className = 'row';
container.appendChild(midRow);

const botRow = document.createElement('zdiv');
botRow.className = 'row';
botRow.id = 'zzx-botRow';
container.appendChild(botRow);

// Place Text In Top Row
const wpmLabel = document.createElement('z');
wpmLabel.id = 'zzx-p'
wpmLabel.innerHTML = 'WORDS PER MINUTE';
topRow.appendChild(wpmLabel);

// Place Main Number in Middle Row
const wpmNumber = document.createElement('z1');
wpmNumber.id = 'zzx-h1'
wpmNumber.innerHTML = 0;
midRow.appendChild(wpmNumber)

// Place Max And Average In Bottom Row
const maxWpmElement = document.createElement('z3');
maxWpmElement.className = 'zzx-h3'
maxWpmElement.id = 'zzx-max';
maxWpmElement.innerHTML = 'Max: ' + 0;
botRow.appendChild(maxWpmElement);

const weightedAvg = document.createElement('z3');
weightedAvg.className = 'zzx-h3'
weightedAvg.id = 'zzx-weighted';
weightedAvg.innerHTML = 'Avg: ' + 0;
botRow.appendChild(weightedAvg);

// Add bell sound
const bell = document.createElement('audio');
bell.id = 'audio';
bell.src = '/Users/chrisfranz/Desktop/Codesmith/Code/02/chrome-extension-wpm/chime.mp3';
bell.setAttribute('autoplay', 'false');
document.body.appendChild(bell);

// plays bell sound
const playSound = () => {
  const sound = document.getElementById('audio');
  sound.play();
}
// post message to chat
const postMessage = (value) => {
  const output = {
    created_by: 'Jim Chris',
    message: `BOOYAH, I just typed ${value} words per minute!!`
  };

  const Url = 'http://slack-server.elasticbeanstalk.com/messages';

  const otherParam = {
    mode: "cors",
    headers:{
        "content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(output),
    method: "POST"
  };

  fetch(Url, otherParam).then(data => data.json()).then(result => console.log(result)).catch(error=>console.log(error));
}

// invokes wpm function on page load
document.addEventListener("load", timer());

