import fs from 'fs'

const data = fs.readFileSync('./input_test', 'utf-8').trimEnd().split('\n')

let x = 1
let circle = 1
let signals = []
let rotate = 0
let crt=[]
let currentLine = ''

function every40(){
    // console.log('every 40', circle)
    drawCrt()
    if (circle === 20) rotate++
    if (circle === rotate * 40) {console.log('circle 40', circle); drawCrt(true)} // Linebreak after 40 cycles
    if (circle === (20 + (rotate*40))) {
        rotate++
        return true}

    return false
}

function signalStrength(){
    signals.push(x*circle)
}

// Extra Loop for addX
function addXCircle(){
    //drawCrt()
    if (every40() || circle === 20) signalStrength()
    circle++
}

// function addX(xNum){
//     x+= xNum
// }

function drawCrt(lineBreak){
    if (lineBreak) {
        crt = [...crt, [currentLine]];
        currentLine= ''}
    else {
        if (checkOverlap()) currentLine +='#' 
        else currentLine += '.'
    }
}

function checkOverlap(){
    if (currentLine.length === x-1) return true
    else false
}

for (let i=0; i<data.length; i++){
    //Start Loop
    const [command, xNum] = data[i].split(' ')
    
    // Extra loop when addxCircle
    if (command === 'addx') addXCircle()
    
    
    // Finalizing loop
    //drawCrt()
    if (every40() || circle === 20) signalStrength()
    if (command === 'addx') x+= Number(xNum)
    circle++
}

// console.log(x)
// console.log(circle)

const result = signals.reduce( (acc, curr) => acc+=curr)
console.log(result)   

//TASK 2 
console.log(crt)