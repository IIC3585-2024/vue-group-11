<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Mis libros</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

- libros que has leido
- libros que quieres leer
- libros que estas leyendo
- libros que has abandonado
- libros que te han recomendado
- se pueden mandar recomendaciones por mail

