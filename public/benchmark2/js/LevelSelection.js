var _audio;

Accelerando.LevelSelection = function(){};

Accelerando.LevelSelection.prototype = {
	init: function(audio){
    _audio = audio;
  	},
	create: function(){
		var logo = this.game.add.sprite(this.world.width/2, this.world.height/3, 'logo');
		logo.anchor.x = 0.5;
		logo.anchor.y = 0.5;
		var level1Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5, 'level1_button');
		level1Button.anchor.x = 0.5;
		level1Button.anchor.y = 0.5;
		level1Button.inputEnabled = true;
		level1Button.events.onInputDown.add(this.loadLevel1, this);
		var level2Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5+100, 'level2_button');
		level2Button.anchor.x = 0.5;
		level2Button.anchor.y = 0.5;
		level2Button.inputEnabled = true;
		level2Button.events.onInputDown.add(this.loadLevel2, this);
		var level3Button = this.game.add.sprite(this.world.width/2, this.world.height/1.5+200, 'level3_button');
		level3Button.anchor.x = 0.5;
		level3Button.anchor.y = 0.5;
		level3Button.inputEnabled = true;
		level3Button.events.onInputDown.add(this.loadLevel3, this);
		var backButton =this.game.add.sprite(this.world.width/2 - 800, this.world.height/3, 'back_button');
    	backButton.inputEnabled = true;
    	backButton.events.onInputDown.add(this.loadMainMenu, this);
		_audio.play();
    	_audio.loop = true;
	},

	update: function(){

	},

	loadLevel1: function(){
		_audio.pause();
		this.state.start('Game', true, false, 0);
	},
	loadLevel2: function(){
		_audio.pause();
		this.state.start('Game', true, false, 1);
	},
	loadLevel3: function(){
		_audio.pause();
		this.state.start('Game', true, false, 2);
	},
	loadMainMenu: function(){
		this.state.start('MainMenu', true, false, _audio);
	}

}