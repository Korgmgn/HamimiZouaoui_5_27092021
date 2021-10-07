document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
            if (res.ok) {
                console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            let couch = data[i]
    
            const listContainer = document.getElementById('items')
    
            let itemLink = document.createElement('a')
            listContainer.appendChild(itemLink)
            itemLink.setAttribute('href', `./product.html?id=${couch._id}`) /* Il manque quelque chose pour que l'URL fonctionne*/
    
            let itemCard = document.createElement('article')
            itemLink.appendChild(itemCard)
    
            let itemImg = document.createElement('img')
            itemCard.appendChild(itemImg)
            itemImg.setAttribute('src', couch.imageUrl) /* comment ajouter alt en plus de src*/
        
            let itemName = document.createElement('h2')
            itemCard.appendChild(itemName)
            itemName.classList.add('productName')
            itemName.innerText = couch.name
            
            let itemText = document.createElement('p')
            itemCard.appendChild(itemText)
            itemText.classList.add('productDescription')
            itemText.innerText = couch.description
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


