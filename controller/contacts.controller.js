import Contact from "../models/contact.model.js";
import mongoose from "mongoose";

export const showContacts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  }
  const results = await Contact.paginate({}, options);
  res.render('home', {
    totalDocs: results.totalDocs,
    limit: results.limit,
    totalPages: results.totalPages,
    currentPage: results.page,
    counter: results.pagingCounter,
    hasPrevPage: results.hasPrevPage,// contain boolean value
    hasNextPage: results.hasNextPage,// contain boolean value
    prevPage: results.prevPage,
    nextPage: results.nextPage,
    contacts: results.docs
  });
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
