import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state() {
        return {

          apiBaseUrl: "http://localhost:9010",
         //    apiBaseUrl: "http://43.200.182.62:9010",

            authUser: null,
            token: null,
            kakaoToken : '',
            selectedSchedule: null,
            auth: null,
            groomingRecord: null, // groomingRecord 속성 추가
            dogImg: '' // 반려견 이미지 URL 저장
            

        };
    },
    mutations: {
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setAuthName(state, payload) {
            state.authUser.userName = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setKakaoToken(state,payload){
            state.kakaoToken = payload;
        },
        setSelectedSchedule(state, schedule) {
            state.selectedSchedule = schedule;
        },
        setGroomingRecord(state, groomingRecord) {
            state.groomingRecord = groomingRecord;
        },
        setAuth(state, payload) {
            state.auth = payload;
        },
        setReservationData(state, data) {
            state.reservationData = data;
        },
        setDogImg(state, imgUrl) {
            state.dogImg = imgUrl;
        },

    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token','kakaoToken', 'auth']
        })
    ],
    actions: {
        updateSelectedSchedule({ commit }, schedule) {
            commit('setSelectedSchedule', schedule);
        },
        updateReservationData({ commit }, data) {
            commit('setReservationData', data);
        },
        updateDogImg({ commit }, imgUrl) {
            commit('setDogImg', imgUrl);
        }
    },
    getters: {
        getSelectedSchedule: state => state.selectedSchedule,
        reservationData(state) {
            return state.reservationData;
        },
        getDogImg: state => state.dogImg
    },


});