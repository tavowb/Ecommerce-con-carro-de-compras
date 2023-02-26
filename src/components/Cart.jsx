import { useEffect, useId, useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartIcon, ClearCartIcon } from './Icons'
import './Cart.css'
import Swal from 'sweetalert2'

export function Cart () {
  const cartCheckBoxId = useId()
  const divsw = useId()
  const { cart, clearCart, addToCart, decreaseQuantity } = useCart()
  const [total, setTotal] = useState(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))

  useEffect(() => {
    setTotal(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))
  }, [cart])

  function CartItem ({ thumbnail, title, price, quantity, addToCart, decreaseQuantity }) {
    return (
      <li>
        <img loading='lazy' src={thumbnail} alt={title} />
        <div>
          <strong> {title}</strong> - ${price}
        </div>
        <footer>
          <button onClick={decreaseQuantity}>-</button>
          <small>
            Qty: {quantity}
          </small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    )
  }

  function handleBuyCart () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      html: `
      <h2>Carrito de Compras</h2>
      <hr>
      
      <div style="text-align: start;" > 
      ${cart.map(product => (
        `
        <li>
        <strong> ${product.title} : </strong>
        <small> ${product.price} * ${product.quantity} = </small>
        <strong>$${product.price * product.quantity}</strong> 
        </li>
        `))} 
        
        <hr>
        </div>

        <div style="color: red;">
        <strong> Total: $${total} </strong>
        </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Si, comprar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'compra realizada!',
          'Gracias por su compra!',
          'success'
        )
        clearCart()
      }
    })
  }

  return (
    <>

      <label htmlFor={cartCheckBoxId} className='cart-button'><CartIcon /></label>

      <input id={cartCheckBoxId} type='checkbox' hidden />

      <aside className='cart'>
        <div id={divsw} className='cart-content'>
          <h2>Mi Carrito</h2>
          <hr />
          <ul>
            {cart.map(product => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                decreaseQuantity={() => decreaseQuantity(product)}
                {...product}
              />
            ))}
          </ul>
          <hr />
          <div className='total'>
            <strong>  - Total: ${total} </strong>
          </div>

          <footer>
            <button className='BuyCart' onClick={handleBuyCart}><CartIcon /> </button>
            <strong>|</strong>
            <button className='ClearCart' onClick={clearCart}> <ClearCartIcon /> </button>
          </footer>

        </div>

      </aside>

    </>
  )
}
