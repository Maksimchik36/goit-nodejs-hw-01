// const argv = require("yargs").argv; // при 1-ом варианте вызова ф-и invokeAction
const yargs = require("yargs");  // при 2-ом варианте вызова ф-и invokeAction. позволяет преобразовать массив в объект
const { hideBin } = require("yargs/helpers"); // при 2-ом варианте вызова ф-и invokeAction
const getListContacts = require('./contacts').getListContacts;
const getContactById = require('./contacts').getContactById;
const removeContact = require('./contacts').removeContact;
const addContact = require('./contacts').addContact;


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getList":
          const allContacts = await getListContacts();
          console.table(allContacts);
      break;

    case "getById":
          const contact = await getContactById(id);
          console.log(contact);          
      break;

    case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      break;

    case "removeById":
        const removedContact = await removeContact(id);
        console.log(removedContact);        
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


// // 1-ый вариант вызова ф-и invokeAction. 
// // проверяет process.argv на наличие флага "--action" и выдает его индекс
// const actionIndex = process.argv.indexOf('--action')
// console.log("process.argv", process.argv);
// // при наличии флага получает значение action. оно следующее в массиве, т.е. actionIndex + 1.
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
// // вызов ф-и с соответствующим значением action
//   invokeAction({action})
// }


// 2-ой вариант вызова ф-и invokeAction.
// отсекает первые 2 элемента массива: node и файл запуска, и выдает оставшиеся элементы
const arr = hideBin(process.argv);
// выдает объект из исходного массива
const { argv } = yargs(arr);
invokeAction(argv);