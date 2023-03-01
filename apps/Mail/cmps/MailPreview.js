export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? isRead :'']">
            <td><i class="fa-solid fa-trash" @click="deleteMail(mail.id)"></i> |
            <i class="fa-solid fa-share-from-square" @click="replyMail(mail.id)"></i> |
            <i class="fa-solid fa-up-right-from-square" @click="forwardMail(mail.id)"></i></td>
            <td>From: {{ mail.from }}</td>
            <td><RouterLink :to="'/mail/'+mail.id"
            @deleteMail="deleteMail"
            @forwardMail="forwardMail"
            @replyMail="replyMail"
            >{{ mail.body }}</RouterLink></td>
            <td>{{ mail.sentAt }}</td>
    </tr> 
    `,
    data() {
        return {
            isRead: 'isRead',
        }
    },
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