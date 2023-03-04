import MailPreview1024 from '../cmps/MailPreview1024.js'
import MailPreview720 from '../cmps/MailPreview720.js'
import MailPreview0 from '../cmps/MailPreview0.js'

export default {
    props: ['mails'],
    template: `
        <section class="email-box grid"> 
            <i @click="isShowTools = !isShowTools" class="fa-solid fa-caret-right"></i>
            <div v-if="isShowTools" class="filter toolbar flex">
            <i @click="isShowTools = !isShowTools" class="fa-solid fa-caret-left"></i>
                <ul>
                    <li @click="setFilterBy('all')">All</li>
                    <li @click="setFilterBy('inbox')">Inbox</li>
                    <li @click="setFilterBy('send')">Send</li>
                    <li @click="setFilterBy('draft')">Draft</li>
                    <li @click="setFilterBy('Garbage')">Garbage</li>
                </ul>
            </div>
               <table class="mails-table">
                    <thead><td>
                    <li @click="updateUnread" class="fa-solid fa-filter"></li> | 
                    <li @click="WriteNewMail" class="fa-solid fa-pen-to-square"></li> 
                    </td><td v-if="medium || large"></td><td v-if="medium || large"></td><td v-if="medium || large"></td></thead>
                    <tbody v-for="mail in mails" :key="mail.id">
                        <MailPreview1024 :mail="mail"
                        v-if="large"
                        @moveToGarbage="moveToGarbage"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                        <MailPreview720 :mail="mail"
                        v-if="medium"
                        @moveToGarbage="moveToGarbage"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                        <MailPreview0 :mail="mail"
                        v-if="small"
                        @moveToGarbage="moveToGarbage"
                        @forwardMail="forwardMail"
                        @replyMail="replyMail"/>
                    </tbody>
                </table>
        </section>
    `,
    data() {
        return {
            isShowTools: false,
            isSmallScreen: false,
            isMediumScreen: false,
            isLargeScreen: false,
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
        setFilterBy(filterBy) {
            this.$emit('filter', filterBy)
            this.isShowTools = !this.isShowTools
        },
        updateUnread() {
            this.$emit('updateUnread')
        },
        WriteNewMail() {
            this.$emit('WriteNewMail')
        },
    },
    computed: {
        large() {
            this.isLargeScreen = window.innerWidth >= 1024;
            window.addEventListener('resize', () => {
                this.isLargeScreen = window.innerWidth >= 1024;
            })
            return this.isLargeScreen
        },
        medium() {
            this.isMediumScreen = window.innerWidth >= 720;
            window.addEventListener('resize', () => {
                this.isMediumScreen = window.innerWidth >= 720;
            })
            return this.isMediumScreen
        },
        small() {
            this.isSmallScreen = window.innerWidth < 720;
            window.addEventListener('resize', () => {
                this.isSmallScreen = window.innerWidth < 720;
            })
            return this.isSmallScreen
        },
    },
    components: {
        MailPreview1024,
        MailPreview720,
        MailPreview0,
    }
}