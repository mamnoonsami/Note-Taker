const chalk = require('chalk') // to customize texts
const yargs = require('yargs') // to handle and parse argv strings
const notes = require('./notes.js')

//Customize yeargs version
yargs.version('1.1.0')

// add note, remove note, read a note, see the list of notes

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: { // builder is an object
        title: {
            describe: 'Add a Note title',
            demandOption: true, // title has to be provided with the command line argunments
            type: 'string', // title always has to be string 
        },

        body: {
            describe: 'Write your notes',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove the note with provided title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Listing of the notes',
    handler() {
        notes.listNotes()
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read the note with provided title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})


yargs.parse() // without this line the code wont work