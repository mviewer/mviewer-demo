## Import de fichier

Cette extension permet d'importer des fichiers de façon temporaire (en local) des fichiers au format `csv`, `shp`, `GeoJSON` ou `JSON`. 

Les données importées ne sont pas sauvegardées et seront perdues à la fermeture du navigateur.

### SHP

Dans le cas du Shapefile, le fichier `.shp` doit se trouver compressé dans un fichier `.zip` qui inclut également un fichier `.dbf` encodé en UTF-8 (pour les attributs) et `.prj` (pour permettre l'interprétation du SRS à l'extension).

En cas d'absence du fichier `.prj` l'utilisateur est sollicité d'indiquer le SRS.

### GeoJSON et JSON

Correspond aux formats `.geojson` ou `.json` (MIME types `application/geo+json` ou `application/json`).

En accord avec le standard GeoJSON, le fichier doit contenir des géométries avec le système de référence  WGS84 (EPSG:4326).

> Specifications du standard  RFC7946 :
> https://datatracker.ietf.org/doc/html/rfc7946#section-4

#### 4 ressources dans cette extension

 - **fileimport.html** contient un bouton qui est affiché dans la `toolstolsbar` sur la carte par défaut et peut-être placé dans un autre endroit de choix via la **config.json**
 - **fileimport.css** définit l'affichage du bouton
 - **fileimport.js** - contient la logique de l'import
 - **config.json** - indique les trois fichiers précédents à mviewer ainsi que la **div** où le composant du bouton doit s'afficher (**target**),
 par défaut `toolstoolbar`.

### Déclaration de l'extension dans config.xml

Pour que ce composant s'affiche dans mviewer, il faut depuis un **config.xml** ajouter cette section :

````
<extensions>
    <extension type="component" id="fileimport" path="demo/addons" />
</extensions>
 ````

Plus d'info sous : https://mviewerdoc.readthedocs.io/fr/latest/doc_tech/config_customcomponent.html

### Déclaration d'une couche 'import' dans config.xml

L'extension a également besoin de la déclaration d'une couche du `type="import"` dans la **config.xml**.
Pour rendre l'import disponible dans l'IHM de mviewer il faut laisser l'attribut `url` dans la déclaration de la couche vide.
Si l'attribut `url` est présent le fichier est directement importé (seulement possible pour le format CSV avec une adresse).

Les attributs (et l'élément) suivant sont spécifiques à cette extension :

````
<layer
    ...
    geocoder=""
    geocodingfields=""
    xfield=""
    yfield=""
    ... >
    <projections>
        <projection proj4js=""/>
    </projections>
</layer>
````

Pour les couches csv (avec adresse, mais sans coordonnées) :
* ``geocoder`` : précise l’API de géocodage à utiliser (privilégier le service "search" de l'IGN).
* ``geocoderurl`` (optionnel) : permet de overrider l'url par défaut du geocoder 
* ``geocodingfields`` : précise les champs utilisables pour le géocodage.
* ``xfield`` : précise le champ du service de géocodage à utiliser pour la longitude.
* ``yfield`` : précise le champ du service de géocodage à utiliser pour la latitude.

Pour les couches csv (avec coordonnées) :
* ``projections`` (élément) : précise les projections disponible pour une transformation des coordonnées.
La définition de chaque projection se fait dans un élément enfant ``<projection proj4js=""/>`` qui contient la chaîne de caractère proj4js comme attribut.
Par défaut le SCR WGS84 (EPSG:4326) est supporté. L'import d'un shapefile n'utilise pas cette définition, mais l'obtient directement du fichier `.prj`.

Exemple qui rend disponible l'IHM de l'extension, permettant l'import `geojson`, `shp` et `csv` (avec des coordonnées en `EPSG:4326` (obligatoire en GeoJSON), `EPSG:3857` ou `EPSG:2154` ou avec adresse et sans coordonnées) :

````
<layer type="import" id="import_file" name="Importer un fichier"  visible="true"
    legendurl="img/blank.gif"
    queryable="true"
    vectorlegend="true"
    geocoder="search"
    xfield="longitude"
    yfield="latitude"
    expanded="true">
    <projections>
        <projection proj4js="'EPSG:3857','+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'"/>
        <projection proj4js="'EPSG:2154','+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'"/>
    </projections>
</layer>
````

L'IHM de l'import peut être accédé par le bouton du composant custom ou directement via l'arbre des couches.

### Afficher un CSV renseigner dans l'URL

Il est possible d'indiquer au mviewer de charger un CSV lors du premier chargement de la carte, sans aucune action de la part de l'utilisateur.

Trois paramètres sont disponibles et à renseigner dans l'URL :

- **xfield** : (option) Nom du champ dans le fichier CSV contenant la coordonnée X (longitude) 
- **yfield** : (option) Nom du champ dans le fichier CSV contenant la coordonnée Y (latitude)
- **file** : URL complète encodée du fichier CSV

Exemple :

https://monmviewer.fr?config=demo/csv.xml&file=https%3A%2F%2Fgrist.numerique.gouv.fr%2Fapi%2Fdocs%2F1HG28XWE7Ypy9eBJzper6N%2Fdownload%2Fcsv%3FtableId%3DTopologie_des_stations_le_velo_star&xfield=latitude&yfield=longitude

Cet exemple contient 3 paramètres : 

- **xfield** : latitude
- **yfield** : longitude
- **file** : https%3A%2F%2Fgrist.numerique.gouv.fr%2Fapi%2Fdocs%2F1HG28XWE7Ypy9eBJzper6N%2Fdownload%2Fcsv%3FtableId%3DTopologie_des_stations_le_velo_star

Lors du partage de la carte, ces paramètres sont conserver dans le lien de partage.

### Afficher un CSV à partir d'une URL via l'interface de chargement

Plus haut, la description indique qu'il est possible de charger un fichier (import) depuis sont ordinateur.

Il est également possible d'utiliser le champ "Charger un fichier" qui permettra de renseigner une URL de CSV à afficher sur la carte.

Le fonctionnement avec les paramètres xfield et yfield reste identique :

- si le CSV contient les champs renseignés dans la configuration (XML) de la couche, alors les données s'affichent sur la carte directement

- si le CSV ne contient pas les champs renseignés, alors la fenêtre de configuration s'affiche pour indiquer les champs à utiliser pour localiser les données


Lors du partage de la carte, les paramètres sont ajouter dans le lien de partage afin d'avoir affichées  lors du chargement de la carte à partir des paramètres d'URL.
