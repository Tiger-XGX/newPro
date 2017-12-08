import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Mint from 'mint-ui';
Vue.use(Mint);
import "mint-ui/lib/style.css";
import "../statics/mui/css/mui.css";
import "../statics/css/site.css";
import Home from "./components/Home.vue";
import car from "./components/shopcar/car.vue";
import newlist from "./components/news/newlist.vue";
import vueResource from "vue-resource";
import moment from "moment";
Vue.use(vueResource);
var router = new VueRouter({
    linkActiveClass: "mui-active",
    routes: [{
        path: "/home",
        component: Home
    },
    {
        path: "/shopcar",
        component: car
    },
    {
        path: "/news/newlist",
        component: newlist
    }
    ]
});
Vue.filter("datafmt", function (input) {
    return moment(input).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
    el: "#app",
    router,
    render: (c) => c(App)
})