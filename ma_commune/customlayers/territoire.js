const siren = API.siren ?? undefined;

const url = "https://geobretagne.fr/geoserver/ign/wfs?SERVICE=WFS&request=GetFeature&version=1.1.0&typeName=table_correspondance_ma_commune&outputFormat=application%2Fjson&srsName=EPSG:3857";


let style = new ol.style.Style({
    stroke: new ol.style.Stroke({ color: '#000', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(255,255,255,0)' })
});

let legend = { items: [] };



var _loaderData = function () {
    try {
        _vectorSource.clear();
        if (siren) {
            $.ajax({
                url: url + "&CQL_FILTER=code_siren%3D" + siren,
                dataType: "json",
                success: function (data) {
                    if (data) {
                        _vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(data));
                        mviewer.getMap().getView().fit(_vectorSource.getExtent(), { size: mviewer.getMap().getSize(), maxZoom: 13 });

                    } else {
                        console.log("pas de données");
                    }
                },
                error: function () {

                }
            });
        }
    }
    catch (e) {
    }
};


const _vectorSource = new ol.source.Vector({
    loader: _loaderData,
});


let layer = new ol.layer.Vector({
    source: _vectorSource,
    style: style,
});

new CustomLayer("territoire", layer);

