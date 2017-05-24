
/**
 * Created by jige on 2017/1/12.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import * as utils from '../../common/utils';

const state = {
    eventsData:null,
    eventsBarData:null,
    eventsList:null,
    eventsIndustryList:[],
    eventsAddressList:[],
    search:{
        searchText:'',
        dateStart:'',
        dateEnd:'',
        industry:'',
        moneyMin:'',
        moneyMax:'',
        address:'',
    },
    eventsDetail:{
        buy:{
            name:'6名自然人法人',
            type:'6名自然人法人',
            stock1:'15%',
            stock2:'34%',
            industry:'军工'
        },
        sell:{
            name:'6名自然人法人',
            type:'6名自然人法人',
            stock1:'15%',
            stock2:'34%',
            industry:'军工'
        },
        target:{
            name:'6名自然人法人',
            type:'6名自然人法人',
            stock1:'15%',
            stock2:'34%',
            industry:'军工'
        },
        detail:{
            money:'232',
            pay:'3234523',
            target:'434',
            stock:'33%',
            merge:'并购方式',
            type:'标的类型',
            goal:'bud',
            access:'shi'
        },
        process:['签署转让协议','签署转让协议']
    }
}
const mutations = {
    SET_EVENTS_DATA(state, data){
        state.eventsData = data;
    },
    SET_EVENTS_BAR_DATA(state, data){
        state.eventsBarData = data;
    },
    SET_EVENTS_LIST(state, data){
        state.eventsList = data;
    },
    SET_EVENTS_DETAIL(state, data){
        state.eventsDetail = data;
    },
    SET_EVENTS_INDUSTRY_LIST(state, data){
        state.eventsIndustryList = ['全部'].concat(data);
    },
    SET_EVENTS_ADDRESS_LIST(state, data){
        state.eventsAddressList = ['全部'].concat(data);
    },
    SET_EVENTS_SEARCH(state, data){
        state.search = data;
    }
}
const actions = {
    getEventsData:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/events_data',
                type: 'post',
                data: data,
                success(data){
                    const eventsData = data.bodyData;
                    commit('SET_EVENTS_DATA', eventsData);
                    resolve(eventsData);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getEventsBarData:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/events_order',
                type: 'post',
                data: data,
                success(data){
                    const eventsBarData = data.bodyData;
                    commit('SET_EVENTS_BAR_DATA', eventsBarData);
                    resolve(eventsBarData);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getEventsList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/events_list',
                type: 'post',
                data: data,
                success(data){
                    const eventsList = data.bodyData;
                    commit('SET_EVENTS_LIST', eventsList);
                    resolve(eventsList);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getEventsDetail:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/events_detail',
                type: 'post',
                data: data,
                success(data){
                    const eventsDetail = data.bodyData;
                    commit('SET_EVENTS_DETAIL', eventsDetail);
                    resolve(eventsDetail);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getEventsIndustryList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/industry_list',
                type: 'get',
                success(data){
                    const industryList = data.bodyData;
                    commit('SET_EVENTS_INDUSTRY_LIST', industryList);
                    resolve(industryList);
                },
                error(err){
                    reject(err.message)
                }
            })
        })
    },
    getEventsAddressList:({ commit }, data)=>{
        return new Promise((resolve, reject) => {
            utils.MyTools.ajax({
                url: '/address_list',
                type: 'get',
                success(data){
                    const addressList = data.bodyData;
                    commit('SET_EVENTS_ADDRESS_LIST', addressList);
                    resolve(addressList);
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