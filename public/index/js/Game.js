var Accelerando = Accelerando || {};
var _startTime;
var _timer;
var _scoreText;
var _score = 0;
var _seconds = 0;
var _minutes = 0;
var _pauseButton;

var _cKey;
var _dKey;
var _eKey;
var _fKey;
var _gKey;
var _aKey;
var _bKey;
var _flatKey;
var _sharpKey;
var _iKey;
var _pKey

var _level1Notes;
var _level1Duration;
var _currentIndex = -1;
var _start_of_waited_time = 0;
var _waitedTime;
var _notes;
var _noteVelocity = 3;
var _noteHeight;
var _noteFreq = 0;
var _playedNoteIndex = 0;
var _levelJSON;

var _elapsedDistance = 1;

var _bach;
var _salieri;

var _context;
var _oscillator;

var _paused = false;
var _pausedTime;
var _piano;

var _gameOver = false;
var _popUpShown = false;

var _level;
var _numRests = 0;

var _percentCompleteSprite;
var _winLoseAudio;

var _level1_key;
var _level2_key;
var _level3_key;

var _invincible = false;
var _origNoteVelocity;
var _fastForward = false;

var shouldJump = false;
var anim; 
var _bpmBar;
var _bpmAnimFrame = 1;
var _jumpSound;

var _missedNoteSound;
var _lose = false;

var _winAudio;
var _loseAudio;
var _sprites;

var _goodnessText;

var button1;
var button2;

var _mainMenuButton;
var mute ;

Accelerando.Game = function(){};

Accelerando.Game.prototype = {

	/* INIT FUNCTION TAKES LEVEL PARAM */
	init: function(level, muteSounds){
		_audio.pause();
		_level = level;
		_score = 0;
		_popUpShown = false;
		_invincible = false;
		if(_fastForward == true){
			_noteVelocity = 3;
			_fastForward = false;
		}
		_currentIndex = -1;
		_playedNoteIndex = 0;
		_seconds = 0;
		_minutes = 0;
		this.getLevelData(level);
		if(_paused){
			this.pauseGame();
			_gameOver = false;
		}
		mute = muteSounds;
	},

	/* CREATE FUNCTION */
	create: function() {
		_lose = false;
		_gameOver = false;
		_paused = false;
		_bpmAnimFrame = 0;
		var border = this.game.add.sprite(this.world.width/2, this.world.height/2, 'border');
		border.anchor.x = 0.5;
		border.anchor.y = 0.5;
		_piano = new Wad({
			source : 'sine',
			env : {
				attack : 0.01,
				decay: .005,
				sustain: .2,
				hold: .015,
				release: .3
			},
			filter : {
				type : 'lowpass',
				frequency: 1200,
				q : 8.5,
				env : {
					attack :.2,
					frequency: 600
				}
			},
		});

		// var _piano = new Wad({
		// 	source: 'square',
		// 	env : {
				// attack : 0.01,
				// decay: .005,
				// sustain: .2,
				// hold: .015,
				// release: .3
		// 	},
		// 	filter : {
		// 		type : 'lowpass',
		// 		frequency: 1200,
		// 		q : 8.5,
		// 		env : {
		// 			attack :.2,
		// 			frequency: 600
		// 		}
		// 	},
		// });
		this.createUI();
		this.initKeys();
		if(_level == 0)
			this.setupText();
		_jumpSound = new Audio();
		_jumpSound.src = "index/assets/audio/jump.mp3";
		_jumpSound.volume = 0.25;
		_jumpSound.loop = false;

		_missedNoteSound = new Audio();
		_missedNoteSound.src = "index/assets/audio/missedNote.mp3";
		_missedNoteSound.volume = 0.25;
		_missedNoteSound.loop = false;

		_loseAudio = new Audio();
		_loseAudio.src = "index/assets/audio/lose.mp3";

		_winAudio = new Audio();
		_winAudio.src = "index/assets/audio/win.mp3";

		/* CREATE SPRITES */
		_bach = this.game.add.sprite(150, 220, 'bach');
		_bach.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
		_bach.animations.add('attack', [12, 13, 14, 15, 16, 17, 18, 19, 20], 10, true);
		_bach.scale.setTo(2);
		_salieri = this.game.add.sprite(300, 220, 'salieri');
		_salieri.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
		_salieri.animations.add('die', [6, 10, 10, 11, 12, 13, 14, 15], 10, false);
		_salieri.animations.add('win', [6, 7, 8, 9], 10, true);
		anim = _salieri.animations.add('jump', [6, 7, 8, 9, 8, 7], 10, false);
		_salieri.scale.setTo(2);
		_notes = this.game.add.group();

		_bpmBar = this.game.add.sprite((this.game.width-600)+300, (this.game.height/1.25)+20, 'bpm_shell');
		_bpmBar.animations.add('bpm', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 10, false);
		_bpmBar.anchor.y = 0.5;
		_bpmBar.anchor.x = 0.5;
		_notes = this.game.add.group();

		anim.onComplete.add(this.switchJumpValue, this);

		_sprites = this.game.add.group();
	},

	/* UPDATE FUNCTION */
	update: function() {
		if(!mute && muteButton.input.pointerOver()){
			muteButton.frame = 1;
		}else if(mute && muteButton.input.pointerOver()){
			muteButton.frame = 3;
		}else if(!mute){
			muteButton.frame = 0;
		}else{
			muteButton.frame = 2;
		}
		if(_popUpShown){
			if(button1.input.pointerOver()){
				button1.frame = 1;
			}
			else{
				button1.frame = 0;
			}
			if(button2.input.pointerOver()){
				button2.frame = 1;
			}
			else{
				button2.frame = 0;
			}
		}
		if(_pauseButton.input.pointerOver()){
			_pauseButton.frame = 1;
		}
		else{
			_pauseButton.frame = 0;
		}
		if(_mainMenuButton.input.pointerOver()){
			_mainMenuButton.frame = 1;
		}
		else{
			_mainMenuButton.frame = 0;
		}
		var ran = Math.random();
		var thresh = 0.03;
		var thresh1 = thresh/3;
		var thresh2 = thresh/2;
		var thresh3 = thresh;
		var sprite;
		if(ran >=0 && ran <thresh1){
			sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'whole_note');
			sprite.scale.x = .5;
			sprite.scale.y = .5;
			sprite.alpha = .2;
			this.game.physics.arcade.enable(sprite);
			sprite.body.bounce.set(0);
			var v = Math.random()*600;
			var ran2 = Math.random();
			if(ran2>.5){sprite.body.velocity.x = -v;}
			else{sprite.body.velocity.x = v;}

			_sprites.add(sprite);
		}
		if(ran >=thresh1 && ran <thresh2){ 
			sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'half_note');
			sprite.scale.x = .5;
			sprite.scale.y = .5;
			sprite.alpha = .2;
			this.game.physics.arcade.enable(sprite);
			sprite.body.bounce.set(0);
			var v = Math.random()*600;
			var ran2 = Math.random();
			if(ran2>.5){sprite.body.velocity.x = -v;}
			else{sprite.body.velocity.x = v;}

			_sprites.add(sprite);
		}
		if(ran >= thresh2 && ran<thresh3){
			sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'quarter_note');
			sprite.scale.x = .5;
			sprite.scale.y = .5;
			sprite.alpha = .2;
			this.game.physics.arcade.enable(sprite);
			sprite.body.bounce.set(0);
			var v = Math.random()*600;
			var ran2 = Math.random();
			if(ran2>.5){sprite.body.velocity.x = -v;}
			else{sprite.body.velocity.x = v;}

			_sprites.add(sprite);
		}
		
		_sprites.forEach(function(sprite){
			if(sprite.x > this.game.world.width || sprite.x < 0 || sprite.y > this.game.world.height || sprite.y < 0){
				sprite.destroy();
			}
		}, this);

		
		
		_bpmBar.frame = _bpmAnimFrame;

		if(_bpmAnimFrame < 3){
			_goodnessText.setText("Slow!");
		}else if(_bpmAnimFrame < 6){
			_goodnessText.setText("Still slow!");
		}else if(_bpmAnimFrame < 9){
			_goodnessText.setText("Hmm...");
		}else if(_bpmAnimFrame < 12){
			_goodnessText.setText("OK...");
		}else if(_bpmAnimFrame < 15){
			_goodnessText.setText("Good!");
		}else if(_bpmAnimFrame < 18){
			_goodnessText.setText("Nice!");
		}else if(_bpmAnimFrame < 21){
			_goodnessText.setText("Wow!");
		}else if(_bpmAnimFrame < 24){
			_goodnessText.setText("Amazing!");
		}else if(_bpmAnimFrame < 27){
			_goodnessText.setText("Accelerando!");
		}
		if(_level1_key.isDown){
			_loseAudio.pause();
			_winAudio.pause();
			_audio.pause();
			_bpmAnimFrame = 0;
			this.state.start('Game', true, false, 0, mute);
		}
		else if(_level2_key.isDown){
			_loseAudio.pause();
			_winAudio.pause();
			_audio.pause();
			this.state.start('Game', true, false, 1, mute);
		}
		else if(_level3_key.isDown){
			_loseAudio.pause();
			_winAudio.pause();
			_audio.pause();
			this.state.start('Game', true, false, 2, mute);
		}
		
		_iKey.onDown.add(this.invincible, this);
		_pKey.onDown.add(this.fastForward, this);

		if(_score < 0){
			_gameOver = true;
			_lose = true;
		}
		if(_score >= 0 && _playedNoteIndex == _level1Notes.length){
			_gameOver = true;
		}

		if(!_paused && !_gameOver){

			_fKey.onDown.add(this.reader,this);
			_gKey.onDown.add(this.reader,this);
			_aKey.onDown.add(this.reader,this);
			_bKey.onDown.add(this.reader,this);
			_cKey.onDown.add(this.reader,this);
			_dKey.onDown.add(this.reader,this);
			_eKey.onDown.add(this.reader,this);

			var miliSeconds = this.time.now - _startTime;
			if(miliSeconds-1000 > ((_seconds*1000) + (_minutes*60*1000)) ){
				this.updateTimer(miliSeconds);
			}

			if(_currentIndex >= 0)
				distToWait = _level1Duration[_currentIndex]*100;
			else
				distToWait = 0;

			/* SPAWN NOTE? */
			if(_currentIndex >= 0)
				distToWait = _level1Duration[_currentIndex]*100;
			else 
				distToWait = 0;
			if(distToWait <= _elapsedDistance)
				this.spawnNote();

			
			//Make salieri jump if note is above an
			_notes.forEach(function(note){			//if salieri is above or in front of blue bar
				if((note.position.x - _salieri.position.x) <= 100 && (note.position.x - _salieri.position.x) > 20){
					console.log(note.position.x+" "+note.position.y+" "+shouldJump+" "+_level1Duration[_currentIndex]);
				}
				// if(note.position.x < 480){
				//  console.log(note.position.y);
				// }
				if(_salieri.position.x >=370 && !shouldJump){
					if(_level1Duration[_currentIndex] == 4){			//if current note is whole note 
						if(note.position.x>=390 && note.position.y <= 352.5){		//if whole note is >= F4
							if((note.position.x - _salieri.position.x) <= 100 && (note.position.x - _salieri.position.x) > 20){
								shouldJump = true;
								console.log("F4 - Jump");
								_salieri.position.y -= 15;
								if(!mute)
									_jumpSound.play();
								_salieri.animations.play('jump');
							}
						}
					} else {
						if(note.position.x>=390 && note.position.y <= 470){
							if((note.position.x - _salieri.position.x) <=100 && (note.position.x - _salieri.position.x) > 20){
								shouldJump = true;
								console.log("Quarter/Half - Jump");
								_salieri.position.y -= ((this.game.world.height - note.position.y)/7);
								if(!mute)
									_jumpSound.play();
								_salieri.animations.play('jump');
							}
						}

					}
				}
			},this);

			/* MOVES, PLAYS, AND DESTROYS NOTES ONCE THEY HIT END OF BLUE BAR */
			_elapsedDistance += _noteVelocity;
			_notes.forEach(function(note){
				note.x = note.x - _noteVelocity;
				if(note.x <= 400){
					note.destroy();
					console.log(_level1Notes[_playedNoteIndex]);
					console.log(_level1Duration[_playedNoteIndex]);
					if(!_invincible){
						if(!mute)
							_missedNoteSound.play();
						_score-=10;
						this.changeBPM(-1);
						_salieri.x-=10;
						if(_score >= 0)
							_scoreText.setText("SCORE: " + _score);
					}
					else{
						_bpmAnimFrame++;
						if(_bpmAnimFrame > 27)
							_bpmAnimFrame = 27;
						if(_bpmAnimFrame < 0)
							_bpmAnimFrame = 0;
					}
					this.playNote();
				}
			}, this);

			_bach.animations.play('run');
			if(!shouldJump){
				_salieri.animations.play('run');
			}
		}

		if(_gameOver && _lose){
			
			_salieri.x = 300;
			if(_salieri.animations.currentAnim.frame != 10)
				_salieri.animations.play('die');

			if(_bach.animations.currentAnim.frame == 20){
				if(!_popUpShown){
					if(_score<0){
						_mainMenuButton.inputEnabled = false;
						_pauseButton.inputEnabled = false;
						var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2)-30, 'lose_popup');
						graphic.anchor.x = 0.5;
						graphic.anchor.y = 0.5;
						button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
						button1.anchor.x = 0.5;
						button1.anchor.y = 0.5;
						button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
						button2.anchor.x = 0.5;
						button2.anchor.y = 0.5;
						if(!mute){
						_loseAudio.play();
						_loseAudio.volume = 0.25;
						_loseAudio.loop = false;
						}
					}
					else{
						var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2), 'win_popup');
						graphic.anchor.x = 0.5;
						graphic.anchor.y = 0.5;
						button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
						button1.anchor.x = 0.5;
						button1.anchor.y = 0.5;
						button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
						button2.anchor.x = 0.5;
						button2.anchor.y = 0.5;
						if(!mute){
						_winAudio.play();
						_winAudio.volume = 0.25;
						_winAudio.loop = true;
					}
					}
					this.pauseGame();
					_popUpShown = true;
				}
			}
			else{
				_bach.animations.play('attack');
			}
		}

		if(_gameOver && !_lose){

			if(!_popUpShown){
				if(_score<0){
					var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2)-30, 'lose_popup');
					graphic.anchor.x = 0.5;
					graphic.anchor.y = 0.5;
					button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
					button1.anchor.x = 0.5;
					button1.anchor.y = 0.5;
					
					button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
					button2.anchor.x = 0.5;
					button2.anchor.y = 0.5;
					if(!mute){
					_loseAudio.play();
					_loseAudio.volume = 0.25;
					_loseAudio.loop = false;
				}
					
				}
				else{
					var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2)-30, 'win_popup');
					graphic.anchor.x = 0.5;
					graphic.anchor.y = 0.5;
					button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
					button1.anchor.x = 0.5;
					button1.anchor.y = 0.5;

					_mainMenuButton.inputEnabled = false;
					_pauseButton.inputEnabled = false;

					
					button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
					button2.anchor.x = 0.5;
					button2.anchor.y = 0.5;
					if(!mute){
					_winAudio.play();
					_winAudio.volume = 0.25;
					_winAudio.loop = true;
				}
					
				}
				this.pauseGame();
				_popUpShown = true;
			}
			
		}

		if(_paused){
			if(_lose && _gameOver)
				_salieri.frame = 15;
			if(_gameOver && !_lose)
				_salieri.animations.play('win');
			else{
				_salieri.animations.stop();
			}
			_bach.animations.stop();
			
		}
	},




	createUI: function() {
		_startTime = this.time.now;
		_timer = this.game.add.text(this.game.width/1.25, 60, "TIMER: 0:00", {font: "50px Arial Black", fill: "#ffffff"});
		_scoreText = this.game.add.text(50, 60, "SCORE: 0", {font: "50px Arial Black", fill: "#ffffff"});

		/* Staff */
		var lineOffset = 75;
		staff = this.game.add.group();
		for(var i = 0; i < 5; i++){
			var staffLine = this.game.add.sprite(0, (this.game.height/2)+(i*lineOffset)-(lineOffset*2.5), 'staff_line');
			staffLine.anchor.y = 0.5;
			staffLine.scale.setTo(192, 0.5);
			staff.add(staffLine);
		}
		if(_level == 2){
			for(var i = 0; i < 5; i++){
				var staffLine = this.game.add.sprite(0, (this.game.height/2)+75*2+(i*lineOffset)-(lineOffset*2.5), 'staff_line');
				staffLine.alpha = 0.05;
				staffLine.anchor.y = 0.5;
				staffLine.scale.setTo(192, 0.5);
				staff.add(staffLine);
			}
			for(var i = 0; i < 5; i++){
				var staffLine = this.game.add.sprite(0, (this.game.height/2)-75*2+(i*lineOffset)-(lineOffset*2.5), 'staff_line');
				staffLine.alpha = 0.05;
				staffLine.anchor.y = 0.5;
				staffLine.scale.setTo(192, 0.5);
				staff.add(staffLine);
			}
		}
		var trebleClef = this.game.add.sprite(5, (this.game.height/2), 'treble_clef')
		trebleClef.anchor.x = 0;
		trebleClef.anchor.y = 0.5;
		trebleClef.scale.setTo(0.7);
		var staffLine = this.game.add.sprite(400, (this.game.height/2), 'staff_line');
		staffLine.anchor.y = 0.59;
		staffLine.scale.setTo(0.5, (lineOffset*0.5));

		var botBanner1 = this.game.add.sprite(this.game.world.width, (this.game.height/1.25)-50, 'banner_background');
		botBanner1.scale.setTo(-1.1, 2);

		/* Buttons */
		_pauseButton = this.game.add.sprite(230, (this.game.height/1.25)+10, 'pause_button');

		_pauseButton.inputEnabled = true;
		_pauseButton.events.onInputDown.add(this.pauseGame, this);

		_mainMenuButton = this.game.add.sprite(600, (this.game.height/1.25)+10, 'main_menu');
		_mainMenuButton.inputEnabled = true;
		_mainMenuButton.events.onInputDown.add(this.goToMainMenu, this);

		/* BPM Bar */
		// var bpmShell = this.game.add.sprite((this.game.width/1.15), (this.game.height/1.15), 'bpm_shell');
		// bpmShell.anchor.x = 0.5;

		/* Timer Background */
		var buttonBackground = this.game.add.sprite(this.game.width/1.3+500, 56, 'banner_background');
		buttonBackground.scale.setTo(-1, 1);
		this.game.world.bringToTop(_timer);

		/* Score Background */
		var buttonBackground = this.game.add.sprite(-70, 56, 'banner_background');
		buttonBackground.scale.setTo(1, 1);
		this.game.world.bringToTop(_scoreText);

		var bluebar = this.game.add.sprite(400, 305,'blue_bar');

		


		// var percentCompleteBar = this.game.add.sprite(70, this.game.world.height-100, 'staff_line');
		// percentCompleteBar.scale.setTo(50, 0.5)
		// var finishFlag = this.game.add.sprite(568, this.game.world.height-100, 'finish_flag');
		// finishFlag.anchor.y = 1;
		// _percentCompleteSprite = this.game.add.sprite(50, this.game.world.height-100, 'salieri');
		// _percentCompleteSprite.anchor.y = 1;

		_goodnessText = this.game.add.text(1350,760, "Slow!", {font: "50px Arial Black", fill: "#ffffff"});
		_goodnessText.anchor.x = 0.5;
		_goodnessText.angle = -12;

		muteButton = this.game.add.sprite(100, this.world.height-100, 'mute_button');
    muteButton.anchor.x = 0.5;
    muteButton.anchor.y = 0.5;
    muteButton.inputEnabled = true;
    muteButton.events.onInputDown.add(this.toggleAudio, this);
	},

	updateTimer: function(miliSeconds) {
		_seconds = Math.floor(miliSeconds/1000)%60;
		_minutes = Math.floor(((miliSeconds/(1000*60))%60));
		miliSeconds = miliSeconds - (_seconds*1000 + _minutes*60*1000);
		if(_seconds < 10) _seconds = "0"+_seconds;
		_timer.setText("TIMER: "+_minutes+":"+_seconds);
	},

	goToMainMenu: function(){
		_winAudio.pause();
		_loseAudio.pause();
		this.state.start('MainMenu', true, false, _audio, mute);
	},
	playAgain: function(){
		_winAudio.pause();
		_loseAudio.pause();
		_noteVelocity = 3;
		_invincible = false;
		_fastForward = false;
		_lose = false;
		this.state.start('Game', true, false, _level, mute);

	},

	pauseGame: function(){
		if(_paused){
			var resumeTime = this.time.now;
			_startTime += resumeTime - _pausedTime;
			_paused = false;
		}
		else{
			_paused = true;
			_pausedTime = this.time.now;
		}
	},

	initKeys: function(){
		_cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
		_dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		_eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
		_fKey = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
		_gKey = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
		_aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		_bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
		_flatKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
		_sharpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ALT);
		_level1_key = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		_level2_key = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		_level3_key = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		_iKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
		_pKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
	},

	playNote: function(){
		
		_playedNoteIndex++;
		if(_level1Notes[_playedNoteIndex-1].toUpperCase() != 'R'){
			if(!mute)
				_piano.play({pitch : _level1Notes[_playedNoteIndex-1].toUpperCase()});
		}
		else{
			_playedNoteIndex++;
			if(!mute){
				_piano.play({pitch : _level1Notes[_playedNoteIndex-1].toUpperCase()});
				_piano.stop();
			}
			_numRests++;
		}
	},

	getLevelData: function(level){
		_levelJSON = this.game.cache.getJSON('levelData');
		_level1Notes = _levelJSON.levels[level].notes;
		_level1Duration = _levelJSON.levels[level].duration;
	},

	spawnNote: function(){
		_currentIndex++;
		_elapsedDistance = 0;
		this.findNoteHeight();
		if(_level1Duration[_currentIndex] == 1){
			if(_level1Notes[_currentIndex] != "r"){
				note = this.game.add.sprite(this.game.width+40, _noteHeight, 'quarter_note');
				note.anchor.y = 0.78823529411;
			}
		}
		else if(_level1Duration[_currentIndex] == 2){
			if(_level1Notes[_currentIndex] != "r"){
				note = this.game.add.sprite(this.game.width+40, _noteHeight, 'half_note');
				note.anchor.y = 0.78823529411;
			}
		}
		else if(_level1Duration[_currentIndex] == 3){

		}
		else if(_level1Duration[_currentIndex] == 4){
			if(_level1Notes[_currentIndex] != "r"){
				note = this.game.add.sprite(this.game.width+40, _noteHeight, 'whole_note');
				note.anchor.y = 0.5;
			}
		}
		
		this.game.physics.enable(note, Phaser.Physics.ARCADE);
		_notes.add(note);
	},

	findNoteHeight: function(){
		var note = _level1Notes[_currentIndex];
		if(note == "a2") _noteHeight = 802.5;
		else if(note == "b2") _noteHeight = 765;
		else if(note == "c3") _noteHeight = 727.5;
		else if(note == "d3") _noteHeight = 690;
		else if(note == "e3") _noteHeight = 652.5;
		else if(note == "f3") _noteHeight = 615;
		else if(note == "g3") _noteHeight = 577.5;
		else if(note == "a3") _noteHeight = 540;
		else if(note == "b3") _noteHeight = 502.5;
		else if(note == "c4") _noteHeight = 465;
		else if(note == "d4") _noteHeight = 427.5;
		else if(note == "e4") _noteHeight = 390;
		else if(note == "f4") _noteHeight = 352.5;
		else if(note == "g4") _noteHeight = 315;
		else if(note == "a4") _noteHeight = 277.5;
		else if(note == "b4") _noteHeight = 240;
		else if(note == "c5") _noteHeight = 202.5;
	},

	reader : function(){
		_notes.forEach(function(note){

			if(_aKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 802.5 || note.position.y == 540 || note.position.y == 277.5)){
				note.destroy();
				this.changeBPM(1);
				_score = _score +10;
				console.log("A is right");
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_bKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 765 || note.position.y == 502.5 ||note.position.y ==240)){
				note.destroy();
				this.changeBPM(1);
				console.log("B is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_cKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 727.5 || note.position.y == 465 || note.position.y ==202.5)){
				note.destroy();
				this.changeBPM(1);
				console.log("C is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_dKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 690 || note.position.y == 427.5)){
				note.destroy();
				this.changeBPM(1);
				console.log("D is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_eKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y ==652.5 || note.position.y == 390)){
				note.destroy();
				this.changeBPM(1);
				console.log("E is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_fKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 615 || note.position.y == 352.5)){
				note.destroy();
				this.changeBPM(1);
				console.log("F is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_gKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 577.5 || note.position.y == 315)){
				note.destroy();
				this.changeBPM(1);
				console.log("G is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
		}
		,this);
	},

	fastForward : function(){
		if(_pKey.isDown){
			if(!_fastForward){
				_origNoteVelocity = _noteVelocity;
				_noteVelocity += 50;
				_fastForward = true;
			}
			else{
				_noteVelocity = _origNoteVelocity;
				_fastForward = false;
			}
		}
	},

	invincible : function(){
		_invincible = !_invincible; 		
	},

	switchJumpValue : function(){
		shouldJump = false;
		//put sali back down to staff line 
		_salieri.position.y = 220;
		console.log("start running again");
	},

	changeBPM : function(change){
		if(change < 0)
			_noteVelocity = _noteVelocity*0.95;
		else
			_noteVelocity = _noteVelocity*1.05;
		_bpmAnimFrame = _bpmAnimFrame + change;
		if(_bpmAnimFrame > 27)
			_bpmAnimFrame = 27;
		if(_bpmAnimFrame < 0)
			_bpmAnimFrame = 0;
	},

  toggleAudio: function(){
    mute = !mute;
    if(mute){
    	if(_gameOver){
    		_winAudio.pause();
    		_loseAudio.pause();
    	}
    }else{
    	if(_gameOver && _lose){
    		_loseAudio.play();
    	}
    	else if (_gameOver){
    		_winAudio.play();
    	}
    }
  },

  setupText: function () {
  this.instructions = this.add.text( this.game.width/2, this.game.height/4,
    'As the note passes over the blue bar,\n press on the key that corresponds to the note',
    {font: '35px Arial Black', fill: '#000000', align: 'center'}
  );
  this.instructions.anchor.setTo(0.5, 0.5);
  this.time.events.add(7000, this.instructions.destroy, this.instructions);
	}
};
