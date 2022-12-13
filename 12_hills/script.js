import fs from 'fs'

const data = fs.readFileSync('./input', 'utf-8').trimEnd().split('\n')
const grid = data.map( el => {
    const gridItem = []
     for (let i=0; i<el.length; i++){
        const code = el.charCodeAt(i) 
        if (code < 97) gridItem.push( code === 83 ? {height: 1, status: 3} : {height: 26, status: 0} )
        // if (code < 97) gridItem.push( code === 83 ? {height: 1, status: 3} : {height: 3, status: 0} )
        else gridItem.push( {height: (code-96), status: 1} ) // status:   0 - end, 1 - unvisited, 2 reached faster 3 - visited, 4- start,
     }
    return gridItem
})

const solutions = []
let alreadyVisited= []
let counter = 0
const currentPosition = [0, 0] // x - vertical / y - horizontal


function walkingCondition(oldPos, newPos, newCoord, steps){
    const oldHeight = oldPos.height
    // check visited
    // if (newPos.status > 1) return false
    // if (alreadyVisited.some(i => i.coord[0] === newCoord[0] && i.coord[1] === newCoord[1])){
    //  return false
    // }

    // Check if square already used in former winnning path
    if (grid[newCoord[0]][newCoord[1]].status === 3 && grid[newCoord[0]][newCoord[1]].steps <= steps){
        return false
    }
    
    // Check if max distance reached ( defined by former winning path)
    // if (solutions[0] <= steps) return false

    //Check Height and mark neighbours
        if (newPos.height-1 <= oldHeight ) {
            newPos.status = newPos.status !== 0 ? 2 : 0
            return true   
    }
    
    else return false
}


function checkAround(currentPosition, grid, counter){
    const [x, y] = currentPosition
    
    // check up
    const possibleWays = []
    if ( x >= 1 && walkingCondition(grid[x][y], grid[x-1][y], [currentPosition[0]-1, currentPosition[1]], counter )){
        possibleWays.push('up')
    } 
    // check right
    if (y< grid[0].length-1 && walkingCondition(grid[x][y], grid[x][y+1], [currentPosition[0], currentPosition[1]+1], counter)){
        possibleWays.push('right')
    }
    // check down
    if (x< grid.length-1 && walkingCondition(grid[x][y], grid[x+1][y], [currentPosition[0]+1, currentPosition[1]], counter  )){
        possibleWays.push('down')
    }
    // check left
    if (y>=1 && walkingCondition(grid[x][y], grid[x][y-1], [currentPosition[0], currentPosition[1]-1], counter  )){
        possibleWays.push('left')
    }
     
    if (possibleWays.length<1) return false
    else return possibleWays
    
}


function changePosition(current, where){
    switch (where) {
        case 'up': 
            return [current[0] -1,  current[1]]
        case 'right':
            return [current[0],     current[1]+1]
        case 'down':
            return [current[0] +1,  current[1]]
        case 'left':
            return [current[0],     current[1]-1]
        
        default: return false
        }
}

function foundSolution(steps,solutionGrid){
    console.log('A solution found after: ', steps)
    solutions.push(steps)
    solutions.sort((a,b) => a-b)
    
    // put route into global grid
    solutionGrid.forEach( (el, i) => {
            el.forEach( (square,j) => {
                if (square.status === 3){
                    grid[i][j].status = 3
                    grid[i][j].steps = square.steps
                }
        })
    })
}

function move(counter, currentPosition, grid, whereToGo){
    counter++
    const localGrid = grid.map( el => {
        const row = []
        el.forEach( item => {
            const newItem = {...item}
            row.push(newItem)
        })
        return row
    })
    if (localGrid[currentPosition[0]][currentPosition[1]].status === 0 ) {       // Check if end found
        foundSolution(counter-1, localGrid)
        return true
    }

    // register the visited squares with associated step number to get there
    localGrid[currentPosition[0]][currentPosition[1]].status = 3
    localGrid[currentPosition[0]][currentPosition[1]].steps = counter

    const where = checkAround(currentPosition, localGrid, counter)
    alreadyVisited.push({coord: [currentPosition[0], currentPosition[1]], count: counter})
    
    for (let i=0; i<where.length; i++){
        const newPos = changePosition(currentPosition, where[i])
        whereToGo.push(where[i])
        const done = move(counter, newPos, localGrid, whereToGo)
        if (done) return false
    }
    return false

}


function renderMap(grid){
    const innerString = grid.map( el => {
        let string = ''
        el.forEach( el => string += el.status)
        return string
    } )
    const outerString = innerString.join('\n')
    console.clear()
    console.log(outerString)
   
}
    

const start = new Date()
 move(counter, currentPosition, grid, [])
const end = new Date()

console.log('Finish time: ',end-start)
console.log('Possibilities: ',solutions.length)
console.log('Shortest way: ',solutions[0])
