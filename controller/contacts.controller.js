import Contact from "../models/contact.model.js";
import mongoose from "mongoose";

export const showContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.render('home', { contacts });
}

export const addContactPage = async (req, res) => {
  res.render('add-contacts');
}

export const addContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect('/');
}

export const updateContactPage = async (req, res) => {
  const contact = await Contact.findById(req.params.id, req.body);
  res.render('update-contact', { contact });
}

export const updateContact = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
}

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id, req.body);
  res.redirect('/');
}
