import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section class="notes-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <!-- <RouterLink :to="'/car/'+car.id">Details</RouterLink> |
                    <RouterLink :to="'/car/edit/'+car.id">Edit</RouterLink> | -->
                    <button hidden @click="showDetails(car.id)">Details</button>
                    <button @click="remove(note.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        showDetails(carId){
            this.$emit('show-details', noteId)
        },
    },
    components: {
        NotePreview,
    }
}