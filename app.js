// initialisation du server
const express = require('express');
const app = express();
var request = require('request');
var port = 3008;


// on utilise le moteur de template ejs
app.set('view engine', 'ejs');

// créer le service qui permet de récupérer les données de data.json
app.get("/liste", function (req, res) {
    res.sendFile(__dirname + "/data.json")
})
// route principale, pour afficher la page d'accueil
app.get("/", function (req, res) {

    let url = "http://localhost:3008/liste";
    //script de lecture des données d'url
    request(url, function (err, response, body) {
        if (err) { //si erreur, affiche error
            console.log('error:', error);
        } else { // si ok, traitement du json pour utilisation via le moteur de template 
            var renvoialiste = JSON.parse(body)
            console.log('body:', body);
        }
       // envoi des données vers le moteur de template ex: page index qui se trouve dans le dossier view
        res.render('index', {
            liste: renvoialiste
        });
    });
})
app.listen(port, () => console.log('Cool mec !'))
