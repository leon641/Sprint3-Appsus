import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <MailList
            @filter="setFilterBy"
            :mails="filteredMails" 
            v-if="mails"
            @deleteMail="deleteMail"
            @forwardMail="forwardMail"
            @replyMail="replyMail"
            />
        </section>
    `,
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    data() {
        return {
            mails: null,
            filterBy: 'all'
        }
    },
    methods: {
        setFilterBy(filterBy) {
            this.filterBy = filterBy
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
    computed: {
        filteredMails() {
            if (this.filterBy === 'all') return this.mails
            if (this.filterBy === 'inbox') return this.mails.filter(mail => mail.to === mailService.getUser().email)
            if (this.filterBy === 'send') return this.mails.filter(mail => mail.from === mailService.getUser().email)
        }
    },
    components: {
        MailList,
    }
}