<!-- https://github.com/Javierfelixuts/flip-book/tree/master/flip-book -->

<template>
  <div v-if="open">
    <div class="vue-modal" v-show="open">
      <transition name="slide">
        <div class="book-content">
          <button type="button" class="back-button" @click="$emit('close')"><img src="../assets/x.png" alt="Back" class="icon is-medium"></button>
          <button type="button" class="favorite-button" @click="$emit('close')"><img src="../assets/star-empty.png" alt="Favorite" class="icon is-medium"></button>
          <div class="book" v-for="(book, index) in transformBookData" :key="index" ref="books">
            <template v-if="book.cover">
              <div class="face-front" :style="{ backgroundImage: 'url(' + book.image + ')', backgroundSize: '100% 100%' }" @click="flipCard($event, book)">
              </div>
              <div class="face-back" @click="flipCard($event, book)">
              </div>
            </template> 
            <template v-else>
              <div class="face-front" @click="flipCard($event, book)">
                <h1 class="inside-page-front">{{ book.title }}</h1>
                <p class="inside-page-front">{{ book.description }}</p>
                <p class="inside-page-front">{{ book.publishedDate }}</p>
                <p class="inside-page-front">{{ book.plubisher }}</p>
                <p class="inside-page-front">{{ book.contentVersion }}</p>
                <p class="inside-page-front">{{ book.plubisher }}</p>
                <p class="inside-page-front">{{ book.authors.join(', ')}}</p>
              </div>
              <div class="face-back" @click="flipCard($event, book)">
                {{ book.title2 }}
                {{ book.description2 }}
              </div>
            </template>
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
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    bookData: Object,
  },
  data() {
    return {
      rotation: 0,
      contZindex: 2,
      customZindex: 1,
      recommendedBooks: [],
      completedBooks: [],
      nextBooks: [],
      favoriteBooks: [],
      bookIsInRecommended: false,
      bookIsInCompleted: false,
      bookIsInNext: false,
      bookIsInFavorite: false,
    };
  },
  mounted() {
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
      // console.log(bookInfo)

      return [
        {
          cover: false,
          title: "Editorial:",
          description: bookInfo.description || 'No publisher available',
          title2: "",
          description2: '',
          authors: []
        },  
        {
          cover: false,
          firstPage: true,
          title: bookInfo.title || 'Title not available',
          description: bookInfo.subtitle || '',
          publishedDate: bookInfo.publishedDate || 'No date available',
          plubisher: bookInfo.publisher || 'No publisher available',
          authors: bookInfo.authors || [],
          contentVersion: bookInfo.contentVersion || 'No content version available',
          title2: "Precio:",
          description2: this.bookData.price || 'No price available'
        },
        {
          cover: true,
          image: bookInfo.imageLinks.thumbnail || null,
        }
      ]
    }
  },
  methods: {
    handleImageClick(event, book) {
      console.log("uno", event.target)
      event.stopPropagation(); // Stop event propagation
      console.log(event.target)
      this.flipCard(event, book); // Call flipCard method
    },
    flipCard(event, book) {
      const target = event.target;
      console.log(target)
      const bookElement = target.closest('.book');
      const front = bookElement.querySelector('.face-front');
      const back = bookElement.querySelector('.face-back');

      bookElement.style.zIndex = this.contZindex;
      this.contZindex++;

      if (target.classList.contains('face-cover')) {
        bookElement.style.zIndex = this.contZindex;
        this.contZindex += 20;
        setTimeout(() => {
          bookElement.style.transform = 'rotateY(-180deg)';
        }, 500);
      }
      if (target.classList.contains('face-front') || target.classList.contains('inside-page-front')) {
        bookElement.style.zIndex = this.contZindex;
        this.contZindex += 20;
        setTimeout(() => {
          bookElement.style.transform = 'rotateY(-180deg)';
        }, 500);
      }
      if (target.classList.contains('face-back')) {
        bookElement.style.zIndex = this.contZindex;
        this.contZindex += 20;
        setTimeout(() => {
          bookElement.style.transform = 'rotateY(0deg)';
        }, 500);
      }
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
    }
  }
};
</script>

<style scoped>
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.back-button {
  position: absolute;
  top: 1%;
  left: 0;
  padding-left: 10px;
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
  padding-right: 10px;
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
  border: none;
  cursor: pointer;
}

*{
	padding: 0;
	margin: 0;
	font-family: sans-serif;
}
p{
	margin-top: 10px;
	font-size: 13px;
	text-align: justify;
}
h1{
  text-align: center;
  margin: 20px 0;
}

.book-content{
	display: flex;
	justify-content: center;
	align-items: center;
  padding-top: 5px;
}

.book-content, .book-content-page{
	width: 860px;
	height: 600px;
	position: relative;
  justify-content: flex-end;
	perspective: 1000px;
  padding-right: 125px;
  border: 6px solid #3b2b1a;
  border-radius: 20px;
  background-color: #3b2b1a;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.book{
  margin: 10px;
	position: absolute;
	width: 275px;
	height: 70%;
	transition: 1s;
	transform-style: preserve-3d;
	transform-origin: left; 
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); 
}

.face-front, .face-back{
	width: 100%;
	height: 100%;
	background: #eeebeb;
	padding: 15px;
	box-sizing: border-box;
	overflow: hidden;
  overflow-y: auto;
}
.face-front{
	box-shadow: inset 3px 0px 10px -7px black;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
}
.face-front img{
  height: 100%;
  width: 100%;
  justify-content: center;
}
.face-back{
	position: absolute;
	top: 0;
	left: 0;
	transform: translateZ(-1px) rotateY(180deg);
	box-shadow: inset -3px 1px 10px -7px black;
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
}
#portada-back{
	background: url('../img/portadaBack.jpg');
}
#portada, #portada-back{
	background-size: 100% 100%;
}
.trnsf{
	transform: translateX(80px);
}
.trnsf-reset{
	transform: translateX(0px);
}
@media screen and (max-width: 800px){
	p{
		font-size: 12px;
	}
}
</style>