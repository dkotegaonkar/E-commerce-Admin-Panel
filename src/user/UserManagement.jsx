import React, { useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUserStore from "../context/userStore";

const fetchUsers = async () => {
  const response = await axios.get("https://fakestoreapi.com/users");
  return response.data;
};

export default function UserManagement() {
  const { users, setUsers, addUser, updateUser, removeUser } = useUserStore();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    onSuccess: setUsers,
  });

  const addMutation = useMutation({
    mutationFn: (newUser) =>
      axios.post("https://fakestoreapi.com/users", newUser),
    onSuccess: (res) => {
      addUser(res.data);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (user) =>
      axios.put(`https://fakestoreapi.com/users/${user.id}`, user),
    onSuccess: (res) => {
      updateUser(res.data); 
      queryClient.setQueryData(["users"], (oldData) =>
        oldData.map((u) => (u.id === res.data.id ? res.data : u))
      );
      setOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`https://fakestoreapi.com/users/${id}`),
    onSuccess: (_, id) => {
      removeUser(id); 
      queryClient.setQueryData(["users"], (oldData) =>
        oldData.filter((u) => u.id !== id)
      );
    },
  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (editUser) {
      updateMutation.mutate({ ...editUser, ...data });
    } else {
      addMutation.mutate(data);
    }
    setOpen(false);
    reset();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const filteredUsers = data
    ? data.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  if (isLoading) return <h2>Loading users...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />


      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditUser(null);
          setOpen(true);
        }}
      >
        Add User
      </Button>

      <Table style={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(filteredUsers.length ? filteredUsers : data)?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              fullWidth
              margin="dense"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="dense"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {editUser ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
