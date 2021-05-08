# PLD-SMART

Ce projet porte sur une application web et mobile qui permet de signaler un vol, harcèlement ou agression aini, elle permet d'afficher ces signelement en temps réél ainsi que de déciner une Heatmap des signalement. Elle permet également de tracer la trajectoire vers une destination décidée par l'utilisateur.

## Technologie

Le projet est divisé en 2 partie:
Le front end dans le dossier Front/MLS en angular (Typescript) avec le framework ionic pour avoir une application cross-platform. L'application utilise la bibliothèque Leaflet utilisant OpenStreetMap pour l'affichage de la carte et le calcul du trajet.

Le Back end dans le dossier mls-app-backend en nestjs, un framework Typescript pour le back compilé en javascript et se basant sur nodejs. Le back-end est hébérgé sur Heroku, et connecté à une base de donnée non relationnelle mongodb hébérgé sur mongodb atlas.

Guide d'installation : 
FrontEnd : 
Sous le répertoire Front/MLS :
  - lancer la commande <npm install> pour télecharger les module node nécessaire au fonctionnnement de l'application angular.
  - compiler et lancer le front avec <ionic serve>
BackEnd :
Sous le répertoire mls-app-backend :
  - lancer la commande <npm install> pour télecharger les module node nécessaire au fonctionnnement de l'application angular.
  - compiler et lancer le back avec <npm run start>

