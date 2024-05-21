<!-- https://tutsprime.com/videos/vue-js-3-tutorial-build-a-reusable-modal-component-with-composition-api-and-transition -->

<template>
  <div class="grid-container">
    {{ console.log(books) }}
        <div v-for="(book, index) in books" :key="index">
          <div class="book-icon" :style="{ backgroundColor: booksColor[book.id] }" @click="showModal(index)">
            <h1 class="book-title">{{ book.volumeInfo.title }}</h1>
          </div>
    <!-- <div class="book-icon" :style="{ backgroundColor: booksColor[book.id] }" v-for="(book, index) in books" :key="index"> -->
      <!-- <div class="book-icon" :style="{ backgroundColor: booksColor[book.id] }" @click="showModal(index)"> -->
        <!-- <img src="book-icon.png" alt="Book"> -->
      <!-- </div> -->
      <!-- <button @click="showModal(index)">Show Modal</button> -->
      <ModalBook :open="isOpen[index]" @close="closeModal(index)" :bookData="book">
      </ModalBook>
    </div>
  </div>
</template>

<script>
import ModalBook from './ModalBook.vue';
import Modal from "./Modal.vue"
import { ref } from "vue";

export default {
  name: 'BooksList',

  components: {    
    ModalBook,
    Modal
  },
  props: {
    books: Array
  },
  created() {
    this.isOpen = Array(this.books.length).fill(false);
  },
  data() {
    return {
      isOpen: [],
      // booksColor: {}
    };
  },
  computed: {
    booksColor() {
      const colors = {};
      this.books.forEach(book => {
        colors[book.id] = this.generateRandomColor();
      });
      return colors;
    }
  },
  methods: {
    generateRandomColor() {
      const colors = ['#FF5733', '#FFC300', '#36DBCA', '#7D3C98', '#3498DB', '#2ECC71', '#F39C12', '#E74C3C', '#1ABC9C', '#9B59B6'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      return randomColor;
    },
    showModal(index) {
      this.isOpen[index] = true;
    },
    closeModal(index) {
      this.isOpen[index] = false;
    },
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 20px;
}
.book-icon {
  width: 100px;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
}
.book-title {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  /* transform: rotate(-90deg); */
  transform: translate(-15%, 50%) rotate(-90deg);
  height: 100px;
  width: 200px;
}
</style>
