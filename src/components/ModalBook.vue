<!-- https://github.com/Javierfelixuts/flip-book/tree/master/flip-book -->

<template>
  <div v-if="open">
    <div class="vue-modal" v-show="open">
      <transition name="slide">
        <div class="veu-modal-inner">
          <div class="vue-modal-content">
            <button type="button" @click="$emit('close')">Cerrar</button>
            <div class="container">
              <div class="book-content">
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
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

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
    };
  },
  computed: {
    transformBookData() {
      const bookInfo = this.bookData.volumeInfo;
      console.log(bookInfo)

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
}

.vue-modal-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.vue-modal-content {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
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
.container, .book-content{
	display: flex;
	justify-content: center;
	align-items: center;
  vertical-align: middle;
}
.container{
	width: 100%;
}

.book-content, .book-content-page{
	width: 660px;
	height: 485px;
	position: relative;
  justify-content: flex-end;
	perspective: 1000px;
  border-radius: 0.3rem;
  background-image: url('../assets/table2_big.png'); 
  padding-right: 45px;
}
.book{
  margin: 10px;
	position: absolute;
	width: 275px;
	height: 82%;
	transition: 1s;
	transform-style: preserve-3d;
	transform-origin: left; 
  justify-content: center;
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