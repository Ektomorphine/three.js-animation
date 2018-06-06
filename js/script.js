let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 0.1, 1000);
// var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, near, far );

let renderer = new THREE.WebGLRenderer({antialiasing: true});
let cubes = new THREE.Object3D();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let flag = false;
let intersects;
let light = new THREE.PointLight( 0xff0000, 1, 100 );


for (let i = 0; i <= 10; i++) {
  let geometry = new THREE.BoxGeometry(0.6, 3, 0.02);
  let material = new THREE.MeshLambertMaterial();
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = -6 + i * 1.1;
  cubes.add(cube);
}

scene.add(cubes);
light.position.set( 0, 0, 5 );
scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 3;
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
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(cubes.children);
  if (intersects[0]) {
    flag = true;
  }

  if (flag) {
    cubes.children.forEach(cube => {
      if (cube.rotation.y <= Math.PI) {
        cube.rotation.y += 0.05;
      }
      if (cube.rotation.y >= Math.PI) {
        flag = false;
      }
    })

  }
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);



