var numeroCommande = localStorage.getItem("numCommande");
var numId = document.getElementById("numId");
numId.innerHTML = numeroCommande;

var total = localStorage.getItem("finalPrice");
var finalPrice = document.getElementById("finalPrice");
finalPrice.innerHTML = total;

/*localStorage.clear();*/