/*:
 * @plugindesc (v.1.0) Controls fade times
 * @author DMI
 *
 *
 * @param Fade In Time Map
 * @desc Fade In Time | Default: 24
 * @default 24
 *
 *
 * @param Fade Out Time Map
 * @desc Fade Out Time | Default: 24
 * @default 24
 *
 *
 * @param Fade In Time Transfer
 * @desc Fade In Time Transfer | Default: 24
 * @default 24
 *
 *
 * @param Fade Out Time Transfer
 * @desc Fade Out Time Transfer | Default: 24
 * @default 24
 *
 *
 * @help
 *   DMI's Fade Control Plugin
 * ===========================================================================
 *
 *
 *      This plugin gives you control over fade times
 *  
 *      You are free to use this plugin for non-commercial and commercial projects
 *      as long as you credit me in some way.
 *
 *      Credit to: Tsuyoi Raion or DMI *Dizzy Media Inc.*
 *
 */
 ///////////////////
 // Plugin Vers.  //
 ///////////////////

console.log('You are currently using Vers. 1.0 of DMI Fade Control');

 ///////////////////
 // Parameters    //
 //////////////////

 var parameters = PluginManager.parameters('DMI_Fade_Control');

 var itemName = String(parameters['Items Name'] || "Items Name");

 var fadeInTimeMap = Number(parameters['Fade In Time Map'] || 24);
 var fadeOutTimeMap = Number(parameters['Fade Out Time Map'] || 24);

 var fadeInTimeTrans = Number(parameters['Fade In Time Transfer'] || 24);
 var fadeOutTimeTrans = Number(parameters['Fade Out Time Transfer'] || 24);

var pluginFadeInTimeMap = Number(parameters['Plugin Fade In Time'] || 24);



Game_Screen.prototype.startFadeOut = function(duration) {
    this._fadeOutDuration = fadeOutTimeMap;
    this._fadeInDuration = 0;
};

Game_Screen.prototype.startFadeIn = function(duration) {
    this._fadeInDuration = fadeInTimeMap;
    this._fadeOutDuration = 0;
};


Scene_Map.prototype.fadeInForTransfer = function() {
    var fadeType = $gamePlayer.fadeType();
    switch (fadeType) {
    case 0: case 1:
        this.startFadeIn(fadeInTimeTrans, fadeType === 1);
        break;
    }
};

Scene_Map.prototype.fadeOutForTransfer = function() {
    var fadeType = $gamePlayer.fadeType();
    switch (fadeType) {
    case 0: case 1:
        this.startFadeOut(fadeOutTimeTrans, fadeType === 1);
        break;
    }
};