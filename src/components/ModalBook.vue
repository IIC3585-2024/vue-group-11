<template>
  <div v-if="open">
    <div class="vue-modal" v-show="open">
      <div class="table">
        <div class="book-container">
          <button type="button" class="back-button" @click="$emit('close')"><img src="../assets/x.png" alt="Back" class="icon is-medium"></button>
          <div v-show="showAtras" class="page" @click="flipPage" :style="transformBookData[currentPage].cover ? 'background-color: #3b2b1a; border: 0px; border-left: 5px solid #3b2b1a;' : ''">
          </div>
          <Transition name="flip" @before-enter="beforeEnter" @after-leave="afterLeave" v-if="currentPage !== numPages - 1">
            <div v-show="show" :key="currentPage" class="page" @click="flipPage" style="position: fixed; top: 173px; left: 842px;">
              <img v-if="transformBookData[currentPage].cover" :src="transformBookData[currentPage].image" alt="Book cover" style="width: 100%; height: 100%;">
              <PageContent v-else :bookData="transformBookData[currentPage]"/>
            </div>
          </Transition>
          <div v-show="showAdelante" class="page" @click="flipPage">
            <PageContent :bookData="transformBookData[currentNextPage]"/>
          </div>
          
          <div v-if="!bookIsInFavorite" class="favorite-button">
            <button @click="addBookToFavorite"><img src="../assets/star-empty.png" alt="Favorite" class="icon is-large"></button>            
          </div>
          <div v-else class="favorite-button">
            <button @click="removeBookFromFavorite"><img src="../assets/star.png" alt="Favorite" class="icon is-large"></button>
          </div>
          <div v-if="!bookIsInCompleted" class="completed-button">
            <button @click="addBookToCompleted"><img src="../assets/completed-green.png" alt="Completed" class="icon is-large"></button>            
          </div>
          <div v-else class="completed-button">
            <button @click="removeBookFromCompleted"><img src="../assets/completed-red.png" alt="Completed" class="icon is-large"></button>
          </div>
          <div v-if="!bookIsInRecommended" class="recommended-button">
            <button @click="addBookToRecommended"><img src="../assets/recommended-green.png" alt="Recommended" class="icon is-large"></button>
          </div>
          <div v-else class="recommended-button">
            <button @click="removeBookFromRecommended"><img src="../assets/recommended-red.png" alt="Recommended" class="icon is-large"></button>
          </div>
          <div v-if="!bookIsInNext" class="next-button">
            <button @click="addBookToNext"><img src="../assets/next-green.png" alt="Next" class="icon is-large"></button>
          </div>
          <div v-else class="next-button">
            <button @click="removeBookFromNext"><img src="../assets/next-red.png" alt="Next" class="icon is-large"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageContent from './PageContent.vue';

export default {
  components: {
    PageContent
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    bookData: Object,
  },
  data() {
    return {
      show: true,
      showAtras: false,
      showAdelante: false,
      currentPage: 0,
      currentNextPage: 1,
      numPages: 4,
      recommendedBooks: [],
      completedBooks: [],
      nextBooks: [],
      favoriteBooks: [],
      bookIsInRecommended: false,
      bookIsInCompleted: false,
      bookIsInNext: false,
      bookIsInFavorite: false,
    }
  },
  mounted() {
    if (localStorage.getItem('favoriteBooks')) {
      this.completedBooks = JSON.parse(localStorage.getItem('completedBooks'));
    }  

    if (localStorage.getItem('completedBooks')) {
      this.completedBooks = JSON.parse(localStorage.getItem('completedBooks'));
    }  

    if (localStorage.getItem('recommendedBooks')) {
      this.recommendedBooks = JSON.parse(localStorage.getItem('recommendedBooks'));
    }

    if (localStorage.getItem('nextBooks')) {
      this.nextBooks = JSON.parse(localStorage.getItem('nextBooks'));
    }

    if (localStorage.getItem('favoriteBooks')) {
      this.favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks'));
    }

    this.checkBookInLists();
  },
  watch: {
    bookData: function() {
      this.bookIsInCompleted = false;
      this.bookIsInRecommended = false;
      this.bookIsInNext = false;
      this.bookIsInFavorite = false;
      this.checkBookInLists();
    }
  },
  computed: {
    transformBookData() {
      const bookInfo = this.bookData.volumeInfo;

      return [{
          cover: true,
          image: bookInfo.imageLinks.thumbnail || null,
        }, {
          cover: false,
          title: bookInfo.title || 'Title not available',
          authors: bookInfo.authors || [],
        }, {
          cover: false,
          title: "Detalles:",
          publishedDate: bookInfo.publishedDate || 'No date available',
          plubisher: bookInfo.publisher || 'No publisher available',
          contentVersion: bookInfo.contentVersion || 'No content version available',
          authors: []
        }, {
          cover: false,
          title: "Descripción:",
          description: bookInfo.description || 'No description available',
          authors: []
        }
      ]
    }
  },
  methods: {
    flipPage() {
      if (this.currentPage === this.numPages - 1) {
        this.showAtras = false
        this.showAdelante = false
        this.currentPage = 0
        this.currentNextPage = 1
        this.show = true
      } else {
        this.show = false
        this.showAtras = true
        this.showAdelante = true
        if (this.currentPage === this.numPages - 1) {
          this.showAdelante = false
          this.showAtras = false
        }
      }
    },
    beforeEnter() {
      this.currentNextPage = (this.currentPage + 1) % this.numPages
    },
    afterLeave() {
      this.currentPage = (this.currentPage + 1) % this.numPages
      this.currentNextPage = this.currentPage
      this.show = true
    },
    checkBookInLists() {
      let searched_id = this.bookData.id;
      // console.log(this.bookData.volumeInfo.title);
      this.completedBooks.forEach((book) => {
        if (book.id === searched_id) {
          this.bookIsInCompleted = true;          
        }        
      })        

      this.recommendedBooks.forEach((book) => {
        if (book.id === searched_id) {
          this.bookIsInRecommended = true;
        }
      })

      this.nextBooks.forEach((book) => {
        if (book.id === searched_id) {
          this.bookIsInNext = true;
        }
      })

      this.favoriteBooks.forEach((book) => {
        if (book.id === searched_id) {
          this.bookIsInFavorite = true;
        }
      })
    },
    addBookToCompleted() {
      let currentCompletedBooks = JSON.parse(localStorage.getItem('completedBooks'));
      currentCompletedBooks.push(this.bookData);
      localStorage.setItem('completedBooks', JSON.stringify(currentCompletedBooks));
      this.bookIsInCompleted = true;
    },
    addBookToRecommended() {
      let currentRecommendedBooks = JSON.parse(localStorage.getItem('recommendedBooks'));
      currentRecommendedBooks.push(this.bookData);
      localStorage.setItem('recommendedBooks', JSON.stringify(currentRecommendedBooks));
      this.bookIsInRecommended = true;
    },
    addBookToNext() {
      let currentNextBooks = JSON.parse(localStorage.getItem('nextBooks'));
      currentNextBooks.push(this.bookData);
      localStorage.setItem('nextBooks', JSON.stringify(currentNextBooks));
      this.bookIsInNext = true;
    },
    addBookToFavorite() {
      let currentFavoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks'));
      currentFavoriteBooks.push(this.bookData);
      localStorage.setItem('favoriteBooks', JSON.stringify(currentFavoriteBooks));
      this.bookIsInFavorite = true;
    },
    removeBookFromCompleted() {
      let currentCompletedBooks = JSON.parse(localStorage.getItem('completedBooks'));
      currentCompletedBooks = currentCompletedBooks.filter(book => book.id !== this.bookData.id);
      localStorage.setItem('completedBooks', JSON.stringify(currentCompletedBooks));
      this.bookIsInCompleted = false;
      if (this.$route.name === 'mybooks') {
        window.location.reload();
      }
    },
    removeBookFromRecommended() {
      let currentRecommendedBooks = JSON.parse(localStorage.getItem('recommendedBooks'));
      currentRecommendedBooks = currentRecommendedBooks.filter(book => book.id !== this.bookData.id);
      localStorage.setItem('recommendedBooks', JSON.stringify(currentRecommendedBooks));
      this.bookIsInRecommended = false;
      if (this.$route.name === 'recommended') {
        window.location.reload();
      }
    },
    removeBookFromNext() {
      let currentNextBooks = JSON.parse(localStorage.getItem('nextBooks'));
      currentNextBooks = currentNextBooks.filter(book => book.id !== this.bookData.id);
      localStorage.setItem('nextBooks', JSON.stringify(currentNextBooks));
      this.bookIsInNext = false;
      if (this.$route.name === 'nextbooks') {
        window.location.reload();
      }
    },
    removeBookFromFavorite() {
      let currentFavoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks'));
      currentFavoriteBooks = currentFavoriteBooks.filter(book => book.id !== this.bookData.id);
      localStorage.setItem('favoriteBooks', JSON.stringify(currentFavoriteBooks));
      this.bookIsInFavorite = false;
      if (this.$route.name === 'favorites') {
        window.location.reload();
      }
    }
  }
}
</script>

<style scoped>
*{
	font-family: sans-serif;
}

.vue-modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow-x: hidden;
overflow-y: auto;
background-color: rgba(0, 0, 0, 0.5);
z-index: 1;
justify-content: center;
align-items: center;
display: flex;
}

.table {
	width: 860px;
	height: 600px;
	position: relative;
  justify-content: flex-end;
	/* perspective: 1000px; */
  /* padding-right: 125px; */
  border-radius: 20px;
  background-color: #3b2b1a;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.book-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.page {
width: 275px;
height: 400px;
background-color: #fff;
border: 1px solid #ccc;
display: flex;
justify-content: center;
align-items: center;
transform-origin: left center;
}

.movePage {
  position: fixed; top: 173px; left: 843px;
}

.flip-enter-active, .flip-leave-active {
transition: transform 0.8s ease-in-out;
}

.flip-enter, .flip-leave-to {
transform: rotateY(-90deg);
}

.back-button {
  position: absolute;
  top: 1%;
  left: 0;
  margin-left: 10px;
  margin-top: 10px;
  background-color: #3b2b1a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.favorite-button {
  position: absolute;
  top: 1%;
  right: 0;
  margin-right: 10px;
  margin-top: 10px;
  background-color: #3b2b1a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.completed-button {
  position: absolute;
  bottom: 15px;
  right: 80%;
  border: none;
  cursor: pointer;
}

.recommended-button {
  position: absolute;
  bottom: 15px;
  right: 45%;
  border: none;
  cursor: pointer;
}

.next-button {
  position: absolute;
  bottom: 15px;
  right: 15%;
  border: none;
  cursor: pointer;
}
</style>
