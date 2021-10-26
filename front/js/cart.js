let cartFromLs = localStorage.getItem("itemsInCart")
let lsParse = JSON.parse(cartFromLs)
console.log(lsParse)

main()

function main(){
    displayCartItems(lsParse)
    getQuantityPrice(lsParse)
    //modifyQuantity(lsParse)
}

//Récupère les éléments depuis le localStorage et affiche leurs données
function displayCartItems(lsParse){
    
    const cartContent = document.getElementById('cart__items')

    for(let i = 0; i < lsParse.length; i++) {
        const itemInCart = lsParse[i]

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
        itemPrice.innerText = `${itemInCart.price}` * `${itemInCart.quantity}` + " €"
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
function getQuantityPrice(lsParse){
    const quantityArray = [] // inutile, rempalcer par lsParse
    const priceArray = [] // inutile, rempalcer par lsParse

    for(let i = 0; i < lsParse.length; i++) {
        const itemInCart = lsParse[i]

        quantityArray.push(itemInCart.quantity)
        priceArray.push(itemInCart.quantity * itemInCart.price)
    }
    console.log(quantityArray, priceArray)
    
    const totalQuantity = quantityArray.reduce((total, item) => {
        return total + item
    }, 0)

    console.log('Quantité totale: ' + totalQuantity)

    const totalPrice = priceArray.reduce((total, item) => {
        return total + item
    }, 0)

    console.log('Prix total: ' + totalPrice + ' €')

    const quantityDisplay = document.getElementById('totalQuantity')
    const priceDisplay = document.getElementById('totalPrice')

    quantityDisplay.innerText = totalQuantity
    priceDisplay.innerText = totalPrice
}

//fonction pour écouter les changement de quantité et supprimer un élement(element.closest)

/* function modifyQuantity(lsParse){
    const itemQuantity = document.getElementsByClassName('itemQuantity')

    console.log(itemQuantity)
    //let newItemQuantity;
    for(let i = 0; i < itemQuantity.length; i++) {
        const item = itemQuantity[i]

        item.addEventListener('change', function(e){
            //newItemQuantity = e.target.value
            lsParse.quantity = e.target.value
            console.log(lsParse.quantity, lsParse)
        })
    }
}

function deleteItem(lsParse){
    const deleteContainer = document.getElementsByClassName('deleteItem')

    for(let i = 0; i < deleteContainer.length; i++) {
        const item = deleteContainer[i]
        const itemContainer = item.closest("article > div")
        itemContainer.dataset.id ===

        item.addEventListener('click', function(e) {

        })
    }
} */

//essayer .find et .indexOf, .closest ou dataset