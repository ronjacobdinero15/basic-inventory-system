const checkbox = document.getElementById('checkbox')
const tablesSection = document.querySelector('.tablesSection')

const inventoryItems = []

function checkIfExists(checkItem, inventoryItems) {
  for (let { item } of inventoryItems)
    if (checkItem == item) {
      return true
    }
}

// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const item = document.getElementById('item').value
  const quantity = document.getElementById('quantity').value

  // We can't let an input field be empty
  if (item.length == 0 || quantity.length == 0) {
    alert('Fill out the form first')
  }

  // If all input fields are not empty, go here
  else {
    // Check if item already exists
    if (checkIfExists(item, inventoryItems)) {
      alert('Item already taken')
    }

    // If it doesn't exist yet, go here
    else {
      let newItem = {
        item: item,
        quantity: quantity,
      }
      inventoryItems.push(newItem)

      const tr = document.createElement('tr')

      const tdItem = document.createElement('td')

      const tdQty = document.createElement('td')
      tdQty.setAttribute('data-quantity', quantity)

      tdItem.textContent = item
      tdQty.textContent = quantity

      tr.appendChild(tdItem)
      tr.appendChild(tdQty)

      // adding table row element to the table
      document.querySelector('table').appendChild(tr)
    }
  }
})

checkbox.addEventListener('change', function (e) {
  e.preventDefault()
  if (checkbox.checked == true) {
    tablesSection.style.display = 'block'
  } else {
    tablesSection.style.display = 'none'
  }
})

let table = document.querySelector('table')
table.addEventListener('click', function () {
  let cells = table.querySelectorAll('td[data-quantity]')
  cells.forEach(cell => {
    cell.addEventListener('click', function () {
      let input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.value = cell.getAttribute('data-quantity').trim()
      input.classList.add('input')

      cell.textContent = ''
      cell.appendChild(input)

      input.focus() // Automatically focus the input when clicked

      input.onchange = function () {
        cell.setAttribute('data-quantity', input.value)
      }
    })
  })
})
