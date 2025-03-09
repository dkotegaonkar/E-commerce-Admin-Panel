import { Button, Card, Input, Stack, Alert } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useMemo } from "react";
import useAuthStore from "../context/useAuthStore";

const Login = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        data
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      if (data.token) {
        setToken(data.token);
        navigate("/products");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error.response?.data || error.message);
    },
  });

  const alert = useMemo(() => {
    if (mutation.isError) {
      return {
        status: "error",
        message: "Invalid credentials. Please try again.",
      };
    }
    if (mutation.isSuccess) {
      return { status: "success", message: "Login successful!" };
    }
    return null;
  }, [mutation.isError, mutation.isSuccess]);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
        <Card.Description>
          Fill in the form below to sign in to FakeStore
        </Card.Description>
      </Card.Header>
      {alert && (
        <Alert.Root status={alert.status} size="lg">
          <Alert.Indicator />
          <Alert.Title>{alert.message}</Alert.Title>
        </Alert.Root>
      )}

      <form onSubmit={onSubmit}>
        <Card.Body>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Field
              label="Username"
              invalid={!!errors.username}
              errorText={errors.username?.message}
            >
              <Input
                {...register("username", { required: "Username is required" })}
              />
            </Field>

            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <PasswordInput
                {...register("password", { required: "Password is required" })}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button type="submit">
            {mutation.isPending ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </Card.Footer>
      </form>
    </Card.Root>
  );
};

export default Login;
