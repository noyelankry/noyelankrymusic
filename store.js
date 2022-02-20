//check to see if the page is loaded before the script can run...
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// The next script is made to remove rows from the cart whenever the page is ready and loaded
function ready(){
    let removeCartItemBtn = document.getElementsByClassName("REMOVE-btn")
    console.log(removeCartItemBtn)

    for (let i=0; i<removeCartItemBtn.length; i++){
        let button = removeCartItemBtn[i]
        button.addEventListener('click', removeCartItem)
    }

    const quantityInputs = document.getElementsByClassName('cart-q-in')
    for(let i=0; i<quantityInputs.length;i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    const addToCartBtn = document.getElementsByClassName('add-to-cart-btn')
    for(let i=0; i<addToCartBtn.length; i++){
        let button = addToCartBtn[i]
        button.addEventListener('click', addCartItem)
    }
}


function removeCartItem(event){
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value != 1){
        input.value = 1
    }
    updateCartTotal()
}

function addCartItem(event){
    let buttonClicked = event.target
    let shopItem = buttonClicked.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    
    addRowToCart(title, price, imageSrc)
    updateCartTotal()
    ready() 
    // I added a call to the "ready" function, to update the button array so the remove button will work properly
}

function addRowToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    
    let cartItemsNames = document.getElementsByClassName('cart-item-title')
    for(let i=0; i<cartItemsNames.length; i++){
        console.log(cartItemsNames[i].innerText)
        if(cartItemsNames[i].innerText === title){
            alert('This item is already in the cart')
            return
        }
    }

    let cartRowContents = `
    <div class="cart-item cart-col">
        <img src="${imageSrc}" alt="${title}" class="cart-img">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-col cart-price">${price}</span>
    <div class="cart-col">
        <input class="cart-q-in" type="number" value="1">
        <button role="button" class="btn shop-btn REMOVE-btn">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}

//update the total of the cart when remove button clicked
function updateCartTotal(){
    const cartItemContainer = document.getElementsByClassName("cart-items")[0]
    const cartRows = document.getElementsByClassName("cart-row")
    let total = 0
    for(let i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i]
        let pElem = cartRow.getElementsByClassName("cart-price")[0]
        let qElem = cartRow.getElementsByClassName("cart-q-in")[0]

        let price = pElem.innerText.replace('$','')
        let quantity = qElem.value
        total += (price*quantity)
    }
    total = Math.round(total*100)/100 //round to the nearest two decimal places
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total
}