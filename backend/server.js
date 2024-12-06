const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const laptopRoutes = require('./routes/laptopRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const laptops = require('../json/laptops.json');
const employees = require('../json/employees.json');

console.log('Laptops:', laptops);
console.log('Employees:', employees);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/laptops', laptopRoutes);

const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, ()=>{
    console.log(clc.yellow("Server is running on:"));
      console.log(clc.yellow.underline(`http://localhost:${PORT}/`));
  });