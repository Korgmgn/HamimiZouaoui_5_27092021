// Liste des id & classe de balises à compléter dynamiquement

/* 
div class="item__img" = createElement <img src= image du produit alt= alttxt du produit>
h1 id="title" = innerText nom du produit
span id="price" = innerText prix du produit
p id=description = innerText description du produit

addEventListener
balise option à intégrer dynamiquement = change
input id=quantity = change or input (input > 0 && input < 100)
button id=addToCart = input (voir localStorage)
*/


let urlParam = new URL(document.location)
let itemId = urlParam.searchParams.get('id')

document.addEventListener('DOMContentLoaded', function() {
    fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(function(res) {
            if (res.ok) {
                console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        console.log(data)
        
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})