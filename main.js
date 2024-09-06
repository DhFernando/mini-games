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

 
const friction = 0.95
const gravity = 1
// Objects


addEventListener('keydown', (e) => {
     console.log(e.keyCode)
     snake.pressedKeyCode = e.keyCode; 
     
})

let snake;
let target;

class Target{ 
    constructor( ){
        this.size = 10 
        this.x = Math.floor(Math.random() * Math.floor(canvas.width/this.size)) * this.size 
        this.y = Math.floor(Math.random() * Math.floor(canvas.width/this.size)) * this.size 
    } 
    draw() {
        c.beginPath()
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.x, this.y, this.size, this.size) 
        c.closePath()
    }
    update() { 

        if(
            (snake.x <= this.x + this.size && snake.x >= this.x || snake.x + snake.size >= this.x && snake.x + snake.size <= this.x + this.size) && 
            (snake.y <= this.y + this.size && snake.y >= this.y || snake.y + snake.size >= this.y && snake.y + snake.size <= this.y + this.size)
        ) {
            target = null;
        }else {
            this.draw()
        }  
    }
} 

class Snake{ 
    constructor( ){
         this.x = 100
         this.y = 100 
         this.dx = 0
         this.dy = 0
         this.size = 10
         this.velocity = 10
  
         this.pressedKeyCode = null; 

    }

    playerInteractivity(keyCode) { 
        if (keyCode === 87) { // w
             
            this.dy = -1;
            this.dx = 0;
        } else if (keyCode === 65) { // a
             
            this.dx = -1;
            this.dy = 0;
        } else if (keyCode === 83) { // s
             
            this.dy = 1;
            this.dx = 0;
        } else if (keyCode === 68) { // d
             
            this.dx = 1;
            this.dy = 0;
        } else if (keyCode === 32) { // space
            this.dx = 0;
            this.dy = 0;
        }
        
    }

    draw() {
        c.beginPath()
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.x, this.y, this.size, this.size) 
        c.closePath()
    }
    update() { 

        // to move y axios
        if(this.dy === 0 && (this.pressedKeyCode === 87 || this.pressedKeyCode === 83) ){
         
            if(this.pressedKeyCode && (this.x) % this.size === 0){
                this.playerInteractivity(this.pressedKeyCode)
                this.pressedKeyCode = null;
            }
        }

        if(this.dx === 0 && (this.pressedKeyCode === 65 || this.pressedKeyCode === 68)){
            if(this.pressedKeyCode && this.y % this.size === 0){
                this.playerInteractivity(this.pressedKeyCode)
                this.pressedKeyCode = null;
            }
        }

        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
} 
 
  

// setInterval(() => {
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     snake.update() 
// }, 1000)
const animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate) 
    snake.update();
    if(!target){
        target = new Target()
    } 
    target.update(); 
   
    
}

const init = () => {  
    snake = new Snake() 
    animate()
}

init()