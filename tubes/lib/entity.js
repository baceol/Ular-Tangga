class pawn {
    constructor(geometry, material) {
        this.position = 0;
        this.direction = "";
        this.move = 0;
        this.mesh = new THREE.Mesh(geometry, material);
    }
}