import * as AFRAME from 'aframe';

let camera = document.getElementById('js--camera');
let frames = 0, prevTime = performance.now();
var startTime;
var stopwatchInterval;
var elapsedPausedTime = 0;

function timer() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

const updateStopwatch = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  console.log(`Elapsed time: ${Math.floor(elapsedTime / 1000)} seconds`);
  fetch('http://localhost:3000/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ time: Math.floor(elapsedTime / 1000), timestamp: new Date().toLocaleString('NL-nl') }),
  }).catch((error) => console.error('Error:', error));
}

AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],

  init: function () {
    this.el.addEventListener('raycaster-intersection', (event) => {
      const intersectedEl = event.detail.els[0];
      // Check if the intersected element has the class "collidable"
      if (intersectedEl.classList.contains('collidable')) {
        timer();
        let egg = "<a-entity position='1 -1 -2' geometry='primitive: sphere' material='color: #fff' radius='0.01'></a-entity>";
        intersectedEl.setAttribute('radius', 0);
        camera.innerHTML += egg;
        console.log(camera.innerHTML);
      }

      if (intersectedEl.classList.contains('finish')) {
        console.log('Finish');
        clearInterval(stopwatchInterval); // stop the interval
        elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
        stopwatchInterval = null; // reset the interval variable
        const finishPosition = intersectedEl.getAttribute('position');
        let egg = document.createElement('a-entity');
        egg.setAttribute('geometry', 'primitive: sphere');
        egg.setAttribute('material', 'color: #fff');
        egg.setAttribute('radius', '0.2');
        egg.setAttribute('position', {
          x: finishPosition.x,
          y: finishPosition.y + 2, // Adjust this value as needed
          z: finishPosition.z
        });
        this.el.sceneEl.appendChild(egg);
        const eggToRemove = camera.querySelector("[geometry='primitive: sphere']");
        if (eggToRemove) {
          camera.removeChild(eggToRemove);
        }
      }
    });
  }
});

function getFps() {
  // Get stats data (replace with your actual stats)
  requestAnimationFrame(getFps);

  // FPS
  frames++;
  const time = performance.now();

  if (time >= prevTime + 1000) {
    let fps = Math.round((frames * 1000) / (time - prevTime));
    if (fps !== null) {
      fetch('http://localhost:3000/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fps, timestamp: new Date().toLocaleString('NL-nl') }),
      }).catch((error) => console.error('Error:', error));
    }

    frames = 0;
    prevTime = time;
  }
}
getFps();

const getPressedKeys = () => {
  let keys = {};
  document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
  });
  document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
  });

  setInterval(() => {
    fetch('http://localhost:3000/keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keys, timestamp: new Date().toLocaleString('NL-nl') }),
    }).catch((error) => console.error('Error:', error));

    keys = {};
  }, 1000);
}

getPressedKeys();
