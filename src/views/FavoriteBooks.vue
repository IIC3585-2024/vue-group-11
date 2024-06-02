<template>
  <div>
    <BooksList :books="booksData" :titlePage="titlePage"/>
  </div>
</template>

<script>
import BooksList from '../components/NewBookList.vue';

export default {
  name: 'FavoriteBooks',
  components: {
    BooksList
  },
  data() {
    return {
      booksData: [],
      titlePage: "Favoritos",
    };
  },
  mounted() {
    if (localStorage.getItem('favoriteBooks')) {
      this.booksData = JSON.parse(localStorage.getItem('favoriteBooks'));
    }    
  }
}
</script>
