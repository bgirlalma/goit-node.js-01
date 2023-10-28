const Contacts = require('./contacts');
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
       const contacts = await Contacts.listContacts();
       console.log(contacts)
        break;
  
      case 'get':
        const contactById = await Contacts.getContactById(id);
        console.log(contactById)
        break;
  
      case 'add':
        const newContact = await Contacts.addContact({name, email, phone});
        console.log(newContact)
        break;
  
      case 'remove':
       const deleteContact = await Contacts.removeContact(id);
       console.log(deleteContact)
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  
  invokeAction(argv);