var _audio;
var backButton;
var muteButton;

Accelerando.ControlsMenu = function(){};

Accelerando.ControlsMenu.prototype = {
  init: function(audio){
    _audio = audio;
  },

  create : function(){
    var border = this.game.add.sprite(this.world.width/2, this.world.height/2, 'border');
    border.anchor.x = 0.5;
    border.anchor.y = 0.5;
    var backgroundNotes = this.game.add.group();
    for(var i = 0; i<60; i++){
      var ran = Math.random();

      if(ran >= 0 && ran <.33){var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'whole_note');}
      if(ran >= .3 && ran <.66){ var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'half_note');}
      if(ran >= .66 && ran<1){var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'quarter_note');}

      this.game.physics.arcade.enable(sprite);
      sprite.scale.x = .5;
      sprite.scale.y = .5;
      sprite.alpha = .2;
      sprite.body.bounce.set(1);
      var v = Math.random()*300;
      var ran2 = Math.random();
      if(ran2>.5){sprite.body.velocity.x = -v;}
      else{sprite.body.velocity.x = v;}

      sprite.body.collideWorldBounds = true;
    }
    var logo = this.game.add.sprite(this.world.width/2, this.world.height/3, 'logo');
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    var gameDirections = this.game.add.sprite(this.world.width/2,this.world.height/2,'controls');
    gameDirections.anchor.x = 0.5;
    backButton =this.game.add.sprite(this.world.width/2 - 800, this.world.height/3, 'back_button');
    backButton.inputEnabled = true;
    backButton.events.onInputDown.add(this.loadMainMenu, this);

    muteButton = this.game.add.sprite(100, this.world.height-100, 'mute_button');
    muteButton.anchor.x = 0.5;
    muteButton.anchor.y = 0.5;
    muteButton.inputEnabled = true;
    muteButton.events.onInputDown.add(this.toggleAudio, this);
    
    if(!_audio.paused)
      _audio.play();
    _audio.loop = true;
  },
update: function(){
    if(backButton.input.pointerOver()){
      backButton.frame = 1;
    }
    else{
      backButton.frame = 0;
    }
    if(!_audio.paused && muteButton.input.pointerOver()){
      muteButton.frame = 1;
    }else if(_audio.paused && muteButton.input.pointerOver()){
      muteButton.frame = 3;
    }else if(!_audio.paused){
      muteButton.frame = 0;
    }else{
      muteButton.frame = 2;
    }
  },
  loadMainMenu : function(){
    this.state.start('MainMenu', true, false, _audio, _audio.paused);
  },

  toggleAudio: function(){
    if(_audio.paused){
      _audio.play();
    }
    else
      _audio.pause();
  }
}