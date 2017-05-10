var _audio;
var _level1_key;
var _level2_key;
var _level3_key;

var playButton;
var controlsButton;
var helpButton;

var muteButton;

Accelerando.MainMenu = function(){};

Accelerando.MainMenu.prototype = {
	init: function(audio, muteSounds){
		_audio = audio;
		if(!muteSounds){
			_audio.play();
		}
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
		playButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5, 'play_button');
		playButton.anchor.x = 0.5;
		playButton.anchor.y = 0.5;
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(this.loadLevelSelection, this);
		controlsButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5 + 100, 'controls_button');
		controlsButton.anchor.x = 0.5;
		controlsButton.anchor.y = 0.5;
		controlsButton.inputEnabled = true;
		controlsButton.events.onInputDown.add(this.loadControls, this);
		helpButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5 + 200, 'help_button');
		helpButton.anchor.x = 0.5;
		helpButton.anchor.y = 0.5;
		helpButton.inputEnabled = true;
		helpButton.events.onInputDown.add(this.loadHelp, this);

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
		if(playButton.input.pointerOver()){
			playButton.frame = 1;
		}
		else{
			playButton.frame = 0;
		}
		if(controlsButton.input.pointerOver()){
			controlsButton.frame = 1;
		}
		else{
			controlsButton.frame = 0;
		}
		if(helpButton.input.pointerOver()){
			helpButton.frame = 1;
		}
		else{
			helpButton.frame = 0;
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

	loadLevelSelection: function(){
		this.state.start('LevelSelection', true, false, _audio);
	},

	loadControls: function(){
		this.state.start('ControlsMenu', true, false, _audio);
	},

	loadHelp: function(){
		this.state.start('HelpMenu', true, false, _audio);
	},

	toggleAudio: function(){
		if(_audio.paused){
			_audio.play();
		}
		else
			_audio.pause();
	}

}
