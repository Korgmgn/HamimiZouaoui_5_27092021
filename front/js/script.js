document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
            if (res.ok) {
                console.log('SUCCESS')
                return res.json()
            }
    })
    .then(function(data) {
        usefetchResult(data)           
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})


function usefetchResult(data) {
    console.log(data)

    const listContainer = document.getElementById('items')

    for(let i = 0; i < data.length; i++) {
        const couch = data[i]

        const itemLink = document.createElement('a')
        itemLink.setAttribute('href', `./product.html?id=${couch._id}`)
        listContainer.appendChild(itemLink)

        const itemCard = document.createElement('article')
        itemLink.appendChild(itemCard)

        const itemImg = document.createElement('img')
        itemImg.setAttribute('src', couch.imageUrl) /* deuxième setAttribute pour ajouter alt en plus de src ? */
        itemImg.setAttribute('alt', couch.altTxt)
        itemCard.appendChild(itemImg)

        const itemName = document.createElement('h2')
        itemName.classList.add('productName')
        itemName.innerText = couch.name
        itemCard.appendChild(itemName)
        
        const itemText = document.createElement('p')
        itemText.classList.add('productDescription')
        itemText.innerText = couch.description
        itemCard.appendChild(itemText)
    } 
}
 


