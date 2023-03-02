import NotePreview from './NotePreview.js'

export default {
  props: ['notes'],

  template: `
        <section class="note-list">
            <ul>
                <li class="note-card" v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <span class="icon" @click="remove(note.id)">🗑️</span>
                    <span class="icon" @click="edit(note.id)">📝</span>
                    <span class="icon" @click="OnColorChange(note.id)">🎨</span>
                    <span class="icon" @click="OnSend(note.id)">✉️</span>


</li>
            </ul>
        </section>
    `,
  methods: {
    remove(noteId) {
      this.$emit('remove', noteId)
    },
    showDetails(noteId) {
      this.$emit('show-details', noteId)
    },
  },
  components: {
    NotePreview,
  },
  emits: ['remove'],
}
