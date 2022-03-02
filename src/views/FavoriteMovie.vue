<template>
  <div class="about">
    <h1>Mes favoris</h1>
    <div v-if="!this.$store.state.sessionId" class="noconnect">
      <p>Vous devez être connecté pour gérer vos favoris</p>
    </div>
    <div v-else class="favorite">
      <ul class="flex">
        <li v-for="movie of favoriteResult" v-bind:key="movie.id" class="movie">
          <movie :movie="movie" :titledisplay="true"></movie>
        </li>
      </ul>
    </div>

    <!-- Penser à rajouter le slide des découvertes -->
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
export default {
  name: "FavoriteMovie",
  data: function () {
    return {
      favoriteResult: [],
    };
  },
  components: {
    Movie,
  },
  created: function () {
    if (this.$store.state.sessionId != "") this.searchFavorite();
  },
  methods: {
    searchFavorite: async function () {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/account/${this.$store.state.accountId}/favorite/movies?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}&language=fr-FR&sort_by=created_at.desc`
        );
        let favorites = await response.json();
        this.favoriteResult = favorites.results;
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
  },
};
</script>


<style scoped>
</style>



