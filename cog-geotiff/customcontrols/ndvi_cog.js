mviewer.customControls.ndvi_cog = (function () {
  /*
   * Private
   */
  var _idlayer = "ndvi_cog";
  var _displayPixelValue = null;

  var _updateLayer = function () {};

  return {
    /*
     * Public
     */

    init: function () {
      this.destroy();
      // mandatory - code executed when panel is opened
      const output = document.getElementById("output");
      const btn = document.getElementById("ndvi_center");
      if (!output) return;

      _displayPixelValue = function (event) {
        const layer = mviewer.getLayer(_idlayer)?.layer;
        if (!layer) return;
        const data = layer.getData(event.pixel);
        if (!data) {
          return;
        }
        // random calcul example
        const red = data[0];
        const nir = data[1];
        const ndvi = (nir - red) / (nir + red);
        output.textContent = ndvi.toFixed(2);
      };
      if (!mviewer.getMap()) return;
      mviewer.getMap().on(["pointermove", "click"], _displayPixelValue);
      $(btn).off("click.cog-geotiff").on("click.cog-geotiff", () => {
        // fast example
        // need to be improve by extent calculation from layer directly
        mviewer.getLayer(_idlayer).layer.getSource().getView().then(v => {
        const extent3857 = ol.proj.transformExtent(v.extent, v.projection, 'EPSG:3857')
        mviewer
          .getMap()
          .getView()
          .fit(extent3857);
        })
      });
    },

    updateLayer: function (ctrl) {},

    destroy: function () {
      if (_displayPixelValue && mviewer.getMap()) {
        mviewer.getMap().un(["pointermove", "click"], _displayPixelValue);
        _displayPixelValue = null;
      }
      $("#ndvi_center").off("click.cog-geotiff");
    },
  };
})();
