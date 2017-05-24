/**
 * Created by jige on 2017/1/13.
 */
import echarts from "echarts";
export const  initPie = (mapOpts)=>{
    let myChart = echarts.init(document.querySelector('.' + mapOpts.className));
    myChart.setOption({
        color:['#90d2ee','#9addcf','#c8dc63','#fdb77a','#ffe66e'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '75%',
                center: ['50%', '50%'],
                data:[
                    {value:1548, name:'搜索引擎'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'}
                ],
                label:{
                    normal:{
                        show:false
                    }
                }
            }
        ]
    })
}