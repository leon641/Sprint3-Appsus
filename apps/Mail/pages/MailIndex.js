import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <MailList
            @updateUnread="updateUnread"
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
             <tr><td><label>From: {{ user.fullName}} ({{user.email}}).</label></td></tr>
        <br>
            <tr><td><textarea v-model="newMsg.target" rows="1" cols="50" placeholder="Send to..."></textarea></td></tr>
        <br>
            <tr><td><textarea v-model="newMsg.subject" rows="1" cols="50" placeholder="Subject..."></textarea></td></tr>
        <br> 
            <tr><td><textarea v-model="newMsg.msg" rows="30" cols="50" placeholder="Your message..."></textarea></td></tr>
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
            filterBy: {
                isRead: null,
                type: 'all',
            },
            isCreateMail: false,
            newMsg: {
                subject: '',
                msg: '',
                target: '',
            }
        }
    },
    methods: {
        updateUser() {
            this.user = mailService.getUser()
        },
        setFilterBy(filterBy) {
            this.filterBy.type = filterBy
        },
        updateUnread() {
            if (this.filterBy.isRead === null) this.filterBy.isRead = false
            else if (this.filterBy.isRead === false) this.filterBy.isRead = true
            else this.filterBy.isRead = null
        },
        moveToTrash(mailId) {
            const idx = this.mails.findIndex(mail => mail.id === mailId)
            if (this.mails[idx].removedAt) this.deleteMail(mailId)
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
            let NewMail = mailService.getEmptyMail()
            NewMail.subject = this.newMsg.subject
            NewMail.body = this.newMsg.msg
            NewMail.sentAt = new Date()
            NewMail.to = this.newMsg.target

            mailService.save(NewMail)
            this.mails.unshift(NewMail)
            this.openCloseMsgModal()
            this.newMsg.subject = ''
            this.msg = ''
            this.newMsg.target = ''
        }
    },
    computed: {
        filteredMails() {
            if (this.filterBy.type === 'all') {
                return this.mails.filter(mail => {
                    if (this.filterBy.isRead !== null && mail.isRead !== this.filterBy.isRead) return false
                    return mail.removedAt === null
                })
            }
            if (this.filterBy.type === 'inbox') {
                return this.mails.filter(mail => {
                    if (this.filterBy.isRead !== null && mail.isRead !== this.filterBy.isRead) return false
                    return mail.to === mailService.getUser().email
                })
            }
            if (this.filterBy.type === 'send') {
                return this.mails.filter(mail => {
                    if (this.filterBy.isRead !== null && mail.isRead !== this.filterBy.isRead) return false
                    return mail.from === mailService.getUser().email
                })
            }
            if (this.filterBy.type === 'Garbage') {
                return this.mails.filter(mail => {
                    if (this.filterBy.isRead !== null && mail.isRead !== this.filterBy.isRead) return false
                    return mail.removedAt !== null
                })
            }
        },
    },
    components: {
        MailList,
    }
}