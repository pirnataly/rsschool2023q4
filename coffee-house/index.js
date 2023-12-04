const burgerContainer = document.querySelector('.burger__container');
const navigation = document.querySelector('.navigation');
const navigationChildren = navigation.children;



burgerContainer.addEventListener('click',()=> {
  burgerContainer.classList.toggle('burger_active');
  navigation.classList.toggle('burger__menu_show');
  document.body.classList.toggle('lock');
})

navigation.addEventListener('click',(ev)=>{
   for(let child of navigationChildren) {
    if (child.contains(ev.target)){
      burgerContainer.classList.remove('burger_active');
      navigation.classList.remove('burger__menu_show');
      document.body.classList.remove('lock');
    }
  }
} )