//=============================================================================
// Blackmorning Engine Plugins - Equip Core
// BM_EquipCore.js
//=============================================================================

var Imported = Imported || {};
Imported.BM_EquipCore = true;

var BM = BM || {};
//=============================================================================
 /*:
 * @plugindesc VK Visual Equipment Scene (v1.2) 
 * Equipment body & icons setup
 * @author Blackmorning
 *
 * @param ---General---
 * @default
 *
 * @param CommandWindowAlign
 * @parent ---General---
 * @type combo
 * @option left
 * @option right
 * @desc Location of the command window. 
 * left     right
 * @default right
 *
 * @param CommandColumns
 * @parent ---General---
 * @type number
 * @min 1
 * @desc Number of columns in the command window.
 * default for basic 3, yanfly 1
 * @default 3
 *
 * @param CommandRows
 * @parent ---General---
 * @type number
 * @min 1
 * @desc Number of rows visible in the command window.
 * default for basic 1, yanfly 4
 * @default 1
 *
 * @param CommandFull
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Command window goes all the way across (best with 1 row)
 * false     true
 * @default false
 *
 * @param HideEquipItemList
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Hide or show item list until selecting. 
 * Show - false     Hide - true
 * @default true
 *
 * @param HelpEquip
 * @parent ---General---
 * @desc The text for the command Equip.
 * @default Manually equip items
 *
 * @param HelpOptimize
 * @parent ---General---
 * @desc The text for the command Optimize.
 * @default Automatically equip the best items
 *
 * @param HelpRemove
 * @parent ---General---
 * @desc The text for the command Remove.
 * @default Unequip all items
 *
 * @param ---Slot Window---
 * @default
 *
 * @param EquipmentType
 * @parent ---Slot Window---
 * @type combo
 * @option icons
 * @option names
 * @desc Use icons or slot names. 
 * icons     names
 * @default names
 *
 * @param EquipmentIcons
 * @parent ---Slot Window---
 * @desc The icons for each equipment slot. 
 * Separate the icon ID's by a space.
 * @default 97 128 130 135 145
 *
 * @param ---Status Window---
 * @default
 *
 * @param EquipParameters
 * @parent ---Status Window---
 * @desc Parameters shown when comparing equipment. 
 * Separate parameters by a space. * see help * 
 * @default mhp atk def mat mdf agi luk hit cri
 *
 * @param ShowDifference
 * @parent ---Status Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc shows the change in parameters 
 * Show - true     Hide - false
 * @default true
 *
 * @param ParametersFontSize
 * @parent ---Status Window---
 * @type number
 * @min 1
 * @desc Font size of parameters.
 * @default 20
 *
 * @param BodyInStatus
 * @parent ---Status Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the body image show behind parameters. 
 * Show - true     Hide - false
 * @default false
 *
 * @param ComparePlusIcon
 * @parent ---Status Window---
 * @desc Choose icon to show positive stat changes. 
 * default - leave blank to show none.
 * @default
 *
 * @param CompareMinusIcon
 * @parent ---Status Window---
 * @desc Choose icon to show negative stat changes. 
 * default - leave blank to show none.
 * @default
 *
 * @param ---Body Window---
 * @default
 *
 * @param ShowBodyWindow
 * @parent ---Body Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Show Equip Body window. 
 * true			false
 * @default true
 *
 * @param BodyWindowWidth
 * @parent ---Body Window---
 * @type number
 * @min 1
 * @desc Width of the Equip Body window. 
 * default 400
 * @default 400
 *
 * @param BodyImage
 * @parent ---Body Window---
 * @desc Default image of the body. (found in Img\Pictures)
 * @default equip_m
 *
 * @param BodyPadding
 * @parent ---Body Window---
 * @type number
 * @min 0
 * @desc Adjusts the padding of the body window so image can go right to window frame.
 * @default 10
 *
 * @param PaperDollMode
 * @parent ---Body Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc if true, changes mode to dress up body image
 * true			false
 * @default  false
 *
 * @param EquipmentFramed
 * @parent ---Body Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc The icons are framed. 
 * Show - true     Hide - false
 * @default true
 *
 * @param ScaleEquipIcons
 * @parent ---Body Window---
 * @type number
 * @min 0
 * @desc Scaling/multiplier of size of item icons on body. 
 * (based on default icon size)
 * @default 1
 *
 * @param IconXLocation
 * @parent ---Body Window---
 * @desc Gives the default x-location of each icon. 
 * Separate the x by a space.  
 * @default 60 160 108 108 40 40
 *
 * @param IconYLocation
 * @parent ---Body Window---
 * @desc Gives the default y-location of each icon. 
 * Separate the y by a space.
 * @default 330 330 60 220 100 220
 *
 * @param ---Parameters Vocab---
 * @default
 *
 * @param QuasiParams
 * @parent ---Parameters Vocab---
 * @type combo
 * @option name
 * @option abr
 * @desc show names or abr in list (for Quasi Custom Params)
 * name			abr
 * @default name
 *
 * @param MhpVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for maxHp 
 * default - leave blank to use the database's entry.
 * @default Hit Points
 *
 * @param MmpVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for maxMp 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param AtkVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for atk 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param DefVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for def 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param MatVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mat 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param MdfVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mdf 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param AgiVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for agi 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param LukVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for luk 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param HitVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for hit 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param EvaVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for eva 
 * default - leave blank to use the database's entry.
 * @default 
 *
 * @param CriVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for cri 
 * default Critical 
 * @default Critical   
 *
 * @param CevVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for cev
 * default Crit Evasion
 * @default Crit Evasion
 *
 * @param MevVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mev 
 * default Magic Evasion
 * @default Magic Evasion
 *
 * @param MrfVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mrf
 * default M. Reflect
 * @default M. Reflect
 *
 * @param CntVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for cnt 
 * default Counterattack 
 * @default Counterattack
 *
 * @param HrgVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for hrg
 * default HP Regen
 * @default HP Regen
 *
 * @param MrgVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mrg
 * default MP Regen
 * @default MP Regen
 *
 * @param TrgVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for trg
 * default TP Regen
 * @default TP Regen
 *
 * @param TgrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for trg
 * default Target Rate
 * @default Target Rate
 *
 * @param GrdVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for grd
 * default Guard Effect
 * @default Guard Effect
 *
 * @param RecVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for rec
 * default Recovery
 * @default Recovery
 *
 * @param PhaVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for pha
 * default Pharmacology
 * @default Pharmacology
 *
 * @param McrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mcr
 * default MP Cost
 * @default MP Cost
 *
 * @param TcrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for tcr 
 * default TP Cost
 * @default TP Cost
 *
 * @param PdrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for pdr 
 * default Phys Dmg %
 * @default Phys Dmg %
 *
 * @param MdrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for mdr
 * default Magic Dmg %
 * @default Magic Dmg %
 *
 * @param FdrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for fdr
 * default Floor Dmg %
 * @default Floor Dmg %
 *
 * @param ExrVocab
 * @parent ---Parameters Vocab---
 * @desc Vocab for exr
 * default Exp Gain
 * @default Exp Gain
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Title: BM VK Equipment Scene
 * Author: Blackmorning
 * Version: 1.2
 * Website: http://bmscripts.weebly.com/vk-equip.html
 * Visual Equip Scene such as in "Valkyrie Stories" made for RPG Maker VX by 
 * Hanzo Kimura
 * - Icons can be assigned to equipment slots
 * - Visual placement of equipment onto an image
 * - Image can be assigned to actors/classes in the Database Notebox 
 *   (actors take priority)
 * - Window padding can be adjusted to eliminate cutoff of images.
 *   Text is still placed properly.
 * - Image can be assigned to weapon/armor in the Database Notebox
 * - Equipment icon positions can be assigned/changed to match new images
 * - Decide what parameters to show/compare (using symbols in table below)
 * - Decide what parameters are called
 *
 * -- Compatiblity --
 *
 * - YEP Equip & Item Core Users (Put YEP above this script)
 * - YEP Equipment requirements (Put YEP above this script)
 * ---	Pressing Left/Right will toggle the stat comparison window with the info 
 * 	  	window (if using YEP item core) and 
 *    	requirements window (if using YEP equipment requirements). 
 *    	Pressing Tab on the keyboard will also switch them as well as clicking 
 *    	on those windows.
 * - Quasi ParamPlus (Put above this script)
 * ---	use the same abbreviations that are used in Quasi in the EquipParameters section
 *		to make them appear (uses name/abr as chosen)
 *
 * Table of built-in parameters:
 * ============================
 * | Symbol |      Name       |
 * ============================
 * | mhp    | Max HP          |
 * | mmp    | Max MP          |
 * | atk    | Attack          |
 * | def    | Defense         |
 * | mat    | M.Attack        |
 * | mdf    | M.Defense       |
 * | agi    | Agility         |
 * | luk    | Luck            |
 * =======================================
 * | hit    | Hit Rate        | percent  |
 * | eva    | Evasion         | percent  |
 * | cri    | Critical Rate   | percent  |
 * | cev    | Crit Evasion    | percent  |
 * | mev    | Magic Evasion   | percent  |
 * | mrf    | M. Reflection   | percent  |
 * | cnt    | Counterattack   | percent  |
 * | hrg    | HP Regen Rate   | percent  |
 * | mrg    | MP Regen Rate   | percent  |
 * | trg    | TP Regen Rate   | percent  |
 * =======================================
 * | tgr    | Target Rate     | percent  |
 * | grd    | Guard Effect    | percent  |
 * | rec    | Recovery Effect | percent  |
 * | pha    | Pharmacology    | percent  |
 * | mcr    | MP Cost Rate    | percent  |
 * | tcr    | TP Cost Rate    | percent  |
 * | pdr    | Phys Damage %   | percent  |
 * | mdr    | Magic Damage %  | percent  |
 * | fdr    | Floor Damage %  | percent  |
 * | exr    | Exp Gain Rate   | percent  |
 * =======================================
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to change a actor/class's equipment setup.
 *-------------------------
 * Actor/Class Notetags:
 *-------------------------
 * <ebodyimage: x> 
 * - x must be the corresponding filename from the Img\Pictures folder. 
 *
 * For those who purchased the "Cover Art Characters Pack" and copied the data
 * into their projects, <Portrait: Package1_1> would be a good example use.
 *
 * <ebodyscale: x> - Specifies the desired scaling of the body image.
 * x = 1 provides the default scaling behavior; x = 0.5 halve the size, while
 * x = 2 doubles it.  Note that the image is confined to within the body image 
 * window.
 *
 * If not provided, the scaling factor will default to 1 and use the original
 * image size.
 *
 * <ebodyoffset: -x, -y>
 * <ebodyoffset: +x, +y>
 * - Specifies an offset from the default positioning to use for the body image.  
 *   Positive x moves the image further right, negative x moves left.
 *   Positive y moves the image further down, negative y moves up. 
 *   Note: the image may be clipped as a result of such adjustments.
 *   The equip window's border will automatically overwrite such parts of the
 *   image.
 *
 * <eicon-id: x, y> with id as the equipment slot, x, y are the position.
 * This changes the actor's slot positions to wherever is listed. 
 * An actor's custom equip slots will take priority over a class's
 * custom equip slots, which will take priority over the default equip slots.
 * When using Yanfly custom equipment slots, the icon id is in the order written, * starting at 0 for the first slot.
 *-------------------------
 * Weapon/Armor Notetags:
 *-------------------------
 *   <eiconimage: string>
 * - Uses a picture from Img\Pictures\ of your RPG Maker MV Project's
 * directory with the filename of "string" (without the extension) as the image
 * picture.  Will adjust to size of box.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * Version 1.20: 2018-Mar-16
 * - updated for RPG Maker MV version 1.5.0
 * Version 1.19: 2017-Aug-12
 * - adjusted icon placement to better work with changed equipment slots
 * Version 1.18: 2017-July-07
 * - fixed adding character error
 * Version 1.17: 2017-June-28
 * - can remove body window and just show status compare window
 * Version 1.16: 2016-June-03
 * - adjusted visual options
 * - changed coding
 * Version 1.15: 2016-May-13
 * - adjusted font issues
 * Version 1.14: 2016-May-12
 * - adjusted equip status window to include the difference
 * Version 1.13: 2016-May-11
 * - added paper doll mode, can now choose to dress the body image.
 * Version 1.12: 2016-May-11
 * - compatible with QuasiParamPlus
 * Version 1.11: 2016-May-10
 * - compatible with YEP equipment requirements
 * Version 1.10: 2016-Apr-11
 * - compatible with yanfly equip core
 * - put below Yanfly Equip
 * Version 1.01: 2016-Mar-14
 * - fixed images when changing classes
 * Version 1.00: 2015-Nov-24
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================
BM.Parameters = PluginManager.parameters('BM_EquipCore');
BM.Equip = BM.Equip || {};
BM.Icon = BM.Icon || {};
BM.Vocab = BM.Vocab || {};
BM.Equip.version = 1.20

BM.Equip.ECommandWindowAlign = String(BM.Parameters['CommandWindowAlign']);
BM.Equip.ECommandColumns = Number(BM.Parameters['CommandColumns']);
BM.Equip.ECommandRows = Number(BM.Parameters['CommandRows']);
BM.Equip.ECommandFull = eval(String(BM.Parameters['CommandFull']));
BM.Equip.EStatusWidth = Number(BM.Parameters['BodyWindowWidth']);
BM.Equip.EParamFontSize = Number(BM.Parameters['ParametersFontSize']);

BM.Icon.Plus = Number(BM.Parameters['ComparePlusIcon']);
BM.Icon.Minus = Number(BM.Parameters['CompareMinusIcon']);

BM.Data = String(BM.Parameters['EquipParameters']);
BM.Data = BM.Data.split(' ');
BM.Equip.EParameters = [];
for (BM.i = 0; BM.i < BM.Data.length; ++BM.i) {
  BM.Equip.EParameters.push(BM.Data[BM.i]);
};

BM.Equip.EHideList = eval(String(BM.Parameters['HideEquipItemList']));
BM.Equip.EHelpEquip = String(BM.Parameters['HelpEquip']);
BM.Equip.EHelpOptimize = String(BM.Parameters['HelpOptimize']);
BM.Equip.EHelpRemove = String(BM.Parameters['HelpRemove']);
BM.Equip.EBodyPadding = Number(BM.Parameters['BodyPadding']);
BM.Equip.EBodyStatus = eval(String(BM.Parameters['BodyInStatus']));
BM.Equip.EBodyWinShow = eval(String(BM.Parameters['ShowBodyWindow']));

BM.Equip.EBodyDefault = String(BM.Parameters['BodyImage']);
BM.Equip.EBodyIconScales = Number(BM.Parameters['ScaleEquipIcons']);
BM.Equip.ENameIcon = String(BM.Parameters['EquipmentType']);
BM.Equip.EIconFramed = eval(String(BM.Parameters['EquipmentFramed']));
BM.Equip.EShowDifference = eval(String(BM.Parameters['ShowDifference']));
BM.Equip.PaperDollMode = eval(String(BM.Parameters['PaperDollMode']));
BM.Equip.EQuasiParams = String(BM.Parameters['QuasiParams']);

BM.Data = String(BM.Parameters['EquipmentIcons']);
BM.Data = BM.Data.split(' ');
BM.Icon.EquipIcons = [];
for (BM.i = 0; BM.i < BM.Data.length; ++BM.i) {
  BM.Icon.EquipIcons.push(parseInt(BM.Data[BM.i]));
};

BM.Data = String(BM.Parameters['IconXLocation']);
BM.Data = BM.Data.split(' ');
BM.Equip.EIconXLocations = [];
for (BM.i = 0; BM.i < BM.Data.length; ++BM.i) {
  BM.Equip.EIconXLocations.push(parseInt(BM.Data[BM.i]));
};
BM.Data = String(BM.Parameters['IconYLocation']);
BM.Data = BM.Data.split(' ');
BM.Equip.EIconYLocations = [];
for (BM.i = 0; BM.i < BM.Data.length; ++BM.i) {
  BM.Equip.EIconYLocations.push(parseInt(BM.Data[BM.i]));
};

BM.Vocab.ParamNames = [];
BM.Vocab.ParamNames['mhp'] = String(BM.Parameters['MhpVocab']);
BM.Vocab.ParamNames['mmp'] = String(BM.Parameters['MmpVocab']);
BM.Vocab.ParamNames['atk'] = String(BM.Parameters['AtkVocab']);
BM.Vocab.ParamNames['def'] = String(BM.Parameters['DefVocab']);
BM.Vocab.ParamNames['mat'] = String(BM.Parameters['MatVocab']);
BM.Vocab.ParamNames['mdf'] = String(BM.Parameters['MdfVocab']);
BM.Vocab.ParamNames['agi'] = String(BM.Parameters['AgiVocab']);
BM.Vocab.ParamNames['luk'] = String(BM.Parameters['LukVocab']);
BM.Vocab.ParamNames['hit'] = String(BM.Parameters['HitVocab']);
BM.Vocab.ParamNames['eva'] = String(BM.Parameters['EvaVocab']);
BM.Vocab.ParamNames['cri'] = String(BM.Parameters['CriVocab']);
BM.Vocab.ParamNames['cev'] = String(BM.Parameters['CevVocab']);
BM.Vocab.ParamNames['mev'] = String(BM.Parameters['MevVocab']);
BM.Vocab.ParamNames['mrf'] = String(BM.Parameters['MrfVocab']);
BM.Vocab.ParamNames['cnt'] = String(BM.Parameters['CntVocab']);
BM.Vocab.ParamNames['hrg'] = String(BM.Parameters['HrgVocab']);
BM.Vocab.ParamNames['mrg'] = String(BM.Parameters['MrgVocab']);
BM.Vocab.ParamNames['trg'] = String(BM.Parameters['TrgVocab']);
BM.Vocab.ParamNames['tgr'] = String(BM.Parameters['TgrVocab']);
BM.Vocab.ParamNames['grd'] = String(BM.Parameters['GrdVocab']);
BM.Vocab.ParamNames['rec'] = String(BM.Parameters['RecVocab']);
BM.Vocab.ParamNames['pha'] = String(BM.Parameters['PhaVocab']);
BM.Vocab.ParamNames['mcr'] = String(BM.Parameters['McrVocab']);
BM.Vocab.ParamNames['tcr'] = String(BM.Parameters['TcrVocab']); 
BM.Vocab.ParamNames['pdr'] = String(BM.Parameters['PdrVocab']);
BM.Vocab.ParamNames['mdr'] = String(BM.Parameters['MdrVocab']);
BM.Vocab.ParamNames['fdr'] = String(BM.Parameters['FdrVocab']);
BM.Vocab.ParamNames['exr'] = String(BM.Parameters['ExrVocab']);
//-----------------------------------------------------------------------------
TextManager.paramName = function(paramName) {
	var name = BM.Vocab.ParamNames[paramName]
	if(!name || name == '') {
		switch(paramName){
			case 'mhp':
			return $dataSystem.terms.params[0] || '';
			case 'mmp':
			return $dataSystem.terms.params[1] || '';
			case 'atk':
			return $dataSystem.terms.params[2] || '';
			case 'def':
			return $dataSystem.terms.params[3] || '';
			case 'mat': 
			return $dataSystem.terms.params[4] || '';
			case 'mdf':
			return $dataSystem.terms.params[5] || '';
			case 'agi':
			return $dataSystem.terms.params[6] || '';
			case 'luk':
			return $dataSystem.terms.params[7] || '';
			case 'hit':
			return $dataSystem.terms.params[8] || '';
			case 'eva':
			return $dataSystem.terms.params[9] || '';
		}
	}
	if (!name || name == "undefined" && Imported.Quasi_ParamsPlus){
		for (var i = 0; i < QuasiParams._custom.length; i++) {
			if (paramName == QuasiParams._customAbr(i)){
				if (BM.Equip.EQuasiParams == 'abr'){
					name = capitalize_Words(paramName)
				} else {
					name = QuasiParams._customName(i);
				}
				break;
			}
		}
	}
	if (!name || name == "undefined"){
		name = capitalize_Words(paramName)
	}
	return name
};

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//-----------------------------------------------------------------------------
BM.Equip.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!BM.Equip.DataManager_isDatabaseLoaded.call(this)) return false;
	this.processActorNotetagsEquipBM($dataActors);
	this.processClassNotetagsEquipBM($dataClasses);
	this.processWeaponNotetagsEquipBM($dataWeapons);
	this.processArmorNotetagsEquipBM($dataArmors);
	return true;
};
DataManager.processActorNotetagsEquipBM = function(group) {
	BM.Equip.EBodyAImages = [];
	BM.Equip.EBodyAImageOffsets = [];
	BM.Equip.EBodyAImageScales = [];
	BM.Equip.EBodyAIconX = [];
	BM.Equip.EBodyAIconY = [];
	BM.Equip.EBodyAImage = [];
	var offsetMatcher = /<(?:EBODYOFFSET):[ ]*([\+\-\s*]\d+)\s*,\s*([\+\-\s*]\d+)>/i;
	var iconoffsetMatcher = /<(?:EICON-)(\d+):[ ]*(\d+)\s*,\s*(\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		BM.Equip.EBodyAImageScales[n] = 1;		
		BM.Equip.EBodyAImageOffsets[n] = [0, 0];
		BM.Equip.EBodyAIconX[n] = [];
		BM.Equip.EBodyAIconY[n] = [];
		BM.Equip.EBodyAImage[n] = false
		var obj = group[n];
		var notedata = obj.note.split(/\r?\n/);
		for (var i = 0; i < notedata.length; i++) {			
			var line = notedata[i];
			if (line.match(/<(?:EBODYIMAGE):[ ]([\w\s]+)>/i)) {
				var eBody = RegExp.$1;
				BM.Equip.EBodyAImage[n] = true;
				if (eBody == '')eBody = undefined;	
				else //;					
				BM.Equip.EBodyAImages[n] = eBody;
			} else if (line.match(/<(?:EBODYSCALE):[ ](\d+.?\d+)>/i)) {
				var eBodyScale = parseFloat(RegExp.$1);
				if (eBodyScale < 0) eBodyScale = 0;				
				BM.Equip.EBodyAImageScales[n] = eBodyScale;
			} else if (line.match(offsetMatcher)) {
				BM.Equip.EBodyAImageOffsets[n] = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
			} else if (line.match(iconoffsetMatcher)) {	
				BM.Equip.EBodyAIconX[n][parseInt(RegExp.$1)] = parseInt(RegExp.$2);
				BM.Equip.EBodyAIconY[n][parseInt(RegExp.$1)] = parseInt(RegExp.$3);
			} 
		}	
	}
};
DataManager.processClassNotetagsEquipBM = function(group) {
	BM.Equip.EBodyCImages = [];
	BM.Equip.EBodyCImageOffsets = [];
	BM.Equip.EBodyCImageScales = [];
	BM.Equip.EBodyCIconX = [];
	BM.Equip.EBodyCIconY = [];
	var offsetMatcher = /<(?:EBODYOFFSET):[ ]*([\+\-\s*]\d+)\s*,\s*([\+\-\s*]\d+)>/i;
	var iconoffsetMatcher = /<(?:EICON-)(\d+):[ ]*([\+\-\s*]\d+)\s*,\s*([\+\-\s*]\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		BM.Equip.EBodyCImageScales[n] = 1;		
		BM.Equip.EBodyCImageOffsets[n] = [0, 0];
		BM.Equip.EBodyCIconX[n] = [];
		BM.Equip.EBodyCIconY[n] = [];
		var notedata = obj.note.split(/\r?\n/);
		for (var i = 0; i < notedata.length; i++) {			
			var line = notedata[i];
			if (line.match(/<(?:EBODYIMAGE):[ ]([\w\s]+)>/i)) {
				var eBody = RegExp.$1;
				if (eBody == '') eBody = undefined;				
				BM.Equip.EBodyCImages[n] = eBody;
			} else if (line.match(/<(?:EBODYSCALE):[ ](\d+.?\d+)>/i)) {
				var eBodyScale = parseFloat(RegExp.$1);
				if (eBodyScale < 0) eBodyScale = 0;				
				BM.Equip.EBodyCImageScales[n] = eBodyScale;
			} else if (line.match(offsetMatcher)) {
				BM.Equip.EBodyCImageOffsets[n] = [parseInt(RegExp.$1), parseInt(RegExp.$2)];
			} else if (line.match(iconoffsetMatcher)) {	
				BM.Equip.EBodyCIconX[n][parseInt(RegExp.$1)] = parseInt(RegExp.$2);
				BM.Equip.EBodyCIconY[n][parseInt(RegExp.$1)] = parseInt(RegExp.$3);
			} 
		}	
	}
};
DataManager.processWeaponNotetagsEquipBM = function(group) {
	BM.Equip.EBodyIconWImages = [];
	BM.Equip.EIconWImage = [];
	for (var n = 1; n < group.length; n++) {
		BM.Equip.EIconWImage[n] = false
		var obj = group[n];
		obj.eBodyIconImages = [];
		var notedata = obj.note.split(/\r?\n/);
		for (var i = 0; i < notedata.length; i++) {			
			var line = notedata[i];
			if (line.match(/<(?:EICONIMAGE):[ ]([\w\s]+)>/i)) {
				var eBody = RegExp.$1;
				BM.Equip.EIconWImage[n] = true;
				if (eBody == '')eBody = undefined;	
				else //;					
				BM.Equip.EBodyIconWImages[n] = eBody;
				obj.eBodyIconImages = eBody;
			} 
		}		
		ImageManager.loadPicture(BM.Equip.EBodyIconWImages[n]);
	}
};
DataManager.processArmorNotetagsEquipBM = function(group) {
	BM.Equip.EBodyIconAImages = [];
	BM.Equip.EIconAImage = [];
	for (var n = 1; n < group.length; n++) {
		BM.Equip.EIconAImage[n] = false
		var obj = group[n];
		var notedata = obj.note.split(/\r?\n/);
		for (var i = 0; i < notedata.length; i++) {			
			var line = notedata[i];
			if (line.match(/<(?:EICONIMAGE):[ ]([\w\s]+)>/i)) {
				var eBody = RegExp.$1;
				BM.Equip.EIconAImage[n] = true;
				if (eBody == '')eBody = undefined;	
				else;					
				BM.Equip.EBodyIconAImages[n] = eBody;
				obj.eBodyIconImages = eBody;
				
			} 
		}	
		ImageManager.loadPicture(BM.Equip.EBodyIconAImages[n]);
	}
};
//
//Game Actor
//
BM.Equip.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	BM.Equip.Game_Actor_initMembers.call(this);
	this._ebodyName = '';
	this._ebodyScale = '';
	this._ebodyOffset = '';	
};
BM.Equip.Game_Actor_initImages = Game_Actor.prototype.initImages;
Game_Actor.prototype.initImages = function() {
	BM.Equip.Game_Actor_initImages.call(this);
	Game_Actor.prototype.defineEBodyImage.call(this);
};
Game_Actor.prototype.defineEBodyImage = function (){
	if (BM.Equip.EBodyAImage[this._actorId]) {
		this._ebodyName = BM.Equip.EBodyAImages[this._actorId];
		this._ebodyScale = BM.Equip.EBodyAImageScales[this._actorId];
		this._ebodyOffset = BM.Equip.EBodyAImageOffsets[this._actorId];
	} else if (BM.Equip.EBodyCImages[this._classId]) {
		this._ebodyName = BM.Equip.EBodyCImages[this._classId];
		this._ebodyScale = BM.Equip.EBodyCImageScales[this._classId];
		this._ebodyOffset = BM.Equip.EBodyCImageOffsets[this._classId];
	} else {
		this._ebodyName = BM.Equip.EBodyDefault;
		this._ebodyScale = 1;
		this._ebodyOffset = [0, 0];
	}
	ImageManager.loadPicture(this._ebodyName);
};
Game_Actor.prototype.setEBodyImage = function(eBodyName) {
    this._ebodyName = eBodyName;
	this._ebodyScale = 1;
	this._ebodyOffset = [0, 0];
	ImageManager.loadPicture(this._ebodyName);
};
Game_Actor.prototype.setEBodyScale = function(eBodyScale) {
	this._ebodyScale = eBodyScale;
};
Game_Actor.prototype.setEBodyOffset = function(eBodyOffset_x,eBodyOffset_y) {
	this._ebodyOffset = [eBodyOffset_x,eBodyOffset_y];
};
BM.Equip.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
	BM.Equip.Game_Actor_changeClass.call(this, classId, keepExp);
    Game_Actor.prototype.defineEBodyImage.call(this);
    this.refresh();
};
//-----------------------------------------------------------------------------
// Window_Base
//-----------------------------------------------------------------------------
Window_Base.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();    
    this.changePaintOpacity(false);    
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);    
    this.changePaintOpacity(true);
};
Window_Base.prototype.drawFramedBox = function(dx, dy, dw, dh) {
    var color1 = this.gaugeBackColor();  
	var	color2 = this.normalColor();
	this.contents.fillRect(dx, dy, dw, dh, color2);	   
	this.contents.clearRect(dx + 1, dy + 1, dw - 2, dh - 2)
};
Window_Base.prototype.textLineHeight = function() {
	return (this.contents.fontSize + this.textPadding()*2)
};
Window_Base.prototype.drawActorEBody = function(actor, x, y) {
	var name = actor._ebodyName
	var scale = actor._ebodyScale;
	var offsets = actor._ebodyOffset;
	var bitmap = ImageManager.loadPicture(name);
	var sw = bitmap.width;
	var sh = bitmap.height;
	this.contents.blt(bitmap, 0, 0, sw, sh,  // Image, top-left (x,y) from source image, source width + height to use
	x + offsets[0], y + offsets[1], // destination (x, y) to use.  Of note - anything past contentsWidth() + contentsHeight() is auto-clipped!
	Math.floor(sw * scale), Math.floor(sh * scale)); // destination width, height - can be used to scale!	
};
Window_Base.prototype.drawEIcon = function(item, x, y, width, height) {
    if (item) {
		var scale = 1
		var scale = BM.Equip.EBodyIconScales
		if (item.etypeId == 1) var name = BM.Equip.EBodyIconWImages;
		else var name = BM.Equip.EBodyIconAImages;
		if (name[item.id]){
			this.drawEIconImage(name[item.id], x, y, width*scale, height*scale);
		}else if (BM.Equip.PaperDollMode == false){
			this.drawIcon(item.iconIndex, x, y, width*scale, height*scale);
		}			
    }
};
Window_Base.prototype.drawEIconImage = function(name, x, y,width, height) {
	var bitmap = ImageManager.loadPicture(name);
	var pw = bitmap.width;
	var ph = bitmap.height;
	var sx = 0;
	var sy = 0;   
	if (BM.Equip.PaperDollMode){
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
	}else{
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
	}
};
Window_Base.prototype.drawIcon = function(iconIndex, x, y, width, height) {
	width = width || Window_Base._iconWidth;
    height = height || Window_Base._iconHeight;
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;  
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, width, height);
};
Window_Base.prototype.checkParamPercent = function(paramName) {
	percent = true;
	switch(paramName){
	case 'mhp':
	case 'mmp': 
	case 'atk':
	case 'def':
	case 'mat':
	case 'mdf':
	case 'agi':
	case 'luk':
	percent = false;
	break;
	}
	if (Imported.Quasi_ParamsPlus){
		for (var i = 0; i < QuasiParams._custom.length; i++) {
			if (paramName == QuasiParams._customAbr(i)){	
				percent = false;
				break;
			}
		}
	}
	return percent
}
//-----------------------------------------------------------------------------
// Window_EquipBody
//
// The window for selecting an equipment slot on the equipment screen.
function Window_EquipBody() {
    this.initialize.apply(this, arguments);
}
Window_EquipBody.prototype = Object.create(Window_Selectable.prototype);
Window_EquipBody.prototype.constructor = Window_EquipBody;

Window_EquipBody.prototype.initialize = function(x, y) {
	var height = Graphics.boxHeight - y;
	var width = this.windowWidth();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
	this._slotId = -1
    this.refresh();
};
Window_EquipBody.prototype.fittingHeight = function(numLines) {
    return numLines * this.lineHeight() + BM.Equip.Window_EquipBody_standardPadding() * 2;
};
Window_EquipBody.prototype.windowWidth = function() {
	return BM.Equip.EStatusWidth;
};
Window_EquipBody.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();    
	}
	
};
Window_EquipBody.prototype.maxItems = function() {
    return this._actor ? this._actor.equipSlots().length : 0;
};
Window_EquipBody.prototype.item = function() {
    return this._actor ? this._actor.equips()[this.index()] : null;
};
Window_EquipBody.prototype.drawAllItems = function() {
	if (this._actor) {
		this.drawActorEBody(this._actor, 0, 0);
		this.drawActorName(this._actor, this.textPadding() + this.bmPadding(), this.bmPadding());
	}	
	Window_Selectable.prototype.drawAllItems.call(this)
};
Window_EquipBody.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRect(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
		if (BM.Equip.EIconFramed && (BM.Equip.PaperDollMode == false)){
			this.drawFramedBox(rect.x - 4,rect.y + this.contents.fontSize - 4, rect.width + 8, rect.height + 8);
		}
		this.makeFontSmaller();
		if (BM.Equip.PaperDollMode == false){
			this.drawText(this.slotName(index), rect.x - 4, rect.y - 4, rect.width + 8, this.lineHeight(),'center');
		}
		this.makeFontBigger();		
		this.drawEIcon(this._actor.equips()[index], rect.x, rect.y + this.contents.fontSize, Window_Base._iconWidth, Window_Base._iconHeight);
        this.changePaintOpacity(true);
    }
};
Window_EquipBody.prototype.itemRect = function(index) {
	var scale = BM.Equip.EBodyIconScales
	var xa = BM.Equip.EIconXLocations;
	var ya = BM.Equip.EIconYLocations;
	console.log(BM.Equip.EBodyCIconX[this._actor._actorId])
	if (BM.Equip.EBodyCIconX[this._actor._actorId] !== undefined){
		if (BM.Equip.EBodyCIconX[this._actor._actorId][index] !== undefined) {
			var xa = BM.Equip.EBodyCIconX[this._actor._actorId];
			var ya = BM.Equip.EBodyCIconY[this._actor._actorId];
		};
	};
	if (BM.Equip.EBodyAIconX[this._actor._actorId] !== undefined){
		if (BM.Equip.EBodyAIconX[this._actor._actorId][index] !== undefined) {
			var xa = BM.Equip.EBodyAIconX[this._actor._actorId];
			var ya = BM.Equip.EBodyAIconY[this._actor._actorId];			
		};
	};
    var rect = new Rectangle();
    rect.width = Window_Base._iconWidth * scale;
    rect.height = Window_Base._iconHeight * scale;
    rect.x = xa[index]
    rect.y = ya[index]
    return rect;
};
Window_EquipBody.prototype.slotName = function(index) {
    var slots = this._actor.equipSlots();
    return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
};
Window_EquipBody.prototype.isEnabled = function(index) {
    return this._actor ? this._actor.isEquipChangeOk(index) : false;
};
Window_EquipBody.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};
Window_EquipBody.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
        this._slotId = slotId;
        this.refresh();
		this.updateCursor();
    }
};
Window_EquipBody.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this.updateCursor();
}	
Window_EquipBody.prototype.updateCursor = function() {
	if (BM.Equip.PaperDollMode == false){
    if (this._cursorAll) {
        var allRowsHeight = this.maxRows() * this.itemHeight();
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
        var rect = this.itemRect(this._slotId);
        this.setCursorRect(rect.x - 2, rect.y - 2 + this.contents.fontSize, rect.width + 4, rect.height + 4);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
	}
};
BM.Equip.Window_EquipBody_standardPadding = Window_EquipBody.prototype.standardPadding;
Window_EquipBody.prototype.standardPadding = function() {
    return BM.Equip.EBodyPadding;
};
Window_EquipBody.prototype.bmPadding = function() {
	return BM.Equip.Window_EquipBody_standardPadding() - this.padding
};
//-----------------------------------------------------------------------------
// Window_EquipCommand
//
BM.Equip.Window_EquipCommand_updateHelp = Window_EquipCommand.prototype.updateHelp;
Window_EquipCommand.prototype.updateHelp = function() {
    BM.Equip.Window_EquipCommand_updateHelp.call(this);
	var array = [BM.Equip.EHelpEquip, BM.Equip.EHelpOptimize, BM.Equip.EHelpRemove]
	if (this._helpWindow) {
		this._helpWindow.setText(array[this.index()]);
	}
};
Window_EquipCommand.prototype.windowWidth = function() {
	if (BM.Equip.ECommandFull){
		return Graphics.width
	} else {
		return Graphics.width - BM.Equip.EStatusWidth;
	}    
};
Window_EquipCommand.prototype.maxCols = function() {
    return BM.Equip.ECommandColumns;
};
Window_EquipCommand.prototype.numVisibleRows = function() {
    return BM.Equip.ECommandRows;
};
//-----------------------------------------------------------------------------
// Window_EquipStatus-parameters
//-----------------------------------------------------------------------------
BM.Equip.Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
Window_EquipStatus.prototype.initialize = function(x, y) {
	this._item = null;
	this._newItem = null;
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};
Window_EquipStatus.prototype.windowWidth = function() {
    return BM.Equip.EStatusWidth;
};
Window_EquipStatus.prototype.windowHeight = function() {
	if (BM.Equip.ECommandFull){
		return (Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(BM.Equip.ECommandRows))
	} else{
		return (Graphics.boxHeight - this.fittingHeight(2));
	}
};
Window_EquipStatus.prototype.fittingHeight = function(numLines) {
    return numLines * this.lineHeight() + BM.Equip.Window_EquipStatus_standardPadding() * 2;
};
Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
		if (BM.Equip.EBodyStatus && BM.Equip.PaperDollMode == false) this.drawActorEBody(this._actor, 0, 0);		
        this.drawActorName(this._actor, this.textPadding() + this.bmPadding(), this.bmPadding());	
		this.drawCurrentWeapon(this.bmPadding(),this.lineHeight()+this.bmPadding())
		this.drawNewWeapon(Window_Base._iconWidth+this.bmPadding(),this.lineHeight()*5/2+this.bmPadding())
		this.contents.fontSize = BM.Equip.EParamFontSize
		var param = BM.Equip.EParameters
		var y = this.lineHeight() * 4 + this.bmPadding()
		var h = this.contents.height - y - this.bmPadding()
		var tf = h / this.textLineHeight();
		var pf = Math.floor(Math.min(tf,param.length));
		var dh = pf * this.textLineHeight();
		var dy = Math.floor((h - dh)/2 + this.bmPadding()/2);
		y = y + dy
		for (var i = 0; i < pf; i++) {
			this.drawItem(this.bmPadding(), y, param[i]);
			this.contents.fontSize = BM.Equip.EParamFontSize
			y += this.textLineHeight()
		}
		this.resetFontSettings();
    }
};
BM.Equip.Window_EquipStatus_setActor = Window_EquipStatus.prototype.setActor;
Window_EquipStatus.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
	this._actor = actor;
    this.createWidths();
	BM.Equip.Window_EquipStatus_setActor.call(actor)
};
Window_EquipStatus.prototype.bmPadding = function() {
	return BM.Equip.Window_EquipStatus_standardPadding() - this.padding 
};
Window_EquipStatus.prototype.drawCurrentWeapon = function(x, y) {
	var dx = x + Window_Base._iconWidth
	var dy = y + this.lineHeight()/2;
    this.drawDarkRect(dx, dy, this.contents.width-dx-this.bmPadding()-Window_Base._iconWidth, this.lineHeight());
    var lastFontSize = this.contents.fontSize;
    this.makeFontSmaller()
    this.drawText("Current", x, y-10, this.contents.width-x-this.bmPadding()-Window_Base._iconWidth);
    this.contents.fontSize = lastFontSize
	this.drawItemName(this._item, dx, dy, this.contents.width-dx-this.bmPadding()-6-Window_Base._iconWidth);
};
Window_EquipStatus.prototype.createWidths = function() {
    this._paramNameWidth = 0;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < 8; ++i) {
      var value1 = this.textWidth(TextManager.param(i));
      var value2 = this.textWidth(this._actor.paramMax(i));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};
Window_EquipStatus.prototype.drawNewWeapon = function(x, y) {
	var dx = x + Window_Base._iconWidth
	var dy = y + this.lineHeight()/2;
    this.drawDarkRect(dx, dy, this.contents.width-dx-this.bmPadding(), this.lineHeight());
    var lastFontSize = this.contents.fontSize;
    this.makeFontSmaller()
    this.drawText("To New", x, y-10, this.contents.width-x-this.bmPadding());
    this.contents.fontSize = lastFontSize
	if (this._tempActor) {		
		this.drawItemName(this._newItem, dx, dy, this.contents.width-dx-this.bmPadding()-6);
	}
};
Window_EquipStatus.prototype.drawItem = function(x, y, paramName) {
	this.drawDarkRect(x, y, this.contents.width-x-this.bmPadding(), this.textLineHeight());
	this.drawRightArrow(y);
	var percent = true
	if (paramName){
		this.drawParamName(y, paramName);
		var percent = this.checkParamPercent(paramName)
		if (this._actor) {
			this.drawCurrentParam(y, paramName, percent);
		}		
		if (this._tempActor) {
			this.drawNewParam(y, paramName, percent);
			if (BM.Equip.EShowDifference) this.drawParamDifference(y, paramName, percent);
		}
	}
};
Window_EquipStatus.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'right');
};
Window_EquipStatus.prototype.drawParamName = function(y, paramName) {
	var x = this.textPadding();
    this.changeTextColor(this.systemColor());
	var name = TextManager.paramName(paramName);
	this.drawText(name, x, y, this._paramNameWidth);
};
Window_EquipStatus.prototype.drawCurrentParam = function(y, paramName, percent) {
	var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 3 + this._arrowWidth;
    this.resetTextColor();
	if (eval("this._actor." + paramName, this) != undefined) {
	var value = eval("this._actor." + paramName, this);
	if (percent == true) {			
		value = Math.round(value * 100) + "%";
	}
	this.drawText(value, x, y, this._paramValueWidth, 'right');
	}
};
Window_EquipStatus.prototype.drawNewParam = function(y, paramName, percent) {
	var x = this.contents.width - this.textPadding()*2;
    x -= this._paramValueWidth;
	if (eval("this._tempActor." + paramName, this) != undefined) {
	var oldValue = eval("this._actor." + paramName, this);
	var newValue = eval("this._tempActor." + paramName, this);
    var diffvalue = newValue - oldValue;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	if (percent == true) {
		newValue = Math.round(newValue * 100) + "%";
	}
	if (diffvalue > 0 && BM.Icon.Plus && BM.Icon.Plus != 0){
		this.drawIcon(BM.Icon.Plus, x, y)
	}
	if (diffvalue < 0 && BM.Icon.Minus && BM.Icon.Minus != 0){
		this.drawIcon(BM.Icon.Minus, x, y)
	}
    this.drawText(newValue, 0, y, this.contents.width-this.textPadding(), 'right');

	}
};
Window_EquipStatus.prototype.drawParamDifference = function(y, paramName, percent) {
	this.contents.fontSize = BM.Equip.EParamFontSize/1.5
    var x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth/2;
    if (eval("this._tempActor." + paramName, this) != undefined) {
	var oldValue = eval("this._actor." + paramName, this);
	var newValue = eval("this._tempActor." + paramName, this);
	var diffvalue = newValue - oldValue;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = diffvalue;
	if (percent == true) {
		text = Math.round(text * 100) + "%";
	}
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else if (diffvalue === 0){
	  text = ''
	} else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y - this.contents.fontSize/1.5, this._bonusValueWidth, 'left');
	}
};
Window_EquipStatus.prototype.setItem = function(slotId) {
    if (this._item !== slotId) {
        this._item = slotId;
        this.refresh();
    }
};
Window_EquipStatus.prototype.setNewItem = function(item) {
    if (this._newItem === item) return;
    this._newItem = item;
    this.refresh();
};
BM.Equip.Window_EquipStatus_standardPadding = Window_EquipStatus.prototype.standardPadding;
Window_EquipStatus.prototype.standardPadding = function() {
    return BM.Equip.EBodyStatus ? BM.Equip.EBodyPadding : BM.Equip.Window_EquipStatus_standardPadding();
};
//-----------------------------------------------------------------------------
// Window_EquipSlot
//-----------------------------------------------------------------------------
BM.Equip.Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
Window_EquipSlot.prototype.initialize = function(x, y, width, height) {
	var height = Math.floor(Math.min(height,this.windowHeight()));
    BM.Equip.Window_EquipSlot_initialize.call(this, x, y, width, height);
};
Window_EquipSlot.prototype.windowHeight = function() {
	if (BM.Equip.EHideList) {
		return (Graphics.boxHeight - this.fittingHeight(2) - this.fittingHeight(1));
	} else {
		return this.fittingHeight(this.numVisibleRows());
	}		
};
Window_EquipSlot.prototype.setBodyWindow = function(bodyWindow) {
    this._bodyWindow = bodyWindow;
    this.callUpdateHelp();
};
Window_EquipSlot.prototype.numVisibleRows = function() {
    return (this._actor ? this._actor.equipSlots().length : $dataSystem.equipTypes.length) - 1;
};
BM.Equip.Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
Window_EquipSlot.prototype.drawItem = function(index) {
	if (BM.Equip.ENameIcon == 'names'){
		BM.Equip.Window_EquipSlot_drawItem.call(this, index);
	} else {
		if (this._actor) {
			var rect = this.itemRectForText(index);
			this.changeTextColor(this.systemColor());
			this.changePaintOpacity(this.isEnabled(index));
			this.drawEquipSlotIcon(index, rect.x, rect.y)
			var dx = rect.x + Window_Base._iconWidth + 10
			this.drawItemName(this._actor.equips()[index], dx, rect.y, this.contents.width - dx);
			this.changePaintOpacity(true);			
		}
	}
};
Window_EquipSlot.prototype.drawEquipSlotIcon = function(index, x, y){
	var eIcon = BM.Icon.EquipIcons;
	var equippedIcon = this._actor.equips()[index];
	this.drawIcon(eIcon[index], x, y);
}
BM.Equip.Window_EquipSlot_drawItemName = Window_EquipSlot.prototype.drawItemName;
Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
	width = width || this.contents.width;
	BM.Equip.Window_EquipSlot_drawItemName.call(this, item, x, y, width - x - this.textPadding());    
};
BM.Equip.Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function() {
    BM.Equip.Window_EquipSlot_updateHelp.call(this);
    if (SceneManager._scene instanceof Scene_Equip && this._bodyWindow) {
		this._bodyWindow.setSlotId(this.index());
    }
	if (SceneManager._scene instanceof Scene_Equip && this._compareWindow) {
		if (this._compareWindow) this._compareWindow.setItem(this.item());
    }
	if (SceneManager._scene instanceof Scene_Equip && this._statusWindow) {
		if (this._statusWindow) this._statusWindow.setItem(this.item());
    }
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//-----------------------------------------------------------------------------
Window_EquipItem.prototype.maxCols = function() {
    return 1;
};
BM.Equip.Window_EquipItem_updateHelp = Window_EquipItem.prototype.updateHelp;
Window_EquipItem.prototype.updateHelp = function() {
    BM.Equip.Window_EquipItem_updateHelp.call(this);
	if (SceneManager._scene instanceof Scene_Equip && this._compareWindow) {
		if (this._compareWindow) this._compareWindow.setNewItem(this.item());
    }
	if (SceneManager._scene instanceof Scene_Equip && this._statusWindow) {
		if (this._statusWindow) this._statusWindow.setNewItem(this.item());
    }
};

//-----------------------------------------------------------------------------
// Scene_Equip
//-----------------------------------------------------------------------------
BM.Equip.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
	BM.Equip.Scene_Equip_create.call(this);
	this.relocateWindows();
}
Scene_Equip.prototype.relocateWindows = function() {
	this._statusWindow.y = this._bodyWindow.y
	if (BM.Equip.ECommandWindowAlign != 'right') {
		this._commandWindow.x = 0;
		this._itemWindow.x = 0;
		this._slotWindow.x = 0;
		this._bodyWindow.x = this._slotWindow.width;
		this._statusWindow.x = this._slotWindow.width;		
	};
	if (BM.Equip.ECommandWindowAlign == 'right') {
		this._commandWindow.x = this._bodyWindow.width;
		this._itemWindow.x = this._bodyWindow.width;
		this._slotWindow.x = this._bodyWindow.width;
		this._bodyWindow.x = 0;
		this._statusWindow.x = 0;		
	};
	if (BM.Equip.EHideList) {
		this._itemWindow.hide();
	};
	if (Imported.YEP_EquipCore == true){
		this._compareWindow.x = this._bodyWindow.x
		if (BM.Equip.EBodyWinShow){
			this._compareWindow.hide();
		} else {
			this._compareWindow.show();
		};
		if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
			this._infoWindow.x = this._bodyWindow.x 
		}
		if (Imported.YEP_X_EquipRequirements && Yanfly.Param.EqReqWindow){
			this._requirementWindow.x = this._bodyWindow.x 
		}
	}
}
BM.Equip.Scene_Equip_createStatusWindow = Scene_Equip.prototype.createStatusWindow;
Scene_Equip.prototype.createStatusWindow = function() {
    BM.Equip.Scene_Equip_createStatusWindow.call(this);
	if (BM.Equip.EBodyWinShow || Imported.YEP_EquipCore){
		this._statusWindow.hide();
	}
};
Scene_Equip.prototype.createBodyWindow = function() {
	if (BM.Equip.ECommandFull){
		this._bodyWindow = new Window_EquipBody(0, this._slotWindow.y);
	} else {
		this._bodyWindow = new Window_EquipBody(0, this._helpWindow.height);
	}
    this._slotWindow.setBodyWindow(this._bodyWindow);
	this.addWindow(this._bodyWindow);	
	if (!BM.Equip.EBodyWinShow){
		this._bodyWindow.hide();
	}
};
Scene_Equip.prototype.createSlotWindow = function() {
    var wx = BM.Equip.EStatusWidth;
    var ww = Graphics.boxWidth - BM.Equip.EStatusWidth;
	var wy = this._commandWindow.y + this._commandWindow.height;
	var wh = Graphics.boxHeight - wy
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
};
Scene_Equip.prototype.createItemWindow = function() {
    var wx = BM.Equip.EStatusWidth;
	var ww = Graphics.boxWidth - BM.Equip.EStatusWidth;
	var wy = this._slotWindow.y + this._slotWindow.height;    
	var wh = Graphics.boxHeight - wy;
	if (BM.Equip.EHideList) {
		var wy = this._commandWindow.y + this._commandWindow.height;
		var wh = Graphics.boxHeight - wy;		
	}
    this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setStatusWindow(this._statusWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
	this.createBodyWindow();
};
BM.Equip.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
	var actor = this.actor();
	this._bodyWindow.setActor(actor);
	BM.Equip.Scene_Equip_refreshActor.call(this);  
};
BM.Equip.Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
Scene_Equip.prototype.commandEquip = function() {
	BM.Equip.Scene_Equip_commandEquip.call(this);
    this._bodyWindow.activate();
	this._bodyWindow.select(0);
};
BM.Equip.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    BM.Equip.Scene_Equip_onSlotOk.call(this);
	if (BM.Equip.EHideList) {
		this._itemWindow.show();
		this._slotWindow.hide();
	}
	this._statusWindow.show();
	if (Imported.YEP_EquipCore == true){
		this._compareWindow.show();
		this._statusWindow.hide();
	}
	this._bodyWindow.hide();
};
BM.Equip.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function() {
	BM.Equip.Scene_Equip_onSlotCancel.call(this);
	this._bodyWindow.deselect();
    this._bodyWindow.deactivate();
};
BM.Equip.Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk = function() {
    BM.Equip.Scene_Equip_onItemOk.call(this);
	if (BM.Equip.EHideList) {
		this._itemWindow.hide();
		this._slotWindow.show();
	}
	if (Imported.YEP_EquipCore == true){
		if (BM.Equip.EBodyWinShow){
			this._compareWindow.hide();
		} else {
			this._compareWindow.show();
		};
		if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
			this._infoWindow.hide();
		}
		if (Imported.YEP_X_EquipRequirements && Yanfly.Param.EqReqWindow){
			this._requirementWindow.hide();
		}
	}
	if (BM.Equip.EBodyWinShow || Imported.YEP_EquipCore){
		this._statusWindow.hide();
	};
	if (BM.Equip.EBodyWinShow){
		this._bodyWindow.show();
	};
	this._bodyWindow.refresh();
};
BM.Equip.Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
Scene_Equip.prototype.onItemCancel = function() {
    BM.Equip.Scene_Equip_onItemCancel.call(this);
	if (BM.Equip.EHideList) {
		this._itemWindow.hide();
		this._slotWindow.show();
	} else {
		this._itemWindow.show();
	}
	if (Imported.YEP_EquipCore == true){
		if (BM.Equip.EBodyWinShow){
			this._compareWindow.hide();
		} else {
			this._compareWindow.show();
		};
		if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
			this._infoWindow.hide();
		}
		if (Imported.YEP_X_EquipRequirements && Yanfly.Param.EqReqWindow){
			this._requirementWindow.hide();
		}
	}
	if (BM.Equip.EBodyWinShow || Imported.YEP_EquipCore){
		this._statusWindow.hide();
	};
	if (BM.Equip.EBodyWinShow){
		this._bodyWindow.show();
	};
};
BM.Equip.Scene_Equip_commandOptimize = Scene_Equip.prototype.commandOptimize;
Scene_Equip.prototype.commandOptimize = function() {
	BM.Equip.Scene_Equip_commandOptimize.call(this);
    this._bodyWindow.refresh();
};
BM.Equip.Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
Scene_Equip.prototype.commandClear = function() {
	BM.Equip.Scene_Equip_commandClear.call(this);
    this._bodyWindow.refresh();
};

//
// fix it for Yanfly equip
//
//=============================================================================
if (Imported.YEP_EquipCore == true){
//=============================================================================
Window_EquipItem.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
        this._slotId = slotId;
        this.refresh();
        this.resetScroll();
    }
};
//=============================================================================
Window_EquipSlot.prototype.drawItem = function(index) {
	if (BM.Equip.ENameIcon == 'names'){
		if (!this._actor) return;
		var rect = this.itemRectForText(index);
		this.changeTextColor(this.systemColor());
		this.changePaintOpacity(this.isEnabled(index));
		var ww1 = this._nameWidth;
		this.drawText(this.slotName(index), rect.x, rect.y, ww1);
		var ww2 = this.contents.width - ww1;
		var item = this._actor.equips()[index];
		if (item) {
			this.drawItemName(item, rect.x + ww1, rect.y);
		} else {
			this.drawEmptySlot(rect.x + ww1, rect.y, ww2);
		}
		this.changePaintOpacity(true);
	} else {
		if (this._actor) {
			var rect = this.itemRectForText(index);
			this.changeTextColor(this.systemColor());
			this.changePaintOpacity(this.isEnabled(index));
			var ww1 = Window_Base._iconWidth + 10;
			this.drawEquipSlotIcon(index, rect.x, rect.y)
			var ww2 = this.contents.width - ww1;
			var item = this._actor.equips()[index];
			if (item) {
				this.drawItemName(item, rect.x + ww1, rect.y);
			} else {
				this.drawEmptySlot(rect.x + ww1, rect.y, ww2);
			}
			this.changePaintOpacity(true);			
		}
	}
};
//=============================================================================
Scene_Equip.prototype.createCompareWindow = function() {
    this._lowerRightWindows = [];
    var wx = this._bodyWindow.x;
    var wy = this._bodyWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._compareWindow = new Window_EquipStatus(wx, wy);
    this._slotWindow.setStatusWindow(this._compareWindow);
    this._itemWindow.setStatusWindow(this._compareWindow);
    this.addWindow(this._compareWindow);
    this._lowerRightWindows.push(this._compareWindow);
    if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
      this.createItemInfoWindow();
    }
	if (Imported.YEP_X_EquipRequirements && Yanfly.Param.EqReqWindow){
	  this.createRequirementWindow();
	}	
};
Scene_Equip.prototype.createItemInfoWindow = function() {
    var wx = this._bodyWindow.x;
    var wy = this._bodyWindow.y;
    var ww = this._bodyWindow.width;
    var wh = this._bodyWindow.height;
    this._infoWindow = new Window_ItemInfo(wx, wy, ww, wh);
    this._slotWindow.setInfoWindow(this._infoWindow);
    this._itemWindow.setInfoWindow(this._infoWindow);
    this.addWindow(this._infoWindow);
    this._lowerRightWindows.push(this._infoWindow);
};
Scene_Equip.prototype.createRequirementWindow = function() {
	var wx = this._bodyWindow.x;
    var wy = this._bodyWindow.y;
    var ww = this._bodyWindow.width;
    var wh = this._bodyWindow.height;
    this._requirementWindow = new Window_EquipRequirement(wx, wy, ww, wh);
    this._slotWindow.setRequirementWindow(this._requirementWindow);
    this._itemWindow.setRequirementWindow(this._requirementWindow);
    this.addWindow(this._requirementWindow);
    this._lowerRightWindows.push(this._requirementWindow);
};
Scene_Equip.prototype.updateLowerRightWindowTriggers = function() {
	if (!this._itemWindow.active)  {
		return;
	}
    if (!this._lowerRightVisibility) return;
    if (Input.isRepeated('right')) {
      this.shiftLowerRightWindows();
    } else if (Input.isRepeated('left')) {
      this.unshiftLowerRightWindows();
    } else if (Input.isRepeated('tab')) {
      this.shiftLowerRightWindows();
    } else if (this.isLowerWindowTouched()) {
      this.shiftLowerRightWindows();
    }
};
}
//=============================================================================
Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
		if (BM.Equip.EBodyStatus && BM.Equip.PaperDollMode == false) this.drawActorEBody(this._actor, 0, 0);		
		this.contents.fontSize = BM.Equip.EParamFontSize
		var param = BM.Equip.EParameters
		var y = this.lineHeight() * 0 + this.bmPadding()
		var h = this.contents.height - y - this.bmPadding()
		var tf = h / this.textLineHeight();
		var pf = Math.floor(Math.min(tf,param.length));
		var dh = pf * this.textLineHeight();
		var dy = Math.floor((h - dh)/2 + this.bmPadding()/2);
		y = y + dy
		for (var i = 0; i < pf; i++) {
			this.drawItem(this.bmPadding(), y, param[i]);
			this.contents.fontSize = BM.Equip.EParamFontSize
			y += this.textLineHeight()
		}
		this.resetFontSettings();
    }
};
Window_StatCompare.prototype.drawItem = function(x, y, paramName) {
	this.drawDarkRect(x, y, this.contents.width-x-this.bmPadding(), this.textLineHeight());
	this.drawRightArrow(y);
	var percent = true
	if (paramName){
		this.drawParamName(y, paramName);
		var percent = this.checkParamPercent(paramName)
		if (this._actor) {
			this.drawCurrentParam(y, paramName, percent);
		}		
		if (this._tempActor) {
			this.drawNewParam(y, paramName, percent);
			if (BM.Equip.EShowDifference) this.drawParamDifference(y, paramName, percent);
		}
	}
};
Window_StatCompare.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'right');
};
Window_StatCompare.prototype.drawParamName = function(y, paramName) {
	var x = this.textPadding();
    this.changeTextColor(this.systemColor());
	var name = TextManager.paramName(paramName);
	this.drawText(name, x, y, this._paramNameWidth);
};
Window_StatCompare.prototype.drawCurrentParam = function(y, paramName, percent) {
	var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 3 + this._arrowWidth;
    this.resetTextColor();
	if (eval("this._actor." + paramName, this) != undefined) {
	var value = eval("this._actor." + paramName, this);
	if (percent == true) {			
		value = Math.round(value * 100) + "%";
	}
	this.drawText(value, x, y, this._paramValueWidth, 'right');
	}
};
Window_StatCompare.prototype.drawNewParam = function(y, paramName, percent) {
	var x = this.contents.width - this.textPadding()*2;
    x -= this._paramValueWidth;
	if (eval("this._tempActor." + paramName, this) != undefined) {
	var oldValue = eval("this._actor." + paramName, this);
	var newValue = eval("this._tempActor." + paramName, this);
    var diffvalue = newValue - oldValue;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	if (percent == true) {
		newValue = Math.round(newValue * 100) + "%";
	}
	if (diffvalue > 0 && BM.Icon.Plus && BM.Icon.Plus != 0){
		this.drawIcon(BM.Icon.Plus, x, y)
	}
	if (diffvalue < 0 && BM.Icon.Minus && BM.Icon.Minus != 0){
		this.drawIcon(BM.Icon.Minus, x, y)
	}
    this.drawText(newValue, 0, y, this.contents.width-this.textPadding(), 'right');

	}
};
Window_StatCompare.prototype.drawParamDifference = function(y, paramName, percent) {
	this.contents.fontSize = BM.Equip.EParamFontSize/1.5
    var x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth/2;
    if (eval("this._tempActor." + paramName, this) != undefined) {
	var oldValue = eval("this._actor." + paramName, this);
	var newValue = eval("this._tempActor." + paramName, this);
	var diffvalue = newValue - oldValue;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = diffvalue;
	if (percent == true) {
		text = Math.round(text * 100) + "%";
	}
    text = (diffvalue > 0 ? '+' : '') + text
	text = (diffvalue != 0 ? '(' + text + ')' : '')
    this.drawText(text, x, y - this.contents.fontSize/1.5, this._bonusValueWidth, 'left');
	}
};
Window_StatCompare.prototype.bmPadding = function() {
	return BM.Equip.Window_EquipStatus_standardPadding() - this.padding 
};
Window_StatCompare.prototype.standardPadding = function() {
    return BM.Equip.EBodyStatus ? BM.Equip.EBodyPadding : BM.Equip.Window_EquipStatus_standardPadding();
};
