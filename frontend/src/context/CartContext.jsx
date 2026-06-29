
import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const ex = state.items.find(i => i.id === action.item.id)
      if (ex) return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'REMOVE':  return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'SET_QTY':
      if (action.qty < 1) return { ...state, items: state.items.filter(i => i.id !== action.id) }
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) }
    case 'CLEAR':   return { ...state, items: [] }
    case 'OPEN':    return { ...state, open: true }
    case 'CLOSE':   return { ...state, open: false }
    case 'TOGGLE':  return { ...state, open: !state.open }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false })

  const addItem    = useCallback((item)       => dispatch({ type:'ADD',    item     }), [])
  const removeItem = useCallback((id)         => dispatch({ type:'REMOVE', id       }), [])
  const setQty     = useCallback((id, qty)    => dispatch({ type:'SET_QTY',id, qty  }), [])
  const clearCart  = useCallback(()           => dispatch({ type:'CLEAR'            }), [])
  const openCart   = useCallback(()           => dispatch({ type:'OPEN'             }), [])
  const closeCart  = useCallback(()           => dispatch({ type:'CLOSE'            }), [])
  const toggleCart = useCallback(()           => dispatch({ type:'TOGGLE'           }), [])

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      ...state, totalItems, totalPrice,
      addItem, removeItem, setQty, clearCart, openCart, closeCart, toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside <CartProvider>')
  return ctx
}
