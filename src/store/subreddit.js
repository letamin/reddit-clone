import { firestoreAction } from "vuexfire"
import db from "@/db";
import firebase from "firebase";

const posts = db.collection('posts')

const state = {
    subreddits: [],
    posts: [],
}

const getters = {
    subreddit: (state) => state.subreddits[0] ? state.subreddits[0] : {}
}

const namespaced = true;

const actions = {
    async createPost({ getters }, post) {
        const result = posts.doc()
        post.id = result.id;
        post.subreddit_id = getters.subreddit.id;
        post.user_id = firebase.auth().currentUser.uid;
        post.created_at = firebase.firestore.FieldValue.serverTimestamp();
        post.updated_at = firebase.firestore.FieldValue.serverTimestamp();
        await posts.doc(post.id).set(post);
    },
    initSubreddit: firestoreAction(function (context, name) {
        context.bindFirestoreRef('subreddits', db.collection('subreddits').where('name', '==', name))
    }),
    initPost: firestoreAction(function (context, subreddit_id) {
        context.bindFirestoreRef('posts', posts.where('subreddit_id', '==', subreddit_id))
    }),
}

export default {
    namespaced,
    state,
    actions,
    getters
}