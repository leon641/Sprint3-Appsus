'use strict'
import { utilService } from     '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  createNote,
//   removeReview,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    // if (filterBy.txt) {
    //   const regex = new RegExp(filterBy.txt, 'i')
    //   notes = notes.filter((note) => regex.test(note.info.title))
    // }
    // if (filterBy.bookPrice) {
    //   notes = notes.filter((book) => book.bookPrice >= filterBy.bookPrice)
    // }
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
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote() {
return notes
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
   let notes =  
  [{
          id: 'n101',
          type: 'txt',
          isPinned: true,
          createdAt: 1112222,
          style: {
            backgroundColor: '#00d',
          },
          info: {
            txt: 'Fullstack Me Baby!',
            title: 'Get my stuff together',
          },
        },
        {
          id: 'n102',
          type: 'txt',
          createdAt: 1112222,
          isPinned: false,
          info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me',
          },
          style: {
            backgroundColor: '#00d',
          },
        },
        {
          id: 'n103',
          createdAt: 1112222,
          type: 'txt',
          isPinned: false,
          info: {
            title: 'Get my stuff together',
          },
          todos: [
            { txt: 'Drivig license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        }]
      
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote() {
  return {
    id: utilService.makeId(),
    type: 'txt',
    isPinned: true,
    createdAt: Date.now(),
    style: {
      backgroundColor: '#00d',
    },
    info: {
      txt: 'Fullstack Me Baby!',
      title: 'Get my stuff together',
    },
  }
}

// function _createNote(bookName, bookPrice = 250) {
//   const book = getEmptNote(bookName, bookPrice)
//   book.id = utilService.makeId()
//   return book
// }

// function removeReview(bookId, reviewId) {
//   return get(bookId).then((book) => {
//     const idx = book.reviews.findIndex((review) => review.id === reviewId)
//     book.reviews.splice(idx, 1)
//     return save(book)
//   })
// }

// function addReview(bookId, review) {
//     return get(bookId).then((book) => {
//         review.id = utilService.makeId(4)
//         if (!book.reviews) {
//             book.reviews = []
//         }
//         book.reviews.push(review)
//         return save(book)
//     })
// }

// function setNextPrevBookId(book) {
//     return storageService.query(note_KEY).then((books) => {
//         const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
//         book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
//         book.prevBookId = books[bookIdx - 1]
//         ? books[bookIdx - 1].id
//         : books[books.length - 1].id
//         return book
//     })
// }

//new function cr



