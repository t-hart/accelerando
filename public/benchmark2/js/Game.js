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

Accelerando.Game = function(){};

Accelerando.Game.prototype = {
  create: function() {
    this.createUI();
    this.initKeys();
  },

  update: function() {
    var miliSeconds = this.time.now - _startTime;
    if(miliSeconds-1000 > ((_seconds*1000) + (_minutes*60*1000)) ){
      this.updateTimer(miliSeconds);
      console.log('update');
    }
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
    console.log('pause button pressed');
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
  }
};