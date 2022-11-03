/* Améliorez ce code

argent = 1000;

var nbGlaces = 8;
var prixGlace = 2;

argent = argent - nbGlaces * prixGlace;
nbGlaces = 0;

var inflation = 0.04;

prixGlace = prixGlace * (1 + inflation);

var argentDePoche = 100;
var nbMois = 12;

argent = argent + argentDePoche * 12;

var crashBancaire = 5;

argent = argent / crashBancaire;

console.log('Argent', argent);*/

const argent = 1000, nbGlaces = 8, prixGlace = 2, argentDePoche = 100, nbMois = 12, crashBancaire = 5;

argent = argent - nbGlaces * prixGlace;
nbGlaces = 0;

const inflation = 0.04;

prixGlace = prixGlace * (1 + inflation);

argent = (argent + argentDePoche * 12) / crashBancaire;

console.log('Argent', argent);
