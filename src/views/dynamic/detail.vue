<template>
    <div class="dynamicDetail">
        <header-component title="并购动态"/>
        <div class="dynamicDetailCon">
            <div class="chartCon">
                <h3>{{dynamicDetail.title}}</h3>
                <div class="chartBox"></div>
            </div>
            <div class="middleInfo">
                <ul class="headerLine">
                    <li>涉及金额</li>
                    <li>股份</li>
                    <li>进度</li>
                </ul>
                <ul class="body">
                    <li class="money">{{dynamicDetail.money}}</li>
                    <li>{{dynamicDetail.stock}}</li>
                    <li :class="{status: dynamicDetail.process=='完成'}">{{dynamicDetail.process}}</li>
                </ul>
            </div>
            <div class="companyDeatil">
                <h3>正文</h3>
                <div class="companyDeatilCon">{{dynamicDetail.detail}}</div>
            </div>
            <ul class="companyTimeLine">
                <li v-for="item in dynamicDetail.timeLine">
                    <span class="time">{{item.date}}</span>
                    {{item.text}}
                </li>
            </ul>
        </div>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    import { mapGetters, mapActions, mapState } from 'vuex';

    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        computed:{
            ...mapState({
                dynamicDetail: state => state.dynamic.dynamicDetail,
            })
        },
        methods:{
            ...mapActions({
                getDynamicDetail: 'getDynamicDetail',
            })
        },
        mounted(){
            this.getDynamicDetail({
                id:this.$route.params.id
            })
        }
    }
</script>