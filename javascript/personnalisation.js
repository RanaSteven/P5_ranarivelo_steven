const request = new XMLHttpRequest();
const parametres = new URLSearchParams(window.location.search);
const id = parametres.get("id");
const name = parametres.get("name");

const title = document.getElementById("title");
title.innerHTML = name;

/* Fonction qui affiche l'ensemble des caractéristiques de l'appareil selectionné */
function affichagePersonnalisation() {
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);

            for (let i = 0; i < response.lenses.length; i++) {
                let lentille = document.querySelector("#lentille");
                lentille.innerHTML += "<option>" + response.lenses[i] + "</option>";
            }

            let img = document.querySelector("#images");
            img.innerHTML = "<img src='" + response.imageUrl + "' class='img-fluid'/>";

            let name = document.querySelector("#name");
            name.innerHTML = response.name;

            let price = document.querySelector("#price");
            price.innerHTML = new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(response.price/100);
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