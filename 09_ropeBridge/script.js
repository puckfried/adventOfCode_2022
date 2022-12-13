import fs from 'fs'

const data = fs.readFileSync('./input', 'utf-8').trimEnd().split('\n')
const grid = [[0]] // 0 - both, 1 - head, 2 -tail
let currRow = [0, 0]  // index 0 - head, 1 - tail
let currCol = [0, 0] 
const emptySquare = 'x'
const h = 'h'
const t = 't'
const s = 's'
let counter = 0

function createColumn(newC){
    for (let i=0; i<grid.length; i++){
        if (newC < 0){
            for (let j=newC; j<0; j++){
                grid[i].unshift('x')
        }}
        else {
            for (let j=0; j<newC; j++){
                grid[i].push('x')
            }
        }
        }    
    }

function createRow(newR){
    if (newR < 0){
        for (let i=newR; i<0; i++ ){
            const boilerRow = Array(grid[0].length).fill('x')
            grid.unshift(boilerRow)
        }
    } else{
        for (let i=0; i<newR; i++){
            const boilerRow = Array(grid[0].length).fill('x')
            grid.push(boilerRow)

        }
    }
} 


function updateGrid(axis, projectedPos, head){    //axis true --> row --> false col , subZero --> left, up || positive --> right, down
    if(axis){
        if (projectedPos < 0 ) {
            createColumn(projectedPos)
            updateCurrPos(0, Math.abs(projectedPos))
        } else {
            const newColumns = (projectedPos+1)-grid[0].length// neue Columns erstellen durch verlängern der rows, createColumn(additionalColumns)
            if (newColumns > 0){
                createColumn(newColumns)
            }
        }}
    else {
        if (projectedPos < 0) {
            createRow(projectedPos)
            updateCurrPos(Math.abs(projectedPos),0)
        } else {
            const newRows = (projectedPos+1)-grid.length
            if (newRows > 0){
                createRow(newRows)
            }
        }
    }
    return true
}

function updateCurrPos(col, row){
    currCol = [currCol[0]+col, currCol[1]+col]
    currRow = [currRow[0]+row, currRow[1]+row]
}

function moveOnRow(direction){
    if (direction === 'right'){
        currRow[1]++ 
    } else {
        currRow[1]--
    }
}

function moveOnCol(direction){
    if (direction === 'up'){
        currCol[1]++ 
    } else {
        currCol[1]--
    }
}


function updateTail(){
    let distance = 0
    if (currRow[0] === currRow[1] && currCol[0] === currCol[1]){
    
    }
    
     else if (currRow[0] === currRow[1]){
        distance = currCol[0] - currCol[1]  
            if (Math.abs(distance) > 1){
                moveOnCol(distance > 0 ? 'up' : 'down')
            }
    }
    else if (currCol[0] === currCol[1]){
      distance = currRow[0] - currRow[1]  
        if (Math.abs(distance) > 1){
            moveOnRow(distance > 0 ? 'right' : 'left')
        }
    }
    else {
        const distanceRow = currRow[0] - currRow[1]
        const distanceCol = currCol[0] - currCol[1]

        if (Math.abs(distanceRow) + Math.abs(distanceCol) > 2){
            const addUp = distanceRow + distanceCol
            if (addUp === -3){
                // left up
                // console.log('move up and left')
                moveOnCol('down')
                moveOnRow('left')
            } 
            // rechts unten
            else if (addUp === 3){
                // console.log('move down and right')
                moveOnRow('right')
                moveOnCol('up')
            }
            else {
               if (currRow[0] > currRow[1]){
                // console.log('right up')
                moveOnCol('down')
                moveOnRow('right')   

               }else {
                // console.log('left down')
                moveOnCol('up')
                moveOnRow('left')
               }

            }
        }
    }
// updateTailOnGrid()
grid[currCol[1]][currRow[1]]=t
}

function moveHead(steps, direction){
    for (let i=0; i<steps; i++){
        switch (direction){
            case 'up':
                currCol=[currCol[0]-1, currCol[1]]
                break;
            case 'down':
                currCol=[currCol[0]+1, currCol[1]]
                break;
            case 'left':
                currRow[0] = currRow[0]-1 
                break;   
            case 'right':
                currRow=[currRow[0]+1, currRow[1]] 
                break;
        }
        // if (currCol[0] === currCol[1] && currRow[0] === currRow[1]){
         if (grid[currCol[0]][currRow[0]]==='t' || grid[currCol[0]][currRow[0]]==='s'){
            grid[currCol[0]][currRow[0]]='s'
        } else{
            grid[currCol[0]][currRow[0]]=h

        }
        updateTail()
        // console.log('position Row (currCol): ', currCol, 'Col (currRow): ', currRow)
    }
}



function moveUp(steps){
    const projectedPosition = currCol[0]-steps
    if (updateGrid(false, projectedPosition)){
        moveHead(steps, 'up')
    }

}

function moveRight(steps){
    const projectedPosition = currRow[0]+steps
    if (updateGrid(true, projectedPosition)) {
        moveHead(steps, 'right')
    }
}

function moveDown(steps){
    const projectedPosition = currCol[0]+steps
        if (updateGrid(false, projectedPosition)){
            moveHead(steps, 'down')
    }
}

function moveLeft(steps){
    const projectedPosition = currRow[0]-steps
    if (updateGrid(true, projectedPosition)){
        moveHead(steps, 'left')
    }

}

function move(step){
    const tmpArr = step.split(' ')
    switch (tmpArr[0]){
        case 'L':
            moveLeft(Number(tmpArr[1]))
            break;
        case 'U':
            moveUp(Number(tmpArr[1]))
            break;
        case 'R':
            moveRight(Number(tmpArr[1]))
            break;
        case 'D':
            moveDown(Number(tmpArr[1]))
            break;

    }
}


function start(moves){
    for (let i=0; i< moves.length; i++){
        move(moves[i])
    }
}

start(data)
// console.table(grid)
// console.log('End position Row (currCol): ', currCol, 'Col (currRow): ', currRow)
grid.forEach( el => {
    el.forEach( item => {
        if (item === 's' || item === 't') counter++
    })
})

console.log('TASK 1 - tail touched: ', counter)