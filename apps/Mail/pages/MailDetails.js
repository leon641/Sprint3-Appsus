import MailList from '../cmps/MailList.js'
import { mailService } from '../services/mail.service.js'
export default {
    template: `
    <section class="email-box grid details-box"> 
        <router-link to="/mail" class="back">Back</router-link>
        <table class="mails-table">
            <tr class="isRead">
                    <td><span class="bold">From: </span>{{ mail.from }}</td>
                    <td><span class="bold">To: </span>{{mail.to }}</td>
                    <td><span class="bold">Date: </span>{{ mail.sentAt }}</td>
                </tr>
        </table>

            <table class="mails-table main-message-mail">
            <tr class="isRead message"><td><span class="bold">Message: </span>{{ mail.body }}</td> 
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
        moveToTrash() {
            if (this.mail.removedAt) this.deleteMail(this.mail.id)
            else {
                mailService.query()
                    .then(mail => mail.id === this.mail.id)
                    .then(mail => mail.removedAt = new Date())
            }
        },
        deleteMail(mailId) {
            mailService.remove(mailId)
        },
        forwardMail(mailId) {
            console.log('forward')
        },
        replyMail(mailId) {
            console.log('reply')
        },
    },
    components: {
        MailList,
    },
}