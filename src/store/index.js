import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations } from 'vuexfire'; // sync states in vuex with database in firestore

import auth from "./auth";
import subreddits from "./subreddits"
import subreddit from "./subreddit";
import users from "./users"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: vuexfireMutations,
  actions: {},
  modules: {
    users,
    auth,
    subreddits, // All of the subreddits
    subreddit   // Individual subreddit
  }
});
