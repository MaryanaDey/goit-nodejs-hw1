const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
     const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (id) =>{
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if (!result) {
        return null;
    }
    return result;
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return null
    }
    const [removeContact] = contacts.splice(idx, 1);
    await listContacts(contacts);
    return removeContact;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};