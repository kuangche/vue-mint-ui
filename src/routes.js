/**
 * Created by jige on 2016/11/21.
 */
import trade from './views/trade/trade.vue';
import tradeSearch from './views/trade/search.vue';
import dynamic from './views/dynamic/dynamic.vue';
import dynamicDetail from './views/dynamic/detail.vue';
import dynamicSearch from './views/dynamic/search.vue';
import events from './views/events/events.vue';
import eventsDetail from './views/events/detail.vue';
import eventsSearch from './views/events/search.vue';
import user from './views/user/user.vue';
import modle from './views/modle/modle.vue';


//定义路由，为每个路由映射一个组件
export default[
    {path: '/trade', name: 'trade', component: trade},
    {path: '/trade/search', name: 'tradeSearch', component: tradeSearch},
    {path: '/dynamic', name: 'dynamic', component: dynamic},
    {path: '/dynamic/detail/:id', name: 'dynamicDetail', component: dynamicDetail},
    {path: '/dynamic/search', name: 'dynamicSearch', component: dynamicSearch},
    {path: '/events', name: 'events', component: events},
    {path: '/events/detail/:id', name: 'eventsDetail', component: eventsDetail},
    {path: '/events/search', name: 'eventsSearch', component: eventsSearch},
    {path: '/user', name: 'user', component: user},
    {path: '/modle', name: 'modle', component: modle},
]