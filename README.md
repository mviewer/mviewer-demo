# Version

Mviewer v4 ou supérieure, compatible avec Bootstrap 5.

# mviewer-demo

Ce dépôt contient toutes les démonstrations de l’outil mviewer.

# Catalogue

Le catalogue permet de retrouver une démo et de la tester.

Il est localisé dans https://github.com/mviewer/mviewer-demo/catalogue.

Vous y trouverez un [README dédié](https://github.com/mviewer/mviewer-demo/tree/main/catalogue).

La page HTML du catalogue est localisée à la racine du dépôt :

https://github.com/mviewer/mviewer-demo/blob/main/index.html

Si vous avez récupéré toutes les sources mviewer et ses sous-modules, cette page sera accessible sous une URL du type :  

https://monsite.fr/mviewer/demo/index.html

# Comment faire ?

Vous trouverez ici les étapes à suivre pour ajouter votre démo et la tester.

## Ajouter votre démo

**Exemple : je veux rajouter une carte de démonstration qui utilise un filtre attributaire WMS.**

1. Faire un fork de ce dépôt (si j’ai un compte ou une organisation `github.com/johndoe`, alors je pourrai avoir le fork dans `github.com/johndoe/mviewer-addon`).
2. Faire un clone local de ce fork pour travailler sur votre ordinateur (avec VS Code par exemple).
3. Créer une branche `wms-attribute-filter` depuis la branche `main`.
4. Ajouter un répertoire `wmsattributefilter` (tel que le chemin soit `mviewer-demo/wmsattributefilter`).
5. Dans ce répertoire, ajouter vos configurations XML, customlayer, customcontrols, JSON, images et autres ressources nécessaires.
6. Votre carte sera donc accessible sous `mviewer?config=demo/wmsattributefilter/wmsattributefilter.xml` (le nom du fichier XML est à adapter selon votre choix).
7. Pousser vos modifications sur votre branche.
8. Faire une pull request vers le dépôt original `mviewer/mviewer-demo`.
9. Après validation ou revue de la pull request, votre démo sera accessible dans `https://github.com/mviewer/mviewer-demo/demo/wmsattributefilter`.
10. Après la validation de la pull request, pensez à supprimer votre branche de votre fork pour plus de clarté.

## Tester votre démo avec votre fork

> Ce tutoriel permet de tester mviewer avec votre fork du dépôt mviewer-demo. En effet, l’installation d’un mviewer complet avec ses sous-modules utilisera le sous-module `mviewer/mviewer-demo` et non votre fork. (L’installation d’un mviewer complet est [documentée ici](https://mviewerdoc.readthedocs.io/fr/latest/doc_tech/deploy.html#deployer-une-version-complete)).

Pour accéder et tester vos démonstrations dans mviewer, vous aurez besoin du cœur de mviewer, qui permet le chargement et l’affichage des cartes.  
Vous devez donc cloner mviewer sans ses sous-modules (mviewer-demo étant un sous-module de mviewer), modifier l’URL du sous-module pour utiliser votre fork, puis récupérer les sources des sous-modules.

**Étapes à suivre :**

1. Cloner mviewer sans les submodules avec cette commande :
   ```
   git clone https://github.com/mviewer/mviewer.git
   ```

2. Ouvrir [le fichier .gitmodules](https://github.com/mviewer/mviewer/blob/develop/.gitmodules), à la racine du répertoire `/mviewer` que vous venez de cloner.
3. Remplacer l’URL `https://github.com/mviewer/mviewer-demo.git` par l’URL de votre fork (par exemple `https://github.com/johndoe/mviewer-demo.git`, si vous avez fait un fork dans votre organisation GitHub `johndoe`).
4. Sauvegarder et fermer le fichier.
5. Récupérer toutes les sources des sous-modules `/addons` et `/demo` avec cette commande :
   ```
   git submodule update --init
   ```

6. Vous avez maintenant les répertoires `mviewer/addons` et `mviewer/demo` (qui pointe vers votre fork). Ces deux répertoires contiennent des clones des dépôts liés sur la branche `main`.
7. Changer de branche pour utiliser votre branche de travail dans `mviewer/demo` (`mabranche` est à adapter selon votre cas) :
   ```
   cd mviewer/demo
   git checkout mabranche
   ```
8. Vous pouvez maintenant tester votre démo dans le mviewer que vous venez de cloner.

Démarrez ensuite votre mviewer (soit via Nginx, soit via Node.js) et vous pourrez accéder à toutes les démonstrations.

### Démarrer rapidement les démos en local avec mviewer

> **ATTENTION : utilisez Nginx ou Apache pour une mise en production.**

Pour le développement, vous pouvez utiliser le serveur Node.js (v20+) avec Vite.js ou un serveur web classique comme Nginx ou Apache.

> Note : Si vous exécutez ce catalogue depuis le dépôt `mviewer-demo`, vous ne pourrez pas tester l’accès aux cartes (voir section plus bas). Vous devrez installer la version complète du mviewer avec ses sous-modules ([voir la documentation](https://mviewerdoc.readthedocs.io/fr/latest/doc_tech/deploy.html#deployer-une-version-complete)).

Démarrage du serveur de test avec Node.js :  

```
npm install
npm run dev
```

- Mviewer est accessible sur `localhost:5173`.
- Le catalogue est accessible sur `localhost:5173/demo/index.html`.
