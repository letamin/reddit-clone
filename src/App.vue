<template>
  <div id="app">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">Reddit clone</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control" v-if="!isLoggedIn">
              <a class="button is-danger" @click="login()">
                <span>
                  Log in with Google
                </span>
              </a>
            </p>

            <p class="control logged-in" v-if="isLoggedIn">
              <section class="avatar">
                <figure class="image is-24x24">
                  <img class="is-rounded" :src="user.image" />
                </figure>
                <figcaption>{{user.name}}</figcaption>
              </section>
              <a class="button is-primary" @click="logout()">
                <span>Log out</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <router-view class="container main" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: mapState("auth", ["user", "isLoggedIn"]),
  methods: mapActions("auth", ["login", "logout"]),
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 2em;
}
.avatar{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
}

.logged-in{
  display: flex;
  flex-direction: row;
}
</style>
