const API = "http://localhost:3000/api/cameras";
/* Fonction qui permet de récupérer tous les éléments de chaque appareil et de les afficher */
function affichageProduits() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (let i = response.length - 1; i >= 0; i--) {
                let listeProduits = document.querySelector("#listeProduits");
                listeProduits.innerHTML += "<div class='h3'><u>" + response[i].name + "</u></div>" + "<div class='text-danger h4 font-weight-bold'>" + new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(response[i].price/100) + "</div>" + "<li><a href='html/Produits.html?id=" + response[i]._id + "&name=" + response[i].name + "&imageUrl=" + response[i].imageUrl + "'><img src='" + response[i].imageUrl + "' class='img-fluid col-8 mb-4 mt-2'></a></li>" + "<div class='mb-5'>" + response[i].description + "</div>";
            }

        }
    };
    request.open("GET", API);
    request.send();

}
/* Au chargement de la page, */
window.onload = affichageProduits();