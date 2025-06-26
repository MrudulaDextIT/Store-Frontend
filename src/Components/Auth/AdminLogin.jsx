import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✨ Import axios

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/login_admin', {
        email: formData.email,
        password: formData.password,
      });

      toast.success('Login successful!');

      // You can store admin info if needed (optional)
      // localStorage.setItem('adminData', JSON.stringify(res.data.admin));

      navigate('/admin/dashboard'); // Redirect to Admin Dashboard after login ✅

    } catch (err) {
      console.error('Login Error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Login failed, please try again');
      }
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
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.remember}
                onChange={handleChange}
                name="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1 }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/admin/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Signup
          </Link>
        </Typography>

        <Typography variant="body2" align="center" sx={{ mt: 2, color: 'gray' }}>
          &copy; {new Date().getFullYear()} Admin Panel
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
