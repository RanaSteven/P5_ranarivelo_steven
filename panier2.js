var request = new XMLHttpRequest();
var panier = localStorage.getItem("panier");
var total = 0;
var formulaire = document.querySelector("#formulaire");
        panier = JSON.parse(panier);
        console.log(panier);
        
        if (panier == null){
            document.getElementById("formulaire").hidden = true;
            var vide = document.getElementById("vide");
            vide.innerHTML = "Désolé, votre panier est vide !";
    }

var envoyer = document.getElementById("envoyer").value;
document.getElementById('envoyer').addEventListener('click', function(e){
    var ok1 = ok2 = ok3 = ok4 = ok5 = true;
    ok1 = testInput(inputEmail.value, "email");
    ok2 = testInput(inputPrenom.value, "text");
    ok3 = testInput(inputNom.value, "text");
    ok4 = testInput(inputVille.value, "text");
    ok5 = testInput(inputAdresse.value, "adresse");


    if (ok1 == true && ok2 == true && ok3 == true && ok4 == true && ok5 == true){ /* fonction post de la ligne 32 a 63*/
        post(formulaire);
    }
});

function post(formulaire){
    var contact = {
                firstName: inputPrenom.value,
                lastName: inputNom.value, 
                address: inputAdresse.value,
                city: inputVille.value,
                email: inputEmail.value
            };

    var products = panier;
    var objectToSend = { contact, products};

    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(objectToSend));
    
    request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        var numId = response.orderId;
        console.log(numId);

        localStorage.setItem("numCommande", numId);
        localStorage.setItem("finalPrice", total);

        window.open("Confirmation.html", "Confirmation");

        numId = document.getElementById("numId");
        numId.innerHTML = "<span>"+response.orderId+"</span>";
            } 
    };
}

/* Fonction test*/
function testInput($value, $type){
    var message;
    var ok = true;

    if($type == 'email'){
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($value)){
        ok = false;
        message = "Format d'email invalide";
        alert(message);
        }
    }

    if($type == 'text'){
    if (!/^[a-zA-Z\s]*$/.test($value)){
        ok = false;
        message = "Seul les caractères alphabétiques sont autorisés";
        alert(message);
        }
    }

    if($type == 'adresse'){
    if (!/^[a-zA-Z0-9\s]*$/.test($value)){
        ok = false;
        message = "Format de l'adresse invalide";
        alert(message);
        }
    }
    return ok;
}

function infos() {
for (i = panier.length -1; i >= 0; i--){
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
            var resumeImg = document.querySelector("#resumeImg");
            var resumeName = document.querySelector("#resume");

            resumeImg.innerHTML += "<div><img src='"+response.imageUrl+"' class='img-fluid'/></div>";
            resume.innerHTML += "<div class='text-center h3'>"+response.name+"</br><span class='text-danger font-weight-bold'>"+response.price+" €</span></div>";

        total += response.price;
        var totalPrice = document.querySelector("#totalPrice");
        totalPrice.innerHTML = "Prix total : <span class='text-danger'>"+total+" €</span>";
    }
    }       
request.open("GET", "http://localhost:3000/api/cameras/"+panier[i]);
request.send();
}
}

window.onload = infos();