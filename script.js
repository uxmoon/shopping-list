const form = document.getElementById('item-form')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')
const btnClear = document.getElementById('clear')
const itemsFilter = document.getElementById('filter')

function onSubmit(e) {
  e.preventDefault()

  const newItem = inputAdd.value

  // validate empty field
  if (newItem === '') {
    alert('Please add an item')
    return
  }

  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  const button = createButton()
  li.appendChild(button)

  // add item to list
  list.appendChild(li)
  checkEmptyList()
  inputAdd.value = ''
}

function createButton() {
  const button = document.createElement('button')
  button.innerHTML = '&times; remove'
  return button
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('list-item')) {
    e.target.parentElement.remove()
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
}

form.addEventListener('submit', onSubmit)
list.addEventListener('click', removeItem)
btnClear.addEventListener('click', clearItems)

checkEmptyList()
