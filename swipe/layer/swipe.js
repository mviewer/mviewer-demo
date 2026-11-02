const aerial = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://data.geopf.fr/wms-r/wms",
    params: { LAYERS: "HR.ORTHOIMAGERY.ORTHOPHOTOS", TILED: true, CRS: "EPSG:3857" },
    serverType: "geoserver",
  }),
});
//Classe qui etend la classe abstraite et decris le custom Layer
class SwipeLayer extends CustomLayer {
  // Initialize the Custom Layer
  constructor(id, layer, legend, handle = false) {
    // Initialize CustomLayer superClass
    super(id, layer, legend, handle);
    // Define events on the Tile Layer
    aerial.on("prerender", function (event) {
      var ctx = event.context;
      var swipeElement = document.getElementById("swipe");
      var position = swipeElement ? swipeElement.value : 50;
      var width = ctx.canvas.width * (position / 100);
      ctx.save();
      ctx.beginPath();
      ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
      ctx.clip();
    });
    // Define events on the Tile Layer
    aerial.on("postrender", function (event) {
      var ctx = event.context;
      ctx.restore();
    });
  }
}
// Create The Custom Layer
new SwipeLayer("swipe", aerial);
