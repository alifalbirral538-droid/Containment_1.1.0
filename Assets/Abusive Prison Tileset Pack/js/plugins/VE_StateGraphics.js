/*
 * ==============================================================================
 * ** Victor Engine MV - State Graphics
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.01.08 > First release.
 *  v 1.01 - 2016.01.14 > Fixed issue with map state graphic.
 *                      > Fixed issue with trying to load wrong files.
 *  v 1.02 - 2016.03.04 > Compatibility with Battler Graphic Setup.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - State Graphics'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.StateGraphics = VictorEngine.StateGraphics || {};

(function() {

	VictorEngine.StateGraphics.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.StateGraphics.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - State Graphics', 'VE - Basic Module', '1.07');
	};

	VictorEngine.StateGraphics.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.StateGraphics.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 *------------------------------------------------------------------------------ 
 * @plugindesc v1.02 - Change actors and enemies graphics when under states.
 * @author Victor Sant
 *
 * @param Change Charset
 * @desc Set if the on map charset will be changed by states.
 * true - ON	false - OFF
 * @default true
 *
 * @param Change Faceset
 * @desc Set if the character face will be changed by states.
 * true - ON	false - OFF
 * @default false
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 *  State Notetags:
 * ------------------------------------------------------------------------------
 *
 *  <state graphic replace: 'filename'[, index]>
 *   A state with this tag will make the battler graphic (and charset or faceset
 *   if you setup the plugin parameters) be directly replaced by the one set.
 *     filename : new graphic filename. must be always in quotations
 *     index    : index for charsets and facesets. (optional)
 *
 * ---------------
 *
 *  <state graphic extension: 'extension'>
 *   A state with this tag will make the battler graphic (and charset or faceset
 *   if you setup the plugin parameters)replaced by with the same filename + the
 *   extension set.
 *     filename : graphic filename extension. must be always in quotations.
 *
 * ---------------
 *
 *  <state hide weapon>
 *   A state with this tag will make the weapon to not be displayed when attacking.
 *
 * ---------------
 *
 *  <state weapon anim: id>
 *   A state with this tag will change the basic attack battle animation.
 *     id : animation ID.
 * 
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  - State Graphic Replace
 *  The <state graphic replace> tag uses always the same graphic no matter who
 *  is the state target. Also, if the index is set, will make the faceset index to
 *  be the same as the charset index. Setup your graphics to match accordinally.
 *
 * ---------------
 *
 *  - State Graphic Extension
 *  The <state graphic extension> allows to setup different graphics based on the
 *  target original graphic. You need a graphic with filename equal the original 
 *  filename + the extension.
 *  Ex.: A battler with a graphic named 'Actor1' when inflicted with a state with
 *       the tag <state graphic extension: '[poison]'> will need a filename
 *       named 'Actor1[poison]'.
 *  This setup don't change the charset or faceset index, so the new file must
 *  have a matching graphic for that index.
 *
 * ---------------
 *
 *  Any of this setups don't change the battler type. So if the battler is a 
 *  SV Battler, it will still be an SV Battler. You can't make an SV Battler
 *  become a static battler.
 *
 * ---------------
 *
 *  You can make some battler to ignore graphic changes based on their battler
 *  graphic filename. You can add a '#' to the start of the filename, that way
 *  the battler graphic will not change even when
 *
 * ------------------------------------------------------------------------------
 */

	
(function() {

	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.StateGraphics = {};
		VictorEngine.Parameters.StateGraphics.ChangeCharset = eval(parameters["Change Charset"]);
		VictorEngine.Parameters.StateGraphics.ChangeFaceset = eval(parameters["Change Faceset"]);
	};

	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.StateGraphics.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.StateGraphics.loadNotetagsValues.call(this, data, index);
		if (this.objectSelection(index, ['state'])) VictorEngine.StateGraphics.loadNotes(data);
	};
	
	VictorEngine.StateGraphics.loadNotes = function(data) {
		data.stateGraphic = data.stateGraphic || {};
		this.processNotes1(data);
		this.processNotes2(data);
	};
	
	VictorEngine.StateGraphics.processNotes1 = function(data) {
		var match;
		var part1 = 'state graphic (replace|extension):[ ]*';
		var part2 = "('[^\']+'|\"[^\"]+\")[ ]*(?:,[ ]*(\\d+))?";
		var regex = new RegExp('<' + part1 + part2 + '[ ]*>', 'gi');
		while ((match = regex.exec(data.note)) !== null) { this.processValues(data, match) };
	};
	
	VictorEngine.StateGraphics.processNotes2 = function(data) {
		var match;
		var regex1 = new RegExp('<state hide weapon>', 'gi');
		var regex2 = new RegExp('<state weapon anim:[ ]*(\\d+)[ ]*>', 'gi');
		while ((match = regex1.exec(data.note)) !== null) { data.stateGraphic.hideWeapon = true     };
		while ((match = regex2.exec(data.note)) !== null) { data.stateGraphic.animation  = match[1] };
	};
	
	VictorEngine.StateGraphics.processValues = function(data, match) {
		var value;
		if (match[1].toLowerCase() === 'replace') {
			data.stateGraphic.replace   = match[2].slice(1, -1);
		} else {
			data.stateGraphic.extension = match[2].slice(1, -1);
		}
		data.stateGraphic.index = Number(match[3]) || 0;
	};

	//=============================================================================
	// ImageManager
	//=============================================================================
	
	ImageManager.ignoreStateGraphic = function(filename) {
		var sign = filename.match(/^[\$\!\%\#]+/);
		return sign && sign[0].contains('#');
	};

	//=============================================================================
	// Game_Battler
	//=============================================================================
	
	VictorEngine.StateGraphics.addNewState = Game_BattlerBase.prototype.addNewState;
	Game_BattlerBase.prototype.addNewState = function(stateId) {
		VictorEngine.StateGraphics.addNewState.call(this, stateId);
		if (this.isActor()) $gamePlayer.refresh();
	};

	//=============================================================================
	// Game_Battler
	//=============================================================================
	
	VictorEngine.StateGraphics.isWeaponAnimationRequested = Game_Actor.prototype.isWeaponAnimationRequested;
	Game_Battler.prototype.isWeaponAnimationRequested = function() {
		if (this.hideStateWeapon()) {
			this.clearWeaponAnimation();
			return false;
		}
		return VictorEngine.StateGraphics.isWeaponAnimationRequested.call(this);
	};

	Game_Battler.prototype.hideStateWeapon = function() {
		var result = this.states().some(function(state) {
			return state.stateGraphic.hideWeapon;
		}, this);
		return result && !this.ignoreStateGraphic();
	};
	
	Game_Battler.prototype.stateGraphicAnimation = function() {
		var result = this.states().filter(function(state) {
			return state.stateGraphic.animation;
		}, this)[0];
		return result ? result.stateGraphic.animation : null;
	};
	
	Game_Battler.prototype.stateReplace = function() {
		this.sortStates();
		var result = this.states().filter(function(state) {
			return state.stateGraphic.replace;
		}, this)[0];
		return result ? result.stateGraphic.replace : null;
	};
	
	Game_Battler.prototype.stateExtension = function() {
		this.sortStates();
		var result = this.states().filter(function(state) {
			return state.stateGraphic.extension;
		}, this)[0];
		return result ? result.stateGraphic.extension : null;
	};
		
	Game_Battler.prototype.stateGraphicIndex = function() {
		this.sortStates();
		var result = this.states().filter(function(state) {
			return state.stateGraphic.index;
		}, this)[0];
		return result ? result.stateGraphic.index : null;
	};
	
	Game_Battler.prototype.stateGraphicAnimation = function() {
		this.sortStates();
		var result = this.states().filter(function(state) {
			return state.stateGraphic.animation;
		}, this)[0];
		return result ? result.stateGraphic.animation : null;
	};	
	
	Game_Battler.prototype.changeStateGraphic = function(name, rep, ext, ign) {
		if (ign) {
			return name;
		} else if (rep) {
			return rep;
		} else if (ext) {
			return name + ext;
		} else {
			return name;
		}
	};
	
	//=============================================================================
	// Game_Actor
	//=============================================================================

	VictorEngine.StateGraphics.attackAnimationId1 = Game_Actor.prototype.attackAnimationId1;
	Game_Actor.prototype.attackAnimationId1 = function() {
		if (this.stateGraphicAnimation()) {
			return this.stateGraphicAnimation();
		} else {
			return VictorEngine.StateGraphics.attackAnimationId1.call(this);
		}
	};

	VictorEngine.StateGraphics.attackAnimationId2 = Game_Actor.prototype.attackAnimationId2;
	Game_Actor.prototype.attackAnimationId2 = function() {
		var weapons = this.weapons();
		if (this.stateGraphicAnimation() && weapons[1]) {
			return this.stateGraphicAnimation();
		} else {
			return VictorEngine.StateGraphics.attackAnimationId2.call(this);
		}
	};

	VictorEngine.StateGraphics.actorBattlerName = Game_Actor.prototype.battlerName;
	Game_Actor.prototype.battlerName = function() {
		var name = VictorEngine.StateGraphics.actorBattlerName.call(this);
		var rep  = this.stateReplace();
		var ext  = this.stateExtension();
		var ign  = ImageManager.ignoreStateGraphic(name);
		return this.changeStateGraphic(name, rep, ext, ign);
	};
	
	VictorEngine.StateGraphics.characterName = Game_Actor.prototype.characterName;
	Game_Actor.prototype.characterName = function() {
		var name = VictorEngine.StateGraphics.characterName.call(this);
		var rep  = this.stateReplace();
		var ext  = this.stateExtension();
		var ign  = (this.ignoreStateGraphic() || !VictorEngine.Parameters.StateGraphics.ChangeCharset);
		return this.changeStateGraphic(name, rep, ext, ign);
	};
	
	VictorEngine.StateGraphics.faceName = Game_Actor.prototype.faceName;
	Game_Actor.prototype.faceName = function() {
		var name = VictorEngine.StateGraphics.faceName.call(this);
		var rep  = this.stateReplace();
		var ext  = this.stateExtension();
		var ign  = (this.ignoreStateGraphic() || !VictorEngine.Parameters.StateGraphics.ChangeFaceset);
		return this.changeStateGraphic(name, rep, ext, ign);
	};
	
	VictorEngine.StateGraphics.characterIndex = Game_Actor.prototype.characterIndex
	Game_Actor.prototype.characterIndex = function() {
		if (this.changeStateIndex() && VictorEngine.Parameters.StateGraphics.ChangeCharset) {
			return ; this.stateGraphicIndex();
		} else {
			return VictorEngine.StateGraphics.characterIndex.call(this);
		}
	};

	VictorEngine.StateGraphics.faceIndex = Game_Actor.prototype.faceIndex
	Game_Actor.prototype.faceIndex = function() {
		if (this.changeStateIndex() && VictorEngine.Parameters.StateGraphics.ChangeFaceset) {
			return ; this.stateGraphicIndex();
		} else {
			return VictorEngine.StateGraphics.faceIndex.call(this);
		}
	};
	
	VictorEngine.StateGraphics.eraseState = Game_Actor.prototype.eraseState
	Game_Actor.prototype.eraseState = function(stateId) {
		VictorEngine.StateGraphics.eraseState.call(this, stateId)
		$gamePlayer.refresh();
	};

	Game_Actor.prototype.changeStateIndex = function() {
		return this.stateGraphicIndex() && !this.ignoreStateGraphic();
	};
	
	Game_Actor.prototype.ignoreStateGraphic = function() {
		var name = VictorEngine.StateGraphics.actorBattlerName.call(this);
		return ImageManager.ignoreStateGraphic(name);
	};
	
	//=============================================================================
	// Game_Enemy
	//=============================================================================

	VictorEngine.StateGraphics.enemyBattlerName = Game_Enemy.prototype.battlerName;
	Game_Enemy.prototype.battlerName = function() {
		var name = VictorEngine.StateGraphics.enemyBattlerName.call(this);
		var rep  = this.stateReplace();
		var ext  = this.stateExtension();
		var ign  = ImageManager.ignoreStateGraphic(name);
		return this.changeStateGraphic(name, rep, ext, ign);
	};
	
	Game_Enemy.prototype.ignoreStateGraphic = function() {
		var name = VictorEngine.StateGraphics.enemyBattlerName.call(this);
		return ImageManager.ignoreStateGraphic(name);
	};
	
})(); 