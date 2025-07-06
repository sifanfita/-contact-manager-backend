const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);

})

//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);

})

//@desc create contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("This is the request body:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
       res.status(400);
         throw new Error("Please fill all the fields");
    }

    const contact = await Contact.create(
        {
            name,
            email,
            phone,
            user_id: req.user.id // associate the contact with the logged-in user
        }
    )
    

    res.status(201).json(contact);

})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You do not have permission to update this contact");
    }

    updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true, // return the updated document
            runValidators: true // validate the update against the schema
        }
    );


   res.status(200).json(updatedContact);

})


//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You do not have permission to delete this contact");
    }
    await Contact.findByIdAndDelete(req.params.id);


    res.status(200).json(contact);

})


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };