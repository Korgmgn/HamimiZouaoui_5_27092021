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
    })
    .catch(function(error) {
        console.log('ERROR')
    })
})

// Il manque quelque chose pour que la fonction en dessous fonctionne? Je dois donner un paramète à ces fonctions ?
function domContentDisplay() {
    function fetchResult() {
        return res.json() 
        // placer ici res.json pour utiliser l'array dans la suite de domContentDisplay ???
    } 
    // J'ai testé cameras.length mais ça ne fonctionne pas. Quoi indiquer pour récupérer le .length, .imageUrl, etc ???
    for(let i = 0; i < fetchResult.length; i++) {
        let camera = fetchResult[i] /*cette ligne est utilisée dans beaucoup d'exemples d'array loops, c'est une variable qui fait référence à l'index en cours?*/

        const listContainer = document.getElementById('list-container')

        let itemLink = document.createElement('a')
        listContainer.appendChild(itemLink)
        itemLink.classList.add('#'/* Modifier en fonction de SASS*/)
        itemLink.setAttribute('href', '')

        let itemCard = document.createElement('figure')
        itemLink.appendChild(itemCard)
        itemCard.classList.add('#'/* Modifier en fonction de SASS*/)

        let itemImg = document.createElement('img')
        itemCard.appendChild(itemImg)
        itemImg.classList.add('#'/* Modifier en fonction de SASS*/)
        itemImg.setAttribute('src', '#')

        let itemText = document.createElement('figcaption')
        itemCard.appendChild(itemText)
        itemText.classList.add('#'/* Modifier en fonction de SASS*/)

        let itemTitle = document.createElement('h2')
        itemText.appendChild(itemTitle)
        itemTitle.classList.add('#'/* Modifier en fonction de SASS*/)

        let itemPrice = document.createElement('p')
        itemText.appendChild(itemPrice)
        itemPrice.classList.add('#'/* Modifier en fonction de SASS*/)
    }
}


