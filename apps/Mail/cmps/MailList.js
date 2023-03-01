import { mailService } from '../services/mail.service.js'
export default {
    template: `
        <section class="email-box grid"> 
            <div class="toolbar flex">
                <ul>
	            <li><a href="#">All  </a></li>
	            <li><a href="#">Inbox</a></li>
	            <li><a href="#">Send </a></li>
	            <li><a href="#">Draft</a></li>
                </ul>
            </div>
               <table class="mails-table">
                    <thead><td>From</td><td>To</td><td>Title</td><td>Date</td></thead>
                    <tbody>
                        <tr v-for="mail in mails" :key="mail.from"> 
                            <td>{{ mail.from }}</td>
                            <td>{{ mail.to }}</td>
                            <td>{{ mail.body }}</td>
                            <td>{{ mail.sentAt }}</td>
                            <!-- <td><button @click="deleteReview(review.name)">X</button></td> -->
                        </tr> 
                    </tbody>
                </table>
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
        }
    },
}

