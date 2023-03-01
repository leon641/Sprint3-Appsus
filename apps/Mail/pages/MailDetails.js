import { mailService } from '../services/mail.service.js'
export default {
    template: `
    <section class="email-box grid details-box"> 
        <table class="mails-table">
            <thead><td></td><td>From</td><td>To</td><td>Title</td><td>Date</td></thead>
            <tbody> <tr>
                    <td><i class="fa-solid fa-trash" @click="deleteMail(mailId)"></i> |
                    <i class="fa-solid fa-share-from-square" @click="forwardMail(mailId)"></i></td>
                    <td>{{ mail.from }}</td>
                    <td>{{ mail.to }}</td>
                    <td>{{ mail.body }}</td>
                    <td>{{ mail.sentAt }}</td>
                    </tr>
            </tbody>
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
            console.log('delete in details')
            // this.$emit('deleteMail', mailId)
        },
        forwardMail(mailId) {
            // this.$emit('forwardMail', mailId)
            console.log('forward in details')
        },
    },
}