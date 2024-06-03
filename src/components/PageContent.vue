<template>
  <div class="book-info">
    <h1 class="book-title">{{ bookData.title }}</h1>
    <div class="book-details">
      <p v-if="bookData.authors && bookData.authors.length">Autor(es): {{ bookData.authors.join(', ') }}</p>
      <p v-if="bookData.publisher">Editorial: {{ bookData.publisher }}</p>
      <p v-if="bookData.publishedDate">Fecha de publicación: {{ bookData.publishedDate }}</p>
      <p v-if="bookData.contentVersion">Versión de contenido: {{ bookData.contentVersion }}</p>
      <p v-if="bookData.description"> {{ bookData.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bookData: Object,
  }
}
</script>

<style scoped>
.book-info {
  padding: 20px;
  font-family: 'Courier New', Courier, monospace;
  color: black;
  max-height: 400px;
  overflow-y: auto;
}

.book-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;  
  color: black;
}

.book-details {
  font-size: 16px;
  color: black;
}

.book-details p {
  margin-bottom: 5px;
}
</style>
