import { useContext } from 'react'
import { CartContext } from '../context/cart'

export const useCart = () => {
  const cart = useContext(CartContext)

  // Buena practica es revisar si el contexto esta definido
  if (cart === undefined) {
    throw new Error('useCart must be used within a CartProvider')
    // estas usando un customHook en un componente que no esta dentro del provider
  }

  return cart
}
