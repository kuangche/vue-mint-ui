<template>
    <div class="trade">
        <header-component title="交易机会" search="true"/>
        <div class="tradeCon">
            <div class="filter">
                <span class="moreListIcon" @click='popupHandle'></span>
            </div>
            <div class="dataList">
                <div class="headerCon">
                    <ul class="headerItem" :style="{ width: boxWidth + 'px', left: scrollLeft + 'px'}">
                        <li :style="{ width: (wrapperWidth+50)+ 'px' }">交易标的</li>
                        <li :style="{ width: (wrapperWidth-10)+ 'px' }">价格（万元）</li>
                        <li :style="{ width: (wrapperWidth-40)+ 'px' }">地域</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">来源</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">行业</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">联系人</li>
                    </ul>
                </div>
                <div class="itemCon" @scroll = 'scrollHandle'>
                    <ul class="item" v-for="item in tradeList" :style="{ width: boxWidth + 'px' }">
                        <li :style="{ width: (wrapperWidth+50)+ 'px' }">{{item.marked}}</li>
                        <li :style="{ width: (wrapperWidth-10)+ 'px' }">
                            <span class="money">{{item.money}}</span>
                            <span class="time">{{item.date}}</span>
                        </li>
                        <li :style="{ width: (wrapperWidth-40)+ 'px' }">{{item.address}}</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">{{item.source}}</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">{{item.industry}}</li>
                        <li :style="{ width: wrapperWidth+ 'px' }">{{item.contact}}</li>
                    </ul>
                    <p v-show="loading" class="page-infinite-loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                        加载中...
                    </p>
                    <p style="text-align:center; margin:0; line-height:0.3rem;" v-show="lastPage"> 已到底... </p>
                </div>
            </div>
        </div>
        <mt-popup
          class="myMoreInfo"
          v-model="popupVisible"
          position="bottom">
          <ul class="moreInfo">
            <li><span class="share">分享</span><span class="desc">分享到更多平台</span></li>
            <li><span class="download">下载</span><span class="desc">csv下载到手机</span></li>
            <li><span class="collect">收藏</span><span class="desc">添加到我的关注</span></li>
          </ul>
        </mt-popup>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    import { mapGetters, mapActions, mapState, mapMutations} from 'vuex';

    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        data() {
          return {
            wrapperWidth:0,
            boxWidth:0,
            scrollLeft:0,
            popupVisible:false,
            loading:false
          };
        },
        computed:{
            ...mapState({
                tradeList: state => state.trade.tradeList,
                pageNumber: state => state.trade.pageNumber,
                lastPage: state => state.trade.lastPage
            }),
        },
        methods:{
            ...mapActions({
                getTradeList: 'getTradeList',
            }),
            ...mapMutations({
                dataInit:'SET_TRADE_DATA_INIT',
            }),
            scrollHandle(e){
                this.scrollLeft = '-'+e.target.scrollLeft;
                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;
                const clientHeight = e.target.clientHeight;
                if(this.lastPage)return;
                if((scrollTop+clientHeight)== scrollHeight && !this.loading){
                     this.loadMore();
                }
            },
            popupHandle(){
                this.popupVisible = true;
            },
            loadMore() {
                const self = this;
                self.loading = true;
                setTimeout(function(){
                    self.getTradeList({
                        pageNumber: self.pageNumber
                    }).then(function(data){
                        self.loading = false;
                    });
                },2000)
            }
        },
        mounted() {
          this.wrapperWidth = parseInt(document.documentElement.clientWidth/3);
          this.boxWidth = this.wrapperWidth*6;
          this.dataInit();
          this.getTradeList({
              pageNumber:1
          });
        }
    }
</script>