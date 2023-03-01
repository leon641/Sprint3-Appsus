import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <!-- <h2>Mail box</h2> -->
            <MailList
           @deleteMail="deleteMail"
           @forwardMail="forwardMail"/>
        </section>
    `,
    methods: {
        deleteMail(mailId) {
            console.log('delete')
        },
        forwardMail(mailId) {
            console.log('forward')
        },

    },
    components: {
        MailList,
    }
}