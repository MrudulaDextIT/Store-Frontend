import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Tooltip,
  Paper,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'; // your logo path

// Simulated personal orders fetched from backend
const personalOrders = [
  {
    id: 'ORD1024',
    bookTitle: 'Physics - Class 12',
    orderDate: '2025-04-15',
    status: 'Delivered',
  },
  {
    id: 'ORD1025',
    bookTitle: 'Chemistry - Class 12',
    orderDate: '2025-04-17',
    status: 'Processing',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Processing':
      return 'info';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Here you would typically fetch the student's orders from backend
    // For now, using dummy personal data
    setOrders(personalOrders);
  }, []);

  const handleLogout = () => {
    navigate('/student/login');
  };

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#000', boxShadow: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={{ height: 35 }} />
          </Box>

          <Box>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} sx={{ color: '#fff' }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            My Orders
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Here you can track the status of your book orders.
          </Typography>

          {orders.length > 0 ? (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {order.bookTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Order ID: {order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        Order Date: {order.orderDate}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No orders found.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyOrders;
