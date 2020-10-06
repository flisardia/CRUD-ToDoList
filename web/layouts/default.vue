<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <span>{{ footer }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      footer: "Franco Gómez Lisardia " + new Date().getFullYear(),
      title: "CRUD Tareas",
    };
  },
};
</script>
