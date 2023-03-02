import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="email-box grid"> 
            <div class="filter toolbar flex">
                <ul>
                    <li @click="setFilterBy('all')">All</li>
                    <li @click="setFilterBy('inbox')">Inbox</li>
                    <li @click="setFilterBy('send')">Send</li>
                    <li @click="setFilterBy('draft')">Draft</li>
                    <li @click="setFilterBy('Garbage')">Garbage</li>
                </ul>
            </div>
               <table class="mails-table">
                    <thead><td>
                    <li @click="setFilterBy('unread')" class="fa-solid fa-filter"></li> | 
                    <li @click="WriteNewMail" class="fa-solid fa-pen-to-square"></li> 
                    </td><td></td><td></td><td></td></thead>
                    <tbody v-for="mail in mails" :key="mail.id">
                        <MailPreview :mail="mail"
                        @moveToTrash="moveToTrash"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                    </tbody>
                </table>
        </section>
    `,
    methods: {
        moveToTrash(mailId) {
            this.$emit('moveToTrash', mailId)
        },
        forwardMail(mailId) {
            this.$emit('filter', filterBy)
        },
        replyMail(mailId) {
            this.$emit('filter', filterBy)
        },
        setFilterBy(filterBy) {
            this.$emit('filter', filterBy)
        },
        WriteNewMail() {
            this.$emit('WriteNewMail')
        },
        // isShowUnRead() {
        //     this.$emit('isShowUnRead')
        // },
    },
    components: {
        MailPreview,
    }
}