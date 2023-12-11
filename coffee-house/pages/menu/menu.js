const burgerContainer = document.querySelector('.burger__container');
const navigation = document.querySelector('.navigation');
const navigationChildren = navigation.children;
const menuContainer = document.querySelector('.menu-container');
const menuTabs = document.querySelector('.menu-tabs');
let tabActive = menuTabs.children[0];
let category = 'coffee';
const loadMoreButton = document.querySelector('.refresh-button');

console.log(loadMoreButton);


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
    console.log(category);
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
            console.log(category.toLowerCase());
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


initSlider();
