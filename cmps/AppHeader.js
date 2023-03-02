export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link @set-route="setRoute" to="/mail">Mail</router-link> |
                <router-link to="/note">Note</router-link> 
            </nav>
        </header>
    `,
    methods: {
        setRoute(route) {
            console.log('route', route)
        }
    }
}
