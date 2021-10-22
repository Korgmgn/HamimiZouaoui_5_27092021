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
        addToCartClick(data)        
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})

//Créé est rempli le DOM dynamiquement
function displayItemData(data){
    let imgDiv = document.getElementsByClassName('item__img')
        imgDiv = imgDiv[0]

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

let isColorTrue;

function verifyColor(){
    colorSelect.addEventListener('change', function(e){
        console.log(e.target.value)
        if(e.target.value !== ""){
            console.log('couleur valide')
            isColorTrue = true
        } else {
            alert("Aucune couleur selectionnée")
            isColorTrue = false
        }
    })
}

//verifie si input quantité est valide

let isQuantityTrue;

function verifyQuantity(){
    itemQty.addEventListener('change', function(e) {
        console.log(e.target.value)
        if(e.target.value > 0 && e.target.value <= 100){
            console.log('quantité valide')
            isQuantityTrue = true
        } else {
            alert('La quantité doit être comprise entre 1 et 100')
            isQuantityTrue = false
        }
    })
}

//Déclenché au clic du bouton, vérifie d'abord que couleur & quantité sont valides
function addToCartClick(data){
    const itemToCart = document.getElementById('addToCart')

    itemToCart.addEventListener('click', function(e){
        if(isColorTrue == true && isQuantityTrue == true){
            console.log('Tous les inputs sont valides')
            checkForCart(data)
        } else {
            console.log('Au moins un des inputs n\'est pas valide')
        }
    })
}

//Verifie si le localStorage existe
function checkForCart(data){
    const cartExists = localStorage.getItem("itemsInCart")

    //Constante pour la création d'objet à mettre dans l'array cart
    let addedItem = {
        id: data._id,
        name: data.name,
        price: Number(data.price),
        img: data.imageUrl,
        altTxt: data.altTxt,
        color: colorSelect.value,
        quantity: Number(itemQty.value)
    }    

    if(cartExists != null){
        console.log('Le panier existe déjà')
        searchCartForId(data, cartExists, addedItem)
    } else {
        console.log('Le panier n\'existe pas')
        newLocalStorage(data, addedItem)
    }
}

//Si le localStorage existe, vérifie si un produit avec le même Id && couleur existe
function searchCartForId(data, cartExists, addedItem){
    const parsedCart = JSON.parse(cartExists)
    console.log(parsedCart)

    for(let i = 0; i < parsedCart.length; i++) {
        const itemInCart = parsedCart[i]
        if(data._id == itemInCart.id && colorSelect.value == itemInCart.color){
            let newQuantityIncart  = Number(itemInCart.quantity) + Number(itemQty.value) 
            itemInCart.quantity = newQuantityIncart
            localStorage.setItem("itemsInCart", JSON.stringify(parsedCart))
            console.log('Cet objet existe déjà dans le panier, la quantité a été mise à jour')
        } else {
            console.log('Cet objet n\'existe pas encore dans le panier')
            updateLocalStorage(parsedCart, addedItem)        
        }
    }
}


//Mets à jour le localStorage existant avec un nouvel objet
function updateLocalStorage(parsedCart, addedItem){
    parsedCart.push(addedItem)
    localStorage.setItem("itemsInCart", JSON.stringify(parsedCart))
    console.log('Nouvel objet ajouté au panier existant')
}

//Si le localStorage n'existe pas, le premier objet et le localStorage sont créés
function newLocalStorage(data, addedItem){

    let newCart = []

    newCart.push(addedItem)
    localStorage.setItem("itemsInCart", JSON.stringify(newCart))
    console.log('Panier créé et premier objet ajouté')
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