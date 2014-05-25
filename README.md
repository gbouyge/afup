#Planning AFUP

##Présentation

##Reste à faire
- Filter pour recherche texte
- Module d’impression
- Finalisation du style (couleur de sélection, bordure de sélection, ...)
- qtip
- Highlight qui correspond au filtre (Intégré mais désactivé car trop lent a voir)
- Export Ical
- Responsive
- Sauvegarde de la config dans le localstorage (voir la compatibilité avec les navigateurs desktop / mobile)

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
### CasperJs

> npm install -g phantomjs

> npm install -g casperjs

### Récupération des données sur le site de l'afup via CasperJS

> cd tools

> casperjs getAfupData.js