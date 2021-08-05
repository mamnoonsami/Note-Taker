const { timeEnd, Console } = require('console') //added automatically by IDE, dont worry if I dont understand this later
const fs = require('fs')
const chalk = require('chalk')


/* the below function is to add a n ote with the title and bpdy */
const addNote = (title, body) => {
        const notes = loadNotes() // load all the previous notes

        /*in the below line it checks if the given title
        already exists in our previosuly saved notes*/
        const duplicateNotes = notes.find((note) => note.title === title) // will be undefined if no notes exist with this title

        /*Note gets saved safely if there is no duplicate found. 
            we know there is no duplicate when duplicateNotes has a length of 0*/
        if (duplicateNotes === undefined) {
            notes.push({
                title: title,
                body: body
            })

            saveNotes(notes) // save the note by writing it to the notes.js file, it appends to the existing data

            console.log(chalk.green.inverse('Your note "' + title + '" has been saved'))
        } else {
            console.log(chalk.red.inverse("Duplicate title exists"))
        }
    }
    /* this is the end of function that works for adding notes */




/* this below block of codes are to remove a note from database*/
const removeNote = (title) => {
        const notes = loadNotes() // load all the previus notes
        sizeBefore = notes.length

        /* the below function keep all the notes that title is not equal to given title*/
        const notesToKeep = notes.filter((note) => note.title !== title)
            //the above line is shortcut of below function
            /*const notesToKeep = notes.filter(function(note) {
                return note.title !== title
            })*/
        sizeAfter = notesToKeep.length

        if (sizeAfter === sizeBefore) {
            console.log(chalk.red.inverse("!!! No such notes found !!!"))
        } else {
            saveNotes(notesToKeep)
            console.log(chalk.green.inverse("Title \"" + title + "\" has been removed parmanently"))
        }
    }
    /* this is the end of removing the note from database */

const readNotes = (title) => {
    const notes = loadNotes()
    const notesWithThatTitle = notes.find((note) => note.title === title)
    if (notesWithThatTitle) {
        console.log(chalk.inverse(notesWithThatTitle.title))
        console.log(notesWithThatTitle.body)
    } else {
        console.log(chalk.red.inverse("No note found with this title !"))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue.inverse('Your notes are: '))

    notes.forEach(element => {
        console.log(element.title)
    });
}

const loadNotes = () => {
    try {
        const data = fs.readFileSync('notes.json')
        const dataJSON = data.toString()
        return JSON.parse(dataJSON)
    } catch (e) { // just incase if the file doesnot exist, or some other error occurs this return a null list
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = { // so that other class can use both the getNotes() and addNote() functions
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
}