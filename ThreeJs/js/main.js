import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

let camera, scene, renderer, controls;
let moveForward = false,
  moveBackward = false,
  moveLeft = false,
  moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

init();
animate();
function init() {
  // Scene, Camera, Renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.6; // Eye level height

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // PointerLockControls to look around
  controls = new PointerLockControls(camera, document.body);

  document.addEventListener("click", () => {
    controls.lock();
  });

  controls.addEventListener("lock", () => {
    console.log("Pointer is locked");
  });

  controls.addEventListener("unlock", () => {
    console.log("Pointer is unlocked");
  });

  // Floor for context
  const floorGeometry = new THREE.PlaneGeometry(100, 100);
  const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x007700,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Event Listeners for Movement
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  window.addEventListener("resize", onWindowResize);
}
function onKeyDown(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = true;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = true;
      break;
    case "ArrowDown":
    case "KeyS":
      moveBackward = true;
      break;
    case "ArrowRight":
    case "KeyD":
      moveRight = true;
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      moveForward = false;
      break;
    case "ArrowLeft":
    case "KeyA":
      moveLeft = false;
      break;
    case "ArrowDown":
    case "KeyS":
      moveBackward = false;
      break;
    case "ArrowRight":
    case "KeyD":
      moveRight = false;
      break;
  }
}
//setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// var light = new THREE.DirectionalLight(0xffffff);
// light.position.set(1, 1, 1).normalize();
// scene.add(light);

// //renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animate);
// document.body.appendChild(renderer.domElement);

// //camera
// camera.position.y = 1.8;
// camera.position.z = 0;
// camera.position.x = 0;

//controls

//movement
// document.onkeydown = function (e) {
//   switch (e.key) {
//     case "ArrowUp":
//       camera.position.z -= 1;
//       break;
//     case "w":
//       camera.position.z -= 1;
//       break;
//     case "ArrowDown":
//       camera.position.z += 1;
//       break;
//     case "s":
//       camera.position.z += 1;
//       break;
//     case "ArrowLeft":
//       camera.position.x -= 1;
//       break;
//     case "a":
//       camera.position.x -= 1;
//       break;
//     case "ArrowRight":
//       camera.position.x += 1;
//       break;
//     case "d":
//       camera.position.x += 1;
//       break;
//   }
// };

//geometry
export const cube = new THREE.BoxGeometry(1, 1, 1);
export const sphere = new THREE.SphereGeometry(1, 16, 16);
export const plane = new THREE.PlaneGeometry(40, 40);
export const muurtjes = new THREE.BoxGeometry(8, 2, 1);
export const eieren = new THREE.BoxGeometry(0.1, 0.1, 0.1);

//materials
export const red = new THREE.MeshBasicMaterial({ color: 0xff0000 });
export const green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
export const blue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
export const yellow = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});

//objects
const cube1 = new THREE.Mesh(cube, green);
cube1.position.z = -3;
cube1.position.x = 1;
cube1.position.y = 0.5;
scene.add(cube1);

const cube2 = new THREE.Mesh(cube, green);
cube2.position.z = -2;
cube2.position.x = -1;
cube2.position.y = 0.5;
scene.add(cube2);

const cube3 = new THREE.Mesh(cube, green);
cube3.position.z = -2.5;
cube3.position.x = 0;
cube3.position.y = 0.5;
scene.add(cube3);

const cube4 = new THREE.Mesh(cube, green);
cube4.position.z = 12;
cube4.position.x = -4;
cube4.position.y = 0.5;
scene.add(cube4);

const ei = new THREE.Mesh(eieren, blue);
ei.position.z = 1;
ei.position.x = 0;
ei.position.y = 0.5;
scene.add(ei);

const muurtje = new THREE.Mesh(muurtjes, red);
muurtje.position.z = -5;
muurtje.position.x = -2;
muurtje.position.y = 1;
scene.add(muurtje);

const floor = new THREE.Mesh(plane, yellow);
floor.rotation.x = Math.PI / 2;
floor.position.y = 0;
floor.castShadow = true;
scene.add(floor);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (controls.isLocked === true) {
    // Movement logic
    const delta = 0.1; // Movement speed

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // Ensure consistent movement in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);
  }
}
