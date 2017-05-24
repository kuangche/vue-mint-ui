/**
 * Created by jige on 2017/1/12.
 */
import "../../common/chinaMap";
import echarts from "echarts";
import d3 from "d3";
export const initMap = (mapOpts)=> {
    let mapChart = echarts.init(document.querySelector('.' + mapOpts.className));
    const geoData = {
        "北京": [116.46, 39.92],
        "天津": [117.2, 39.13],
        "河北省": [114.48, 38.03],
        "山西省": [112.53, 37.87],
        "内蒙古自治区": [118.87, 42.28],
        "辽宁省": [123.38, 41.8],
        "吉林省": [125.35, 43.88],
        "黑龙江省": [126.63, 45.75],
        "上海": [121.48, 31.22],
        "江苏省": [118.78333, 32.05000],
        "浙江省": [120.19, 30.26],
        "安徽省": [117.27, 31.86],
        "福建省": [118.1, 24.46],
        "江西省": [115.89, 28.68],
        "山东省": [117, 36.65],
        "广东省": [113.23, 23.16],
        "广西壮族自治区": [110.28, 25.29],
        "海南省": [110.35, 20.02],
        "河南省": [113.65, 34.76],
        "湖北省": [114.31, 30.52],
        "湖南省": [113, 28.21],
        "重庆": [106.54, 29.59],
        "四川省": [104.06, 30.67],
        "贵州省": [106.71, 26.57],
        "云南省": [102.73, 25.04],
        "西藏自治区":[91.11,29.97],
        "陕西省": [109.47, 36.6],
        "甘肃省": [103.73, 36.03],
        "青海省": [101.74, 36.56],
        "宁夏回族自治区": [106.27, 38.47],
        "新疆维吾尔自治区": [87.68, 43.77],
        "香港特别行政区":[114.186124, 22.293586],
        "澳门特别行政区":[	113.557519,	22.204118],
        "台湾省":[121.973871, 24.086957],
        "其他":[90.754987,25.577654]
    };
    const valueArr = [];
    mapOpts.chartData.data.forEach(function(item,index){
        let geoCoord = geoData[item.name];
        valueArr.push(item.value);
        mapOpts.chartData.data[index].value = geoCoord.concat(item.value)
    })

    //标注点大小范围
    const scale = d3.scale.linear().range([5,20]).domain([ valueArr.min(), valueArr.max()])
    mapChart.setOption({
        color:['rgba(252,145,50,0.8)','#c8dc63','#ffe66e','#fdb77a','#9addcf','#90d2ee','#c7a8e2'],
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
            trigger: 'item',
            formatter: function(target){
                return target.seriesName+"<br/>"+target.name +"："+target.value[2];
            }
        },
        legend: {
            y: 'bottom',
            x:'left',
            data:mapOpts.chartData.address,
            textStyle: {
                color: '#8f979b'
            }
        },
        geo: {
            map: 'china',
            roam:true,
            zoom: 1.2,
            label: {
                normal: {
                    textStyle: {
                        color: '#15e6c6',
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#A1E5FE',
                        fontSize: 15,
                    }
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#e6e6e6',
                    borderColor: '#fff',
                    borderWidth: '1',
                },
                /*移动到省市后的颜色设置*/
                emphasis: {
                    areaColor: '#e6e6e6',
                    borderColor: '#fff',
                    borderWidth: '1'
                }
            }
        },
        series: {
            name: '行业',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: mapOpts.chartData.data,
            symbolSize: function (val) {
                return scale(val[2])
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    textStyle:{
                        color:'#000'
                    },
                    show: false
                },
                emphasis: {
                    show: false
                }
            }
        }
    });
    mapChart.on('click',function(target){
        if(!utils.Tools.isEmpty(target.data)){
            const provinceName = target.data.name;
            const id = target.data.id;
            mapOpts.callBack(provinceName)
        }
    })
}

export const initBar = (chartOpts) => {
    let barChart = echarts.init(document.querySelector('.' + chartOpts.className));
    const  colorArr = ['#94b9d8','#78d1f7'];
    barChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(target){
                return target[0].seriesName+"<br/>"+target[0].name +"："+parseFloat(target[0].value).toFixed(2);
            }
        },
        grid: {
            left: 70,
            right:50,
            bottom: 10,
            top: 0
        },
        barMaxWidth: '40%',
        xAxis: {
            type: 'value',
            axisLabel: {
                show:false
            },
            axisLine: {
                show:false
            },
            splitLine: {
                show:false
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            nameTextStyle: {
                color: '#fff'
            },
            type: 'category',
            data: chartOpts.chartData.industry.reverse(),
            axisLabel: {
                textStyle: {
                    color: '#8f979b'
                }
            },
            axisLine: {
                show:false
            },
            splitLine: {
                show:false
            },
            axisTick:{
                show:false
            }
        },
        series: [
            {
                name: "行业",
                type: 'bar',
                data: chartOpts.chartData.data.reverse(),
                barWidth: 15,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(target){
                            return colorArr[target.dataIndex%2]
                        }
                    }
                }
            }
        ]
    })
    barChart.on('click',function (target) {
        const industry = target.name;
        chartOpts.callBack(industry);
    })
}