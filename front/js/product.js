let urlParam = new URL(document.location)
let itemId = urlParam.searchParams.get('id')
let currentItem
document.addEventListener('DOMContentLoaded', function() {
    fetch(`http://localhost:3000/api/products/${itemId}`)
    .then(function(res) {
            if (res.ok) {
                //console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        currentItem = data
        displayItemData(currentItem)
        verifyColor()
        verifyQuantity()
        addToCartClick()        
    })
    .catch(function(error) {
        //console.log('ERROR')
    })
})

//Créé est rempli le DOM dynamiquement
function displayItemData(currentItem){
    let imgDiv = document.getElementsByClassName('item__img')
        imgDiv = imgDiv[0]

        const itemImg = document.createElement('img')
        itemImg.setAttribute('src', currentItem.imageUrl)
        itemImg.setAttribute('alt', currentItem.altTxt)
        imgDiv.appendChild(itemImg)

        const itemName = document.getElementById('title')
        itemName.textContent = currentItem.name

        const itemPrice = document.getElementById('price')
        itemPrice.innerText = currentItem.price

        const itemText = document.getElementById('description')
        itemText.innerText = currentItem.description

        displayItemColors(currentItem)
}

//constantes utilisées dans les functions suivantes
const colorSelect = document.getElementById('colors') 
const itemQty = document.getElementById('quantity')

//Créé et rempli le DOM dynamiquement
function displayItemColors(currentItem){
    for(let i = 0; i < currentItem.colors.length; i++) {
        const couchColor = currentItem.colors[i]

        const colorOption = document.createElement('option')
        colorOption.setAttribute('value', couchColor)
        colorOption.innerText = couchColor
        colorSelect.appendChild(colorOption)      
    }
}


let isColorTrue;    // Retourné par verifyColor puis utilisé dans addTocartClick

//verifie si input couleur est valide
function verifyColor(){
    colorSelect.addEventListener('change', function(e){
        //console.log(e.target.value)
        if(e.target.value !== ""){
            //console.log('couleur valide')
            isColorTrue = true
        } else {
            alert("Aucune couleur selectionnée")
            isColorTrue = false
        }
    })
}


let isQuantityTrue; // Retourné par verifyQuantity puis utilisé dans addTocartClick

//verifie si input quantité est valide
function verifyQuantity(){
    itemQty.addEventListener('change', function(e) {
        //console.log(e.target.value)
        if(e.target.value > 0 && e.target.value <= 100){
            //console.log('quantité valide')
            isQuantityTrue = true
        } else {
            alert('La quantité doit être comprise entre 1 et 100')
            isQuantityTrue = false
        }
    })
}

//Déclenché au clic du bouton, vérifie d'abord que couleur & quantité sont valides
function addToCartClick(){
    const itemToCart = document.getElementById('addToCart')

    itemToCart.addEventListener('click', function(e){
        if(isColorTrue == true && isQuantityTrue == true){
            //console.log('La couleur et la quantité sont valides')
            checkForCart()
        } else {
            alert('La couleur et la quantité doivent être valides')
        }
    })
}

//Verifie si le localStorage existe
function checkForCart(){
    const cartExists = localStorage.getItem("itemsInCart")
    //Constante pour la création d'objet à mettre dans l'array cart
    let addedItem = { //a récupérer depuis le dom ou urlparams
        id: itemId, 
        name: document.querySelector('#title').innerText,
        price: Number(document.querySelector('#price').innerText),
        img: document.getElementsByClassName('item__img')[0].getElementsByTagName('img')[0].getAttribute('src'),     // trop de piping?
        altTxt: document.getElementsByClassName('item__img')[0].getElementsByTagName('img')[0].getAttribute('alt'),
        color: colorSelect.value,
        quantity: Number(itemQty.value)
    }    

    if(cartExists != null){
        //console.log('Le panier existe déjà')
        searchCartForId(cartExists, addedItem)
    } else {
        //console.log('Le panier n\'existe pas')
        newLocalStorage(addedItem)
    }
}

//Si le localStorage existe, vérifie si un produit avec le même Id && couleur existe
function searchCartForId(cartExists, addedItem){
    const parsedCart = JSON.parse(cartExists)
    const foundId = parsedCart.find(item => itemId == item.id && colorSelect.value == item.color)
    //console.log(parsedCart)

    if(foundId){
        let newQuantityIncart  = Number(foundId.quantity) + Number(itemQty.value) 
        foundId.quantity = newQuantityIncart
        localStorage.setItem("itemsInCart", JSON.stringify(parsedCart))
        //console.log('Cet objet existe déjà dans le panier, la quantité a été mise à jour')
    } else {
        //console.log('Cet objet n\'existe pas encore dans le panier')
        updateLocalStorage(parsedCart, addedItem)        
    }
}


//Mets à jour le localStorage existant avec un nouvel objet
function updateLocalStorage(parsedCart, addedItem){
    parsedCart.push(addedItem)
    localStorage.setItem("itemsInCart", JSON.stringify(parsedCart))
    //console.log('Nouvel objet ajouté au panier existant')
}

//Si le localStorage n'existe pas, le premier objet et le localStorage sont créés
function newLocalStorage(addedItem){

    let newCart = []

    newCart.push(addedItem)
    localStorage.setItem("itemsInCart", JSON.stringify(newCart))
    //console.log('Panier créé et premier objet ajouté')
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