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
    this.load.spritesheet('play_again','index/assets/images/play_again_anim.png', 320, 76);
    this.load.spritesheet('main_menu','index/assets/images/main_menu_anim.png', 320, 76);
    this.load.image('win_popup','index/assets/images/winpopup.png');
    this.load.image('lose_popup','index/assets/images/losepopup.png');
    this.load.image('staff_line', 'index/assets/images/staff_line.png');
    this.load.image('treble_clef', 'index/assets/images/treble_clef.png');
    this.load.spritesheet('pause_button', 'index/assets/images/pause_button_anim.png', 320, 76);
    this.game.load.spritesheet('bpm_shell', 'index/assets/images/bpm_shell.png', 431, 90);
    this.load.image('button_background', 'index/assets/images/button_background.png');
    this.load.image('banner_background', 'index/assets/images/banner_background.png');
    this.load.image('logo', 'index/assets/images/logo.png');
    this.load.spritesheet('play_button', 'index/assets/images/play_button_anim.png', 320, 76);
    this.load.spritesheet('controls_button', 'index/assets/images/controls_button_anim.png', 320, 76);
    this.load.spritesheet('help_button', 'index/assets/images/help_button_anim.png', 320, 76);
    this.load.spritesheet('level1_button', 'index/assets/images/level1_button_anim.png', 320, 76);
    this.load.spritesheet('level2_button', 'index/assets/images/level2_button_anim.png', 320, 76);
    this.load.spritesheet('level3_button', 'index/assets/images/level3_button_anim.png', 320, 76);
    this.game.load.json('levelData', 'index/assets/levels/levels.json');
    this.load.image('quarter_note', 'index/assets/images/quarter_note.png');
    this.load.image('half_note', 'index/assets/images/half_note.png');
    this.load.image('whole_note', 'index/assets/images/whole_note.png');
    this.game.load.spritesheet('bach', 'index/assets/images/bach_spritesheet.png', 64, 64);
    this.load.image('blue_bar', 'index/assets/images/blue_bar.png');
    this.game.load.spritesheet('salieri', 'index/assets/images/salieri_spritesheet.png', 64, 64);
    this.load.spritesheet('back_button', 'index/assets/images/back_button_anim.png', 320, 76);
    this.load.image('controls', 'index/assets/images/controls_new.png');
    this.load.image('finish_flag', 'index/assets/images/finish_flag.png');
    this.load.image('help_info', 'index/assets/images/help_info_new.png');
    this.load.image('border', 'index/assets/images/border.png');
    this.load.audio('jump','index/assets/audio/jump.mp3');
    this.load.audio('missedNote','index/assets/audio/missedNote.mp3');
    this.load.spritesheet('mute_button', 'index/assets/images/mute_button_anim.png', 153, 76);
    
    
  },
  create: function() {
    this.state.start('Splash');
  }
};
