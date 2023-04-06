const form = document.getElementById('item-form')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')
const btnClear = document.getElementById('clear')
const itemsFilter = document.getElementById('filter')

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

function removeItem(e) {
  if (confirm('Are you sure?')) {
    e.target.parentElement.remove()
    checkEmptyList()
  }
}

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

function clearItems() {
  while (list.firstChild) {
    list.firstChild.remove()
  }
  checkEmptyList()
}

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

form.addEventListener('submit', onAddItemSubmit)
list.addEventListener('click', removeItem)
btnClear.addEventListener('click', clearItems)
itemsFilter.addEventListener('input', filterItems)
checkEmptyList()
