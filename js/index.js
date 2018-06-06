var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(160, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(2, 4, 0.1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
var cube = new THREE.Mesh(geometry, material);
let cubes  = new THREE.Object3D();

for (let i = 0; i < 10; i++) {
  let geometryx = new THREE.BoxGeometry(2, 4, 0.1);
  let materialx = new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true });
  let cubex = new THREE.Mesh(geometryx, materialx);
  cubex.position.x = i * 3;
  cubes.add(cubex);
}

let flag = false;
cube.position.x = -3;
scene.add(cubes);


camera.position.z = 5;
camera.position.x = 0;
cube.rotation.y = 0;

axes = buildAxes();
scene.add(axes);

var animate = function () {
  requestAnimationFrame(animate);
  window.requestAnimationFrame(render);
  renderer.render(scene, camera);
};

animate();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

mouse.x = -window.innerWidth / 2;
mouse.y = window.innerHeight / 2;

function onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function render() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(cubes.children);
  // console.log(intersects);
  // for (let i = 0; i <= 10; i++) {
  //   if (intersects[i]) {
  //     flag = true;
  //   }

  //   if (flag && cube.rotation.y <= Math.PI) {
  //     cube.rotation.y += 0.02;
  //   } else {
  //     return;
  //   }



  // if (intersects[0]) {
  //   flag = true;
  // }

  // if (flag && cube.rotation.y <= Math.PI) {
  //   cube.rotation.y += 0.07;
  // } else {
  //   return;
  // }
  // scene.children.forEach((mesh, index) => {
  //   if (intersects[index]) {
  //     console.log(mesh.uuid)
  //   }
  // })
  for (var i = 0; i < scene.children.length; i++) {
    // console.log(intersects[i]);
  }
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);

function buildAxes() {

  var axes = new THREE.Object3D();

  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0), 0xFF0000, false)); // +X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-100, 0, 0), 0x800000, true)); // -X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0), 0x00FF00, false)); // +Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -100, 0), 0x008000, true)); // -Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100), 0x0000FF, false)); // +Z
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -100), 0x000080, true)); // -Z

  return axes;

}

function buildAxis(src, dst, colorHex, dashed) {
  var geom = new THREE.Geometry(),
    mat;

  if (dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 5, gapSize: 5 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
  }

  geom.vertices.push(src.clone());
  geom.vertices.push(dst.clone());

  var axis = new THREE.Line(geom, mat);

  return axis;

}
