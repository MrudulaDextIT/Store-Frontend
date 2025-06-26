import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';  
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,IconButton,Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2'


const OrderList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    fetch("http://localhost:4000/get-data")
      .then((res) => res.json())
      .then((result) => {
        console.log("hiii", result);  
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      fetch(`http://localhost:4000/delete-form-data/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setData(data.filter((item) => item._id !== id));
          Swal.fire({
            title: " Deleted!",
            text: "Successfully!",
            icon: "success"
          }); })
        .catch((err) => console.log(err));
    }
    
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    navigate(`/edit/${id}`);
  };
  
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "OrderList.xlsx");
  };

  
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Order List", 20, 10);
  
    const tableColumn = ["Order Id", "Name", "Email", "Phone", "Product", "Quantity", "Payment"];
    const tableRows = [];
  
    data.forEach(item => {
      const rowData = [
        item._id,
        item.name,
        item.email,
        item.phone,
        item.product,
        item.quantity,
        item.paymentMethod,
      ];
      tableRows.push(rowData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("OrderList.pdf");
  };
  

  


  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Submitted Orders
      </Typography>
       <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', marginBottom: '30px', marginLeft: '900px' }}>
        <Button variant="contained" color="success" onClick={downloadExcel}>
          Download Excel
        </Button>
        <Button variant="contained" color="error" onClick={downloadPDF}>
          Download PDF
        </Button>
      </div>

      {data.length > 0 ? (
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead >
              <TableRow>
              <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Order Id</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Name</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Email</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Phone</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Product</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Quantity</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Payment</b></TableCell>
                <TableCell sx={{ bgcolor: "#6A1B9A", color: "white", fontSize: "18px" }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.paymentMethod}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(item._id)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center" color="text.secondary">
          No Data Found
        </Typography>
      )}
    </div>
  );
};

export default OrderList;
