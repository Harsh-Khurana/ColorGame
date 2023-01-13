const randomColorGenerator = () => {
  const random256 = () => Math.floor(Math.random() * 256)
  const r = random256()
  const g = random256()
  const b = random256()
  return `rgb(${r}, ${g}, ${b})`
}

const infoIcon = document.querySelector('#infoIcon')
const infoContainer = document.querySelector('#infoContainer')
const headerColor = document.querySelector('h1 span')
const boxContainer = document.querySelector('#boxContainer')
const boxes = document.querySelectorAll('.box')
const displayText = document.querySelector('#controls span')
const levels = document.querySelectorAll('#levels button')
const refreshColors = document.querySelector('#controls button')

infoIcon.addEventListener('click', () => {
  infoContainer.classList.toggle('viewInfo')
})

infoContainer.addEventListener('click', () => {
  infoContainer.classList.toggle('viewInfo')
})

const initializeGame = (level = 'hard') => {
  refreshColors.classList.remove('playAgainAnimated')
  refreshColors.innerText = 'NEW COLORS'
  displayText.innerText = ''
  levels[0].classList.remove('levelSelected')
  levels[1].classList.add('levelSelected')

  for (let box of boxes) {
    box.classList.remove('hideBox')
    box.style.backgroundColor = randomColorGenerator()
  }
  let totalBoxes = boxes.length
  if (level === 'easy') {
    levels[1].classList.remove('levelSelected')
    levels[0].classList.add('levelSelected')
    totalBoxes = Math.floor(boxes.length / 2)
    for (let i = totalBoxes; i < boxes.length; i++) {
      boxes[i].classList.add('hideBox')
    }
  }
  const tempColor = boxes[Math.floor(Math.random() * totalBoxes)].style.backgroundColor
  headerColor.innerText = tempColor.toUpperCase()
  return tempColor
}

let guessColor = initializeGame()
const { backgroundColor: bodyBgColor } = getComputedStyle(document.body)

boxContainer.addEventListener('click', e => {
  if (e.target.className === 'box') {
    if (displayText.innerText === 'YOU WON') {
    } else if (e.target.style.backgroundColor === guessColor) {
      document.documentElement.style.setProperty('--primaryColor', guessColor)
      refreshColors.innerText = 'PLAY AGAIN?'
      refreshColors.classList.add('playAgainAnimated')
      displayText.innerText = 'YOU WON'
    } else {
      e.target.style.backgroundColor = bodyBgColor
      displayText.innerText = 'WRONG!'
    }
  }
})

refreshColors.addEventListener('click', () => {
  const currentLevel = levels[0].classList.contains('levelSelected') ? 'easy' : 'hard'
  guessColor = initializeGame(currentLevel)
})

for (let level of levels) {
  level.addEventListener('click', () => {
    guessColor = initializeGame(level.innerText.toLowerCase())
  })
}
