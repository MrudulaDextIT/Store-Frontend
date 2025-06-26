import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';

const StudentStatus = () => {
  const [collegeStudents, setCollegeStudents] = useState([]);
  const [schoolStudents, setSchoolStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/students')
      .then((res) => {
        const all = res.data;

        const college = all
          .filter((stu) => stu.college)
          .map((stu) => ({
            ...stu,
            status: stu.status || (stu.isApproved ? 'Approved' : 'Pending'),
          }));

        const school = all
          .filter((stu) =>  stu.schoolName)
          .map((stu) => ({
            ...stu,
            status: stu.status || (stu.isApproved ? 'Approved' : 'Pending'),
          }));

        setCollegeStudents(college);
        setSchoolStudents(school);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching students:', err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (e, id, type) => {
    const newStatus = e.target.value;
    const update = (list) =>
      list.map((stu) =>
        stu._id === id ? { ...stu, status: newStatus } : stu
      );

    if (type === 'college') {
      setCollegeStudents(update);
    } else {
      setSchoolStudents(update);
    }
  };


  
  const handleSubmit = async () => {
    setSubmitting(true);
    const allStudents = [...collegeStudents, ...schoolStudents];

    const updates = allStudents.filter(
      (stu) => stu.status === 'Approved' || stu.status === 'Rejected'
    );

    try {
      for (let stu of updates) {
        const endpoint =
          stu.status === 'Approved'
            ? `http://localhost:4000/api/students/approve/${stu._id}`
            : `http://localhost:4000/api/students/reject/${stu._id}`;

        await axios.put(endpoint);
      }

      alert('Statuses updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting updates:', error);
      alert('Something went wrong while updating statuses.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderTable = (students, type) => (
    <TableContainer component={Paper} sx={{ mt: 3, bgcolor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Student ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>{type === 'college' ? 'College' : 'School'}</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((stu) => (
            <TableRow key={stu._id}>
              <TableCell>{stu._id}</TableCell>
              <TableCell>{stu.name}</TableCell>
              <TableCell>{stu.email}</TableCell>
              <TableCell>{stu.phone}</TableCell>
              <TableCell>{type === 'college' ? stu.college : stu.schoolName}</TableCell>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    value={stu.status}
                    onChange={(e) => handleStatusChange(e, stu._id, type)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Registered Students
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {collegeStudents.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                College Students
              </Typography>
              {renderTable(collegeStudents, 'college')}
            </>
          )}

          {schoolStudents.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 5 }}>
                School Students
              </Typography>
              {renderTable(schoolStudents, 'school')}
            </>
          )}

          {(collegeStudents.length > 0 || schoolStudents.length > 0) && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Changes'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default StudentStatus;
