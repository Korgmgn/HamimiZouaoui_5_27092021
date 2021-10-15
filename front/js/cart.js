let cartFromLs = localStorage.getItem("itemsInCart")
let lsParse = JSON.parse(cartFromLs)
console.log(lsParse)

main()

function main(){
    displayCartItems(lsParse)
}

//Affiche les éléments du panier et leurs données
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
        itemPrice.innerText = `${itemInCart.price}` * `${itemInCart.quantity}` + "€"
        textContainer.appendChild(itemPrice)

        const settingsContainer = document.createElement('div')
        settingsContainer.classList.add('cart__item__content__settings')
        dataContainer.appendChild(settingsContainer)

        const quantityContainer = document.createElement('div')
        quantityContainer.classList.add('cart__item__content__settings__quantity')
        settingsContainer.appendChild(quantityContainer)

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

        //              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
        
    }
}