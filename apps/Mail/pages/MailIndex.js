import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <MailList
            @filter="setFilterBy"
            :mails="filteredMails" 
            v-if="mails"
            @WriteNewMail="openCloseMsgModal"
            @moveToTrash="moveToTrash"
            @forwardMail="forwardMail"
            @replyMail="replyMail"
            />
        </section>
        
    <section v-if="isCreateMail" class="new-mail-box">
    <thead><tr><td>New message:</td><td @click="openCloseMsgModal" class="fa-solid fa-xmark"></td></tr></thead>
         <tbody>
         <tr><td><label>From: {{ user.fullName}} ({{user.user}}).</label></td></tr>
         <br>
         <tr><td><textarea name="msg" rows="30" cols="50" placeholder="Your message..."></textarea></td></tr>
         <tr><td @click="sendMsg">Send</td></tr>
         </tbody>
        
    </section>
    `,
    created() {
        this.updateUser()
        mailService.query()
            .then(mails => this.mails = mails)
    },
    data() {
        return {
            user: '',
            mails: null,
            filterBy: 'all',
            isCreateMail: false,
            // isShowUnRead: false,
        }
    },
    methods: {
        updateUser() {
            this.user = mailService.getUser()
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        moveToTrash(mailId) {
            const idx = this.mails.findIndex(mail => mail.id === mailId)
            if (this.mails[idx].removedAt) deleteMail(mailId)
            else {
                this.mails[idx].removedAt = new Date()
                mailService.get(mailId)
                    .then(mail => {
                        mail.removedAt = new Date()
                        mailService.save(mail)
                    })
            }
        },
        deleteMail(mailId) {
            const idx = this.mails.findIndex(mail => mail.id === mailId)
            this.mails.splice(idx, 1)
            mailService.remove(mailId)
            // .then(mails => this.mails = mails)
        },
        forwardMail(mailId) {
            console.log('forward')
        },
        replyMail(mailId) {
            console.log('reply')
        },
        openCloseMsgModal() {
            this.isCreateMail = !this.isCreateMail
        },
        sendMsg() {
            console.log('sendMsg')
        }
    },
    computed: {
        filteredMails() {
            if (this.filterBy === 'all') return this.mails.filter(mail => mail.removedAt === null)
            if (this.filterBy === 'inbox') return this.mails.filter(mail => mail.to === mailService.getUser().email)
            if (this.filterBy === 'send') return this.mails.filter(mail => mail.from === mailService.getUser().email)
            if (this.filterBy === 'unread') return this.mails.filter(mail => !mail.isRead)
            if (this.filterBy === 'Garbage') return this.mails.filter(mail => mail.removedAt !== null)
        },
        // updateFilterBy() {
        //     if (!this.isShowUnRead) this.filterBy = 'all'
        //     else this.filterBy = 'unread'
        //     console.log(this.filterBy)
        // },
    },
    components: {
        MailList,
    }
}