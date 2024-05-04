const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');

// Route to handle POST request to create a new contact
router.post('/', async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;
        const contact = new Contact({ name, email, mobile, message });
        await contact.save();
        res.status(201).json(contact);
        console.log(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to handle GET request to retrieve all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
