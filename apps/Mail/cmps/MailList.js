import MailPreview from '../cmps/MailPreview.js'

export default {
    props: ['mails'],
    template: `
        <section class="email-box grid"> 
            <i @click="isShowTools = !isShowTools" class="fa-solid fa-caret-right"></i>
            <div v-if="isShowTools" class="filter toolbar flex">
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
                    <li @click="updateUnread" class="fa-solid fa-filter"></li> | 
                    <li @click="WriteNewMail" class="fa-solid fa-pen-to-square"></li> 
                    </td><td></td><td></td><td></td></thead>
                    <tbody v-for="mail in mails" :key="mail.id">
                        <MailPreview :mail="mail"
                        @moveToGarbage="moveToGarbage"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                    </tbody>
                </table>
        </section>
    `,
    data() {
        return {
            isShowTools: false,
        }
    },
    methods: {
        moveToGarbage(mailId) {
            this.$emit('moveToGarbage', mailId)
        },
        forwardMail(mailId) {
            this.$emit('forwardMail', mailId)
        },
        replyMail(mailId) {
            this.$emit('replyMail', mailId)
        },
        setFilterBy(filterBy) {
            this.$emit('filter', filterBy)
            this.isShowTools = !this.isShowTools
        },
        updateUnread() {
            this.$emit('updateUnread')
        },
        WriteNewMail() {
            this.$emit('WriteNewMail')
        },
    },
    components: {
        MailPreview,
    }
}