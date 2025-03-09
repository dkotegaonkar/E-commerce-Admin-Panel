import React, { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../context/productStore";
import { SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const sortReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE_ASC":
      return [...state].sort((a, b) => a.price - b.price);
    case "SORT_BY_PRICE_DESC":
      return [...state].sort((a, b) => b.price - a.price);
    case "SORT_BY_RATING":
      return [...state].sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return state;
  }
};

const SortedProducts = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sortBy");
  const order = queryParams.get("order");

  const [sortedProducts, dispatch] = useReducer(sortReducer, products);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  useEffect(() => {
    if (sortBy) {
      if (sortBy === "price" && order === "asc") {
        dispatch({ type: "SORT_BY_PRICE_ASC" });
      } else if (sortBy === "price" && order === "desc") {
        dispatch({ type: "SORT_BY_PRICE_DESC" });
      } else if (sortBy === "rating") {
        dispatch({ type: "SORT_BY_RATING" });
      }
    }
  }, [sortBy, order, products]);

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        {sortedProducts.map((item) => (
          <Box key={item.id} p={1} boxShadow="md" borderRadius="md" bg="black">
            <ProductCard product={item} />
          </Box>
        ))}
      </SimpleGrid>

  );
};

export default SortedProducts;

