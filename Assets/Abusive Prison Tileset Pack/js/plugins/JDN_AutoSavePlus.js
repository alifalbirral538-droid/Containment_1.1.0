/*:
*
* @plugindesc v1.1.0 Runs common event on transfer or lvl up
* 
* @author JohnDoeNews
* 
* 
* @param Auto Save Slot
* @type number
* @desc Plugin Command will save in this slot
* @default 1
*
* @param Common Event On Transfer
* @type number
* @desc Transfer will trigger this common event
* @default 1
*
* @param Common Event On Level Up
* @type number
* @desc Leveling up will trigger this common event
* @default 2
*
* @help 
* 
* 
* ==========================================================================
* ABOUT THIS PLUGIN - JDN_AutoSavePlus.js
* ==========================================================================
* This plugin:
* Runs common event of your choice
* - when you switch maps
* - when you lvl up
* 
* Saves or loads the game at a plugin command
* 
* This is useful for:
* - Autosave
* - Weather
* - Day/Night time.
* - Skill Earning System
* - More...
* 
* 
* ==========================================================================
* TERMS OF USE
* ==========================================================================
* Free to use for commercial, or non commercial projects,
* Credits to: JohnDoeNews
* If you put a link to your credits, please use this link, no matter 
* where you found this plugin: https://games.johndoenews.nl 
* 
* This plugin may be shared for free, but the tems of use must 
* stay the same.
* 
* ==========================================================================
* PLUGIN COMMANDS
* ==========================================================================
* 
* JDNForceLoad
* - This opens the load scene, if a saved game is present, or start 
* a new game if no game is saved.
*
* JDNForceSave
* - This will force a silent save in slot 1
* 
* ==========================================================================
* DEVLOG
* ==========================================================================
* 1.1.0 Added params with help of Aloe Guvner
* 26 April 2018
* 
* 1.0.1 Added common event on lvl up.
* 22 April 2018
* 
* 1.0.0 Finished!
* 19 April 2018
* 
 */




(function() {

	var params = PluginManager.parameters("JDN_AutoSavePlus");console.log(params);
    var saveSlot = Number(params["Auto Save Slot"]);
	var commonEventTr = Number(params["Common Event On Transfer"]);
	var commonEventLvl = Number(params["Common Event On Level Up"]);
	
	
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);		
		
			if(command == 'JDNForceLoad') {
				 if (DataManager.isAnySavefileExists() == true){
				 SceneManager.push(Scene_Load);
					 }
				else {
      			DataManager.setupNewGame();
				SceneManager.goto(Scene_Map);
	  					}
			}
			if(command == 'JDNForceSave') {
				$gameSystem.onBeforeSave();
        			DataManager.saveGame(saveSlot);				
			}
};	
	
Game_Interpreter.prototype.command201 = function() {
    if (!$gameParty.inBattle() && !$gameMessage.isBusy()) {
        var mapId, x, y;
        if (this._params[0] === 0) {  // Direct designation
            mapId = this._params[1];
            x = this._params[2];
            y = this._params[3];
        } else {  // Designation with variables
            mapId = $gameVariables.value(this._params[1]);
            x = $gameVariables.value(this._params[2]);
            y = $gameVariables.value(this._params[3]);
        }
        $gamePlayer.reserveTransfer(mapId, x, y, this._params[4], this._params[5]);
        this.setWaitMode('transfer');
        this._index++;
		$gameTemp.reserveCommonEvent(commonEventTr);
    }
    return false;
};

Game_Actor.prototype.levelUp = function() {
    this._level++;
    this.currentClass().learnings.forEach(function(learning) {
        if (learning.level === this._level) {
            this.learnSkill(learning.skillId);
        }
    }, this);
	$gameTemp.reserveCommonEvent(commonEventLvl);
};

})();
