export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? 'isRead' : 'isUnRead']">
                <td><i class="fa-solid fa-trash" @click="moveToTrash(mail.id)"></i> |
                <i class="fa-solid fa-share-from-square" @click="replyMail(mail.id)"></i> |
                <i class="fa-solid fa-up-right-from-square" @click="forwardMail(mail.id)"></i></td>
                <td>{{ mail.from }}</td>
                <td><RouterLink :to="'/mail/'+mail.id"
                ><span class="bold">{{mail.subject}}</span> - {{mail.body }}</RouterLink></td>
                <td>{{ mail.sentAt }}</td>
            </tr>
            `,
    methods: {
        moveToTrash(mailId) {
            this.$emit('moveToTrash', mailId)
        },
        forwardMail(mailId) {
            this.$emit('filter', filterBy)
        },
        replyMail(mailId) {
            this.$emit('filter', filterBy)
        },
    }
}