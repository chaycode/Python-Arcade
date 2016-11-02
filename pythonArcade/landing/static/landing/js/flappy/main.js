var mainState = {
    preload: function() {
        game.load.image('turd', '/static/landing/assets/flappy/resized_poo.png');
        game.load.image('pipe', '/static/landing/assets/flappy/toilet.png');
        game.load.audio('jump', '/static/landing/assets/flappy/jump.wav');
        game.load.audio('fart', '/static/landing/assets/flappy/fart.wav');
    },

    create: function() {

        game.stage.backgroundColor = '#ffff00';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.turd = game.add.sprite(100, 245, 'turd');

        game.physics.arcade.enable(this.turd);

        this.turd.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#000000"
        });
        this.turd.anchor.setTo(-0.2, 0.5);
        this.jumpSound = game.add.audio('jump');
        this.fartSound = game.add.audio('fart');
    },

    update: function() {
        if (this.turd.y < 0 || this.turd.y > 490)
            this.restartGame();
        game.physics.arcade.overlap(this.turd, this.pipes, this.hitPipe, null, this);
        if (this.turd.angle < 20)
            this.turd.angle += 1;
    },
    jump: function() {
        if (this.turd.alive == false)
            return;
        game.add.tween(this.turd).to({
            angle: -20
        }, 100).start();
        this.turd.body.velocity.y = -350;
        this.jumpSound.play();
    },

    restartGame: function() {
        game.state.start('main');
    },
    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    addRowOfPipes: function() {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
        this.score += 1;
        this.labelScore.text = this.score;
    },
    hitPipe: function() {
        if (this.turd.alive == false)
            return;
        this.fartSound.play();
        this.turd.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p) {
            p.body.velocity.x = 0;
        }, this);
    },
};

var game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');
