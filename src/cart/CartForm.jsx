import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCart, updateCart } from "./cartApi";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CartForm = ({ existingCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: existingCart || {} });

  const [products, setProducts] = useState([]);

  const mutation = useMutation({
    mutationFn: id ? (data) => updateCart(id, data) : addCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      navigate("/");
    },
  });

  const addProduct = () => {
    setProducts([...products, { id: "", title: "", price: "", description: "", category: "", image: "" }]);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  const onSubmit = (data) => {
    const formattedProducts = products.map((product) => ({
      productId: product.id,
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      category: product.category,
      image: product.image,
      quantity: 1,
    }));

    const payload = { ...data, products: formattedProducts };
    mutation.mutate(payload);
  };

  return (
    <Box p={4} boxShadow={3} borderRadius={2} maxWidth={500} mx="auto">
      <Typography variant="h5" gutterBottom>
        {id ? "Update Order" : "Add Order"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          {...register("userId", { required: "User ID is required" })}
          error={!!errors.userId}
          helperText={errors.userId?.message}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register("date", { required: "Date is required" })}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Products
        </Typography>

        {products.map((product, index) => (
          <Box key={index} p={2} border={1} borderRadius={2} mb={2}>
            <TextField
              label="Product ID"
              fullWidth
              margin="normal"
              value={product.id}
              onChange={(e) => handleProductChange(index, "id", e.target.value)}
            />
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={product.title}
              onChange={(e) => handleProductChange(index, "title", e.target.value)}
            />
            <TextField
              label="Price"
              fullWidth
              margin="normal"
              type="number"
              value={product.price}
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={product.description}
              onChange={(e) => handleProductChange(index, "description", e.target.value)}
            />
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={product.category}
              onChange={(e) => handleProductChange(index, "category", e.target.value)}
            />
            <TextField
              label="Image URL"
              fullWidth
              margin="normal"
              value={product.image}
              onChange={(e) => handleProductChange(index, "image", e.target.value)}
            />

            <IconButton color="error" onClick={() => removeProduct(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addProduct}
          fullWidth
        >
          Add Product
        </Button>

        <Button sx={{ mt: 2 }} type="submit" variant="contained" color="primary" fullWidth>
          {id ? "Update Order" : "Add Order"}
        </Button>
      </form>
    </Box>
  );
};

export default CartForm;