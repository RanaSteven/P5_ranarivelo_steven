let localPanier = localStorage.getItem("panier");
let total = 0;
const formulaire = document.querySelector("#formulaire");
localPanier = JSON.parse(localPanier);

/* Fonction pour la récupération des éléments nécessaires à l'affichage des éléments du panier */
function infos(panier) {
    let resumeImg = document.querySelector("#resumeImg");
    let resumeName = document.querySelector("#resume");
    let totalPrice = document.querySelector("#totalPrice");

    for (i = panier.length - 1; i >= 0; i--) {
        fetch("http://localhost:3000/api/cameras/" + panier[i])
        .then(response => response.json())
        .then(response => {
                resume.innerHTML += "<div><img src='" + response.imageUrl + "' class='img-fluid mb-3'/></div>" + "<div class='text-center h3'>" + response.name + "</br><span class='text-danger font-weight-bold'>" + new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(response.price/100) + "</span></div>";
                total += response.price/100;
                totalPrice.innerHTML = "Prix total : <span class='text-danger'>" + new Intl.NumberFormat("fr-FR", {style: "currency", currency : "EUR"}).format(total) + "</span>";
            })
        .catch(error => console.error("error"))
    }
};

/*infos(["5be9c4c71c9d440000a730e9", "5be1ef211c9d44000030b062", "5be1ef211c9d44000030b062"]);*/

if (localPanier == null) {
    document.getElementById("formulaire").hidden = true;
    let vide = document.getElementById("vide");
    vide.innerHTML = "Désolé, votre panier est vide !";
} else {
    window.onload = infos(localPanier);
}

/* Fonction test des éléments du formulaire */
function testInput($value, $type) {
    let message;
    let ok = true;

    if ($type == 'email') {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($value)) {
            ok = false;
            message = "Format d'email invalide";
            alert(message);
        }
    }

    if ($type == 'text') {
        if (!/^[a-zA-Z\s]*$/.test($value)) {
            ok = false;
            message = "Seul les caractères alphabétiques sont autorisés";
            alert(message);
        }
    }

    if ($type == 'adresse') {
        if (!/^[a-zA-Z0-9\s]*$/.test($value)) {
            ok = false;
            message = "Format de l'adresse invalide";
            alert(message);
        }
    }
    return ok;
}

/*console.log(testInput("test.fr", "email"));
console.log(testInput("test@test.fr", "email"));*/

/* Fonction post du formulaire */
function post(formulaire) {
    let contact = {
        firstName: inputPrenom.value,
        lastName: inputNom.value,
        address: inputAdresse.value,
        city: inputVille.value,
        email: inputEmail.value
    };

    let products = localPanier;
    let objectToSend = {
        contact,
        products
    };

    const option = {
                    method: "POST",
                    body: JSON.stringify(objectToSend),
                    headers: {"Content-Type": "application/json"}
                }
    fetch("http://localhost:3000/api/cameras/order", option)
    .then(response => response.json())
    .then(response => {
        let numId = response.orderId;
            
            localStorage.setItem("numIdentifiant", numId);
            localStorage.setItem("finalPrice", total);

            window.open("Confirmation.html", "Confirmation");
            window.location.href = "../index.html";
    })
    .catch(error => console.error("error"))
}

/* Fonction de vérification des valeurs du formulaire par rapport au type et au regex */
function verificationInput() {
    let ok1 = ok2 = ok3 = ok4 = ok5 = true;
    ok1 = testInput(inputEmail.value, "email");
    ok2 = testInput(inputPrenom.value, "text");
    ok3 = testInput(inputNom.value, "text");
    ok4 = testInput(inputVille.value, "text");
    ok5 = testInput(inputAdresse.value, "adresse");


    if (ok1 == true && ok2 == true && ok3 == true && ok4 == true && ok5 == true) {
        post(formulaire);
    }
}

/* Fonction de l'évènement Click */
let envoyer = document.getElementById("envoyer").value;
document.getElementById("envoyer").addEventListener("click", verificationInput);