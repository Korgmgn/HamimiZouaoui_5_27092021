document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
            if (res.ok) {
                console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        fetchResult(data)           
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})


function fetchResult(data) {
    console.log(data)

    const listContainer = document.getElementById('items')

    for(let i = 0; i < data.length; i++) {
        const couch = data[i]

        const itemLink = document.createElement('a')
        listContainer.appendChild(itemLink)
        itemLink.setAttribute('href', `./product.html?id=${couch._id}`)

        const itemCard = document.createElement('article')
        itemLink.appendChild(itemCard)

        const itemImg = document.createElement('img')
        itemCard.appendChild(itemImg)
        itemImg.setAttribute('src', couch.imageUrl) /* deuxième setAttribute pour ajouter alt en plus de src ? */
        itemImg.setAttribute('alt', couch.altTxt)

        const itemName = document.createElement('h2')
        itemCard.appendChild(itemName)
        itemName.classList.add('productName')
        itemName.innerText = couch.name
        
        const itemText = document.createElement('p')
        itemCard.appendChild(itemText)
        itemText.classList.add('productDescription')
        itemText.innerText = couch.description
    } 
}
 


