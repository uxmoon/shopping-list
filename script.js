const form = document.getElementById('item-form')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')
const btnClear = document.getElementById('clear')

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
  list.appendChild(li)
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

function clearItems() {
  while (list.firstChild) {
    list.firstChild.remove()
  }
}

form.addEventListener('submit', onSubmit)
list.addEventListener('click', removeItem)
btnClear.addEventListener('click', clearItems)
