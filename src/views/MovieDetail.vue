<template>
  <div class="movieDetail">
    <div class="videoYoutube" v-if="movieVideo">
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
        <p>{{ movieDetail.overview }}</p>

        <h3>Informations</h3>
        <ul>
          <li>Popularité : {{ movieDetail.popularity }}</li>
          <li>Note : {{ movieDetail.vote_average }}</li>
          <li>Nombre de vote : {{ movieDetail.vote_count }}</li>
        </ul>
      </div>
    </div>

    <div class="action flex">
      <button v-on:click="addFavorite()">Ajouter aux favoris</button>
      <button v-on:click="watchList()">Ajouter aux "A voir"</button>
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
    };
  },
  created: function () {
    this.movieDetailRequest();
  },
  filters: {
    urlImg: function (value) {
      if (value == null)
        return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
      else return "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + value;
    },
    urlVideoYoutube: function (value) {
      return "https://www.youtube.com/embed/" + value;
    },
    capitalize: function (value) {
      return value ? value.toUpperCase() : value;
    },
  },
  methods: {
    movieDetailRequest: async function () {
      if (this.$route.params.id) {
        try {
          let response = await fetch(
            `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.$store.state.apiKey}&language=fr-FR`
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
          `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${this.$store.state.apiKey}&language=fr-FR`
        );
        let videos = await response.json();
        if (videos.results.length != 0) this.movieVideo = videos.results[0].key;
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    addFavorite: async function () {
      if (this.$store.state.idSession == "") {
        window.alert("Vous devez être connecté pour ajouter aux favoris");
      } else {
        try {
          let response = await fetch(
            `https://api.themoviedb.org/3/account/${this.$store.state.accountId}/favorite?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                media_type: "movie",
                media_id: this.$route.params.id,
                favorite: true,
              }),
            }
          );
          let favorites = await response.json();
          window.alert(favorites.status_message);
        } catch (e) {
          console.error("ERREUR", e);
        }
      }
      // Ajout dans mes favoris
    },
    watchList: async function () {
      if (this.$store.state.idSession == "") {
        window.alert(
          'Vous devez être connecté pour ajouter à la liste "A Voir"'
        );
      } else {
        try {
          let response = await fetch(
            `https://api.themoviedb.org/3/account/${this.$store.state.accountId}/watchlist?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                media_type: "movie",
                media_id: this.$route.params.id,
                watchlist: true,
              }),
            }
          );
          let watchlist = await response.json();
          window.alert(watchlist.status_message);
        } catch (e) {
          console.error("ERREUR", e);
        }
      }
      // Ajout dans mes favoris
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

.movieDetail {
  padding: 15px 5px;
}
</style>