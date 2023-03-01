import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <h2>Mail box</h2>
            <h1>hello user</h1>
            <MailList
           @openMail="openMail"
           @deleteMail="deleteMail"
           @forwardMail="forwardMail"/>
        </section>
    `,
    methods: {
        openMail(mailId) {
            mailService.get(mailId)
                // .then(res => console.log(res))
            // .then()
        },
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