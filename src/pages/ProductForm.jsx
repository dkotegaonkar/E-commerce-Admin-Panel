import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import axios from "axios";
import useProductStore from "../context/productStore";

const ProductForm = ({ existingProduct, onClose, fetchProducts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: existingProduct || {
      title: "",
      price: "",
      description: "",
      image: "",
    },
  });

  const { updateProduct } = useProductStore();

  const onSubmit = async (data) => {
    try {
      if (existingProduct) {
        const response = await axios.put(
          `https://fakestoreapi.com/products/${existingProduct.id}`,
          data
        );

        updateProduct({
          ...existingProduct, 
          ...response.data, 
        }); 

        toaster.create({
          title: "Product updated",
          description: "The product details have been updated successfully.",
          type: "success",
        });
      } else {
        const response = await axios.post(
          "https://fakestoreapi.com/products",
          data
        );
        toaster.create({
          title: "Product added",
          description: "A new product has been added successfully.",
          type: "success",
          duration: 3000,
        });

        fetchProducts(); 
      }
      onClose();
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
      <Input
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && (
        <span style={{ color: "red" }}>{errors.title.message}</span>
      )}

      <Input
        placeholder="Price"
        type="number"
        {...register("price", { required: "Price is required", min: 0.1 })}
      />
      {errors.price && (
        <span style={{ color: "red" }}>{errors.price.message}</span>
      )}

      <Input placeholder="Description" {...register("description")} />

      <Input placeholder="Image URL" {...register("image")} />

      <Button type="submit" colorScheme="blue">
        {existingProduct ? "Update Product" : "Add Product"}
      </Button>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
    </VStack>
  );
};

export default ProductForm;
