//
// Grid shrinkWrap bug fixes
//

/**
 * @SenchaUpgrade
 *
 * Added on 06/12/13 by Bruno Tavares for Ext 4.2.1
 * Support Ticket ticket-12521
 * Sencha Jira Ticket EXTJSIV-7923
 *
 * To solve our layouts we leave grids without any layout… it won't have a width and it will fit 100%…
 * PLUS we add shrinkWrap, so the columns push the grid further 100%…
 * PLUS set gridview position: relative; so it has at least 100%… if the columns are < 100% it doesn't matter… the gridview has 100%
 */

/**
 * @SenchaUpgrade
 * Second part, change
 *
 *      invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize < horzSize,
 *      invalidateVert = vert.shrinkWrapDock && vert.maxChildSize < vertSize,
 * to
 *      invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize <= horzSize,
 *      invalidateVert = vert.shrinkWrapDock && vert.maxChildSize <= vertSize,
 *
 * This will be fixed in the framework probably for 4.2.2, so remove it once it's ready.
 * This makes docked titles move along with the body
 */
Ext.define('Gw.override.component.Dock', {
  override: 'Ext.layout.component.Dock',

  invalidateAxes: function (ownerContext, horz, vert) {
    var before = this.beforeInvalidateShrinkWrapDock,
      after = this.afterInvalidateShrinkWrapDock,
      horzSize = horz.end - horz.begin,
      vertSize = vert.initialSize,
      invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize <= horzSize,
      invalidateVert = vert.shrinkWrapDock && vert.maxChildSize <= vertSize,
      dockedItems, len, i, itemContext, itemSize, isHorz, axis, sizeProp;

    if (invalidateHorz || invalidateVert) {
      if (invalidateVert) {
        // For vertical, we need to reset the initial position because they are affected
        // by the horizontally docked items
        vert.begin = vert.initialBegin;
        vert.end = vert.begin + vert.initialSize;
      }
      dockedItems = ownerContext.dockedItems;
      for (i = 0, len = dockedItems.length; i < len; ++i) {
        itemContext = dockedItems[i];
        isHorz = itemContext.horizontal;
        axis = null;
        if (invalidateHorz && isHorz) {
          sizeProp = horz.sizeProp;
          itemSize = horzSize;
          axis = horz;
        } else if (invalidateVert && !isHorz) {
          sizeProp = vert.sizeProp;
          itemSize = vertSize;
          axis = vert;
        }

        if (axis) {
          // subtract any margins
          itemSize -= itemContext.getMarginInfo()[sizeProp];
          if (itemSize !== itemContext.props[sizeProp]) {
            itemContext.invalidate({
              before: before,
              after: after,
              axis: axis,
              ownerContext: ownerContext,
              layout: this
            });
          }
        }
      }
    }
  }
});
