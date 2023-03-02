'use strict'
import { utilService } from     '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const gNotes =  [
  {
  id: 'n101',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#00d',
  },
  info: {
    title: 'lunch',
    txt: 'Having lunch with the kids at the mall',
  },
},
{
  id: 'n102',
  type: 'txt',
  createdAt: new Date().toLocaleString(),
  isPinned: false,
  info: {
    // url: 'http://some-img/me',
    
    title: 'sprint 3',
    txt: 'Fullstack Me Baby! improve your skills in vue ',
  },
  style: {
    backgroundColor: '#00d',
  },
},
{
  id: 'n103',
  createdAt: new Date().toLocaleString(),
  type: 'txt',
  isPinned: false,
  info: {
    title: 'Get my stuff together',
    txt: 'getting ready for next week',
  },
  todos: [
    { txt: 'Drivig license', doneAt: null },
    { txt: 'Coding power', doneAt: 187111111 },
  ],
},
{
  id: 'n104',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#00d',
  },
  info: {
    title: 'Going out',
    txt: 'Having beer with friends',
  },
},
{
  id: 'n105',
  type: 'txt',
  isPinned: true,
  createdAt: new Date().toLocaleString(),
  style: {
    backgroundColor: '#00d',
  },
  info: {
    title: 'Soccer game',
    txt: 'Going to a soccer game with inon',
  },
},
]


_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  createNote,
  loadImageFromInput,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regex.test(note.info.title))
    }
    if (filterBy.bookPrice) {
      notes = notes.filter((book) => book.bookPrice >= filterBy.bookPrice)
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
  .then(note =>{
    return setNextPrevBookId(note)
  }) 
}

function remove(noteId) {

  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    note.id = utilService.makeId()
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote() {
return notes
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
   notes = gNotes
 
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title,body) {
  let note = {
    id: '',
    type: '',
    isPinned: true,
    createdAt: new Date().toLocaleString(),
    style: {
      backgroundColor: '#00d',
    },
    info: {
      url: 'http://some-img/me',
      txt: body,
      title,
    },
  }

  return save(note)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  // After we read the file
  reader.onload = function (event) {
    let img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    // Run the callBack func, To render the img on the canvas
    img.onload = onImageReady.bind(null, img)
    // Can also do it this way:
    // img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}




