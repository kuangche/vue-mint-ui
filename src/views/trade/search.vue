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
                    <span :class="['dateStart',{noVal:pickerStart == '开始时间'}]"
                     @click="open('pickerStart')">{{formatDateStart}}</span> 至
                    <span :class="['dateEnd',{noVal:pickerStart == '结束时间'}]"
                     @click="open('pickerEnd')">{{formatDateEnd}}</span>
                </div>
            </div>
            <div class="quickFilter">
                <ul>
                    <li><span @click="quickHandle('week')">本周</span></li>
                    <li><span @click="quickHandle('month')">本月</span></li>
                    <li><span @click="quickHandle('quarter')">本季度</span></li>
                    <li><span @click="quickHandle('halfYear')">半年</span></li>
                    <li><span @click="quickHandle('year')">一年</span></li>
                </ul>
            </div>
            <div class="industrySelect">
                <label>行业：</label>
                <div class="selectCon" @click='popupHandle'>
                   {{industry}}
                </div>
            </div>
            <div class="moneySelect">
                <label>金额：</label>
                <div class="selectCon">
                    <input class="moneyStart" type="text" placeholder="最小金额"/> 至
                    <input class="moneyEnd" type="text" placeholder="最大金额"/>
                </div>
            </div>
            <mt-button class="submit" type="primary" @click="submitHandle">提交</mt-button>

            <mt-datetime-picker
              ref="pickerStart"
              type="date"
              v-model="pickerStart"
              @confirm="handleChange">
            </mt-datetime-picker>

            <mt-datetime-picker
              ref="pickerEnd"
              type="date"
              v-model="pickerEnd"
              @confirm="handleChange">
            </mt-datetime-picker>

            <mt-popup
              class="industryListPop"
              v-model="popupVisible"
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
                popupVisible:false,
                industry:'全部',
                pickerStart: utils.moment().format('YYYY-MM-DD'),
                pickerEnd: utils.moment().format('YYYY-MM-DD'),
                industryList: [{
                    flex: 1,
                    values: ['军工', '服务', '信息', '重工']
                }],
            };
        },
        computed:{
            formatDateStart(){
                return utils.moment(this.pickerStart).format('YYYY-MM-DD')
            },
            formatDateEnd(){
                return utils.moment(this.pickerEnd).format('YYYY-MM-DD')
            }
        },
        methods:{
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
            popupHandle(){
                this.popupVisible = true;
            },
            onIndustryChange(picker, values) {
                this.industry = values[0];
              },
            open(picker) {
                this.$refs[picker].open();
            },
            handleChange(value) {
                alert(utils.moment(value).format('YYYY-MM-DD'))
            },
            submitHandle(){
                this.$router.push('/trade');
            }
        }
    }
</script>