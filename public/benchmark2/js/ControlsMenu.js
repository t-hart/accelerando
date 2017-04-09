var _audio;

Accelerando.ControlsMenu = function(){};

Accelerando.ControlsMenu.prototype = {
  init: function(audio){
    _audio = audio;
  },

  create : function(){
    var logo = this.game.add.sprite(this.world.width/2, this.world.height/3, 'logo');
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    var gameDirections = this.game.add.sprite(540,this.world.height/2,'controls');
    var backButton =this.game.add.sprite(this.world.width/2 - 800, this.world.height/3, 'back_button');
    backButton.inputEnabled = true;
    backButton.events.onInputDown.add(this.loadMainMenu, this);
    _audio.play();
    _audio.loop = true;
  },

  loadMainMenu : function(){
    this.state.start('MainMenu', true, false, _audio);
  }
}