<template>
  <div>
    <router-link :to="/movie/ + movie.id">
      <img :src="movie.poster_path | urlImg" :alt="movie.title" />
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
        return "https://webboy.fr/wp-content/uploads/2022/03/image-non-disponible.png";
      else return "https://www.themoviedb.org/t/p/w220_and_h330_face" + value;
    },
  },
  props: ["movie", "titledisplay"],
};
</script>

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

img {
  max-width: 220px;
}
</style>
