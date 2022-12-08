import fs from 'fs'

const data = fs.readFileSync('./input', 'utf-8').trimEnd().split('\n')
const forest = data.map(el => el.split(''))
let count = 0


function checkView(before, after, tree){
    before.sort((a,b) => b-a)
    after.sort((a,b) => b-a)
    
    if (tree > before[0] || tree > after[0]) return true
    else return false
}

function checkRow(row, treeIndex){
    const before = row.slice(0,treeIndex)
    const after = row.slice(treeIndex+1)
    const tree = row[treeIndex]
    return [before, after, tree]
}

function checkColumn(rowIndex, treeIndex){
   const before = []
   const after = []
   for (let row=0; row<rowIndex; row++){
        before.push(forest[row][treeIndex])
   }
    for (let row=rowIndex+1; row<forest.length; row++){
        after.push(forest[row][treeIndex])
   }
    return [before, after, forest[rowIndex][treeIndex]]

}

function addSurround(){
    count += forest[0].length // top row
    count += forest[forest.length-1].length // bottom row
    count += (forest.length -2) *2
}


for(let row=1; row<forest.length-1; row++){
    for (let tree=1; tree<forest[row].length-1; tree++){
        const [beforeC, afterC, treeH] = checkColumn(row, tree)
        const clmView = checkView(beforeC, afterC, treeH)
        const [beforeR, afterR ] = checkRow(forest[row], tree)
        const rowView = checkView(beforeR, afterR, treeH)
        if (clmView || rowView) count++
    }
}
console.log('Trees visible inside', count)
addSurround()
console.log('Task 1 - Trees visible with surrounding: ', count)


// TASK 2: Scenic view

function countTreesInAxis(ownHeight, trees){
    let count = 0
    for (let i=0; i<trees.length; i++){
        count++
        if (trees[i]>=ownHeight) break
    }
    return count

}


function renderView(top, bottom, left, right){
    let string = ''
    console.log('Highest Score yet: ', Math.max(...count), 'Trees count: ', count.length)
    for(let i = 0; i<top+bottom+2; i++){
        for (let j=0 ; j<right+left+2; j++){
            if(i<top || i> top+1){
                if (j<left) {
                    string += ' '
                }
                else if (j=== left +1){
                    string += '/\\'
                }
                else if (j === left+right+1){
                    string += '\n'
                }
                else if (j> left+1){
                    string += ' '
                }

            } 
            else if(i === top+1){
                string += '/\\'
                // if (j === left+1) string += 'O'
                if (j === right+left+1) string +='\n'
            }
        }
    }
    console.log(string)
}


count = []
for(let row=1; row<forest.length-1; row++){
    for (let tree=1; tree<forest[row].length-1; tree++){
        const [beforeC, afterC, treeH] = checkColumn(row, tree)
        const [beforeR, afterR] = checkRow(forest[row], tree)
        let multiply = countTreesInAxis(treeH, beforeC.reverse()) * countTreesInAxis(treeH, afterC) * countTreesInAxis(treeH, beforeR.reverse()) * countTreesInAxis(treeH,afterR)
        renderView(countTreesInAxis(treeH, beforeC.reverse()) , countTreesInAxis(treeH, afterC) , countTreesInAxis(treeH, beforeR.reverse()) , countTreesInAxis(treeH,afterR))
        await new Promise(resolve => setTimeout(resolve, 50))    
        console.clear()
        count.push(multiply)
    }
}
count.sort((a,b) => b-a)
console.log('TASK 2 - Highest scenic score: ', count[0])
