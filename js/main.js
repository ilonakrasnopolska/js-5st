// Array at catalog
let catalogArr = [
  {
    title: "iPhone 14 Pro",
    price: 110000,
    desc: "Смартфон Apple iPhone 14 Pro 128GB",
    img: 'img/1.jpg'
  },
  {
    title: "AirPods Pro",
    price: 2100,
    desc: "Наушники Apple AirPods Pro (2-го поколения, 2022)",
    img: 'img/2.jpg'
  },
  {
    title: "Чехол iPhone 14 Pro",
    price: 1200,
    desc: "Чехол для Apple iPhone 14 Pro - желтый",
    img: 'img/3.jpg'
  }
]

//Array at basket
let basketArr = []

//Final price all product
let finalPrice = 0

//Function create title h
function createTitle(h, className, text) {
  let title = document.createElement(h)
  title.classList.add(className)
  title.textContent = text
  return title
}

//Function create div
function createDiv(className) {
  let div = document.createElement('div')
  div.classList.add(className)
  return div
}

//Function create paragraph
function createParagraph(className, text) {
  let paragraph = document.createElement('p')
  paragraph.classList.add(className)
  paragraph.textContent = text
  return paragraph
}

//Function create strong
function createStrong(className, text) {
  let strong = document.createElement('strong')
  strong.classList.add(className)
  strong.textContent = text
  return strong
}

//Function create button
function createButton(className, text) {
  let button = document.createElement('button')
  button.classList.add(className)
  button.textContent = text
  return button
}

//Function create img
function createPicture(className, src) {
  let img = document.createElement('img')
  img.classList.add(className)
  img.setAttribute('src', src) //принимает путь к img
  img.setAttribute('width', '100%') //принимает ширину img
  img.setAttribute('height', '50%') //принимает длину img
  return img
}

//Function create list-item
function createListItem(url, subtitle, about, cost, i) {

  let li = document.createElement('li') //create li
  li.classList.add('list-item')  //add class for li

  let img = createPicture('list-item__product-img', url)

  let div = createDiv('list-item__content') //create div for txt content inside li

  let title = createTitle('h3', 'list-item__content-title', subtitle) //create title for li

  let paragraph = createParagraph('list-item__content-desc', about) //create p with description for li

  let strong = createStrong('list-item__content-price', `${cost} RUB`) //create strong with price for li

  let button = createButton('list-item__content-btn', '+ Add to cart') //create btn for li

  button.onclick = function () { //func onclick at btn add product

    let newObj = { //create new obj for basket list
      title: subtitle,
      price: cost,
      img: url,
    }

    basketArr.push(newObj) //add new product at basket array
    renderBasket(basketArr) //render basket
  }

  div.append(title, paragraph, strong, button) //wrapped content in div for li

  li.append(img, div) //add content to li

  return li
}

//Function create basket button and basket window
function createBasket() {

  const basketBox = createDiv('basket') //create div for basket

  let basketButton = createButton('basket-btn') //create btn
  let basketSvg = createPicture('basket-btn__svg', 'img/basket.svg') //create svg for button basket

  let basketOpenSvg = createPicture('basket-btn__open-svg', 'img/close.svg'); //create svg for open basket


  basketButton.onclick = function () { //func onclick at basket
    basketWindow.classList.toggle('basket-window__visible') //add class for visibility window

    if (basketWindow.classList.contains('basket-window__visible')) { //checked
      basketSvg.remove();
      basketButton.append(basketOpenSvg);
    } else {
      basketOpenSvg.remove();
      basketButton.append(basketSvg);
    }
  }

  let emptyListTxt = createStrong('basket-window__empty-list', 'Cart is empty')

  let orderButton = createButton('basket-window__btn', `Order for the amount of ${finalPrice} $`)
  basketWindow.append(emptyListTxt, orderButton)


  orderButton.onclick = function () { //func onclick at order button
    alert('The website is under construction')
  }

  basketButton.append(basketSvg) //add svg at button
  basketBox.append(basketButton, basketWindow) //add btn at div
  section.append(basketBox)
}

//Function create list item at basket
function createListItemAtBasket(url, subtitle, cost, i) {
  let li = document.createElement('li') //create li
  li.classList.add('basket__list-item')  //add class for li

  let img = createPicture('basket__list-item-img', url) //create img

  let div = createDiv('basket__list-item-content') //create div for txt content inside li

  let title = createTitle('h3', 'basket__list-item-title', subtitle) //create title for li

  let strong = createStrong('basket__list-item-price', `${cost} RUB`) //create strong with price for li

  let button = createButton('basket__list-item-remove-btn', 'Remove') //create btn for li

  button.onclick = function() { //func onclick remove at product
    basketArr.splice(i, 1) //remove product from array

    renderBasket(basketArr) //render basket list
  }

  div.append(title, strong)
  li.append(img, div, button)

  return li
}

//Render function for catalog
function renderCatalog(productArr) {
  list.innerHTML = '' //clear ul

  for (i = 0; i < productArr.length; i++) { //loop to add products in list
    let listItem = createListItem(productArr[i].img, productArr[i].title, productArr[i].desc, productArr[i].price, i)
    list.append(listItem)
  }

}

//Render function for basket
function renderBasket(productArr) {
  basketList.innerHTML = '' //clear ul
  finalPrice = 0

  for (i = 0; i < productArr.length; i++) { //loop to add products in list
    let listItem = createListItemAtBasket(productArr[i].img, productArr[i].title, productArr[i].price, i)
    finalPrice += productArr[i].price
    basketList.append(listItem)
  }

  basketWindow.append(basketList)
  basketWindow.classList.add('product-in-cart') //add class for basket window


  if (basketWindow.classList.contains('product-in-cart')) { //checked if added products - remove txt empty list
    let childElement = basketWindow.querySelector('.basket-window__empty-list');
    if (childElement) {
      childElement.remove();
    }
  }

  let childElement = basketWindow.querySelector('.basket-window__btn') //find button for order products
  childElement.textContent = `Order for the amount of ${finalPrice} $` //render text content for button
}

//Creating container
const container = createDiv('container')

//Creating a title
const subtitle = createTitle('h1', 'title', 'Catalog')

//Creating section
const section = createDiv('section')

//Creating ul for catalog
const list = document.createElement('ul')
list.classList.add('list')

//Creating div at basket
const basketWindow = createDiv('basket-window')

//Creating ul at basket for chosen product
const basketList = document.createElement('ul')
basketList.classList.add('basket__list')

//call func render for creating list
renderCatalog(catalogArr)

section.append(list)
container.append(subtitle, section)

//call func for creating basket button
createBasket()

document.body.append(container)
