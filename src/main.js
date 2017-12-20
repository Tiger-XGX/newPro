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
import newsinfo from "./components/news/newsinfo.vue";
import detailphoto from "./components/photo/detailphoto.vue"
import photolist from "./components/photo/photolist.vue";
import goodslist from "./components/goods/goodslist.vue";
import goodsinfo from "./components/goods/goodsinfo.vue";
import detailgoods from "./components/goods/detailgoods.vue";
import commentgoods from "./components/goods/commentgoods.vue";
import vueResource from "vue-resource";
Vue.use(vueResource);
import vuePicturePreview from 'vue-picture-preview';
Vue.use(vuePicturePreview);
import moment from "moment";
import common from "./common/common";
Vue.prototype.Common = common;
var router = new VueRouter({
    linkActiveClass: "mui-active",
    routes: [
        {
            path: "/", redirect: "/home"
        },
        {
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
        },
        {
            path: "/news/newsinfo/:name",
            component: newsinfo
        },
        {
            path: "/photo/photolist",
            component: photolist
        },
        {
            path: "/photo/photolist/detailphoto/:id",
            component: detailphoto
        },
        {
            path: "/goods/goodslist",
            component: goodslist
        },
        {
            path: "/goods/goodslist/goodsinfo/:id",
            component: goodsinfo
        },
        {
            path: "/goods/goodslist/goodsinfo/:id/detailgoods",
            component: detailgoods
        },
        {
            path: "/goods/goodslist/goodsinfo/:id/commentgoods",
            component: commentgoods
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