<template>
  <div class="about">
    <h1>Mes favoris</h1>
    <div v-if="!this.$store.state.sessionId" class="noconnect">
      <p>Vous devez être connecté pour gérer vos favoris</p>
    </div>
    <div v-else class="favorite">
      <ul class="flex">
        <li
          v-for="movie of this.$store.state.favoriteMovie"
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
  name: "FavoriteMovie",
  data: function () {
    return {
      favoriteResult: [],
    };
  },
  components: {
    Movie,
    Discovermovie,
  },
};
</script>



<style scoped>
.news {
  margin: 0 auto;
}
</style>



