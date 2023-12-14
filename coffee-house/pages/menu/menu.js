const burgerContainer = document.querySelector('.burger__container');
const navigation = document.querySelector('.navigation');
const navigationChildren = navigation.children;
const menuContainer = document.querySelector('.menu-container');
const menuTabs = document.querySelector('.menu-tabs');
let tabActive = menuTabs.children[0];
let category = 'coffee';
let sizeActive = 's';
const loadMoreButton = document.querySelector('.refresh-button');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const popupSizeTabs = document.querySelector('.popup__size-tabs');
const additiveTabs = document.querySelector('.additive-tabs');
let initProducts;
let sumOfAdditives = 0;

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
    initProducts = array;
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

loadMoreButton.addEventListener('click', () => {
    loadMoreButton.classList.add('invisible');
    menuContainer.classList.add('load-more-mode')
})

window.onresize = () => {
    loadMoreButton.classList.remove('invisible');
    menuContainer.classList.remove('load-more-mode')
}

//popup
function openPopup() {
    popup.classList.add('show_popup');
    overlay.classList.add('body_background');
    document.body.classList.add('lock');
    sizeActive = 's';

}

function showPopup(products) {
    menuContainer.addEventListener('click', (e) => {
        getProductName(e);
        e.stopPropagation();
        findProduct(getProductName(e), products);
        openPopup();
    })
}

function outsideEvtListener(event) {
    if (!event.target.closest('.popup')) {
        popup.classList.remove('show_popup');
        overlay.classList.remove('body_background');
        document.body.classList.remove('lock');
        sizeActive = 's';
        sumOfAdditives = 0;


    }
}

//закрытие модального окна вне щелчка по попапу
document.addEventListener('click', outsideEvtListener);
popup.addEventListener('click', (ev) => {
    ev.stopPropagation();
})

//закрытие модального окна по кнопке
const popupButton = document.querySelector('.popup__button');
popupButton.addEventListener('click', (ev) => {
    ev.stopPropagation();
    popup.classList.remove('show_popup');
    overlay.classList.remove('body_background');
    document.body.classList.remove('lock');
    sumOfAdditives = 0;

})


function getProductName(e) {
    let clickedItem;
    let productName;
    let target = e.target;
    for (let i = 0; i < menuContainer.children.length; i++) {
        if (target.classList.contains('menu-item')) {
            clickedItem = target;
            break;
        }
        if (target.parentElement.classList.contains('menu-item')) {
            clickedItem = target.parentElement;
            break;
        }
        if (menuContainer.children[i].contains(target)) {
            clickedItem = menuContainer.children[i];
            break;
        }


    }
    productName = clickedItem.children[1].children[0].textContent;
     return productName;
}

function findProduct(productName, products) {
    const popupImage = document.querySelector('.popup__image');
    const popupHeading = document.querySelector('.popup__heading');
    const popupDescription = document.querySelector('.popup__description');
    const popupSum = document.querySelector('.popup-price_sum');
    const additives = document.querySelector('.additive-tabs');
    for (let i = 0; i < products.length; i++) {
        if (productName === products[i].name) {
            popupImage.style.background = `url("${products[i].img}") no-repeat`;
            popupHeading.textContent = products[i].name;
            popupDescription.textContent = products[i].description;
            popupSum.textContent = `$${products[i].price}`;
            for (let j = 0; j < 3; j += 1) {
                additives.children[j].children[1].textContent = products[i].additives[j].name;
                additives.children[j].children[1].textContent = products[i].additives[j].name;
                additives.children[j].children[1].textContent = products[i].additives[j].name;
            }
            for (let popupSizeTab of popupSizeTabs.children) {   //перенести?
                popupSizeTab.classList.remove('size-tab_active');
            }
            for (let k = 0; k < 3; k += 1) {
                additives.children[k].classList.remove('additive-tab_active');
            }
            popupSizeTabs.children[0].classList.add('size-tab_active');
        }

    }
}

//popup-size-tab switching
popupSizeTabs.addEventListener('click', (ev) => {
        for (let popupSizeTab of popupSizeTabs.children) {
            popupSizeTab.classList.remove('size-tab_active');
            if (popupSizeTab.contains(ev.target)) {
                popupSizeTab.classList.add('size-tab_active');
                sizeActive = popupSizeTab.children[0].textContent.toLowerCase();
            }
        }
        showTotalSum(countTotalSum(initProducts, ev));
    }
)

//popup additives switching
const additives = document.querySelectorAll('.additive-tab');

for (let k = 0; k < additives.length; k += 1) {
    additives[k].addEventListener('click', (ev) => {
            additives[k].classList.toggle('additive-tab_active');
        }
    )

}
additiveTabs.addEventListener('click', (ev) => {
    sumOfAdditives = 0;
    for (let additiveTab of additiveTabs.children) {
        if (additiveTab.classList.contains('additive-tab_active')) {
            sumOfAdditives += 1;
        }
        showTotalSum(countTotalSum(initProducts, ev));
    }
})


function countTotalSum(arrayProducts, event) {
    const popupHeading = document.querySelector('.popup__heading');
    let sum;
    for (let i = 0; i < arrayProducts.length; i += 1) {
        if (popupHeading.textContent === arrayProducts[i].name) {
            const productsPriceToNumber = +arrayProducts[i].price;
            let priceForSize = (sizeActive === 'm') ? 0.5 : (sizeActive === 'l') ? 1 : 0;
            sum = productsPriceToNumber + priceForSize + sumOfAdditives * 0.5;

        }
    }
    return sum
}

function showTotalSum(number) {
    const popupSum = document.querySelector('.popup-price_sum');
    popupSum.textContent = `$${number}`
}


initSlider();

