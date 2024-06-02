<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage"/>
  </div>
</template>

<script>
import BooksList from '../components/NewBookList.vue';

export default {
  name: 'RecommendedBooks',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      titlePage: "Recomendados",
    };
  },
  mounted() {
    if (localStorage.getItem('recommendedBooks')) {
      this.booksData = JSON.parse(localStorage.getItem('recommendedBooks'));
    }    
  }
}
</script>
