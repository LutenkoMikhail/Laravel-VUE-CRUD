require('./bootstrap');

window.Vue = require('vue');

import App from './components/app'
import Navbar from './components/parts/navbar'
import Basement from './components/parts/basement'
import Posts from './components/pages/posts/index'
import ValidationErrors from "./components/parts/ValidationErrors";



Vue.component('navbar',Navbar);
Vue.component('posts',Posts);
Vue.component('validation-errors',ValidationErrors);
Vue.component('basement',Basement);


const app = new Vue({
    el: '#app',
    render: h => h(App)
});


