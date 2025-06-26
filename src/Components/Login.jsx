import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../validation/validationSchema";
import { Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:4000/login", values);

        if (res.status === 200) {
          toast.success("Login Successful!");

          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/home");
        }
       
        
      } catch (error) {
        toast.error(error.response?.data?.error || "Something went wrong 1234!");
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, bgcolor: 'white' }}>
        <Typography variant="h5" align="center" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          <Typography onClick={() => navigate("/signup")} sx={{ mt: 2, cursor: "pointer", color: "blue" }} align="center">
            Don't have an account? Signup
          </Typography>
          <Typography onClick={() => navigate("/forgot-password")} sx={{ mt: 1, cursor: "pointer", color: "blue" }} align="center">
            Forgot Password?
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
