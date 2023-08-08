let cart = ref([])
let modalCart = ref([])
let isModalCartOpen = ref(false)

function addToCart(product) {
  // Add To Cart
  updateCart()

  let isCart = cart.value.find(item => item.id === product.id)
  if (isCart === undefined) {
    cart.value.push(
      {
        id: product.id,
        count: 1
      })

    modalCart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      count: 1,
      imageUrl: product.imageUrl
    })

    localStorage.setItem('modalCart', JSON.stringify(modalCart.value))
    localStorage.setItem('cart', JSON.stringify(cart.value))


  } else {
    changeCount(product, 'inc')
  }
}

function updateCart() {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []
  modalCart.value = JSON.parse(localStorage.getItem('modalCart')) || []
}

function changeCount(product, action) {
  let index = modalCart.value.findIndex(item => item.id === product.id)
  if (index >= 0) {
    if (action === 'inc') {
      if (cart.value[index].count < 10) {
        cart.value[index].count++
        modalCart.value[index].count++
      }
    } else if (action === 'dec') {
      if (cart.value[index].count > 1) {
        cart.value[index].count--
        modalCart.value[index].count--
      } else {
        deleteFromCart(product)
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart.value))
  localStorage.setItem('modalCart', JSON.stringify(modalCart.value))

  updateCart();
}

function deleteFromCart(product) {
  let index = modalCart.value.findIndex(item => item.id === product.id)
  cart.value.splice(index, 1)
  modalCart.value.splice(index, 1)

  localStorage.setItem('cart', JSON.stringify(cart.value))
  localStorage.setItem('modalCart', JSON.stringify(modalCart.value))
}

export { cart, modalCart, isModalCartOpen, updateCart, addToCart, changeCount, deleteFromCart }