Accelerando.MainMenu = function(){};

Accelerando.MainMenu.prototype = {
	create: function(){
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

	},

	update: function(){

	},

	loadLevelSelection: function(){
		this.state.start('LevelSelection');
	},

	loadControls: function(){

	},

	loadHelp: function(){

	}

}