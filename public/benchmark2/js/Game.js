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

Accelerando.Game = function(){};

Accelerando.Game.prototype = {

	/* INIT FUNCTION TAKES LEVEL PARAM */
	init: function(level){
		_level = level;
		_score = 0;
		_popUpShown = false;
		_currentIndex = -1;
		_playedNoteIndex = 0;
		_seconds = 0;
		_minutes = 0;
		this.getLevelData(level);
		if(_paused){
			this.pauseGame();
			_gameOver = false;
		}
	},

	/* CREATE FUNCTION */
	create: function() {

		var border = this.game.add.sprite(this.world.width/2, this.world.height/2, 'border');
		border.anchor.x = 0.5;
		border.anchor.y = 0.5;
		_piano = new Wad({
			source : 'sine',
			env : {
				attack : 0,
				decay : .6,
				hold : 1,
				sustain : 0,
				release : 0
			}
		});

		this.createUI();
		this.initKeys();

		/* CREATE SPRITES */
		_bach = this.game.add.sprite(150, 220, 'bach');
		_bach.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
		_bach.animations.add('attack', [12, 13, 14, 15, 16, 17, 18, 19, 20], 10, true);
		_bach.scale.setTo(2);
		_salieri = this.game.add.sprite(300, 220, 'salieri');
		_salieri.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
		_salieri.animations.add('die', [6, 10, 10, 11, 12, 13, 14, 15], 10, true);
		_salieri.animations.add('win', [6, 7, 8, 9], 10, true);
		_salieri.scale.setTo(2);
		_notes = this.game.add.group();
	},

	/* UPDATE FUNCTION */
	update: function() {

		//if(_score < 0){
		//	_gameOver = true;
		//}
		if(_score >= 0 && _playedNoteIndex+_numRests == _level1Notes.length){
			_gameOver = true;
			_score+=2000;
		}

		if(!_paused){

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

			/* MOVES, PLAYS, AND DESTROYS NOTES ONCE THEY HIT END OF BLUE BAR */
			_elapsedDistance += _noteVelocity;
			_notes.forEach(function(note){
				note.x = note.x - _noteVelocity;
				if(note.x <= 400){
					note.destroy();
					_score-=10;
					_salieri.x-=10;
					_scoreText.setText("SCORE: " + _score);
					this.playNote();
				}
			}, this);

			_bach.animations.play('run');
			_salieri.animations.play('run');
		}

		if(_gameOver){
			if(!_popUpShown){
				if(_score<0){
					var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2), 'lose_popup');
					graphic.anchor.x = 0.5;
					graphic.anchor.y = 0.5;
					var button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
					button1.anchor.x = 0.5;
					button1.anchor.y = 0.5;
					var button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
					button2.anchor.x = 0.5;
					button2.anchor.y = 0.5;
					_winLoseAudio = new Audio();
					_winLoseAudio.src = "benchmark2/assets/audio/lose.mp3";
					_winLoseAudio.play();
					_winLoseAudio.volume = 0.25;
					_winLoseAudio.loop = false;
				}
				else{
					var graphic = this.game.add.sprite((this.world.width/2), (this.world.height/2), 'win_popup');
					graphic.anchor.x = 0.5;
					graphic.anchor.y = 0.5;
					var button1 = this.game.add.button((this.world.width/2),(this.world.height/2)+100,'main_menu',this.goToMainMenu,this);
					button1.anchor.x = 0.5;
					button1.anchor.y = 0.5;
					var button2 = this.game.add.button((this.world.width/2),(this.world.height/2),'play_again',this.playAgain,this);
					button2.anchor.x = 0.5;
					button2.anchor.y = 0.5;
					_winLoseAudio = new Audio();
					_winLoseAudio.src = "benchmark2/assets/audio/win.mp3";
					_winLoseAudio.play();
					_winLoseAudio.volume = 0.25;
					_winLoseAudio.loop = true;
				}
				this.pauseGame();
				_popUpShown = true;
			}
		}

		if(_paused){
			_bach.animations.stop();
			_salieri.animations.stop();
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
		var trebleClef = this.game.add.sprite(5, (this.game.height/2), 'treble_clef')
		trebleClef.anchor.x = 0;
		trebleClef.anchor.y = 0.5;
		trebleClef.scale.setTo(0.7);
		var staffLine = this.game.add.sprite(400, (this.game.height/2), 'staff_line');
		staffLine.anchor.y = 0.59;
		staffLine.scale.setTo(0.5, (lineOffset*0.5));

		/* Buttons */
		_pauseButton = this.game.add.sprite(this.game.width/2, (this.game.height/1.1), 'pause_button');
		_pauseButton.anchor.x = 0.5;
		_pauseButton.inputEnabled = true;
		_pauseButton.events.onInputDown.add(this.pauseGame, this);

		/* BPM Bar */
		var bpmShell = this.game.add.sprite((this.game.width/1.15), (this.game.height/1.15), 'bpm_shell');
		bpmShell.anchor.x = 0.5;

		/* Timer Background */
		var buttonBackground = this.game.add.sprite(this.game.width/1.3, 56, 'button_background');
		buttonBackground.scale.setTo(3, 1);
		this.game.world.bringToTop(_timer);

		/* Score Background */
		var buttonBackground = this.game.add.sprite(-70, 56, 'button_background');
		buttonBackground.scale.setTo(3, 1);
		this.game.world.bringToTop(_scoreText);

		var bluebar = this.game.add.sprite(400, 305,'blue_bar');

		// var percentCompleteBar = this.game.add.sprite(70, this.game.world.height-100, 'staff_line');
		// percentCompleteBar.scale.setTo(50, 0.5)
		// var finishFlag = this.game.add.sprite(568, this.game.world.height-100, 'finish_flag');
		// finishFlag.anchor.y = 1;
		// _percentCompleteSprite = this.game.add.sprite(50, this.game.world.height-100, 'salieri');
		// _percentCompleteSprite.anchor.y = 1;

	},

	updateTimer: function(miliSeconds) {
		_seconds = Math.floor(miliSeconds/1000)%60;
		_minutes = Math.floor(((miliSeconds/(1000*60))%60));
		miliSeconds = miliSeconds - (_seconds*1000 + _minutes*60*1000);
		if(_seconds < 10) _seconds = "0"+_seconds;
		_timer.setText("TIMER: "+_minutes+":"+_seconds);
	},

	goToMainMenu: function(){
		_winLoseAudio.pause();
		this.state.start('MainMenu', true, false, _audio);
	},
	playAgain: function(){
		_winLoseAudio.pause();
		this.state.start('Game', true, false, _level);

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
	},

	playNote: function(){
		_playedNoteIndex++;
		if(_level1Notes[_playedNoteIndex-1].toUpperCase() != 'R'){
			_piano.play({pitch : _level1Notes[_playedNoteIndex-1].toUpperCase()});
		}
		else{
			_numRests++;
			_piano.stop();
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
				_score = _score +10;
				console.log("A is right");
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_bKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 765 || note.position.y == 502.5 ||note.position.y ==240)){
				note.destroy();
				console.log("B is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_cKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 727.5 || note.position.y == 465 || note.position.y ==202.5)){
				note.destroy();
				console.log("C is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_dKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 690 || note.position.y == 427.5)){
				note.destroy();
				console.log("D is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_eKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y ==652.5 || note.position.y == 390)){
				note.destroy();
				console.log("E is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_fKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 615 || note.position.y == 352.5)){
				note.destroy();
				console.log("F is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
			else if(_gKey.isDown && note.position.x>=390 && note.x<=480 && (note.position.y == 577.5 || note.position.y == 315)){
				note.destroy();
				console.log("G is right!");
				_score = _score+10;
				_scoreText.setText("SCORE: " + _score);
				this.playNote();
				_salieri.x+=10;
			}
		}
		,this);
	}

};
