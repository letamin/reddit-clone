import firebase from '@/firebase';
import store from '@/store';
import db from '@/db';
import router from '@/router';

export default firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.user) {
            user = user.user;
        }
        const setUser = {
            id: user.uid,
            name: user.displayName,
            image: user.photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        };
        db.collection('users').doc(setUser.id).set(setUser);
        store.commit('auth/setUser', setUser);
        const path = `/subreddits`;
        if (router.app._route.fullPath != path) router.push(`${path}`)
    } else {
        store.commit('auth/setUser', null);
    }
});

