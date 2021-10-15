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
        displayItemData(data)

        // fonction pour récupérer et afficher les couleurs disponibles dans le menu déroulant
        displayItemColors(data)
        //Ecoute la couleur et la quantité
        printInput(data)

        //fonction pour ajouter l'objet produit{id, quantité, couleur} dans l'array du panier et empêcher les doublons id + couleur
        pushItemToCart(data)
        //setLocalStorage(data)
        
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})


function displayItemData(data){
    let imgDiv = document.getElementsByClassName('item__img')
        imgDiv = imgDiv[0] /* ajouter une div */

        const itemImg = document.createElement('img')
        itemImg.setAttribute('src', data.imageUrl)
        itemImg.setAttribute('alt', data.altTxt)
        imgDiv.appendChild(itemImg)

        const itemName = document.getElementById('title')
        itemName.textContent = data.name

        const itemPrice = document.getElementById('price')
        itemPrice.innerText = data.price

        const itemText = document.getElementById('description')
        itemText.innerText = data.description
}

//constantes utilisées dans les functions suivantes
const colorSelect = document.getElementById('colors') 
const itemQty = document.getElementById('quantity')


function displayItemColors(data){
    for(let i = 0; i < data.colors.length; i++) {
        const couchColor = data.colors[i]

        const colorOption = document.createElement('option')
        colorOption.setAttribute('value', couchColor)
        colorOption.innerText = couchColor
        colorSelect.appendChild(colorOption)      
    }
}

function printInput(data){
    colorSelect.addEventListener('change', function(e){
        console.log(e.target.value)
    })
    
    itemQty.addEventListener('change', function(e) {
        console.log(e.target.value)
    })
}

function pushItemToCart(data){
    let cart = []
    const itemToCart = document.getElementById('addToCart')

    itemToCart.addEventListener('click', function(e){
        /*
            Condition pour controler la quantité et condition pour update ou créer le lS
        */
        //séparer en eux fonctions?
        let addedItem = {
            id: data._id,
            name: data.name,
            price: data.price,
            img: data.imageUrl,
            altTxt: data.altTxt,
            color: colorSelect.value,
            quantity: itemQty.value
        }
        cart.push(addedItem)
        console.log(cart)
        localStorage.setItem("itemsInCart", JSON.stringify(cart)) //ajouter plusieurs fois le même canapé créé des objets supplémentaires dans le LS, mais ajouter un autre modèle écrase le LS en cours
    })        
}

