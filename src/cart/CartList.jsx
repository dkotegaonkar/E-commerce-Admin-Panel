import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCarts, deleteCart } from "./cartApi";
import { Table, Spinner, Button, TableCell } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartList = () => {


  const {
    data: carts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
  });

  const mutation = useMutation({
    mutationFn: deleteCart,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Error fetching carts</p>;

  
  const orderTotals = carts.map((cart) => {
    return cart.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  });

  const totalOrders = orderTotals.reduce((acc, curr) => acc + curr, 0);
  console.log(totalOrders);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error fetching carts</p>;

  return (
    <Table.Root variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>User ID</Table.ColumnHeader>
          <Table.ColumnHeader>Date yyyy/mm//dd</Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {carts.map((cart) => (
          <Table.Row key={cart.id}>
            <Table.Cell color="black">{cart.id}</Table.Cell>
            <Table.Cell color="black"> {cart.userId}</Table.Cell>
            <Table.Cell color="black">{cart.date}</Table.Cell>
            <Table.Cell>
              <Link to={`/cart/${cart.id}`}>
                <Button colorScheme="blue" size="sm" mr={2}>
                  View
                </Button>
              </Link>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => mutation.mutate(cart.id)}
              >
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell fontWeight="bold" color="black">Total Orders:</Table.Cell>
          <Table.Cell fontWeight="bold" color="black">{totalOrders}</Table.Cell>\
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
};

export default CartList;
