<template>
  <div id="app">
    <h1>FAKEFLIX</h1>
    <nav class="flex">
      <div>
        <router-link to="/">Accueil</router-link>
        <router-link to="/fav">Favoris</router-link>
        <router-link to="/watch">Film à voir</router-link>
      </div>
      <input
        type="text"
        v-on:keyup="searchMovie($event)"
        placeholder="Rechercher un film"
      />
    </nav>
    <router-view
      :searchuser="$store.state.searchWord"
      :searchresult="resultSearch"
    />
  </div>
</template>

<script>
import HomeViewVue from "./views/HomeView.vue";

export default {
  name: "NavMain",
  data: function () {
    return {
      resultSearch: [],
      delay: 0,
      intervalId: 0,
    };
  },
  methods: {
    searchMovie: function (event) {
      // Revenir au home
      if (this.$route.path != "/") {
        this.$router.push({ name: "home" });
      }
      // Penser à retarder l'exécution de la fenêtre
      // this.delay = 0;
      // if (this.intervalId) {
      //   clearInterval(this.intervalId);
      //   console.log("Ok Interval");
      // }
      // this.intervalId = setInterval(() => {
      //   this.delay++;
      //   console.log(this.delay);
      // }, 1000);
      // console.log(this.intervalId);
      // if (this.delay == 3) {
      this.$store.commit("searchWordChange", event.target.value);
      this.searchMovieRequest();
      this.delay = 0;
      // }
    },
    searchMovieRequest: async function () {
      if (this.$store.state.searchWord) {
        try {
          let response = await fetch(
            "https://api.themoviedb.org/3/search/movie?api_key=" +
              this.$store.state.apiKey +
              "&language=fr-FR&query=" +
              this.$store.state.searchWord
          );
          let movies = await response.json();
          this.resultSearch = movies.results;
        } catch (e) {
          console.error("ERREUR", e);
        }
      }
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}

.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

h1 {
  padding: 25px;
  font-size: 40px;
  color: #e50914;
}

nav {
  padding: 30px;
  background-color: gray;
}

nav a {
  color: rgb(204, 204, 204);
  padding: 5px 10px;
  text-decoration: none;
}

nav a:hover {
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  transition: 0.5s;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #e50914;
}

input {
  padding: 5px;
  border: #e50914 1px solid;
}

input:focus {
  outline: #e50914 1px solid;
}
</style>
