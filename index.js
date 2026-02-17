import express from 'express';
import contactRoutes from './routes/contact.route.js';
import { connectDB } from './config/database.js';
const app = express();
const PORT = process.env.PORT;

/**
 * Database connection
 */
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

/**
 * Routes
 */
app.use('/', contactRoutes);

//Working Port 
app.listen(PORT, () => {
  console.log(`server successfully started on port number: ${PORT}`)
})