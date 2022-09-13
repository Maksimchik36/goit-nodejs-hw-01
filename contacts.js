// импорт пакетов fs и path. Они устанавливаются глобально автоматически при установке node.js
const fs = require("fs/promises");    // 1-ый вариант
// const fs = require("fs").promises; // 2-ой вариант
const path = require("path");

// метод resolve позволяет нам получить абсолютный путь из относительного пути 
const contactsPath = path.resolve('./db/contacts.json');
// console.log(contactsPath);


function listContacts() {
    fs.readFile(contactsPath)
        .then(data => console.log(JSON.parse(data)))
        .catch(error => console.log(error))
}


function getContactById(contactId) {
    // const data = fs.readFile(contactsPath);
    // return data;
}


function removeContact(contactId) {
    // const data = fs.writeFile(contactsPath);
    // return data;
}


function addContact(name, email, phone) {
    // const data = fs.writeFile(contactsPath);
    // return data;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}