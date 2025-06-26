import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockResetIcon from '@mui/icons-material/LockReset';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));

    if (!storedStudent?.email) {
      navigate('/student/login');
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/get-student/${storedStudent.email}`);
        setStudentData(res.data);
        localStorage.setItem('student', JSON.stringify(res.data)); // Optional: refresh localStorage
      } catch (error) {
        console.error('Failed to fetch student details:', error);
      }
    };

    fetchStudentDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/student/login');
  };

  if (!studentData) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading student data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', width: '100vw' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#000', width: '100%' }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: '1300px',
            p: { xs: 8, md: 10 },
            borderRadius: 2,
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: 3,
          }}
        >
          {/* Heading */}
          <Typography variant={isLaptop ? 'h4' : 'h5'} fontWeight="bold" mb={2} textAlign="center">
            Book Ordering Dashboard
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, textAlign: 'center' }}
          >
            Browse and order textbooks, reference books, and academic materials tailored to your branch and standard.
          </Typography>

          {/* Student Info */}
          <Box
            sx={{
              width: '100%',
              bgcolor: '#e0f7fa',
              p: 3,
              borderRadius: 2,
              mb: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Welcome, {studentData.name}
            </Typography>
            <Typography variant="body1">Email: {studentData.email}</Typography>
            
            {!studentData.schoolName ? (
              <>
                <Typography variant="body1">Degree: {studentData.degree}</Typography>
                <Typography variant="body1">Stream: {studentData.stream}</Typography>
                <Typography variant="body1">Year: {studentData.year}</Typography>
              </>
            ) : (
              <Typography variant="body1">Class: {studentData.class}</Typography>
            )}
          </Box>

          {/* Cards */}
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            {/* Order Books */}
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card
                onClick={() => navigate('/student/order-books')}
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: '#e3f2fd',
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                }}
              >
                <LibraryBooksIcon fontSize="large" color="primary" />
                <Typography variant="h6" mt={2}>
                  Order Books
                </Typography>
                <Typography variant="body2" mt={1}>
                  Select and place your study material orders.
                </Typography>
              </Card>
            </Grid>

            {/* My Orders */}
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card
                onClick={() => navigate('/student/my-orders')}
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: '#f3e5f5',
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                }}
              >
                <ReceiptLongIcon fontSize="large" color="secondary" />
                <Typography variant="h6" mt={2}>
                  My Orders
                </Typography>
                <Typography variant="body2" mt={1}>
                  View status of your placed book orders.
                </Typography>
              </Card>
            </Grid>

            {/* Change Password */}
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Card
                onClick={() => navigate('/student/change-password')}
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: '#fff3e0',
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                }}
              >
                <LockResetIcon fontSize="large" sx={{ color: '#ff9800' }} />
                <Typography variant="h6" mt={2}>
                  Change Password
                </Typography>
                <Typography variant="body2" mt={1}>
                  Update your account password securely.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
