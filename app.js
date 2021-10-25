const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
// const btnReset = document.querySelector('.reset')
const colors = ['Lime', 'Crimson','Aqua','MediumPurple','DimGrey','Moccasin','DarkRed','GhostWhite',]
let time = 0
let score = 0
startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame () {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    // timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет <span class="primary">${score}</span></h1>`
}
// btnReset.addEventListener('click', event => {

// })

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(20, 60)
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.backgroundColor = `${colors[getRandomNumber(0, 7)]}`

    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.style.top = `${y}px`  // Vertical
    circle.style.left = `${x}px` // Horizontal

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

document.addEventListener('keydown', event => {
    console.log(event.key)
    if (event.key === 'h' || event.key === 'р') {
        hackGame()
    }

})

function hackGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }

    }
    setInterval(kill, 10)
}