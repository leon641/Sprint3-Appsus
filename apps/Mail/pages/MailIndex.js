import MailList from '../cmps/MailList.js'
import mailService from '../services/mail.service'

export default {
    template: `
        <section>
            <h2>Mail box</h2>
            <MailList/>
        </section>
    `,
    created() {
        // this.updateMails()
    },
    date() {
        return {
            mails: '',
        }
    },
    methods: {
        updateMails() {
            this.mails = mailService.query()
            // .then(console.log(this.mails))
        }
    },
    components: {
        MailList,
        mailService,
    }
}