import { noteService } from '../services/note.service.js'
import noteList from '../cmps/NoteList.js'
import { showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'

export default {
  template: `
        <section>
            <h2>note</h2>
            <noteList :notes="" @remove="removeNote" />
        </section>
    `,
  data() {
    return {
      note: [],
     
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
