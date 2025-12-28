import express from 'express';
import mongoose from 'mongoose';
import Contact from './models/contact.model.js';

const app = express();

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud')
  .then(() => console.log("Database is connected"));

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
  const contact = await Contact.findById(req.params.id, req.body);
  res.render('update-contact', { contact });
});

app.post('/update-contact/:id', async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});


app.get('/delete-contact/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id, req.body);
  res.redirect('/');
});

//Working Port 
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
