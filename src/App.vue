<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Inicio</RouterLink>
        <RouterLink class="navbar-item" to="/completedbooks">Completados</RouterLink> 
        <RouterLink class="navbar-item" to="/recommended">Recomendados</RouterLink>
        <RouterLink class="navbar-item" to="/nextbooks">Siguientes</RouterLink> 
        <RouterLink class="navbar-item" to="/favorites">Favoritos</RouterLink> 
      </div>
      <div class="navbar-end">
        <RouterLink class="navbar-item" to="/availables">Disponibles</RouterLink>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
