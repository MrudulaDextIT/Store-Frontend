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
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const degreeOptions = [
  { value: '', label: 'Select Degree' },
  { value: 'BA', label: 'B.A' },
  { value: 'BSc', label: 'B.Sc' },
  { value: 'BCom', label: 'B.Com' },
  { value: 'BE', label: 'B.E' },
  { value: 'BTech', label: 'B.Tech' },
  { value: 'MBBS', label: 'MBBS' },
  { value: 'BHMS', label: 'BHMS' },
  { value: 'BAMS', label: 'BAMS' },
  { value: 'MTech', label: 'M.Tech' },
  { value: 'MBA', label: 'MBA' },
  { value: 'MSc', label: 'M.Sc' },
  { value: 'MCom', label: 'M.Com' },
];

const yearOptionsByDegree = {
  BA: ['First Year', 'Second Year', 'Third Year'],
  BSc: ['First Year', 'Second Year', 'Third Year'],
  BCom: ['First Year', 'Second Year', 'Third Year'],
  BE: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
  BTech: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
  MBBS: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
  BHMS: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
  BAMS: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
  MTech: ['First Year', 'Second Year'],
  MBA: ['First Year', 'Second Year'],
  MSc: ['First Year', 'Second Year'],
  MCom: ['First Year', 'Second Year'],
};

const streamOptionsByDegree = {
  BA: ['History', 'Political Science', 'Economics', 'Sociology', 'Psychology', 'English Literature', 'Philosophy'],
  BSc: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'Zoology', 'Botany', 'Biotechnology', 'Environmental Science', 'Agriculture', 'Nursing', 'Microbiology'],
  BCom: ['Accountancy', 'Banking', 'Taxation', 'Finance', 'Marketing', 'E-Commerce', 'Computer Applications', 'Business Administration', 'Economics', 'Statistics'],
  BE: ['Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics and Communication', 'Chemical Engineering', 'Information Technology'],
  BTech: ['Information Technology', 'Electronics', 'Biotechnology', 'Computer Science and Engineering', 'Artificial Intelligence', 'Data Science', 'Mechanical Engineering'],
  MBBS: ['General Medicine', 'Surgery', 'Pediatrics', 'Gynecology', 'Orthopedics'],
  BHMS: ['Homeopathy'],
  BAMS: ['Ayurveda'],
  MTech: ['Computer Science and Engineering', 'VLSI Design', 'Power Systems', 'Thermal Engineering', 'Structural Engineering'],
  MBA: ['Finance', 'Marketing', 'Human Resources', 'Operations', 'International Business', 'Information Technology'],
  MSc: ['Mathematics', 'Physics', 'Biotechnology', 'Chemistry', 'Zoology', 'Botany', 'Environmental Science'],
  MCom: ['Finance', 'Accounting', 'Taxation', 'Economics', 'Business Analytics'],
};

const classOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

const StudentSignup = () => {
  const [studentType, setStudentType] = useState('college');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid phone number').required('Phone number is required'),
    birthDate: Yup.string().required('Birth date is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    ...(studentType === 'college'
      ? {
          college: Yup.string().required('College name is required'),
          degree: Yup.string().required('Degree is required'),
          stream: Yup.string().required('Stream is required'),
          year: Yup.string().required('Year is required'),
        }
      : {
          schoolName: Yup.string().required('School name is required'),
          class: Yup.string().required('Class is required'),
        }),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      college: '',
      schoolName: '',
      class: '',
      degree: '',
      stream: '',
      year: '',
      birthDate: '',
      password: '',
      status: 'Pending',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:4000/signup_stu', {
          ...values,
          studentType,
        });
        if (res.status === 201) {
          toast.success('Signup Successful!');
          navigate('/student/login');
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || 'Something went wrong!');
      }
    },
  });

  const availableYears = yearOptionsByDegree[values.degree] || [];
  const availableStreams = streamOptionsByDegree[values.degree] || [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d0e7ff, #f9fcff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 5,
      }}
    >
      <Paper elevation={12} sx={{ p: isMobile ? 3 : 5, width: '100%', maxWidth: 700, borderRadius: 4 }}>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
            <SchoolIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant={isMobile ? 'h5' : 'h4'} align="center" fontWeight="bold" gutterBottom>
          Student Registration
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Student Type</InputLabel>
          <Select
            value={studentType}
            label="Student Type"
            onChange={(e) => {
              setStudentType(e.target.value);
              resetForm();
            }}
          >
            <MenuItem value="college">College Student</MenuItem>
            <MenuItem value="school">School Student</MenuItem>
          </Select>
        </FormControl>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Common Fields */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                label="Phone Number"
                name="phone"
                fullWidth
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 10 }}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* College or School Fields */}
            {studentType === 'college' ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="College Name"
                    name="college"
                    fullWidth
                    value={values.college}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.college && Boolean(errors.college)}
                    helperText={touched.college && errors.college}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
<Grid item xs={12} sm={4}>
  <FormControl fullWidth>
    <InputLabel>Degree</InputLabel>
    <Select
      name="degree"
      value={values.degree}
      onChange={(e) => {
        handleChange(e);
        setFieldValue('year', '');
        setFieldValue('stream', '');
      }}
      onBlur={handleBlur}
      error={touched.degree && Boolean(errors.degree)}
    >
      {degreeOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={4}>
  <FormControl fullWidth>
    <InputLabel>Year</InputLabel>
    <Select
      name="year"
      value={values.year}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.year && Boolean(errors.year)}
    >
      {availableYears.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

<Grid item xs={12} sm={4}>
  <FormControl fullWidth>
    <InputLabel>Stream</InputLabel>
    <Select
      name="stream"
      value={values.stream}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.stream && Boolean(errors.stream)}
    >
      {availableStreams.map((stream) => (
        <MenuItem key={stream} value={stream}>
          {stream}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>




              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="School Name"
                    name="schoolName"
                    fullWidth
                    value={values.schoolName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.schoolName && Boolean(errors.schoolName)}
                    helperText={touched.schoolName && errors.schoolName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeWorkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Class"
                    name="class"
                    fullWidth
                    value={values.class}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.class && Boolean(errors.class)}
                    helperText={touched.class && errors.class}
                  >
                    {classOptions.map((cls) => (
                      <MenuItem key={cls} value={cls}>
                        {cls}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            )}

            {/* Common */}
            <Grid item xs={12}>
              <TextField
                label="Birth Date"
                name="birthDate"
                type="date"
                fullWidth
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.birthDate && Boolean(errors.birthDate)}
                helperText={touched.birthDate && errors.birthDate}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon />
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
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentSignup;
