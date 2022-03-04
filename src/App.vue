<template>
  <div id="app">
    <h1><router-link to="/">FAKEFLIX</router-link></h1>
    <nav class="flex">
      <div>
        <router-link to="/">Accueil</router-link>
        <router-link to="/fav">Favoris</router-link>
        <router-link to="/watch">Film à voir</router-link>
      </div>
      <div>
        <button v-if="!$store.state.sessionId" v-on:click="login()">
          Se Connecter
        </button>

        <button v-else v-on:click="logout()">Se Déconnecter</button>
        <input
          type="text"
          v-on:keyup="searchMovie($event)"
          placeholder="Rechercher un film"
        />
      </div>
    </nav>
    <router-view
      :searchuser="$store.state.searchWord"
      :searchresult="resultSearch"
      :loading="loading"
    />
  </div>
</template>

<script>
import { debounce } from "debounce";
export default {
  name: "NavMain",
  data: function () {
    return {
      resultSearch: [],
      loading: false,
      notificationSystem: {
        options: {
          success: {
            position: "bottomRight",
            close: false,
          },
          error: {
            position: "bottomRight",
            close: false,
          },
        },
      },
    };
  },
  created: function () {
    this.$store.dispatch("discoverMovie");
  },
  methods: {
    searchMovie: debounce(function (event) {
      // Revenir au home
      if (this.$route.path != "/") {
        this.$router.push({ name: "home" });
      }
      this.$store.commit("searchWordChange", event.target.value);
      this.searchMovieRequest();
    }, 500),
    searchMovieRequest: async function () {
      this.$store.commit("loadingUpdate", true);
      if (this.$store.state.searchWord) {
        try {
          let response = await fetch(
            `${this.$store.state.baseUrlApi}search/movie?api_key=${this.$store.state.apiKey}&language=fr-FR&query=${this.$store.state.searchWord}&include_adult=${this.$store.state.adultContent}`
          );
          let movies = await response.json();
          this.resultSearch = movies.results;
          this.$store.commit("loadingUpdate", false);
        } catch (e) {
          console.error("ERREUR", e);
          this.$store.commit("loadingUpdate", false);
        }
      }
    },
    login: function () {
      if (this.$route.path != "/login") {
        this.$router.push({ name: "login" });
      }
    },
    logout: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}authentication/session?api_key=${this.$store.state.apiKey}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id: this.$store.state.sessionId,
            }),
          }
        );
        let sessions = await response.json();
        if (sessions.success) {
          this.$store.commit("resetSession");
          this.$toast.success(
            `La session a été déconnectée`,
            "Déconnecté",
            this.notificationSystem.options.success
          );
          if (this.$route.name != "home") this.$router.push({ name: "home" });
        } else {
          this.$toast.error(
            `Erreur de déconnexion`,
            "Erreur",
            this.notificationSystem.options.success
          );
        }
      } catch (e) {
        console.error("ERREUR", e);
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

a {
  color: #e50914;
  text-decoration: none;
}

a:hover {
  color: white;
  transition: 0.5s;
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

button {
  background-color: #e50914;
  color: white;
  padding: 10px 17px;
  border: 1px solid #e50914;
  margin: 15px 45px;
  font-size: 15px;
  font-weight: bold;
}

button:hover {
  transition: 0.5s;
  background-color: white;
  color: #e50914;
}

.flex {
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

p {
  color: white;
}
</style>
