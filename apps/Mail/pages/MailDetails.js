import MailList from '../cmps/MailList.js'
import { mailService } from '../services/mail.service.js'
export default {
    template: `
    <section class="email-box grid details-box"> 
        <router-link to="/mail" class="back">Back</router-link>
        <table class="mails-table">
            <tr class="isRead">
                    <td><span class="bold">From: </span>{{ mail.from }}</td>
                    <td><span class="bold">To: </span>{{mail.to }}</td>
                    <td><span class="bold">Date: </span>{{ mail.sentAt }}</td>
                </tr>
        </table>

            <table class="mails-table main-message-mail">
            <tr class="isRead message"><td>
            <span><router-link to="/mail"><i class="fa-solid fa-trash"  title="Garbage" @click="moveToGarbage(mailId)"></i></router-link>|
            <i class="fa-solid fa-share-from-square" title="Replay" @click="replyMail(mailId)"></i> |
            <i class="fa-solid fa-up-right-from-square" title="Forward" @click="forwardMail(mailId)"></i></span>
            <span class="bold"> Message: </span>{{ mail.body }} </td> 
            </tr></table>
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
        this.updateMail()
        this.updateUser()
    },
    data() {
        return {
            user: '',
            mail: '',
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
        updateMail() {
            const { mailId } = this.$route.params
            mailService.get(mailId)
                .then(mail => {
                    this.mail = mail
                    this.mail.isRead = true
                    mailService.save(this.mail)
                })
        },
        moveToGarbage() {
            if (this.mail.removedAt) this.deleteMail(this.mail.id)
            else {
                this.mail.removedAt = Date.now()
                mailService.save(this.mail)
            }
        },
        deleteMail(mailId) {
            mailService.remove(mailId)
        },
        forwardMail() {
            this.newMsg.subject = this.mail.subject
            this.newMsg.msg = this.mail.body
            this.openCloseMsgModal()
        },
        replyMail() {
            this.newMsg.target = this.mail.from
            this.openCloseMsgModal()
        },
        openCloseMsgModal() {
            this.isCreateMail = !this.isCreateMail
        },
        sendMsg() {
            let NewMail = mailService.getEmptyMail()
            NewMail.id = null
            NewMail.subject = this.newMsg.subject
            NewMail.body = this.newMsg.msg
            NewMail.sentAt = Date.now()
            NewMail.to = this.newMsg.target
            mailService.save(NewMail)
            this.openCloseMsgModal()
            this.newMsg.subject = ''
            this.msg = ''
            this.newMsg.target = ''
        },
    },
    components: {
        MailList,
    },
}