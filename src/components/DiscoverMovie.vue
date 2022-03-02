<template>
  <div class="newMovie">
    <h2>A la une</h2>
    <div class="news">
      <div v-for="movie of discover" v-bind:key="movie.id">
        <movie :movie="movie" :titledisplay="false" class="movieSlider"></movie>
      </div>
    </div>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
export default {
  name: "DiscoverMovie",
  data: function () {
    return {
      discover: [],
    };
  },
  created: function () {
    this.discoverMovie();
  },
  components: {
    Movie,
  },
  methods: {
    discoverMovie: async function () {
      try {
        let response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=" +
            this.$store.state.apiKey +
            "&language=fr-FR"
        );
        let movies = await response.json();
        this.discover = movies.results;
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    slider: function () {
      let divMovie = document.querySelectorAll(".movieSlider");
    },
  },
};
</script>


<style scoped>
.news {
  width: 220px;
  max-height: 330px;
  overflow: hidden;
}
</style>