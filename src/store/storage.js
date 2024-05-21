import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state() {
        return {
            apiBaseUrl: "http://localhost:9010",
            // apiBaseUrl: "http://43.200.182.62:9033",
            authUser: null,
            token: null,
            selectedSchedule: null,
            auth: null

        };
    },
    mutations: {
        //
        setAuthUser(state, payload) {
            state.authUser = payload;
        },
        setAuthName(state, payload) {
            state.authUser.userName = payload;
        },
        setToken(state, payload) {
            state.token = payload;
        },
        setSelectedSchedule(state, schedule) {
            state.selectedSchedule = schedule;
        },
        setAuth(state, payload) {
            state.auth = payload;
        },

    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ],
    actions: {
        updateSelectedSchedule({ commit }, schedule) {
            commit('setSelectedSchedule', schedule);
        }
    },
    getters: {
        getSelectedSchedule: state => state.selectedSchedule
    }

});