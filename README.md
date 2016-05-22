#Planning AFUP
Prêt pour le PHP Tour Clermont 2016

##Présentation

## Nouveau
- Sauvegarde de la config dans le localstorage (voir la compatibilité avec les navigateurs desktop / mobile)
- Suppression de l'impression

##Reste à faire
- Finalisation du style (couleur de sélection, bordure de sélection, ...)
- qtip
- Highlight qui correspond au filtre (Intégré mais désactivé car trop lent a voir)
- Export Ical

##Installation

### Bower

> sudo apt-get update

> sudo apt-get install python-software-properties python g++ make

> sudo add-apt-repository ppa:chris-lea/node.js

> sudo apt-get update

> sudo apt-get install nodejs

> sudo npm install -g bower


### Vendor
> bower install

## Tools

### Static-server

> npm -g install static-server

> static-server -i ./index.html

### CasperJs

> npm install -g phantomjs

> npm install -g casperjs

### Récupération des données sur le site de l'afup via CasperJS

> cd tools

> casperjs getAfupData.js
