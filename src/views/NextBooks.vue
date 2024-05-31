<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage"/>
  </div>
</template>

<script>
import BooksList from '../components/NewBookList.vue';

export default {
  name: 'NextBooks',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      titlePage: "Lecturas Futuras",
    };
  },
  mounted() {
    if (localStorage.getItem('nextBooks')) {
      this.booksData = JSON.parse(localStorage.getItem('nextBooks'));
    }    
  }
}
</script>
