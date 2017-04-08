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
    this.load.image('staff_line', 'benchmark2/assets/images/staff_line.png');
    this.load.image('treble_clef', 'benchmark2/assets/images/treble_clef.png');
    this.load.image('pause_button', 'benchmark2/assets/images/pause_button.png');
    this.load.image('bpm_shell', 'benchmark2/assets/images/bpm_shell.png');
    this.load.image('button_background', 'benchmark2/assets/images/button_background.png');
    this.load.image('logo', 'benchmark2/assets/images/logo.png');
    this.load.image('play_button', 'benchmark2/assets/images/play_button.png');
    this.load.image('controls_button', 'benchmark2/assets/images/controls_button.png');
    this.load.image('help_button', 'benchmark2/assets/images/help_button.png');
    this.load.image('level1_button', 'benchmark2/assets/images/level1_button.png');
    this.load.image('level2_button', 'benchmark2/assets/images/level2_button.png');
    this.load.image('level3_button', 'benchmark2/assets/images/level3_button.png');
    this.game.load.json('levelData', 'benchmark2/assets/levels/levels.json');
    this.load.image('quarter_note', 'benchmark2/assets/images/quarter_note.png');
    this.load.image('half_note', 'benchmark2/assets/images/half_note.png');
    this.load.image('whole_note', 'benchmark2/assets/images/whole_note.png');
  },
  create: function() {
    this.state.start('Splash');
  }
};