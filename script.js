document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('button')
  const penColorInput = document.getElementById('pen-color')
  const bgColorInput = document.getElementById('bg-color')
  const menu = document.querySelector('.menu') // Select the menu div
  const modeButtons = ['fixed', 'random', 'darken'].map((mode) => {
    const button = document.createElement('button')
    button.textContent = mode.charAt(0).toUpperCase() + mode.slice(1)
    button.classList.add('pen-mode-button')
    button.dataset.mode = mode
    menu.appendChild(button)
    return button
  })

  const sizeSlider = document.createElement('input')
  sizeSlider.type = 'range'
  sizeSlider.min = '1'
  sizeSlider.max = '100'
  sizeSlider.value = '16'
  menu.appendChild(sizeSlider)

  const sizeLabel = document.createElement('label')
  sizeLabel.textContent = `Grid Size: ${sizeSlider.value} x ${sizeSlider.value}`
  menu.appendChild(sizeLabel)

  const toggleGridLinesButton = document.createElement('button')
  toggleGridLinesButton.textContent = 'Toggle Grid Lines'
  menu.appendChild(toggleGridLinesButton)

  let mode = 'fixed'
  let isDrawing = false
  let penColor = penColorInput.value
  let bgColor = bgColorInput.value
  let showGridLines = true

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
      if (showGridLines) {
        div.classList.add('with-border')
      }
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
    let size = parseInt(sizeSlider.value)
    createGrid(size)
  })

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode
      modeButtons.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
    })
  })

  penColorInput.addEventListener('input', (e) => {
    penColor = e.target.value
  })

  bgColorInput.addEventListener('input', (e) => {
    bgColor = e.target.value
    createGrid(container.childElementCount ** 0.5) // Recreate grid with new background color
  })

  sizeSlider.addEventListener('input', (e) => {
    sizeLabel.textContent = `Grid Size: ${e.target.value} x ${e.target.value}`
  })

  toggleGridLinesButton.addEventListener('click', () => {
    showGridLines = !showGridLines
    document.querySelectorAll('.grid-item').forEach((item) => {
      item.classList.toggle('with-border', showGridLines)
    })
  })

  createGrid(16) // Initial grid
  modeButtons[0].classList.add('active') // Set initial active mode button
})
