export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? isRead :'']">
            <td><i class="fa-solid fa-trash" @click="deleteMail(mailId)"></i> |
            <i class="fa-solid fa-share-from-square" @click="forwardMail(mailId)"></i></td>
            <td>{{ mail.from }}</td>
            <td><RouterLink :to="'/mail/'+mail.id">{{ mail.body }}</RouterLink></td>
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
    },
    computed: {
        // return mail.isRead ? 
    }
}