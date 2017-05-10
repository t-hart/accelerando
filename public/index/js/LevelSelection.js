var _audio;
var _level1_key;
var _level2_key;
var _level3_key;

var level1Button;
var level2Button;
var level3Button;
var backButton;
var muteButton;
var mute = false;

Accelerando.LevelSelection = function(){};

Accelerando.LevelSelection.prototype = {
	init: function(audio){
    _audio = audio;
  	},
	create: function(){
		var border = this.game.add.sprite(this.world.width/2, this.world.height/2, 'border');
		border.anchor.x = 0.5;
		border.anchor.y = 0.5;
		var backgroundNotes = this.game.add.group();
		for(var i = 0; i<60; i++){
			var ran = Math.random();

			if(ran >=0 && ran <.33){var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'whole_note');}
			if(ran >=.3 && ran <.66){	var sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'half_note');}
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
		level1Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5, 'level1_button');
		level1Button.anchor.x = 0.5;
		level1Button.anchor.y = 0.5;
		level1Button.inputEnabled = true;
		level1Button.events.onInputDown.add(this.loadLevel1, this);
		level2Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5+100, 'level2_button');
		level2Button.anchor.x = 0.5;
		level2Button.anchor.y = 0.5;
		level2Button.inputEnabled = true;
		level2Button.events.onInputDown.add(this.loadLevel2, this);
		level3Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5+200, 'level3_button');
		level3Button.anchor.x = 0.5;
		level3Button.anchor.y = 0.5;
		level3Button.inputEnabled = true;
		level3Button.events.onInputDown.add(this.loadLevel3, this);
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

    	_level1_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		_level2_key = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		_level3_key = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	},

	update: function(){
		if(level1Button.input.pointerOver()){
			level1Button.frame = 1;
		}
		else{
			level1Button.frame = 0;
		}
		if(level2Button.input.pointerOver()){
			level2Button.frame = 1;
		}
		else{
			level2Button.frame = 0;
		}
		if(level3Button.input.pointerOver()){
			level3Button.frame = 1;
		}
		else{
			level3Button.frame = 0;
		}
		if(backButton.input.pointerOver()){
			backButton.frame = 1;
		}
		else{
			backButton.frame = 0;
		}
		if(_level1_key.isDown){
			_audio.pause();
			this.state.start('Game', true, false, 0);
		}
		else if(_level2_key.isDown){
			_audio.pause();
			this.state.start('Game', true, false, 1);
		}
		else if(_level3_key.isDown){
			_audio.pause();
			this.state.start('Game', true, false, 2);
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

	loadLevel1: function(){
		this.state.start('Game', true, false, 0, _audio.paused);
	},
	loadLevel2: function(){
		this.state.start('Game', true, false, 1, _audio.paused);
	},
	loadLevel3: function(){
		this.state.start('Game', true, false, 2, _audio.paused);
	},
	loadMainMenu: function(){
		this.state.start('MainMenu', true, false, _audio, _audio.paused);
	},

  toggleAudio: function(){
    if(_audio.paused){
      _audio.play();
      mute= false;
    }
    else{
      _audio.pause();
    	mute = true;
    }
  }

}
