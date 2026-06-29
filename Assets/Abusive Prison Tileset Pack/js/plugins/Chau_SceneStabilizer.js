/*:
@author Chaucer
@plugindesc | Scene Stabilizer : Version - 3.0.2 | Stabilizes scenes on scene transfer.
@help
===============================================================================
 Introduction :
===============================================================================

 This plugin pauses a scene once it starts to render, when the scene is paused
 all update methods are postponed. The scene will only begin to update once
 the scene is at a stable fps to ensure a smoother transition between scenes.

 Normally when changing scenes in MV( especially when entering a new scene for
 the first time ) it takes a bit more processing power to render all elements
 to the screen, this plugins purpose is to make those transitions less laggy
 by slightly prolonging the loading process in order to allow the game enough
 time to render all elements, and stabilize its draw cycles.

 As of 2.0.0, this plugin now has the ability to preload bgm for title, and
 battle scenes, as well as bgm & bgs for map scenes( thanks to Oscar92player
 for helping out with testing/debugging ). This is an optional feature and is
 disabled by default, if you choose to enable it, it WILL increase loading
 time between scenes since the scene will not load until the bgm/bgs are ready,
 this is to ensure that the audio plays immediately when the scene starts. This
 plugin does NOT preload se/me's and will NOT load custom audio that is added
 through other plugins. You cannot add custom audio files to be loaded between
 scene transfers at this time.

 As of 3.0.0 this plugin now keeps the scene under constant supervision to
 ensure that animations, pictures, or even images used in custom scripts that
 are loaded on the fly never cause any awkward skipped frames! From 3.0.0 and
 onward, you will now be able to preload custom BGM and BGS files for ANY
 scene! Keep in mind this plugin only will preload the audio file, it will NOT
 play it for you. If you use 'Scene_Map', 'Scene_Battle', or 'Scene_Title'
 the audio you specified for preload will NOT be preloaded, as these scenes
 are handled automatically, based on the settings in the database, however
 any other scene CAN be used.

===============================================================================
  Special Thanks :
===============================================================================

  Oscar92player : requesting audio preload.
  Tuomo : Reporting bugs with YEP_Core & YEP_VictoryAftermath.
  Archeia : Reporting issue with Replay BGM function.
  Jonforum : Suggesting the use of a PIXI ticker.

===============================================================================
 Requirements :
===============================================================================

---------------------------------------
 None.
---------------------------------------

===============================================================================
 Instructions :
===============================================================================

---------------------------------------
 N/A.
---------------------------------------

===============================================================================
 Terms Of Use :
===============================================================================

  This Plugin may be used commercially, or non commercially so long as credit
 is given, either in the games credit section, or in a text file alongside
 the game. This plugin may NOT be sold, or Plagiarized. This plugin may
 be extended upon, and shared freely.


===============================================================================
 Version History :
===============================================================================

 ● Version : 1.0.0
 ● Date : 13/01/2018
   ★ Release.

 ● Version : 1.4.0
 ● Date : 17/01/2018
   ★ Added the option to attempt to stabilize animations.

 ● Version : 1.5.0
 ● Date : 17/01/2018
   ★ Upload Animations to GPU before playing.
   ✩ Fixed issue with picture stabilization.

 ● Version : 1.5.1
 ● Date : 17/01/2018
   ✩ Accidentally deleted code to shorten pause time.

 ● Version : 2.0.0
 ● Date : 17/01/2018
   ★ Added preload for BGM and BGS( map/battle/title scene only ).

 ● Version : 2.0.1
 ● Date : 17/01/2018
   ✩ Fixed a bug which can cause the game to freeze.

 ● Version : 2.1.0
 ● Date : 05/03/2018
   ★ Added compatability for YEP_VictoryAftermath( credits to Tuomo L @rmw ).
   ✩ Audio is now unaltered when preload_audio is turned off.

 ● Version : 2.1.1
 ● Date : 08/03/2018
   ✩ AudioManager.playBgm & AudioManager.playBgs are no longer altered.

 ● Version : 2.1.2
 ● Date : 08/03/2018
   ✩ buffer parameters are applied before being played.

 ● Version : 3.0.0
 ● Date : 21/04/2018
   ★ Plugin now constantly ensures scene is stable, see Introduction for info!
   ★ Preload custom audio for custom scenes! see Introduction for info.
   ★ Plugin code has been completely rewritten.

 ● Version : 3.0.1
 ● Date : 21/04/2018
   ✩ Plugin no longer tries to load blank audio files.

 ● Version : 3.0.2
 ● Date : 22/04/2018
   ✩ Fixed crash when custom_scenes parameter isn't defined.

===============================================================================
 Contact Me :
===============================================================================

  If you have questions, about this plugin, or commissioning me, or have
 a bug to report, please feel free to contact me by any of the below
 methods.

 rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
 patreon : https://www.patreon.com/chaucer91
 discord : chaucer#7538
 skypeId : chaucer1991
 gmail : chaucer91

 ()()
 (^.^)
 c(")(")

===============================================================================

 @param preload_audio
 @desc should audio be preloaded before scenes start( true or false if MV Version is below 1.5.X ).
 @default false
 @type boolean
 @on Enabled
 @off Disabled

 @param custom_scenes
 @desc Define any custom scenes that should have audio preloaded here!
 @default []
 @type struct<Scene>[]

*/

/*~struct~Scene:

  @param scene_constructor
  @desc The constructor( or name ) of the scene( see help file for info ), this is case sensitive!.
  @type text
  @default

  @param scene_bgm
  @desc The name of the bgm file that should be preloaded for this scene.
  @type text
  @default

  @param scene_bgs
  @desc The name of the bgs file that should be preloaded for this scene.
  @type text
  @default

*/

//=============================================================================
var Imported = Imported || {};
Imported.CHAU_SceneStabilizer = true;
//=============================================================================
var Chaucer = Chaucer || {};
Chaucer.sceneStabilizer = {};
//=============================================================================

( function ( $ ) { //IIFE

  $ = $ || {};

//Create plugin information.
//============================================================================
  var regexp, desc;
  regexp = /Scene Stabilizer : Version - \d+\.\d+\.\d+/;
  for ( var i = 0; i < $plugins.length; i++ ) {
    desc = $plugins[i].description.match( regexp );
    if ( !desc ) continue;
    desc = desc[0];
    $.alias = {};
    $.name = desc.split(":")[0].trim();
    $.version = desc.split("-")[1].trim();
    $.params = Parse( $plugins[i].parameters );
    break;
  }

  //--------------------------------------------------------------------------
  function Parse( object )
  { // parse all data in an object
  //--------------------------------------------------------------------------
    try {
      object = JSON.parse( object );
     } catch (e) {
      object = object;
     } finally {
      if ( typeof object === 'object' ) {
        if ( Array.isArray( object ) ) {
          for ( var i = 0; i < object.length; i++ ) {
            object[i] = Parse( object[i] );
          }
        } else {
          for ( var key in object ) {
            object[key] = Parse( object[key] );
            if ( key === 'scene_constructor' ) {
                try {
                  object[key] = eval( object[key] );
                } catch (e) {
                  object[key] = object[key];
                }
            };
          }
        }
      }
     }
     return object;
  }
//============================================================================


//=============================================================================
// Misc :
//=============================================================================

 $.clearAudioCache = function()
 { // clear audio cache objects.
   $.audioCache = { bgm : {}, bgs : {} };
 };
 $.clearAudioCache();

 $.isAudioCacheReady = function()
 { // check if audio cache is ready.
   var ready = true;
   for (var key in $.audioCache) {
     for ( var value in $.audioCache[key] ) {
       var audio = $.audioCache[key][value];
       if ( audio && !audio.buffer.isReady() ) {
         ready = false;
         break;
       }
     }
   }
   return ready;
 };

 $.ticker = new PIXI.ticker.Ticker();
 $.ticker.add( function() { // tell ticker to pause game if high latency.
   SceneManager._sceneUnstable = this.elapsedMS >= 34;
 }.bind( $.ticker ) );

 $.ticker.start();

//============================================================================

//=============================================================================
// AudioManager :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.AM_p_playBgm = AudioManager.playBgm;
//-----------------------------------------------------------------------------
  AudioManager.playBgm = function ( bgm, pos )
  { // Alias of playBgm
//-----------------------------------------------------------------------------
    if ( $.audioCache.bgm[bgm.name] ) { // if we have the audio cached.
      if ( this.isCurrentBgm( bgm ) ) {
        this.updateBgmParameters( bgm );
      } else {
        this.stopBgm();
        this._bgmBuffer = $.audioCache.bgm[bgm.name].buffer;
        this.updateBgmParameters( bgm );
        if( Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio() ) {
          this.playEncryptedBgm( bgm, pos );
        } else {
          if ( !this._meBuffer ) this._bgmBuffer.play( true, pos || 0 );
        }
      }
      this.updateCurrentBgm( bgm, pos );
    } else { // play audio like default.
      $.alias.AM_p_playBgm.call( this, bgm, pos );
    }
  };

//-----------------------------------------------------------------------------
  $.alias.AM_p_playBgs = AudioManager.playBgs;
//-----------------------------------------------------------------------------
  AudioManager.playBgs = function ( bgs, pos )
  { // Alias of playBgs
//-----------------------------------------------------------------------------
    if ( $.audioCache.bgs[bgs.name] ) { // if we have the audio cached.
      if ( this.isCurrentBgs( bgs ) ) {
          this.updateBgsParameters( bgs );
      } else {
          this.stopBgs();
          if ( bgs.name ) {
              this._bgsBuffer = $.audioCache.bgs[bgs.name].buffer;
              this.updateBgsParameters( bgs );
              this._bgsBuffer.play( true, pos || 0 );
          }
      }
      this.updateCurrentBgs( bgs, pos );
    } else { // play audio like default.
      $.alias.AM_p_playBgs.call( this, bgs, pos );
    }
  };

//=============================================================================
// SceneManager :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.SM_changeScene = SceneManager.changeScene;
//-----------------------------------------------------------------------------
  SceneManager.changeScene = function ()
  { // Alias of changeScene
//-----------------------------------------------------------------------------
    if ( this.isSceneChanging() && !this.isCurrentSceneBusy() ) {
      $.clearAudioCache();
      this.prepareAudioCache();
    }
    $.alias.SM_changeScene.call( this );

  };

  //-----------------------------------------------------------------------------
  $.alias.SM_updateScene = SceneManager.updateScene;
  //-----------------------------------------------------------------------------
  SceneManager.updateScene = function ()
  { // Alias of updateScene
    //-----------------------------------------------------------------------------
    if ( !this._sceneUnstable ) $.alias.SM_updateScene.call( this );
  };

//=============================================================================
// Scene_Base
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias.SB_p_isReady = Scene_Base.prototype.isReady;
//-----------------------------------------------------------------------------
  Scene_Base.prototype.isReady = function ()
  { // Alias of isReady
//-----------------------------------------------------------------------------
    if ( this.constructor === Scene_Map ) {
      if ( this._mapLoaded ) SceneManager.prepareAudioCache();
    }
    var audioReady = Chaucer.sceneStabilizer.isAudioCacheReady();
    return $.alias.SB_p_isReady.call( this ) && audioReady;

  };

//=============================================================================
} )( Chaucer.sceneStabilizer );
//=============================================================================

//=============================================================================
// SceneManager :
//=============================================================================

//-----------------------------------------------------------------------------
SceneManager.prepareAudioCache = function ()
{ // prepare the audio cache for the next scene.
//-----------------------------------------------------------------------------
  var audioCache = Chaucer.sceneStabilizer.audioCache;
  var nextScene = ( this._nextScene || this._scene ).constructor;
  var bgm, bgs, se, me;
  if ( nextScene === Scene_Title ) { // Scene_Title audio.
    bgm = $dataSystem.titleBgm;
  } else if ( nextScene === Scene_Map && $dataMap ) { // Scene_Map audio.
    bgm = $dataMap.bgm;
    bgs = $dataMap.bgs;
  } else if ( nextScene === Scene_Battle ) { // Scene_Battle audio.
    bgm = $gameSystem.battleBgm();
  } else if ( nextScene === Scene_Load ) { // scene load audio.
    bgm = $gameSystem._bgmOnSave;
    bgs = $gameSystem._bgsOnSave;
  } else { // load custom scene audio.
    var customScenes = Chaucer.sceneStabilizer.params.custom_scenes || [];
    for (var i = 0; i < customScenes.length; i++) {
      if ( customScenes[i].scene_constructor === nextScene ) {
        if ( customScenes[i].scene_bgm ) { // if custom bgm
          bgm = {
            name: customScenes[i].scene_bgm,
            volume: 80,
            pitch: 100,
            pan: 0,
          };
        }
        if ( customScenes[i].scene_bgs ) { // if custom bgs.
          bgs = {
            name: customScenes[i].scene_bgs,
            volume: 80,
            pitch: 100,
            pan: 0,
          };
        }
      }
    }
  }
  if ( bgm && !bgm.name ) bgm = null;
  if ( bgs && !bgs.name ) bgs = null;
  if ( bgm && !audioCache.bgm[bgm.name] ) { // add bgm to cache.
    audioCache.bgm[bgm.name] = {
      object : bgm,
      buffer : AudioManager.createBuffer( 'bgm', bgm.name )
    };
  }
  if ( bgs && !audioCache.bgs[bgs.name] ) { // add bgs to cache.
    audioCache.bgs[bgs.name] = {
      object : bgs,
      buffer : AudioManager.createBuffer( 'bgs', bgs.name )
    };
  }
};
