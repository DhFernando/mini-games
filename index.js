let rounds = 0;
let doors = ['A', 'B', 'C'];
let winningCount = 0;
let failingCount = 0;

const startGame = () => {

    rounds++;

    let diamondDoor = doors[Math.ceil(Math.random()*3) - 1];

    let userSelectedDoor = doors[Math.ceil(Math.random()*3) - 1]; // prompt();
    
    let unSelectedDoors = doors.filter(door => door !== userSelectedDoor);
    


    // showing a empty door
    let showingDoor;
    if(unSelectedDoors.indexOf(diamondDoor) === -1) {
        showingDoor = unSelectedDoors[Math.ceil(Math.random()*2) - 1]
    }else {
        if(unSelectedDoors.indexOf(diamondDoor) === 0){
            showingDoor = unSelectedDoors[1]
        }else{
            showingDoor = unSelectedDoors[0]
        }
    }


    // switch ?? are you want to switch ??

    let userDecision = "Yes";
    let finalSelectedDoors;
    if(userDecision == "Yes"){
        // select !userSelectedDoor and !showingDoor
        finalSelectedDoors = doors.filter(door => door !== userSelectedDoor && door !== showingDoor)[0];
        // console.log(diamondDoor, userSelectedDoor, unSelectedDoors, showingDoor, finalSelectedDoors)

    }else{
        finalSelectedDoors = userSelectedDoor;
    }

    // calculate the results
    let results;
    if(diamondDoor === finalSelectedDoors){
        results = 'Win';
        winningCount++;

    }else{
        results = 'Fail';
        failingCount++;
    }
 
    const summery = {
        rounds,
        diamondDoor,
        userSelectedDoor,
        unSelectedDoors: unSelectedDoors.join(' and '),
        showingDoor,
        userDecision,
        finalSelectedDoors,
        results
    }

    console.log({
        winningPresentage: (winningCount/rounds)*100,
        failingPresentage: (failingCount/rounds)*100
    });
};

for (let index = 0; index < 10000; index++) {
    startGame();
    
}

// winnig presentage
 
// console.log({
//     winningPresentage: (winningCount/rounds)*100,
//     failingPresentage: (failingCount/rounds)*100
// });