Ext.define('gw.MenuItem', {
  extend: 'Ext.menu.Item',
  alias: 'widget.gmenuitem',

  /**
   * Registers the handler on each item, because menu item does not bubble click event to the global handler.
   */
  initComponent: function () {
    if (!this.handler) {
      this.setHandler(gw.app.onCompAction);
    } else if (Ext.isString(this.handler)) { // convert string to JS function
      this.ghandler = this.handler;
      this.handler = function () {
        eval(this.ghandler)
      }
    }

    // menu item created by overflow toolbar doesn't have a predictable ID, use eventId for action:
    if (this.eventId) {
      this.on('render', function (item) {
        item.getEl().dom.setAttribute('eventId', this.eventId)
      })
    }
    // remove the empty menu if there is no items inside so it doesn't render the arrow
    if (this.menu && !this.menu.items && !this.ondemandmenu) {
      delete this.menu;
    }

    // @SenchaUpgrade TODO: use Ext.menu.CheckItem?
    // "checked" indicator:
    if (this.checked) {
      this.cls = (this.cls ? (this.cls + ' ') : '') + Ext.baseCSSPrefix + 'menu-item-checked';
    }

    this.callParent(arguments);
  },

  // @SenchaUpgrade override private API: menu onDemand
  doExpandMenu: function () {
    gw.ext.Util.createAndShowOnDemandMenuIfNeeded(this);
    this.callParent(arguments);
  }
});
