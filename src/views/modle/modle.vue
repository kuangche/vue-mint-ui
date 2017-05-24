<template>
    <div class="modle">
        <header-component title="模型组合"/>
        <div class="modleCon">
            <div class="chartCon">
                <div class="chartHeader">
                    <div class="total">总收益<mt-badge size="small">保障中</mt-badge></div>
                    <div class="info">
                        <span class="money">23234.23</span>
                        <span class="percent">89.33%</span>
                        <mt-badge size="small">回报率</mt-badge>
                    </div>
                </div>
                <div class="chartLine">
                    <div class="chartBox"></div>
                    <div class="chartDesc">
                        <ul>
                            <li class="first"><span class="name">达华智能</span><span class="number">+9343434.23</span></li>
                            <li class="second"><span class="name">江苏大洋</span><span class="number">+9343434.23</span></li>
                            <li class="third"><span class="name">渤海银行</span><span class="number">+543434.23</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="orderCon">
                <h3>股票收益排行</h3>
                <table>
                    <tr>
                        <th>股票名称</th>
                        <th class="right">总收益</th>
                        <th class="right">最新净值</th>
                        <th class="right">日涨幅</th>
                    </tr>
                    <tr v-for="item in stock">
                        <td>{{item.name}}</td>
                        <td class="right">{{item.income}}</td>
                        <td class="right">{{item.netValue}}</td>
                        <td class="percent right">{{item.increase}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <menu-component/>
    </div>
</template>
<script>
    import HeaderComponent from '../../components/header.vue';
    import MenuComponent from '../../components/menu.vue';
    const chart = require('./chartInit');

    export default{
        components:{
            HeaderComponent,
            MenuComponent
        },
        data(){
            return{
                stock:[
                    { name:'信捷电气', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'四方股份', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'海天精工', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'中新科技', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'海南橡胶', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'安德利', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'百合花', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'宏辉果蔬', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'陕西煤业', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' },
                    { name:'华铁科技', income:'+'+(Math.random()*1000000000).toFixed(2), netValue:'+'+(Math.random()*100000).toFixed(2), increase:(Math.random()*10).toFixed(2)+'%' }
                ]
            }
        },
        mounted(){
            chart.initPie({
                className:'chartBox'
            });
        }
    }
</script>