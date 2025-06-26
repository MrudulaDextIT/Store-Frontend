import {Typography, Button,Box,Link as MuiLink, CardContent,useTheme,useMediaQuery, } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { motion } from "framer-motion";
  import { Card } from "@mui/material";
  import BusinessIcon from '@mui/icons-material/Business';
  import SchoolIcon from '@mui/icons-material/School';
  
  const MotionCard = motion(Card);
  const RoleSelection = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          bgcolor: '#f0f0f0',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: 3,
        }}
      >
        {/* Admin Card */}
        <MotionCard
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            width: { xs: '90%', sm: 360, md: 400 },
            height: 480,
            p: 3,
            backgroundColor: '#e3f2fd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ textAlign: 'center', color: 'black' }}>
            <BusinessIcon sx={{ fontSize: 60, color: '#1976d2' }} />
            <Typography variant="h5" fontWeight="bold" mt={2} color="#1976d2">
              ADMIN
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              For <em>Companies</em>
            </Typography>
            <Typography mt={2} mb={4}>
              Manage branches, products, and orders.
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/admin/login')}
              sx={{ mb: 2 }}
            >
              LOGIN
            </Button>
            <Typography>
              Don’t have an account?{' '}
              <MuiLink component="button" onClick={() => navigate('/admin/signup')}>
                Sign up.
              </MuiLink>
            </Typography>
          </CardContent>
        </MotionCard>
  
        {/* Student Card */}
        <MotionCard
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{
            width: { xs: '90%', sm: 360, md: 400 },
            height: 480,
            p: 3,
            backgroundColor: '#e8f5e9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ textAlign: 'center', color: 'black' }}>
            <SchoolIcon sx={{ fontSize: 60, color: '#2e7d32' }} />
            <Typography variant="h5" fontWeight="bold" mt={2} color="#2e7d32">
              STUDENT
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={1}>
              For <em>BUY BOOKS</em>
            </Typography>
            <Typography mt={2} mb={4}>
              Track orders, update profile, and more.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate('/student/login')}
              sx={{ mb: 2 }}
            >
              LOGIN
            </Button>
            <Typography>
              Don’t have an account?{' '}
              <MuiLink component="button" onClick={() => navigate('/student/signup')}>
                Sign up.
              </MuiLink>
            </Typography>
          </CardContent>
        </MotionCard>
      </Box>
    );
  };
  
  export default RoleSelection;
  