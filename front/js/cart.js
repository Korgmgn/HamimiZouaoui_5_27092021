let cartFromLs = localStorage.getItem("itemsInCart")
let lsParse = JSON.parse(cartFromLs)
console.log(lsParse)

main()

function main(){
    displayCartItems(lsParse)
    getQuantityPrice(lsParse)
    modifyQuantity(lsParse)
    deleteItem(lsParse)
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
function getQuantityPrice(lsParse){
        
    const totalQuantity = lsParse.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    console.log('Quantité totale: ' + totalQuantity)

    const totalPrice = lsParse.reduce((total, item) => {
        return total + item.price * item.quantity
    }, 0)

    console.log('Prix total: ' + totalPrice + ' €')

    const quantityDisplay = document.getElementById('totalQuantity')
    const priceDisplay = document.getElementById('totalPrice')

    quantityDisplay.innerText = totalQuantity
    priceDisplay.innerText = totalPrice
}

//Ecoute les changement de quantité et mettre à jour le localStorage

function modifyQuantity(lsParse){
    const itemQuantity = document.getElementsByClassName('itemQuantity')

    console.log(itemQuantity)
    for(let i = 0; i < itemQuantity.length; i++) {
        const item = itemQuantity[i]

        const itemContainerId = item.closest('article').getAttribute('data-id')
        const foundItem = lsParse.find(item => itemContainerId == item.id && item == lsParse[i])

        item.addEventListener('change', function(e){
            const index = lsParse.indexOf(foundItem)
            console.log(item.value, itemContainerId, index)
            if(foundItem){
                lsParse[index].quantity = Number(e.target.value)
                localStorage.setItem("itemsInCart", JSON.stringify(lsParse))
                console.log(lsParse[index])
            }            
        })
    }
}


//Ecoute le clic sur le bouton "Supprimer", retire le html correspondant et enlève l'objet dans le localStorage
function deleteItem(lsParse){
    const deleteContainer = document.getElementsByClassName('deleteItem')
    
    for(let i = 0; i < deleteContainer.length; i++) {
        const item = deleteContainer[i]

        const itemContainer = item.closest('article')
        const itemContainerId = itemContainer.getAttribute('data-id')
        const foundItem = lsParse.find(item => itemContainerId == item.id && item == lsParse[i])

        item.addEventListener('click', function(e) {
            const index = lsParse.indexOf(foundItem)

            if(foundItem){
                itemContainer.remove()
                lsParse.splice(index, 1)
                localStorage.setItem("itemsInCart", JSON.stringify(lsParse))
                console.log(lsParse)
            }
        })
    }
}

//essayer .find et .indexOf, .closest ou dataset