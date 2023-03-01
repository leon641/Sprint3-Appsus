import { mailService } from '../services/mail.service.js'
import inbox from '../cmps/MailList.inbox.js'
export default {
    template: `
        <section> 
            <h1>hello user</h1>
            <ul> 
                <li>
                    <RouterLink :mails='mails' to='/inbox'>Inbox</RouterLink>
                    <!-- <RouterLink to='/send'>Send</RouterLink> | -->
                </li>
            </ul>
               <!-- <table>
                    <thead><td>From</td><td>Title</td><td>Date</td></thead>
                    <tbody>
                        <tr v-for="mail in mails" :key="mail.from"> 
                            <td>{{ mail.from }}</td>
                            <td>{{ mail.body }}</td>
                            <td>{{ mail.sentAt }}</td>
                            <td><button @click="deleteReview(review.name)">X</button></td>
                        </tr> 
                    </tbody>
                </table> -->
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
                .then(() => console.log(this.mails))
        }
    },
    components: {
        inbox,
    }
}

