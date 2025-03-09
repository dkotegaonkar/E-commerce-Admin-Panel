import React, { useEffect, useState } from "react";
import {
  VStack,
  Input,
  Text,
  Spinner,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import useProductStore from "../context/productStore";
import ProductCard from "./ProductCard";

const Products = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    setDelayedLoading(true); // Start delay
    setTimeout(() => {
      fetchProducts();
      setDelayedLoading(false); // Stop delay after 1.5 seconds
    }, 1500);
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      <VStack spacing={4}>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
        />
        <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
          {filteredProducts.map((item) => (
            <Box
              key={item.id}
              p={1}
              boxShadow="md"
              borderRadius="md"
              bg="black"
            >
              <ProductCard product={item} fetchProducts={fetchProducts} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default Products;
