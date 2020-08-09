<template>
  <section>
    <h1>
      Subreddits:
      <router-link
        v-for="subreddit in subreddits"
        :key="subreddit.name"
        :to="{ name: 'subreddit', params: { name: subreddit.name } }"
        class="subreddit-link has-text-info"
      >| {{ subreddit.name }} |</router-link>
    </h1>
    <form class="search-form">
      <b-field label="Search">
        <b-input v-model="searchTerm"></b-input>
      </b-field>
    </form>

    <div class="columns">
      <div class="column posts is-multiline col is-6">
        <div class="column is-12" v-for="(post, index) in filteredPosts" :key="post.id">
          <div class="card">
            <div class="card-image" v-if="isImage(post.URL)">
              <figure class="image">
                <img :src="post.URL" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="loadedUserById[post.user_id].image" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4" v-if="!post.URL">{{ post.title }}</p>
                  <p class="title is-4" v-else>
                    <a :href="post.URL" target="_blank">{{ post.title }}</a>
                  </p>
                  <p class="subtitle is-6">{{loadedUserById[post.user_id].name}}</p>
                </div>
              </div>

              <div class="content">
                <div v-if="!isRead">
                  <template
                    v-if="post.description.length > 30"
                  >{{post.description.slice(0,30)+ "..."}}</template>
                  <template v-else>{{post.description}}</template>
                </div>
                <b-collapse
                  :open="false"
                  aria-id="contentIdForA11y1"
                  v-if="post.description.length >= 30"
                >
                  <div
                    class="has-text-success btn-readmore"
                    slot="trigger"
                    aria-controls="contentIdForA11y1"
                    @click="isRead = !isRead"
                  >Read More</div>
                  <div class="read-more">
                    <p>{{ post.description }}</p>
                  </div>
                </b-collapse>
                <br />
                <time>{{getCreated(index)}}</time>
                <br />
                <button
                  v-if="user && user.id == post.user_id"
                  class="button is-danger btn-delete"
                  @click="deletePost(post.id)"
                >Delete Post</button>
                <router-link
                  class="button has-text-success btn-view"
                  :to="{name: 'post', params:{name: $route.params.name, post_id: post.id}}"
                >View Post</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6 post-form-container">
        <button
          class="button is-info"
          @click="showForm = !showForm"
          v-if="isLoggedIn"
        >Post Something</button>
        <form @submit.prevent="onCreatePost()" v-if="showForm" class="post-form">
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
        URL: ""
      },
      searchTerm: "",
      showForm: false,
      isRead: false
    };
  },
  mounted() {
    this.initUsers();
    this.initSubreddit(this.$route.params.name);
  },
  computed: {
    ...mapState("subreddit", ["posts"]),
    ...mapState("auth", ["isLoggedIn", "user"]),
    ...mapState("subreddits", ["subreddits"]),
    ...mapGetters({
      subreddit: "subreddit/subreddit",
      usersById: "users/usersById"
    }),

    loadedUserById() {
      return this.posts.reduce((byId, post) => {
        byId[post.user_id] = this.usersById[post.user_id] || {
          name: "Loading...",
          image: "https://bulma.io/images/placeholders/48x48.png"
        };
        return byId;
      }, {});
    },

    filteredPosts() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, "gi");
        return this.posts.filter(post =>
          (post.title + post.description).match(regexp)
        );
      }

      return this.posts;
    }
  },
  methods: {
    isImage(url) {
      return url.match(/^data:image\/(png|jpg|jpeg|gif)|(png|jpg|jpeg|gif)$/);
    },
    ...mapActions("subreddit", [
      "createPost",
      "initSubreddit",
      "initPost",
      "deletePost"
    ]),
    ...mapActions("users", ["initUsers"]),
    onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: "",
          description: "",
          URL: ""
        };
        this.showForm = false;
      }
    },
    getCreated(index) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return `${interval} years`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return `${interval} months`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return `${interval} days`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return `${interval} hours`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return `${interval} minutes`;
        }
        return `${Math.floor(seconds)} seconds`;
      }
      return timeSince(this.posts[index].created_at.seconds * 1000) < 0
        ? "0 seconds ago"
        : `${timeSince(this.posts[index].created_at.seconds * 1000)} ago`;
    }
  },
  watch: {
    "$route.params.name"() {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) this.initPost(this.subreddit.id);
    }
  }
};
</script>

<style scoped>
.posts {
  margin-top: 2em;
}

.card {
  border-radius: 4px;
  box-shadow: 3px 4px 4px;
  height: 100%;
  background-color: whitesmoke;
}

.card img {
  border-radius: 4px;
}

.search-form {
  margin-top: 2em;
}

.post-form-container {
  margin: 2em;
}

.post-form {
  margin-top: 1.5em;
}

.btn-readmore {
  text-decoration: underline;
}

.btn-readmore:hover {
  opacity: 0.7;
}

.btn-delete,
.btn-view {
  margin: 5px 5px 0 0;
}

.subreddit-link:hover {
  opacity: 0.5;
}
</style>
