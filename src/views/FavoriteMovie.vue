<template>
  <div class="about">
    <h1>Mes favoris</h1>
    <div v-if="!this.$store.state.sessionId" class="noconnect">
      <p>Vous devez être connecté pour gérer vos favoris</p>
    </div>
    <div v-else class="favorite">Affichage de mes favoris</div>
  </div>
</template>

<script>
</script>


<style>
</style>



