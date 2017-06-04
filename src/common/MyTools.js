/**
 * Created by jige on 2016/12/8.
 */
import Vue from 'vue';
const config = require('../../config/index');

//公共工具�?---业务相关
class MyTools {
    //本地开发端�?888
    static staticUrl = window.location.port == 8888 ? './':config.staticUrl;

    static baseUrl = window.location.port == 8888 ? './':config.baseUrl;

    static ajax(param){
        if(param.type === 'post'){
            Vue.http.post(this.baseUrl + param.url, param.data).then((res) => {
                const result = typeof(res.data) =='object' ? res.data : JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                const error = typeof(err.data) =='object' ? err.data : JSON.parse(err.data);
                param.error(error);
            })
        }else if(param.type === 'get'){
            Vue.http.get(this.baseUrl + param.url).then((res) => {
                const result = typeof(res.data) =='object' ? res.data : JSON.parse(res.data);
                param.success(result);
            }, (err) => {
                const error = typeof(err.data) =='object' ? err.data : JSON.parse(err.data);
                param.error(error);
            })
        }
    }
}

export default MyTools;
