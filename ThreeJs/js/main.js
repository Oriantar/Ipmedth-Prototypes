import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();
scene.add(light);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//camera
camera.position.y = 1.8;
camera.position.z = 5;
document.onkeydown = function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      camera.position.z -= 0.1;
      break;
    case "w":
      camera.position.z -= 0.1;
      break;
    case "ArrowDown":
      camera.position.z += 0.1;
      break;
    case "s":
      camera.position.z += 0.1;
      break;
    case "ArrowLeft":
      camera.position.x -= 0.1;
      break;
    case "a":
      camera.position.x -= 0.1;
      break;
    case "ArrowRight":
      camera.position.x += 0.1;
      break;
    case "d":
      camera.position.x += 0.1;
      break;
  }
};

//geometry
export const cube = new THREE.BoxGeometry(1, 1, 1);
export const sphere = new THREE.SphereGeometry(1, 16, 16);
export const plane = new THREE.PlaneGeometry(50, 50);

//materials
export const red = new THREE.MeshBasicMaterial({ color: 0xff0000 });
export const green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
export const blue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
export const yellow = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});

//objects
const blitz = new THREE.Mesh(cube, green);
scene.add(blitz);

const yosti = new THREE.Mesh(sphere, red);
yosti.position.x = 2;
scene.add(yosti);

const floor = new THREE.Mesh(plane, yellow);
floor.rotation.x = Math.PI / 2;
floor.position.y = -1;
floor.castShadow = true;
scene.add(floor);

function animate() {
  renderer.render(scene, camera);
}
