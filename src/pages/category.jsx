import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Text,
  Spinner,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import Rating from "../components/ui/ratings";
import useProductStore from "../context/productStore";


const Category = () => {
    const { category } = useParams();
    const products = useProductStore((state) => state.products); 
    const data = products.filter((item) => item.category === category);
    if (!data.length) {
      return <Spinner />;
    }
  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} gap={4}>
        {data.map((item) => (
          <Box key={item.id} p={1} boxShadow="md" borderRadius="md" bg="black">
            <Card.Root key={item.id} maxW="xs" overflow="hidden">
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                boxSize="80px"
                width="100%"
                height="200px"
              />
              <Card.Body gap="2">
                <Card.Title
                  overflow="hidden"
                  display="-webkit-box"
                  sx={{
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "4",
                    height: "25px",
                  }}
                >
                  <Link
                    to={`/product/${item.id}`}
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
                    {item.title}
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
                    {item.description}
                  </Text>
                </Card.Description>
                <Rating defaultValue={item.rating.rate} size="xs" />

                <Text
                  textStyle="2xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  ${item.price}
                </Text>
              </Card.Body>
              <Card.Footer gap="2">
                <Button variant="solid" size="xs">
                  Buy now
                </Button>
                <Button variant="ghost" size="xs">
                  Add to cart
                </Button>
              </Card.Footer>
            </Card.Root>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Category;
