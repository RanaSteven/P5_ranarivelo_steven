var numeroIdentifiant = localStorage.getItem("numIdentifiant");
var numId = document.getElementById("numId");
var total = localStorage.getItem("finalPrice");
var finalPrice = document.getElementById("finalPrice");

finalPrice.innerHTML = "<span class='font-weight-bold h5'>"+new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(total)+"</span>";
numId.innerHTML = "<span class='font-weight-bold h5'>"+numeroIdentifiant+"</span>";

/*localStorage.clear();*/