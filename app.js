//Items "Databse"
const col = document.body.querySelector('.ships-table').rows

const items = [
    { id: 1, product_name: 'Borg Cube', price: 25000000000000, quantity: 1, image: 'https://i.pinimg.com/originals/d1/64/33/d16433a04e9832e04fac43c3f27dddb7.jpg' },
    { id: 2, product_name: 'Millenium Falcon', price: 13000000, quantity: 1, image: 'https://cdn.mos.cms.futurecdn.net/uciG9WygFRtEDcvw9gitTd.jpg' },
    { id: 3, product_name: 'Serenity', price: 850000, quantity: 1, image: 'https://www.geeksofdoom.com/GoD/img/2013/12/firefly-serenity-e1387241089451-530x326.jpg' },
    { id: 4, product_name: 'Starship Voyager', price: 46000000000, quantity: 1, image: 'https://149455152.v2.pressablecdn.com/wp-content/uploads/2016/09/star-trek-voyager.jpg' }

]

//turns number in string 
//only use for displaying number, not for doing math
const numberFormatter =
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
const itemsContainer = document.querySelector('#items-table');
const cartContainer = document.querySelector('#ships-table')

const itemsHTML = (item) => `
   <tr>
        <td>${item.product_name}</td>
        <td>${numberFormatter.format(item.price)}</td>
        <td class="images"><img src="${item.image}"></td>
        <td><button id="item-${item.id}">Add</button></td>
   </tr>
`

const cartHtML = (item) => `
    <tr>
        <td>${item.product_name}</td>
        <td>${item.price}</td>
        <td id = "item-${item.id}-quantity">${item.quantity}</td>
        <td>${item.price}</td>
        <td><button class="increase" id="item-${item.id}">+</button></td>
        <td><button class="decrease" id="item-${item.id}">-</button></td>
    </tr>
`

items.forEach(item => {
    itemsContainer.insertAdjacentHTML('beforeend', itemsHTML(item))
});


//every time you add an item, whether from add button, always check the quantity
//one line if statement if encapsulates add item logic into a callable function


itemsContainer.addEventListener('click', (evt) => {

    const idSplit = evt.target.id.split('-')
    const itemId = Number(idSplit[1])
    const item = items.find(item => item.id === itemId)
    const table = cartContainer.rows

    for (let i = table.length - 1; i >= -1; i--) {
        //first value of i is zero
        // index 0 is "ships"
        if (table[i].cells[0].innerText !== item.product_name) {
            cartContainer.insertAdjacentHTML('beforeend', cartHtML(item));
            console.log(table[i].cells[0].innerText)
            console.log(i)
            console.log(table)
            break;
        }
        else if (table[i].cells[0].innerText === item.product_name) {
            console.log("The item is in the cart")
            // console.log(table[i].cells[0].innerText)
            break;
        }

    }

    getTotal()
});




cartContainer.addEventListener('click', changeNums)

function changeNums(e) {

    //get pridce, quantity, and total 
    let price = e.target.parentElement.parentElement.cells[1]
    let quantity = e.target.parentElement.parentElement.cells[2]
    let total = e.target.parentElement.parentElement.cells[3]

    //turn them into numbers
    let num = parseInt(quantity.innerText)
    let cost = parseInt(price.innerText)

    //increase/decrease the quantity when buttons are pressed
    if (e.target.className == 'increase') {
        num += 1
        quantity.innerText = num
        let currentTotal = cost * num
        total.innerText = currentTotal
        getTotal()
    } else if (e.target.className == 'decrease') {
        num -= 1
        quantity.innerText = num
        let currentTotal = cost * num
        total.innerText = currentTotal
        getTotal()

    }
};




// set shopping cart total
function getTotal() {
    total = 0

    for (let i = 1; i < col.length; i++) {
        let cellVal = parseInt(col[i].cells[3].innerText)
        total += cellVal
        //console.log(total)
    }

    let grandTotal = document.getElementById('grand-total').innerText = numberFormatter.format(total)
    // console.log(grandTotal)
}




//remove items from cart if cart quantity is 0
cartContainer.addEventListener('click', removeItemFromCart)

function removeItemFromCart(evt) {
    quantity = evt.target.parentElement.parentElement.cells[2].innerText

    if (evt.target.className == 'decrease' && quantity == 0) {
        const tr = evt.target.parentElement.parentElement
        tr.remove()
    }

}


//remove all items in cart and reset total to 0
function removeAllRows() {
    let rows = col
    // let counter = 1

    //reverse loop - start at one to not remove columns headers
    for (let i = rows.length - 1; i >= 1; i--) {
        item = rows[i].cells[0].innerText
        rows[i].parentElement.removeChild(rows[i])
    }

    document.getElementById('grand-total').innerText = 0
}

let resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', removeAllRows);