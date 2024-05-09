import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state() {
        return {
            apiBaseUrl: "http://localhost:9033",
            // apiBaseUrl: "http://13.125.251.10:9033",
            authUser: null,
            token: null

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
        
    },
    plugins: [
        createPersistedState({
            paths: ['authUser', 'token']
        })
    ]

});