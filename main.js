var canvas = document.querySelector('canvas')
 
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)'
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0, 0, 255, 0.5)'
// c.fillRect(300, 300, 100, 100)

// // Line
// c.beginPath()
// c.moveTo(60, 70)
// c.lineTo(200, 100)
// c.lineTo(400, 300)
// c.lineTo(300, 50)
// c.strokeStyle = "#fa34a3"
// c.stroke()

// // Arc / Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'black'
// c.stroke()

const colors = [
    '#FF5733', // Vibrant Orange
    '#33FF57', // Lime Green
    '#3357FF', // Bright Blue
    '#FF33A1', // Hot Pink
    '#33FFF3', // Aqua Blue
    '#FF5733', // Tangerine
    '#5733FF', // Purple
    '#F3FF33', // Yellow
    '#FF3357', // Coral Red
    '#33FFA1'  // Mint Green
  ];


const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}



 

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

 


class Ball{
    
} 
 
let circleArray = [] 
// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate) 
    
}

const init = () => {
     
    animate()
}

init()