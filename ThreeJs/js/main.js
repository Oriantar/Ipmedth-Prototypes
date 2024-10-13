import * as THREE from "three";

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
camera.position.z = 0;
camera.position.x = 0;

//movement
document.onkeydown = function (e) {
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

function animate() {
  renderer.render(scene, camera);
}
