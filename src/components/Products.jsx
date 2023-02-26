import './products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }
  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <div>
                <strong> {product.title} </strong> <strong> - $ {product.price} </strong>
              </div>

              <div>
                <button
                  id={`button-cart-${product.id}`}
                  aria-label={`button-cart-${product.id}`}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }}
                  style={{
                    backgroundColor: isProductInCart ? '#f00' : '#0099FF'
                  }}
                >
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}

      </ul>
    </main>
  )
}
