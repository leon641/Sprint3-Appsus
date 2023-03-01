export default {
    props: ['mails'],
    template: `
        <section>
            <h1>hello</h1>
                <table>
                    <thead><td>From</td><td>Title</td><td>Date</td></thead>
                    <tbody>
                        <tr v-for="mail in mails" :key="mail.from"> 
                            <td>{{ mail.from }}</td>
                            <td>{{ mail.body }}</td>
                            <td>{{ mail.sentAt }}</td>
                            <td><button @click="deleteReview(review.name)">X</button></td>
                        </tr> 
                    </tbody>
                </table>
        </section>
    `,
}