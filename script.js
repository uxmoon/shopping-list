const form = document.getElementById('item-form')
const inputAdd = document.getElementById('item-input')
const list = document.getElementById('item-list')

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
  // console.log(li)
}

function createButton() {
  const button = document.createElement('button')
  button.innerHTML = '&times; remove'
  return button
}

form.addEventListener('submit', onSubmit)
