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
        console.log(data)
        // fonction pour récupérer et afficher les données du produit
        let imgDiv = document.getElementsByClassName('item__img')
        imgDiv = imgDiv[0] /* ajouter une div */

        const itemImg = document.createElement('img')
        itemImg.setAttribute('src', data.imageUrl)
        imgDiv.appendChild(itemImg)

        const itemName = document.getElementById('title')
        itemName.textContent = data.name

        const itemPrice = document.getElementById('price')
        itemPrice.innerText = data.price

        const itemText = document.getElementById('description')
        itemText.innerText = data.description

        // fonction pour récupérer et afficher les couleurs disponibles dans le menu déroulant
        const colorSelect = document.getElementById('colors') 

        for(let i = 0; i < data.colors.length; i++) {
            const couchColor = data.colors[i]

            const colorOption = document.createElement('option')
            colorOption.setAttribute('value', couchColor)
            colorOption.innerText = couchColor
            colorSelect.appendChild(colorOption)      
        }

        //Ecoute la couleur - A supprimer
        colorSelect.addEventListener('change', function(e){
            console.log(e.target.value)
        })

        //Ecoute la quantité - A intégrer dans l'eventlistener click du panier OU tel que, ajouter break après condition pour empêcher l'ajout au panier?
        const itemQty = document.getElementById('quantity')
        
        itemQty.addEventListener('change', function(e) {
            console.log(e.target.value)
        })

        //fonction pour ajouter le produit objet{id, quantité, couleur} dans l'array du panier 
        let cart = []
        const itemToCart = document.getElementById('addToCart')

        itemToCart.addEventListener('click', function(e){
            /*
            Pour chaque index dans l'array
                Si array contient id && couleur identiques
                Alors input.value + object.quantity
                Sinon array.push(object)

            for(let i = 0; i < cart.length; i++){
                if(){}
            }
            */
            
            let addedItem = {
                id: data._id,
                color: colorSelect.value,
                quantity: itemQty.value
            }
            cart.push(addedItem)/* quantity est une string, pourquoi? */
            console.log(cart)
        })
        
        // Utiliser e.target.value pour récupérer la bonne couleur dans l'array panier ?
        //fonction  - Lier au bouton ajouter au panier?
        //fonction pour l'ajout au panier - Créer un array cart = [] en utilisant .push pour y ajouter id, quantité, couleur.
        // localStorage sur ce script ou le suivant?
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})