import express from 'express';
import { getContacts, showContact, addContact, updateContactPage, updateContact, deleteContact } from '../controller/contacts.controller.js';

const router = express.Router();

//  Page
router.get('/', getContacts);
router.get('/add-contact-page', showContact);
router.post('/add-contact', addContact);
router.get('/update-contact-page/:id', updateContactPage);
router.post('/update-contact/:id', updateContact );
router.get('/delete-contact/:id', deleteContact);

export default router;