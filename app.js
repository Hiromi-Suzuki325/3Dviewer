import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/* ★★★ ここにライトを追加 ★★★ */

// 1) 環境光（全体の底上げ）
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// 2) 太陽光的な平行光
const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.position.set(10, 20, 10);   // x, y, z
sun.castShadow = true;          // 影を落としたい場合
scene.add(sun);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.DirectionalLight(0xffffff, 3));

new GLTFLoader().load('model.glb', gltf => scene.add(gltf.scene));

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
