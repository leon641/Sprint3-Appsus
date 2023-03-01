import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <MailList/>
        </section>
    `,
    components: {
        MailList,
    }
}