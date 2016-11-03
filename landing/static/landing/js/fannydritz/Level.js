EnemyHomeA = function(index, game, x, y) {
        this.homelessA = game.add.sprite(x, y, 'homelessA');
        this.homelessA.anchor.setTo(0.5, 0.5);
        this.homelessA.name = index.toString();
        game.physics.enable(this.homelessA, Phaser.Physics.ARCADE);
        this.homelessA.body.immovable = true;
        this.homelessA.body.collideWorldBounds = true;
        this.homelessA.body.allowGravity = false;
        // this.homelessATween = game.add.tween(this.homelessA).to({
        //     y: this.homelessA.y + 100
        // }, 1000, 'Linear', true, 0, -1, true);

        // to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        this.homelessA.animations.add('stand', [0, 1, 2], 1, true);
        this.homelessA.animations.play('stand', 10, true);
    }

EnemyHomeB = function(index, game, x, y) {
            this.homelessB = game.add.sprite(x, y, 'homelessB');
            this.homelessB.anchor.setTo(0.5, 0.5);
            this.homelessB.name = index.toString();
            game.physics.enable(this.homelessB, Phaser.Physics.ARCADE);
            this.homelessB.body.immovable = true;
            this.homelessB.body.collideWorldBounds = true;
            this.homelessB.body.allowGravity = false;
            // this.homelessATween = game.add.tween(this.homelessA).to({
            //     y: this.homelessA.y + 100
            // }, 1000, 'Linear', true, 0, -1, true);

            // to(properties, duration, ease, autoStart, delay, repeat, yoyo)
            this.homelessB.animations.add('stand', [0, 1], 1, true);
            this.homelessB.animations.play('stand', 10, true);
        }


var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var enemy7;
var enemy8;
var enemy9;


Game.Level = function(game) {};

var background;
var controls = {};
var count =0;
var fritz;
var facing;
var guineaPigs;
var jumpTimer = 0;
var layer;
var map;
var player;
var playerSpeed = 300;
var shootTime = 0;
var text;
// var image = game.add.image(0, 0, "lobby_bg_img");image.width = game.width;image.height = game.height;

Game.Level.prototype = {





  create: function(game) {

    this.camera.flash('#000000');

    backgroundMusic = game.add.audio('bgmusic');
    backgroundMusic.loop = true;
    backgroundMusic.play();

    this.shoot = game.add.audio('shoot');
    this.jump = game.add.audio('jump');
    this.pain = game.add.audio('die');

    background = this.add.image(0, 0, "Level_Bg");
    background.width = game.width;
    background.height = game.height;
    background.fixedToCamera = true;
    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map', 32, 32);
      map.addTilesetImage('tileset');
      layer = map.createLayer(0);
      layer.resizeWorld();
      map.setCollisionBetween(18, 19);
      map.setCollision(33);
      map.setCollisionBetween(296, 299);
      map.setTileIndexCallback(361, this.resetPlayer, this);
      map.setTileIndexCallback(368, this.resetPlayer, this);
      map.setTileIndexCallback(245, this.nextLevel, this);



    player = this.add.sprite(100, 400, 'player');
            player.anchor.setTo(0.5, 0.5);
            player.animations.add('idle', [0, 1, 2], 3, true);
            player.animations.add('jump', [5], 1, true);
            player.animations.add('run', [4, 5, 6, 7, 8], 7, true);
            this.physics.arcade.enable(player);
            this.camera.follow(player);
            player.body.collideWorldBounds = true;

    controls = {
        right: this.input.keyboard.addKey(Phaser.Keyboard.D),
        left: this.input.keyboard.addKey(Phaser.Keyboard.A),
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }

        guineaPigs = game.add.group();
        guineaPigs.enableBody = true;

        guineaPigs.physicsBodyType = Phaser.Physics.ARCADE;
        guineaPigs.createMultiple(5, 'bird');
        guineaPigs.setAll('anchor.x', 0.5);
        guineaPigs.setAll('anchor.y', 0.5);
        guineaPigs.setAll('scale.x', 0.75);
        guineaPigs.setAll('scale.y', 0.75);
        guineaPigs.setAll('outOfBoundsKill', true);
        guineaPigs.setAll('checkWorldBounds', true);
        guineaPigs.callAll('animations.add', 'animations', 'bird', [0, 1, 2, 3], 10, true);
        guineaPigs.callAll('play', null, 'bird');

        fritz = this.add.sprite(20, 325, 'selfie');

        fritz.fixedToCamera = true;

        text = game.add.text(game.camera.x + 100, game.camera.y + 350, count, {
        font: '25px Arial',
        fill: '#ffffff',
        align: 'center'




});
text.fixedToCamera = true;

enemy1 = new EnemyHomeA(0, game, player.x + 250, player.y + 178);
enemy2 = new EnemyHomeB(0, game, player.x + 500, player.y + 178);
enemy3 = new EnemyHomeA(0, game, player.x + 550, player.y + 178);
enemy4 = new EnemyHomeB(0, game, player.x + 650, player.y + 178);
enemy5 = new EnemyHomeA(0, game, player.x + 1097, player.y + 150);
enemy6 = new EnemyHomeB(0, game, player.x + 1640, player.y + 240);
enemy7 = new EnemyHomeA(0, game, player.x + 2250, player.y + 150);
enemy8 = new EnemyHomeB(0, game, player.x + 2997, player.y + 241);
enemy9 = new EnemyHomeB(0, game, player.x + 3200, player.y + 241);


},

  update: function() {

    this.physics.arcade.collide(player, layer);

    this.physics.arcade.collide(player, enemy1.homelessA, this.resetPlayer);
    this.physics.arcade.collide(player, enemy2.homelessB, this.resetPlayer);
    this.physics.arcade.collide(player, enemy3.homelessA, this.resetPlayer);
    this.physics.arcade.collide(player, enemy4.homelessB, this.resetPlayer);
    this.physics.arcade.collide(player, enemy5.homelessA, this.resetPlayer);
    this.physics.arcade.collide(player, enemy6.homelessB, this.resetPlayer);
    this.physics.arcade.collide(player, enemy7.homelessA, this.resetPlayer);
    this.physics.arcade.collide(player, enemy8.homelessB, this.resetPlayer);
    this.physics.arcade.collide(player, enemy9.homelessB, this.resetPlayer);

    player.body.velocity.x = 0;


        if (controls.right.isDown) {
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x += playerSpeed;
            facing = 'right';


        }

        if (controls.left.isDown) {
            player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x -= playerSpeed;
            facing = 'left';


        }

        if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
            this.jump.play();
        }

        if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
            player.animations.play('idle');
        }
        if (controls.shoot.isDown) {

          this.shootGuineaPig();
        }
        if (checkOverlap(guineaPigs, enemy1.homelessA)) {
            enemy1.homelessA.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy2.homelessB)) {
            enemy2.homelessB.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy3.homelessA)) {
            enemy3.homelessA.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy4.homelessB)) {
            enemy4.homelessB.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy5.homelessA)) {
            enemy5.homelessA.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy6.homelessB)) {
            enemy6.homelessB.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy7.homelessA)) {
            enemy7.homelessA.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy8.homelessB)) {
            enemy8.homelessB.kill();
            text.setText(count += 100);
            this.pain.play();
        }
        if (checkOverlap(guineaPigs, enemy9.homelessB)) {
            enemy9.homelessB.kill();
            text.setText(count += 100);
            this.pain.play();
        }

  },
  resetPlayer: function() {
    player.reset(100, 400);
    // this.state.start('Level', true, false);
  },

  nextLevel: function() {
      backgroundMusic.mute = true;
      this.state.start('Level', true, false);
  },

  shootGuineaPig: function() {
    if (this.time.now > shootTime) {
        shootTime = this.time.now + 800;
        guineaPig = guineaPigs.getFirstExists(false);
        if (guineaPig) {
            this.shoot.play();
            guineaPig.reset(player.x, player.y);

            if (facing == 'right') {
                guineaPig.body.velocity.y = -400;

                guineaPig.body.velocity.x = 400;

            } else {
                guineaPig.body.velocity.y = -400;
                guineaPig.body.velocity.x = -400;
            }
        }
    }
}

}
function checkOverlap(spriteA, spriteB) {
  if (spriteA.alive == false || spriteB.alive == false){
    return false
  }
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
