const form = document.getElementById('item-form')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')
const btnClear = document.getElementById('clear')
const itemsFilter = document.getElementById('filter')

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => addItemToDOM(item))
  checkEmptyList()
}

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = inputAdd.value

  // validate empty field
  if (newItem === '') {
    alert('Please add an item')
    return
  }
  // Create DOM element
  addItemToDOM(newItem)

  // Add item to localStorage
  addItemToStorage(newItem)

  // Check if list is empty
  checkEmptyList()

  // Clear input text
  inputAdd.value = ''
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))
  const button = createButton()
  li.appendChild(button)

  // add item to list
  list.appendChild(li)
}

function createButton() {
  const button = document.createElement('button')
  button.className = 'btn-remove'
  button.innerHTML = '&times; remove'
  return button
}

/**
 * LocalStorage
 */
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage()

  // Add new item to array
  itemsFromStorage.push(item)

  // set new item to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
  let itemsFromStorage
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  return itemsFromStorage
}

/**
 * Remove item/s
 */

function onClickItem(e) {
  if (e.target.classList.contains('btn-remove')) {
    removeItem(e.target.parentElement)
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove()
    // Remove item from localStorage
    removeItemFromStorage(item.firstChild.textContent)
    checkEmptyList()
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()

  // Filter out selected item
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // Set new items array to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
  while (list.firstChild) {
    list.firstChild.remove()
  }
  // Clear from localStorage
  localStorage.removeItem('items')
  checkEmptyList()
}

/**
 * Show or hide Filter and Clear button
 */

function checkEmptyList() {
  const items = document.querySelectorAll('li')
  if (items.length === 0) {
    btnClear.style.display = 'none'
    itemsFilter.style.display = 'none'
  } else {
    btnClear.style.display = 'block'
    itemsFilter.style.display = 'block'
  }
}

/**
 * Filter items
 */

function filterItems(e) {
  // get list items
  const items = document.querySelectorAll('li')
  // get input value and transform to lowercase
  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    // get item text and transform to lowercase
    const itemText = item.firstChild.textContent.toLowerCase()
    // compare text input and list item text, returns true or false
    if (itemText.indexOf(text) != -1) {
      // console.log('true')
      item.style.display = 'flex'
    } else {
      // console.log('false')
      item.style.display = 'none'
    }
  })
}

function init() {
  form.addEventListener('submit', onAddItemSubmit)
  list.addEventListener('click', onClickItem)
  btnClear.addEventListener('click', clearItems)
  itemsFilter.addEventListener('input', filterItems)
  window.addEventListener('DOMContentLoaded', displayItems)
  checkEmptyList()
}

init()
