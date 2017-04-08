var Accelerando = Accelerando || {};
var _startTime;
var _timer;
var _score;
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

var _audio;

var _level1Notes;
var _level1Duration;
var _currentIndex = -1;
var _start_of_waited_time = 0;
var _waitedTime;
var _notes;
var _noteVelocity = 10;
var _noteHeight;

var _levelJSON;

var _elapsedDistance = 1;

Accelerando.Game = function(){};

Accelerando.Game.prototype = {
  create: function() {
    this.getLevelData();
    this.createUI();
    this.initKeys();
    this.initAudioPlayer();

    _notes = this.game.add.group();
  },

  update: function() {
    var miliSeconds = this.time.now - _startTime;
    if(miliSeconds-1000 > ((_seconds*1000) + (_minutes*60*1000)) ){
      this.updateTimer(miliSeconds);
    }

    if(_currentIndex >= 0)
      distToWait = _level1Duration[_currentIndex]*100;
    else 
      distToWait = 0;

    if(distToWait <= _elapsedDistance)
      this.spawnNote();

    _elapsedDistance += _noteVelocity;
    _notes.forEach(function(note){
      note.x = note.x - _noteVelocity;
      if(note.x <= 400)
        note.kill();
    }, this);
  },

  createUI: function() {
    _startTime = this.time.now;
    _timer = this.game.add.text(this.game.width/1.25, 60, "TIMER: 0:00", {font: "50px Arial Black", fill: "#ffffff"});
    _score = this.game.add.text(50, 60, "SCORE: 0", {font: "50px Arial Black", fill: "#ffffff"});

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
    this.game.world.bringToTop(_score);
    
  },

  updateTimer: function(miliSeconds) {
    _seconds = Math.floor(miliSeconds/1000)%60;
    _minutes = Math.floor(((miliSeconds/(1000*60))%60));
    miliSeconds = miliSeconds - (_seconds*1000 + _minutes*60*1000);
    if(_seconds < 10) _seconds = "0"+_seconds;
    _timer.setText("TIMER: "+_minutes+":"+_seconds);
  },

  pauseGame: function(){
    if(_audio.paused)
      _audio.play();
    else
      _audio.pause();
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

  initAudioPlayer: function(){
    _audio = new Audio();
    _audio.src = "benchmark2/assets/audio/splash.mp3";
    _audio.loop = true;
    _audio.play();
    _audio.playbackRate = 1;
  },

  getLevelData: function(){
    _levelJSON = this.game.cache.getJSON('levelData');
    _level1Notes = _levelJSON.levels[0].notes;
    _level1Duration = _levelJSON.levels[0].duration;
  },

  spawnNote: function(){
    _currentIndex++;
    _elapsedDistance = 0;
    this.findNoteHeight();
    if(_level1Duration[_currentIndex] == 1){
      note = this.game.add.sprite(this.game.width+40, _noteHeight, 'quarter_note');
      note.anchor.y = 0.78823529411;
    }
    else if(_level1Duration[_currentIndex] == 2){
      note = this.game.add.sprite(this.game.width+40, _noteHeight, 'half_note');
      note.anchor.y = 0.78823529411;
    }
    else if(_level1Duration[_currentIndex] == 3){

    }
    else if(_level1Duration[_currentIndex] == 4){
      note = this.game.add.sprite(this.game.width+40, _noteHeight, 'whole_note');
      note.anchor.y = 0.5;
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
  }
};