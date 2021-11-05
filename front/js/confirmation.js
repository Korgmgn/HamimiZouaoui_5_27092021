let orderIdLocalStorage = localStorage.getItem("confirmOrderId")
//console.log(orderIdLocalStorage)

main()

function main() {
    displayOrderId()
}

function displayOrderId() {
    const orderIdContainer = document.getElementById('orderId')
    orderIdContainer.innerText = orderIdLocalStorage
    localStorage.clear()
}