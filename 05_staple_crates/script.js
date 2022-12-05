import fs from 'fs'


//const rawData = fs.readFileSync('./input_test', 'utf8').trimEnd()
const rawData = fs.readFileSync('./input', 'utf8').trimEnd()
const rawArray = rawData.split('\n')
let data = {}



function parseData(rawArray, result){
    for (const row of rawArray){
        if (row.match(/[A-Z]/)){                // crates row
            let rowCleaned = row.replaceAll('    ', 'x')
            rowCleaned = rowCleaned.match(/[xA-Z]/g)
            if (!result.matrix){
                result.matrix = [rowCleaned]
            }else {
                result.matrix.push(rowCleaned)
            }
        }
        else if(row.match(/^ \d/)){             // numbers of columns
            const number = row.match(/\d+/g)
            result.countClm = number.length
        } else if (row.includes('move')){       // commands row
            const moves = row.match(/\d+/g)
            if (!result.cmd){
                result.cmd = [moves]
            } else{
                result.cmd.push(moves)
            }
        }
    }
    return result
}

function createMatrix(arrays){
    const columns = {}
    arrays.forEach( (el, row) => {
        el.forEach((item, clm) => {
            if (!columns[clm] && item !== 'x'){
                columns[clm] =[ item ]
            }else if(item !== 'x') {
                columns[clm].push(item)
            }
        })
    })
    return columns
}


function moveCratesWithCrane9000(matrix, number, from, to){
    for (let i=0; i< number; i++) {
    const transferItem = matrix[from].shift()
    matrix[to].unshift(transferItem)
    }
    return matrix
    }

// TASK 2
function moveCratesWithCrane9001(matrix, number, from, to){
   const transferItem = matrix[from].splice(0, number)
   matrix[to] = [...transferItem, ...matrix[to]]
return matrix
}


function getTopStack(matrix){
    const result = []
    for (let clm in matrix){
        result.push(matrix[clm][0])
    }
    return result.join('')
}



// ************* Task 1 - Move Crates *************

// Get data
data = parseData(rawArray, data)

// Build Matrix
data.matrix = createMatrix(data.matrix)

// Move Crates
data.cmd.forEach( cmd => {
    const newMatrix = moveCratesWithCrane9000(data.matrix, cmd[0], (cmd[1]-1), (cmd[2]-1))  // correct the index positions
    data.matrix= newMatrix
})

// Get the top stack
let solution = getTopStack(data.matrix)
console.log(`**** Task 1 - Crates moved! *****\nThe top stack looks like this: `, solution)



// ************* Task 2 - Change crane *************

data = {}
solution =''

// Get data
data = parseData(rawArray, data)

// Build Matrix
data.matrix = createMatrix(data.matrix)

// Move Crates
data.cmd.forEach( cmd => {
    const newMatrix = moveCratesWithCrane9001(data.matrix, cmd[0], (cmd[1]-1), (cmd[2]-1))
    data.matrix= newMatrix
})

// Get the top stack
solution = getTopStack(data.matrix)
console.log(`**** Task 2 - Crates moved! *****\nThe top stack looks like this: `, solution)
