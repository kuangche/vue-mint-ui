
/**
 * Created by jige on 2017/1/12.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../../common/utils';

const state = {
    dynamicList:[],
    pageNumber:1,
    lastPage:false,
    dynamicDetail:{},
    dynamicIndustryList:[],
    search:{
        searchText:'',
        dateStart:'',
        dateEnd:'',
        industry:'',
    }
}
const mutations = {
    SET_DYNAMIC_DATA(state, data){
        state.dynamicList = state.dynamicList.concat(data);
    },
    SET_DYNAMIC_PAGE_NUMBER(state){
        state.pageNumber = state.pageNumber+1;
    },
    SET_DYNAMIC_PAGE_LAST(state){
        state.lastPage = true;
    },
    SET_DYNAMIC_DATA_INIT(state){
        state.dynamicList = [];
        state.pageNumber = 1;
    },
    SET_DYNAMIC_DETAIL(state, data){
        state.dynamicDetail = data;
    },
    SET_DYNAMIC_INDUSTRY_LIST(state, data){
        state.dynamicIndustryList = ['全部'].concat(data);
    },
    SET_DYNAMIC_SEARCH(state, data){
        state.search = data;
    }
}
const actions = {
    getDynamicList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/dynamic_list',
                type: 'post',
                data: {
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd,
                    industry: data.industry,
                    searchText: data.searchText,
                    pageNumber: data.pageNumber
                },
                success(data){
                    const dynamicList = data.bodyData;
                    commit('SET_DYNAMIC_DATA', dynamicList);
                    commit('SET_DYNAMIC_PAGE_NUMBER');
                    if(data.lastPage){
                        commit('SET_DYNAMIC_PAGE_LAST');
                    }
                    resolve(dynamicList);

                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getDynamicDetail:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/dynamic_detail',
                type: 'post',
                data: {
                    id: data.id,
                },
                success(data){
                    const dynamicDetail = data.bodyData;
                    commit('SET_DYNAMIC_DETAIL', dynamicDetail);
                    resolve(dynamicDetail);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getDynamicIndustryList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/industry_list',
                type: 'get',
                success(data){
                    const industryList = data.bodyData;
                    commit('SET_DYNAMIC_INDUSTRY_LIST', industryList);
                    resolve(industryList);
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