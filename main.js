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

const friction = 0.95
const gravity = 1
// Objects

  
class Ball{
    constructor(x, y, dX, dY, radius, color){
        this.x = x
        this.y = y
        this.dX = dX
        this.dY = dY
        this.radius = radius
        this.color = color;
        this.defaultRadius = radius; 
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dX = -this.dX 
            this.dY = this.dY * friction
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dY = -this.dY * friction
            this.dX = this.dX * friction
        }else{
            this.dY = this.dY + gravity
        }
        
    
        this.x = this.x + this.dX
        this.y = this.y + this.dY

        console.log(this.dY)
        this.draw()
    }
} 
 
let circleArray = [] 
// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)  
    circleArray.forEach(circle => {
        circle.update()
    })
}

const init = () => { 
    circleArray = []
    for(let i = 0; i < 100; i++){
        var radius = randomIntFromRange(10, 50)
        var x = randomIntFromRange(radius, canvas.width - radius)
        var y = randomIntFromRange(radius, canvas.height - radius)
        var dX = randomIntFromRange(-2, 2)
        var dY = randomIntFromRange(-2, 2)
        var color = randomColor()
        circleArray.push(new Ball(x, y, dX, dY, radius, color))
    }
    var ball = new Ball(50, 50, 3, 3, 50, colors[Math.floor(Math.random() * colors.length)])
    circleArray.push(ball)
    animate()
}

init()