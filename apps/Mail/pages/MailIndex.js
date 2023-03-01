import MailList from '../cmps/MailList.js'
import { mailService } from '../services/mail.service.js'

export default {
    template: `
        <section>
            <h2>Mail box</h2>
            <MailList :mails='mails'/>
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
        }
    },
    components: {
        MailList,
        mailService,
    }
}