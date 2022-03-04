<template>
  <div class="home">
    <div v-if="searchWord != ''">
      <h3>Résultat pour : {{ searchWord }}</h3>
      <div v-if="$store.state.loading" class="loader" id="loader"></div>
    </div>
    <div v-if="searchWord == ''"></div>
    <div class="flex">
      <ul v-if="searchWord != ''">
        <li v-for="movie of searchresult" v-bind:key="movie.id" class="movie">
          <movie :movie="movie" :titledisplay="true"></movie>
        </li>
      </ul>

      <discovermovie title="A la une"></discovermovie>
    </div>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
import Discovermovie from "@/components/DiscoverMovie.vue";

export default {
  name: "HomeView",
  data: function () {
    return {
      resultSearch: [],
    };
  },
  props: ["searchuser", "searchresult"],
  components: {
    Movie,
    Discovermovie,
  },
  computed: {
    // Récupération des données du Store pour une meilleure optimisation
    // TODO Tester mapState
    searchWord: function () {
      return this.$store.state.searchWord;
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

/* LOADER */

#loader:before,
#loader:after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #e50914;
  animation: squaremove 1s ease-in-out infinite;
}

#loader:after {
  bottom: 0;
  animation-delay: 0.5s;
}

@keyframes squaremove {
  0%,
  100% {
    -webkit-transform: translate(0, 0) rotate(0);
    -ms-transform: translate(0, 0) rotate(0);
    -o-transform: translate(0, 0) rotate(0);
    transform: translate(0, 0) rotate(0);
  }

  25% {
    -webkit-transform: translate(40px, 40px) rotate(45deg);
    -ms-transform: translate(40px, 40px) rotate(45deg);
    -o-transform: translate(40px, 40px) rotate(45deg);
    transform: translate(40px, 40px) rotate(45deg);
  }

  50% {
    -webkit-transform: translate(0px, 80px) rotate(0deg);
    -ms-transform: translate(0px, 80px) rotate(0deg);
    -o-transform: translate(0px, 80px) rotate(0deg);
    transform: translate(0px, 80px) rotate(0deg);
  }

  75% {
    -webkit-transform: translate(-40px, 40px) rotate(45deg);
    -ms-transform: translate(-40px, 40px) rotate(45deg);
    -o-transform: translate(-40px, 40px) rotate(45deg);
    transform: translate(-40px, 40px) rotate(45deg);
  }
}
</style>