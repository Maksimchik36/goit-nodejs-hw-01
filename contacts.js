// импорт пакетов fs и path. Они устанавливаются глобально автоматически при установке node.js
const fs = require("fs/promises");    // 1-ый вариант
// const fs = require("fs").promises; // 2-ой вариант
const path = require("path");
const {nanoid} = require("nanoid")

// метод resolve позволяет нам получить абсолютный путь из относительного пути 
const contactsPath = path.resolve('./db/contacts.json');

// записывает allContacts в contacts.json (создана в результате рефакторинга, используется при изменении массива для обновления и на бэкэнде)
const updateContacts = async (allContacts) => await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));


// получает список всех контактов
async function getListContacts() {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    // console.log(result);
    return result;
}


// получает контакт по id
async function getContactById(contactId) {
    const id = contactId.toString();
    const allContacts = await getListContacts();
    const contactById = allContacts.find(contact => contact.id === id);
    // console.log(contactById);
    return contactById || null;
}


// // удаляет контакт по id - 1-й вариант
// async function removeContact(contactId) {
//     const id = contactId.toString();
//     const allContacts = await getListContacts();
//     const unremovedContacts = allContacts.filter(contact => contact.id !== id);
//     await fs.writeFile(contactsPath, JSON.stringify(unremovedContacts, null, 2));
//     const deletedContact = allContacts.find(contact => contact.id === id);
//     if (!deletedContact) {
//         return null;
//         }
//     return deletedContact;
// }


// удаляет контакт по id - 2-й вариант
async function removeContact(contactId) {
    const id = contactId.toString();
    const allContacts = await getListContacts();
    // вычисляет index указанного элемента в массиве
    const index = allContacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    // в результате деструктуризации получаем объект, а не массив.удаляет элемент из массива и возвращает удаляемый элемент (splice)
    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return result;
}


// добавляет новый контакт
async function addContact(name, email, phone) {
    const allContacts = await getListContacts();
    const id = nanoid();
    const newContact = {
        id,
        name,
        email,
        phone
    }
    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
}


module.exports = {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
}