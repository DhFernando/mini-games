// global variables
let atomWidth = 10; 
let currentState = [];
let startingPosition = 5;
let flowingDown = 0;
let totalPoints = 0;

let previousPositions = [];
// Shapes Definitions
// L 
const lShapes = [
    [1, 2, atomWidth + 1, atomWidth*2 + 1,],
    [atomWidth,  atomWidth + 1, atomWidth + 2 , atomWidth*2 + 2],
    [atomWidth*2, atomWidth*2+1, atomWidth + 1, 1],
    [atomWidth, atomWidth*2, atomWidth*2 +1, atomWidth*2 + 2]
] 

document.addEventListener("DOMContentLoaded",() => { 
    var gridElement = document.getElementById("grid");
     
    for(var i = 0; i < 200; i++){
        var atomBox = document.createElement("div"); 
        atomBox.id = `atom-box-${i+1}`;
        atomBox.className = `atom-box`;
        gridElement.appendChild(atomBox)
        // atomBox.innerText = `${i}`;
        currentState.push({
            atomBox,
            availableAtom: true
        });
    } 
});

const cleanup = (indexes) => {
    indexes.forEach(index => { 
        currentState[index].atomBox.className = "atom-box" ,
        currentState[index].availableAtom = true;
    });
    previousPositions = [];
};

const isMovable = (shape) => {
    for (const index of shape) {
        var checkingCell = currentState[startingPosition + index + atomWidth*flowingDown]; 
        if(!checkingCell){
            return false;
         }else if(!checkingCell.availableAtom) {
            return false;
         }
    } 
    return true;
};

const checkPoints = () => {
    // if there are 10 unavailable atomes means one point
    let tempAvailabilityStateOfAtoms = [];
    currentState.forEach((el, n) => { 
        tempAvailabilityStateOfAtoms.push(el.availableAtom);
        if(tempAvailabilityStateOfAtoms.length === 10){
            if(tempAvailabilityStateOfAtoms.every(_el => _el === false)){
                totalPoints ++; 
                cleanup(Array.from({ length: Math.min(10, n + 1) }, (_, i) => n - i));
            } 
            tempAvailabilityStateOfAtoms = [];
        }
    });
};

const draw = () => {
    try{ 
        let _isMovable = isMovable(lShapes[2]);
        if(previousPositions.length > 0 && _isMovable){  
            cleanup(previousPositions)
        } 

        if(_isMovable){
            lShapes[2].forEach(index => {  
                currentState[startingPosition+ index + atomWidth*flowingDown].atomBox.className = "atom-box tetromino"
                previousPositions.push(startingPosition+ index + atomWidth*flowingDown); 
            });

            
        }else {
            previousPositions.forEach(i => {
                currentState[i].availableAtom = false; 
            });
            previousPositions = []
            flowingDown = 0
            // check is there any point
            checkPoints();
        } 
    }catch(e){
        previousPositions = []
        clearInterval(runShapes)
    }
} 

const runShapes = setInterval(() => { 
    flowingDown =flowingDown + 1
    draw();
}, 500);


// moving shape left and right
document.addEventListener("keydown", (e)=>{
    console.log(e.keyCode)
    if(e.keyCode === 39){
        startingPosition++;
    }
    if(e.keyCode === 37){
        startingPosition--;
    }
})

