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
    };
  },
  created: function () {
    if (this.$store.state.sessionId != "") this.$router.push({ name: "home" });
  },
  methods: {
    getTokenId: async function () {
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
          this.errorMessage = this.tokenOpen.status_message;
        }
      } catch (e) {
        console.error("ERREUR", e);
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
          this.errorMessage = this.TokenValidation.status_message;
        }
      } catch (e) {
        console.error("ERREUR", e);
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
          // this.$router.push({ name: "home" });
        } else {
          this.errorMessage = this.sessionId.status_message;
        }
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    getAccountId: async function () {
      try {
        let response = await fetch(
          `${this.$store.state.baseUrlApi}account?api_key=${this.$store.state.apiKey}&session_id=${this.$store.state.sessionId}`
        );
        let accounts = await response.json();
        console.log(accounts);
        // this.sessionId = sessions;
        if (accounts.id) {
          this.$store.commit("getAccount", accounts);
          this.errorMessage = "";
          this.$router.push({ name: "home" });
        } else {
          this.errorMessage = accounts.status_message;
        }
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
  },
};
</script>


<style scoped>
</style>