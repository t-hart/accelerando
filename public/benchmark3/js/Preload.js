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
    this.load.image('play_again','benchmark3/assets/images/play_again.png');
    this.load.image('main_menu','benchmark3/assets/images/main_menu.png');
    this.load.image('win_popup','benchmark3/assets/images/winpopup.png');
    this.load.image('lose_popup','benchmark3/assets/images/losepopup.png');
    this.load.image('staff_line', 'benchmark3/assets/images/staff_line.png');
    this.load.image('treble_clef', 'benchmark3/assets/images/treble_clef.png');
    this.load.image('pause_button', 'benchmark3/assets/images/pause_button.png');
    this.load.image('bpm_shell', 'benchmark3/assets/images/bpm_shell.png');
    this.load.image('button_background', 'benchmark3/assets/images/button_background.png');
    this.load.image('logo', 'benchmark3/assets/images/logo.png');
    this.load.image('play_button', 'benchmark3/assets/images/play_button.png');
    this.load.image('controls_button', 'benchmark3/assets/images/controls_button.png');
    this.load.image('help_button', 'benchmark3/assets/images/help_button.png');
    this.load.image('level1_button', 'benchmark3/assets/images/level1_button.png');
    this.load.image('level2_button', 'benchmark3/assets/images/level2_button.png');
    this.load.image('level3_button', 'benchmark3/assets/images/level3_button.png');
    this.game.load.json('levelData', 'benchmark3/assets/levels/levels.json');
    this.load.image('quarter_note', 'benchmark3/assets/images/quarter_note.png');
    this.load.image('half_note', 'benchmark3/assets/images/half_note.png');
    this.load.image('whole_note', 'benchmark3/assets/images/whole_note.png');
    this.game.load.spritesheet('bach', 'benchmark3/assets/images/bach_spritesheet.png', 64, 64);
    this.load.image('blue_bar', 'benchmark3/assets/images/blue_bar.png');
    this.game.load.spritesheet('salieri', 'benchmark3/assets/images/salieri_spritesheet.png', 64, 64);
    this.load.image('back_button', 'benchmark3/assets/images/back_button.png');
    this.load.image('controls', 'benchmark3/assets/images/controls.png');
    this.load.image('finish_flag', 'benchmark3/assets/images/finish_flag.png');
    this.load.image('help_info', 'benchmark3/assets/images/help_info.png');
    this.load.image('border', 'benchmark3/assets/images/border.png');

    this.load.audio('jump','benchmark3/assets/audio/jump.mp3');
    this.load.audio('missedNote','benchmark3/assets/audio/missedNote.mp3');


  },
  create: function() {
    this.state.start('Splash');
  }
};
