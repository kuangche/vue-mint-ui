/**
 * Created by jige on 2016/12/8.
 */
import Vue from 'vue';
const config = require('../../config/index');

//公共工具类----业务相关
class MyTools {
    //本地开发端口8888
    static staticUrl = window.location.port == 8888 ? './':config.staticUrl;

    static baseUrl = window.location.port == 8888 ? './':config.baseUrl;

    static ajax(param){
        if(param.type === 'post'){
            Vue.http.post(this.baseUrl + param.url, param.data).then((res) => {
                const result = JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                param.error(err);
            })
        }else if(param.type === 'get'){
            Vue.http.get(this.baseUrl + param.url).then((res) => {
                const result = JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                param.error(err);
            })
        }
    }
}

export default MyTools;