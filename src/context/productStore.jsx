import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    if (get().products.length > 0) return; 
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  getProductById: (id) => get().products.find((product) => product.id === Number(id)),
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  updateProduct: (updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    }));
  },

  addProduct: async (newProductData) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/products", newProductData);
      set((state) => ({
        products: [...state.products, response.data],
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
}));

export default useProductStore;
