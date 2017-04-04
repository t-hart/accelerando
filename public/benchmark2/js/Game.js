var Accelerando = Accelerando || {};

//title screen
Accelerando.Game = function(){};

Accelerando.Game.prototype = {
  create: function() {
    var style = { font: "italic bold 16px Arial", fill: "#fff", boundsAlignH: "middle", boundsAlignV: "middle" };
    text = this.game.add.text(0, 0, "Accelerando\nBenchmark #2\nInitial Commit", style);
  },

  update: function() {
  
  }
};