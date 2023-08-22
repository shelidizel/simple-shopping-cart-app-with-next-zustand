import { create } from 'zustand'
import { Product } from '../types'

// Define interface of cart state
interface State {
    cart : Product[]
    totalItems : number
    totalPrice : number
}

//define the interface of actions that can be perfomed in a cart
interface Actions {
    addToCart : (Item : Product) => void
    removeFrmCart : (Item : Product) => void
}

//initialize some default state
const INITIAL_STATE : State = {
    cart : [],
    totalItems : 0,
    totalPrice : 0

}

export const useCartStore = create<State & Actions> ((set, get) => ({
    cart : INITIAL_STATE.cart,
    totalItems : INITIAL_STATE.totalItems,
    totalPrice : INITIAL_STATE.totalPrice,
    addToCart : (product : Product) => {
        const cart = get().cart
        const cartItem = cart.find(item => item.id === product.id)

    //if the item is already in the cart increase quantity by 1
    if(cartItem) {
        const updatedCart = cart.map(item => 
            item.id === product.id
            ? {...item, quantity : (item.quantity as number) + 1} : 
            item)
    set(state => ({
        cart : updatedCart,
        totalItems : state.totalItems + 1,
        totalPrice : state.totalPrice + product.price
    }))
    }else {
        const updatedCart = [...cart, { ...product, quantity : 1}]

        set(state => ({
            cart : updatedCart,
            totalItems : state.totalItems + 1,
            totalPrice : state.totalPrice + product.price
        }))
    }
    
},
removeFrmCart : (product : Product) => {
    set(state => ({
        cart : state.cart.filter(item => item.id !== product.id),
        totalItems : state.totalItems - 1,
        totalPrice : state.totalPrice - product.price
    }))
}
}
))

