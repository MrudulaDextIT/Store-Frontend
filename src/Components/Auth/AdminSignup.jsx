import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/signup_admin', formData);

      toast.success(response.data.message);
      
      // Clear the form after successful signup
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    } catch (error) {
      console.error('Signup Error:', error);
      toast.error(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        background: '#f5f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={10} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#1976d2' }}>
            <PersonAddAlt1Icon />
          </Avatar>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1 }}
          >
            Signup
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'gray' }}>
          Already have an account? <a href="/admin/login">Login</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminSignup;
