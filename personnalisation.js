var request = new XMLHttpRequest();
var parametres = new URLSearchParams(window.location.search);
var id = parametres.get("id");
var name = parametres.get("name");

var title = document.getElementById("title");
title.innerHTML = name;

/* Fonction qui affiche l'ensemble des caractéristiques de l'appareil selectionné */
function affichagePersonnalisation() {
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);

            for (var i = 0; i < response.lenses.length; i++) {
                var lentille = document.querySelector("#lentille");
                lentille.innerHTML += "<option>" + response.lenses[i] + "</option>";
            }

            var img = document.querySelector("#images");
            img.innerHTML = "<img src='" + response.imageUrl + "' class='img-fluid'/>";

            var name = document.querySelector("#name");
            name.innerHTML = response.name;

            var price = document.querySelector("#price");
            price.innerHTML = new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(response.price);
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras/" + id);
    request.send();
}

affichagePersonnalisation();

document.getElementById('submitToPanier').addEventListener('click', function ajoutPanier() {
    var panier = JSON.parse(localStorage.getItem("panier"));
    if (panier == null) {
        panier = [];
    }
    panier.push(id);
    panier = JSON.stringify(panier);
    localStorage.setItem("panier", panier);

});