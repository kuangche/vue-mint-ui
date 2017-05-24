/**
 * Created by jige on 2016/11/21.
 */
import Vue from 'vue';
import Resource from 'vue-resource';
import VueRouter from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue';
import routes from './routes'
import store from './store/store';
import * as utils from './common/utils'
import './common/mockData';

Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(MintUI);

//创建router实例，然后传入routers配置
const router = new VueRouter({
    routes
});

//注册一个全局的 before 钩子,管理用户登录跳转
router.beforeEach(({meta,path}, from, next) => {
    if(path === '/'){
        return next({path: '/events'})
    }
    next();
})

new Vue({
    router,
    store,
    components:{
        App
    },
    template: `<App/> `
}).$mount('#appBox')