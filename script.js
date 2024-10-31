document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const button = document.querySelector('button')

  function createGrid(size) {
    container.innerHTML = '' // Clear existing grid
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
      const div = document.createElement('div')
      div.classList.add('grid-item')
      div.style.width = `${960 / size}px`
      div.style.height = `${960 / size}px`
      container.appendChild(div)

      div.addEventListener('mouseover', () => {
        div.style.backgroundColor = '#000'
      })
    }
  }

  button.addEventListener('click', () => {
    let size = parseInt(prompt('Enter the number of squares per side (max 100):'))
    if (size > 100) size = 100
    if (size < 1 || isNaN(size)) size = 16 // Default to 16 if invalid input
    createGrid(size)
  })

  createGrid(16) // Initial grid
})
