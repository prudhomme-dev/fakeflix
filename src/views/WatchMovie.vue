<template>
  <div class="about">
    <h1>Mes films à voir</h1>

    <div v-if="!this.$store.state.sessionId" class="noconnect">
      <p>Vous devez être connecté pour gérer votre liste de films à voir</p>
    </div>
    <div v-else class="watchlist">
      <ul class="flex">
        <li v-for="movie of watchResult" v-bind:key="movie.id" class="movie">
          <movie :movie="movie" :titledisplay="true"></movie>
        </li>
      </ul>
    </div>
    <discovermovie title="Autres Films"></discovermovie>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import Discovermovie from "@/components/DiscoverMovie.vue";

export default {
  name: "WatchMovie",
  data: function () {
    return {
      watchResult: [],
    };
  },
  components: {
    Movie,
    Discovermovie,
  },
  created: function () {
    if (this.$store.state.sessionId != "") this.searchWatch();
  },
  methods: {
    searchWatch: async function () {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/account/${this.$store.state.accountId}/watchlist/movies?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}&language=fr-FR&sort_by=created_at.desc`
        );
        let watchmovies = await response.json();
        this.watchResult = watchmovies.results;
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
  },
};
</script>

<style scoped>
</style>
