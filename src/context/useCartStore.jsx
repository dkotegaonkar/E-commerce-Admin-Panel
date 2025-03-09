import { create } from "zustand";



const useCartStore = create((set) => ({
  cart: {},
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart[product.id] || { ...product, quantity: 0 };
      return {
        cart: {
          ...state.cart,
          [product.id]: { ...existing, quantity: existing.quantity + 1 },
        },
      };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = { ...state.cart };
      if (updatedCart[productId]) {
        updatedCart[productId].quantity -= 1;
        if (updatedCart[productId].quantity <= 0) {
          delete updatedCart[productId];
        }
      }
      return { cart: updatedCart };
    }),
}));
export default useCartStore;