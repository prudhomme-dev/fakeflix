<template>
  <div>
    <router-link :to="/movie/ + movie.id">
      <img :src="movie.backdrop_path | urlImg" :alt="movie.title" />
      <h3 v-if="titledisplay">
        {{ movie.title }}
      </h3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Movie",
  filters: {
    urlImg: function (value) {
      if (value == null)
        return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      else return "https://www.themoviedb.org/t/p/w220_and_h330_face" + value;
    },
  },
  props: ["movie", "titledisplay"],
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: center;
}

a {
  text-decoration: none;
  color: gray;
}

a:hover {
  color: red;
  transition: 0.7s;
}

div {
  width: 200px;
  padding: 5px;
}

div:hover {
  transform: scale3d(1.02, 1.02, 1.02);
  transition: 0.8s;
}

img {
  object-fit: cover;
}
</style>
