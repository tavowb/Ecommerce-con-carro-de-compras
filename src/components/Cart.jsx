import { useEffect, useId, useState } from 'react'
import { useCart } from '../hooks/useCart'
import { CartIcon, ClearCartIcon } from './Icons'
import './Cart.css'
import Swal from 'sweetalert2'

export function Cart () {
  const cartCheckBoxId = useId()
  const { cart, clearCart, addToCart, decreaseQuantity } = useCart()
  const [total, setTotal] = useState(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))

  useEffect(() => {
    setTotal(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))
  }, [cart])

  function CartItem ({ thumbnail, title, price, quantity, addToCart, decreaseQuantity }) {
    return (
      <li>
        <img src={thumbnail} alt={title} />
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
    if (cart.length === 0) {
      Swal.fire({
        icon: 'question',
        title: 'Oops...',
        text: 'No hay productos en el carrito!'
      })
      return
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
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
        <div className='cart-content'>
          <h2>Mi Carrito</h2>
          <hr />
          <ul>
            {
              cart.length === 0
                ? <li className='empty-cart'>No hay productos en el carrito</li>
                : cart.map(product => (
                  <CartItem
                    key={product.id}
                    addToCart={() => addToCart(product)}
                    decreaseQuantity={() => decreaseQuantity(product)}
                    {...product}
                  />
                ))
            }
          </ul>
          <hr />
          <div className='total'>
            <strong>  - Total: ${total} </strong>
          </div>

          <footer>
            <button className='BuyCart' onClick={handleBuyCart}><CartIcon /> </button>
            <button className='ClearCart' onClick={clearCart}> <ClearCartIcon /> </button>
          </footer>
        </div>
      </aside>
    </>
  )
}
