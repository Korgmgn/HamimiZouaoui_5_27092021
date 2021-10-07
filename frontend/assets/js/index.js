document.addEventListener('DOMContentLoaded', function getItems() {
    fetch('http://localhost:3000/api/cameras/')
    .then(function(res) {
            if (res.ok) {
                console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            let camera = data[i]
    
            const listContainer = document.getElementById('list-container')
    
            let itemLink = document.createElement('a')
            listContainer.appendChild(itemLink)
            itemLink.classList.add('list-container__item-link')
            itemLink.setAttribute('href', `pages/product.html_id=${camera._id}`) /* Il manque quelque chose pour que l'URL fonctionne*/
    
            let itemCard = document.createElement('figure')
            itemLink.appendChild(itemCard)
            itemCard.classList.add('item-card')
    
            let itemImg = document.createElement('img')
            itemCard.appendChild(itemImg)
            itemImg.classList.add('item-card__img')
            itemImg.setAttribute('src', camera.imageUrl) /* comment ajouter alt en plus de src*/
    
            let itemText = document.createElement('figcaption')
            itemCard.appendChild(itemText)
            itemText.classList.add('item-card__text')
    
            let itemTitle = document.createElement('h2')
            itemText.appendChild(itemTitle)
            itemTitle.classList.add('item-card__text--name')
            itemTitle.innerText = camera.name
            
            let itemPrice = document.createElement('p')
            itemText.appendChild(itemPrice)
            itemPrice.classList.add('item-card__text--price')
            itemPrice.innerText = camera.price
        }    
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})

/*
Ancien modèle
function domContentDisplay() {
    function fetchResult(data) {
        console.log(data)
        return res.json() 
    }
    Fonction ici  
} */


