<template>
    <mt-tabbar fixed>
        <mt-tab-item id="events">
            <router-link to="/events">
                <span class="eventsIcon"></span><br/>并购事件
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="dynamic">
            <router-link to="/dynamic">
                <span class="dynamicIcon"></span><br/>并购动态
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="trade">
            <router-link to="/trade">
                <span class="tradeIcon"></span><br/>交易机会
            </router-link>
        </mt-tab-item>
        <mt-tab-item id="user">
            <router-link to="/user">
                <span class="userIcon"></span><br/>我
            </router-link>
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
    export default {
    }
</script>