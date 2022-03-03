<template>
  <div class="newMovie">
    <div class="news">
      <h2>{{ title }}</h2>
      <hooper :settings="hooperSettings">
        <slide v-for="movie of discover" v-bind:key="movie.id">
          <movie :movie="movie" :titledisplay="false"></movie>
        </slide>
      </hooper>
    </div>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import { Hooper, Slide } from "hooper";

export default {
  name: "DiscoverMovie",
  data: function () {
    return {
      discover: [],
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        autoPlay: true,
        vertical: true,
        trimWhiteSpace: true,
      },
    };
  },
  created: function () {
    this.discoverMovie();
  },
  components: {
    Movie,
    Hooper,
    Slide,
  },
  props: ["title"],
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
  },
};
</script>


<style scoped>
.hooper {
  width: 220px;
  min-height: 330px;
  padding: 0;
}

.newMovie {
  /* margin: 0 auto; */
  /* text-align: center; */
  width: 220px;
}
</style>