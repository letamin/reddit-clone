import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Subreddits from "../views/Subreddits.vue";
import Subreddit from "../views/Subreddit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/subreddits",
    name: "subreddits",
    component: Subreddits
  },
  {
    path: "/r/:name",
    name: "subreddit",
    component: Subreddit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
