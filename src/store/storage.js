import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state() {
        return {
            // apiBaseUrl: "http://localhost:9010",
            apiBaseUrl: "http://43.200.182.62:9033",
            authUser: null,
            token: null,
            kakaoToken : '',
            selectedSchedule: null,
            auth: null,
            groomingRecord: null, // groomingRecord 속성 추가

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

    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token','kakaoToken']
        })
    ],
    actions: {
        updateSelectedSchedule({ commit }, schedule) {
            commit('setSelectedSchedule', schedule);
        },
        updateReservationData({ commit }, data) {
            commit('setReservationData', data);
        }
    },
    getters: {
        getSelectedSchedule: state => state.selectedSchedule,
        reservationData(state) {
            return state.reservationData;
        }
    },


});