<template>
  <div class="column has-text-centered has-background-grey-darker">
    <h1 class="title is-1 mt-4">MyBooks</h1>
    <figure class="image is-128x128 is-inline-block mb-5">
      <img src="../assets/books.png"/>
    </figure>
  </div>
  <div class="columns is-mobile is-centered has-text-centered mt-5">
    <div class="column is-half has-background-info-dark">
      <h1>Libros Completados: {{ completedBooks.length }}</h1>
    </div>
  </div>
  <div class="columns is-mobile is-centered has-text-centered mt-5">
    <div class="column is-half has-background-info-dark">
      <h1>Libros Recomendados: {{ recommendedBooks.length }}</h1>
    </div>
  </div>
  <div class="columns is-mobile is-centered has-text-centered mt-5">
    <div class="column is-half has-background-info-dark">
      <h1>Libros por leer: {{ nextBooks.length }}</h1>
    </div>
  </div>
  <div class="columns is-mobile is-centered has-text-centered mt-5">
    <div class="column is-half has-background-info-dark">
      <h1>Libros Favoritos: {{ favoriteBooks.length }}</h1>
    </div>
  </div>
  <div class="columns is-mobile is-centered has-text-centered mt-5">
    <div class="column">
      <button class="button is-danger" @click="resetBooks">Resetear Información</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      completedBooks: [],
      recommendedBooks: [],
      nextBooks: [],
      favoriteBooks: [],
    };
  },
  mounted() {
    if (localStorage.getItem('completedBooks')) {
      this.completedBooks = JSON.parse(localStorage.getItem('completedBooks'));
    }
    else {
      localStorage.setItem('completedBooks', JSON.stringify(this.completedBooks));
    }

    if (localStorage.getItem('recommendedBooks')) {
      this.recommendedBooks = JSON.parse(localStorage.getItem('recommendedBooks'));
    }
    else {
      localStorage.setItem('recommendedBooks', JSON.stringify(this.recommendedBooks));
    }

    if (localStorage.getItem('nextBooks')) {
      this.nextBooks = JSON.parse(localStorage.getItem('nextBooks'));
    }
    else {
      localStorage.setItem('nextBooks', JSON.stringify(this.nextBooks));
    }

    if (localStorage.getItem('favoriteBooks')) {
      this.favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks'));
    }
    else {
      localStorage.setItem('favoriteBooks', JSON.stringify(this.favoriteBooks));
    }
  },
  methods: {
    async fetchBooks(currentPageParam) {
      // mi lista de libros seleccionados
      let result = await axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=a&startIndex=${currentPageParam * 40}&maxResults=40`)
        .then(response => {
          this.availableBooks = response.data.items;
          console.log(this.availableBooks);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    },
    resetBooks() {
      this.completedBooks = [];
      this.recommendedBooks = [];
      this.nextBooks = [];
      this.favoriteBooks = [];
      localStorage.setItem('completedBooks', JSON.stringify(this.completedBooks));
      localStorage.setItem('recommendedBooks', JSON.stringify(this.recommendedBooks));
      localStorage.setItem('nextBooks', JSON.stringify(this.nextBooks));
      localStorage.setItem('favoriteBooks', JSON.stringify(this.favoriteBooks));
    }
  }
}
</script>
