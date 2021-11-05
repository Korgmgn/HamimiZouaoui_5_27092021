let cartFromLs = localStorage.getItem("itemsInCart")
let lsParsed = JSON.parse(cartFromLs)
console.log(lsParsed)

main()

function main(){
    displayCartItems(lsParsed)
    getQuantityPrice(lsParsed)
    modifyQuantity(lsParsed)// mettre dans displayCartItems
    deleteItem(lsParsed)// mettre dans displayCartItems
    formValidation(lsParsed)
}

//Récupère les éléments depuis le localStorage et affiche leurs données
function displayCartItems(lsParsed){
    
    const cartContent = document.getElementById('cart__items')

    for(let i = 0; i < lsParsed.length; i++) {
        const itemInCart = lsParsed[i]

        const itemContainer = document.createElement('article')
        itemContainer.classList.add('cart__item')
        itemContainer.setAttribute('data-id', `${itemInCart.id}`)
        cartContent.appendChild(itemContainer)

        const imgContainer = document.createElement('div')
        imgContainer.classList.add('cart__item__img')
        itemContainer.appendChild(imgContainer)
            
        const itemImg = document.createElement('img')
        itemImg.setAttribute('src', `${itemInCart.img}`)
        itemImg.setAttribute('alt', `${itemInCart.altTxt}`)
        imgContainer.appendChild(itemImg)

        const dataContainer = document.createElement('div')
        dataContainer.classList.add('cart__item__content')
        itemContainer.appendChild(dataContainer)

        const textContainer = document.createElement('div')
        textContainer.classList.add('cart__item__content__titlePrice')
        dataContainer.appendChild(textContainer)

        const itemName = document.createElement('h2')
        itemName.innerText = `${itemInCart.name}`
        textContainer.appendChild(itemName)

        const itemPrice = document.createElement('p')
        itemPrice.innerText = itemInCart.price + " €"
        textContainer.appendChild(itemPrice)

        const settingsContainer = document.createElement('div')
        settingsContainer.classList.add('cart__item__content__settings')
        dataContainer.appendChild(settingsContainer)

        const quantityContainer = document.createElement('div')
        quantityContainer.classList.add('cart__item__content__settings__quantity')
        settingsContainer.appendChild(quantityContainer)

        const colorTag = document.createElement('p')
        colorTag.innerText = `${itemInCart.color}`
        quantityContainer.appendChild(colorTag)

        const qtyTag = document.createElement('p')
        qtyTag.innerText = "Qté : "
        quantityContainer.appendChild(qtyTag)

        const itemQuantity = document.createElement('input')
        itemQuantity.classList.add('itemQuantity')
        itemQuantity.setAttribute('type', 'number')
        itemQuantity.setAttribute('name', 'itemQuantity')
        itemQuantity.setAttribute('min', '1')
        itemQuantity.setAttribute('max', '100')
        itemQuantity.setAttribute('value', `${itemInCart.quantity}`)
        quantityContainer.appendChild(itemQuantity)

        const deleteContainer = document.createElement('div')
        deleteContainer.classList.add('cart__item__content__settings__delete')
        settingsContainer.appendChild(deleteContainer)

        const deleteButton = document.createElement('p')
        deleteButton.classList.add('deleteItem')
        deleteButton.innerText = "Supprimer"
        deleteContainer.appendChild(deleteButton)        
    }
}

/*Récupère les quantités et les prix depuis le localStorage dans deux arrays séparés, 
puis calcul le total et l'affiche dans le dom*/
function getQuantityPrice(lsParsed){
        
    const totalQuantity = lsParsed.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    console.log('Quantité totale: ' + totalQuantity)

    const totalPrice = lsParsed.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)

    console.log('Prix total: ' + totalPrice + ' €')

    const quantityDisplay = document.getElementById('totalQuantity')
    const priceDisplay = document.getElementById('totalPrice')

    quantityDisplay.innerText = totalQuantity
    priceDisplay.innerText = totalPrice
}

//Ecoute les changement de quantité et mettre à jour le localStorage

function modifyQuantity(lsParsed){
    const itemQuantity = document.getElementsByClassName('itemQuantity')

    console.log(itemQuantity)
    for(let i = 0; i < itemQuantity.length; i++) {
        const item = itemQuantity[i]

        const itemContainerId = item.closest('article').getAttribute('data-id')
        const foundItem = lsParsed.find(item => itemContainerId == item.id && item == lsParsed[i])

        item.addEventListener('change', function(e){
            const index = lsParsed.indexOf(foundItem)
            console.log(item.value, itemContainerId, index)
            if(foundItem){
                lsParsed[index].quantity = Number(e.target.value)
                localStorage.setItem("itemsInCart", JSON.stringify(lsParsed))
                getQuantityPrice(lsParsed)
                console.log(lsParsed[index])
            }            
        })
    }
}


//Ecoute le clic sur le bouton "Supprimer", retire le html correspondant et enlève l'objet dans le localStorage
function deleteItem(lsParsed){
    const deleteContainer = document.getElementsByClassName('deleteItem')
    
    for(let i = 0; i < deleteContainer.length; i++) {
        const item = deleteContainer[i]

        const itemContainer = item.closest('article')
        const itemContainerId = itemContainer.getAttribute('data-id')
        const foundItem = lsParsed.find(item => itemContainerId == item.id && item == lsParsed[i])

        item.addEventListener('click', function(e) {
            const index = lsParsed.indexOf(foundItem)

            if(foundItem){
                itemContainer.remove()
                lsParsed.splice(index, 1)
                localStorage.setItem("itemsInCart", JSON.stringify(lsParsed))
                console.log(lsParsed)
            }
        })
    }
}


function formValidation(lsParsed) {

    const form = document.getElementsByClassName('cart__order__form')[0]
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    form.addEventListener('submit', function(e) {
        e.preventDefault()
        	
        let contact
        let order

        let products = lsParsed.map((item) => {
            return item.id
        })

        if(checkInputs()) {
            console.log('Commande envoyée')
            
            contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            }

            order = {contact, products}
            console.log(order)
            postOrder(order)
        } else {
            alert('Un des champs est invalide')
        }        
    })
}


function checkInputs() {

    const firstNameValue = firstName.value
    const lastNameValue = lastName.value
    const addressValue = address.value
    const cityValue = city.value
    const emailValue = email.value

    const firstNameMsg = document.getElementById('firstNameErrorMsg')
    const lastNameMsg = document.getElementById('lastNameErrorMsg')
    const addressMsg = document.getElementById('addressErrorMsg')
    const cityMsg = document.getElementById('cityErrorMsg')
    const emailMsg = document.getElementById('emailErrorMsg')


    if(checkFormInput(firstNameValue, firstNameMsg) && checkFormInput(lastNameValue, lastNameMsg) && checkAddress(addressValue, addressMsg) && checkFormInput(cityValue, cityMsg) && checkEmail(emailValue, emailMsg)) {
        return true
    } else {
        return false
    }
}

function checkFormInput(targetValue, errorDisplay){

    if(targetValue == '') {
        firstNameMsg.innerText = 'Ce champ est requis !'
    } else if (!nameCityRegex(targetValue)) {
        errorDisplay.innerText = 'Des caractères sont invalides !'
    } else {
        errorDisplay.innerText = 'Champ valide'
        return true
    }
}

function checkAddress(targetValue, errorDisplay){

    if(targetValue == '') {
        errorDisplay.innerText = 'Ce champ est requis !'
    } else if (addressRegex(targetValue)) {
        errorDisplay.innerText = 'Des caractères sont invalides !'
    } else {
        errorDisplay.innerText = 'Champ valide'
        return true
    }
}

function checkEmail(targetValue, errorDisplay){

    if(targetValue == '') {
        errorDisplay.innerText = 'Ce champ est requis !'
    } else if (!emailRegex(targetValue)) {
        errorDisplay.innerText = 'Des caractères sont invalides !'
    } else {
        errorDisplay.innerText = 'Champ valide'
        return true
    }
}


function nameCityRegex(nameCityValue){
    return /^[A-Z-a-z\s]{3,40}$/.test(nameCityValue)
}

function addressRegex(addressValue){
    return /^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)$/.test(addressValue)
}

function emailRegex(emailValue){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)
}


function postOrder(order) {
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
        body: JSON.stringify(order)
    })
    .then(function(res) {
        if (res.ok) {
            console.log('SUCCESS')
            return res.json()
        }
    })
    .then(function(data) {
        console.log(data)
        //localStorage.clear()
        localStorage.setItem('confirmOrderId', data.orderId)
    })
    .then(function() {
        //document.location.href = "confirmation.html"
    })
    .catch(function(error) {
        console.log('ERROR')
    })
}
