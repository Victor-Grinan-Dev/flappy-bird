import Phaser from "phaser";

const config = {
  type: Phaser.AUTO, //WebGL (Web Gaphic Library) Js Api for rendering 2d and 3d graphics.
  width: 800,
  height: 600,
  physics: {
    default: "arcade", //Arcade physics plugin manages physics simulation
    arcade: {
      // gravity: { y: 200 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update,
  },
};
const flapVel = 250;
new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}
let bird = null;

function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0); //
  bird = this.physics.add
    .sprite(config.width * 0.05, config.height / 2, "bird")
    .setOrigin(0, 0);

  bird.body.gravity.y = 400;

  this.input.keyboard.on("keydown-SPACE", function () {
    flap();
  });
}

function update(time, delta) {
  if (bird.body.y <= 0 || bird.body.y >= config.height) {
  }
}

function flap() {
  bird.body.velocity.y = flapVel * -1;
}
