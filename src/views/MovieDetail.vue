<template>
  <div class="movieDetail">
    <div class="videoYoutube" v-if="movieVideo != ''">
      <iframe
        :src="movieVideo | urlVideoYoutube"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <div class="flex">
      <div class="poster">
        <img :src="movieDetail.poster_path | urlImg" :alt="movieDetail.title" />
      </div>
      <div class="detail">
        <h2>{{ movieDetail.title }}</h2>
        <span
          >{{ movieDetail.original_title }} ({{
            movieDetail.original_language | capitalize
          }})</span
        >
        <span v-if="movieDetail.release_date">
          Date de sortie: {{ movieDetail.release_date | dateFr }}</span
        >
        <p>{{ movieDetail.overview }}</p>

        <h3>Informations</h3>
        <ul>
          <li>Popularité : {{ movieDetail.popularity }}</li>
          <li>Note : {{ movieDetail.vote_average }}</li>
          <li>Nombre de vote : {{ movieDetail.vote_count }}</li>
        </ul>
      </div>
    </div>

    <div
      v-if="
        this.$store.state.accoundId != '' && this.$store.state.sessionId != ''
      "
      class="action flex"
    >
      <button v-if="!this.isFavoriteMovieList" v-on:click="addFavorite(true)">
        Ajouter aux favoris
      </button>
      <button v-else v-on:click="addFavorite(false)">
        Supprimer des favoris
      </button>

      <button v-if="!this.isWatchlistMovie" v-on:click="watchList(true)">
        Ajouter aux "A voir"
      </button>
      <button v-else v-on:click="watchList(false)">
        Supprimer des films "A voir"
      </button>
    </div>
    <div v-else class="action">
      <p>
        Vous devez être connecté pour pouvoir ajouter ce film dans vos Favoris
        ou vos Films à voir
      </p>
    </div>
  </div>
</template>


<script>
export default {
  name: "MovieDetail",
  data: function () {
    return {
      movieDetail: {},
      movieVideo: "",
      isWatchlistMovie: false,
      isFavoriteMovieList: false,
      notificationSystem: {
        options: {
          info: {
            position: "bottomRight",
            close: false,
          },
          success: {
            position: "bottomRight",
            close: false,
          },
          warning: {
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
    this.movieDetailRequest();
    this.isWatchlist();
    this.isFavoriteList();
  },
  filters: {
    urlImg: function (value) {
      if (value == null)
        return "https://webboy.fr/wp-content/uploads/2022/03/image-non-disponible.png";
      else return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + value;
    },
    urlVideoYoutube: function (value) {
      return "https://www.youtube.com/embed/" + value;
    },
    capitalize: function (value) {
      return value ? value.toUpperCase() : value;
    },
    dateFr: function (value) {
      let date = new Date(value);
      return date.toLocaleDateString("fr-FR");
    },
  },
  methods: {
    movieDetailRequest: async function () {
      if (this.$route.params.id) {
        try {
          // TODO : Essayer de mettre dans les mixins
          let response = await fetch(
            `${this.$store.state.baseUrlApi}movie/${this.$route.params.id}?api_key=${this.$store.state.apiKey}&language=fr-FR`
          );
          let movies = await response.json();
          this.movieDetail = movies;
          this.movieVideoRequest();
        } catch (e) {
          console.error("ERREUR", e);
        }
      }
    },
    movieVideoRequest: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}movie/${this.$route.params.id}/videos?api_key=${this.$store.state.apiKey}&language=fr-FR`
        );
        let videos = await response.json();
        if (videos.results.length != 0) {
          this.movieVideo = videos.results[0].key;
        }
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    addFavorite: async function (action) {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}account/${this.$store.state.accountId}/favorite?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              media_type: "movie",
              media_id: this.$route.params.id,
              favorite: action,
            }),
          }
        );
        let favorites = await response.json();
        this.$store.dispatch("searchFavorite");
        this.isFavoriteMovieList = action;
        //TODO : faire une méthode spécialisée pour les notifs
        if (favorites.status_code == 1)
          this.$toast.success(
            "Le film a été ajouté à vos favoris",
            "Succès",
            this.notificationSystem.options.success
          );
        else if (favorites.status_code == 13)
          this.$toast.success(
            "Ce film a été retiré de vos favoris",
            "Succès",
            this.notificationSystem.options.warning
          );
        else if (favorites.status_code == 12)
          this.$toast.warning(
            "Ce film est déjà dans vos favoris",
            "Attention",
            this.notificationSystem.options.warning
          );
        else
          this.$toast.error(
            favorites.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
      } catch (e) {
        console.error("ERREUR", e);
        this.$toast.error(
          "Erreur du serveur",
          "Erreur",
          this.notificationSystem.options.error
        );
      }
    },
    watchList: async function (action) {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}account/${this.$store.state.accountId}/watchlist?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              media_type: "movie",
              media_id: this.$route.params.id,
              watchlist: action,
            }),
          }
        );
        let watchlist = await response.json();
        this.$store.dispatch("searchWatch");
        this.isWatchlistMovie = action;
        if (watchlist.status_code == 1)
          this.$toast.success(
            "Le film a été ajouté à votre liste",
            "Succès",
            this.notificationSystem.options.success
          );
        else if (watchlist.status_code == 12)
          this.$toast.warning(
            "Ce film est déjà dans votre liste",
            "Attention",
            this.notificationSystem.options.warning
          );
        else if (watchlist.status_code == 13)
          this.$toast.success(
            "Ce film a été supprimé de votre liste",
            "Succès",
            this.notificationSystem.options.warning
          );
        else
          this.$toast.error(
            watchlist.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
      } catch (e) {
        console.error("ERREUR", e);
        this.$toast.error(
          "Erreur du serveur",
          "Erreur",
          this.notificationSystem.options.error
        );
      }
    },
    isWatchlist: function () {
      if (
        this.$store.state.watchList.findIndex(
          (element) => element.id == this.$route.params.id
        ) != -1
      ) {
        this.isWatchlistMovie = true;
      } else {
        this.isWatchlistMovie = false;
      }
    },
    isFavoriteList: function () {
      if (
        this.$store.state.favoriteMovie.findIndex(
          (element) => element.id == this.$route.params.id
        ) != -1
      ) {
        this.isFavoriteMovieList = true;
      } else {
        this.isFavoriteMovieList = false;
      }
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.videoYoutube {
  padding: 8px;
}

.videoYoutube iframe {
  width: 100%;
  min-height: 390px;
}

.poster {
  width: 25%;
  padding: 8px;
}

img {
  width: 100%;
}

.detail {
  width: 60%;
  text-align: left;
  padding: 8px;
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

h3,
h2 {
  color: white;
}

p,
li {
  color: #e50914;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

li::before {
  content: url("https://api.iconify.design/bi/arrow-right-short.svg?color=white");
  padding: 0 8px;
}

.movieDetail {
  padding: 15px 5px;
}
</style>