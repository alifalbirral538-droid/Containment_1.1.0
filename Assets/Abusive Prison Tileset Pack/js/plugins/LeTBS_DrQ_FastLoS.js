/*
#=============================================================================
# LeTBS: DrQ's Fast LoS calcuation
# LeTBS_DrQ_FastLoS.js
# By Dr. Q
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# https://github.com/LecodeMV/leTBS/blob/master/LICENSE.txt
#=============================================================================
*/
var Imported = Imported || {};
Imported.LeTBS_DrQ_FastLoS = true;

var Lecode = Lecode || {};
Lecode.S_TBS.DrQ_FastLoS = {};
/*:
 * @plugindesc Simplified line-of-sight calculation with better performance
 * @author Dr. Q
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This replaces the line-of-sight formula with one that runs much faster.
 * It has very slightly different results than the default LoS, but nothing
 * nonsensical.
 */
//#=============================================================================


/*-------------------------------------------------------------------------
* Get Parameters
-------------------------------------------------------------------------*/
var parameters = PluginManager.parameters('LeTBS_DrQ_FastLoS');


/*-------------------------------------------------------------------------
* BattleManagerTBS
-------------------------------------------------------------------------*/

// find LoS with greater efficiency
BattleManagerTBS.checkScopeVisibility = function (cells, center) {
	var w = $gameMap.tileWidth();
	var h = $gameMap.tileHeight();
	var cx = center.x * w + w / 2;
	var cy = center.y * h + h / 2;

	// default everything to visible
	for (var i = 0; i < cells.length; i++) {
		cells[i]._selectable = true;
	}

	// for each cell, check for a clear path
	for (var i = 0; i < cells.length; i++) {
		var dx = cells[i].x * w + w / 2;
		var dy = cells[i].y * h + h / 2;
		var lastCell = null;

		// get a path from the center to the target
		var line = LeUtilities.getPixelsOfLine(cx, cy, dx, dy);
		for (var n = 0; n < line.length; n++) {
			var x = Math.floor(line[n][0] / w);
			var y = Math.floor(line[n][1] / h);
			nCell = this.getCellAt(x, y);
			if (!nCell) continue;

			// stop at the target, ignore the center, and don't check the same cell twice
			if (nCell.isSame(cells[i])) break;
			if (nCell.isSame(center)) continue;
			if (nCell.isSame(lastCell)) continue;
			lastCell = nCell;

			// if we hit an obstacle, we're done
			if (nCell.isObstacleForLOS()) {
				cells[i]._selectable = false;
				break;
			}
		}
	}
};