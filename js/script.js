let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, near, far );

let renderer = new THREE.WebGLRenderer();
let cubes = new THREE.Object3D();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let flag = false;
let intersects;


for (let i = 0; i < 10; i++) {
  let geometry = new THREE.BoxGeometry(1, 2, 0.1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = -14 + i * 2;
  cubes.add(cube);
}

scene.add(cubes);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
camera.position.x = 0;
mouse.x = -window.innerWidth / 2;
mouse.y = window.innerHeight / 2;

function animate() {
  requestAnimationFrame(animate);
  window.requestAnimationFrame(render);
  renderer.render(scene, camera);
};

animate();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
  let object;
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(cubes.children);
  if (intersects[0]) {
    flag = true;
  }
  if (flag && intersects[0].object.rotation.y <= Math.PI) {
    intersects[0].object.rotation.y += 0.01;
  } else {
    return;
  }



  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);



