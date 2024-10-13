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
  camera.position.y = 1.8; // Eye level height

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // PointerLockControls to look around
  controls = new PointerLockControls(camera, document.body);

  document.addEventListener("click", () => {
    controls.lock();
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
// Initialize Raycaster and Vector for mouse position
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// On mouse move or click, update the mouse position and raycast
function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates (NDC) (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  raycaster.far = 10; // Set the max distance for raycasting
  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true); // true to check children recursively

  // Handle the intersected objects
  if (intersects.length > 0) {
    if (intersects[0].object.uuid === "c48f2eb2-d933-4fe1-94ff-41998226fe39")
      return;
    if (
      intersects[0].object.name === "ei" &&
      intersects[0].object.name !== "eidone"
    ) {
      setInterval(() => {
        scene.remove(intersects[0].object);
        document.getElementById("egg").style.display = "block";
      }, 1000);
    }
    if (
      intersects[0].object.name === "cube4" &&
      document.getElementById("egg").style.display === "block"
    ) {
      let z = intersects[0].object.position.z;
      let x = intersects[0].object.position.x;
      let y = intersects[0].object.position.y;

      ei.position.z = z;
      ei.position.x = x;
      ei.position.y = y + 1;
      ei.name = "eidone";
      console.log(ei);
      scene.add(ei);
      document.getElementById("egg").style.display = "none";
    }
  }
}

// Add event listener for mouse move or click
window.addEventListener("mousemove", onMouseMove, false);
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

//geometry
export const cube = new THREE.BoxGeometry(1, 1, 1);
export const sphere = new THREE.SphereGeometry(1, 16, 16);
export const plane = new THREE.PlaneGeometry(40, 40);
export const muurtjes = new THREE.BoxGeometry(8, 2, 1);
export const eieren = new THREE.SphereGeometry(0.5, 16, 16);
export const eilepel = new THREE.SphereGeometry(0.1, 16, 16);

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
cube1.name = "cube";
scene.add(cube1);

const cube2 = new THREE.Mesh(cube, green);
cube2.position.z = -2;
cube2.position.x = -1;
cube2.position.y = 0.5;
cube2.name = "cube";
scene.add(cube2);

const cube3 = new THREE.Mesh(cube, green);
cube3.position.z = -2.5;
cube3.position.x = 0;
cube3.position.y = 0.5;
cube3.name = "cube";
scene.add(cube3);

const cube4 = new THREE.Mesh(cube, green);
cube4.position.z = 12;
cube4.position.x = -4;
cube4.position.y = 0.5;
cube4.name = "cube4";
scene.add(cube4);

const ei = new THREE.Mesh(eieren, yellow);
ei.position.z = 1;
ei.position.x = 0;
ei.position.y = 1;
ei.name = "ei";
scene.add(ei);

const muurtje = new THREE.Mesh(muurtjes, red);
muurtje.position.z = -5;
muurtje.position.x = -2;
muurtje.position.y = 1;
muurtje.name = "muurtje";
scene.add(muurtje);

const floor = new THREE.Mesh(plane, green);
floor.rotation.x = Math.PI / 2;
floor.position.y = 0;
floor.castShadow = true;
floor.name = "floor";
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

    controls.moveRight(direction.x * delta);
    controls.moveForward(direction.z * delta);
  }
  renderer.render(scene, camera);
}
