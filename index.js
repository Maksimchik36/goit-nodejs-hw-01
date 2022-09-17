// const argv = require("yargs").argv; // 1-ый вариант
const yargs = require("yargs");  // 2-ой вариант
const { hideBin } = require("yargs/helpers");
const getListContacts = require('./contacts').getListContacts;
const getContactById = require('./contacts').getContactById;
const removeContact = require('./contacts').removeContact;
const addContact = require('./contacts').addContact;


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await getListContacts();
          console.log(allContacts);
      break;

    case "get":
          const contact = await getContactById(id);
          console.log(contact);          
      break;

    case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      break;

    case "remove":
        const removedContact = await removeContact(id);
        console.log(removedContact);        
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


// // 1-ый вариант. проверяет process.argv на наличие флага "--action" и выдает его индекс
// const actionIndex = process.argv.indexOf("--action");
// // при наличии флага получает значение action. оно следующее в массиве, т.е. actionIndex + 1.
// if (actionIndex !== -1) {
//     const action = process.argv[actionIndex + 1];
//     // вызов ф-и с соответствующим значением action
//     invokeAction({action})
// }


// 2-ой вариант
// отсекает первые 2 эл-нта массива: node и файл запуска
const arr = hideBin(process.argv);
// выдает объект из исходного массива
const { argv } = yargs(arr);
// console.log(arr);
invokeAction(argv);