import express from 'express';
import { showContacts, 
         addContactPage,
         addContact, 
         updateContactPage, 
         updateContact, 
         deleteContact,
} from '../controller/contacts.controller.js';

const router = express.Router();

//  Route Contacts
router.get('/', showContacts);
router.get('/add-contact-page', addContactPage);
router.post('/add-contact', addContact);
router.get('/update-contact-page/:id', updateContactPage);
router.post('/update-contact/:id', updateContact );
router.get('/delete-contact/:id', deleteContact);

export default router;