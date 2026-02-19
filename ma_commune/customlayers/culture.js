//Définition des variables
const LAYER_URL = URL_CULTURE;
const LAYER_ID = "culture"; //Nom de la couche dans le XML
const LABEL_LEGENDE = "Equipement culturel";
const REQ_CQL = "&CQL_FILTER=codes_siren LIKE '%25";
const siren = API.siren ?? undefined;

// Style des entités.
let stylePictoLieu = [
	new ol.style.Style({
        image: new ol.style.Icon({
		src: 'https://geobretagne.fr/apps/ma_commune/img/geo2f/icon_culture.svg',
		scale: 1
		})
    })
];

let stylePictoMonument = [
	new ol.style.Style({
        image: new ol.style.Icon({
		src: 'https://geobretagne.fr/apps/ma_commune/img/geo2f/icon_monument_culture.svg',
		scale: 1
		})
    })
];


let styleCouleur =[
	new ol.style.Style({
        image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: "#B76AD1"
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
//Appel du style 
		style: (feature, resolution) => {
		if (feature.get("type_equipement_ou_lieu")&& resolution < 6) {
            switch (feature.get("type_equipement_ou_lieu")) {
				case "Monument":
					stl =  stylePictoMonument;
					break;
                default:
					stl =  stylePictoLieu;
					break;
			}
	 } else {
		  stl =  styleCouleur;
		}
		return stl;
		},
  });
  handle = false;
  new CustomLayer(LAYER_ID, layer, legend);