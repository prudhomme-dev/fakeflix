<template>
  <div class="about">
    <h1>Mes films à voir</h1>

    <div v-if="!this.$store.state.sessionId" class="noconnect">
      <p>Vous devez être connecté pour gérer votre liste de films à voir</p>
    </div>
    <div v-else class="watchlist">
      <ul class="flex">
        <li
          v-for="movie of this.$store.state.watchList"
          v-bind:key="movie.id"
          class="movie"
        >
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
};
</script>

<style scoped>
p {
  color: white;
}
</style>
