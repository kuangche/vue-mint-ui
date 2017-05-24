import Vue from 'vue';
import Vuex from 'vuex';

import trade from './trade/trade';
import events from './events/events';
import dynamic from './dynamic/dynamic';

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        trade: trade,
        events: events,
        dynamic: dynamic
    }
})