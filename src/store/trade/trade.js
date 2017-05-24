
/**
 * Created by jige on 2017/1/12.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../../common/utils';

const state = {
    tradeList:[],
    lastPage:false,
    pageNumber:1
}
const mutations = {
    SET_TRADE_DATA(state, data){
        state.tradeList = state.tradeList.concat(data);
    },
    SET_TRADE_DATA_INIT(state){
        state.tradeList = [];
        state.pageNumber = 1;
    },
    SET_TRADE_PAGE_LAST(state){
        state.lastPage = true;
    },
    SET_TRADE_PAGE_NUMBER(state){
        state.pageNumber = state.pageNumber+1;
    },
}
const actions = {
    getTradeList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/trade_list',
                type: 'post',
                data: data,
                success(data){
                    const tradeList = data.bodyData;
                    commit('SET_TRADE_DATA', tradeList);
                    commit('SET_TRADE_PAGE_NUMBER');
                    if(data.lastPage){
                        commit('SET_TRADE_PAGE_LAST');
                    }
                    resolve(tradeList);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    }
}
export default {
    state,
    mutations,
    actions
}