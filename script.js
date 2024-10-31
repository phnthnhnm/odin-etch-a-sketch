document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('button')
  const modeSelect = document.createElement('select')
  const fixedOption = document.createElement('option')
  const randomOption = document.createElement('option')

  fixedOption.value = 'fixed'
  fixedOption.textContent = 'Fixed Color'
  randomOption.value = 'random'
  randomOption.textContent = 'Random Color'

  modeSelect.appendChild(fixedOption)
  modeSelect.appendChild(randomOption)
  document.body.insertBefore(modeSelect, container)

  let useRandomColor = false

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
      container.appendChild(div)

      div.addEventListener('mouseover', () => {
        div.style.backgroundColor = useRandomColor ? getRandomColor() : '#000'
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
    useRandomColor = modeSelect.value === 'random'
  })

  createGrid(16) // Initial grid
})
