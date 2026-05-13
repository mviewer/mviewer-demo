const source = new ol.source.GeoTIFF({
  wrapX: false,
  // normalize: true is required to get values between 0 and 1, which is needed for interpolation in the style
  normalize: true,
  sources: [{
    url: "demo/cog-geotiff/data/boutro_cog.tiff",
    // reading values from Qgis - required to set min and max for interpolation in the style
    min: -4.847,
    max: 4.512,
    // pixels without data have value 0, so we set it as nodata
    nodata: 0,
  }],
});

// usefulle to avoid repeating ["band", 1] in the style
const bandValue = ["band", 1];

// interpolation style
const style = {
  color: [
    "case",
    ["<=", bandValue, 0.001],  // nodata
    ["color", 0, 0, 0, 0],
    [
      "interpolate",
      ["linear"],
      bandValue,
      0.001,  ["color", 48,  18,  59,  1],  // -4.847 (min)
      0.0905, ["color", 69,  91,  205, 1],  // -4
      0.1960, ["color", 62,  156, 254, 1],  // -3
      0.3015, ["color", 24,  215, 203, 1],  // -2
      0.4070, ["color", 72,  248, 130, 1],  // -1
      0.5125, ["color", 164, 252, 60,  1],  //  0
      0.6180, ["color", 226, 220, 56,  1],  //  1
      0.7235, ["color", 254, 163, 49,  1],  //  2
      0.8290, ["color", 239, 89,  17,  1],  //  3
      0.9345, ["color", 194, 36,  3,   1],  //  4
      1.0,    ["color", 122, 4,   3,   1],  //  4.512 (max)
    ],
  ],
};

const layer = new ol.layer.WebGLTile({
  source: source,
  style
});


new CustomLayer("tiff", layer);
