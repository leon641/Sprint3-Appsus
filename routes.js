import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Mail from './apps/Mail/pages/MailIndex.js'
import Note from './apps/keep/pages/NoteIndex.js'
import inbox from './apps/Mail/cmps/MailList.inbox.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/mail',
			component: Mail,
		},
		{
			path: '/note',
			component: Note,
		},
		{
			path: '/inbox',
			component: inbox,
		},
	],
}

export const router = createRouter(routerOptions)
