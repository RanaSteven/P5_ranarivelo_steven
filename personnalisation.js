var request = new XMLHttpRequest();
var parametres = new URLSearchParams(window.location.search);
var id = parametres.get("id");
var name = parametres.get("name");
var imageUrl = parametres.get("imageUrl");



console.log(id, name, imageUrl);

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        for (var i = 0; i < response.lenses.length; i++) {
    		var form = document.querySelector("#form");
        	form.innerHTML += "<option>"+response.lenses[i]+"</option>";
    	}
    	
        var img = document.querySelector("#images");
        img.innerHTML = "<img src='"+response.imageUrl+"' class='img-fluid'/>";

        var name = document.querySelector("#name");
        name.innerHTML = response.name;

        var price = document.querySelector("#price");
        price.innerHTML = response.price + " €";
        }
};
request.open("GET", "http://localhost:3000/api/cameras/"+id);
request.send();

	document.getElementById('submit').addEventListener('click', function(e){
	var panier = JSON.parse(localStorage.getItem("panier"));
	if (panier == null){
		panier = [];
	}
	panier.push(id);
	panier = JSON.stringify(panier);
	localStorage.setItem("panier", panier);
	
});



