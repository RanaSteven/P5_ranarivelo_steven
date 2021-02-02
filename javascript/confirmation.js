let numeroIdentifiant = localStorage.getItem("numIdentifiant");
let numId = document.getElementById("numId");
let total = localStorage.getItem("finalPrice");
let finalPrice = document.getElementById("finalPrice");

finalPrice.innerHTML = "<span class='font-weight-bold h5'>"+new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(total)+"</span>";
numId.innerHTML = "<span class='font-weight-bold h5'>"+numeroIdentifiant+"</span>";

localStorage.clear();

