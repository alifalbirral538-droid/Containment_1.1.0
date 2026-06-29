//=======================================================================
// Title Screen Add-On Plugin v1.7 (RMMV v1.3)
//=======================================================================
// * The Title Screen Add-On plugin was originally written specifically
//   for  "The  Adventures  of Tryggr",  but it  comprised many  of the
//   pluginlets I wrote for RMMV after its initial release.
//
//   This plugin was going to be released after the game's release, but
//   I decided not to do that.  The original version of this plugin was
//   heavily modified  for the game, with several  settings overwritten
//   for its purposes too.
//
//   With the public release,  everything has been  properly organized,
//   aliased and referenced.  Since its release, the plugin has evolved
//	 into something beyond its original purposes.
//
//
//       * © 2015-2017, Companion Wulf
//
//========================================================================
// CW_TitleScreenAddon.js
//=======================================================================

var Imported = Imported || {}; Imported.CW_TitleScreenAddon = true;
var CWT = CWT || {}; CWT.Ttl = CWT.Ttl || {};

CWT.TitleScreenAddon = {
	Version: 	1.7,
	Build: 		31.18,
	Copyright: 	'© 2015-2017, Companion Wulf',
	MVBuild: 	1.3,
	Error: 		'This plugin is compatible with RMMV version 1.3. You appear to have an older version, so errors may occur. Please update your copy of RMMV (see the Help files for details.)'
};

/*:
 @plugindesc Adds elements (including animation) to the Title Screen.
 @author Companion Wulf
 
 @param--+ Pretitle Movie +--
 @desc
 
 @param Pretitle Movie Toggle
 @desc Toggles pretitle movie On or Off.
 @default On
 
 @param Movie Name
 @desc The name of the movie for the pretitle.
 @default PretitleMovie


 @param
 @desc
 @param --+ Main Title +--
 @desc

 @param Skip Title
 @desc Skip the Title Screen.
 @default Yes

 @param Title Font
 @desc The name of the font for the main title.
 @default GameFont
 
 @param Title Font Size
 @desc The size of the game title font.
 @default 70
 
 @param Title Font Color
 @desc The color of the title font.
 @default White
 
 @param Title Outline Color
 @desc The outline color of the title.
 @default Red

 @param Title Effect
 @desc The effect for the game title (Normal or Splash).
 @default Normal

 @param Splash Effect Area
 @desc The area width of the splash Title Effect.
 @default 30


 @param
 @desc
 @param --+ Title Header +--
 @desc
 
 @param Toggle Title Header
 @desc Show/hide the header pretitle.
 @default On
 
 @param Header Title
 @desc The text to appear above the game's main title.
 @default RPG Maker Times Presents

 
 @param
 @desc
 @param --+ Footer Subtitle +--
 @desc
 
 @param Toggle Title Footer
 @desc The subtitle to appear below the game's main title.
 @default On
 
 @param Footer Title
 @desc The below the game's main title.
 @default An RPG Maker MV Game


 @param
 @desc
 @param --+ Subtitle Settings +--
 @desc
 
 @param Subtitle Font
 @desc The subtitle font.
 @default GameFont
 
 @param Subtitle Font Size
 @desc The subtitle font size.
 @default 30
 
 @param Subtitle Color
 @desc The color of the subtitle text.
 @default Yellow
 
 @param Subtitle Outline Color
 @desc The outline color for the subtitle text.
 @default Red


 @param
 @desc
 @param --+ Menu Settings +--
 @desc

 @param Menu X Offset
 @desc Sets the X coordinate offset for the menu.
 @default 0
 
 @param Menu Y Offset
 @desc Sets the Y coordinate offset for the menu.
 @default 0
 
 @param Menu Background Type
 @desc Sets the menu background opacity. 0 = Normal; 1 = Dim; 2 = Transparent.
 @default 0


 @param
 @desc
 @param --+ Weather Effects +--
 @desc
 
 @param Weather Effect
 @desc The type of weather effect (-1 = No weather; 0 = Rain; 1 = Storm; 2 = Snow; 3 = Ash; 4 = Blood).
 @default 0
 
 @param Weather Power
 @desc The power of the weather effect.
 @default 21
 
 @param Weather Sound
 @desc Accompanying sounds for the Weather Effect.
 @default On
 
 @param Weather Sound Effect
 @desc Sounds for Rain, Storm or Snow.
 @default Storm1
 
 @param Weather SE Volume
 @desc The volume of the weather SE.
 @default 40
 
 @param Weather SE Pitch
 @desc Setting for the weather SE pitch.
 @default 0
 
 @param Weather SE Pan
 @desc The weather SE's pan effect.
 @default 0


 @param
 @desc
 @param --+ Website Command +--
 @desc
 
 @param Show Website Command
 @desc Show/hide Website command in menu (On/Off).
 @default On
 
 @param Website Command Text
 @desc The text for command to show website.
 @default Website
 
 @param Website
 @desc The URL for your website.
 @default http://rpgmakermv.rpgmakertimes.info

 @param Website Display Method
 @desc Choose to display in a Window or Browser.
 @default Window

 @param
 @desc
 @param --+ Exit Command +--
 @desc

 @param Show Exit Command
 @desc Show/hide Exit command in menu.
 @default On

 @param Exit Command Text
 @desc The text for the command to Exit.
 @default Exit

@help
 ==============================================================
  * Title Screen Add-On v1.7 [Formerly 2.7] - MV v1.3
 ==============================================================
 The Title Screen Add-On plugin has quite a number of settings.
 Many of these were separate plugins, but they were merged into
 a single plugin to make it easier to use and maintain.
 
 ==============================================================
  * Pretitle Movie *
 ==============================================================
 These settings are for the pretitle movie, which will play before
 the main Title Screen.

 --------------------------------------------------------------
  Pretitle Movie Toggle
 --------------------------------------------------------------
 You can show/hide the Pretitle Movie Toggle by setting the parameter 
 to either ON or OFF. You can also set this to TRUE or FALSE if you
 prefer. (The case is not important.)
 
 --------------------------------------------------------------
  Movie Name
 --------------------------------------------------------------
 Put the movie you'd like to use for the pretitle in your project's
 "movies" folder. (This will need to be done manually, as there is
 no option in v1.3's Resource Manager to import movies.)
 
 In the Movie Name parameter put the name of your movie. There is no
 need to add the extension, as it will automatically detect it depending
 on the renderer being used.

 For movies, you should use .webm for Windows/Mac/HTM5 or .mp4 for
 mobile devices, depending which one you intend on using for your
 purpose, but include both versions just in case.

 
 ==============================================================
  * Main Title *
 ==============================================================
 These settings affect the main game title, overriding the defaults.

 --------------------------------------------------------------
  Skip Title -- New Feature: v1.7
 --------------------------------------------------------------
 Enables you to skip the main title screen. You can use YES or TRUE
 to skip it and transport to the map the player start position is
 set on, or NO or FALSE to enable the title screen.

 This won't skip past the pretitle movie, only the title screen. That
 will need to be disabled separately if you want to skip it.

 --------------------------------------------------------------
  Colors
 --------------------------------------------------------------
 All colors can be words or HTML colors (including the # suffix). For
 example, you could use 'yellow' or '#ffff00'.

 --------------------------------------------------------------
  Title Font -- New Feature: v1.7
 --------------------------------------------------------------
 This is the name of the font (not its filename). Fonts need to be
 stored in the game's "fonts" folder. Right-click on the font you
 want to use for the title, then click Preview to see the name of
 the font. Use this in the parameter setting.

 --------------------------------------------------------------
  Title Font Size
 --------------------------------------------------------------
 This changes the size of the game title. Recommended size is in
 between 60 and 120, depending on the length of your title.

 --------------------------------------------------------------
  Title Font Color
 --------------------------------------------------------------
 This is obviously the colour of the main game title.

 --------------------------------------------------------------
  Title Outline Color
 --------------------------------------------------------------
 This is the colour for the main game title's outline.

 --------------------------------------------------------------
  Title Effect
 --------------------------------------------------------------
 Add an effect to the title. There are two options to choose from:

  "Normal" - Displays the title with the default outline width.
  "Splash" - Widens the outline to enhance the title.

 --------------------------------------------------------------
  Splash Effect Area -- New Feature: v1.7
 --------------------------------------------------------------
 With this setting, you can widen the area of thesplash Title
 Effect. Recommended size is between 20 and 36, depending on the
 font and font size you're using.



 ==============================================================
  * Header/Footer Subtitles *
 ==============================================================
 These settings add text above/below the main game title respectively.
 Both can be toggled ON or OFF. Alternatively, you can use TRUE or FALSE
 if you prefer.
 
 You can change the font, font size, colour and outline colour to your
 preferences here.

 Recommended font size is in between 30 and 40.


 ==============================================================
  * Menu Settings *
 ==============================================================
 These settings change the menu position and appearance.

 --------------------------------------------------------------
  Menu X and Y Offsets
 --------------------------------------------------------------
 The Menu X and Y Ofsets reposition the title menu. Positive numbers
 add to the current position and negative numbers subtract from it.

 As an example, if the "Menu X  Offset" is set to -260, the command
 window will be moved left almost to the edge of the screen.

 --------------------------------------------------------------
  Menu Background Type
 --------------------------------------------------------------
 This enables changing the opacity of the command window in much the
 same way that messages can be displayed.

 You can set this to 0 (Normal), 1 (Dim) or 2 (Transparent).


 ==============================================================
  * Weather Effects *
 ==============================================================
 This allows weather effects on the Title Screen.

 To turn the weather effect off, set this value to -1.
 
 0 = Rain
 1 = Storm
 2 = Snow
 3 = Ash
 4 = Blood
 
 Note: If you set the Weather Power too high, it will result in a higher dim
 effect. E.g. Setting the Weather Effect to 2 (for Snow) and the Weather Power
 to 40+ will result in a "white out".
 
 --------------------------------------------------------------
  Weather Sound Effects
 --------------------------------------------------------------
 These add some sound effects to the title weather.

 Turn Weather Sounds ON or OFF (or TRUE or FALSE) according to your preference.
 
 Place all weather sound effects in the "audio/bgs" folder so they can loop
 properly. And then set the Weather Sound Effect to the sound you'd like
 accompanying your Weather Effect.

 You can also change its volume, pitch and pan settings.

 Note: If Weather Effects is turned Off (the value is set to -1), these sound
 effects will also be turned off.


 ==============================================================
  * Menu Commands *
 ==============================================================
 These commands add some additional commands to the main menu.

 --------------------------------------------------------------
  Show Website Command
 --------------------------------------------------------------
 You can toggle the Website command ON or OFF (or use TRUE or FALSE),
 depending on whether or not you'd like it as a menu command, or if
 you're using another plugin, such as my "Social Media Buttons" plugin
 (formerly "Social Media Buttons/In-Game Website") or Yanfly's
 "External Links" plugin.

 --------------------------------------------------------------
  Website Command Text
 --------------------------------------------------------------
 This is the text for the command. If you want to link to your Twitter
 account, for example, you can change it here and put your Twitter URL
 in the "Website" setting; it'll still function the same.

 --------------------------------------------------------------
  Website
 --------------------------------------------------------------
 Put the FULL website URL here. This will open in a new window or
 browser tab, depending on the "Display Method" setting.

 --------------------------------------------------------------
  Display Method
 --------------------------------------------------------------
 Select whether you'd like to open the "Website" link in an in-game
 Window or in the default Browser.

 --------------------------------------------------------------
  Show Exit Command
 --------------------------------------------------------------
 You can toggle the Exit command ON/OFF (or TRUE/FALSE).

 Note: This is only really useful for playing in a window (not in
 a browser). If using a browser, it's recommended this is set to
 OFF or FALSE.

 --------------------------------------------------------------
  Exit Command Text
 --------------------------------------------------------------
 Choose the text for the Exit Command.


 ==============================================================
  * Plugin Commands *
 ==============================================================
 There are no plugin commands.


 ==============================================================
  * Version Compatibility *
 ==============================================================
 This version is designed for use with MV v1.3, so it may not be
 compatible with previous versions. 


 ==============================================================
  * Terms & Conditions of Use *
 ==============================================================
 This plugin is free to use under CC BY-NC 4.0, useable in non-commercial
 projects only. Please refer to the RPG Maker Times blogsite for other
 details, including commercial use.

 For all Terms of Use, visit: http://wp.me/P2Vm8L-1z4
 
 Credit "Companion Wulf" or "RPG Maker Times" if using this plugin in
 your projects.

*/


// ** PLUGIN MANAGER **
(function($) {
	// ** Parameters **//
	CWT.Ttl.params = $.parameters('CW_TitleScreenAddon');

	// * Pretitle
	CWT.Ttl.pretitleToggle = String(CWT.Ttl.params['Pretitle Movie Toggle'] || 'On');
	CWT.Ttl.movieName = String(CWT.Ttl.params['Movie Name'] || 'PretitleMovie');

	// * Title
	CWT.Ttl.skipTitle = String(CWT.Ttl.params['Skip Title'] || 'Yes');
	CWT.Ttl.titleFont = String(CWT.Ttl.params['Title Font'] || 'GameFont');
	CWT.Ttl.titleFontSize = Number(CWT.Ttl.params['Title Font Size'] || 70);
	CWT.Ttl.titleFontColor = String(CWT.Ttl.params['Title Font Color'] || 'White');
	CWT.Ttl.titleOutlineColor = String(CWT.Ttl.params['Title Outline Color'] || 'Red');
	CWT.Ttl.titleEffect = String(CWT.Ttl.params['Title Effect'] || 'Normal');
	CWT.Ttl.splashEffectArea = Number(CWT.Ttl.params['Splash Effect Area'] || 30);

	// * Header
	CWT.Ttl.toggleTitleHeader = String(CWT.Ttl.params['Toggle Title Header'] || 'On');
	CWT.Ttl.headerTitle = String(CWT.Ttl.params['Header Title'] || '');

	// * Footer
	CWT.Ttl.toggleTitleFooter = String(CWT.Ttl.params['Toggle Title Footer'] || 'On');
	CWT.Ttl.footerTitle = String(CWT.Ttl.params['Footer Title'] || '');

	// * Subtitle Font Settings
	CWT.Ttl.subtitleFont = String(CWT.Ttl.params['Subtitle Font'] || 'GameFont');
	CWT.Ttl.subtitleFontSize = Number(CWT.Ttl.params['Subtitle Font Size'] || 30);
	CWT.Ttl.subtitleFontColor = String(CWT.Ttl.params['Subtitle Color'] || 'Yellow');
	CWT.Ttl.subtitleFontOutline = String(CWT.Ttl.params['Subtitle Outline Color'] || 'Red');

	// * Menu
	CWT.Ttl.menuOffsetX = Number(CWT.Ttl.params['Menu X Offset'] || 0);
	CWT.Ttl.menuOffsetY = Number(CWT.Ttl.params['Menu Y Offset'] || 0);
	CWT.Ttl.menuBgType = Number(CWT.Ttl.params['Menu Background Type'] || 0);

	// * Weather Effects
	CWT.Ttl.weatherEffect = Number(CWT.Ttl.params['Weather Effect'] || 0);
	CWT.Ttl.weatherPower = Number(CWT.Ttl.params['Weather Power'] || 21);
	CWT.Ttl.weatherSounds = String(CWT.Ttl.params['Weather Sound'] || 'On');
	CWT.Ttl.weatherBgs = String(CWT.Ttl.params['Weather Sound Effect'] || 'Storm1');
	CWT.Ttl.weatherBgsVol = Number(CWT.Ttl.params['Weather SE Volume'] || 40);
	CWT.Ttl.weatherBgsPitch = Number(CWT.Ttl.params['Weather SE Pitch'] || 0);
	CWT.Ttl.weatherBgsPan = Number (CWT.Ttl.params['Weather SE Pan'] || 0);

	// * Extra Commands
	CWT.Ttl.websiteCommandToggle = String(CWT.Ttl.params['Show Website Command'] || 'On');
	CWT.Ttl.websiteCommandText = String(CWT.Ttl.params['Website Command Text'] || 'Website');
	CWT.Ttl.websiteUrl = String(CWT.Ttl.params['Website']);
	CWT.Ttl.websiteDisplayMethod = String(CWT.Ttl.params['Website Display Method' || 'Window']);
	CWT.Ttl.exitCommandToggle = String(CWT.Ttl.params['Show Exit Command'] || 'On');
	CWT.Ttl.exitCommandText = String(CWT.Ttl.params['Exit Command Text'] || 'Exit');

	// * Video
	CWT.Ttl.videoFinished = false;
})(PluginManager);


 // ** SCENE BOOT **
(function($) {
	CWT.Ttl.CW_alias__Scene_Boot_start_video = $.prototype.start;
	$.prototype.start = function() {
		//if (CWT.Ttl.TitleScreenAddon.MVBuild < 1.3) alert(CWT.Ttl.TitleScreenAddon.Error)
		_skipTitleToggle = CWT.Ttl.skipTitle.toLowerCase();
		if (_skipTitleToggle === 'yes' || _skipTitleToggle === 'true') {
	        this.checkPlayerLocation();
	        DataManager.setupNewGame();
	        SceneManager.goto(Scene_Map);
	    } else { CWT.Ttl.CW_alias__Scene_Boot_start_video.call(this); };;
		_pretitleToggle = CWT.Ttl.pretitleToggle.toLowerCase();
		if (_pretitleToggle === 'on' || _pretitleToggle === 'true') {
			AudioManager.saveBgm($dataSystem.titleBgm);
			var type = SceneManager.preferableRendererType();
			type === 'canvas' ? ext = 'mp4' : ext = 'webm';
			Graphics.playVideo('movies/'+CWT.Ttl.movieName+'.'+ext);
		}; 
	};

	// * Doesn't seem to work aliased, so overwritten.
	Graphics._updateVisibility = function(videoVisible) {
		this._video.style.opacity = videoVisible ? 1 : 0;
		this._canvas.style.opacity = videoVisible ? 0 : 1;

		if (videoVisible) {
			AudioManager.stopAll();
		} else {
			AudioManager.replayBgm($dataSystem.titleBgm);
			CWT.Ttl.videoFinished = true;
		}
	};
})(Scene_Boot);


// ** SCENE TITLE **
(function($) { // * Overwritten
	$.prototype.drawGameTitle = function () {
		x = 0, y = 180, maxWidth = Graphics.width - x * 2;
		text = $dataSystem.gameTitle;		
		this._gameTitleSprite.bitmap.fontFace = CWT.Ttl.titleFont;
		this._gameTitleSprite.bitmap.fontSize = CWT.Ttl.titleFontSize;
		this._gameTitleSprite.bitmap.textColor = CWT.Ttl.titleFontColor;
		this._gameTitleSprite.bitmap.outlineColor = CWT.Ttl.titleOutlineColor;
		this.drawTitleEffect();		
		this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
	};

	$.prototype.drawTitleEffect = function() {
		_outlineWidth = 4, _titleEffect = CWT.Ttl.titleEffect.toLowerCase();
		switch (_titleEffect) {
			case 'normal': ow = _outlineWidth; break;
			case 'splash': ow = _outlineWidth + CWT.Ttl.splashEffectArea; break;
			default: ow = _outlineWidth; break;
		};
		this._gameTitleSprite.bitmap.outlineWidth = ow;
	};

	CWT.Ttl.CW_alias__Scene_Title_createBackground = $.prototype.createBackground;
	$.prototype.createBackground = function() {
		CWT.Ttl.CW_alias__Scene_Title_createBackground.call(this);		
		this.createWeather();
	};

	CWT.Ttl.CW_alias__Scene_Title_createForeground = $.prototype.createForeground;
	$.prototype.createForeground = function() {
		CWT.Ttl.CW_alias__Scene_Title_createForeground.call(this);
		var _header = CWT.Ttl.toggleTitleHeader.toLowerCase(), _footer = CWT.Ttl.toggleTitleFooter.toLowerCase();
		this._titleHeaderSprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
		this._titleFooterSprite = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
		if (_header === 'on' || _header === 'true') this.addChild(this._titleHeaderSprite);
		if (_footer === 'on' || _footer === 'true') this.addChild(this._titleFooterSprite);
		this.drawTitleSubtitles();
	};

	$.prototype.drawTitleSubtitles = function() {
		var x1 = 0, y1 = 130, maxWidthH = Graphics.width - x1 * 2,  x2 = 0, y2 = 245, maxWidthF = Graphics.width - x2 * 2;
		_headerSprite = this._titleHeaderSprite.bitmap, _footerSprite = this._titleFooterSprite.bitmap;
		_headerSprite.fontFace = CWT.Ttl.subtitleFont, _footerSprite.fontFace = CWT.Ttl.subtitleFont;
		_headerSprite.fontSize = CWT.Ttl.subtitleFontSize, _footerSprite.fontSize = CWT.Ttl.subtitleFontSize;
		_headerSprite.textColor = CWT.Ttl.subtitleFontColor, _footerSprite.textColor = CWT.Ttl.subtitleFontColor;
		_headerSprite.outlineColor = CWT.Ttl.subtitleFontOutline, _footerSprite.outlineColor = CWT.Ttl.subtitleFontOutline;
		_headerSprite.drawText(CWT.Ttl.headerTitle, x1, y1, maxWidthH, 48, 'center');
		_footerSprite.drawText(CWT.Ttl.footerTitle, x2, y2, maxWidthF, 48, 'center');		
	};

	$.prototype.createWeather = function() {
		this._weather = new Weather();
		if (CWT.Ttl.weatherEffect != -1) this.addChild(this._weather);
	};

	$.prototype.updateWeather = function() {
		var _weatherSE = CWT.Ttl.weatherSounds.toLowerCase();
		switch (CWT.Ttl.weatherEffect) {
			// ## Add lightning effects if 'storm' is selected. ##
			case -1: this._weather.type = 'none'; break;
			case 0: this._weather.type = 'rain'; break;
			case 1: this._weather.type = 'storm'; break;
			case 2: this._weather.type = 'snow'; break;
			case 3: this._weather.type = 'ash'; break;
			case 4: this._weather.type = 'blood'; break;
			default: this._weather.type = 'rain'; break;
		}		
		this._weather.power = CWT.Ttl.weatherPower;
		this._weather.origin.x = 0;
		this._weather.origin.y = 0;		
		if (CWT.Ttl.weatherEffect != -1 && (_weatherSE === 'on' || _weatherSE === 'true')) this.updateBgs(CWT.Ttl.weatherBgs);
	};

	$.prototype.updateBgs = function() {
		var _pretitleToggle = CWT.Ttl.pretitleToggle.toLowerCase();
		// ## Fix error message if 'se' doesn't exist and use default. ##
		var se = { name: CWT.Ttl.weatherBgs, volume: CWT.Ttl.weatherBgsVol, pitch: CWT.Ttl.weatherBgsPitch, pan: CWT.Ttl.weatherBgsPan };
		if ((_pretitleToggle === 'on' || _pretitleToggle === 'true') && !CWT.Ttl.videoFinished) {
			return;
		} else {
			AudioManager.playBgs(se);
		}
	};

	CWT.Ttl.CW_alias__Scene_Title_update = $.prototype.update;
	$.prototype.update = function() {
		CWT.Ttl.CW_alias__Scene_Title_update.call(this);
		this.updateWeather();
	};

	CWT.Ttl.CW_alias__Scene_Title_createCommandWindow = $.prototype.createCommandWindow;
	$.prototype.createCommandWindow = function() {
		CWT.Ttl.CW_alias__Scene_Title_createCommandWindow.call(this);
		this._commandWindow.setHandler('weburl', this.commandWebsite.bind(this));
		this._commandWindow.setHandler('exit', this.commandExit.bind(this));
	};

	$.prototype.commandWebsite = function() {
		this._commandWindow.activate();
		var uri = CWT.Ttl.websiteUrl;
		switch (CWT.Ttl.websiteDisplayMethod.toLowerCase()) {
			case 'window': window.open(uri); break;
			case 'browser': var gui = require('nw.gui'); gui.Shell.openExternal(uri); break;
		}
	};

	$.prototype.commandExit = function() { SceneManager.exit(); };
})(Scene_Title);


// * Window Title Command
(function($) {
	CWT.Ttl.CW_alias__Window_TItleCommand_UpdatePlacement = $.prototype.updatePlacement;
	$.prototype.updatePlacement = function() {
		CWT.Ttl.CW_alias__Window_TItleCommand_UpdatePlacement.call(this);
		this.x += CWT.Ttl.menuOffsetX, this.y += CWT.Ttl.menuOffsetY;
		this.setBackgroundType(CWT.Ttl.menuBgType);
	};

	CWT.Ttl.CW_alias__Scene_Title_makeCommandList = $.prototype.makeCommandList;
	$.prototype.makeCommandList = function() {
		CWT.Ttl.CW_alias__Scene_Title_makeCommandList.call(this);
		var _urlCommandToggle = CWT.Ttl.websiteCommandToggle.toLowerCase(), _exitCommandToggle = CWT.Ttl.exitCommandToggle.toLowerCase();
		if (_urlCommandToggle === 'on' || _urlCommandToggle === 'true') this.addCommand(CWT.Ttl.websiteCommandText, 'weburl');
		if (_exitCommandToggle === 'on' || _exitCommandToggle === 'true') this.addCommand(CWT.Ttl.exitCommandText, 'exit');
	};
})(Window_TitleCommand);



// ** SCENE MAP **
(function($) {
	CWT.Ttl.CW_alias__Scene_Map_start = $.prototype.start;
	$.prototype.start = function() {
	    CWT.Ttl.CW_alias__Scene_Map_start.call(this);
	    if (CWT.Ttl.weatherSounds === 'on' || CWT.Ttl.weatherSounds === 'true') AudioManager.fadeOutBgs(1);
	};
})(Scene_Map);



// ** WEATHER **
CWT.Ttl.CW_alias__Weather_createBitmaps = Weather.prototype._createBitmaps;
Weather.prototype._createBitmaps = function() {
	CWT.Ttl.CW_alias__Weather_createBitmaps.call(this);
	this._ashBitmap = new Bitmap(12, 12);
	this._ashBitmap.drawCircle(2, 2, 2, 'gray');
	this._bloodBitmap = new Bitmap(12, 12);
	this._bloodBitmap.drawCircle(6, 4, 3, 'red');
};

Weather.prototype._updateSprite = function(sprite) {
    switch (this.type) {
    case 'rain': this._updateRainSprite(sprite); break;
    case 'storm': this._updateStormSprite(sprite); break;
    case 'snow': this._updateSnowSprite(sprite); break;
    case 'ash': this._updateAshSprite(sprite); break;
    case 'blood': this._updateBloodSprite(sprite); break;
    }
    if (sprite.opacity < 40) { this._rebornSprite(sprite); }
};

Weather.prototype._updateAshSprite = function(sprite) {
	sprite.bitmap = this._ashBitmap;
	sprite.rotation = Math.PI / 6;
	sprite.ax += 6 * Math.sin(sprite.rotation);
	sprite.ay += 4 * Math.cos(sprite.rotation);
	sprite.opacity -= 2;
};

Weather.prototype._updateBloodSprite = function(sprite) {
	sprite.bitmap = this._bloodBitmap;
	sprite.rotation = Math.PI / 6;
	sprite.ax -= 6 * Math.tan(sprite.rotation);
	sprite.ay += 6 * Math.cos(sprite.rotation);
	sprite.opacity -= 3;
};

Weather.prototype._createDimmer = function() {
	var _weatherEffect = CWT.Ttl.weatherEffect;
    this._dimmerSprite = new ScreenSprite();
    if (_weatherEffect === 4) {
    	this._dimmerSprite.setColor(80, 10, 10);
    } else {
    	this._dimmerSprite.setColor(80, 80, 80);
    }
    this.addChild(this._dimmerSprite);
};