require('./bootstrap');

window.Vue = require('vue');

import App from './components/app'
import Navbar from './components/parts/navbar'
import Basement from './components/parts/basement'
import Posts from './components/pages/posts/index'



Vue.component('navbar',Navbar);
Vue.component('posts',Posts);
Vue.component('basement',Basement);


const app = new Vue({
    el: '#app',
    render: h => h(App)
});


