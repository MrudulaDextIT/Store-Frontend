import React from "react";
import { useFormik } from "formik";
import { signupSchema } from "../validation/validationSchema";
import { Paper, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      try {
        const res = await axios.post("http://localhost:4000/signup", values);

        if (res.status === 201) {
          toast.success("Signup Successful!");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "Something went wrong!");
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, bgcolor: 'white' }}>
        <Typography variant="h5" align="center" mb={2}>Signup</Typography>
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Signup</Button>
          <Typography onClick={() => navigate("/")} sx={{ mt: 2, cursor: "pointer", color: "blue" }} align="center">
            Already have an account? Login
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
