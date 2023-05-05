const form = document.getElementById('item-form')
const formButton = document.querySelector('button')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')
const btnClear = document.getElementById('clear')
const itemsFilter = document.getElementById('filter')
let isEditMode = false

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => addItemToDOM(item))
  resetUI()
}

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = inputAdd.value

  // validate empty field
  if (newItem === '') {
    alert('Please add an item')
    return
  }

  // Check edit mode
  if (isEditMode) {
    const itemEdit = list.querySelector('.edit-text')
    removeItemFromStorage(itemEdit.firstChild.textContent)
    itemEdit.classList.remove('edit-text')
    itemEdit.remove()
    isEditMode = false
  } else {
    if (checkExistingItem(newItem)) {
      alert('That item already exists')
      return
    }
  }

  // Create DOM element
  addItemToDOM(newItem)

  // Add item to localStorage
  addItemToStorage(newItem)

  // Check if list is empty
  resetUI()

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
  } else {
    setItemToEdit(e.target)
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove()
    // Remove item from localStorage
    removeItemFromStorage(item.firstChild.textContent)
    resetUI()
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()

  // Filter out selected item
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // Set new items array to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function setItemToEdit(item) {
  // update edit mode
  isEditMode = true
  list.querySelectorAll('li').forEach((i) => i.classList.remove('edit-text'))
  // Set edit styles
  item.classList.add('edit-text')
  // Update button text
  formButton.innerHTML = 'Edit'
  formButton.classList.add('btn-edit')
  // Set item value in input field
  inputAdd.value = item.firstChild.textContent
}

function clearItems() {
  while (list.firstChild) {
    list.firstChild.remove()
  }
  // Clear from localStorage
  localStorage.removeItem('items')
  resetUI()
}

/**
 * Show or hide Filter and Clear button
 */

function resetUI() {
  inputAdd.textContent = ''
  const items = document.querySelectorAll('li')
  if (items.length === 0) {
    btnClear.style.display = 'none'
    itemsFilter.style.display = 'none'
  } else {
    btnClear.style.display = 'block'
    itemsFilter.style.display = 'block'
  }
  formButton.innerHTML = '&plus; Add item'
  formButton.classList.remove('btn-edit')
  isEditMode = false
}

function checkExistingItem(item) {
  const itemsFromStorage = getItemsFromStorage()
  return itemsFromStorage.includes(item)
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
  resetUI()
}

init()
