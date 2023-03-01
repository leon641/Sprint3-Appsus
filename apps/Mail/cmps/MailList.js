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
                    <thead><td>From</td><td>To</td><td>Title</td><td>Date</td></thead>
                    <tbody v-for="mail in mails" :key="mail.from">
                        <MailPreview :mail="mail" @click="openMail(mail.id)"/>
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
        openMail(id) {
            console.log('id', id)
        }
    },
    components: {
        MailPreview,
    }
}

