<!-- https://tutsprime.com/videos/vue-js-3-tutorial-build-a-reusable-modal-component-with-composition-api-and-transition -->

<template>
  <div class="back-container">
    <h1 class="text-title">{{ titlePage }}</h1>
    <div>
      <button @click="this.$emit('redirectPage')" class="button-mybooks">{{ buttonText }}</button>
    </div>
    <div class="navigation-arrows">
      <button @click="previousPage" class="arrow-left">&lt;</button>
      <button @click="nextPage" class="arrow-right">&gt;</button>
    </div>
    <div class="grid-container">
      <div v-for="(book, index) in books" :key="index" class="grid-item">
            <div class="book-icon" :style="{ backgroundColor: booksColor[book.id] }" @click="showModal(index)">
              <h1 class="book-title">{{ book.volumeInfo.title }}</h1>
            </div>
            <ModalBook :open="isOpen[index]" @close="closeModal(index)" :bookData="book">
            </ModalBook>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBook from './ModalBook.vue';
import Modal from "./Modal.vue"
import { ref } from "vue";
import axios from 'axios'

export default {
  name: 'BooksList',
  props: {
    books: Array,
    currentPage: Number,
    titlePage: String,
    buttonText: String
  },
  components: {    
    ModalBook,
    Modal
  },
  created() {
    this.isOpen = Array(this.books.length).fill(false);
  },
  data() {
    return {
      isOpen: [],
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
      const colors = ['#F8E6A0', '#8B4513', '#8C001A','#B8860B', '#D4A190', '#0F52BA', '#50C878', '#C04000', '#C0C0C0', '#696969'];
    
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
    nextPage() {
      this.$emit('update-page', this.currentPage + 1); // Emit update-page event with incremented currentPage
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.$emit('update-page', this.currentPage - 1); // Emit update-page event with decremented currentPage
      }
    },
  }
};
</script>

<style scoped>
.back-container {
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 50px;
  background-color: #cbcdce;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 20px;
  border: #7b5d3e solid 20px;
  background-color: #ebac6e;
}

.book-icon {
  width: 100px;
  height: 200px;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.9;
}

.grid-container > div::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: -10;
  background-color: #7b5d3e;
  width: 120%;
  height: 20px;
}

.grid-item {
  position: relative;
}

.book-title {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  transform: translate(-25%, 95%) rotate(-90deg);
  height: 70px;
  width: 200px;
  overflow: hidden;
}

.text-title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
  font-size: 48px;
}

.button-mybooks {
  position: absolute;
  top: 100px;
  right: 60px;
  padding: 10px 20px;
  background-color: #7b5d3e;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
