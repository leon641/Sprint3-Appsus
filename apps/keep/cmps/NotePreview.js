export default {
  props: ['note'],
  template: `
        <article class="note-preview">
            <h1>
                <span>Title</span>
                {{note.info.title}}
            </h1>  
            <h2>
                <span>Info</span>
                 {{note.info.txt}} 
                </h2>  
            
        </article>
    `,
    //    methods: {
    //     remove(noteId) {
    //         this.$emit('remove', noteId)
    //     },
    //     showDetails(noteId){
    //         this.$emit('show-details', noteId)
    //     },
       
    // },
    
}
