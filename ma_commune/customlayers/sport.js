//Définition des variables
const LAYER_URL = URL_SPORT;
const LAYER_ID = "sport";
const LABEL_LEGENDE = "Equipement sportif";
const REQ_CQL = "&CQL_FILTER=codes_siren LIKE '%25";
const siren = API.siren ?? undefined;

// Style des entités.
let stylePicto = [
	new ol.style.Style({
        image: new ol.style.Icon({
		src: 'https://geobretagne.fr/apps/ma_commune/img/geo2f/icon_sport.svg',
		scale: 1
		})
    })
];

let styleCouleur =[
	new ol.style.Style({
        image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: "#C4871C"
			}),
			stroke: new ol.style.Stroke({
				color: "#ffffff",
				width: 2
			}),
			radius: 7
		})
    })
];

let legend = { items: [] };

//Appel de la donnée


const layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: LAYER_URL  + REQ_CQL + siren + "%25'",
      format: new ol.format.GeoJSON(),
    }),
    style: (feature, resolution) => {
    if (resolution < 6) {
      return stylePicto;
 } else {
      return styleCouleur;
    }
	},
});

  handle = false;
  new CustomLayer(LAYER_ID, layer, legend);