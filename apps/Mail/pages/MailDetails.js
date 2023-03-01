export default {
    props: ['mail'],
    template: `<h1>details</h1>`,
    created() {
        this.updateBookId()
    },
    data() {
        return {
            bookId: '',
        }
    },
    methods: {
        updateBookId() {
            const { bookId } = this.$route.params
            console.log(bookId)
        }
    }
}