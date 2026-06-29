/*
 * ==============================================================================
 * ** Victor Engine MV - Conditional Turn Battle
 * ------------------------------------------------------------------------------
 *  VE_ConditionalTurnBattle.js
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Conditional Turn Battle'] = '1.01';

var VictorEngine = VictorEngine || {};
VictorEngine.ConditionalTurnBattle = VictorEngine.ConditionalTurnBattle || {};

(function() {

    VictorEngine.ConditionalTurnBattle.loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        VictorEngine.ConditionalTurnBattle.loadDatabase.call(this);
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Conditional Turn Battle', 'VE - Basic Module', '1.22');
    };

    VictorEngine.ConditionalTurnBattle.requiredPlugin = PluginManager.requiredPlugin;
    PluginManager.requiredPlugin = function(name, required, version) {
        if (!VictorEngine.BasicModule) {
            var msg = 'The plugin ' + name + ' requires the plugin ' + required;
            msg += ' v' + version + ' or higher installed to work properly.';
            msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
            throw new Error(msg);
        } else if (Imported.YEP_BattleEngineCore) {
            var msg = 'The plugin ' + name + " can't be used together with the";
            msg += ' plugin YEP Battle Engine Core.';
            throw new Error(msg);
        } else if (Imported['VE - Active Time Battle']) {
            var msg = 'The plugin ' + name + " can't be used together with the";
            msg += ' plugin VE - Active Time Battle.';
            throw new Error(msg);
        } else {
            VictorEngine.ConditionalTurnBattle.requiredPlugin.call(this, name, required, version);
        };
    };

})();

/*:
 * ==============================================================================
 * @plugindesc v1.01 - Changes the turn system to one based on individual actions.
 * @author Victor Sant
 *
 * @param = CTB Setup = 
 * @default ======================================
 *
 * @param CTB Param Weight
 * @desc How much the parameters will impect the CTB speed.
 * Default: 100 (higher value = lower impact)
 * @default 100
 *
 * @param Initial CTB Rate
 * @desc How much CTB the battlers will start with.
 * Default: 20 (0 to start always at 0)
 * @default 20
 *
 * @param CTB Ready Sound
 * @desc Sound played when the command window opens.
 * filename, volume, pitch, pan (blank for no sound)
 * @default Chime2, 90, 100, 0
 *
 * @param Show Party Command
 * @desc Show the party command window when cancel the command selection.
 * Default: true
 * @default true
 *
 * @param Turn Update Mode
 * @desc How the battle turns will be decided.
 * Default: time (time or actions)
 * @default time
 *
 * @param Turn Update Count
 * @desc If the 'Turn Update Mode' is set to actions, how many actions
 * will count a turn (allows script code)
 * @default this.allBattleMembers().length
 *
 * @param Turn Update Time
 * @desc If the 'Turn Update Mode' is set to actions, how much time will
 * pass to count a turn (influenced on the battlers average speed)
 * @default 100
 *
 * @param Regen Update Mode
 * @desc When the regeneration/poison effects will happen.
 * Default: action (action or turn)
 * @default action
 *
 * @param Buffs Update Mode
 * @desc When the buffs turns will be updated.
 * Default: action (action or turn)
 * @default action
 *
 * @param = CTB Window = 
 * @default ======================================
 *
 * @param Show CTB Window
 * @desc Show CTB Window during battles.
 * Default: true
 * @default true
 *
 * @param CTB Window X
 * @desc CTB Window X position.
 * Default: 0 (allows script code)
 * @default 0
 *
 * @param CTB Window Y
 * @desc CTB Window Y position.
 * Default: boxHeight - 256 (allows script code)
 * @default boxHeight - 256
 *
 * @param CTB Window Width
 * @desc CTB Window width.
 * Default: 64 + this.maxIcons() * 32 (allows script code)
 * @default 64 + this.maxIcons() * 32
 *
 * @param CTB Window Height
 * @desc CTB Window height.
 * Default: 72 (allows script code)
 * @default 72
 *
 * @param CTB Window Back Opacity
 * @desc CTB Window window back opacity.
 * Default: this.standardBackOpacity() (allows script code)
 * @default this.standardBackOpacity()
 *
 * @param CTB Window Frame Opacity
 * @desc CTB Window frame opacity.
 * Default: 255 (allows script code)
 * @default 255
 *
 * @param CTB Window Filename
 * @desc CTB Window background filename.
 * (leave blank for no background)
 * @default 
 * 
 * @param CTB Background Offset
 * @desc CTB Window background position offset.
 * (offset X, offset Y)
 * @default 0, 0
 *
 * @param Max Icons
 * @desc Max number of icons/pictures displayed.
 * Default: 10
 * @default 10
 *
 * @param Battler Display Distance
 * @desc Distance between each battler's icons/pictures.
 * (offset X, offset Y)
 * @default 36, 0
 *
 * @param Active Display Offset
 * @desc Offset for the active battler display.
 * (offset X, offset Y)
 * @default 0, 0
 *
 * @param = CTB Display = 
 * @default ======================================
 *
 * @param Show Names
 * @desc Show battler names on the Window display.
 * Default: false
 * @default false
 *
 * @param Names Offset
 * @desc Name Display Offset.
 * Default: 36, 0 (width, height)
 * @default 36, 0
 *
 * @param Iconset Filename
 * @desc Iconset graphic filename.
 * Default: IconSet
 * @default IconSet
 *
 * @param Icon Size
 * @desc Iconset graphic filename.
 * Default: 32, 32 (width, height)
 * @default 32, 32
 *
 * @param Actor Icon Face
 * @desc Use minature Face graphic as the actor CTB icon.
 * Default: true
 * @default true
 *
 * @param Actor Icon Offset
 * @desc Adjust the position for Actors Icons on the CTB Window.
 * (offset X, offset Y)
 * @default 0, 0
 *
 * @param Actor Icon Backgroud
 * @desc Icons that are drawn behing the battler icon.
 * (wait fill, wait full, cast fill, cast full)
 * @default 200, 201, 202, 203
 *
 * @param Default Actor Icon
 * @desc Default icon displayed for actors that don't have icons.
 * Default: 0
 * @default 0
 *
 * @param Enemy Icon Battler
 * @desc Use minature Battler graphic as the enemy CTB icon.
 * Default: true
 * @default true
 *
 * @param Enemy Icon Offset
 * @desc Adjust the position for Enemies Icons on the CTB Window.
 * (offset X, offset Y)
 * @default 0, 0
 *
 * @param Enemy Icon Backgroud
 * @desc Icons that are drawn behing the battler icon.
 * (wait fill, wait full, cast fill, cast full)
 * @default 200, 201, 202, 203
 *
 * @param Default Enemy Icon
 * @desc Default icon displayed for enemies that don't have icons.
 * Default: 0
 * @default 0
 *
 * @param Same Enemy Indicator
 * @desc Show letter or number to identify repeated enemies.
 * (letter or number)
 * @default letter
 *
 * @param Active Icon Overlay
 * @desc Overlay icon displayed over the current active battler.
 * Default: 0
 * @default 0
 *
 * @param Cast Icon Overlay
 * @desc Overlay icon displayed over battlers casting actions.
 * Default: 0
 * @default 0
 *
 * @param Icon Zoom
 * @desc Icon Zoom effect when switchin positions.
 * (vertical, horizontal, both, leave blank for no zoom)
 * @default both
 *
 * ==============================================================================
 * @help 
 * ==============================================================================
 *
 * ==============================================================================
 *  Cast Speed (notetag for Skills and Items)
 * ------------------------------------------------------------------------------
 *  <cast speed: value, param>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Adds a casting time for the action before being used.
 *   value : cast time value (default 100, higher value is faster)
 *   param : param with the cast time will be based (hp, mp, atk, def, mat, mdf, 
 *           agi or luk)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <cast speed: 100, agi>
 *       <cast speed: 150, int>
 *       <cast speed: 80, luk>
 * ==============================================================================
 *
 * ==============================================================================
 *  Cast Cancel (notetag for Skills and Items)
 * ------------------------------------------------------------------------------
 *  <cast cancel: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Chance of canceling the casting of the targets hit by the action.
 *   rate : change of canceling the cast.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <cast cancel: 25%>
 *       <cast cancel: 100%>
 * ==============================================================================
 *
 * ==============================================================================
 *  CTB Delay (notetag for Skills and Items)
 * ------------------------------------------------------------------------------
 *  <ctb delay: x%, y%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Chance of delaying the CTB of the targets hit by the action.
 *   x : change of success for the delay.
 *   y : rate of the CTB lost.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <ctb delay: 25%, 30%>
 *       <ctb delay: 100%, 15%>
 * ==============================================================================
 *
 * ==============================================================================
 *  No Cast Cancel (notetag for Skills and Items)
 * ------------------------------------------------------------------------------
 *  <no cast cancei>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The action can't have it's cast cancelled by the cast cancel effect.
 *  Relevant only on actions with cast time.
 * ==============================================================================
 *
 * ==============================================================================
 *  Timed Duration (notetag for States)
 * ------------------------------------------------------------------------------
 *  <timed duration: x>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Change the state duration to be based on a specific time, rather than being
 *  based on actions or turn. This time is also based on the battle speed.
 *   x : duration of the state (higher value last longer)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <timed duration: 100>
 *       <timed duration: 200>
 * ==============================================================================
 *
 * ==============================================================================
 *  CTB Speed (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <ctb speed: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the speed of the ctb while waiting and casting.
 *   x : ctb speed change rate. (can be negative)
 *  Increasing the ctb speed makes it faster.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <ctb speed: +50%>
 *       <ctb speed: -25%>
 * ==============================================================================
 *
 * ==============================================================================
 *  Cast Speed (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <cast speed: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the speed of the ctb only while casting.
 *   x : cast speed change rate. (can be negative)
 *  Increasing the cast speed makes it faster.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <cast speed: +50%>
 *       <cast speed: -25%>
 * ==============================================================================
 *
 * ==============================================================================
 *  Action Speed (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <action speed: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the speed of the ctb only while wating.
 *   x : action speed change rate. (can be negative)
 *  Increasing the action speed makes it faster.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <action speed: +50%>
 *       <action speed: -25%>
 * ==============================================================================
 *
 * ==============================================================================
 *  Cast Cancel (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <cast cancel: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Adds a chance of canceling the casting of the targets hit for all actions
 *  made by the battler.
 *   rate : change of canceling the cast.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <cast cancel: 25%>
 *       <cast cancel: 100%>
 * ==============================================================================
 *
 * ==============================================================================
 *  CTB Delay (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <ctb delay: x%, y%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Adds a chance of delaying the CTB of the targets hit for all actions made by
 *  the battler.
 *   x : change of success for the delay.
 *   y : rate of the CTB lost.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <ctb delay: 25%, 30%>
 *       <ctb delay: 100%, 15%>
 * ==============================================================================
 *
 * ==============================================================================
 *  Cancel Resit (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <cancel resist: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the resistance against cast cancel effects.
 *   x : rate of resistance. (can be negative)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <cancel resist: +25%>
 *       <cancel resist: -50%>
 * ==============================================================================
 *
 * ==============================================================================
 *  Delay Resit (notetag for Actors, Classes, Weapons, Armora, Enemies, States)
 * ------------------------------------------------------------------------------
 *  <deiay resist: x%>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the resistance against ctb delay effects, this affects only the
 *  sucess rate, but not the ammount of delay.
 *   x : rate of resistance. (can be negative)
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <deiay resist: +25%>
 *       <deiay resist: -50%>
 * ==============================================================================
 *
 * ==============================================================================
 *  CTB Icon (notetag for Actors and Enemies)
 * ------------------------------------------------------------------------------
 *  <ctb icon: x>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Set a custom icon for the battler when using the CTB Window.
 *   x : icon Id
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <ctb icon: 15>
 *       <ctb icon: 145>
 * ==============================================================================
 *
 * ==============================================================================
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  - Show Party Command
 *  The 'Show Party Command' plugin parameter allows you to call the party
 *  command window (the one witht he 'fight' and 'escape' commands) by canceling
 *  the actor command selection. If disabled, the cancel will not open the party
 *  window, but rather will open the command selection of another actor that
 *  has the ctb full (only if other actor has it full).
 *  Notice that the 'Escape' command will not be available if you do it, and you
 *  will need another way to enable the escape command (for example with the
 *  plugin 'VE - Battle Command Window', that allows you to setup the escape
 *  command for each actor command window)
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - Turn Update Mode
 *  The plugin parameter 'Turn Update Mode' will decide how battle turns will
 *  be counted. 
 *  If set to 'actions' a turn will be counted after a set number of battlers
 *  have take their actions, that number of battlers is decided on the plugin
 *  parameter 'Turn Update Count' (this parameter allows script codes)
 *  If set to 'time' a turn will be counted after a set time has passed. This
 *  time is based on the average battlers ctb speed and the value on the plugin
 *  parameter 'Turn Update Time'
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - Regen Update Mode and Buffs Update Mode
 *  Those plugin parameters decides when regeneration effects and buffs will be
 *  updated. 
 *  If set as 'action', they will be updated after a battler finish an action,
 *  only for that battler.
 *  If set as 'turn', they will be updated at the turn end (based on the plugin
 *  parameter 'Turn Update Mode') for all battlers.
 *  States updates are decided on the state itself (see bellow for details)
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - CTB Window
 *  The CTB Window is a different display for the turn order. Instead of each
 *  battler having their own gauge. The display is made on a single window, that has
 *  icons to represent each battler and how close they are to be ready to act.
 *  The CTB Window image must beplaced on the folder '/img/system/'
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - CTB Window Width
 *  Even though you will need an image for the Window display, the plugin does not
 *  use the image size to define the size of the CTB are. Instead you have to set
 *  the width value on the plugin parameter 'CTB Window Width'. There are two values
 *  that can be set: the normal width and the cast width. Adding those two will
 *  give the total width of the window. The normal width is used while the battler
 *  is waiting the CTB to will while it's not casting a skill. The cast width
 *  section is used when the battler is casting a skill. If the action used don't
 *  have cast time. it will skip the casting width and go to the end of the window.
 *  You can set the casting width to 0, this way the casting area will not be
 *  used and even skills with cast will use the normal width area.
 * 
 *  Notice that when the window is set to veritical, the Width parameter will decide
 *  the height of the window.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - CTB Window Icons
 *  The battlers display on the CTB Window is made with icons. The plugin parameters
 *  offers some options to change thow those icons are displayed. You can also
 *  use the notetag <ctb icon: x> on actors and enemies to assign a specific icon
 *  for that actor or enemy.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Action Speed
 *  The skill and items parameter 'Speed' (on the 'Invocation' section of the
 *  action database entry) allows you to change the speed that the CTB fills
 *  after you execute an action that has a Speed value different from zero.
 *  If the speed is higher than 0, each point of speed adds +1% to the action
 *  speed (to a max of +2000%)
 *  If the speed is lower than 0, each point of speed reduce +0.05% from the
 *  action speed (to a max of -95%)
 *  Notice that this has nothing to do with the cast speed, this will affect
 *  the CTB Speed *AFTER* the action is used and only for that action.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - State Turn Update
 *  The states turn update, differently from the Regeneration and buffs updates,
 *  is decided on the state entry on the database, on the 'Auto-removal Timing'.
 *  The removal timing 'Action End' will make the state be updated after the
 *  battler finish an action, only for that battler.
 *  The removal timing 'Turn End' will make the state be updated at the turn end
 *  (based on the plugin parameter 'Turn Update Mode') for all battlers.
 *  
 *  Beside those two timings, you can also set a third update timing with the
 *  notetag <timed duration: x>. This will make so each of the states turns last
 *  for a set time, based on the notetag value and average battler speeds. Notice
 *  that the number of turns the state will last is still valid, so if you set
 *  a time of 100 for a state a 3 turns duration, the state will last for 300
 *  (again, this value is also based on the battle speed).
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - The Guard State
 *  Because of how the plugin changes the turn count, the guard state (and any
 *  other state that should last until the next battler action) should have it
 *  Auto-removal Timing changed to 'Action End' to end at the the right time.
 *
 * ===============================================================================
 *
 * ===============================================================================
 *  Conditional Turn Battle and Battle Motions:
 * -------------------------------------------------------------------------------
 *  If using the plugin 'VE - Battle Motions', you can set a motion for the cast
 *  start. This motion will be played when the battler start chanting for the
 *  
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *    <action sequence: cast>
 *     # action sequence 
 *    </action sequence>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: 
 *    <action sequence: cast>
 *     animation: user, 52
 *     wait: user, animation
 *    </action sequence>
 * ==============================================================================
 *
 * ==============================================================================
 *  Version History:
 * ------------------------------------------------------------------------------
 *  v beta - 2016.08.29 > Beta release.
 *  v 1.00 - 2017.05.28 > First release.
 *  v 1.01 - 2017.07.20 > Fixed issue with enemies icon display.
 * ============================================================================== 
 */

(function() {

    //=============================================================================
    // Parameters
    //=============================================================================

    if (Imported['VE - Basic Module']) {
        var parameters = VictorEngine.getPluginParameters();
        VictorEngine.Parameters = VictorEngine.Parameters || {};
        VictorEngine.Parameters.ConditionalTurnBattle = {};
        VictorEngine.Parameters.ConditionalTurnBattle.Iconset = String(parameters["Iconset Filename"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.IconSize = String(parameters["Icon Size"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowWidth = String(parameters["CTB Window Width"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBModeName = String(parameters["CTB Mode Name"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBModeName = String(parameters["CTB Mode Name"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBSpeedName = String(parameters["CTB Speed Name"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBSpeedName = String(parameters["CTB Speed Name"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBModeOption = String(parameters["CTB Mode Option"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBModeOption = String(parameters["CTB Mode Option"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBReadySound = String(parameters["CTB Ready Sound"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.ActorIconBack = String(parameters["Actor Icon Backgroud"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.EnemyIconBack = String(parameters["Enemy Icon Backgroud"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowFilename = String(parameters["CTB Window Filename"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBBackgroundOffset = String(parameters["CTB Background Offset"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.TurnUpdateMode = String(parameters["Turn Update Mode"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowPosition = String(parameters["CTB Window Position"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.ActorIconOffset = String(parameters["Actor Icon Offset"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.EnemyIconOffset = String(parameters["Enemy Icon Offset"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.RegenUpdateMode = String(parameters["Regen Update Mode"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.BuffsUpdateMode = String(parameters["Buffs Update Mode"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.SameEnemy = String(parameters["Same Enemy Indicator"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.DisplayDistance = String(parameters["Battler Display Distance"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.ActiveOffset = String(parameters["Active Display Offset"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.MaxIcons = String(parameters["Max Icons"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowX = String(parameters["CTB Window X"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowY = String(parameters["CTB Window Y"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowW = String(parameters["CTB Window Width"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBWindowH = String(parameters["CTB Window Height"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.NamesOffset = String(parameters["Names Offset"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.IconZoom = String(parameters["Icon Zoom"]).trim();
        VictorEngine.Parameters.ConditionalTurnBattle.CTBSpeedOption = Number(parameters["CTB Speed Option"]) || 1;
        VictorEngine.Parameters.ConditionalTurnBattle.InitialCTBRate = Number(parameters["Initial CTB Rate"]) || 0;
        VictorEngine.Parameters.ConditionalTurnBattle.CTBParamWeight = Number(parameters["CTB Param Weight"]) || 1;
        VictorEngine.Parameters.ConditionalTurnBattle.CTBSpeedOption = Number(parameters["CTB Speed Option"]) || 1;
        VictorEngine.Parameters.ConditionalTurnBattle.TurnUpdateTime = Number(parameters["Turn Update Time"]) || 100;
        VictorEngine.Parameters.ConditionalTurnBattle.TurnUpdateCount = Number(parameters["Turn Update Count"]) || 10;
        VictorEngine.Parameters.ConditionalTurnBattle.DefaultActorIcon = Number(parameters["Default Actor Icon"]) || 0;
        VictorEngine.Parameters.ConditionalTurnBattle.DefaultEnemyIcon = Number(parameters["Default Enemy Icon"]) || 0;
        VictorEngine.Parameters.ConditionalTurnBattle.ActiveOverlay = Number(parameters["Active Icon Overlay"]) || 0;
        VictorEngine.Parameters.ConditionalTurnBattle.CastOverlay = Number(parameters["Cast Icon Overlay"]) || 0;
        VictorEngine.Parameters.ConditionalTurnBattle.ShowCTBWindow = eval(parameters["Show CTB Window"]);
        VictorEngine.Parameters.ConditionalTurnBattle.InvertCTBWindow = eval(parameters["Invert CTB Window"]);
        VictorEngine.Parameters.ConditionalTurnBattle.ActorIconFace = eval(parameters["Actor Icon Face"]);
        VictorEngine.Parameters.ConditionalTurnBattle.VerticalCTBWindow = eval(parameters["Vertical CTB Window"]);
        VictorEngine.Parameters.ConditionalTurnBattle.ShowPartyCommand = eval(parameters["Show Party Command"]);
        VictorEngine.Parameters.ConditionalTurnBattle.EnemyIconBattler = eval(parameters["Enemy Icon Battler"]);
        VictorEngine.Parameters.ConditionalTurnBattle.ShowNameWindow = eval(parameters["Show Names"]);
    }

    //=============================================================================
    // VictorEngine
    //=============================================================================

    VictorEngine.ConditionalTurnBattle.loadParameters = VictorEngine.loadParameters;
    VictorEngine.loadParameters = function() {
        VictorEngine.ConditionalTurnBattle.loadParameters.call(this);
        VictorEngine.ConditionalTurnBattle.processParameters();
    };

    VictorEngine.ConditionalTurnBattle.loadNotetagsValues = VictorEngine.loadNotetagsValues;
    VictorEngine.loadNotetagsValues = function(data, index) {
        VictorEngine.ConditionalTurnBattle.loadNotetagsValues.call(this, data, index);
        if (this.objectSelection(index, ['skill', 'item'])) {
            VictorEngine.ConditionalTurnBattle.loadNotes1(data);
        }
        if (this.objectSelection(index, ['state'])) {
            VictorEngine.ConditionalTurnBattle.loadNotes2(data);
        }
        if (this.objectSelection(index, ['actor', 'class', 'weapon', 'armor', 'enemy', 'state'])) {
            VictorEngine.ConditionalTurnBattle.loadNotes3(data);
        }
    };

    VictorEngine.ConditionalTurnBattle.processParameters = function() {
        if (!this.loaded) {
            this.loaded = true;
            this.setupSound();
            this.setupCtbWindow();
        }
    };

    VictorEngine.ConditionalTurnBattle.loadNotes1 = function(data) {
        data.ctbCast = data.ctbCast || {};
        data.ctbDelay = data.ctbDelay || {};
        this.processNotes1(data);
    };

    VictorEngine.ConditionalTurnBattle.loadNotes2 = function(data) {
        data.ctbColor = data.ctbColor || {};
        this.processNotes2(data);
    };

    VictorEngine.ConditionalTurnBattle.loadNotes3 = function(data) {
        data.ctbDelay = data.ctbDelay || {};
        this.processNotes3(data);
    };

    VictorEngine.ConditionalTurnBattle.processNotes1 = function(data) {
        var match;
        var part1 = '[ ]*(\\#\\w{6})[ ]*,[ ]*(\\#\\w{6})[ ]*'
        var regex1 = new RegExp('<cast speed:[ ]*(\\d+)[ ]*,[ ]*(\\w+)[ ]*>', 'gi');
        var regex2 = new RegExp('<cast color:' + part1 + ',' + part1 + '>', 'gi');
        var regex3 = new RegExp('<cast cancel:[ ]*(\\d+)%?>', 'gi');
        var regex4 = new RegExp('<ctb delay:[ ]*(\\d+)%?[ ]*,[ ]*(\\d+)%?[ ]*>', 'gi');
        while (match = regex1.exec(data.note)) {
            data.ctbCast.speed = Math.max(Number(match[1]), 1) / 100;
            data.ctbCast.param = VictorEngine.paramId(match[2].trim()) + 1;
        };
        while (match = regex2.exec(data.note)) {
            data.ctbCast.color = {
                fill: [match[1], match[2]],
                full: [match[3], match[4]]
            };
        };
        while (match = regex3.exec(data.note)) {
            data.castCancel = Number(match[1]) / 100;
        };
        while (match = regex4.exec(data.note)) {
            data.ctbDelay.rate = Number(match[1]) / 100;
            data.ctbDelay.effect = Number(match[2]) / 100;
        };
        data.noCastCancel = !!data.note.match(/<no cast cancei>/gi);
    };

    VictorEngine.ConditionalTurnBattle.processNotes2 = function(data) {
        var match;
        var part1 = '[ ]*(\\#[abcdef\\d]{6})[ ]*,[ ]*(\\#[abcdef\\d]{6})[ ]*'
        var regex1 = new RegExp('<ctb color:' + part1 + ',' + part1 + '>', 'gi');
        var regex2 = new RegExp('<timed duration: (\\d+)>', 'gi');
        var regex3 = new RegExp('<icon overlay: (\\d+)>', 'gi');
        while (match = regex1.exec(data.note)) {
            data.ctbColor = {
                fill: [match[1], match[2]],
                full: [match[3], match[4]]
            };
        };
        while (match = regex2.exec(data.note)) {
            data.ctbTiming = Number(match[1]) / 100;
        };
        while (match = regex3.exec(data.note)) {
            data.ctbIconOverlay = Number(match[1]);
        };
    };

    VictorEngine.ConditionalTurnBattle.processNotes3 = function(data) {
        var match;
        var regex1 = new RegExp('<(ctb|cast|action) speed: ([+-]?\\d+)%?>', 'gi');
        var regex2 = new RegExp('<cast cancel:[ ]*(\\d+)%?>', 'gi');
        var regex3 = new RegExp('<ctb delay:[ ]*(\\d+)%?[ ]*,[ ]*(\\d+)%?[ ]*>', 'gi');
        var regex4 = new RegExp('<cancel resist:[ ]*([+-]\\d+)%?>', 'gi');
        var regex5 = new RegExp('<delay resist:[ ]*([+-]\\d+)%?>', 'gi');
        var regex6 = new RegExp('<ctb icon:[ ]*(\\d+)>', 'gi');
        var regex7 = new RegExp('<hide ctb gauge>', 'gi');
        while (match = regex1.exec(data.note)) {
            var type = match[1].toLowerCase();
            data[type + 'Speed'] = Number(match[2]) / 100;
        };
        while (match = regex2.exec(data.note)) {
            data.castCancel = Number(match[1]) / 100;
        };
        while (match = regex3.exec(data.note)) {
            data.ctbDelay.rate = Number(match[1]) / 100;
            data.ctbDelay.effect = Number(match[2]) / 100;
        };
        while (match = regex4.exec(data.note)) {
            data.cancelResist = Number(match[1]) / 100;
        };
        while (match = regex5.exec(data.note)) {
            data.delayResist = Number(match[1]) / 100;
        };
        while (match = regex6.exec(data.note)) {
            data.ctbIcon = Number(match[1]);
        };
        data.hideCtbGauge = !!data.note.match(/<hide ctb gauge>/gi);
    };

    VictorEngine.ConditionalTurnBattle.setupSound = function() {
        var sound = VictorEngine.Parameters.ConditionalTurnBattle.CTBReadySound.split(/[ ]*,[ ]*/gi);
        VictorEngine.ConditionalTurnBattle.CTBReadySound = {
            name: sound[0].trim(),
            volume: Number(sound[1]) || 90,
            pitch: Number(sound[2]) || 100,
            pan: Number(sound[3]) || 0
        }
    };

    VictorEngine.ConditionalTurnBattle.setupCtbWindow = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        var size = parameters.IconSize.split(/[ ]*,[ ]*/gi);
        var actor = parameters.ActorIconOffset.split(/[ ]*,[ ]*/gi);
        var enemy = parameters.EnemyIconOffset.split(/[ ]*,[ ]*/gi);
        var position = parameters.CTBWindowPosition.split(/[ ]*,[ ]*/gi);
        var actorBack = parameters.ActorIconBack.split(/[ ]*,[ ]*/gi);
        var enemyBack = parameters.EnemyIconBack.split(/[ ]*,[ ]*/gi);
        var distance = parameters.DisplayDistance.split(/[ ]*,[ ]*/gi);
        var active = parameters.ActiveOffset.split(/[ ]*,[ ]*/gi);
        var offset = parameters.NamesOffset.split(/[ ]*,[ ]*/gi);
        var backOffset = parameters.CTBBackgroundOffset.split(/[ ]*,[ ]*/gi);
        this.window = {};
        this.window.x = parameters.CTBWindowX;
        this.window.y = parameters.CTBWindowY;
        this.window.w = parameters.CTBWindowW;
        this.window.h = parameters.CTBWindowH;
        this.window.show = parameters.ShowCTBWindow;
        this.window.maxIcons = parameters.MaxIcons;
        this.window.faces = parameters.ActorIconFace;
        this.window.invert = parameters.InvertCTBWindow;
        this.window.battlers = parameters.EnemyIconBattler;
        this.window.vertical = parameters.VerticalCTBWindow;
        this.window.iconset = parameters.Iconset || 'IconSet';
        this.window.letter = parameters.SameEnemy.toLowerCase() === 'letter';
        this.window.activeIcon = parameters.ActiveOverlay;
        this.window.castIcon = parameters.CastOverlay;
        this.window.nameWindow = parameters.ShowNameWindow;
        this.window.background = parameters.CTBWindowFilename;
        this.window.actorBack = this.parameterList(actorBack);
        this.window.enemyBack = this.parameterList(enemyBack);
        this.window.size = this.parameterValue(size);
        this.window.actor = this.parameterValue(actor);
        this.window.enemy = this.parameterValue(enemy);
        this.window.position = this.parameterValue(position);
        this.window.distance = this.parameterValue(distance);
        this.window.active = this.parameterValue(active);
        this.window.offset = this.parameterValue(offset);
        this.window.backOffset = this.parameterValue(backOffset);
        this.window.vertZoom = this.setupZoom('vertical');
        this.window.horzZoom = this.setupZoom('horizontal');
    };

    VictorEngine.ConditionalTurnBattle.parameterValue = function(value) {
        return {
            x: Number(value[0]) || 0,
            y: Number(value[1]) || 0
        };
    };

    VictorEngine.ConditionalTurnBattle.parameterList = function(value) {
        return value.map(function(value) {
            return Number(value) || 0;
        });
    };

    VictorEngine.ConditionalTurnBattle.setupZoom = function(type) {
        var parameter = VictorEngine.Parameters.ConditionalTurnBattle.IconZoom;
        return parameter.toLowerCase() === type || parameter.toLowerCase() === 'both';
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    /* Overwritten function */
    BattleManager.startTurn = function() {};

    /* Overwritten function */
    BattleManager.isInputting = function() {
        return this.actor() && this.actor().canInput() || this.partyCommandIsOpen();
    };

    /* Overwritten function */
    BattleManager.startInput = function() {
        this.startCtbInput();
        if (this._ctbWindow && this._ctbWindow.isHidden()) {
            this._ctbWindow.battleStartOpen();;
        }
    };

    /* Overwritten function */
    BattleManager.updateTurn = function() {
        this.updateCtbTurn();
    };

    /* Overwritten function */
    BattleManager.selectNextCommand = function() {
        this.selectNextCtbCommand();
    };

    /* Overwritten function */
    BattleManager.selectPreviousCommand = function() {
        this.selectPreviousCtbCommand();
    };

    VictorEngine.ConditionalTurnBattle.setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        VictorEngine.ConditionalTurnBattle.setup.call(this, troopId, canEscape, canLose);
        this.setupCtbUpdateRate();
        this._turnCount = 0;
    };

    VictorEngine.ConditionalTurnBattle.updateBattleManager = BattleManager.update;
    BattleManager.update = function() {
        VictorEngine.ConditionalTurnBattle.updateBattleManager.call(this);
        this.updateCtb();
    };

    VictorEngine.ConditionalTurnBattle.updateEvent = BattleManager.updateEvent;
    BattleManager.updateEvent = function() {
        this._isUpdateEvent = VictorEngine.ConditionalTurnBattle.updateEvent.call(this);
        return this._isUpdateEvent;
    };

    VictorEngine.ConditionalTurnBattle.actor = BattleManager.actor;
    BattleManager.actor = function() {
        return this.partyCommandIsOpen() ? null : VictorEngine.ConditionalTurnBattle.actor.call(this);
    };

    VictorEngine.ConditionalTurnBattle.getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        if (this._turnCount <= 0) {
            return null
        } else {
            return VictorEngine.ConditionalTurnBattle.getNextSubject.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.startActionBattleManager = BattleManager.startAction;
    BattleManager.startAction = function() {
        var subject = this._subject;
        var action = subject.currentAction();
        if (action.isEscape()) {
            this._phase = 'action';
            this._action = action;
            this._targets = [];
            this.refreshStatus();
            this._logWindow.startEscape(subject, action);
        } else {
            VictorEngine.ConditionalTurnBattle.startActionBattleManager.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.displayEscapeFailureMessage = BattleManager.displayEscapeFailureMessage;
    BattleManager.displayEscapeFailureMessage = function() {
        VictorEngine.ConditionalTurnBattle.displayEscapeFailureMessage.call(this);
        this.clearCtbActions();
    };

    VictorEngine.ConditionalTurnBattle.processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        $gameParty.members().forEach(function(member) {
            member.setActionState('undecided');
        });
        VictorEngine.ConditionalTurnBattle.processVictory.call(this)
    };

    BattleManager.setCtbWindow = function(ctbWindow) {
        this._ctbWindow = ctbWindow;
    };
    BattleManager.startCtbInput = function() {
        if (this._inputSubject) {
            this.startActionInput();
            this._inputSubject = null;
        } else {
            this._phase = 'turn';
        }
    };

    BattleManager.startActionInput = function() {
        var subject = this._inputSubject;
        if (subject.isActor() && subject.canInput()) {
            if (!this.actor() && !this.partyCommandIsOpen()) {
                subject.clearExpiredStates();
                subject.makeActions();
                this.refreshStatus();
                this.displayCtbStateMessages(subject);
                var index = $gameParty.members().indexOf(subject);
                if (index >= 0) {
                    AudioManager.playSe(VictorEngine.ConditionalTurnBattle.CTBReadySound);
                    this.changeActor(index, 'inputting');
                }
            }
        } else {
            subject.clearExpiredStates();
            subject.makeActions();
            this.setupAction(subject);
            this.refreshStatus();
            this.displayCtbStateMessages(subject);
        }
    };

    BattleManager.updateCtbTurn = function() {
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        }
    };

    BattleManager.selectNextCtbCommand = function() {
        if (this.actor() && !this.actor().selectNextCommand()) {
            this.setupAction(this.actor());
            this.clearActor();
        }
    };

    BattleManager.selectPreviousCtbCommand = function() {
        if (!this.actor().selectPreviousCommand()) {
            if (this.ctbShowPartyCommand()) {
                this._partyCommandIsOpen = true;
            } else if (this.actor() && this.ctbReadyActors().length > 1) {
                this.actor().ctb = $gameParty.members().length - this.ctbReadyActors().length * 0.1;
                this.clearActor();
                this.updateCtbInput();
            }
        }
    };

    BattleManager.updateCtb = function() {
        this._ctbUpdateCount = 100;
        for (;;) {
            this.updateTurnCount();
            this.updateCtbCount();
            if (this._ctbUpdateCount === 0) {
                break
            }
            this._ctbUpdateCount--;
        }
    };

    BattleManager.allCtbBattleMembers = function() {
        return this.allBattleMembers().sort(this.compareBattlersCtb.bind(this));
    };

    BattleManager.compareBattlersCtb = function(a, b) {
        if (a.ctb !== b.ctb) {
            return a.ctb - b.ctb;
        } else if (this.battleMeberIndex(a) !== this.battleMeberIndex(b)) {
            return this.battleMeberIndex(a) - this.battleMeberIndex(b);
        } else {
            return a.index() - b.index();
        }
    };

    BattleManager.battleMeberIndex = function(battler) {
        if (battler.isActor()) {
            return $gameParty.members().indexOf(battler);
        } else {
            return $gameParty.maxBattleMembers() + battler.index();
        }
    };

    BattleManager.updateCtbInput = function() {
        var members = this.allCtbBattleMembers();
        for (var i = 0; i < members.length; i++) {
            var member = members[i];
            if (this.isInputReady(member)) {
                this._inputSubject = member;
                this.startInput();
                this._ctbUpdateCount = 0;
                break;
            } else if (this.isCtbFrozen(member)) {
                member.clearExpiredStates();
                member.onAllActionsEnd();
                this.refreshStatus();
                this.displayCtbStateMessages(member);
                this._ctbUpdateCount = 0;
            }
        }
    };

    BattleManager.displayCtbStateMessages = function(battler) {
        this._logWindow.displayAutoAffectedStatus(battler);
        this._logWindow.displayCurrentState(battler);
        this._logWindow.displayRegeneration(battler);
    };

    BattleManager.isActiveSubject = function() {
        return !!this._subject;
    };

    BattleManager.activeSubject = function(battler) {
        return this._subject === battler;
    };

    BattleManager.notActiveSubject = function(battler) {
        return this._subject && !this.activeSubject(battler);
    };

    BattleManager.isInputReady = function(member) {
        return member !== this._subject && member !== this.actor() && this.isCtbReady(member);
    };

    BattleManager.isCtbReady = function(member) {
        return member.isCtbReady() && !this._actionBattlers.contains(member);
    };

    BattleManager.isCtbFrozen = function(member) {
        return member.isCtbFrozen() && member.ftb === 0;
    };

    BattleManager.canUpdateCtb = function() {
        return !this._isUpdateEvent && !$gameMessage.isBusy() && !this._subject && this._actionBattlers.length === 0;
    };

    BattleManager.setupCtbUpdateRate = function() {
        this._ctbUpdateRate = Math.max(this.averageMaxCtb() / 100, 0);
    }

    BattleManager.averageMaxCtb = function() {
        var members = this.allBattleMembers();
        var speed = 0;
        for (var i = 0; i < members.length; i++) {
            speed += members[i].actionCtb();
        }
        return (speed / members.length) || 200;
    }

    BattleManager.clearCtbActions = function() {
        var members = $gameParty.members();
        for (var i = 0; i < members.length; i++) {
            var member = members[i];
            member.clearCtb();
            member.clearActions();
            member.clearCasting();
            var index = this._actionBattlers.indexOf(member);
            if (index >= 0) {
                this._actionBattlers.splice(index, 1);
            }
        }
    };

    BattleManager.setupAction = function(battler) {
        battler.setupCastingAction();
        this._actionBattlers.push(battler);
    };

    BattleManager.closeCommandWindows = function() {
        return !this._phase || !this.isInputting() || this.isHideCtb() || this._isUpdateEvent && $gameMessage.isBusy();
    };

    BattleManager.ctbUpdateRate = function() {
        return this._ctbUpdateRate || 1;
    }

    BattleManager.partyCommandIsOpen = function() {
        return this._partyCommandIsOpen;
    }

    BattleManager.closePartyCommand = function() {
        this._partyCommandIsOpen = false;
    }

    BattleManager.ctbShowPartyCommand = function() {
        return VictorEngine.Parameters.ConditionalTurnBattle.ShowPartyCommand;
    };

    BattleManager.isHideCtb = function() {
        return !this._phase || this._phase === 'init' || this._phase === 'start' ||
            this.isAborting() || this.isBattleEnd();
    };

    BattleManager.ctbReadyActors = function() {
        return $gameParty.aliveMembers().filter(function(member) {
            return member.isCtbReady() && member.canInput();
        })
    };

    BattleManager.updateTurnCount = function() {
        if (this.canUpdateCtb() || this._turnCount <= 0) {
            if (this.isTimeTurnCount()) {
                this.turnCountUpdateValue();
            }
            if (this._turnCount <= 0 && !this._subject) {
                this._turnCount = this.turnCountValue();
                $gameTroop.increaseTurn();
                this.endTurn();
                this._phase = 'turn';
                this._ctbUpdateCount = 0;
            }
        }
    };

    BattleManager.updateCtbCount = function() {
        if (this.canUpdateCtb()) {
            this.updateCtbInput();
            if (this._actionBattlers.length === 0 && !this.actor()) {
                var members = this.allBattleMembers();
                for (var i = 0; i < members.length; i++) {
                    members[i].updateCtb();
                }
            }
        }
    };

    BattleManager.turnCountUpdateValue = function() {
        this._turnCount -= this.isTimeTurnCount() ? this.ctbUpdateRate() : 1;
    };

    BattleManager.turnCountMode = function() {
        return VictorEngine.Parameters.ConditionalTurnBattle.TurnUpdateMode.toLowerCase()
    };

    BattleManager.isTimeTurnCount = function() {
        return this.turnCountMode() === 'time';
    };

    BattleManager.turnCountValue = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        if (this.isTimeTurnCount()) {
            return this.averageMaxCtb() * 100 / parameters.TurnUpdateTime;
        } else {
            return Number(eval(parameters.TurnUpdateCount)) || 8;
        }
    };

    BattleManager.regenerationUpdate = function() {
        return this.regenerationAction() || this.regenerationTurn();
    };

    BattleManager.regenerationAction = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        return !this.isTurnEnd() && parameters.RegenUpdateMode.toLowerCase() === 'action';
    };

    BattleManager.regenerationTurn = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        return this.isTurnEnd() && parameters.RegenUpdateMode.toLowerCase() === 'turn';
    };

    BattleManager.buffsUpdate = function() {
        return this.buffsAction() || this.buffsTurn();
    };

    BattleManager.buffsAction = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        return !this.isTurnEnd() && parameters.BuffsUpdateMode.toLowerCase() === 'action';
    };

    BattleManager.buffsTurn = function() {
        var parameters = VictorEngine.Parameters.ConditionalTurnBattle;
        return this.isTurnEnd() && parameters.BuffsUpdateMode.toLowerCase() === 'turn';
    };

    BattleManager.removeStatesCtb = function(timing) {
        return (timing === 1 && !this.isTurnEnd()) || (timing === 2 && this.isTurnEnd());
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    VictorEngine.ConditionalTurnBattle.isValid = Game_Action.prototype.isValid;
    Game_Action.prototype.isValid = function() {
        return this.isEscape() || VictorEngine.ConditionalTurnBattle.isValid.call(this);
    };

    VictorEngine.ConditionalTurnBattle.item = Game_Action.prototype.item;
    Game_Action.prototype.item = function() {
        if (this.isEscape()) {
            return this._escapeAction;
        } else {
            return VictorEngine.ConditionalTurnBattle.item.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        VictorEngine.ConditionalTurnBattle.applyItemUserEffect.call(this);
        this.applyCastCancel(target);
        this.applyCtbDelay(target);
    };

    Game_Action.prototype.ctbCast = function() {
        return (this.item() && this.item().ctbCast) ? this.item().ctbCast : {};
    };

    Game_Action.prototype.castingSpeed = function() {
        return this.ctbCast().speed || 0;
    };

    Game_Action.prototype.castingParam = function() {
        return this.ctbCast().param || 0;
    };

    Game_Action.prototype.castingColor = function() {
        return this.ctbCast().color;
    };

    Game_Action.prototype.applyCastCancel = function(target) {
        var subject = this.subject();
        var objects = [this.item()].concat(subject.traitObjects());
        objects.forEach(function(object) {
            var cancel = object.castCancel;
            if (cancel && !object.noCastCancel && cancel * target.cancelResist() < Math.random()) {
                target.clearCasting();
                target.clearCtb();
            }
        });
    };

    Game_Action.prototype.applyCtbDelay = function(target) {
        var subject = this.subject();
        var objects = [this.item()].concat(subject.traitObjects());
        objects.forEach(function(object) {
            var delay = object.ctbDelay;
            if (delay && delay.rate && delay.rate * target.delayResist() < Math.random()) {
                target.ctb += target.maxCtb * delay.effect;
            }
        });
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    /* Overwritten function */
    Game_BattlerBase.prototype.updateStateTurns = function() {
        this.updateCtbStateTurns();
    };

    VictorEngine.ConditionalTurnBattle.clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        VictorEngine.ConditionalTurnBattle.clearStates.call(this);
        this._stateDurations = {};
    };

    VictorEngine.ConditionalTurnBattle.canInput = Game_BattlerBase.prototype.canInput;
    Game_BattlerBase.prototype.canInput = function() {
        return !this.isCasting() && VictorEngine.ConditionalTurnBattle.canInput.call(this);
    };

    VictorEngine.ConditionalTurnBattle.die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        VictorEngine.ConditionalTurnBattle.die.call(this);
        this.setActionState('undecided');
        this._ctbActionSpeed = 0;
        this.clearCasting();
        this.clearCtb();
    };

    VictorEngine.ConditionalTurnBattle.updateBuffTurns = Game_BattlerBase.prototype.updateBuffTurns;
    Game_BattlerBase.prototype.updateBuffTurns = function() {
        if (BattleManager.buffsUpdate()) {
            VictorEngine.ConditionalTurnBattle.updateBuffTurns.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
    Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
        VictorEngine.ConditionalTurnBattle.resetStateCounts.call(this, stateId);
        var state = $dataStates[stateId];
        if (state.ctbTiming) {
            this._stateDurations[stateId] = BattleManager.averageMaxCtb() * state.ctbTiming;
        } else if (BattleManager.notActiveSubject(this)) {
            this._stateTurns[stateId]--;
        }
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    Object.defineProperties(Game_Battler.prototype, {
        ctb: {
            get: function() {
                return this._ctb || 0;
            },
            set: function(value) {
                this._ctb = value.clamp(-this.maxCtb, this.maxCtb);
            },
            configurable: true
        },
        ftb: {
            get: function() {
                return this._ftb || 0;
            },
            set: function(value) {
                this._ftb = value.clamp(-this.maxCtb, this.maxCtb);
            },
            configurable: true
        },
        maxCtb: {
            get: function() {
                return this._maxCtb || Math.max(this.actionCtb(), 10) || 10;
            },
            set: function(value) {
                this._maxCtb = Math.max(value, 10) || 10;
            },
            configurable: true
        }
    });

    /* Overwritten function */
    Game_Battler.prototype.removeStatesAuto = function(timing) {};

    VictorEngine.ConditionalTurnBattle.onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        VictorEngine.ConditionalTurnBattle.onBattleStart.call(this);
        this._isCtbFrozen = false;
        this.clearCasting();
        this.clearCtb();
        this.startingCtb();
    };

    VictorEngine.ConditionalTurnBattle.onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
    Game_Battler.prototype.onAllActionsEnd = function() {
        VictorEngine.ConditionalTurnBattle.onAllActionsEnd.call(this);
        this.onCtbAllActionsEnd();
    };

    VictorEngine.ConditionalTurnBattle.isChanting = Game_Battler.prototype.isChanting;
    Game_Battler.prototype.isChanting = function() {
        return VictorEngine.ConditionalTurnBattle.isChanting.call(this) || this.isCasting() || this.isCtbCast();
    };

    VictorEngine.ConditionalTurnBattle.makeActions = Game_Battler.prototype.makeActions;
    Game_Battler.prototype.makeActions = function() {
        this._ctbActionSpeed = 0;
        VictorEngine.ConditionalTurnBattle.makeActions.call(this);
    };

    VictorEngine.ConditionalTurnBattle.regenerateAll = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function() {
        if (BattleManager.regenerationUpdate()) {
            VictorEngine.ConditionalTurnBattle.regenerateAll.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.clearResult = Game_Battler.prototype.clearResult;
    Game_Battler.prototype.clearResult = function() {
        if (!BattleManager.isTurnEnd()) {
            VictorEngine.ConditionalTurnBattle.clearResult.call(this);
        }
    };

    VictorEngine.ConditionalTurnBattle.onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        VictorEngine.ConditionalTurnBattle.onTurnEnd.call(this);
        this.clearExpiredStates();
    };

    Game_Battler.prototype.isCtbReady = function() {
        return this.isAppeared() && this.canMove() && this.ctb <= 0;
    };

    Game_Battler.prototype.ctbRate = function() {
        if (Imported['VE - Charge Actions'] && this.isChargingAction()) {
            return 1;
        } else {
            return (this.maxCtb - this.ctb) / this.maxCtb;
        }
    };

    Game_Battler.prototype.ctbFull = function() {
        return this.ctbRate() === 1;
    };

    Game_Battler.prototype.isCasting = function() {
        return !!this._castSpeed;
    };

    Game_Battler.prototype.castColor = function() {
        return this._castColor;
    };

    Game_Battler.prototype.castName = function() {
        return this._castName;
    };

    Game_Battler.prototype.isCtbCast = function() {
        return this._ctbCast;
    };

    Game_Battler.prototype.isCtbFrozen = function() {
        return this._isCtbFrozen;
    };

    Game_Battler.prototype.startingCtb = function() {
        this._castName = '';
        this._castColor = null;
        this._ctbActionSpeed = 0;
        this.clearCtbPreview();
        var battleAdvantage = Imported['VE - Battle Advantage'];
        if (battleAdvantage && this.isBackAttack()) {
            this.ctb = this.maxCtb;
        } else if (battleAdvantage && this.isSurrounded()) {
            this.ctb = this.maxCtb;
        } else if (battleAdvantage && this.isSneakAttack()) {
            this.ctb = 0;
        } else if (battleAdvantage && this.isPincerAttack()) {
            this.ctb = 0;
        } else if (!battleAdvantage && BattleManager.isSurprise()) {
            this.ctb = this.isActor() ? this.maxCtb : 0;
        } else if (!battleAdvantage && BattleManager.isPreemptive()) {
            this.ctb = this.isActor() ? 0 : this.maxCtb;
        } else {
            var rate = VictorEngine.Parameters.ConditionalTurnBattle.InitialCTBRate * Math.random();
            this.ctb -= this.maxCtb * rate / 100;
        }
    };

    Game_Battler.prototype.baseCtb = function(value) {
        var weight = Math.max(VictorEngine.Parameters.ConditionalTurnBattle.CTBParamWeight, 1);
        return this.ctbValue(weight, 6, value);
    };

    Game_Battler.prototype.castCtb = function(param, speed, value) {
        var weight = Math.max(VictorEngine.Parameters.ConditionalTurnBattle.CTBParamWeight, 1);
        return this.ctbValue(weight, param - 1, value) / speed;
    };

    Game_Battler.prototype.ctbValue = function(speed, param, value) {
        return 100 * this.paramMax(param) / this.ctbActionSpeed(speed, this.param(param), value);
    };

    Game_Battler.prototype.actionCtb = function() {
        var param = this._castParam;
        var speed = this._castSpeed;
        var value = this._ctbActionSpeed;
        var result = this.isCasting() ? this.castCtb(param, speed, value) : this.baseCtb(value);
        return result * this.ctbSpeed() * this.castSpeed() * this.actionSpeed();
    };

    Game_Battler.prototype.ctbActionSpeed = function(speed, param, value) {
        return (speed + param) * this.ctbActionSpeedAdjust(value);
    };

    Game_Battler.prototype.ctbActionSpeedAdjust = function(value) {
        if (value < 0) {
            return Math.max(1 + (value / 2000), 0.05) || 1;
        } else {
            return Math.min(1 + (value / 100), 20) || 1;
        }
    };

    Game_Battler.prototype.setCtbActionSpeed = function(action) {
        var speed = this._ctbActionSpeed || 10000;
        if (action.item()) {
            speed = Math.min(speed, action.item().speed);
        }
        if (action.isAttack()) {
            speed = Math.min(speed, this.attackSpeed());
        }
        this._ctbActionSpeed = speed === 10000 ? 0 : speed;
    };

    Game_BattlerBase.prototype.ctbSpeed = function() {
        var result = this.traitObjects().reduce(function(r, obj) {
            return r * (Math.max(1 - obj.ctbSpeed, 0.1) || 1);
        }, 1);
        return Math.max(result, 0.1);
    };

    Game_BattlerBase.prototype.castSpeed = function() {
        var result = this.traitObjects().reduce(function(r, obj) {
            return r * (Math.max(1 - obj.castSpeed, 0.1) || 1);
        }, 1);
        return this.isCasting() ? Math.max(result, 0.1) : 1;
    };

    Game_BattlerBase.prototype.actionSpeed = function() {
        var result = this.traitObjects().reduce(function(r, obj) {
            return r * (Math.max(1 - obj.castSpeed, 0.1) || 1);
        }, 1);
        return this.isCasting() ? 1 : Math.max(result, 0.1);
    };

    Game_Battler.prototype.clearCtb = function() {
        if (this.isCasting() && !this._ctbCast) {
            this._ctbCast = true;
        } else if (!this.isCasting() && this._ctbCast) {
            this._ctbCast = false;
            this._castName = '';
            this._castColor = null;
        }
        this.clearCtbPreview();
        this.maxCtb = this.actionCtb();
        if (this.isCtbFrozen()) {
            this.ftb = this.maxCtb;
        } else {
            this.ctb = this.maxCtb;
        }
    };

    Game_Battler.prototype.updateCtb = function() {
        this.refreshCtb();
        this.updateTimedStates();
        if (this.canMove()) {
            this.ctb = this.ctb - BattleManager.ctbUpdateRate();
            this._isCtbFrozen = false;
        } else if (this.isRestricted() && this.isCasting()) {
            this.clearCasting();
            this.clearCtb();
        } else {
            if (!this.isCtbFrozen()) {
                this.ftb = this.ctb
                this._isCtbFrozen = true
            }
            this.ftb = this.ftb - BattleManager.ctbUpdateRate();
        }
    };

    Game_Battler.prototype.refreshCtb = function() {
        if (this.maxCtb !== this.actionCtb()) {
            this.ctb = this.ctb * this.maxCtb / this.actionCtb();
            this.maxCtb = this.actionCtb();
        }
    };

    Game_Battler.prototype.setupCastingAction = function() {
        if (this.isCasting()) {
            this.executeCastAction();
        } else {
            this.prepareCastAction();
        }
    };

    Game_Battler.prototype.clearCasting = function() {
        this._castSpeed = 0;
        this._castParam = 0;
        this._castingActions = [];
    };

    Game_Battler.prototype.executeCastAction = function() {
        this._actions = this._castingActions.clone();
        this.clearCasting();
    };

    Game_Battler.prototype.prepareCastAction = function() {
        this.clearCasting();
        this._castName = '';
        this._castColor = null;
        for (var i = 0; i < this._actions.length; i++) {
            var action = this._actions[i];
            var speed = action.castingSpeed();
            var param = action.castingParam();
            if (this._castSpeed < speed || this.higherCastParam(speed, param)) {
                this._castSpeed = speed;
                this._castParam = param;
                this._castColor = action.castingColor();
                this._castName = action.item().name;
            }
        }
        if (this.isCasting()) {
            this._castingActions = this._actions.clone();
            this.clearActions();
            if (Imported['VE - Battle Motions']) {
                this.requestActionMontion({
                    name: 'cast'
                });
                BattleManager._logWindow.processActionMotion(this);
            }
        }
    };

    Game_Battler.prototype.onCtbAllActionsEnd = function() {
        this.setActionState('undecided');
        this.updateCtbTurnCount();
        this.updateStateTurns();
        this.regenerateAll();
        this.clearCtb();
    };

    Game_Battler.prototype.updateTimedStates = function() {
        var expired = false;
        this.states().forEach(function(state) {
            if (this._stateDurations[state.id] && this._stateDurations[state.id] > 0 && state.ctbTiming) {
                this._stateDurations[state.id] -= BattleManager.ctbUpdateRate();
            }
            if (this._stateDurations[state.id] && this._stateDurations[state.id] < 0 && state.ctbTiming) {
                this._stateDurations[state.id] = BattleManager.averageMaxCtb() * state.ctbTiming;
                if (this._stateTurns[state.id] > 0) {
                    this._stateTurns[state.id]--;
                }
            }
            if (!BattleManager.isActiveSubject() && this.isStateExpired(state.id) && state.ctbTiming) {
                this.removeState(state.id);
                expired = true;
            }
        }, this);
        if (expired) {
            BattleManager.displayCtbStateMessages(this);
        }
    };

    Game_Battler.prototype.updateCtbStateTurns = function() {
        this.states().forEach(function(state) {
            if (this._stateTurns[state.id] > 0 && this.removeStatesCtb(state.id)) {
                this._stateTurns[state.id]--;
            }
        }, this);
    };

    Game_Battler.prototype.clearExpiredStates = function() {
        this.states().forEach(function(state) {
            if (this.isStateExpired(state.id) && this.removeStatesCtb(state.id)) {
                this.removeState(state.id);
            }
        }, this);
    };

    Game_Battler.prototype.removeStatesCtb = function(stateId) {
        var state = $dataStates[stateId];
        var timing = state.autoRemovalTiming;
        return BattleManager.removeStatesCtb(timing) && !state.ctbTiming;
    };

    Game_Battler.prototype.higherCastParam = function(speed, param) {
        return this._castSpeed === speed && this._castParam && this.param(this._castParam - 1) > this.param(param - 1);
    };

    Game_Battler.prototype.stateCtbColor = function() {
        return this.states().filter(function(state) {
            return state.ctbColor && state.ctbColor.fill && state.ctbColor.full;
        })[0];
    };

    Game_Battler.prototype.updateCtbTurnCount = function() {
        if (!BattleManager.isTimeTurnCount()) {
            BattleManager.turnCountUpdateValue();
        }
    };

    Game_Battler.prototype.cancelResist = function() {
        return this.traitObjects().reduce(function(r, object) {
            return r * Math.max(1 - (object.cancelResist || 0), 0);
        }, 1);
    };

    Game_Battler.prototype.delayResist = function() {
        return this.traitObjects().reduce(function(r, object) {
            return r * Math.max(1 - (object.delayResist || 0), 0);
        }, 1);
    };

    Game_Battler.prototype.ctbWindowValue = function(index) {
        var max = this.previewCtb(false, 6, 1, 0);
        var ctb = this._previewCtb;
        var cast = this._previewCast;
        if (ctb) {
            if (index > 0) {
                if (cast) {
                    if (index === 1) {
                        return cast;
                    } else {
                        return cast + ctb + (index - 2) * max;
                    }
                } else {
                    return ctb + (index - 1) * max;
                }
            } else {
                return this.ctb;
            }
        } else {
            if (index > 0) {
                return Math.max(this.ctb, 0) + index * max;
            } else {
                return this.ctb;
            }
        }
    };

    Game_Battler.prototype.previewCtb = function(cast, param, speed, value) {
        var result = cast ? this.castCtb(param, speed, value) : this.baseCtb(value);
        return result * this.ctbSpeed() * this.castSpeed() * this.actionSpeed();
    };

    Game_Battler.prototype.setupCtbPreview = function(action) {
        var ctb = 0;
        var cast = 0;
        var actions = [action].concat(this._actions);
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i]
            if (action.item()) {
                var result = this.setupPreviewValue(action);
                ctb = result.ctb > ctb ? result.ctb : ctb;
                cast = result.cast > cast ? result.cast : cast;
            }
        }
        this._previewCtb = ctb;
        this._previewCast = cast;
    };

    Game_Battler.prototype.setupPreviewValue = function(action) {
        var speed = action.castingSpeed();
        var param = action.castingParam();
        var value = value = action.item() ? action.item().speed : action.isAttack() ? this.attackSpeed() : 0;
        var ctb = this.previewCtb(false, 6, 1, value);
        var cast = !!speed ? this.previewCtb(true, param, speed, value) : 0;
        return {
            ctb: ctb,
            cast: cast
        };
    };

    Game_Battler.prototype.clearCtbPreview = function() {
        this._previewCtb = 0;
        this._previewCast = 0;
    };

    Game_Battler.prototype.hasNoActions = function() {
        return this._actions.every(function(action) {
            return !action || !action.item();
        })
    };

    Game_Battler.prototype.isCastPreview = function() {
        return !!this._previewCast;
    };

    Game_Battler.prototype.ctbIconOverlay = function() {
        return this.states().reduce(function(r, state) {
            return r.concat(state.ctbIconOverlay || []);
        }, [])[0];
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    Game_Actor.prototype.ctbIcon = function() {
        return this.actor().ctbIcon || VictorEngine.Parameters.ConditionalTurnBattle.DefaultActorIcon;
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    /* Overwritten function */
    Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
        return this.enemyTurnCondition(param1, param2);
    };

    VictorEngine.ConditionalTurnBattle.initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        VictorEngine.ConditionalTurnBattle.initMembers.call(this);
        this._turnCount = 0;
    };

    Game_Enemy.prototype.ctbIcon = function() {
        return this.enemy().ctbIcon || VictorEngine.Parameters.ConditionalTurnBattle.DefaultEnemyIcon;
    };

    Game_Enemy.prototype.onAllActionsEnd = function() {
        Game_Battler.prototype.onAllActionsEnd.call(this);
        this._turnCount++;
    };

    Game_Enemy.prototype.enemyTurnCondition = function(param1, param2) {
        var n = this._turnCount;
        if (param2 === 0) {
            return n === param1;
        } else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };

    //=============================================================================
    // Game_Unit
    //=============================================================================

    VictorEngine.ConditionalTurnBattle.clearActions = Game_Unit.prototype.clearActions;
    Game_Unit.prototype.clearActions = function() {
        if (!this._skipClear) {
            VictorEngine.ConditionalTurnBattle.clearActions.call(this);
        }
    };

    //=============================================================================
    // Window_ActorCommand
    //=============================================================================

    Window_ActorCommand.prototype.select = function(index) {
        Window_Command.prototype.select.call(this, index);
        if (this._actor) {
            this.updateCtbPreview(this._actor);
        }
    };

    Window_Selectable.prototype.updateCtbPreview = function(actor) {
        var action = new Game_Action(actor);
        if (this.currentSymbol() === 'attack') {
            action.setAttack();
        }
        if (this.currentSymbol() === 'guard') {
            action.setGuard();
        }
        if (this.currentSymbol() === 'direct skill') {
            action.setSkill(this.currentExt());
        }
        if (this.currentSymbol() === 'direct item') {
            action.setItem(this.currentExt());
        }
        if (action.item()) {
            actor.setupCtbPreview(action);
        } else if (actor.hasNoActions()) {
            actor.clearCtbPreview();
        }
    };

    //=============================================================================
    // Window_BattleSkill
    //=============================================================================

    Window_BattleSkill.prototype.select = function(index) {
        Window_SkillList.prototype.select.call(this, index);
        if (BattleManager.actor()) {
            this.updateCtbPreview(BattleManager.actor());
        }
    };

    Window_BattleSkill.prototype.updateCtbPreview = function(actor) {
        if (this.item()) {
            var action = new Game_Action(actor)
            action.setSkill(this.item().id);
            actor.setupCtbPreview(action);
        }
    };

    //=============================================================================
    // Window_BattleItem
    //=============================================================================

    Window_BattleItem.prototype.select = function(index) {
        Window_ItemList.prototype.select.call(this, index);
        if (BattleManager.actor()) {
            this.updateCtbPreview(BattleManager.actor());
        }
    };

    Window_BattleItem.prototype.updateCtbPreview = function(actor) {
        if (this.item()) {
            var action = new Game_Action(actor)
            action.setItem(this.item().id);
            actor.setupCtbPreview(action);
        }
    };

    //=============================================================================
    // Window_BattleLog
    //=============================================================================

    VictorEngine.ConditionalTurnBattle.startActionWindowBattleLog = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        subject.setCtbActionSpeed(action);
        VictorEngine.ConditionalTurnBattle.startActionWindowBattleLog.call(this, subject, action, targets);
    }

    VictorEngine.ConditionalTurnBattle.endAction = Window_BattleLog.prototype.endAction;
    Window_BattleLog.prototype.endAction = function(subject) {
        VictorEngine.ConditionalTurnBattle.endAction.call(this, subject);
        if (subject.isEscapeCommand()) {
            this.push('performEscape', subject);
            subject.endEscapeCommand();
        }
    }

    Window_BattleLog.prototype.defaultMotionCast = function(subject, action) {
        return '';
    };

    //=============================================================================
    // Scene_Boot
    //=============================================================================

    VictorEngine.ConditionalTurnBattle.loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        VictorEngine.ConditionalTurnBattle.loadSystemImages.call(this);
        var filename = VictorEngine.Parameters.ConditionalTurnBattle.IconsetFilename;
        if (filename && filename !== 'IconSet') {
            ImageManager.loadSystem(filename);
        }
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    /* Overwritten function */
    Scene_Battle.prototype.commandFight = function() {
        BattleManager.closePartyCommand();
        this.changeInputWindow();
    };

    /* Overwritten function */
    Scene_Battle.prototype.commandEscape = function() {
        BattleManager.closePartyCommand();
        BattleManager.inputtingAction().setEscape();
        this.selectNextCommand();
    };

    VictorEngine.ConditionalTurnBattle.createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        VictorEngine.ConditionalTurnBattle.createAllWindows.call(this);
        this.createCtbWindow();
    };

    VictorEngine.ConditionalTurnBattle.updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
    Scene_Battle.prototype.updateBattleProcess = function() {
        VictorEngine.ConditionalTurnBattle.updateBattleProcess.call(this);
        if (this.isAnyInputWindowActive() && BattleManager.closeCommandWindows()) {
            this.closeInputWindows();
        }
    };

    VictorEngine.ConditionalTurnBattle.selectNextCommand = Scene_Battle.prototype.selectNextCommand;
    Scene_Battle.prototype.selectNextCommand = function() {
        this.clearCtbPreview();
        VictorEngine.ConditionalTurnBattle.selectNextCommand.call(this);
    };

    VictorEngine.ConditionalTurnBattle.selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
    Scene_Battle.prototype.selectPreviousCommand = function() {
        BattleManager.inputtingAction().clear();
        this.clearCtbPreview();
        VictorEngine.ConditionalTurnBattle.selectPreviousCommand.call(this);
    };

    VictorEngine.ConditionalTurnBattle.onSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
        BattleManager.inputtingAction().clear();
        this.clearCtbPreview();
        VictorEngine.ConditionalTurnBattle.onSkillCancel.call(this);
    };

    VictorEngine.ConditionalTurnBattle.onItemCancel = Scene_Battle.prototype.onItemCancel;
    Scene_Battle.prototype.onItemCancel = function() {
        BattleManager.inputtingAction().clear();
        this.clearCtbPreview();
        VictorEngine.ConditionalTurnBattle.onItemCancel.call(this);
    };

    VictorEngine.ConditionalTurnBattle.changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        if (!this.isAnyInputWindowActive()) {
            VictorEngine.ConditionalTurnBattle.changeInputWindow.call(this);
        }
    };

    Scene_Battle.prototype.createCtbWindow = function() {
        if (VictorEngine.ConditionalTurnBattle.window.show) {
            this._ctbWindow = new Window_CtbList();
            this._ctbWindow.close();
            this.addWindow(this._ctbWindow);
            BattleManager.setCtbWindow(this._ctbWindow);
        }
    };

    Scene_Battle.prototype.clearCtbPreview = function() {
        var actor = BattleManager.actor()
        if (actor && actor.hasNoActions()) {
            actor.clearCtbPreview();
        }
    };

    Scene_Battle.prototype.closeInputWindows = function() {
        BattleManager.closePartyCommand();
        this._partyCommandWindow.deactivate();
        this._actorCommandWindow.deactivate();
        this._skillWindow.deactivate();
        this._itemWindow.deactivate();
        this._actorWindow.deactivate();
        this._enemyWindow.deactivate();
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
        this._skillWindow.hide();
        this._itemWindow.hide();
        this._actorWindow.hide();
        this._enemyWindow.hide();
    };

})();

//=============================================================================
// Window_CtbList
//=============================================================================

function Window_CtbList() {
    this.initialize.apply(this, arguments);
}

Window_CtbList.prototype = Object.create(Window_Base.prototype);
Window_CtbList.prototype.constructor = Window_CtbList;

(function() {

    Window_CtbList.prototype.initialize = function() {
        this._isHidden = true;
        this._showIcons = [];
        this._nextIcons = [];
        this._iconBattlers = [];
        var boxWidth = Graphics.boxWidth;
        var boxHeight = Graphics.boxHeight;
        var wx = Math.floor(Number(eval(this.display().x))) || 0;
        var wy = Math.floor(Number(eval(this.display().y))) || 0;
        var ww = Math.floor(Number(eval(this.display().w))) || boxWidth;
        var wh = Math.floor(Number(eval(this.display().h))) || 56;
        Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
        this.createBackground();
    };

    Window_CtbList.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateBackground();
        this.updateIcons();
        this.sortIcons();
        this.visible = !BattleManager.isHideCtb();
    };

    Window_CtbList.prototype.display = function() {
        return VictorEngine.ConditionalTurnBattle.window || {};
    };

    Window_CtbList.prototype.maxIcons = function() {
        return this.display().maxIcons;
    };

    Window_CtbList.prototype.isHidden = function() {
        return this._isHidden;
    };

    Window_CtbList.prototype.battleStartOpen = function() {
        this.update();
        this._isHidden = false;
        this.open();
    };

    Window_CtbList.prototype.createBackground = function() {
        this._background = new Sprite();
        this._windowSpriteContainer.addChild(this._background);
    };

 Window_CtbList.prototype.updateBackground = function() {
        if (this.display().background && this._background) {
            if (!this._background.bitmap) {
                this._background.bitmap = ImageManager.loadSystem(this.display().background);
                this._background.bitmap.addLoadListener(this.updateBackgroundFrame.bind(this));
            }
            this._background.x = Math.floor(this.display().backOffset.x);
            this._background.y = Math.floor(this.display().backOffset.y);
            this._background.visible = this.visible && this.isOpen();
            this._background.opacity = this.opacity;
        }
    };
	

    Window_CtbList.prototype.updateBackgroundFrame = function() {
        var width = this._background.bitmap.width;
        var height = this._background.bitmap.height;
        this._background.setFrame(0, 0, width, height);
    }; 

    
	Window_CtbList.prototype.updateIcons = function() {
      var allMembers = BattleManager.allBattleMembers();
        var iconBattlers = this._iconBattlers;
        for (var i = 0; i < allMembers.length; i++) {
            var member = allMembers[i];
            if (!iconBattlers.contains(member) && member.canMove()) {
                this.addIconBattler(member);
            }
        }
        for (var i = 0; i < iconBattlers.length; i++) {
            var member = iconBattlers[i];
            if (!allMembers.contains(member) || !member.canMove()) {
                this._forceIconRefresh = true;
                this.removeIconBattler(member);
            }
        }
    };

    Window_CtbList.prototype.addIconBattler = function(battler) {
   this._iconBattlers.push(battler);
        for (var i = 0; i < this.maxIcons(); i++) {
            var sprite = new Sprite_CtbIcon(battler, i);
            this._nextIcons.push(sprite);
            this.addChild(sprite);
        } 
    };

    Window_CtbList.prototype.removeIconBattler = function(battler) {
        var index = this._iconBattlers.indexOf(battler);
        this._iconBattlers.splice(index, 1);
        for (var i = 0; i < this._nextIcons.length; i++) {
            var icon = this._nextIcons[i];
            if (icon.battler() === battler) {
                this.removeChild(icon);
                this._nextIcons.splice(i, 1);
                i--;
            }
        }
    };

    Window_CtbList.prototype.sortIcons = function() {
        if (this._sortChildrenFrame !== Graphics.frameCount || this._forceIconRefresh) {
            this._forceIconRefresh = false;
            this._sortChildrenFrame = Graphics.frameCount;
            this._nextIcons.sort(this.compareIconSprites.bind(this));
        }
            this.sortShownIcons();
    };

    Window_CtbList.prototype.compareIconSprites = function(a, b) {
       if (a.ctb() !== b.ctb()) {
            return a.ctb() - b.ctb();
        }  else if (a.member() !== b.member()) {
            return a.member() - b.member();
        } else {
            return a.index() - b.index();
        } 
    };

    Window_CtbList.prototype.sortShownIcons = function() {
        var count = 0
        for (var i = 0; i < this._nextIcons.length; i++) {
            var icon = this._showIcons[i];
            var next = this._nextIcons[i];
            this.updateShownIcons(icon, next, i - count);
        }
        for (var i = 0; i < this._showIcons.length; i++) {
            var icon = this._showIcons[i];
            this.updateIconsZoom(icon);
            this.updateIconsPosition(icon, i);
        }
    };

    Window_CtbList.prototype.updateShownIcons = function(icon, next, index) {
        if (icon !== next) {
            if (icon && (icon.scale.x > 0 && icon.scale.y > 0)) {
                icon.isZoomIn = true;
                icon.isZoomOut = false;
            } else {
                this._showIcons[index] = next;
            }
        } else if (icon) {
            icon.isZoomIn = false;
            icon.isZoomOut = true;
        }
    };

    Window_CtbList.prototype.updateIconsZoom = function(icon) {
        var vert = this.display().vertZoom;
        var horz = this.display().horzZoom;
        if (icon.isZoomIn) {
            icon.scale.x = this._isHidden ? 0 : Math.max(horz ? icon.scale.x - 0.1 : 1, 0);
            icon.scale.y = this._isHidden ? 0 : Math.max(vert ? icon.scale.y - 0.1 : 1, 0);
        }
        if (icon.isZoomOut) {
            icon.scale.x = this._isHidden ? 1 : Math.min(horz ? icon.scale.x + 0.1 : 1, 1);
            icon.scale.y = this._isHidden ? 1 : Math.min(vert ? icon.scale.y + 0.1 : 1, 1);
        }
    };

    Window_CtbList.prototype.updateIconsPosition = function(icon, index) {
        if (index < this.maxIcons()) {
            var active = this.display().active;
            var distance = this.display().distance;
            icon.x = 32 + (index === 0 ? active.x : index * distance.x);
            icon.y = 32 + (index === 0 ? active.y : index * distance.y);
            icon.setActive(index === 0);
        } else {
            icon.x = undefined;
            icon.y = undefined;
            icon.setActive(false);
        }
    };

})();

//=============================================================================
// Sprite_CtbIcon
//=============================================================================

function Sprite_CtbIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_CtbIcon.prototype = Object.create(Sprite_Base.prototype);
Sprite_CtbIcon.prototype.constructor = Sprite_CtbIcon;

(function() {

    Sprite_CtbIcon.prototype.initialize = function(battler, index) {
        Sprite_Base.prototype.initialize.call(this);
        this._index = index;
        this._battler = battler;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._selectionEffectCount = 0;
        this.createNameWindow();
    };

    Sprite_CtbIcon.prototype.update = function() {
        Sprite_Base.prototype.update.call(this);
        this.updateIcon();
        this.updateEffect();
        this.updateSelectionEffect();
    };

    Sprite_CtbIcon.prototype.battler = function() {
        return this._battler;
    };

    Sprite_CtbIcon.prototype.isActor = function() {
        return this._battler.isActor();
    };

    Sprite_CtbIcon.prototype.display = function() {
        return VictorEngine.ConditionalTurnBattle.window;
    };

    Sprite_CtbIcon.prototype.createNameWindow = function() {
        if (this.display().nameWindow) {
            var x = this.display().offset.x;
            var y = this.display().offset.y;
            var h = this.display().size.y || Window_Base._iconHeight;
            this._nameWindow = new Window_Base(x - 32, y - 32, 160, h + 32);
            this._nameWindow.opacity = 0;
            this._nameWindow.drawText(this._battler.name(), 0, 0, 160, h);
            this.addChild(this._nameWindow);
        }
    };

    Sprite_CtbIcon.prototype.updateIcon = function() {
        if (this._isCtbCast !== this.isCtbCast()) {
            this._isCtbCast = this.isCtbCast();
            this.refresh();
        }
    };

    Sprite_CtbIcon.prototype.ctb = function() {
        return this._battler.ctbWindowValue(this._index);
    };

    Sprite_CtbIcon.prototype.cantMove = function() {
        return !this._battler.canMove();
    };

    Sprite_CtbIcon.prototype.index = function() {
        return this._index;
    };

    Sprite_CtbIcon.prototype.member = function() {
        return BattleManager.battleMeberIndex(this._battler);
    };

    Sprite_CtbIcon.prototype.setActive = function(value) {
        if (this._isActive !== value) {
            this._isActive = value;
            this.refresh();
        }
    };

    Sprite_CtbIcon.prototype.isActive = function() {
        return this._isActive;
    };

    Sprite_CtbIcon.prototype.refresh = function() {
        this.drawIconBackground();
        this.drawBattlerIcon();
        this.refreshNameWindow();
    };

    Sprite_CtbIcon.prototype.iconBackground = function() {
        var icon = this.isActor() ? this.display().actorBack : this.display().enemyBack;
        if (this.isCtbCast()) {
            return this._isActive ? icon[3] : icon[2];
        } else {
            return this._isActive ? icon[1] : icon[0];
        }
    };

    Sprite_CtbIcon.prototype.isCtbCast = function() {
        return this.isCastPreview() || (this._battler.isCtbCast() && this._index === 0);
    };

    Sprite_CtbIcon.prototype.isCastPreview = function() {
        return this._battler.isCastPreview() && this._index === 1;
    };

    Sprite_CtbIcon.prototype.drawIconBackground = function() {
        var icon = this.iconBackground() || 0;
        var pw = this.display().size.x || Window_Base._iconWidth;
        var ph = this.display().size.y || Window_Base._iconHeight;
        var sx = icon % 16 * pw;
        var sy = Math.floor(icon / 16) * ph;
        this.bitmap = new Bitmap(pw, ph);
        var bitmap = ImageManager.loadSystem(this.display().iconset);
        this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(this.refresh.bind(this));
        }
    };

    Sprite_CtbIcon.prototype.drawBattlerIcon = function() {
        var icon = this._battler.ctbIcon() || 0;
        if (!icon && this.isActor() && this.display().faces) {
            this.drawFace();
        } else if (!icon && !this.isActor() && this.display().battlers) {
            this.drawBattler();
        } else {
            this.drawIcon();
        }
        this.drawOverlay();
        if (!this.isActor()) {
            this.drawNumber();
        }
    };

    Sprite_CtbIcon.prototype.refreshNameWindow = function() {
        var window = this._nameWindow
        if (window) {
            window.contents.clear();
            var name = this._battler.name();
            var h = this.display().size.y || Window_Base._iconHeight;
            if (this.isCtbCast()) {
                var color = this._isActive ? window.systemColor() : window.crisisColor();
            } else {
                var color = this._isActive ? window.systemColor() : window.normalColor();
            }
            window.changeTextColor(color);
            window.drawText(name, 0, 0, 160, h);
        }
    };

    Sprite_CtbIcon.prototype.drawFace = function() {
        var pw = (this.display().size.x || Window_Base._iconWidth) - 4;
        var ph = (this.display().size.y || Window_Base._iconHeight) - 4;
        var faceName = this._battler.faceName();
        var faceIndex = this._battler.faceIndex();
        var bitmap = ImageManager.loadFace(faceName);
        var fw = Window_Base._faceWidth;
        var fh = Window_Base._faceHeight;
        var sx = faceIndex % 4 * fw;
        var sy = Math.floor(faceIndex / 4) * fh;
        this.bitmap.blt(bitmap, sx, sy, fw, fh, 2, 2, pw, ph);
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(this.refresh.bind(this));
        }
    };

    Sprite_CtbIcon.prototype.drawBattler = function() {
        if (this._battler.battlerOriginalName) {
            var name = this._battler.battlerOriginalName();
        } else {
            var name = this._battler.battlerName();
        }
        var hue = this._battler.battlerHue();
        if ($gameSystem.isSideView()) {
            var bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            var bitmap = ImageManager.loadEnemy(name, hue);
        }
        var pw = (this.display().size.x || Window_Base._iconWidth) - 4;
        var ph = (this.display().size.y || Window_Base._iconHeight) - 4;
        this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 2, 2, pw, ph);
        if (!bitmap.isReady()) {
            bitmap.addLoadListener(this.refresh.bind(this));
        }
    };

    Sprite_CtbIcon.prototype.drawOverlay = function() {
        var icon = this._battler.ctbIconOverlay() || 0;
        if (this._isActive) {
            icon = this.display().activeIcon;
        } else if (this.isCtbCast()) {
            icon = this.display().castIcon;
        }
        if (icon) {
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var bitmap = ImageManager.loadSystem(this.display().iconset);
            var sx = icon % 16 * pw;
            var sy = Math.floor(icon / 16) * ph;
            this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
        }
    };

    Sprite_CtbIcon.prototype.drawIcon = function() {
        var icon = this._battler.ctbIcon() || 0;
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var bitmap = ImageManager.loadSystem(this.display().iconset);
        var sx = icon % 16 * pw;
        var sy = Math.floor(icon / 16) * ph;
        this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
    };

    Sprite_CtbIcon.prototype.drawNumber = function() {
        var enemies = this.sameEnemies();
        if (enemies.length > 1) {
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var index = String(enemies.indexOf(this._battler) + 1);
            var letter = this.display().letter ? this._battler._letter : index;
            this.bitmap.fontSize = 16;
            this.bitmap.outlineColor = 'rgba(0, 0, 0, 0.8)';
            this.bitmap.outlineWidth = 6;
            this.bitmap.drawText(letter, -2, 8, pw, ph, 'right');
        }
    };

    Sprite_CtbIcon.prototype.sameEnemies = function() {
        return $gameTroop.members().filter(function(enemy) {
            return this._battler.enemyId() === enemy.enemyId();
        }, this);
    };

    Sprite_CtbIcon.prototype.setupEffect = function() {
        var effectType = this._battler.battleSprite()._effectType;
        if (effectType && this._effectType != effectType) {
            this.startEffect(effectType);
        }
    };

    Sprite_CtbIcon.prototype.startEffect = function(effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case 'appear':
                this.startAppear();
                break;
            case 'disappear':
                this.startDisappear();
                break;
            case 'whiten':
                this.startWhiten();
                break;
            case 'collapse':
                this.startCollapse();
                break;
            case 'bossCollapse':
                this.startBossCollapse();
                break;
            case 'instantCollapse':
                this.startInstantCollapse();
                break;
        }
        this.revertToNormal();
    };

    Sprite_CtbIcon.prototype.startAppear = function() {
        this._effectDuration = 16;
        this._appeared = true;
    };

    Sprite_CtbIcon.prototype.startDisappear = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_CtbIcon.prototype.startWhiten = function() {
        this._effectDuration = 16;
    };

    Sprite_CtbIcon.prototype.startCollapse = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_CtbIcon.prototype.startBossCollapse = function() {
        this._effectDuration = this.bitmap.height;
        this._appeared = false;
    };

    Sprite_CtbIcon.prototype.startInstantCollapse = function() {
        this._effectDuration = 16;
        this._appeared = false;
    };

    Sprite_CtbIcon.prototype.updateEffect = function() {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            switch (this._effectType) {
                case 'whiten':
                    this.updateWhiten();
                    break;
                case 'appear':
                    this.updateAppear();
                    break;
                case 'disappear':
                    this.updateDisappear();
                    break;
                case 'collapse':
                    this.updateCollapse();
                    break;
                case 'bossCollapse':
                    this.updateBossCollapse();
                    break;
                case 'instantCollapse':
                    this.updateInstantCollapse();
                    break;
            }
            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    };

    Sprite_CtbIcon.prototype.isEffecting = function() {
        return this._effectType !== null;
    };

    Sprite_CtbIcon.prototype.revertToNormal = function() {
        this._shake = 0;
        this.blendMode = 0;
        this.opacity = 255;
        this.setBlendColor([0, 0, 0, 0]);
        this.z = 0;
    };

    Sprite_CtbIcon.prototype.updateWhiten = function() {
        var alpha = 128 - (16 - this._effectDuration) * 10;
        this.setBlendColor([255, 255, 255, alpha]);
    };

    Sprite_CtbIcon.prototype.updateAppear = function() {
        this.opacity = (16 - this._effectDuration) * 16;
    };

    Sprite_CtbIcon.prototype.updateDisappear = function() {
        this.opacity = 256 - (32 - this._effectDuration) * 10;
    };

    Sprite_CtbIcon.prototype.updateCollapse = function() {
        this.blendMode = Graphics.BLEND_ADD;
        this.setBlendColor([255, 128, 128, 128]);
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
        this.z = 2;
    };

    Sprite_CtbIcon.prototype.updateBossCollapse = function() {
        this.blendMode = Graphics.BLEND_ADD;
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
        this.setBlendColor([255, 255, 255, 255 - this.opacity]);
        this.z = 2;
    };

    Sprite_CtbIcon.prototype.updateInstantCollapse = function() {
        this.opacity = 0;
    };

    Sprite_CtbIcon.prototype.updateSelectionEffect = function() {
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                this.setBlendColor([255, 255, 255, 64]);
            } else {
                this.setBlendColor([0, 0, 0, 0]);
            }
            this.z = 1;
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            this.setBlendColor([0, 0, 0, 0]);
            this.z = 0;
        }
    };

})();