import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCartById } from "./cartApi";
import { useParams } from "react-router-dom";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";

const CartDetails = () => {
  const { id } = useParams();

  const { data: cart, error, isLoading } = useQuery({
    queryKey: ["cart", id],
    queryFn: () => fetchCartById(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Error fetching cart details</p>;

  return (
    <Box p={4} boxShadow="md" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" color="black">Cart ID: {cart.id}</Text>
      <Text color="black">User ID: {cart.userId}</Text>
      <Text color="black">Date: {cart.date}</Text>

      <VStack mt={4} align="start">
        <Text fontWeight="bold" color="black">Products:</Text>
        {cart.products.map((product) => (
          <Text key={product.productId} color="black">
            Product ID: {product.productId}, Quantity: {product.quantity}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default CartDetails;