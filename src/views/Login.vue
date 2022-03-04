<template>
  <div class="login">
    <h1>Login</h1>
    <p>
      Veuillez utiliser vos identifiants du site Internet
      <a href="https://www.themoviedb.org/" target="_blank"
        >https://www.themoviedb.org/</a
      >:
    </p>
    <p>
      <label>
        Identifiant :
        <input type="text" id="identifiant" name="identifiant" required />
      </label>
    </p>
    <p>
      <label>
        Mot de passe :
        <input type="password" id="password" name="password" required />
      </label>
    </p>
    <div v-if="$store.state.loading" class="loader" id="loader"></div>
    <p><button v-on:click="getTokenId()">Se Connecter</button></p>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      tokenOpen: {},
      TokenValidation: {},
      sessionId: {},
      errorMessage: "",
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
    if (this.$store.state.sessionId != "") this.$router.push({ name: "home" });
  },
  methods: {
    getTokenId: async function () {
      this.$store.commit("loadingUpdate", true);
      this.tokenOpen = {};
      this.TokenValidation = {};
      this.sessionId = {};
      this.errorMessage = "";
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}authentication/token/new?api_key=${this.$store.state.apiKey}`
        );
        let tokens = await response.json();
        this.tokenOpen = tokens;
        if (this.tokenOpen.success) {
          this.$store.commit("getToken", this.tokenOpen);
          this.validateToken();
        } else {
          this.$toast.error(
            this.tokenOpen.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
          this.$store.commit("loadingUpdate", false);
        }
      } catch (e) {
        console.error("ERREUR", e);
        this.$store.commit("loadingUpdate", false);
      }
    },
    validateToken: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}authentication/token/validate_with_login?api_key=${this.$store.state.apiKey}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: document.querySelector("#identifiant").value,
              password: document.querySelector("#password").value,
              request_token: this.$store.state.tokenId,
            }),
          }
        );
        let tokens = await response.json();
        this.TokenValidation = tokens;
        if (this.TokenValidation.success) {
          this.$store.commit("getToken", this.TokenValidation);
          this.getSessionId();
        } else {
          this.$toast.error(
            this.TokenValidation.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
          this.$store.commit("loadingUpdate", false);
        }
      } catch (e) {
        console.error("ERREUR", e);
        this.$store.commit("loadingUpdate", false);
      }
    },

    getSessionId: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}authentication/session/new?api_key=${this.$store.state.apiKey}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              request_token: this.$store.state.tokenId,
            }),
          }
        );
        let sessions = await response.json();
        this.sessionId = sessions;
        if (this.sessionId.success) {
          this.$store.commit("getSession", this.sessionId);
          this.errorMessage = "";
          this.getAccountId();
        } else {
          this.$toast.error(
            this.sessionId.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
          this.$store.commit("loadingUpdate", false);
        }
      } catch (e) {
        console.error("ERREUR", e);
        this.$store.commit("loadingUpdate", false);
      }
    },
    getAccountId: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}account?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`
        );
        let accounts = await response.json();
        if (accounts.id) {
          this.$store.commit("getAccount", accounts);
          // Récupération des films en favoris
          this.$store.dispatch("searchFavorite");
          // Récupération des liste à voir à la connexion
          this.$store.dispatch("searchWatch");
          this.errorMessage = "";
          this.$toast.success(
            `Bonjour ${accounts.name}`,
            "Connecté",
            this.notificationSystem.options.success
          );
          this.$store.commit("loadingUpdate", false);

          this.$router.push({ name: "home" });
        } else {
          this.$toast.error(
            this.accounts.status_message,
            "Erreur",
            this.notificationSystem.options.error
          );
          this.$store.commit("loadingUpdate", false);
        }
      } catch (e) {
        console.error("ERREUR", e);
        this.$store.commit("loadingUpdate", false);
      }
    },
  },
};
</script>


<style scoped>
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