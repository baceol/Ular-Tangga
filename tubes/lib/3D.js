let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100);
let renderer = new THREE.WebGLRenderer();
let time = 0;
let clicked = false;
let change = [
    [6, 12, 18, 24, 30], //up
    [7, 19, 31], //left
    [0, 13, 25] //right
];

cam.position.z = 25;

const alef = new THREE.TextureLoader().load('texture/one.jpeg');
const bet = new THREE.TextureLoader().load('texture/two.jpeg');
const gimel = new THREE.TextureLoader().load('texture/three.jpeg');
const dalet = new THREE.TextureLoader().load('texture/four.jpeg');
const he = new THREE.TextureLoader().load('texture/five.jpeg');
const vav = new THREE.TextureLoader().load('texture/six.jpeg');
const papan = new THREE.TextureLoader().load('texture/sal.png');
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
die_mesh.position.set(0, 3, 0);
scene.add(die_mesh);

let model;
let loader = new THREE.GLTFLoader().load("", function(gltf) {
	model = gltf.scene;
	scene.add(model);
	model.position.set(-5.75, 1.0, 4.1875);
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let player = new pawn(model);

const sq1 =  new THREE.PlaneGeometry(10, 10, 30, 30);
const mat1 = new THREE.MeshBasicMaterial({map: papan});
let mesh1 = new THREE.Mesh(sq1, mat1);
mesh1.rotateX(-Math.PI / 2);
scene.add(mesh1);

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
    player.move = number;
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

function move(player) {
    if (change[0].includes(player.position)) {
        player.direction = "up";
    } else if (change[1].includes(player.position)) {
        player.direction = "left";
    } else if (change[2].includes(player.position)) {
        player.direction = "right";
    }

    player.position += 1;

    switch (player.direction) {
        case "up" :
            player.model.position.set(player.model.position.x, player.model.position.y, player.model.position.z - 1.625);
            break;
        case "left" :
            player.model.position.set(player.model.position.x - 1.625 , player.model.position.y, player.model.position.z);
            break;
        case "right" :
            player.model.position.set(player.model.position.x + 1.625 , player.model.position.y, player.model.position.z);
            break;
    }
}

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
            die_mesh.rotation.set(0.0, 0.0, 0.0);
            for (let i = 1; i <= player.move; i++) {
                move(player);
            }
            player.move = 0;
        }
    }
}

animate();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);