import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CardMedia,
  Paper,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

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

const classOptions = [
  '1st', '2nd', '3rd', '4th', '5th', '6th',
  '7th', '8th', '9th', '10th', '11th', '12th'
];
const initialState = {
  name: '',
  price: '',
  quantity: '',
  studentType: 'college',
  degree: '',
  classYear: '',
  stream: '',
  className: '',
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialState);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    console.log("Fetched products:", res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentType') {
      setForm(prev => ({
        ...prev,
        studentType: value,
        ...(value === 'college'
          ? { className: '' }
          : { degree: '', classYear: '', stream: '' })
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const payloadKeys = ['name','price','quantity','studentType','degree','classYear','stream','className'];
    payloadKeys.forEach(k => formData.append(k, form[k] || ''));
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editId) {
        await axios.put(`http://localhost:4000/api/products/${editId}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/products', formData);
      }
      setForm(initialState);
      setImagePreview('');
      setImageFile(null);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      studentType: product.studentType,
      degree: product.degree,
      classYear: product.classYear,
      stream: product.stream,
      className: product.className,
    });
    setImagePreview(product.image);
    setEditId(product._id);
  };

  const handleSelect = (i) => {
    setSelectedIndexes(prev =>
      prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i]
    );
  };

  const handleDeleteSelected = async () => {
    const ids = selectedIndexes.map(i => products[i]._id);
    await Promise.all(ids.map(id => axios.delete(`http://localhost:4000/api/products/${id}`)));
    setSelectedIndexes([]);
    fetchProducts();
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#fff', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Product Management
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {/* PRODUCT FORM FIELDS */}
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Product Name" name="name" value={form.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Image
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </Button>
            {imagePreview && (
              <Box mt={1}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4 }} />
              </Box>
            )}
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField fullWidth label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField fullWidth label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Student Type</InputLabel>
              <Select name="studentType" value={form.studentType} onChange={handleChange} label="Student Type">
                <MenuItem value="college">College</MenuItem>
                <MenuItem value="school">School</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {form.studentType === 'college' ? (
            <>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Degree</InputLabel>
                  <Select name="degree" value={form.degree} onChange={handleChange} label="Degree">
                    {degreeOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select name="classYear" value={form.classYear} onChange={handleChange} disabled={!form.degree} label="Year">
                    {(yearOptionsByDegree[form.degree] || []).map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Stream</InputLabel>
                  <Select name="stream" value={form.stream} onChange={handleChange} disabled={!form.degree} label="Stream">
                    {(streamOptionsByDegree[form.degree] || []).map(str => <MenuItem key={str} value={str}>{str}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ) : (
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select name="className" value={form.className} onChange={handleChange} label="Class">
                  {classOptions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={2}>
            <Button variant="contained" fullWidth color={editId ? 'warning' : 'primary'} onClick={handleSubmit} sx={{ height: '100%' }}>
              {editId ? 'Update' : 'Add'} Product
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {products.map((product, i) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card sx={{ bgcolor: '#fafafa', borderRadius: 2 }}>
              {product.image && <CardMedia component="img" height="160" image={product.image} alt={product.name} />}
              <CardContent>
                <FormControlLabel
                  control={<Checkbox checked={selectedIndexes.includes(i)} onChange={() => handleSelect(i)} />}
                  label="Select"
                />
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">₹{product.price}</Typography>
                <Typography color="text.secondary">Qty: {product.quantity}</Typography>
                <Typography color="text.secondary">Student Type: {product.studentType}</Typography>
                {product.studentType === 'school' ? (
                  <Typography color="text.secondary">Class: {product.className}</Typography>
                ) : (
                  <>
                    <Typography color="text.secondary">Degree: {product.degree}</Typography>
                    <Typography color="text.secondary">Year: {product.classYear}</Typography>
                    <Typography color="text.secondary">Stream: {product.stream}</Typography>
                  </>
                )}
                <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => handleEdit(product)}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedIndexes.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="error" onClick={handleDeleteSelected}>
            Delete Selected Products
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Products;
