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


const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x1 - x2
    const dy = y1 - y2
    return Math.sqrt(dx * dx + dy * dy)
}


class Enemy{
    constructor(x, y, dX, dY, radius, color){
        this.x = x
        this.y = y
        this.dX = dX
        this.dY = dY
        this.radius = radius
        this.color = color;
        this.defaultRadius = radius;
        this.defaultColor = color;
    } 
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.stroke()
        c.fill()
        c.closePath()
    }

    // interactivity(){
    //     if(Math.abs(this.x - mouseCoords.x ) < this.radius + 50 && Math.abs(this.y - mouseCoords.y) < this.radius + 50){
    //         if(this.radius < 50){
    //             this.radius += 1
    //         }
    //     }else{
    //         if(this.radius !== this.defaultRadius){
    //             this.radius = this.defaultRadius
    //         }
    //     }
    // }

    update(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dX = -this.dX
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dY = -this.dY
        }
        
    
        this.x = this.x + this.dX
        this.y = this.y + this.dY

        let d = calculateDistance(this.x, this.y, mouseCoords.x, mouseCoords.y)

        if(d < 40 + this.radius){
            this.color = 'green'
        }else{
            this.color = this.defaultColor
        
        }
        // this.interactivity()
        this.draw()
    } 
}


const mouseCoords = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    console.log(event)
    mouseCoords.x = event.clientX
    mouseCoords.y = event.clientY
})
class Player{ 
    draw(){
        c.beginPath()
        c.arc(mouseCoords.x, mouseCoords.y, 40, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.stroke()
        c.fill()
        c.closePath()
    } 
    update(){ 
        // this.interactivity()
        this.draw()
    } 
}
 
 
let enemy;
let player;
// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate) 
    enemy.update()
    player.update() 
}

const init = () => {
     enemy = new Enemy(100, 100, 1, 1, 20, colors[Math.floor(Math.random() * colors.length)])
     player = new Player() 
    animate()
} 
init()