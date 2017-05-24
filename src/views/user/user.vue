<template>
    <div class="user">
        <header-component title="我" setting="true"/>
        <div class="userCon">
            <mt-cell title="Hywin" label="个人中心：VP" is-link class="userInfo">
            <span class="account">我的账号</span>
            <span class="userPic"><img :src="userSrc"/></span>
            </mt-cell>
            <mt-cell title="我的收藏" is-link class="collect"><span class="icon"></span></mt-cell>
            <mt-cell title="我的关注" is-link class="attention"><span class="icon"></span></mt-cell>
        </div>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    import * as utils from '../../common/utils';
    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        data() {
          return {
            userSrc: utils.MyTools.staticUrl+'images/userIcon.png',
          };
        },
    }
</script>