var _audio;

Accelerando.Splash = function(){};

Accelerando.Splash.prototype = {
	create: function(){
		var logo = this.game.add.sprite(this.world.width/2, this.world.height/2, 'logo');
		logo.anchor.x = 0.5;
		logo.anchor.y = 0.5;
		var playButton = this.game.add.sprite(this.world.width/2, this.world.height/1.2, 'play_button');
		playButton.anchor.x = 0.5;
		playButton.anchor.y = 0.5;
		playButton.inputEnabled = true;
		playButton.events.onInputDown.add(this.loadMainMenu, this);

		_audio = new Audio();
		_audio.src = "benchmark2/assets/audio/main.mp3";
		_audio.play();
		_audio.loop = true;
	},

	update: function(){

	},

	loadMainMenu: function(){
		_audio.pause();
		this.state.start('MainMenu', true, false, _audio);
	}

}