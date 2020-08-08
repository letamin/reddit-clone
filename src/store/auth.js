import firebase from "@/firebase";

const state = {
    user: {},
    isLoggedIn: false
}

const namespaced = true;
const mutations = {
    setUser(state, user) {
        if (user) {
            state.user = user;
            state.isLoggedIn = true;
            console.log(user)
        } else {
            state.user = {};
            state.isLoggedIn = false;
        }
    }
}

const actions = {
    async login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    },
    async logout() {
        await firebase.auth().signOut();
    }
}

export default {
    namespaced,
    state,
    actions,
    mutations
}