import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import Rating from "../components/ui/ratings";
import axios from "axios";
import ProductForm from "./ProductForm";
import useProductStore from "../context/productStore";

const ProductCard = ({ product, fetchProducts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteProduct } = useProductStore(); 

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${product.id}`);
      

      deleteProduct(product.id);
      
      toaster.create({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Error deleting product",
        description: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      {isEditing ? (
        <ProductForm
          existingProduct={product}
          onClose={() => setIsEditing(false)}
          fetchProducts={fetchProducts}
        />
      ) : (
        <Card.Root key={product.id} maxW="xs" overflow="hidden">
          <Image
            src={product.image}
            alt={product.title}
            objectFit="cover"
            boxSize="80px"
            width="100%"
            height="200px"
          />
          <Card.Body gap="2">
            <Card.Title
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              height="25px"
            >
              <Link
                to={`/product/${product.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  transition:
                    "color 0.3s ease-in-out, text-decoration 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "blue";
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "inherit";
                  e.target.style.textDecoration = "none";
                }}
              >
                {product.title}
              </Link>
            </Card.Title>
            <Card.Description>
              <Text
                fontSize="sm"
                overflow="hidden"
                display="-webkit-box"
                sx={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "4",
                }}
                height="60px"
              >
                {product.description}
              </Text>
            </Card.Description>
            <Rating defaultValue={product.rating.rate} size="xs" />

            <Text
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
            >
              ${product.price}
            </Text>
          </Card.Body>
          <Card.Footer flexDirection="column" gap="2">
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="solid" size="xs">
                Buy now
              </Button>
              <Button variant="ghost" size="xs">
                Add to cart
              </Button>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setIsEditing(true)}
              >
                Update
              </Button>
              <Button
                variant="solid"
                size="xs"
                colorScheme="red"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </Card.Footer>
        </Card.Root>
      )}
    </>
  );
};

export default ProductCard;
