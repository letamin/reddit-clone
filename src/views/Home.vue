<template>
  <div>
    <a class="button is-danger" @click="login()">Login with Google</a>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  methods: mapActions("auth", ["login"]),
};
</script>

<style scoped></style>
