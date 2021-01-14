var panier = localStorage.getItem("panier");
        panier = JSON.parse(panier);
        console.log(panier);
        
        if (panier == null){
            document.getElementById("formulaire").hidden = true;
    }

var envoyer = document.getElementById("envoyer").value;
document.getElementById('envoyer').addEventListener('click', function(e){
    var ok = true;

    function testEmail()
    const testEmail = !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value);



    if (testEmail == false){
    var contact = {
                firstName: inputPrenom.value,
                lastName: inputNom.value, 
                address: inputAdresse.value,
                city: inputVille.value,
                email: inputEmail.value
            }


    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value)){
        ok = false;
        message = "Format d'email invalide";
        alert(message);
    }
    if (!/^[a-zA-Z\s]*$/.test(inputPrenom.value)){
        ok = false;
        message = "Format du prénom invalide";
        alert(message);
    }

    if (!/^[a-zA-Z\s]*$/.test(inputNom.value)){
        ok = false;
        message = "Format du nom invalide";
        alert(message);
    }

    if (!/^[a-zA-Z\s]*$/.test(inputVille.value)){
        ok = false;
        message = "Format du nom de ville invalide";
        alert(message);
    }

    if (!/^[a-zA-Z0-9\s]*$/.test(inputAdresse.value)){
        ok = false;
        message = "Format de l'adresse invalide";
        alert(message);
    }

    function post(){
    if (ok == true){
    var contact = {
                firstName: inputPrenom.value,
                lastName: inputNom.value, 
                address: inputAdresse.value,
                city: inputVille.value,
                email: inputEmail.value
            };

    var products = panier;
    var objectToSend = {contact, products};

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
};

var formulaire = document.querySelector("#formulaire");
/* Faire une fonction test en lui transmettant en parametre la valeur formuaire
pour qu'elle nous retourne true ou false */
var total = 0;
	for (i = panier.length -1; i >= 0; i--){
var request = new XMLHttpRequest();
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
    };
        
request.open("GET", "http://localhost:3000/api/cameras/"+panier[i]);
request.send();
};

/*Mettre dans une fonction ligne 85 à 101
L'appeler avec window.onload*/


/*function Verification() {
// Récupérer lavaleur des champs nom et email
var inputPrenom = document.getElementById('inputPrenom').value;
var inputNom = document.getElementById('inputNom').value;
var inputAdresse = document.getElementById('inputAdresse').value;
var inputVille = document.getElementById('inputVille').value;
var inputEmail = document.getElementById('inputEmail').value;

// Contrôle sur le prenom
if(!/^[a-zA-Z\s]*$/.test(inputPrenom.value)){
ok = false;
alert('Mauvais format de votre nom !');
document.getElementById('inputPrenom').style.backgroundColor="red";
document.getElementById('inputPrenom').style.color="#FFF";

// Permet de bloquer l'envoi du formulaire
return false;
}
else{
document.getElementById('inputPrenom').style.backgroundColor="#9C6";
}

// Contrôle sur le nom
if(!/^[a-zA-Z\s]*$/.test(inputNom.value)){
ok = false;
alert('Mauvais format de votre nom !');
document.getElementById('inputNom').style.backgroundColor="red";
document.getElementById('inputNom').style.color="#FFF";

// Permet de bloquer l'envoi du formulaire
return false;
}
else{
document.getElementById('inputNom').style.backgroundColor="#9C6";
}

// Contrôle sur l'adresse
if(!/^[a-zA-Z0-9\s]*$/.test(inputAdresse.value)){
ok = false;
alert('Mauvais format de  votre adresse !');
document.getElementById('inputAdresse').style.backgroundColor="red";
document.getElementById('inputAdresse').style.color="#FFF";

// Permet de bloquer l'envoi du formulaire
return false;
}
else{
document.getElementById('inputAdresse').style.backgroundColor="#9C6";
}

// Contrôle sur le nom
if(!/^[a-zA-Z\s]*$/.test(inputVille.value)){
ok = false;
alert('Mauvais format du champ ville !');
document.getElementById('inputVille').style.backgroundColor="red";
document.getElementById('inputVille').style.color="#FFF";

// Permet de bloquer l'envoi du formulaire
return false;
}
else{
document.getElementById('inputVille').style.backgroundColor="#9C6";
}

// Contrôle sur l'email
if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail.value)) {
ok = false;
alert('Mauvais format de votre adresse email');
document.getElementById('inputEmail').style.backgroundColor="red";
document.getElementById('inputEmail').style.color="#FFF";
return false;
}

else{
document.getElementById('inputEmail').style.backgroundColor="#9C6";
}
}}*/

