<template>
  <div class="home">
    <div v-if="$store.state.searchWord == ''"></div>

    <ul v-if="$store.state.searchWord != ''">
      <li v-for="movie of searchresult" v-bind:key="movie.id" class="movie">
        <movie :movie="movie" :titledisplay="true"></movie>
      </li>
    </ul>

    <discovermovie title="A la une"></discovermovie>
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
};
</script>


<style scoped>
.home,
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>