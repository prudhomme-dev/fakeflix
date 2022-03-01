<template>
  <div class="home">
    <div v-if="$store.state.searchWord == ''"></div>

    <ul v-if="$store.state.searchWord != ''">
      <li v-for="movie of searchresult" v-bind:key="movie.id" class="movie">
        <movie :movie="movie" :titledisplay="true"></movie>
      </li>
    </ul>

    <div class="newMovie">
      <h2>A la une</h2>
      <div class="news">
        <div v-for="movie of discover" v-bind:key="movie.id">
          <movie
            :movie="movie"
            :titledisplay="false"
            class="movieSlider"
          ></movie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Movie from "@/components/Movie.vue";
export default {
  name: "HomeView",
  data: function () {
    return {
      discover: [],
      resultSearch: [],
    };
  },
  created: function () {
    this.discoverMovie();
  },
  mounted: function () {
    this.slider();
  },
  props: ["searchuser", "searchresult"],
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
      console.log(divMovie);
    },
  },
};
</script>


<style scoped>
.home,
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

ul {
  width: 80%;
}

li {
  list-style: none;
  padding: 5px;
}

.news {
  width: 220px;
  max-height: 330px;
  overflow: hidden;
}

/* .movie {
  width: 50%;
} */
</style>