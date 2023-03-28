const fs = require('fs').promises;
const { writeFile } = require('fs/promises');
const path = require('path');
const { uid } = require('uid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);

    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }

    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );

    if (updatedContacts.length === contacts.length) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    //повертаемо новий масив
    return updatedContacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = { id: uid(), name, email, phone };
    const updatedContacts = [...contacts, newContact];

    await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    //повертаемо новий масив
    return updatedContacts;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
