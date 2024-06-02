<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage"/>
  </div>
</template>

<script>
import BooksList from '../components/NewBookList.vue';

export default {
  name: 'CompletedBooks',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      titlePage: "Lecturas Completadas",
    };
  },
  mounted() {
    if (localStorage.getItem('completedBooks')) {
      this.booksData = JSON.parse(localStorage.getItem('completedBooks'));
    }    
  },
  methods: {
  }
}
</script>
