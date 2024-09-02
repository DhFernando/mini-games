var canvas = document.querySelector('canvas')
 
canvas.width = 500
canvas.height = 500

var c = canvas.getContext('2d')

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
 
let player;
let enemy;
let bulletArray = []
let bulletIndex = 0
let score = 0

const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('click', ({ clientX }) => { 
    bulletIndex++;
    // release a bullet
    bulletArray.push(new Bullet( {x: clientX}))
})

class Enemy {
    constructor() {
        this.height = 50
        this.width = 50
        this.location = {
            x: 100,
            y: 100
        } 
        this.dx = 1
        this.dy = 1
    }
    draw() {
        
        c.beginPath()
        c.fillStyle = 'red'
        c.fillRect(this.location.x, this.location.y, this.width, this.height)
        
        c.closePath()
    } 
    update(){
        if(score > 10){
            if(this.location.x + this.width > canvas.width || this.location.x < 0) {
                this.dx = -this.dx
            }
            if(this.location.y + this.height > canvas.height/2 || this.location.y < 0) {
                this.dy = -this.dy
            }
            this.location.x += this.dx
            this.location.y += this.dy
        }
        
        this.draw()
    }
}

const clearBullet = (bulletIndex) => {
    bulletArray.splice(bulletIndex, 1)
}
class Player {
    constructor() {
        this.height = 10
        this.width = 10
    }
    draw() {
        let { x, y } = mouse
        if(x > canvas.width - this.width) {
            x = canvas.width - this.width
        }

        c.fillStyle = 'black'
        c.fillRect(x, canvas.height - this.height, this.width, this.height)
    } 
    update(){
        this.draw()
    }
} 

class Bullet {
    constructor(prop) {
        const {x, bulletIndex} = prop;
        this.height = 5
        this.width = 5
        this.velocity = 10
        this.y = canvas.height - this.height + this.height
        this.x = x
        this.index = bulletIndex
    }
    draw() { 
        c.fillStyle = 'black'
        c.fillRect(this.x, this.y, this.width, this.height)
    } 

    successBullet(){
      if(enemy.location.y > this.y && (enemy.location.x < this.x && enemy.location.x + enemy.width > this.x)){
        clearBullet(this.index)
        score++
        console.log(score)
        
        // reduce enemy size
        enemy.width -= 2
        enemy.height -= 2
        console.log('success')
      }
    }

    update(){
        this.y = this.y - this.velocity
        if(this.y < 0) {
            // remove bullet from the array when it reach the top
            clearBullet(this.index)
        }
        this.successBullet()
        this.draw()
    }
}
 

// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)  
 
    bulletArray.forEach(b => b.update())
    enemy.update()
    player.update()
    
}

const init = () => {  
    player = new Player()
    enemy = new Enemy()
    animate()
}

init()