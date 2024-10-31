document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('button')
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

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
  }

  function darkenColor(color) {
    const match = color.match(/rgba?\((\d+), (\d+), (\d+),? ?(\d?.?\d*)?\)/)
    if (!match) return 'rgba(0, 0, 0, 0.1)'
    let [r, g, b, a] = match.slice(1).map(Number)
    a = a ? a + 0.1 : 0.1
    if (a > 1) a = 1
    return `rgba(${r}, ${g}, ${b}, ${a})`
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
      div.style.backgroundColor = 'rgba(0, 0, 0, 0)' // Initialize with transparent background
      container.appendChild(div)

      div.addEventListener('mouseover', () => {
        if (mode === 'random') {
          div.style.backgroundColor = getRandomColor()
        } else if (mode === 'darken') {
          const currentColor = div.style.backgroundColor
          const newColor = darkenColor(currentColor)
          if (newColor !== currentColor) {
            div.style.backgroundColor = newColor
          }
        } else {
          div.style.backgroundColor = '#000'
        }
      })
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

  createGrid(16) // Initial grid
})
