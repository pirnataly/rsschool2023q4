const burgerContainer = document.querySelector('.burger__container');
const navigation = document.querySelector('.navigation');
const navigationChildren = navigation.children;
const menuContainer = document.querySelector('.menu-container');
const menuTabs = document.querySelector('.menu-tabs');
let tabActive = menuTabs.children[0];
let category = 'coffee';
let size = 's';
const loadMoreButton = document.querySelector('.refresh-button');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupSizeTabs = document.querySelector('.popup__size-tabs');


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

//меню (вставка карточек)

async function getJson() {
    const productsUrl = 'products.json';
    const answer = await fetch(productsUrl);
    const promise = await answer.json();
    return promise;
}

async function getArrayFromPromise() {
    const array = await getJson();
    return array;
}

async function initSlider() {
    makeGallery(await getArrayFromPromise());
    showPopup(await getArrayFromPromise());
}

function makeGallery(products) {
    for (let i = 0; i < products.length; i += 1) {
        if (category.toLowerCase() === products[i].category) {
            menuContainer.append(makeItem(products[i]));
        }
    }
       }

function makeItem(product) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item column-container';
    const menuItemImage = document.createElement('div');
    menuItemImage.classList.add('menu-item__image');
    menuItemImage.style.backgroundImage = `url("${product.img}")`;
    menuItem.append((menuItemImage));
    const menuItemContent = document.createElement('div');
    menuItemContent.className = 'menu-item__content column-container';
    menuItem.append(menuItemContent);
    const menuItemHeading = document.createElement('h4');
    menuItemHeading.className = 'menu-item__heading heading3';
    menuItemHeading.textContent = product.name;
    menuItemContent.append(menuItemHeading);
    const menuItemDescription = document.createElement('p');
    menuItemDescription.className = 'menu-item__description medium';
    menuItemDescription.textContent = product.description;
    menuItemContent.append(menuItemDescription);
    const menuItemPrice = document.createElement('h4');
    menuItemPrice.className = 'menu-item__price heading3';
    menuItemPrice.textContent = `$${product.price}`;
    menuItemContent.append(menuItemPrice);
    return menuItem;
}


async function update() {
    menuContainer.innerHTML = "";
    makeGallery(await getArrayFromPromise())
    // for (let i = 0; i < products.length; i++) {
    //     track.append(makeItem(pets[i]));
    }


//menu-tabs switching

menuTabs.addEventListener('click', (ev) => {
    for (let menuTab of menuTabs.children) {
        menuTab.classList.remove('menu-tab_active');
        if (menuTab.contains(ev.target)) {
            menuTab.classList.add('menu-tab_active');
            category = menuTab.children[1].textContent.toLowerCase();
            loadMoreButton.classList.remove('invisible');
            menuContainer.classList.remove('load-more-mode')
            update();
            }
        }
    }
)

//load more

loadMoreButton.addEventListener('click',()=>{
    loadMoreButton.classList.add('invisible');
    menuContainer.classList.add('load-more-mode')
})

window.onresize = () => {
    loadMoreButton.classList.remove('invisible');
    menuContainer.classList.remove('load-more-mode')
}

//popup
function openPopup(){
    popup.classList.add('show_popup');
    overlay.classList.add('body_background');
    document.body.classList.add('lock');
    size='s';

}

function showPopup(products) {
    menuContainer.addEventListener('click', (e) => {
        getProductName(e);
        e.stopPropagation();
        findProduct(getProductName(e),products);
        openPopup();
    })
}

function outsideEvtListener(event) {
    if (!event.target.closest('.popup')) {
        popup.classList.remove('show_popup');
        overlay.classList.remove('body_background');
        document.body.classList.remove('lock');
        size='s';


    }
}

//закрытие модального окна вне щелчка по попапу
document.addEventListener('click',outsideEvtListener);
popup.addEventListener('click',(ev)=>{
    ev.stopPropagation();
})

//закрытие модального окна по кнопке
const popupButton = document.querySelector('.popup__button');
popupButton.addEventListener('click', (ev)=>{
    ev.stopPropagation();
    popup.classList.remove('show_popup');
    overlay.classList.remove('body_background');
    document.body.classList.remove('lock');
  ;
})


function getProductName(e) {
    let clickedItem;
    let productName;
    let target = e.target;
    for (let i = 0; i < menuContainer.children.length; i++) {
         if (target.classList.contains('menu-item')) {
            clickedItem=target;
            console.log('clickedItem1=', clickedItem);
            break;
        }
        if(target.parentElement.classList.contains('menu-item')) {
            clickedItem=target.parentElement;
            console.log('clickedItem2=', clickedItem);
            break;
        }
        if(menuContainer.children[i].contains(target)) {
            clickedItem=menuContainer.children[i];
            console.log('clickedItem3=', clickedItem);
            break;
        }


    }
    productName = clickedItem.children[1].children[0].textContent;
    console.log(productName,'=productName is');
    return productName;
}

function findProduct(productName,products){
    const popupImage = document.querySelector('.popup__image');
    const popupHeading = document.querySelector('.popup__heading');
    const popupDescription = document.querySelector('.popup__description');
    const popupSum = document.querySelector('.popup-price_sum');
    for(let i=0; i < products.length;i++) {
        if (productName === products[i].name) {
            popupImage.style.background = `url("${products[i].img}") no-repeat`;
            popupHeading.textContent=products[i].name;
             popupDescription.textContent=products[i].description;
           popupSum.textContent=`$${products[i].price}`;
            for (let popupSizeTab of popupSizeTabs.children) {
                popupSizeTab.classList.remove('size-tab_active');
        }
            popupSizeTabs.children[0].classList.add('size-tab_active');
        }

    }
}

//popup switching

// popupSizeTabs.addEventListener('click', (ev) => {
//     let currentprice = document.querySelector('.popup-price_sum')
//   let currentpriceNumber = Number(currentprice.textContent.slice(1));
//     console.log(currentpriceNumber);
//         for (let popupSizeTab of popupSizeTabs.children) {
//             popupSizeTab.classList.remove('size-tab_active');
//             if (popupSizeTab.contains(ev.target)) {
//                 popupSizeTab.classList.add('size-tab_active');
//                 size = popupSizeTab.children[0].textContent.toLowerCase();
//                 switch(size) {
//                     case 's': currentprice.textContent =`$${currentpriceNumber}`;
//                     break;
//                     case 'm': currentprice.textContent =`$${currentpriceNumber+0.5}`;
//                     break;
//                     case 's';
//                                  }
//
//             }
//         }
//     }
// )


initSlider();

