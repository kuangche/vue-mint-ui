/**
 * Created by jige on 2016/12/8.
 */
import Vue from 'vue';

//公共工具类
class Tools {
    static alt(data) {
        alert(data)
    }

    static getHash() {
        return location.hash;
    }

    static getPathname() {
        return location.pathname;
    }

    static getStrLen(str) {
        //计算字符串长度(英文占1个字符，中文汉字占2个字符)
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
        }

        return len;
    }

    static isEmpty(param) {
        if (typeof param == 'object') {
            /* 是否为数组 */
            if ((param == null) || (Object.prototype.toString.call(param) === '[object Array]' && param.length == 0) ||
                (param.hasOwnProperty('length') && param.length == 0)) {
                return true;
            }
            for (var name in param) {
                return false;
            }
            return true;
        }
        return (typeof param == 'undefined' || (typeof param == 'string' && param == '') || (typeof param == 'number' && isNaN(param)));
    }

    //写cookies
    static setCookie(name, value, day) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    //读取cookies
    static getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    //删除cookies
    static delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

export default Tools;