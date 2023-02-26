import { createContext, useReducer } from 'react'
import { cartReducer, cartInitialState, CART_ACTIONS_TYPES } from '../reducers/cart'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS_TYPES.ADD_TO_CART,
      payload: product
    })
  }

  const removeFromCart = (product) => {
    dispatch({
      type: CART_ACTIONS_TYPES.REMOVE_FROM_CART,
      payload: product
    })
  }

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS_TYPES.CLEAR_CART
    })
  }

  const decreaseQuantity = (product) => {
    dispatch({
      type: CART_ACTIONS_TYPES.DECREASE_QUANTITY,
      payload: product
    })
  }

  return { state, addToCart, removeFromCart, clearCart, decreaseQuantity }
}

// 2. Create a provider
export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart, decreaseQuantity } = useCartReducer()

  return (
    <CartContext.Provider value={
        {
          cart: state,
          addToCart,
          removeFromCart,
          clearCart,
          decreaseQuantity
        }
}
    >
      {children}
    </CartContext.Provider>
  )
}
