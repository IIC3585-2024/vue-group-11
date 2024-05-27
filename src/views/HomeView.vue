<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage" :buttonText="buttonText" :currentPage="currentPage" @update-page="fetchBooks" @redirectPage="redirectPage"/>
  </div>
</template>

<script>
import BooksList from '../components/BooksList.vue';
import axios from 'axios'

export default {
  name: 'App',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      currentPage: 0,
      titlePage: "Libros",
      buttonText: "Ir a mis libros",
      pathText: "/mybooks"
    };
  },
  mounted() {
    this.fetchBooks(0);
  },
  methods: {
    fetchBooks(currentPageParam) {
      this.currentPage = currentPageParam;
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=a&startIndex=${currentPageParam * 40}&maxResults=40`)
        .then(response => {
          this.booksData = response.data.items;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    },
    redirectPage() {
      this.$router.push(this.pathText);
    }
  }
}
</script>
