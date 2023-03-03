export default {
    props: ['mail'],
    template: `
            <tr :class="[(mail.isRead)? 'isRead' : 'isUnRead']">
                <td>
                <span><i class="fa-solid fa-trash" title="Garbage" @click="moveToGarbage(mail.id)"></i> |
                <i class="fa-solid fa-share-from-square" title="Replay" @click="replyMail(mail.id)"></i> |
                <i class="fa-solid fa-up-right-from-square"  title="Forward" @click="forwardMail(mail.id)"></i></span>    
                {{ mail.from }}</td>
                <td><RouterLink :to="'/mail/'+mail.id"
                ><span class="bold">{{mail.subject}}</span> - {{mail.body }}</RouterLink></td>
                <td>{{ sentAt }}</td>
            </tr>
            `,
    data() {
        return {
            sentAt: new Intl.DateTimeFormat('en-GB',
                { dateStyle: 'short', timeStyle: 'short', timeZone: 'Israel' }).format(this.mail.sentAt),
        }
    },
    methods: {
        moveToGarbage(mailId) {
            this.$emit('moveToGarbage', mailId)
        },
        forwardMail(mailId) {
            this.$emit('forwardMail', mailId)
        },
        replyMail(mailId) {
            this.$emit('replyMail', mailId)
        },
    },
}