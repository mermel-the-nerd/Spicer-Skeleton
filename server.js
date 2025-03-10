import express from 'express';//sending data between pages
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import exampleRoutes from './routes/routes.js';

dotenv.config();//loads variables

// Connect to MongoDB
connectDB();

const app = express();//loads express

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));//accessing the frontend

// Set EJS as the templating engine
app.set('view engine', 'ejs');//processing data using ejs

// Routes
app.use('/', exampleRoutes);

const PORT = process.env.PORT || 5000;//use port in .env
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});