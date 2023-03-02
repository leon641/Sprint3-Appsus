export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? 'isRead' : 'isUnRead']">
                <td><i class="fa-solid fa-trash" @click="deleteMail(mail.id)"></i> |
                <i class="fa-solid fa-share-from-square" @click="replyMail(mail.id)"></i> |
                <i class="fa-solid fa-up-right-from-square" @click="forwardMail(mail.id)"></i></td>
                <td>From: {{ mail.from }}</td>
                <td><RouterLink :to="'/mail/'+mail.id"
                @deleteMail="deleteMail"
                @forwardMail="forwardMail"
                @replyMail="replyMail"
                ><span class="subject">{{mail.subject}}</span> - {{mail.body }}</RouterLink></td>
                <td>{{ mail.sentAt }}</td>
            </tr> 
    `,
    methods: {
        deleteMail(mailId) {
            this.$emit('deleteMail', mailId)
        },
        forwardMail(mailId) {
            this.$emit('forwardMail', mailId)
        },
        replyMail(mailId) {
            this.$emit('replyMail', mailId)
        },
    },
}