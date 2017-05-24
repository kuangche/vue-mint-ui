<template>
    <div class="events">
        <header-component title="并购事件" search="true"/>
        <div class="eventsCon">
            <div class="pageTab">
              <span :class="[active === 'industry' ? 'curr' :'']" @click.native="clickHandle('industry')">行业</span>
              <span>时间</span>
              <span>金额</span>
              <span>进程</span>
            </div>
            <div class="chartBox">
                <div class="mapBox"></div>
                <div class="orderCon">
                    <div class="orderHeader">
                        <span class="title">行业标的数量排名</span>
                        <div class="total">
                            <span class="address">{{currProvince}}</span>
                            <span class="number">{{currProvinceTotal}}</span>
                        </div>
                    </div>
                    <div class="orderBox"></div>
                </div>
                <div :class="['moreInfo',{showUp:eventsListVisible}]" @click="moreInfoHandle"><span>查看列表详情</span></div>
                <div class="dataList" v-show="eventsListVisible">
                    <div class="headerCon">
                        <ul class="headerItem">
                            <li :style="{ width: (wrapperWidth -30)+ 'px' }">更新时间</li>
                            <li :style="{ width: (wrapperWidth +60)+ 'px' }">情报标题</li>
                            <li :style="{ width: (wrapperWidth -30)+ 'px' }">涉及行业</li>
                        </ul>
                    </div>
                    <div class="itemCon">
                        <ul class="item" v-for="item in eventsList" :id="item.id" @click="gotoDetailHandle">
                            <li :style="{ width: (wrapperWidth -30)+ 'px' }">{{item.date}}</li>
                            <li :style="{ width: (wrapperWidth +60)+ 'px' }">{{item.title}}</li>
                            <li :style="{ width: (wrapperWidth -30)+ 'px' }">{{item.industry}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    import { mapGetters, mapActions, mapState } from 'vuex';
    const chart = require('./chartInit');

    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        data() {
            return {
              active: 'industry',
              eventsListVisible:false,
              wrapperWidth:0,
              currProvince:null,
              currProvinceTotal:0
            };
        },
        computed:{
            ...mapState({
                eventsList: state => state.events.eventsList,
                search: state=> state.events.search
            }),
        },
        methods:{
            ...mapActions({
                getEventsData:'getEventsData',
                getEventsBarData: 'getEventsBarData',
                getEventsList:'getEventsList'
            }),
            clickHandle(type){
                this.active = type;
                this.pageInit();
            },
            gotoDetailHandle(e){
                const id = e.target.parentElement.id;
                this.$router.push({ name: 'eventsDetail', params: { id: id }});
            },
            moreInfoHandle(){
                this.eventsListVisible = !this.eventsListVisible;
            },
            mapInit(){
                const self = this;
                this.getEventsData({
                    searchText:this.search.searchText,
                    dateStart:this.search.dateStart,
                    dateEnd:this.search.dateEnd,
                    industry:this.search.industry,
                    address:this.search.address,
                    moneyMin:this.search.moneyMin,
                    moneyMax:this.search.moneyMax,
                }).then(function(data){
                    chart.initMap({
                        className: 'mapBox',
                        chartData: data,
                        callBack: self.barInit
                    });
                    self.barInit(data.data[0].name);
                })
            },
            barInit(provinceName){
                const self = this;
                this.currProvince = provinceName;
                this.getEventsBarData({
                    searchText:this.search.searchText,
                    dateStart:this.search.dateStart,
                    dateEnd:this.search.dateEnd,
                    industry:this.search.industry,
                    moneyMin:this.search.moneyMin,
                    moneyMax:this.search.moneyMax,
                    province:provinceName,
                }).then(function(data){
                    let total = 0;
                    data.data.forEach(function(item,index){
                        total += parseInt(item)
                    })
                    self.currProvinceTotal = total;
                    chart.initBar({
                        className: 'orderBox',
                        chartData: data,
                        callBack: self.listInit
                    })
                    self.listInit(data.industry[0]);
                })
            },
            listInit(industry){
                this.getEventsList({
                    searchText:this.search.searchText,
                    dateStart:this.search.dateStart,
                    dateEnd:this.search.dateEnd,
                    moneyMin:this.search.moneyMin,
                    moneyMax:this.search.moneyMax,

                    industry:industry,
                    province:this.currProvince,
                })
            },
            pageInit(){
                this.mapInit()
            }
        },
        mounted(){
            this.wrapperWidth = parseInt(document.documentElement.clientWidth/3);
            this.pageInit();
        }
    }
</script>