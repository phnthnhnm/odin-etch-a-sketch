document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('button')
  const penColorInput = document.getElementById('pen-color')
  const bgColorInput = document.getElementById('bg-color')
  const modeSelect = document.createElement('select')
  const fixedOption = document.createElement('option')
  const randomOption = document.createElement('option')
  const darkenOption = document.createElement('option')

  fixedOption.value = 'fixed'
  fixedOption.textContent = 'Fixed Color'
  randomOption.value = 'random'
  randomOption.textContent = 'Random Color'
  darkenOption.value = 'darken'
  darkenOption.textContent = 'Progressive Darken'

  modeSelect.appendChild(fixedOption)
  modeSelect.appendChild(randomOption)
  modeSelect.appendChild(darkenOption)
  document.body.insertBefore(modeSelect, container)

  let mode = 'fixed'
  let isDrawing = false
  let penColor = penColorInput.value
  let bgColor = bgColorInput.value

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
  }

  function createGrid(size) {
    container.innerHTML = '' // Clear existing grid

    const containerSize = container.clientWidth // Get the container size
    const itemSize = containerSize / size // Calculate the size of each grid item

    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div')
      div.classList.add('grid-item')
      div.style.width = `${itemSize}px`
      div.style.height = `${itemSize}px`
      div.style.backgroundColor = bgColor // Initialize with background color
      div.dataset.darkness = '0' // Initialize darkness level
      container.appendChild(div)

      div.addEventListener('mousedown', () => {
        isDrawing = true
        applyColor(div)
      })

      div.addEventListener('mouseover', () => {
        if (isDrawing) {
          applyColor(div)
        }
      })

      div.addEventListener('mouseup', () => {
        isDrawing = false
      })

      // Prevent default drag behavior
      div.addEventListener('dragstart', (e) => {
        e.preventDefault()
      })
    }

    document.addEventListener('mouseup', () => {
      isDrawing = false
    })
  }

  function applyColor(div) {
    if (mode === 'random') {
      div.style.backgroundColor = getRandomColor()
    } else if (mode === 'darken') {
      let darkness = parseFloat(div.dataset.darkness)
      if (darkness < 1) {
        darkness += 0.1
        div.dataset.darkness = darkness
        div.style.backgroundColor = `rgba(0, 0, 0, ${darkness})`
      }
    } else {
      div.style.backgroundColor = penColor
    }
  }

  button.addEventListener('click', () => {
    let size = parseInt(prompt('Enter the number of squares per side (max 100):'))
    if (size > 100) size = 100
    if (size < 1 || isNaN(size)) size = 16 // Default to 16 if invalid input
    createGrid(size)
  })

  modeSelect.addEventListener('change', () => {
    mode = modeSelect.value
  })

  penColorInput.addEventListener('input', (e) => {
    penColor = e.target.value
  })

  bgColorInput.addEventListener('input', (e) => {
    bgColor = e.target.value
    createGrid(container.childElementCount ** 0.5) // Recreate grid with new background color
  })

  createGrid(16) // Initial grid
})
