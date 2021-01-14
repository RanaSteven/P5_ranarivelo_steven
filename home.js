var API = "http://localhost:3000/api/cameras";

function ok(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	        var response = JSON.parse(this.responseText);
	    		for (var i = response.length - 1; i >= 0; i--) {
	    			console.log(response[i]);
	    			var listeProduits = document.querySelector("#listeProduits");
	    			listeProduits.innerHTML += "<div class='h3'><u>"+response[i].name+"</u></div>"+"<div class='text-danger h4 font-weight-bold'>"+response[i].price+"€"+"</div>"+"<li><a href='Produits.html?id="+response[i]._id+"&name="+response[i].name+"&imageUrl="+response[i].imageUrl+"'><img src='"+response[i].imageUrl+"' class='img-fluid col-8 mb-4 mt-2'></a></li>"+"<div class='mb-5'>"+response[i].description+"</div>";
	    		}

	    }
	};
request.open("GET", API);	
request.send();

}

window.onload = ok();