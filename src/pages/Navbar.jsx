import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const getCategory = async () => {
  const response = await axios("https://fakestoreapi.com/products/categories");
  return response.data;
};

export default function BasicMenu() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });
  const navigate = useNavigate();

  const [anchorElCategory, setAnchorElCategory] = React.useState(null);
  const [anchorElSort, setAnchorElSort] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);

  const openCategory = Boolean(anchorElCategory);
  const openSort = Boolean(anchorElSort);
  const openCart = Boolean(anchorElCart);

  const handleSort = (sortBy, order) => {
    navigate(`/sorted?sortBy=${sortBy}&order=${order}`);
  };

  const handleCategoryClick = (event) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleSortClick = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCartClick = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };
  const handleCloseSort = () => {
    setAnchorElSort(null);
  };
  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "white",
        zIndex: 1000,
        padding: "1rem",
        display: "flex",
        gap: "1rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Button>
        <Link to={"/products"}>Home</Link>
      </Button>

 
      <Button
        id="category-button"
        aria-controls={openCategory ? "category-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openCategory ? "true" : undefined}
        onClick={handleCategoryClick}
      >
        Categories
      </Button>

 
      <Button
        id="sort-button"
        aria-controls={openSort ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openSort ? "true" : undefined}
        onClick={handleSortClick}
      >
        SORT BY
      </Button>


      <Button
        id="cart-button"
        aria-controls={openCart ? "cart-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openCart ? "true" : undefined}
        onClick={handleCartClick}
      >
        CART
      </Button>

      <Button><Link to={'/user'}style={{ textDecoration: "none", color: "inherit" }}>User</Link></Button>

      <Menu
        id="category-menu"
        anchorEl={anchorElCategory}
        open={openCategory}
        onClose={handleCloseCategory}
        MenuListProps={{
          "aria-labelledby": "category-button",
        }}
      >
        {data.map((category) => (
          <MenuItem key={category} onClick={handleCloseCategory}>
            <Link
              to={`/${category}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {category}
            </Link>
          </MenuItem>
        ))}
      </Menu>


      <Menu
        id="sort-menu"
        anchorEl={anchorElSort}
        open={openSort}
        onClose={handleCloseSort}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        <MenuItem onClick={() => handleSort("price", "asc")}>
          Price: Low To High
        </MenuItem>
        <MenuItem onClick={() => handleSort("price", "desc")}>
          Price: High To Low
        </MenuItem>
        <MenuItem onClick={() => handleSort("rating", "desc")}>
          Avg Customer Review
        </MenuItem>
      </Menu>


      <Menu
        id="cart-menu"
        anchorEl={anchorElCart}
        open={openCart}
        onClose={handleCloseCart}
        MenuListProps={{
          "aria-labelledby": "cart-button",
        }}
      >
        <MenuItem onClick={handleCloseCart}>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            View/Edit Cart
          </Link>
        </MenuItem>
        <MenuItem onClick={handleCloseCart}>
          <Link
            to="/cart/add"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Add Cart
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}