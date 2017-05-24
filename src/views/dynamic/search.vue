<template>
    <div class="search">
        <header-component title="搜索"/>
        <div class="searchCon">
            <div class="keyWordSelect">
                <label>关键字：</label>
                <div class="selectCon">
                   <input type="text" v-model="keyword" placeholder="查询关键字"/>
                </div>
            </div>
            <div class="dateSelect">
                <label>日期：</label>
                <div class="selectCon">
                    <span class="dateStart" @click="openDatePicker('pickerStart')">{{formatDateStart}}</span> 至
                    <span class="dateEnd" @click="openDatePicker('pickerEnd')">{{formatDateEnd}}</span>
                </div>
            </div>
            <div class="quickFilter">
                <ul>
                    <li><mt-button size="small" @click="quickHandle('week')">本周</mt-button></li>
                    <li><mt-button size="small" @click="quickHandle('month')">本月</mt-button></li>
                    <li><mt-button size="small" @click="quickHandle('quarter')">本季度</mt-button></li>
                    <li><mt-button size="small" @click="quickHandle('halfYear')">半年</mt-button></li>
                    <li><mt-button size="small" @click="quickHandle('year')">一年</mt-button></li>
                </ul>
            </div>
            <div class="industrySelect">
                <label>行业：</label>
                <div class="selectCon" @click='industryShowHandle'>
                   {{industry}}
                </div>
            </div>
            <mt-button class="submit" type="primary" @click='submitHandle'>提交</mt-button>
            <!--开始时间-->
            <mt-datetime-picker
                class="pickerStartPop"
                ref="pickerStart"
                type="date"
                v-model="pickerStart">
            </mt-datetime-picker>
            <!--结束时间-->
            <mt-datetime-picker
                class="pickerEndPop"
                ref="pickerEnd"
                type="date"
                v-model="pickerEnd">
            </mt-datetime-picker>

           <!--行业列表-->
            <mt-popup
                class="industryListPop"
                v-model="industryVisible"
                position="bottom">
                <mt-picker :slots="industryList" @change="onIndustryChange" :visible-item-count="3"></mt-picker>
            </mt-popup>
        </div>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    import { mapGetters, mapActions, mapState, mapMutations} from 'vuex';
    import * as utils from '../../common/utils';
    window.utils = utils;

    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        data() {
            return {
                keyword:'',
                industryVisible:false,
                industry:'全部',
                pickerStart: utils.moment().subtract(1,'year').format('YYYY-MM-DD'),
                pickerEnd: utils.moment().format('YYYY-MM-DD')
            };
        },
        computed:{
            ...mapState({
                dynamicIndustryList: state => state.dynamic.dynamicIndustryList,
            }),
            industryList(){
                return [{
                   flex: 1,
                   values: this.dynamicIndustryList
                }]
            },
            formatDateStart(){
                return utils.moment(this.pickerStart).format('YYYY-MM-DD')
            },
            formatDateEnd(){
                return utils.moment(this.pickerEnd).format('YYYY-MM-DD')
            }
        },
        methods:{
            ...mapMutations({
                setSearchData:'SET_DYNAMIC_SEARCH'
            }),
            ...mapActions({
                getDynamicIndustryList: 'getDynamicIndustryList',
            }),
            quickHandle(type){
                let startDate = null;
                let endDate = null;
                switch(type){
                case 'week':
                    startDate = utils.moment().startOf('week').format('YYYY-MM-DD');
                    endDate = utils.moment().endOf('week').format('YYYY-MM-DD');
                    break;
                case 'month':
                    startDate = utils.moment().startOf('month').format('YYYY-MM-DD');
                    endDate = utils.moment().endOf('month').format('YYYY-MM-DD');
                    break;
                case 'quarter':
                    startDate = utils.moment().startOf('quarter').format('YYYY-MM-DD');
                    endDate = utils.moment().endOf('quarter').format('YYYY-MM-DD');
                    break;
                case 'halfYear':
                    startDate = utils.moment().startOf('quarter').format('YYYY-MM-DD');
                    endDate = utils.moment().format('YYYY')+'-06-30';
                    break;
                case 'year':
                    startDate = utils.moment().startOf('year').format('YYYY-MM-DD');
                    endDate = utils.moment().endOf('year').format('YYYY-MM-DD');
                    break;
                }
                this.pickerStart = startDate;
                this.pickerEnd = endDate
            },
            onIndustryChange(picker, values) {
                this.industry = values[0];
            },
            openDatePicker(picker) {
                this.$refs[picker].open();
            },
            industryShowHandle(){
                this.industryVisible = true;
            },
            submitHandle(){
                let startDate='',endDate='';
                if(utils.moment(this.pickerStart).isBefore(utils.moment(this.pickerEnd))){
                    startDate = utils.moment(this.pickerStart).format('YYYY-MM-DD');
                    endDate = utils.moment(this.pickerEnd).format('YYYY-MM-DD');
                }else{
                    startDate = utils.moment(this.pickerEnd).format('YYYY-MM-DD');
                    endDate = utils.moment(this.pickerStart).format('YYYY-MM-DD');
                }
               this.setSearchData({
                    searchText:this.keyword,
                    dateStart:startDate,
                    dateEnd:endDate,
                    industry:this.industry == '全部' ? '': this.industry
               });
               this.$router.push('/dynamic')
            }
        },
        mounted(){
            this.getDynamicIndustryList();
        }
    }
</script>