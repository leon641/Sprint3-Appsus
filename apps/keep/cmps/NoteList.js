import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <button @click="remove(note.id)">x</button>

                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        showDetails(noteId){
            this.$emit('show-details', noteId)
        },
       
    },
    components: {
        NotePreview,
    },
    emits: ['remove'],
}