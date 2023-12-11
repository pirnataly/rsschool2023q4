const burgerContainer = document.querySelector('.burger__container');
const navigation = document.querySelector('.navigation');
const navigationChildren = navigation.children;
const sliderTrack = document.querySelector('.slider-track');
const paginationLeft = document.querySelector('.pagination-button_left');
const paginationRight = document.querySelector('.pagination-button_right');
const controls = document.querySelectorAll('.control');
const sliderItems = document.querySelectorAll('.slider__item');
let position = 0;
let controlIndex = 0;
let sliderItemWidth;
let controlActive = controls[0];
let timerId;
let progressId;
let initProducts;

countItemWidth();

//бургер
burgerContainer.addEventListener('click', () => {
  burgerContainer.classList.toggle('burger_active');
  navigation.classList.toggle('burger__menu_show');
  document.body.classList.toggle('lock');
})

navigation.addEventListener('click', (ev) => {
  for (let child of navigationChildren) {
    if (child.contains(ev.target)) {
      burgerContainer.classList.remove('burger_active');
      navigation.classList.remove('burger__menu_show');
      document.body.classList.remove('lock');
    }
  }
})


//carousel
paginationRight.addEventListener('click',()=> {
  clearTimeout(timerId);
  nextSlide();
  start();
});
paginationLeft.addEventListener('click',()=>{
  clearTimeout(timerId);
  prevSlide();
  start();
});


window.addEventListener('resize', (e) => {
  countItemWidth();
});

// sliderItems.forEach((item)=> {
//   item.addEventListener('pointerenter',(e)=> {
//     if(item===e.target) {
//       clearTimeout(progressId);
//       clearTimeout(timerId)
//     }
//   });
//   item.addEventListener('pointerleave',(e)=> {
//     if(item === e.target) {
//   //
//     }
//   })
// })

//functions

const nextSlide = () => {
  if (position < sliderItemWidth * (controls.length - 1)) {
    position += sliderItemWidth;
    controlIndex++;
  } else {
    position = 0;
    controlIndex = 0;
  }
  sliderTrack.style.left = -position + 'px';
  matchControl(controlIndex);
  progressBar();
  }

const prevSlide = () => {
    if (position !== 0) {
    position -= sliderItemWidth;
    controlIndex--;
  } else {
    position = sliderItemWidth * (controls.length - 1);
    controlIndex = controls.length - 1;
  }
  sliderTrack.style.left = -position + 'px';
  matchControl(controlIndex);
}

function countItemWidth() {
    const sliderItem = sliderTrack.firstElementChild;
    sliderItemWidth = parseInt(getComputedStyle(sliderItem).width);
     return sliderItemWidth;

}

function matchControl(index) {
  for (let control of controls) {
    control.classList.remove('control_active');
  }
  controls[index].classList.add('control_active');
   controlActive = controls[index];
  }

function start(){
  timerId =  setTimeout(()=> next(),6000);
  progressBar();
}

function next(){
  nextSlide()
 timerId = setTimeout(next,6000);
}

start();

function progressBar() {
  let progress=0;
  const progressBarActive = controlActive?.querySelector('.progressBar');
  progressBarActive.style.width = 0 + '%';
  function increaseProgress() {
      progressId = setTimeout(()=> {
      if(progress < 100){
        progress++;
        progressBarActive.style.width = progress + "%";
        increaseProgress();
         }

    },50)
  }
   increaseProgress();
}





