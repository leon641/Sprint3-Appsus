import { mailService } from '../services/mail.service.js'
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
                    <li @click="setFilterBy('garbage')">Garbage</li>
                </ul>
            </div>
               <table class="mails-table">
                    <thead><td><li>UnRead</li></td><td></td><td></td><td></td></thead>
                    <tbody v-for="mail in mails" :key="mail.from">
                        <MailPreview :mail="mail"
                        @deleteMail="deleteMail"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                    </tbody>
                </table>
        </section>
    `,
    methods: {
        deleteMail(mailId) {
            this.$emit('deleteMail', mailId)
        },
        forwardMail(mailId) {
            this.$emit('filter', filterBy)
        },
        replyMail(mailId) {
            this.$emit('filter', filterBy)
        },
        setFilterBy(filterBy) {
            this.$emit('filter', filterBy)
        }
    },
    components: {
        MailPreview,
    }
}