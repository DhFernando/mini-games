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


const mouseCoords = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (e) => {
    mouseCoords.x = e.x
    mouseCoords.y = e.y
    console.log(mouseCoords)
}) 


class Circle{
    constructor(x, y, dX, dY, radius, color){
        this.x = x
        this.y = y
        this.dX = dX
        this.dY = dY
        this.radius = radius
        this.color = color;
        this.defaultRadius = radius;
    } 
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.stroke()
        c.fill()
    }

    interactivity(){
        if(Math.abs(this.x - mouseCoords.x ) < this.radius + 50 && Math.abs(this.y - mouseCoords.y) < this.radius + 50){
            if(this.radius < 50){
                this.radius += 1
            }
        }else{
            if(this.radius !== this.defaultRadius){
                this.radius = this.defaultRadius
            }
        }
    }

    update(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dX = -this.dX
        }
    
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dY = -this.dY
        }
        
    
        this.x = this.x + this.dX
        this.y = this.y + this.dY

        this.interactivity()
        this.draw()
    } 
} 
 
let circleArray = []
for(let i = 0; i < 800; i++){
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    let dX = (Math.random() - 0.5) * 2
    let dY = (Math.random() - 0.5) * 2
    let radius = Math.floor(Math.random() * (10 - 2 + 1)) + 2 // max radius 2 - 10
    circleArray.push(new Circle(x, y, dX, dY, radius, colors[Math.floor(Math.random() * colors.length)]))
}

// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate) 
    circleArray.forEach(element => {
        element.update()
    });
}

animate()