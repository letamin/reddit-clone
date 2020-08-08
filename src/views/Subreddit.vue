<template>
  <section>
    <h1>{{ subreddit.name }}</h1>
    <button class="button is-primary" @click="showForm = !showForm">
      Toggle Form
    </button>
    <form @submit.prevent="onCreatePost()" v-if="showForm">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Description">
        <b-input type="textarea" v-model="post.description"></b-input>
      </b-field>
      <b-field label="URL">
        <b-input v-model="post.URL" type="url"></b-input>
      </b-field>
      <button class="button is-success">Add Post</button>
    </form>
    <div class="columns posts">
      <div class="card column is-4" v-for="post in posts" :key="post.id">
        <div class="card-image" v-if="isImage(post.URL)">
          <figure class="image">
            <img :src="post.URL" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4" v-if="!post.URL">{{ post.title }}</p>
              <p class="title is-4" v-else>
                <a :href="post.URL" target="_blank">{{ post.title }}</a>
              </p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            {{ post.description }}
            <br />
            <time datetime="2016-1-1">{{ post.created_at }}</time>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
// import db from "@/db";
export default {
  data() {
    return {
      post: {
        title: "",
        description: "",
        URL: "",
      },
      showForm: false,
    };
  },
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  computed: {
    ...mapState("subreddit", ["posts"]),
    ...mapGetters("subreddit", ["subreddit"]),
  },
  methods: {
    isImage(url) {
      console.log(url);
      return url.match(/^data:image\/(png|jpg|jpeg|gif)|(png|jpg|jpeg|gif)$/);
    },
    ...mapActions("subreddit", ["createPost", "initSubreddit", "initPost"]),
    onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: "",
          description: "",
          URL: "",
        };
      }
    },
  },
  watch: {
    "$route.params.name"() {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) this.initPost(this.subreddit.id);
    },
  },
};
</script>

<style scoped>
.posts {
  margin-top: 2em;
}
</style>
