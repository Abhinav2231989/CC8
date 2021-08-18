/**
 * A http proxy that delegates to gw.app
 */
Ext.define('gw.ext.ModelProxy', {
  extend: 'Ext.data.proxy.Ajax',
  alias: 'proxy.gw',
  url: 'dummy',

  /**
   * Let gw.app handle the request
   * @SenchaUpgrade need to keep in sync with super class implementation
   */
  doRequest: function(operation, callback, scope) {
    //
    // remove the fake-group-field from sort and group spec:
    // TODO: refactor to not use grouping for summary row of the entire LV?
    //
    function removeFackGroupField(sorters) {
      return Ext.Array.filter(sorters, function(sorter) {
        return !(Ext.isString(sorter.property) && sorter.property.charAt(0) == ":");
      }, this);
    }
    if (operation.sorters) {
      operation.sorters = removeFackGroupField(operation.sorters);
    }
    if (operation.groupers) {
      operation.groupers = removeFackGroupField(operation.groupers);
    }

    var writer  = this.getWriter(),
         request = this.buildRequest(operation);

    if (operation.allowWrite()) {
      request = writer.write(request);
    }

    Ext.apply(request, {
      binary        : this.binary,
      headers       : this.headers,
      timeout       : this.timeout,
      scope         : this,
      callback      : this.createRequestCallback(request, operation, callback, scope),
      method        : this.getMethod(request),
      disableCaching: false // explicitly set it to false, ServerProxy handles caching
    });

    var params = request.params;
    if (params.argIds) { // collect arg values
      var ids = params.argIds.split(',')
      var argValues = []
      for (var i = 0; i < ids.length; i++) {
        var argId = ids[i];
        var comp = argId ? Ext.ComponentManager.get(argId) : null;
        argValues[i] = comp ? gw.ext.Util.getFieldValue(comp) : ''
      }
      params.additionalArgs = argValues
    }
    if (params.node == 'root') {
      delete params.node; // remove id for the "invisible root" node
    }

    gw.app.requestViewRoot(params.viewRootId, params, undefined,
        { operation:Ext.apply(operation, {viewRootId : params.viewRootId}) }); // attach the data operation to be used during callback

    return request;
  }
});
