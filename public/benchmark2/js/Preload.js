var Accelerando = Accelerando || {};

//loading the game assets
Accelerando.Preload = function(){};

Accelerando.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'benchmark2/assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'benchmark2/assets/images/tiles.png');
    this.load.image('greencup', 'benchmark2/assets/images/greencup.png');
    this.load.image('bluecup', 'benchmark2/assets/images/bluecup.png');
    this.load.image('player', 'benchmark2/assets/images/player.png');
    this.load.image('browndoor', 'benchmark2/assets/images/browndoor.png');
    
  },
  create: function() {
    this.state.start('Game');
  }
};