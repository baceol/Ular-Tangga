let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100);
let renderer = new THREE.WebGLRenderer();
let time = 0;
let clicked = false;

cam.position.z = 25;

let vertices = new Float32Array([
    -10.0, -10.0, 0.0,
    10.0, -10.0, 0.0,
    10.0, 10.0, 0.0,

    10.0, 10.0, 0.0,
    -10.0, 10.0, 0.0,
    -10.0, -10.0, 0.0
]);
let uv = new Float32Array([
    0.0, 0.0, 
    1.0, 0.0, 
    1.0, 1.0, 

    1.0, 1.0, 
    0.0, 1.0, 
    0.0, 0.0
]);
const papan = new THREE.TextureLoader().load('./texture/sal.png');
const sq1 =  new THREE.BufferGeometry();
sq1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
sq1.setAttribute('uv',new THREE.BufferAttribute(uv,2));
const mat1 = new THREE.MeshBasicMaterial({map: papan});
let mesh1 = new THREE.Mesh(sq1, mat1);
mesh1.position.set(0,0,0);
scene.add(mesh1);

const alef = new THREE.TextureLoader().load('texture/one.jpeg');
const bet = new THREE.TextureLoader().load('texture/two.jpeg');
const gimel = new THREE.TextureLoader().load('texture/three.jpeg');
const dalet = new THREE.TextureLoader().load('texture/four.jpeg');
const he = new THREE.TextureLoader().load('texture/five.jpeg');
const vav = new THREE.TextureLoader().load('texture/six.jpeg');
const die_material = [[
    new THREE.MeshBasicMaterial({map: dalet}), //right
    new THREE.MeshBasicMaterial({map: gimel}), //left
    new THREE.MeshBasicMaterial({map: he}), //top
    new THREE.MeshBasicMaterial({map: bet}), //bottom
    new THREE.MeshBasicMaterial({map: alef}), //front
    new THREE.MeshBasicMaterial({map: vav}) //back
],
[
    new THREE.MeshBasicMaterial({map: dalet}), //right
    new THREE.MeshBasicMaterial({map: gimel}), //left
    new THREE.MeshBasicMaterial({map: alef}), //top
    new THREE.MeshBasicMaterial({map: vav}), //bottom
    new THREE.MeshBasicMaterial({map: bet}), //front
    new THREE.MeshBasicMaterial({map: he}) //back
],
[
    new THREE.MeshBasicMaterial({map: bet}), //right
    new THREE.MeshBasicMaterial({map: he}), //left
    new THREE.MeshBasicMaterial({map: alef}), //top
    new THREE.MeshBasicMaterial({map: vav}), //bottom
    new THREE.MeshBasicMaterial({map: gimel}), //front
    new THREE.MeshBasicMaterial({map: dalet}) //back
],
[
    new THREE.MeshBasicMaterial({map: he}), //right
    new THREE.MeshBasicMaterial({map: bet}), //left
    new THREE.MeshBasicMaterial({map: alef}), //top
    new THREE.MeshBasicMaterial({map: vav}), //bottom
    new THREE.MeshBasicMaterial({map: dalet}), //front
    new THREE.MeshBasicMaterial({map: gimel}) //back
],
[
    new THREE.MeshBasicMaterial({map: gimel}), //right
    new THREE.MeshBasicMaterial({map: dalet}), //left
    new THREE.MeshBasicMaterial({map: alef}), //top
    new THREE.MeshBasicMaterial({map: vav}), //bottom
    new THREE.MeshBasicMaterial({map: he}), //front
    new THREE.MeshBasicMaterial({map: bet}) //back
],
[
    new THREE.MeshBasicMaterial({map: gimel}), //right
    new THREE.MeshBasicMaterial({map: dalet}), //left
    new THREE.MeshBasicMaterial({map: he}), //top
    new THREE.MeshBasicMaterial({map: bet}), //bottom
    new THREE.MeshBasicMaterial({map: vav}), //front
    new THREE.MeshBasicMaterial({map: alef}) //back
]];

const die_geometry = new THREE.BoxGeometry(1, 1, 1);
let die_mesh = new THREE.Mesh(die_geometry, die_material[0]);
die_mesh.position.set(0, 1, 0);
scene.add(die_mesh);

let light1 = new THREE.SpotLight(0xffffff, 1);
light1.position.set(0, 3, 2);
scene.add(light1);

let light2 = new THREE.SpotLight(0xffffff, 1);
light2.position.set(0, -3, 2);
scene.add(light2);

let controls = new THREE.OrbitControls(cam, renderer.domElement);

window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});

document.querySelector('#button').addEventListener('click', function () {
    const number = Math.floor(Math.random() * 5) + 1;
    clicked = true;
    die_mesh.traverse(function (child) {
       if (child instanceof THREE.Mesh) {
           switch (number) {
               case 1 :
                   child.material = die_material[0];
                   break;
               case 2 :
                   child.material = die_material[1];
                   break;
               case 3 :
                   child.material = die_material[2];
                   break;
               case 4 :
                   child.material = die_material[3];
                   break;
               case 5 :
                   child.material = die_material[4];
                   break;
               case 6 :
                   child.material = die_material[5];
                   break;
           }
       }
       die_mesh.needsUpdate = true;
    });
});

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, cam);
    if (clicked === true) {
        time += 0.5;
        if (time < 126) {
            die_mesh.rotation.x += 0.25;
            die_mesh.rotation.y += 0.25;
        } else {
            time = 0;
            clicked = false;
            die_mesh.rotation.set(0.0, 0.0, 0.0)
        }
    }
}

animate();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);