<template>
    <div class="back-container">
      <h1 class="text-title">{{ titlePage }}</h1>
      <div class="navigation-arrows">
        <button @click="previousPage" class="arrow-left" :disabled="currentPage === 0">&lt;</button>
        <button @click="nextPage" class="arrow-right" :disabled="endOfBooks">&gt;</button>
      </div>
      <div class="grid-container">
        <div v-for="index in 40" :key="index" class="grid-item">
          <div v-if="booksPaginated[index - 1]" class="book-icon" :style="{ backgroundColor: booksColor[booksPaginated[index - 1].id] }" @click="showModal(index - 1)">
            <h1 class="book-title">{{ booksPaginated[index - 1].volumeInfo.title }}</h1>
          </div>
          <div v-else class="book-icon empty-book">
            <!-- Espacio vacío -->
          </div>
          <ModalBook v-if="booksPaginated[index - 1]" :open="isOpen[index - 1]" @close="closeModal(index - 1)" :bookData="booksPaginated[index - 1]">
          </ModalBook>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ModalBook from './ModalBook.vue';
  
  export default {
    name: 'BooksList',
    props: {
      books: Array,
      titlePage: String,
    },
    components: {    
      ModalBook,
    },
    created() {
      this.isOpen = Array(this.books.length).fill(false);
    },
    data() {
      return {
        isOpen: [],
        currentPage: 0
      };
    },
    computed: {
      booksColor() {
        const colors = {};
        this.books.forEach(book => {
          colors[book.id] = this.generateRandomColor();
        });
        return colors;
      },
      booksPaginated() {
        const start = this.currentPage * 40;
        const end = start + 40;
        return this.books.slice(start, end);
      },
      endOfBooks() {
        return this.books.length <= (this.currentPage + 1) * 40;
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
        if (!this.endOfBooks) {
          this.currentPage++;
        }
      },
      previousPage() {
        if (this.currentPage > 0) {
          this.currentPage--;
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
    padding-bottom: 50px;
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
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.9;
    margin-left: 5px;
    margin-top: 5px;
  }
  
  .book-icon.empty-book {
    background-color: #ddd; /* Un color de fondo para los espacios vacíos */
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
  
  .navigation-arrows {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .navigation-arrows button {
    background-color: #814e1aa3;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  
  .navigation-arrows button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  