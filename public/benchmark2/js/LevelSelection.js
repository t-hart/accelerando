var _audio;

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
