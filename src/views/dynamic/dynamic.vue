<template>
    <div class="dynamic">
        <header-component title="并购动态" search="true"/>
        <div class="dynamicCon">
            <div class="filter">
                <span class="moreListIcon" @click='popupHandle'></span>
            </div>
            <div class="dataList">
                <div class="headerCon">
                    <ul class="headerItem">
                        <li :style="{ width: (wrapperWidth - 30)+ 'px' }">更新时间</li>
                        <li :style="{ width: (wrapperWidth + 60)+ 'px' }">情报标题</li>
                        <li :style="{ width: (wrapperWidth - 30)+ 'px' }">涉及行业</li>
                    </ul>
                </div>
                <div class="itemCon" @scroll = 'scrollHandle'>
                    <ul class="item" v-for="item in dynamicList" :id="item.id" @click="gotoDetailHandle">
                        <li :style="{ width: (wrapperWidth - 30)+ 'px' }">{{item.date}}</li>
                        <li :style="{ width: (wrapperWidth + 60)+ 'px' }">{{item.title}}</li>
                        <li :style="{ width: (wrapperWidth - 30)+ 'px' }">{{item.industry}}</li>
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
              scrollLeft:0,
              popupVisible:false,
              loading:false
          };
        },
        computed:{
            ...mapState({
                dynamicList: state => state.dynamic.dynamicList,
                pageNumber: state => state.dynamic.pageNumber,
                lastPage: state => state.dynamic.lastPage,
                search: state=> state.dynamic.search
            }),
        },
        methods:{
            ...mapActions({
                getDynamicList: 'getDynamicList',
            }),
            ...mapMutations({
                dataInit:'SET_DYNAMIC_DATA_INIT',
            }),
            popupHandle(){
                this.popupVisible = true;
            },
            gotoDetailHandle(e){
                const id = e.target.parentElement.id;
                this.$router.push({ name: 'dynamicDetail', params: { id: id }});
            },
            scrollHandle(e){
                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;
                const clientHeight = e.target.clientHeight;
                if(this.lastPage)return;
                if((scrollTop+clientHeight)== scrollHeight && !this.loading){
                    this.loadMore();
                }
                e.preventDefault();
            },
            loadMore() {
                const self = this;
                self.loading = true;
                setTimeout(function(){
                    self.getDynamicList({
                        searchText: self.search.searchText,
                        dateStart: self.search.dateStart,
                        dateEnd: self.search.dateEnd,
                        industry: self.search.industry,
                        pageNumber: self.pageNumber
                    }).then(function(data){
                        self.loading = false;
                    });
                },2000)
            }
        },
        mounted() {
            this.wrapperWidth = parseInt(document.documentElement.clientWidth/3);
            this.dataInit();
            this.getDynamicList({
                searchText: this.search.searchText,
                dateStart: this.search.dateStart,
                dateEnd: this.search.dateEnd,
                industry: this.search.industry,
                pageNumber:1
            });
        }
    }
</script>