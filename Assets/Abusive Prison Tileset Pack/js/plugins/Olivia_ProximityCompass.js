//=============================================================================
// Olivia Engine - Proximity Compass - for RPG Maker MV version 1.6.1
// Olivia_ProximityCompass.js
//=============================================================================
 /*:
 * @plugindesc <ProximityCompass> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 *
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Default Show: Show the compass by default on the screen. This is the system
 * setting for the game. The player setting will bypass this if the player
 * chooses to hide the compass.
 *
 * Default Proximity: This is the default proximity range for icons to show up
 * on the compass (otherwise, they fade away). This is the distance in tiles
 * and not pixels. Make this as a high number if you want icons to always show.
 *
 * Player Icon: This is the default icon used to indicate the player's position
 * at the center of the compass.
 *
 *
 *
 * X Center, Y Center: These settings are the code used to determine the center
 * coordinates of the compass.
 *
 * Radius: This is the radius (in pixels) for the compass from the center. This
 * will be adjusted for if the player decides to change the Compass Size.
 *
 * Tile Scale: The scale used to calculate the distance of a tile relative to
 * the distance on the compass.
 *
 * Back Color: The color used for the back of the compass.
 *
 * Compass Frame: The picture used for the compass' frame. This will come from
 * the img/pictures/ folder. An image will be provided in the sample project.
 *
 * Compass Fade Speed: Fade speed of the compass when toggled on/off. Lower is
 * slower. Higher is faster.
 *
 * Icon Fade Speed: Fade speed of the icons when out of range. Lower is slower.
 * Higher is faster.
 *
 * Hide During Messages: Gives option to hide during message events.
 * Does not apply when the player is simply performing movement actions or
 * receiving items.
 * 
 * Hide During Events: Gives option to hide during any event except parallel
 * events. This is more wide covered than Hide During Messages.
 *
 *
 *
 * Show Compass: Text in options menu to show the compass.
 *
 * Compass Size: Text in the options menu to change the compass size.
 *
 *
 *
 * --------
 * Notetags
 * --------
 *
 * <Hide Compass>
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 *
 *
 * ------------
 * Comment Tags
 * ------------
 *
 * To add a compass icon to an event, make a comment in the event list and add
 * these comment tags:
 *
 * <Compass Icon: x>
 * - This will set the event's icon to x.
 *
 * <Compass Proximity: x>
 * - This icon will only appear on the compass if the player is within x tiles.
 *
 * 
 *
 * ---------------
 * Plugin Commands
 * ---------------
 *
 * ShowCompass
 * HideCompass
 * ToggleCompass
 * - This will show, hide, or toggle the compass from view. If shown, this will
 * make the compass visible, unless the player opts to hide the compass or if
 * the map has a <Hide Compass> notetag.
 *
 * PlayerCompassIcon x
 * - Changes the player's compass icon to x.
 *
 * 
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 *
 *
 * -------------
 * Compatibility
 * -------------
 *
 * This plugin is compatible with the following plugins:
 *
 * - Yanfly - YEP Options Core
 *
 * Place this plugin under those in the Plugin Manager list. Otherwise, I cannot
 * guarantee this plugin will work as intended. I am NOT responsible for the
 * compatibility of the plugins not shown in the above list.
 *
 *
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins.
 *
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Default
 *
 * @param Default Show
 * @parent Default
 * @type boolean
 * @on Yes
 * @off No
 * @desc If yes, show compass by default
 * @default true
 *
 * @param Default Proximity
 * @parent Default
 * @type number
 * @min 1
 * @desc Maximum tile distance for event proximity to show on compass.
 * @default 1000
 *
 * @param Player Icon
 * @parent Default
 * @desc Icon used for the player to show on the compass.
 * @default 15
 *
 * @param
 *
 * @param Compass Settings
 *
 * @param X Center
 * @parent Compass Settings
 * @desc Code used to calculate the X position of the compass's center. This is NOT the upper left corner of the compass.
 * @default Graphics.boxWidth - 128 * ConfigManager.compassSize / 100
 *
 * @param Y Center
 * @parent Compass Settings
 * @desc Code used to calculate the Y position of the compass's center. This is NOT the upper left corner of the compass.
 * @default Graphics.boxHeight - 128 * ConfigManager.compassSize / 100
 *
 * @param Radius
 * @parent Compass Settings
 * @type number
 * @min 1
 * @desc Radius in pixels
 * @default 100
 *
 * @param Tile Scale
 * @parent Compass Settings
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param Back Color
 * @parent Compass Settings
 * @desc The color used for the back of the compass.
 * 'rgba(red, green, blue, alpha)'
 * @default rgba(0,0,0,0.8)
 *
 * @param Compass Frame
 * @parent Compass Settings
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder
 * @default CompassFrame
 *
 * @param Compass Fade Speed
 * @parent Compass Settings
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off. Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Icon Fade Speed
 * @parent Compass Settings
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range. Lower is slower. Higher is faster.
 * @default 8
 *
 * @param Hide During Messages
 * @parent Compass Settings
 * @type boolean
 * @on Yes
 * @off No
 * @desc If yes, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param Hide During Events
 * @parent Compass Settings
 * @type boolean
 * @on Yes
 * @off No
 * @desc If yes, hide compass whenever an event is running
 * @default false
 *
 * @param
 * 
 * @param Options Settings
 *
 * @param Show Compass
 * @parent Options Settings
 * @desc Text in options menu to show the compass.
 * @default Show Compass
 *
 * @param Compass Size
 * @parent Options Settings
 * @desc Text in the options menu to change the compass size.
 * @default Compass Size
 *
 * @param
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_ProximityCompass = true;

var Olivia = Olivia || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<ProximityCompass>') })[0].parameters;

Olivia.ProximityCompass = {
    // Defaults
    defaultShow:      eval(parameters['Default Show']),
    defaultProximity: Number(parameters['Default Proximity']),
    playerIcon:       Number(parameters['Player Icon']),
    // Compass Settings
    x:                String(parameters['X Center']),
    y:                String(parameters['Y Center']),
    radius:           Number(parameters['Radius']),
    tileScale:        Number(parameters['Tile Scale']),
    color:            String(parameters['Back Color']),
    frame:            String(parameters['Compass Frame']),
    compassFadeSpeed: Number(parameters['Compass Fade Speed']),
    iconFadeSpeed:    Number(parameters['Icon Fade Speed']),
    hideMessage:      eval(String(parameters['Hide During Messages'] || 'false')),
    hideEvent:        eval(String(parameters['Hide During Events'] || 'false')),
    // Option Settings
    optionShow: String(parameters['Show Compass']),
    showDefault: true,
    optionSize: String(parameters['Compass Size']),
    originalScale: 100,
};

//-----------------------------------------------------------------------------
// ConfigManager
//
// The static class that manages the configuration data.

ConfigManager.showCompass = Olivia.ProximityCompass.showDefault;
ConfigManager.compassSize = Olivia.ProximityCompass.originalScale;

Olivia.ProximityCompass.___ConfigManager_makeData___ = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Olivia.ProximityCompass.___ConfigManager_makeData___.call(this);
    config.showCompass = this.showCompass;
    config.compassSize = this.compassSize;
    return config;
};

Olivia.ProximityCompass.___ConfigManager_applyData___ = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Olivia.ProximityCompass.___ConfigManager_applyData___.call(this, config);
    if (config.showCompass === undefined) {
        this.showCompass = Olivia.ProximityCompass.showDefault;
    } else {
        this.showCompass = config.showCompass;
    }
    if (config.compassSize === undefined) {
        this.compassSize = Olivia.ProximityCompass.originalScale;
    } else {
        this.compassSize = config.compassSize;
    }
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Olivia.ProximityCompass.___Game_System_initialize___ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Olivia.ProximityCompass.___Game_System_initialize___.call(this);
    this.initializeProximityCompass();
};

Game_System.prototype.initializeProximityCompass = function() {
    this._showProximityCompass = Olivia.ProximityCompass.defaultShow;
    this._playerCompassIcon = Olivia.ProximityCompass.playerIcon;
};

Game_System.prototype.isShowProximityCompass = function() {
    if (this._showProximityCompass === undefined) {
        this.initializeProximityCompass();
    }
    return this._showProximityCompass;
};

Game_System.prototype.setShowProximityCompass = function(value) {
    if (this._showProximityCompass === undefined) {
        this.initializeProximityCompass();
    }
    this._showProximityCompass = value;
};

Game_System.prototype.getPlayerCompassIcon = function() {
    if (this._playerCompassIcon === undefined) {
        this.initializeProximityCompass();
    }
    return this._playerCompassIcon;
};

Game_System.prototype.setPlayerCompassIcon = function(value) {
    if (this._playerCompassIcon === undefined) {
        this.initializeProximityCompass();
    }
    this._playerCompassIcon = value;
};

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

Game_Map.prototype.hideCompass = function() {
    if (!ConfigManager.showCompass) {
        return true;
    } else if (!!$dataMap && !!$dataMap.note) {
        return $dataMap.note.match(/<Hide Compass>/i);
    } else {
        return false;
    }
};

//-----------------------------------------------------------------------------
// Game_Event
//
// The game object class for an event. It contains functionality for event page
// switching and running parallel process events.

Olivia.ProximityCompass.___Game_Event_setupPage___ =Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Olivia.ProximityCompass.___Game_Event_setupPage___.call(this);
    this.setupCompassIconIndex();
};

Game_Event.prototype.setupCompassIconIndex = function() {
    this._compassIconIndex = 0;
    this._compassProximity = Olivia.ProximityCompass.defaultProximity;
    if (this.page()) {
        var list = this.list();
        var length = list.length;
        for (var i = 0; i < length; ++i) {
          var item = list[i];
          if ([108, 408].contains(item.code)) {
            if (item.parameters[0].match(/<COMPASS ICON: (\d+)>/i)) {
                this._compassIconIndex = parseInt(RegExp.$1);
            }
            if (item.parameters[0].match(/<COMPASS PROXIMITY: (\d+)>/i)) {
                this._compassProximity = parseInt(RegExp.$1);
            }
          }
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

Olivia.ProximityCompass.___Game_Interpreter_pluginCommand___ = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Olivia.ProximityCompass.___Game_Interpreter_pluginCommand___.call(this, command, args);
    if (command.match(/ShowCompass/i)) {
        $gameSystem.setShowProximityCompass(true);
    } else if (command.match(/HideCompass/i)) {
        $gameSystem.setShowProximityCompass(false);
    } else if (command.match(/ToggleCompass/i)) {
        var state = $gameSystem.isShowProximityCompass();
        $gameSystem.setShowProximityCompass(!state);
    } else if (command.match(/PlayerCompassIcon/i)) {
        $gameSystem.setPlayerCompassIcon(parseInt(args[0]));
    }
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// The set of sprites on the map screen.

Olivia.ProximityCompass.___Spriteset_Map_createLowerLayer___ = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    Olivia.ProximityCompass.___Spriteset_Map_createLowerLayer___.call(this);
    this.createProximityCompass();
};

Spriteset_Map.prototype.createProximityCompass = function() {
    this._ProximityCompassSprite = new Sprite_ProximityCompass();
    this.addChild(this._ProximityCompassSprite);
};

//-----------------------------------------------------------------------------
// Sprite_ProximityCompass
//
// The set of sprites that make up the ProximityCompass

function Sprite_ProximityCompass() {
    this.initialize.apply(this, arguments);
}

Sprite_ProximityCompass.prototype = Object.create(Sprite_Base.prototype);
Sprite_ProximityCompass.prototype.constructor = Sprite_ProximityCompass;

Sprite_ProximityCompass.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.createSprites();
    this.x = eval(Olivia.ProximityCompass.x);
    this.y = eval(Olivia.ProximityCompass.y);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.blendMode = 2;
    if (!this.isShow()) {
        this.opacity = 0;
    }
    this.scale.x = ConfigManager.compassSize * 0.01;
    this.scale.y = ConfigManager.compassSize * 0.01;
};

Sprite_ProximityCompass.prototype.createSprites = function() {
    this.createBackground();
    this.createFrame();
    this.createCharacters();
};

Sprite_ProximityCompass.prototype.createBackground = function() {
    this._ProximityCompassBackgroundSprite = new Sprite();
    this.addChild(this._ProximityCompassBackgroundSprite);
    this._ProximityCompassBackgroundSprite.anchor.x = 0.5;
    this._ProximityCompassBackgroundSprite.anchor.y = 0.5;
    var w = Olivia.ProximityCompass.radius * 2;
    var h = Olivia.ProximityCompass.radius * 2;
    var c = Olivia.ProximityCompass.color;
    this._ProximityCompassBackgroundSprite.bitmap = new Bitmap(w, h)
    this._ProximityCompassBackgroundSprite.bitmap.drawCircle(w/2, h/2, w/2, c);
};

Sprite_ProximityCompass.prototype.createFrame = function() {
    this._ProximityCompassFrameSprite = new Sprite();
    this.addChild(this._ProximityCompassFrameSprite);
    this._ProximityCompassFrameSprite.anchor.x = 0.5;
    this._ProximityCompassFrameSprite.anchor.y = 0.5;
    this._ProximityCompassFrameSprite.bitmap = ImageManager.loadPicture(Olivia.ProximityCompass.frame);
};

Sprite_ProximityCompass.prototype.createCharacters = function() {
    this._characterSprites = [];
    $gameMap.events().forEach(function(event) {
        this._characterSprites.push(new Sprite_CompassIcon(event));
    }, this);
    this._characterSprites.push(new Sprite_CompassIcon($gamePlayer));
    for (var i = 0; i < this._characterSprites.length; i++) {
        this.addChild(this._characterSprites[i]);
    }
};

Sprite_ProximityCompass.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateOpacity();
};

Sprite_ProximityCompass.prototype.updateOpacity = function() {
    if (this.isShow()) {
        this.opacity += Olivia.ProximityCompass.compassFadeSpeed;
    } else {
        this.opacity -= Olivia.ProximityCompass.compassFadeSpeed;
    }
};

Sprite_ProximityCompass.prototype.isShow = function() {
    if ($gameMap.hideCompass()) {
        return false;
    } else if (Olivia.ProximityCompass.hideMessage && $gameMessage.isBusy()) {
        return false;
    } else if (Olivia.ProximityCompass.hideEvent && $gameMap.isEventRunning()) {
        return false;
    } else if (SceneManager.isSceneChanging()) {
        return false;
    } else {
        return $gameSystem.isShowProximityCompass();
    }
};

//-----------------------------------------------------------------------------
// Sprite_CompassIcon
//
// The sprite for displaying a compass Icon.

function Sprite_CompassIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_CompassIcon.prototype = Object.create(Sprite.prototype);
Sprite_CompassIcon.prototype.constructor = Sprite_CompassIcon;

Sprite_CompassIcon.prototype.initialize = function(character) {
    this._character = character;
    this._iconIndex = 0;
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.loadBitmap();
    var scale = 1 / (ConfigManager.compassSize * 0.01);
    this.scale.x = scale;
    this.scale.y = scale;
    this.setInitialOpacity();
};

Sprite_CompassIcon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem('IconSet');
};

Sprite_CompassIcon.prototype.setInitialOpacity = function() {
    if (this._character === $gamePlayer) {
        this.opacity = 255;
    } else {
        var proximity = this._character._compassProximity;
        var deltaX = $gameMap.deltaX(this._character._realX, $gamePlayer._realX);
        var deltaY = $gameMap.deltaX(this._character._realY, $gamePlayer._realY);
        if (proximity >= Math.abs(deltaX) + Math.abs(deltaY)) {
            this.opacity = 255;
        } else {
            this.opacity = 0;
        }
    }
};

Sprite_CompassIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpacity();
    this.updateFrame();
    this.updatePosition();
};

Sprite_CompassIcon.prototype.updateOpacity = function() {
    if (this._character === $gamePlayer) {
        this.opacity = 255;
    } else {
        var proximity = this._character._compassProximity;
        var deltaX = $gameMap.deltaX(this._character._realX, $gamePlayer._realX);
        var deltaY = $gameMap.deltaX(this._character._realY, $gamePlayer._realY);
        if (proximity >= Math.abs(deltaX) + Math.abs(deltaY)) {
            this.opacity += Olivia.ProximityCompass.iconFadeSpeed;
        } else {
            this.opacity -= Olivia.ProximityCompass.iconFadeSpeed;
        }
    }
};

Sprite_CompassIcon.prototype.updateFrame = function() {
    if (this._character === $gamePlayer) {
        this._iconIndex = $gameSystem.getPlayerCompassIcon();
    } else {
        this._iconIndex = this._character._compassIconIndex;
    }
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
};

Sprite_CompassIcon.prototype.updatePosition = function() {
    var radius = Olivia.ProximityCompass.radius;
    var tileScale = Olivia.ProximityCompass.tileScale * $gameMap.tileWidth();
    var deltaX = $gameMap.deltaX(this._character._realX, $gamePlayer._realX) * tileScale;
    var deltaY = $gameMap.deltaX(this._character._realY, $gamePlayer._realY) * tileScale;
    var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (dist < radius) {
        this.x = deltaX;
        this.y = deltaY;
    } else {
        var angle = Math.atan2(deltaY, deltaX);
        this.x = radius * Math.cos(angle);
        this.y = radius * Math.sin(angle);
    }
};

//-----------------------------------------------------------------------------
// Window_Options
//
// The window for changing various settings on the options screen.

Olivia.ProximityCompass.___Window_Options_addGeneralOptions___ = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Olivia.ProximityCompass.___Window_Options_addGeneralOptions___.call(this);
    if (!Imported.YEP_OptionsCore) {
        this.addCommand(Olivia.ProximityCompass.optionShow, 'showCompass');
        this.addCommand(Olivia.ProximityCompass.optionSize, 'compassSize');
    }
};

Olivia.ProximityCompass.___Window_Options_isVolumeSymbol___ = Window_Options.prototype.isVolumeSymbol;
Window_Options.prototype.isVolumeSymbol = function(symbol) {
    if (symbol.match(/compassSize/i)) {
        return true;
    } else {
        return Olivia.ProximityCompass.___Window_Options_isVolumeSymbol___.call(this, symbol);
    }
};

Olivia.ProximityCompass.___Window_Options_processOk___ = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var symbol = this.commandSymbol(this.index());
    if (symbol.match(/compassSize/i)) {
        var value = this.getConfigValue(symbol);
        value += 10;
        if (value > 100) {
            value = 50;
        }
        value = value.clamp(50, 100);
        this.changeValue(symbol, value);
    } else {
        Olivia.ProximityCompass.___Window_Options_processOk___.call(this);
    }
};

Olivia.ProximityCompass.___Window_Options_cursorRight___ = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
    var symbol = this.commandSymbol(this.index());
    if (symbol.match(/compassSize/i)) {
        var value = this.getConfigValue(symbol);
        value += 10;
        value = value.clamp(50, 100);
        this.changeValue(symbol, value);
    } else {
        Olivia.ProximityCompass.___Window_Options_cursorRight___.call(this, wrap);
    }
};

Olivia.ProximityCompass.___Window_Options_cursorLeft___ = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
    var symbol = this.commandSymbol(this.index());
    if (symbol.match(/compassSize/i)) {
        var value = this.getConfigValue(symbol);
        value -= 10;
        value = value.clamp(50, 100);
        this.changeValue(symbol, value);
    } else {
        Olivia.ProximityCompass.___Window_Options_cursorLeft___.call(this);
    }
};



















