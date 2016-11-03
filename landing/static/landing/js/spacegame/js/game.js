var bullets;
var enemyBullets;
var fireRate = 100;
var nextFire = 0;
var firingTimer = 0;
var score = 0;
var scoreText;
var lives = 3;
var livesText;
var enemySpawnSpeed1 = 5550;
var enemySpawnSpeed2 = 1300;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

function preload(){
  game.load.image('bullet', 'js/missle.png');
  game.load.image('ufo', 'js/ufo.png');
  game.load.image('ufo_bullet', 'js/ufo_missle.png');
  game.load.image('ship', 'js/ship.png');
  game.load.image('city', 'js/cityscape.jpg')
}

function create(){
  city = game.add.tileSprite(0 , 0, 4098 , 768, 'city')

  scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  livesText = game.add.text(600, 16, 'Lives: 3', { fontSize: '32px', fill: '#000' });

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = "#5a739b"

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  bullets.createMultiple(150, 'bullet');
  bullets.setAll('checkWorldBounds', true)
  bullets.setAll('outOfBoundsKill', true)

  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;

  enemyBullets.createMultiple(150, 'ufo_bullet');
  enemyBullets.setAll('checkWorldBounds', true)
  enemyBullets.setAll('outOfBoundsKill', true)

  player = game.add.sprite(32, game.world.height / 2, 'ship')
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  enemies = game.add.group();
  enemies.enableBody = true;
  game.physics.arcade.enable(enemies);

  createEnemy();
}

function enemyKill (player, enemies) {
  enemies.kill();
  score += 10;
  scoreText.text = 'Score: ' + score;
}

function playerKill (player, enemies) {
  player.kill();
  lives -= 1;
  livesText.text = 'Lives: ' + lives;
}

function fire() {
  if (game.time.now > nextFire && bullets.countDead() > 0)
  {
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstDead();
    bullet.reset(player.x + 60, player.y);
    bullet.body.velocity.x = 200
  }
}

// function spawnRate(){
//   if (score > 10 && score > 20 && score > 50 && score > 80 && score > 100)
//   {
//     enemySpawnSpeed1 -= 1000;
//   }
// }

function createEnemy() {
  enemy = enemies.create(1000, game.world.randomY, 'ufo')
  enemy.body.velocity.x = -150;
  // game.time.events.add(game.rnd.integerInRange(enemySpawnSpeed1, enemySpawnSpeed2), createEnemy);
  game.time.events.add(enemySpawnSpeed1, createEnemy);
}

function enemyFire() {
  if (game.time.now > nextFire && enemyBullets.countDead() > 0)
  {
    nextFire = game.time.now + fireRate;
    var enemyBullet = enemyBullets.getFirstDead();
    enemyBullet.reset(enemy.body.x, enemy.body.y);
    enemyBullet.body.velocity.x = -300
    game.physics.arcade.moveToObject(enemyBullet, player, 350);
    firingTimer = game.time.now + 400;
  }
}

function bulletKill (bullet, enemies) {
  bullet.kill();
}

function update() {
  city.tilePosition.x -= 2;

  cursors = game.input.keyboard.createCursorKeys();
  shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  game.physics.arcade.overlap(bullets, enemies, bulletKill, enemyKill, this);
  // game.physics.arcade.overlap(bullets, enemies, bulletKill, null, this);
  game.physics.arcade.overlap(player, enemies, playerKill, null, this);
  game.physics.arcade.overlap(player, enemyBullets, playerKill, null, this);

  if (cursors.left.isDown)
  {
    player.body.velocity.x = -150;
  }
  else if (cursors.right.isDown)
  {
    player.body.velocity.x = 200;
  }
  else if (cursors.up.isDown)
  {
    player.body.velocity.y = -150;
  }
  else if (cursors.down.isDown)
  {
    player.body.velocity.y = 150;
  }
  else if (shoot.isDown)
  {
    fire();
  }
  else if (game.time.now > firingTimer && enemy.alive !== false)
  {
    enemyFire();
  }
  else if (player.alive === false && lives > 0)
  {
    player = game.add.sprite(32, game.world.height / 2, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
  }
  else {
    player.body.velocity.x = 50;
  }
}
