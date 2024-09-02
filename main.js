var canvas = document.querySelector('canvas')
 
canvas.width = 500
canvas.height = innerHeight

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
let background;
let enemyArray = []
let enemyKidsArray = []
const bulletArray = []
let bulletIndex = 0
let score = 0
let playerFailed = false;

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

const distroyEnemyKid = (enemyIndex) => {
    enemyKidsArray = enemyKidsArray.filter(ek => ek.index !== enemyIndex)
}

// Create an image object
var enemyImage = new Image();
var gunImage = new Image();
var bulletImage = new Image();
var backgroundImg = new Image();

// Set the source of the image
enemyImage.src = './imgs/enemy.png'; 
gunImage.src = './imgs/rocket.png'; 
bulletImage.src = './imgs/bullet.png'; 
backgroundImg.src = './imgs/background.png'; 

const enemyKidGeneretor = (ek) => {
    setInterval(() => {
        enemyArray.forEach((enemy, index) => {
            enemy.releaseEnemyKids()
        })
    }, 2000) 
}

class Enemy {
    constructor(prop) {
        const { locationX, locationY  } = prop;
        this.height = 50
        this.width = 50
        this.location = {
            x: locationX,
            y: locationY
        } 
        this.dx = 1
        this.dy = 1
        this.power = 100
        this.kidsGererated = false
        this.kidsGererator = null;
    }
    draw() {
          
         
        c.fillStyle = 'black'; // Text color
        c.font = '20px Arial'; // Text font and size
        c.textAlign = 'center'; // Center the text
        c.textBaseline = 'middle'; // Vertically align text to the middle
        c.fillText(this.power, this.location.x, this.location.y); // Draw the text 
        c.drawImage(enemyImage, this.location.x, this.location.y, this.width, this.height)
    } 

    releaseEnemyKids(){
        enemyKidsArray.push(new EnemyKid( {locationX: this.location.x, locationY: this.location.y, index: Date.now()}))
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

        if(this.power < 80 && !this.kidsGererated){ 
            this.kidsGererated = true
            this.kidsGererator = setInterval(()=> {
                this.releaseEnemyKids()
            }, 2000)
        }

        if(this.power <= 0) {
            clearInterval(this.kidsGererator)
            distroyEnemy(this.index)
            
        }
        
        this.draw()
    }
}

class EnemyKid {
    constructor(prop) {
        const { locationX, locationY, index } = prop;
        this.index = index
        this.height = 30
        this.width = 30
        this.location = {
            x: locationX,
            y: locationY
        }  
        this.dy = 0.7
        this.power = 50
    }
    draw() { 
        c.fillStyle = 'black'; // Text color
        c.font = '20px Arial'; // Text font and size
        c.textAlign = 'center'; // Center the text
        c.textBaseline = 'middle'; // Vertically align text to the middle
        c.fillText(this.power, this.location.x, this.location.y); // Draw the text 
        c.drawImage(enemyImage, this.location.x, this.location.y, this.width, this.height)
    } 

    releaseEnemyKids(){

    }
    update(){
        // player fails logic
        if( (this.location.y + this.height >  canvas.height  - player.height)  ){
                if(player.locationX > this.location.x && player.locationX < this.location.x + this.width){
                    playerFailed = true
                    console.log(playerFailed)
                }     
        }     
         
        if(score > 0){ 
            if(this.location.y + this.height > canvas.height || this.location.y < 0) {
                this.dy = -this.dy
            } 
            this.location.y += this.dy
        }

        if(this.power <= 0) {
            distroyEnemyKid(this.index)
        }
        
        this.draw()
    }
}


class Player {
    constructor() {
        this.height = 50
        this.width = 50
        this.locationX = 0;
    }
    draw() {
        let { x, y } = mouse
        if(x > canvas.width - this.width) {
            this.locationX = canvas.width - this.width
        }

        this.locationX = x
        c.fillStyle = 'black'
        // c.fillRect(x - this.width/2, canvas.height - this.height, this.width, this.height)
        c.drawImage(gunImage, this.locationX - this.width/2, canvas.height  - this.height, this.width, this.height)
    } 
    update(){ 
        this.draw()
    }
} 

class Bullet {
    constructor(prop) {
        const {x, bulletIndex} = prop;
        this.height = 10
        this.width = 10
        this.velocity = 10
        this.y = canvas.height - this.height + this.height
        this.x = x
        this.index = bulletIndex
    }
    draw() { 
        c.fillStyle = 'black'
        // c.fillRect(this.x - this.width/2, this.y, this.width, this.height)
        c.drawImage(bulletImage, this.x - this.width/2, this.y, this.width, this.height)
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
        enemyKidsArray.forEach(e => this.successBullet(e))
        this.draw()
    }
}

class Background {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = backgroundImg
    }
    draw() {
        c.globalAlpha = 0.3;
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
} 
 

// Animation
const animate = () => {
    let win = enemyArray.length === 0 && enemyKidsArray.length === 0
    if(!playerFailed || win){
        c.clearRect(0, 0, innerWidth, innerHeight)
        requestAnimationFrame(animate) 
        
    } 
    if(playerFailed){
        c.font = "30px Arial";
        c.fillText("Game Over", canvas.width/2, canvas.height/2);
    } 
    if(win){
        c.font = "30px Arial";
        c.fillText("You Win", canvas.width/2, canvas.height/2);
    }
    background.update()
    c.globalAlpha = 1;
    bulletArray.forEach(b => b.update())
    enemyArray.forEach(e => e.update())
    enemyKidsArray.forEach(e => e.update()) 
    player.update()  
}

const init = () => {  
    player = new Player() 
    background = new Background()
    enemyArray = [
        new Enemy({
            locationX: 300,
            locationY: 100
        }),
        new Enemy({
            locationX: 100,
            locationY: 150,
        })
    ] 
    
    animate()
}
 
init()