let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(45, window.innerWidth/innerHeight, 1, 100);
let renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0x4FC4A6 );
let time = 0;
let clicked = false;
let change = [
    [8, 16, 24, 32, 40, 48, 56], //up
    [9, 25, 41, 57], //left
    [0, 17, 33, 49], //right
    [19, 59], //snake(stay)
    [27, 48, 63], //snake(change)
    [25, 37, 41], //ladder(stay)
    [16, 51] //ladder(change)
];

cam.position.z = 25;
cam.position.y = 15;

const alef = new THREE.TextureLoader().load('texture/one.jpeg');
const bet = new THREE.TextureLoader().load('texture/two.jpeg');
const gimel = new THREE.TextureLoader().load('texture/three.jpeg');
const dalet = new THREE.TextureLoader().load('texture/four.jpeg');
const he = new THREE.TextureLoader().load('texture/five.jpeg');
const vav = new THREE.TextureLoader().load('texture/six.jpeg');
const papan = new THREE.TextureLoader().load('texture/papan.png');
const lantai = new THREE.TextureLoader().load('texture/floor.png');

let listener = new THREE.AudioListener();
cam.add(listener);
const bgm = new THREE.Audio(listener);
let loaderbgm = new THREE.AudioLoader().load('audio/bgm.ogg',
(result)=>{
    bgm.setBuffer(result);
    bgm.play();
    bgm.setLoop(true);
    bgm.setVolume(0.2);
});

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
die_mesh.position.set(0, 3, -7);
scene.add(die_mesh);

let player;
let loader = new THREE.GLTFLoader().load("model/doc.gltf", function(gltf) {
    player = new pawn(gltf.scene);
	scene.add(gltf.scene);
    gltf.scene.position.set(-5.75, 0.1, 4.1875);
    gltf.scene.scale.set(0.03,0.03,0.03);
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//Syringes
//16 31
let loadersyringe_1 = new THREE.GLTFLoader().load("model/syringe.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-2.8, -2.6, 1.5);
    gltf.scene.scale.set(0.5, 2, 1);
    gltf.scene.rotation.set(0, -1.9, 0);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x86FF62});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//25 42
let loadersyringe_2 = new THREE.GLTFLoader().load("model/syringe.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(4, -2.6, -1.6);
    gltf.scene.scale.set(0.5, 2, 1);
    gltf.scene.rotation.set(0, -1.1, 0);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x86FF62});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//37 52
let loadersyringe_3 = new THREE.GLTFLoader().load("model/syringe.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.2, -2.6, -2.8);
    gltf.scene.scale.set(0.5, 2, 1);
    gltf.scene.rotation.set(0, -1.1, 0);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x86FF62});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//41 58
let loadersyringe_4 = new THREE.GLTFLoader().load("model/syringe.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(4, -2.6, -4.1);
    gltf.scene.scale.set(0.5, 2, 1);
    gltf.scene.rotation.set(0, -1.1, 0);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x86FF62});
    });

	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//51 61
let loadersyringe_5 = new THREE.GLTFLoader().load("model/syringe.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.4, -2.6, -3.6);
    gltf.scene.scale.set(0.3, 2, 1);
    gltf.scene.rotation.set(0, -2.1, 0);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x86FF62});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//Viruses
//19 4
let loadervirus_1 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.6, 0.1, 2.3);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xC931F9});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_2 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.4, 0.1, 2.7);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x111166});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_3 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.2, 0.1, 3.1);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_4 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1, 0.1, 3.5);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xE20D0D});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_5 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.8, 0.1, 3.9);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x10D61C});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//27 23
let loadervirus_6 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(2.1, 0.1, 1);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xC931F9});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_7 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(2.4, 0.1, 1.3);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x093373});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_8 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(2.7, 0.1, 1.6);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x10D61C});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//48 34
let loadervirus_9 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-4, 0.1, -1.5);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xC931F9});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_10 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-3.7, 0.1, -1.2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x116661});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_11 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-3.3, 0.1, -1.0);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x10D61C});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//59 44
let loadervirus_12 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(1.5, 0.1, -4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xC931F9});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_13 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(1.3, 0.1, -3.6);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_14 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(1.1, 0.1, -3.2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xE20D0D});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_15 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.9, 0.1, -2.8);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x111166});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_16 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.7, 0.1, -2.4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x10D61C});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

//63 21
let loadervirus_17 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-2.7, 0.1, -4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xC931F9});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_18 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-2.45, 0.1, -3.6);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x116661});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_19 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-2.20, 0.1, -3.2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xE20D0D});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_20 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.95, 0.1, -2.8);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_21 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.70, 0.1, -2.4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x111166});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_22 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.45, 0.1, -2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_23 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-1.20, 0.1, -1.6);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x111166});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_24 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.95, 0.1, -1.2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x116661});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_25 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.70, 0.1, -0.8);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xE20D0D});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_26 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.45, 0.1, -0.4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_27 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(-0.20, 0.1, 0);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x111166});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_28 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.05, 0.1, 0.4);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xE20D0D});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_29 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.30, 0.1, 0.8);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0xFDBB23});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_30 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.55, 0.1, 1.2);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x116661});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});
let loadervirus_31 = new THREE.GLTFLoader().load("model/virus.gltf", function(gltf) {
	scene.add(gltf.scene);
    gltf.scene.position.set(0.80, 0.1, 1.6);
    gltf.scene.scale.set(0.2,0.2,0.2);
    gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({color : 0x10D61C});
    });
	
	gltf.animations;
	gltf.scene;
	gltf.scenes;
	gltf.cameras;
	gltf.asset;
});

let loadertable = new THREE.GLTFLoader().load("model/table.gltf", function(gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, -20.5, -1);
    gltf.scene.scale.set(30,30,30);
    
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
});

const sq1 =  new THREE.PlaneGeometry(10, 10, 30, 30);
const mat1 = new THREE.MeshBasicMaterial({map: papan});
let mesh1 = new THREE.Mesh(sq1, mat1);
mesh1.rotateX(-Math.PI / 2);
scene.add(mesh1);

const sq2 =  new THREE.PlaneGeometry(100, 100, 300, 300);
const mat2 = new THREE.MeshBasicMaterial({map: lantai});
let mesh2 = new THREE.Mesh(sq2, mat2);
mesh2.rotateX(-Math.PI / 2);
mesh2.position.set(0, -20.5, 0);
scene.add(mesh2);

let light1 = new THREE.SpotLight(0xffffff, 1);
light1.position.set(0, 3, 2);
scene.add(light1);

let light2 = new THREE.SpotLight(0xffffff, 1);
light2.position.set(0, -3, 2);
scene.add(light2);

let light3 = new THREE.SpotLight(0xffffff, 1);
light3.position.set(-6, 3, 6);
scene.add(light3);

let light4 = new THREE.SpotLight(0xffffff, 1);
light4.position.set(-5, 3, 3);
scene.add(light4);

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
    // let loaderbgm1 = new THREE.AudioLoader().load('audio/bgm.ogg',
    // (result)=>{
    //     bgm.setBuffer(result);
    //     bgm.play();
    //     bgm.setVolume(0.2);
    // });
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

function snakeLadder(player) {
    if (change[3].includes(player.position)) {
        if (player.position === 19) {
            player.position = 4;
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x + 1.25, player.model.position.y, player.model.position.z + 1.80);
            });
        } else {
            player.model.traverse(function (gltf) {
                player.position = 44;
                gltf.position.set(player.model.position.x - 1.25, player.model.position.y, player.model.position.z + 2);
            });
        }
    } else if (change[4].includes(player.position)) {
        player.direction = "right"
        if (player.position === 27) {
            player.position = 23;
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x + 1.25, player.model.position.y, player.model.position.z + 1.80);
            });
        } else if (player.position === 48){
            player.position = 34
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x + 1.25, player.model.position.y, player.model.position.z + 1.80);
            });
        } else {
            player.model.traverse(function (gltf) {
                player.position = 21
                gltf.position.set(player.model.position.x + 3.0, player.model.position.y, player.model.position.z + 9);
            });
        }
    } else if (change[5].includes(player.position)) {
        if (player.position === 25) {
            player.position = 42
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x - 1.25, player.model.position.y, player.model.position.z - 2.50);
            });
        } else if (player.position === 37){
            player.position = 52
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x - 1.25, player.model.position.y, player.model.position.z - 2.50);
            });
        } else {
            player.position = 58
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x - 1.25, player.model.position.y, player.model.position.z - 2.50);
            });
        }
    } else if (change[6].includes(player.position)) {
        player.direction = "left";
        if (player.position === 16) {
            player.model.traverse(function (gltf) {
                player.position = 31
                gltf.position.set(player.model.position.x + 1.25, player.model.position.y, player.model.position.z - 2.50);
            });
        } else {
            player.position = 61
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x + 1.25, player.model.position.y, player.model.position.z - 2.50);
            });
        }
    }
}

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
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x, player.model.position.y, player.model.position.z - 1.2);
            });
            break;
        case "left" :
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x - 1.25 , player.model.position.y, player.model.position.z);
            });
            break;
        case "right" :
            player.model.traverse(function (gltf) {
                gltf.position.set(player.model.position.x + 1.25 , player.model.position.y, player.model.position.z);
            });
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
            snakeLadder(player);
            player.move = 0;
        }
    }
}

animate();

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);