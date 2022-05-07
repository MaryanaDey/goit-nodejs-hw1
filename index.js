const { program } = require("commander");

const contatsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contatsOperations.listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contact = await contatsOperations.getContactById(id);
            if (!contact) {
               throw new Error(`Contact with id=${id} not found`);
            }
            console.log(contact);
            break;
        
        case "add":
            const newContact = await contatsOperations.addContact(name, phone, email);
            console.log(newContact);
            break;
        
        case "remove":
            const removedContact = await contatsOperations.removeContact(id);
            console.log(removedContact);
            break;
        
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const opts = program.opts();
invokeAction(opts)
.then(data => console.log(data))