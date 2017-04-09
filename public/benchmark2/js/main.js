var Accelerando = Accelerando || {};

Accelerando.game = new Phaser.Game(1920, 1080, Phaser.AUTO, '');

Accelerando.game.state.add('Boot', Accelerando.Boot);
Accelerando.game.state.add('Preload', Accelerando.Preload);
Accelerando.game.state.add('Splash', Accelerando.Splash);
Accelerando.game.state.add('MainMenu', Accelerando.MainMenu);
Accelerando.game.state.add('ControlsMenu', Accelerando.ControlsMenu);
Accelerando.game.state.add('LevelSelection', Accelerando.LevelSelection);
Accelerando.game.state.add('Game', Accelerando.Game);
Accelerando.game.state.add('HelpMenu',Accelerando.HelpMenu);

Accelerando.game.state.start('Boot');
