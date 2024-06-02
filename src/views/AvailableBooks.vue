<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage" :currentPage="currentPage" @update-page="fetchBooks"/>
  </div>
</template>

<script>
import BooksList from '../components/BooksList.vue';
import axios from 'axios'

export default {
  name: 'CompletedBooks',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      currentPage: 0,
      titlePage: "Libros Disponibles",
    };
  },
  created() {
    this.fetchBooks(0);
  },
  methods: {
    fetchBooks(currentPageParam) {
      this.currentPage = currentPageParam;
      // mi lista de libros seleccionados
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=a&startIndex=${currentPageParam * 40}&maxResults=40`)
        .then(response => {
          this.booksData = response.data.items;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  }
}
</script>
