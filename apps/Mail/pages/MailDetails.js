import MailList from '../cmps/MailList.js'
import { mailService } from '../services/mail.service.js'
export default {
    template: `
    <section class="email-box grid details-box"> 
        <router-link to="/mail" class="back">Back</router-link>
        <table class="mails-table">
            <thead><td>From</td><td>To</td><td>Date</td></thead>
            <tbody> <tr class="isRead">
                    <td>{{ mail.from }}</td>
                    <td>{{ mail.to }}</td>
                    <td>{{ mail.sentAt }}</td>
                </tr>
            </tbody> 
    </table>

    <table class="mails-table main-message-mail">
    <thead><td>Message:</td></thead>
    <tr class="isRead message"><td>{{ mail.body }}</td> 
    <td><i class="fa-solid fa-trash" @click="deleteMail(mailId)"></i> |
            <i class="fa-solid fa-share-from-square" @click="replyMail(mailId)"></i> |
            <i class="fa-solid fa-up-right-from-square" @click="forwardMail(mailId)"></i></td>
        </tr>
    </table>
    </section>
    `,
    created() {
        this.updateBookId()
    },
    data() {
        return {
            mail: '',
        }
    },
    methods: {
        updateBookId() {
            const { mailId } = this.$route.params
            mailService.get(mailId)
                .then(mail => {
                    this.mail = mail
                    this.mail.isRead = true
                    mailService.save(this.mail)
                })
        },
        deleteMail(mailId) {
            console.log('delete')
            this.$emit('deleteMail', mailId)
        },
        forwardMail(mailId) {
            console.log('forward')
            this.$emit('forwardMail', mailId)
        },
        replyMail(mailId) {
            console.log('reply')
            this.$emit('replyMail', mailId)
        },
    },
    components: {
        MailList,
    },
}