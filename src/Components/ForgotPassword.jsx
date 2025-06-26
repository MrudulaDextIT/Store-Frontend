import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:4000/forgot-password", {
        email,
        newPassword,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f0f2f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400, bgcolor: 'white' }}>
        <Typography variant="h5" align="center" mb={2}>Forgot Password</Typography>
        <form onSubmit={handleReset}>
          <TextField
            label="Enter Registered Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Enter New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
          <Typography onClick={() => navigate("/")} sx={{ mt: 2, cursor: "pointer", color: "blue" }} align="center">
            Back to Login
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
