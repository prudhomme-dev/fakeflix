<template>
  <div class="newMovie">
    <div class="news">
      <h2>{{ title }}</h2>
      <hooper :settings="hooperSettings">
        <slide
          v-for="movie of $store.state.discoverMovie"
          v-bind:key="movie.id"
        >
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
  components: {
    Movie,
    Hooper,
    Slide,
  },
  props: ["title"],
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

h2 {
  color: #e50914;
}
</style>