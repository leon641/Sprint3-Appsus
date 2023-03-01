export default {
    props: ['mail'],
    template: `
            <tr>
            <td><i class="fa-solid fa-trash" @click=" deleteMail(mailId)"></i>
            <i class="fa-solid fa-share-from-square" @click="forwardMail(mailId)"></i>
            {{ mail.from }}</td>
            <td>{{ mail.to }}</td>
            <td><RouterLink :to="'/mail/'+mail.id">{{ mail.body }}</RouterLink></td>
            <td>{{ mail.sentAt }}</td>
    </tr> 
    `,
    methods: {
        openInMailTools() {
            this.$emit('openInMailTools')
        },
        deleteMail(mailId) {
            this.$emit('deleteMail', mailId)
        },
        forwardMail(mailId) {
            this.$emit('forwardMail', mailId)
        },
    }
}