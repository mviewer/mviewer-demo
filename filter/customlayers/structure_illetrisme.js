(() => {
  const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: "https://www.geo2france.fr/geoserver/hdf_common/ows?SERVICE=WFS&VERSION=1.0.0&REQUEST=GETFEATURE&TYPENAME=structure_illetrisme&outputFormat=application/json&srsName=EPSG:4326",
      format: new ol.format.GeoJSON(),
    }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({ color: "rgba(207, 79, 94,1.0)" }),
        stroke: new ol.style.Stroke({ color: "#ffffff", width: 2 }),
        radius: 6,
      }),
    }),
  });

  new CustomLayer("structure_illetrisme", layer);
})();
