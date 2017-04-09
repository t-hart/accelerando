var _audio;


Accelerando.MainMenu = function(){};

Accelerando.MainMenu.prototype = {
	init: function(audio){
		_audio = audio;
	},

	create: function(){
		var backgroundNotes = this.game.add.group();
		for(var i = 0; i<120; i++){
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
		var playButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5, 'play_button');
		playButton.anchor.x = 0.5;
		playButton.anchor.y = 0.5;
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(this.loadLevelSelection, this);
		var controlsButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5 + 100, 'controls_button');
		controlsButton.anchor.x = 0.5;
		controlsButton.anchor.y = 0.5;
		controlsButton.inputEnabled = true;
		controlsButton.events.onInputDown.add(this.loadControls, this);
		var helpButton = this.game.add.sprite(this.world.width/2, this.world.height/1.5 + 200, 'help_button');
		helpButton.anchor.x = 0.5;
		helpButton.anchor.y = 0.5;
		helpButton.inputEnabled = true;
		helpButton.events.onInputDown.add(this.loadHelp, this);

		_audio.play();
		_audio.loop = true;



	},

	update: function(){

	},

	loadLevelSelection: function(){
		this.state.start('LevelSelection', true, false, _audio);
	},

	loadControls: function(){
		this.state.start('ControlsMenu', true, false, _audio);
	},

	loadHelp: function(){

	}

}
