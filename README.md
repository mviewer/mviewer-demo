# Version

Mviewer v4 or superior compliant with Bootstrap 5.

# mviewer-demo
Applications de démonstration de l'outil mviewer

# Catalogue

Le catalogue permet de retrouver une démo et de la tester.

### Développements

Pour les développements, vous pouvez utiliser le serveur Node.js (v20 +) avec Vite.js ou un serveur web classique comme Nginx ou Apache.

> Note : Si vous exécutez ce catalogue depuis le dépôt mviewer-demos, vous ne pourrez tester l'accès aux cartes (voir section plus bas).

Avec Vite.js : 

```
npm install
npm run dev
```

La page est accessible sur `localhost:5173`.

### Tester les cartes

Les cartes nécessitent un mviewer pour être chargées.
Pour utiliser ce catalogue et tester les cartes de démos, vous devez : 

- cloner mviewer avec ce submodule

`git clone --recurse-submodules https://github.com/mviewer/mviewer.git`

- accéder au catalogue et aux démos via le répertoire `/demos` (ex:`[domain.fr]/demos/index.html`)


