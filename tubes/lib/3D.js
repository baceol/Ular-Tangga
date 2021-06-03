let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100);
let renderer = new THREE.WebGLRenderer();
let time = 0;
let clicked = false;

cam.position.z = 5;

const dice_material1 = [
    new THREE.MeshPhongMaterial({color: 0xff0000}),
    new THREE.MeshPhongMaterial({color: 0xf0f000}),
    new THREE.MeshPhongMaterial({color: 0x00ff00}),
    new THREE.MeshPhongMaterial({color: 0x00f0f0}),
    new THREE.MeshPhongMaterial({color: 0x0000ff}),
    new THREE.MeshPhongMaterial({color: 0xf000f0})
];

const dice_material2 = [
    new THREE.MeshPhongMaterial({color: 0xaa0000}),
    new THREE.MeshPhongMaterial({color: 0x00bb00}),
    new THREE.MeshPhongMaterial({color: 0x0000cc}),
    new THREE.MeshPhongMaterial({color: 0xdd0000}),
    new THREE.MeshPhongMaterial({color: 0x00ee00}),
    new THREE.MeshPhongMaterial({color: 0x0000ff})
];

const dice_geometry = new THREE.BoxGeometry(1, 1, 1);
let dice_mesh = new THREE.Mesh(dice_geometry, dice_material1);
dice_mesh.position.set(0, 1, 0);
scene.add(dice_mesh);

let light1 = new THREE.SpotLight(0xffffff, 1);
light1.position.set(0, 3, 2);
scene.add(light1);

let light2 = new THREE.SpotLight(0xffffff, 1);
light2.position.set(0, -3, 2);
scene.add(light2);

window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});

document.querySelector('#button').addEventListener('click', function () {
    clicked = true;
    dice_mesh.traverse(function (child) {
       if (child instanceof THREE.Mesh) {
           child.material = dice_material2;
       }
       dice_mesh.needsUpdate = true;
    });
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, cam);
    if (clicked === true) {
        time += 0.5;
        if (time < 126) {
            dice_mesh.rotation.x += 0.1;
            dice_mesh.rotation.y += 0.1;
        } else {
            time = 0;
            clicked = false;
        }
    }
}

animate();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);