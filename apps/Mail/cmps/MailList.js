import { mailService } from '../services/mail.service.js'
import MailPreview from '../cmps/MailPreview.js'

export default {
    template: `
        <section class="email-box grid"> 
            <div class="toolbar flex">
                <ul>
	            <li><a href="#">All</a></li>
	            <li><a href="#">Inbox</a></li>
	            <li><a href="#">Send</a></li>
	            <li><a href="#">Draft</a></li>
                </ul>
            </div>
               <table class="mails-table">
                    <thead><td></td><td></td><td></td><td></td></thead>
                    <tbody v-for="mail in mails" :key="mail.from">
                        <MailPreview :mail="mail"
                        @deleteMail="deleteMail"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                    </tbody>
                </table>
        </section>
    `,
    created() {
        this.updateMails()
    },
    data() {
        return {
            mails: '',
        }
    },
    methods: {
        updateMails() {
            mailService.query()
                .then(mails => this.mails = mails)
        },
        deleteMail(mailId) {
            mailService.remove(mailId)
                .then(mails => this.mails = mails)
        },
        forwardMail(mailId) {
            console.log('forward')
        },
        replyMail(mailId) {
            console.log('reply')
        },
    },
    components: {
        MailPreview,
    }
}