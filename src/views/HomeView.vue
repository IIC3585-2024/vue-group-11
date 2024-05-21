<template>
  <div>
    <BooksList :books="booksData" />
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
        booksData:  [],
      };
    },

    mounted () {
      axios
        .get('https://www.googleapis.com/books/v1/volumes?q=young%adult')
        .then(response => 
        // console.log(response.data.items))
        (this.booksData = response.data.items))
    }
}
</script>
