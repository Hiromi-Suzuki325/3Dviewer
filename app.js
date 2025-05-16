// app.js（3Dビューアのコード）
console.log('THREE version:', THREE.REVISION);  // これが表示されればロード成功

// シーンを作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// カメラを作成（視点）
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

// レンダラーを作成（描画）
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls（マウスでの回転やズームを可能にする）
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ライトを作成（明るさ調整）
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 10, 7.5);
scene.add(light);

// GLTFLoaderで3Dモデルを読み込む
const loader = new THREE.GLTFLoader();
loader.load(
  "model.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// アニメーションループ（毎秒繰り返して描画を更新）
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ウィンドウサイズが変わったときに自動調整
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
