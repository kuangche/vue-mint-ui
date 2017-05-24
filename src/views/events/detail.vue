<template>
    <div class="eventsDetail">
        <header-component title="并购事件"/>
        <div class="eventsDetailCon">
            <div class="topInfo">
                <h3>交易参与方</h3>
                <div class="topInfoCon">
                    <ul class="topInfoHeader">
                        <li :class="{curr:eventsType =='buy'}" @click="tabHandle('buy')"><span>竞买方资料</span></li>
                        <li :class="{curr:eventsType =='sell'}" @click="tabHandle('sell')"><span>出让方资料</span></li>
                        <li :class="{curr:eventsType =='target'}" @click="tabHandle('target')"><span>标的方资料</span></li>
                    </ul>
                    <ul class="detailInfo" v-show="eventsType =='buy'">
                        <li><span class="title">竞买方名称</span><span class="value">{{eventsDetail.buy.name}}</span></li>
                        <li><span class="title">企业性质</span><span class="value">{{eventsDetail.buy.type}}</span></li>
                        <li><span class="title">转让前持股</span><span class="value">{{eventsDetail.buy.stock1}}%</span></li>
                        <li><span class="title">转让后持股</span><span class="value">{{eventsDetail.buy.stock2}}%</span></li>
                        <li><span class="title">行业</span><span class="value">{{eventsDetail.buy.industry}}</span></li>
                    </ul>
                    <ul class="detailInfo" v-show="eventsType =='sell'">
                        <li><span class="title">出让方名称</span><span class="value">{{eventsDetail.buy.name}}</span></li>
                        <li><span class="title">企业性质</span><span class="value">{{eventsDetail.buy.type}}</span></li>
                        <li><span class="title">转让前持股</span><span class="value">{{eventsDetail.buy.stock1}}%</span></li>
                        <li><span class="title">转让后持股</span><span class="value">{{eventsDetail.buy.stock2}}%</span></li>
                        <li><span class="title">行业</span><span class="value">{{eventsDetail.buy.industry}}</span></li>
                    </ul>
                    <ul class="detailInfo" v-show="eventsType =='target'">
                        <li><span class="title">标的方名称</span><span class="value">{{eventsDetail.buy.name}}</span></li>
                        <li><span class="title">企业性质</span><span class="value">{{eventsDetail.buy.type}}</span></li>
                        <li><span class="title">PE</span><span class="value">{{eventsDetail.buy.stock1}}%</span></li>
                        <li><span class="title">PB</span><span class="value">{{eventsDetail.buy.stock2}}%</span></li>
                        <li><span class="title">行业</span><span class="value">{{eventsDetail.buy.industry}}</span></li>
                    </ul>
                </div>
            </div>

            <div class="tradeDetail">
                <h3>交易详情</h3>
                <div class="tradeDetailCon">
                    <ul class="tableStyle">
                        <li><span class="title">交易价值</span><span class="value">{{eventsDetail.detail.money}}万</span></li>
                        <li><span class="title">现金支付</span><span class="value">{{eventsDetail.detail.pay}}万</span></li>
                        <li><span class="title">评估价格</span><span class="value">{{eventsDetail.detail.target}}万</span></li>
                        <li><span class="title">股权转让</span><span class="value">{{eventsDetail.detail.stock}}%</span></li>
                    </ul>
                    <ul class="tableStyle">
                        <li><span class="title">并购方式</span><span class="value">{{eventsDetail.detail.merge}}</span></li>
                        <li><span class="title">标的类型</span><span class="value">{{eventsDetail.detail.type}}</span></li>
                        <li><span class="title">并购目的</span><span class="value">{{eventsDetail.detail.goal}}</span></li>
                        <li><span class="title">控制权变更</span><span class="value">{{eventsDetail.detail.access}}</span></li>
                    </ul>
                </div>
            </div>

            <div class="process">
                <h3>进展描述</h3>
                <ul>
                    <li v-for="item in eventsDetail.process">
                    <span class="title">最新交易进度：</span>{{item}}</span>
                    </li>
                </ul>
            </div>
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
        data(){
            return{
                eventsType:'buy'
            }
        },
        computed:{
            ...mapState({
                eventsDetail: state => state.events.eventsDetail,
            })
        },
        methods:{
            ...mapActions({
                getEventsDetail: 'getEventsDetail',
            }),
            tabHandle(type){
                this.eventsType = type;
            }
        },
        mounted(){
            this.getEventsDetail({
                id:this.$route.params.id
            })
        }
    }
</script>