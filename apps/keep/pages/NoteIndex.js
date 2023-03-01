import { noteService } from '../services/note.service.js'
import noteList from '../cmps/NoteList.js'
import { showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'

export default {
  template: `
        <section class="text-editor">
            <form @submit="">
                <input type="text" v-model="txt" placeholder="search">
            </form>
            <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                <h1><span>Title</span> {{note.title}} </h1>  
                <h2><span>Info</span> {{note.txt}} </h2>  
                <button @click="removeNote(notes.id)">x</button>
                </li>
            </ul>
       
    `,
  data() {
    return {
        txt : '',
        notes: [],
        filterBy: {},
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  methods: {
    removeNote(NoteId) {
      noteService
        .remove(NoteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === NoteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },
  },
  components: {
    noteList,
  },
}
