Accelerando.HelpMenu = function(){};

Accelerando.HelpMenu.prototype = {
  create: function(){
    var border = this.game.add.sprite(this.world.width/2, this.world.height/2, 'border');
    border.anchor.x = 0.5;
    border.anchor.y = 0.5;
    var backgroundNotes = this.game.add.group();
    for(var i = 0; i<60; i++){
      var ran = Math.random();

      if(ran >=0 && ran <.33){var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'whole_note');}
      if(ran >=.3 && ran <.66){ var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'half_note');}
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
    var logo = this.game.add.sprite(this.world.width/2, this.world.height - 900, 'logo');
    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;
    var helpmenu = this.game.add.sprite(this.world.width/10 - 180,this.world.height/2 - 30,'help_info');
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