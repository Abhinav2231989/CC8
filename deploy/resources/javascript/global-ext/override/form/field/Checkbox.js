// fire onChange event on click, if a checkbox or radio does not belong to a group
Ext.define('Gw.override.form.field.Checkbox', {
  override: 'Ext.form.field.Checkbox',

  initComponent: function () {
    var me = this;
    if (me.boxIcon) {
      me.boxLabel = '<img src="' + me.boxIcon + '"/>' + (me.boxLabel || '');
    }
    delete me.boxIcon;
    me.callParent(arguments);
    me.un('focus', gw.app.deferChangeTillBlur); // for checkbox and radio, no need to defer change event till blur

    me.on('added', function (comp, container) {
      // if this checkbox belongs to a group, do not handle change event on its own:
      if (container instanceof Ext.form.CheckboxGroup) {
        comp.un('blurchange', gw.app.onChange);
      }
    });
  }

});
