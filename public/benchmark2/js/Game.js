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

var noteEnum = {
  c2 : 500,
  d2 : 500,
  e2 : 500,
  f2 : 500,
  g2 : 500,
  a2 : 500,
  b2 : 500,
  c3 : 500,
  d3 : 500,
  e3 : 500,
  f3 : 500,
  g3 : 500,
  a3 : 500,
  b3 : 500,
  c4 : 500,
  d4 : 500,
  e4 : 500,
  f4 : 500,
  g4 : 500,
  a4 : 500,
  b4 : 500,
  c5 : 500,
  d5 : 500,
  e5 : 500,
  f5 : 500,
  g5 : 500,
  a5 : 500,
  b5 : 500
};

Accelerando.Game = function(){};

Accelerando.Game.prototype = {
  create: function() {
    levelJSON = this.game.cache.getJSON('levelData');
    console.log(levelJSON.levels[0].notes);
    this.createUI();
    this.initKeys();
    this.initAudioPlayer();
  },

  update: function() {
    var miliSeconds = this.time.now - _startTime;
    if(miliSeconds-1000 > ((_seconds*1000) + (_minutes*60*1000)) ){
      this.updateTimer(miliSeconds);
      console.log('update');
    }
    var qNote = this.game.add.sprite(this.game.width/2, this.game.height/2, 'quarter_note');
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
  }
};