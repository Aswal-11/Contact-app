
import express from 'express';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import Contact from './models/contact.model.js';

const app = express();

// Database Connection (use environment variable in deployment)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/contacts-crud';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Database is connected'))
  .catch(err => console.error('DB connection error:', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Home Page
app.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.render('home', { contacts });
});

// Add Contact Page
app.get('/add-contact', (req, res) => {
  res.render('add-contacts');
});

// Save Contact
app.post('/add-contact', async (req, res) => {
  await Contact.create(req.body);
  res.redirect('/');
});

app.get('/update-contact/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('update-contact', { contact });
});

app.post('/update-contact/:id', async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete-contact/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Local dev: start server when not in production (serverless platforms will not use listen)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

// Export serverless handler for Vercel / other serverless platforms
export default serverless(app);
