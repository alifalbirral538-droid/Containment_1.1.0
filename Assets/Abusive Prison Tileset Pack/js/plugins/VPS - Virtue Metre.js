//--------------------------------------------------------------------------
// VPS - Virtue Metre.js
//--------------------------------------------------------------------------
/*:
*@plugindesc v1.0 Displays a virtue / karma / morality values of the party.
*@author Soulpour777
*
*@help
* Thank for you for using Virtue Metre. In the Plugin Manager, you can setup
which variable represents each virtue.

SETTING UP THE VARIABLES TO SHOW
By default, the plugin sets it up as
1 to 8. If you also leave it blank, the plugin will make it as what the
default values given to them are (which is 1 to 8).

PLUGIN COMMANDS
To show the Virtue Metre, use the plugin command:

open_virtue

After installing, place all the proper images on the img / systems folder.

* @param Virtue Names
* @desc Names of the Eight Virtues you are displaying.
* @default Honesty, Compassion, Valor, Justice, Sacrifice, Honor, Spirituality, Humility
*
* @param Virtue Title
* @desc Text on top that indicates what the variables are.
* @default Party Virtues
*
* @param Max Virtue Values
* @desc Maximum Value of All Virtues
* @default 9999
*
* @param Scene Background
* @desc The background image displayed before the virtues.
* @default virtuebackground
*
* @param Particle Image
* @desc The particle image displayed on the scene.
* @default particleD
*
*
* @param Honesty Variable Id
* @desc Variable Id that handles all your value of Honesty. Default: 1
* @default 1
*
* @param Compassion Variable Id
* @desc Variable Id that handles all your value of Compassion. Default: 2
* @default 2
*
* @param Valor Variable Id
* @desc Variable Id that handles all your value of Valor. Default: 3
* @default 3
*
* @param Justice Variable Id
* @desc Variable Id that handles all your value of Justice. Default: 4
* @default 4
*
* @param Sacrifice Variable Id
* @desc Variable Id that handles all your value of Sacrifice. Default: 5
* @default 5
*
* @param Honor Variable Id
* @desc Variable Id that handles all your value of Honor. Default: 6
* @default 6
*
* @param Spirituality Variable Id
* @desc Variable Id that handles all your value of Spirituality. Default: 7
* @default 7
*
* @param Humility Variable Id
* @desc Variable Id that handles all your value of Humility. Default: 8
* @default 8
*
*/
if (!Soulpour777) {
    var Soulpour777 = Soulpour777 || {};
}

Soulpour777.params = PluginManager.parameters('VPS - Virtue Metre');
Soulpour777.VirtueMetre = {};
Soulpour777.VirtueMetre.virtues = Soulpour777.params['Virtue Names'].split(/\s*,\s*/).filter(function(value) { return !!value; });
Soulpour777.VirtueMetre.virtueName = String(Soulpour777.params['Virtue Title'] || "Party Virtues");
Soulpour777.VirtueMetre.maxVirtueValues = Number(Soulpour777.params['Max Virtue Values'] || 9999);
Soulpour777.VirtueMetre.Honesty = Number(Soulpour777.params['Honesty Variable Id'] || 1);
Soulpour777.VirtueMetre.Compassion = Number(Soulpour777.params['Compassion Variable Id'] || 2);
Soulpour777.VirtueMetre.Valor = Number(Soulpour777.params['Valor Variable Id'] || 3);
Soulpour777.VirtueMetre.Justice = Number(Soulpour777.params['Justice Variable Id'] || 4);
Soulpour777.VirtueMetre.Sacrifice = Number(Soulpour777.params['Sacrifice Variable Id'] || 5);
Soulpour777.VirtueMetre.Honor = Number(Soulpour777.params['Honor Variable Id'] || 6);
Soulpour777.VirtueMetre.Spirituality = Number(Soulpour777.params['Spirituality Variable Id'] || 7);
Soulpour777.VirtueMetre.Humility = Number(Soulpour777.params['Humility Variable Id'] || 8);
Soulpour777.VirtueMetre.Background = String(Soulpour777.params['Scene Background'] || ""); // if no image found
Soulpour777.VirtueMetre.ParticleImage = String(Soulpour777.params['Particle Image'] || ""); // if no image found
Soulpour777.VirtueMetre.VirtueGraph = String(Soulpour777.params['Virtue Graph'] || ""); // if no image found
function VPS_WindowVirtue() {
    this.initialize.apply(this, arguments);
}

VPS_WindowVirtue.prototype = Object.create(Window_Base.prototype);
VPS_WindowVirtue.prototype.constructor = VPS_WindowVirtue;

VPS_WindowVirtue.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

VPS_WindowVirtue.prototype.windowWidth = function() {
    return Graphics.width;
};

VPS_WindowVirtue.prototype.windowHeight = function() {
    return Graphics.height;
};

VPS_WindowVirtue.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawTextEx(Soulpour777.VirtueMetre.virtueName, Graphics.width / 2 - 100, 0);
    this.drawVirtue(Soulpour777.VirtueMetre.Honesty, 0, 60, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Compassion, Graphics.width / 2 - 300, 120, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Valor, Graphics.width / 2 - 200, 180, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Justice, 0, 240, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Sacrifice, Graphics.width / 2 - 300, 300, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Honor, Graphics.width / 2 - 200, 360, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Spirituality, 0, 420, Graphics.width / 2);
    this.drawVirtue(Soulpour777.VirtueMetre.Humility, Graphics.width / 2 - 300, 480, Graphics.width / 2);
};

VPS_WindowVirtue.prototype.drawVirtue = function(variableId, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();

    this.drawGauge(x, y, width, $gameVariables.value(variableId) / Soulpour777.VirtueMetre.maxVirtueValues, this.hpGaugeColorEX(), this.hpGaugeColorEXII());
    this.changeTextColor(this.systemColor());
    this.drawText(Soulpour777.VirtueMetre.virtues[variableId-1], x, y-10, 600);
    this.drawCurrentAndMax($gameVariables.value(variableId), Soulpour777.VirtueMetre.maxVirtueValues, x, y, width,
                           color1, color2);
};

Window_Base.prototype.hpGaugeColorEX = function() {
    return this.textColor(11);
};

Window_Base.prototype.hpGaugeColorEXII = function() {
    return this.textColor(3);
};

VPS_WindowVirtue.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

function VPS_SceneVirtue() {
    this.initialize.apply(this, arguments);
}

VPS_SceneVirtue.prototype = Object.create(Scene_MenuBase.prototype);
VPS_SceneVirtue.prototype.constructor = VPS_SceneVirtue;

VPS_SceneVirtue.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

VPS_SceneVirtue.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
};

VPS_SceneVirtue.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.startFadeIn(60, false);
    this.createParticleZ();
    this.createVirtueWindow();
};


VPS_SceneVirtue.prototype.createParticleZ = function() {
    this._particleZ = new ParticleZ();
    this.addChild(this._particleZ);
}

VPS_SceneVirtue.prototype.updateParticleZ = function() {
    this._particleZ.type = 'snow';
    this._particleZ.power = 1;
    this._particleZ.origin.x = 0;
    this._particleZ.origin.y = 1;
};

VPS_SceneVirtue.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem(Soulpour777.VirtueMetre.Background);
    this.addChild(this._backSprite);
}

VPS_SceneVirtue.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.updateParticleZ();
    if (Input.isTriggered('cancel')) {
        SoundManager.playCancel();
        SceneManager.push(SceneManager._previousClass);
    }
}

VPS_SceneVirtue.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this.removeChild(this._particleZ);
    this.startFadeOut(60, false);
}

VPS_SceneVirtue.prototype.createVirtueWindow = function() {
    this._virtuewindow = new VPS_WindowVirtue(0, 0);
    this._virtuewindow.opacity = 0;
    this.addWindow(this._virtuewindow);
};

function ParticleZ() {
    this.initialize.apply(this, arguments);
}

ParticleZ.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
ParticleZ.prototype.constructor = ParticleZ;

ParticleZ.prototype.initialize = function() {
    PIXI.DisplayObjectContainer.call(this);

    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];

    this._createBitmaps();

    /**
     * @property type
     * @type String
     */
    this.type = 'none';

    /**
     * The power of the ParticleZ in the range (0, 9).
     *
     * @property power
     * @type Number
     */
    this.power = 0;

    /**
     * The origin point of the ParticleZ for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();
};

/**
 * Updates the ParticleZ for each frame.
 *
 * @method update
 */
ParticleZ.prototype.update = function() {
    this._updateAllSprites();
};

/**
 * @method _createBitmaps
 * @private
 */
ParticleZ.prototype._createBitmaps = function() {
    this._snowBitmap = new Bitmap(9, 9);
    this._snowBitmap = ImageManager.loadSystem(Soulpour777.VirtueMetre.ParticleImage);
};


/**
 * @method _updateAllSprites
 * @private
 */
ParticleZ.prototype._updateAllSprites = function() {
    var maxSprites = Math.floor(this.power * 10);
    while (this._sprites.length < maxSprites) {
        this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
        this._removeSprite();
    }
    this._sprites.forEach(function(sprite) {
        this._updateSprite(sprite);
        sprite.x = sprite.ax - this.origin.x;
        sprite.y = sprite.ay - this.origin.y;
    }, this);
};

/**
 * @method _addSprite
 * @private
 */
ParticleZ.prototype._addSprite = function() {
    var sprite = new Sprite(this.viewport);
    sprite.opacity = 0;
    this._sprites.push(sprite);
    this.addChild(sprite);
};

/**
 * @method _removeSprite
 * @private
 */
ParticleZ.prototype._removeSprite = function() {
    this.removeChild(this._sprites.pop());
};

/**
 * @method _updateSprite
 * @param {Sprite} sprite
 * @private
 */
ParticleZ.prototype._updateSprite = function(sprite) {
    switch (this.type) {
    case 'snow':
        this._updateSnowSprite(sprite);
        break;
    }
    if (sprite.opacity < 40) {
        this._rebornSprite(sprite);
    }
};


/**
 * @method _updateSnowSprite
 * @param {Sprite} sprite
 * @private
 */
ParticleZ.prototype._updateSnowSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 0;
    sprite.ay += -0.50;
    sprite.opacity -= 3;
};

/**
 * @method _rebornSprite
 * @param {Sprite} sprite
 * @private
 */
ParticleZ.prototype._rebornSprite = function(sprite) {
    sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
    sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
    sprite.opacity = 160 + Math.randomInt(60);
};

Soulpour777.VirtueMetre.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Soulpour777.VirtueMetre.pluginCommand.call(this, command, args);
    if (command === "open_virtue") {
        SceneManager.push(VPS_SceneVirtue);
    }
};
