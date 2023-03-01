export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h2>{{ note.title }}</h2>
            <h3>{{ note.text }}</h3>
        </article>
    `,
}