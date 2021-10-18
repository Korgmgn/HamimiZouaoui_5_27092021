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

        verifyColor()
        verifyQuantity()
        addToCartClick()        
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})

//Créé est rempli le DOM dynamiquement
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

//Créé et rempli le DOM dynamiquement
function displayItemColors(data){
    for(let i = 0; i < data.colors.length; i++) {
        const couchColor = data.colors[i]

        const colorOption = document.createElement('option')
        colorOption.setAttribute('value', couchColor)
        colorOption.innerText = couchColor
        colorSelect.appendChild(colorOption)      
    }
}

//verifie si input couleur est valide
function verifyColor(){
    colorSelect.addEventListener('change', function(e){
        console.log(e.target.value)
        if(e.target.value !== ""){
            console.log('couleur selectionnée valide')
            return true
        } else {
            alert("Aucune couleur selectionnée")
            return false
        }
    })
}

//verifie si input quantité est valide
function verifyQuantity(){
    itemQty.addEventListener('change', function(e) {
        console.log(e.target.value)
        if(e.target.value > 0 && e.target.value <= 100){
            console.log('quantité valide')
            return true
        } else {
            alert('La quantité doit être comprise entre 1 et 100')
            return false
        }
    })
}

//Déclenché au clic du bouton, vérifie d'abord que couleur & quantité sont valides
function addToCartClick(){
    const itemToCart = document.getElementById('addToCart')
    const cartExists = localStorage.getItem("itemsInCart")

    itemToCart.addEventListener('click', function(e){
        if(verifyColor === true && verifyQuantity === true){
            console.log('tous les inputs sont valides')
            checkForCart(cartExists)
        } else {
            console.log('un des inputs n\'est invalide') //Même lorsque le console.log de verifyQuantity & verifyColor indiquent des valeures valides, cette fonction se termine ici 
        }
    })
}

//Verifie si le localStorage existe
function checkForCart(cartExists){
    const parseCart = JSON.parse(cartExists)

    if(cartExists !== null){
        console.log('Le panier existe déjà')
        searchCartForId(data, parseCart)
    } else {
        console.log('Le panier n\'existe pas')
        pushItemToCart()
    }
}

//Si le localStorage existe, vérifie si un produit avec le même Id && couleur existe
function searchCartForId(data, parseCart){
    for(let i = 0; i < parseCart.length; i++) {
        const itemInCart = parseCart[i]
        if(data._id == itemInCart.id && colorSelect.value == itemInCart.color){
            itemInCart.quantity = itemInCart.quantity + itemQty.value //additionne les strings et non les nombres /!\
            console.log('Cet objet existe déjà dans le panier')
        } else {
            console.log('Cet objet est n\'existe pas encore dans le panier')
            pushItemToCart()
        }
    }
}

//Si le localStorage n'existe pas, l'objet produit et le localStorage sont créés
function pushItemToCart(){

    let cart = []
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
}





/*

Mémo
Dans l'ordre:
1-Verifier si l'input couleur est valide
2-Verifier si l'input quantité est valide
3-Au clic du bouton, si 1 & 2 sont vrais, vérifier si localStorage existe
4-Si localStorage existe, ajouter l'input quantité au même ID
5-Sinon, créer le nouvel objet et .push dans l'array cart
6-mettre l'array cart dans le localstorage
*/