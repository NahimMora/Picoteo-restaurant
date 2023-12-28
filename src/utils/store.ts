import { ActionType, CartType } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
}

export const useCartStore = create(persist<CartType & ActionType>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart(item) {

        const products = get().products
        const productInState = products.find(product => product.id === item.id)

        if(productInState){
          const updatedProducts = products.map(product => product.id === productInState.id ? {
            ...item,
            quality: item.quantity + product.quantity,
            price: item.price + product.price
          } : 
            item
          )
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price
          }))
        } else {   
          set((state) => ({
              products: [...state.products, item],
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price
          }))
        }
    },
    removeToCart(item) {
        set((state) => ({
            products: state.products.filter(product=>product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price
        }))
    },
    clearToCart() {
      set(() => ({
          products: [],
          totalItems: 0,
          totalPrice: 0
      }))
  }
}),{name:'cart', skipHydration:true}))