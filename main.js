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
// let enemy;
let enemyArray = []
const bulletArray = []
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

const clearBullet = (bulletIndex) => {
    bulletArray.splice(bulletIndex, 1)
}

const distroyEnemy = (enemyIndex) => {
    enemyArray.splice(enemyIndex, 1)
}
class Enemy {
    constructor(prop) {
        const { locationX, locationY } = prop;
        this.height = 50
        this.width = 50
        this.location = {
            x: locationX,
            y: locationY
        } 
        this.dx = 1
        this.dy = 1
        this.power = 100
    }
    draw() {
         
        c.fillStyle = 'red'
        c.fillRect(this.location.x, this.location.y, this.width, this.height)
         
        c.fillStyle = 'black'; // Text color
        c.font = '20px Arial'; // Text font and size
        c.textAlign = 'center'; // Center the text
        c.textBaseline = 'middle'; // Vertically align text to the middle
        c.fillText(this.power, this.location.x, this.location.y); // Draw the text
    } 
    update(){
        if(score > 0){
            if(this.location.x + this.width > canvas.width || this.location.x < 0) {
                this.dx = -this.dx
            }
            if(this.location.y + this.height > canvas.height/2 || this.location.y < 0) {
                this.dy = -this.dy
            }
            this.location.x += this.dx
            this.location.y += this.dy
        }

        if(this.power <= 0) {
            distroyEnemy(this.index)
        }
        
        this.draw()
    }
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

    successBullet(e){
      if(e.location.y > this.y && (e.location.x < this.x && e.location.x + e.width > this.x)){
        clearBullet(this.index)
        score++
        console.log(score)
        
        // reduce enemy size
        e.power -= 10
        console.log('success')
      }
    }

    update(){
        this.y = this.y - this.velocity
        if(this.y < 0) {
            // remove bullet from the array when it reach the top
            clearBullet(this.index)
        }

        enemyArray.forEach(e => this.successBullet(e))
        this.draw()
    }
}
 

// Animation
const animate = () => {
    c.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)  
 
    bulletArray.forEach(b => b.update())
    enemyArray.forEach(e => e.update())
    // enemy.update()
    player.update()
    
}

const init = () => {  
    player = new Player() 
    enemyArray = [
        new Enemy({
            locationX: 300,
            locationY: 100
        }),
        new Enemy({
            locationX: 100,
            locationY: 150
        })
    ] 
    
    animate()
}
 
init()