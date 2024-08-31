var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')
const colors  = [
    '#ADD8E6', // Light Blue
    '#87CEEB', // Sky Blue
    '#4682B4', // Steel Blue
    '#5F9EA0', // Cadet Blue
    '#6495ED', // Cornflower Blue
    '#4169E1', // Royal Blue
    '#1E90FF', // Dodger Blue
    '#0000FF', // Pure Blue
    '#00008B', // Dark Blue
    '#000080', // Navy Blue
    '#191970', // Midnight Blue
];



const randomIntFromRange = (min, max) => {
    const val = Math.random() * (max - min) + min
    console.log(val)
    return  val
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

const mouseCoords = {
    x: canvas.width/2,
    y: canvas.height/2
}

window.addEventListener('mousemove', (event) => { 
    mouseCoords.x = event.clientX
    mouseCoords.y = event.clientY
})

class Particle{
    constructor(radius, color, distance, velocity){
        this.x = undefined 
        this.y = undefined 
        this.radius = radius
        this.color = color;  
        this.radians = Math.random() * Math.PI * 2
        this.velocity = velocity
        this.distance = distance
    } 
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    } 
    update(){ 
        this.radians = this.radians + this.velocity
        this.x = mouseCoords.x + Math.cos(this.radians)*this.distance
        this.y = mouseCoords.y + Math.sin(this.radians)*this.distance
        this.draw()
    } 
}
  
let partcles = [];
// Animation
const animate = () => { 
    c.fillStyle = 'rgba(255, 255, 255, 0.05)' 
    c.fillRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)
    partcles.forEach(partcle => {
        partcle.update() 
    }); 
}

const init = () => {
    let minDistance = 50; 
     for(let i = 0; i < 10; i++){
        minDistance = minDistance + 5
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        const partcle = new Particle(2, randomColor, minDistance, randomIntFromRange(0.04,0.06))
         partcles.push(partcle)
     }
    animate()
} 
init()