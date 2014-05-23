#Planning AFUP

##Présentation

##Reste à faire
- Rendu des Events dans le Calendrier
- System Affichage / Masquage de colonne
- Finalisation du style (couleur de sélection, bordure de sélection, ...)
- Trouver une solution efficace pour remplacer le Affix
- Module d’impression
- Filter pour recherche texte
- Flêche pour remonter
- Responsive
- Highlight qui correspond au filtre
- Sauvegarde de la config dans le localstorage (voir la compatibilité avec les navigateurs desktop / mobile)
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
### CasperJs

> npm install -g phantomjs

> npm install -g casperjs

### Récupération des données sur le site de l'afup via CasperJS

> cd tools

> casperjs getAfupData.js
