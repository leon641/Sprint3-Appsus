

'use strict'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    addReview,
    getUser,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
    // .then(mails => {
    //     if (filterBy.txt) {
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         mails = mails.filter(mail => regex.test(mail.vendor))
    //     }
    //     if (filterBy.minSpeed) {
    //         mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
    //     }
    //     return mails
    // })
}

function getUser() {
    return loggedInUser
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    return {
        title: '',
        thumbnail: "img/default-img.jpg",
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?',
        listPrice: {
            amount: 0,
            currencyCode: 'USD',
        },
        pageCount: '',
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: true,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        }, {
            id: 'e102',
            subject: 'How are you?',
            body: 'I hope i will see you next week',
            isRead: false,
            sentAt: 1551133930587,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        }, {
            id: 'e103',
            subject: 'Hi user!',
            body: 'New stuff in sale in our shop!',
            isRead: false,
            sentAt: 1551133930657,
            removedAt: null,
            from: 'AliExpress@momo.com',
            to: 'user@appsus.com'
        }, {
            id: 'e104',
            subject: 'Hello',
            body: 'I need help with my order please.',
            isRead: false,
            sentAt: 155113392657,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'AliExpress@momo.com'
        }]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function addReview(mailId, review) {
    return get(mailId)
        .then(currmail => {
            if (!currmail.reviews) currmail.reviews = []
            currmail.reviews.unshift(review)
            save(currmail)
            return currmail
        })
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
        mail.nextmailId = mails[mailIdx + 1] ? mails[mailIdx + 1].id : mails[0].id
        mail.prevmailId = mails[mailIdx - 1]
            ? mails[mailIdx - 1].id
            : mails[mails.length - 1].id
        return mail
    })
}