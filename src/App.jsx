import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";
import Contact from "./Components/Contact/Contact";
import OrderList from "./Components/OrderList/OrderList";
import EditOrder from "./Components/EditOrder";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//New created components
import RoleSelection from "./Components/Auth/RoleSelection";
import AdminLogin from "./Components/Auth/AdminLogin";
import AdminSignup from "./Components/Auth/AdminSignup";
import StudentLogin from "./Components/Auth/StudentLogin";
import StudentSignup from "./Components/Auth/StudentSignup";
import StudentDashboard from './Components/Student/Dashboard';
import OrderBooks from "./Components/Student/OrderBooks";
import MyOrders from "./Components/Student/MyOrders";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import StudentStatus from "./Components/Admin/StudentStatus";
import Branch from "./Components/Admin/Branch";
import Products from "./Components/Admin/Products"; 
import Delivery from "./Components/Admin/Delivery";

import { CartProvider } from "./Components/Student/Cart/CartContext";
import AddCart from "./Components/Student/Cart/AddCart";


const App = () => {
  return (
    <CartProvider> 
    <BrowserRouter>
      <ToastContainer />
      <Routes>
         
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student" element={<StudentDashboard />}/>
        <Route path="/student/order-books" element={<OrderBooks />} />
        <Route path="/student/my-orders" element={<MyOrders/>} />
        {/* <Route path="/student/AddCart" element={
          <CartProvider>
            <OrderBooks />
          </CartProvider>
        } /> */}
        <Route path="/student/cart/AddCart" element={<AddCart />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/student-status" element={<StudentStatus />} />
        <Route path="/admin/branch" element={<Branch />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/delivery" element={<Delivery />} />
        
{/*      
        <Route path="profile" element={<Profile />} />
        <Route path="order-details" element={<OrderDetails />} />
        <Route path="change-password" element={<ChangePassword />} /> */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/form" element={<><Navbar /><Form /></>} />
        <Route path="/list" element={<><Navbar /><OrderList /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/edit/:id" element={<><Navbar /><EditOrder /></>} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
};

export default App;
