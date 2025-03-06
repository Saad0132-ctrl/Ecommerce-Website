let array = JSON.parse(localStorage.getItem('products')) || []
async function fetchData () {
  let response = await fetch('https://fakestoreapi.com/products')
  let data = await response.json()
  localStorage.setItem('products', JSON.stringify(data))
  array = data
  showProducts(array)
}
console.log(array)
fetchData()

let cartArray = JSON.parse(localStorage.getItem('cartData')) || []

function showProducts (data) {
  let container = document.getElementById('container')
  container.innerHTML = ''
  data.forEach((item, index) => {
    let containerElement = document.createElement('div')
    containerElement.className =
      'bg-white p-4 text-center w-80 shadow-lg rounded-lg '
    containerElement.setAttribute('index', index)
    containerElement.innerHTML = `
          <img class="h-48 w-full object-contain mb-4 rounded-lg" src="${item.image}" alt="j">
          <h3 class="text-lg font-semibold">${item.title}</h3>
          <p class="text-gray-700 font-medium mt-2">Price: $${item.price}</p>
          <button   class="addButton py-1 px-3 bg-green-500 text-white rounded-lg mt-4"> Add to Cart</button>
          `

    let addButton = containerElement.querySelector('.addButton')
    addButton.addEventListener('click', () => {
      addCart(item)
    })
    let counter = document.getElementById('counter')
    counter.innerHTML = `${cartArray.length}`
    console.log('length', cartArray.length)
    container.appendChild(containerElement)
  })
}

function addCart (data) {
  console.log(data)
  let exist = cartArray.find(product => product.title === data.title)
  if (exist) {
    exist.quantity++
  } else {
    data.quantity = 1
    cartArray.push(data)
  }
  localStorage.setItem('cartData', JSON.stringify(cartArray))
  let counter = document.getElementById('counter')
  counter.innerHTML = `${cartArray.length}`
  console.log('length', cartArray.length)
  cartData(cartArray)
}
console.log(cartArray)

let showCart = document.getElementById('showCart')
showCart.addEventListener('click', () => {
  let mainContainer = document.getElementById('main')
  mainContainer.classList.add('hidden')
  let cartDiv = document.getElementById('cartDiv')
  cartDiv.classList.remove('hidden')
  cartData(cartArray)
})
let shoppingButton = document.getElementById('shoppingButton')
shoppingButton.addEventListener('click', () => {
  let cartDiv = document.getElementById('cartDiv')
  cartDiv.classList.add('hidden')
  let mainContainer = document.getElementById('main')
  mainContainer.classList.remove('hidden')
})

function cartData (data) {
  // subTotal=0
  // let quantity=0
  let cartItems = document.getElementById('cartItems')
  cartItems.innerHTML = ''
  data.forEach((item, index) => {
    let element = document.createElement('div')
    element.className =
      'flex flex-row items-center w-full justify-between mt-1  shadow-lg rounded-xl gap-4 p-4'
    let subTotal = item.quantity * item.price

    element.innerHTML = `
        <img class="h-20 w-20 object-contain  mb-4" src="${item.image}" alt="j">
        <h1 class="w-[10rem]"><span class="text-[20px] font-bold"></span>${item.title}</h1>
        <p><span class="text-[15px] font-bold">price:</span>$${item.price}</p>
        <div class=" gap-2">
         <label for="quantity" class="text-gray-700 font-semibold">Quantity:</label>
        <input type="number" id="quantity" class="quantityInput rounded-lg w-[50px] p-1 border-[1px]  border-black" value="${item.quantity}" min="1">
        </div>
       <p><span class="text-[15px] font-bold">SubTotal:</span>${subTotal}</p>
        <button class="deleteButton bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 ">Delete</button>
      
        `
    let quantityInput = element.querySelector('.quantityInput')
    quantityInput.addEventListener('input', e => {
      let value = parseInt(e.target.value)
      console.log(value)
      if (value > 0) {
        cartArray[index].quantity = value
      } else {
        cartArray[index].quantity = 1
      }
      localStorage.setItem('cartData', JSON.stringify(cartArray))
      cartData(cartArray)
      totalPrice()
      //   subTotalPrice()
    })

    let deleteButton = element.querySelector('.deleteButton')
    deleteButton.addEventListener('click', () => {
      cartArray.splice(index, 1)
      localStorage.setItem('cartData', JSON.stringify(cartArray))
      cartData(cartArray)
      let counter = document.getElementById('counter')
      counter.innerHTML = `${cartArray.length}`
      console.log('length', cartArray.length)
    })

    cartItems.appendChild(element)
  })

  totalPrice()
}
// let subTotal=0
// function subTotalPrice(){
//  subTotal = 0
//   cartArray.forEach((data) => {
//     subTotal = data.quantity * data.price
//   })
// }
// console.log(subTotal)
let total = 0
let quantity = 0
function totalPrice () {
  total = 0
  quantity = 0
  // let quantity = 0
  cartArray.forEach(data => {
    console.log(data.quantity)
    total +=data.quantity*data.price
    quantity+= data.quantity
  })
  console.log('quan', quantity)
  let subcount = document.getElementById('subcount')
  subcount.innerText = `$${total}`
  let tax = document.getElementById('tax')
  tax.innerText = '0.00'
  let totalAmount = document.getElementById('totalAmount')
  totalAmount.innerText = `$${total}`

}

let checkOutButton = document.getElementById('checkOutButton')
checkOutButton.addEventListener('click', function () {
  let taskModal = document.getElementById('taskModal')
  taskModal.classList.remove('hidden')
})

let closeButton = document.getElementById('closeButton')
closeButton.addEventListener('click', function () {
  let taskModal = document.getElementById('taskModal')
  taskModal.classList.add('hidden')
})

let nameField = document.getElementById('nameField')
let addressField = document.getElementById('adressField')
let contactField = document.getElementById('contactField')
let saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', function () {
  if (
    nameField.value !== '' &&
    addressField.value !== '' &&
    contactField.value !== ''
  ) {
    console.log('he;lk')
    let dataContainer = document.getElementById('dataContainer')
    dataContainer.classList.remove('hidden')
    // let cartItems = document.getElementById('cartItems')
    let checkOut = document.createElement('div')
    checkOut.className = 'rounded-xl p-4 bg-white text-black'
    let h1 = document.createElement('h1')
    h1.className = 'text-2xl font-bold '
    h1.innerText = `Thansk : ${nameField.value} for shopping`
    let h2 = document.createElement('h1')
    h2.innerText = `Total Price: $${total}`
    // let dataContainer=document.getElementById('dataContainer')
    let p = document.createElement('p')
    p.innerText = `Total Quantity: ${quantity}`
    dataContainer.innerHTML = ''
    let output = cartArray.map(
      data =>
        `
      ${data.title},
      `
    )
    let okButton = document.createElement('button')
    okButton.innerText = 'ok'
    okButton.className =
      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

    checkOut.appendChild(h1)
    checkOut.append(output)
    checkOut.appendChild(p)
    checkOut.appendChild(h2)
    checkOut.appendChild(okButton)
    dataContainer.append(checkOut)

    // cartItems.append(dataContainer)
    let taskModal = document.getElementById('taskModal')
    taskModal.classList.add('hidden')
    //  localStorage.clear()
    //  cartArray.length=0

    //  totalPrice()
    //  total=0
    //  quantity=0
    //  tax=0
    //  cartData()

    okButton.addEventListener('click', () => {
      // let taskModal=document.getElementById('taskModal')
      dataContainer.classList.add('hidden')
      localStorage.clear()
      cartArray.length = 0

      totalPrice()
      total = 0
      quantity = 0
      tax = 0
      cartData()
    })
  }
})
