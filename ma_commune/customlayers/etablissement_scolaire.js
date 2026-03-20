//Définition des variables
const LAYER_URL = URL_EDUCATION;
const LAYER_ID = "etablissement_scolaire"; //Nom de la couche dans le XML
const LABEL_LEGENDE = "Etablissement scolaire";
const REQ_CQL = "&CQL_FILTER=codes_siren LIKE '%25";
const siren = API.siren ?? undefined;

// Style des entités.
let stylePicto = [
	new ol.style.Style({
        image: new ol.style.Icon({
		src: 'https://geobretagne.fr/apps/ma_commune/img/geo2f/icon_education.svg',
		scale: 1
		})
    })
];

let styleCouleur =[
	new ol.style.Style({
        image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: "#4698C9"
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
