import { firestoreAction } from "vuexfire"
import db from "@/db"

const state = {
    users: [],
}

const getters = {
    usersById(state) {
        return state.users.reduce((byId, user) => {
            byId[user.id] = user;
            return byId;
        }, {})
    }
}

const actions = {
    initUsers: firestoreAction(function (context) {
        context.bindFirestoreRef('users', db.collection('users'))
    }),
}

export default {
    namespaced: true,
    state,
    actions,
    getters
}