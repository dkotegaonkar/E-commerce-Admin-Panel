import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Rating,
  Divider,
  Stack,
} from "@mui/material";
import useProductStore from "../context/productStore";


const ProductDetails = () => {
    const { id } = useParams();
    const data = useProductStore((state) => state.getProductById(id));
  
    if (!data) return <CircularProgress />;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 500, p: 2 }}>
        <CardMedia
          component="img"
          height="120"
          image={data.image}
          alt={data.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {data.category}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            {data.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="medium">
            Price: ${data.price}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <Rating value={data.rating.rate} precision={0.1} readOnly />
            <Typography variant="body2">
              ({data.rating.count} reviews)
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
