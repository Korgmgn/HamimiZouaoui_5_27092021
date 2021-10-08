// Liste des id & classe de balises à compléter dynamiquement

/* 
div class="item__img" = createElement <img src= image du produit alt= alttxt du produit>
h1 id="title" = innerText nom du produit
span id="price" = innerText prix du produit
p id=description = innerText description du produit

addEventListener
balise option = change, loop color array, target.value
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
        console.log(data.name)

        let imgDiv = document.getElementsByClassName('item__img')

        let itemImg = document.createElement('img')
        imgDiv.appendChild(itemImg)
        itemImg.setAttribute('src', data.imageUrl)

        let itemName = document.getElementById('title')
        itemName.textContent = data.name

        let itemPrice = document.getElementById('price')
        itemPrice.innerText = data.price

        let itemText = document.getElementById('description')
        itemText.innerText = data.description

/*         let colorSelect = document.getElementById('colors') 

        for(let i = 0; i < data.colors.length; i++) {
            let couchColor = data.colors[i]

            let colorOption = createElement('option')
            colorSelect.appendChild('colorOption')
            colorOption.setAttribute('value', couchColor) 
            
        }

        colorSelect.addEventListener('change', function(e) {
            // Utiliser e.target.value pour récupérer la bonne couleur dans l'array panier ?
        })  */


        //fonction addEventListener avec (input > 0 && input <= 100) pour la quantité - Lier au bouton ajouter au panier?
        //fonction pour l'ajout au panier - Créer un array cart = [] en utilisant .push pour y ajouter id, quantité, couleur.
        // localStorage sur ce script ou le suivant?
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})