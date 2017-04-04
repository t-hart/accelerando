var Accelerando = Accelerando || {};

Accelerando.game = new Phaser.Game(960, 540, Phaser.AUTO, '');

Accelerando.game.state.add('Boot', Accelerando.Boot);
Accelerando.game.state.add('Preload', Accelerando.Preload);
Accelerando.game.state.add('Game', Accelerando.Game);

Accelerando.game.state.start('Boot');