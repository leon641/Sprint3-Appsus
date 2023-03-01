import MailList from '../cmps/MailList.js'

export default {
    template: `
        <section class="mail-index">
            <h2>Mail box</h2>
            <h1>hello user</h1>
            <MailList />
        </section>
    `,
    components: {
        MailList,
    }
}