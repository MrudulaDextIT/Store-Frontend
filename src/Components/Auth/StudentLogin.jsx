
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Grid,
  InputAdornment,
  Link,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!email || !password) {
    alert('Please fill in both fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/login_stu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === 'Student not approved by admin') {
        alert('Your account is pending approval by the admin.');
      } else {
        alert(data.error || 'Login failed.');
      }
      return;
    }

    
  alert('Login successful!');

  // Store student email in localStorage
  localStorage.setItem('student', JSON.stringify({ email }));




    // You can store the user in localStorage if needed
    navigate('/student');
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login.');
  }
};

  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #d0e7ff, #f9fcff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{ p: 5, width: 500, maxWidth: '95%', borderRadius: 4 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
            <LockIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Student Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1rem',
              background: '#1976d2',
              ':hover': { background: '#155ca0' },
            }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: '#666' }}>
          Don’t have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/student/signup')}
            sx={{ color: '#1976d2', fontWeight: 500 }}
          >
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentLogin;


