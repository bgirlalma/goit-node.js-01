const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const contactsPath = path.join(__dirname, "db/contacts.json")

async function readContacts() {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading contacts:', error);
        return [];
    }
}

async function writeContacts(contacts){
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error('Error writing contacts:', error);
    }
}

async function listContacts() {
    const contacts =  await readContacts();
    return contacts
  }

  
async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if(contact === undefined){
        return null;
    }
    return contact;
  }
  
  async function removeContact(contactId) {
    const contacts =await readContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if(index === -1){
        return null;
    }

    const updateContacts = {...contactId};
    contacts.splice(index, 1)
    await writeContacts(newContacts)
    return contacts;

  }
  
  async function addContact(name, email, phone) {
    const contacts =await readContacts();
    const id = crypto.randomUUID();
    const newContact = {id, name, email, phone};
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};