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


addEventListener('keydown', (e) => {
    //  console.log(e.keyCode)
     snakeHead.pressedKeyCode = e.keyCode; 
})


let size = 10
let snakeHead;
let target;
let snakeHeadePath = []
class Target{ 
    constructor( ){
        this.x = Math.floor(Math.random() * Math.floor(canvas.width/size)) * size 
        this.y = Math.floor(Math.random() * Math.floor(canvas.width/size)) * size 
    } 
    draw() {
        c.beginPath()
        c.fillStyle = colors[0]
        c.fillRect(this.x, this.y, size, size) 
        c.closePath()
    }
    update() {
        if(
            (snakeHead.x <= this.x + size && snakeHead.x >= this.x || snakeHead.x + snakeHead.size >= this.x && snakeHead.x + snakeHead.size <= this.x + size) && 
            (snakeHead.y <= this.y + size && snakeHead.y >= this.y || snakeHead.y + snakeHead.size >= this.y && snakeHead.y + snakeHead.size <= this.y + size)
        ) {
            snakeBodyCellFactory() 
            target = null;
        }else {
            this.draw()
            
        }  
    }
} 

class SnakeBodyCell { 
    constructor(x,y, dx, dy, cellIndex){
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy 
        this.pathInfo = null
        this.cellIndex = cellIndex // is equle to the index of cell  array
        this.cellPath = []
        this.pathIndex = 0
    } 
    draw() {
        c.beginPath()
        c.fillStyle = colors[9]   
        c.fillRect(this.x, this.y, size, size) 
        c.closePath()
    }
    update() {
        if(this.cellIndex !== 0){
            this.pathInfo = snakeBodyCellArr[this.cellIndex - 1].cellPath[this.pathIndex]
            if(this.pathInfo){
                console.log(this.pathInfo)
                console.log(this.x, this.y)
                if(this.x === this.pathInfo.x && this.y === this.pathInfo.y) {
                    console.log('hit') 
         
                    // track the cell path
                    this.cellPath.push(this.pathInfo); 
                    this.pathIndex++
                    this.dx = this.pathInfo.to.dx
                    this.dy = this.pathInfo.to.dy
                }
            }

        }else{
            if(snakeHeadePath.length > 0) {
                this.pathInfo = snakeHeadePath[0]
                if(this.pathInfo){
                    if(this.x === this.pathInfo.x && this.y === this.pathInfo.y) {
                        // track the cell path
                        this.cellPath.push(this.pathInfo);
                        snakeHeadePath.shift()
                        this.dx = this.pathInfo.to.dx
                        this.dy = this.pathInfo.to.dy
                    }
                }
             }
        }
       this.x += this.dx
       this.y += this.dy
       this.draw()
   }

     
} 

const leftKeys = [65, 37]
const rightKeys = [68, 39]
const upKeys = [87, 38]
const downKeys = [83, 40]
const snakeBodyCellArr = []
const cellGap = 0;
class SnakeHead{ 
    constructor( ){
         this.x = 100
         this.y = 100 
         this.dx = 0
         this.dy = 0
         this.velocity = 30 
         this.pressedKeyCode = null;  
    }

    playerInteractivity(keyCode) { 
        if (upKeys.includes(keyCode)) { // w s
            this.dy = -1;
            this.dx = 0;
            
        } else if (leftKeys.includes(keyCode)) { // a 
            this.dx = -1;
            this.dy = 0;
        } else if (downKeys.includes(keyCode)) { // s 
            this.dy = 1;
            this.dx = 0;
        } else if (rightKeys.includes(keyCode)) { // d  
            this.dx = 1;
            this.dy = 0;
        } else if (keyCode === 32 || keyCode === 87) { // space
            this.dx = 0;
            this.dy = 0;
        }
        if(snakeBodyCellArr.length > 0) {
           snakeHeadePath.push({
                x: this.x,
                y: this.y,
                to: {
                    dy: this.dy,
                    dx: this.dx
                }
            }) 
        }
    }

    draw() {
        c.beginPath()
        c.fillStyle = colors[6]   
        c.fillRect(this.x, this.y, size, size) 
        c.closePath()
    }
    update() { 

        // to move y axios
        if(this.dy === 0 && (upKeys.includes(this.pressedKeyCode) || downKeys.includes(this.pressedKeyCode)) ){
         
            if(this.pressedKeyCode && (this.x) % size === 0){
                this.playerInteractivity(this.pressedKeyCode)
                this.pressedKeyCode = null;
            }
        }
        // to move x axios
        if(this.dx === 0 && (leftKeys.includes(this.pressedKeyCode) || rightKeys.includes(this.pressedKeyCode)) ){
            if(this.pressedKeyCode && this.y % size === 0){
                this.playerInteractivity(this.pressedKeyCode)
                this.pressedKeyCode = null;
            }
        }

        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
} 



const snakeBodyCellFactory = () => {
    snakeHeadePath = [] 
    if(snakeBodyCellArr.length > 0) {
        snakeBodyCellArr[snakeBodyCellArr.length - 1].cellPath = [];
    }
    const referenceObject = snakeBodyCellArr.length === 0 ? snakeHead : snakeBodyCellArr[snakeBodyCellArr.length - 1]
    if(referenceObject.dx !== 0){
        if(referenceObject.dx === -1 ){
            snakeBodyCellArr.push(new SnakeBodyCell(referenceObject.x + (size + cellGap), referenceObject.y, referenceObject.dx, referenceObject.dy, snakeBodyCellArr.length))
        } else{ 
            snakeBodyCellArr.push(new SnakeBodyCell(referenceObject.x - (size + cellGap), referenceObject.y, referenceObject.dx, referenceObject.dy, snakeBodyCellArr.length))
        }
    }else {
        if(referenceObject.dy === -1 ){
            snakeBodyCellArr.push(new SnakeBodyCell(referenceObject.x , referenceObject.y + (size + cellGap), referenceObject.dx, referenceObject.dy, snakeBodyCellArr.length))
        } else{ 
            snakeBodyCellArr.push(new SnakeBodyCell(referenceObject.x , referenceObject.y - (size + cellGap), referenceObject.dx, referenceObject.dy, snakeBodyCellArr.length))
        }
    } 
} 

const animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate) 
    snakeHead.update(); 
    if(!target){
        target = new Target()
    } 
    snakeBodyCellArr.forEach((cell) => {
        cell.update()
    })

    target.update();  
}

const init = () => {  
    snakeHead = new SnakeHead() 
    animate()
}

init()