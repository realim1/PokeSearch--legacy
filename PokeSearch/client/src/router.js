import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search.vue';
import Pokemon from './components/Pokemon.vue';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'search',
            component: Search
        },

        {
            path: '/pokemon/:pokemon',
            name: 'pokemon',
            component: Pokemon
        }

        
    ]
});

