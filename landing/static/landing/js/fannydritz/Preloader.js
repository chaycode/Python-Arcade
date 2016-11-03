Game.Preloader = function(game) {

    this.preloadBar = null
};

Game.Preloader.prototype = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('Level_Bg', '/static/landing/assets/fannydritz/assets/background.png');
        this.load.tilemap('map', '/static/landing/assets/fannydritz/assets/main_set.csv');
        this.load.image('tileset', '/static/landing/assets/fannydritz/assets/main_set.png');

        this.load.image('selfie', '/static/landing/assets/fannydritz/assets/selfie.png');
        this.load.spritesheet('player', '/static/landing/assets/fannydritz/assets/Fanny_Dritz_64.png', 64, 64);
        this.load.spritesheet('bird', '/static/landing/assets/fannydritz/assets/sillyBird.png', 32, 32)
        this.load.spritesheet('homelessA', '/static/landing/assets/fannydritz/assets/homelessA.png', 64, 64);
        this.load.spritesheet('homelessB', '/static/landing/assets/fannydritz/assets/homelessB.png', 64, 64);


        this.load.audio("bgmusic","/static/landing/assets/fannydritz/assets/bgmusic.mp3");
        this.load.audio("jump","/static/landing/assets/fannydritz/assets/jump.wav");
        this.load.audio("shoot","/static/landing/assets/fannydritz/assets/hawk.wav");
        this.load.audio("die","/static/landing/assets/fannydritz/assets/pain.wav");

      },

create: function() {
      this.state.start('Level', true, false);
    },

};
