import fs from 'fs'

const data = fs.readFileSync('./input', 'utf-8').trimEnd().split('\n').slice(1)
const filesystem = {'/': {}}
let level = [filesystem, filesystem['/']]
let tmpSize = [0]
let folders = []
let task1 = []


function getParam(string){
    const tmpArr = string.split(' ')
    return tmpArr[tmpArr.length-1]
}

function countSize(size){
    const arr = tmpSize.map( el => el+size)
    tmpSize = [...arr]
}

function createDirectory(name){
    level[level.length-1][name]= {}
}

function createFile(name, size){
    level[level.length-1][name]= size 
    countSize(Number(size))
}

function createFilesystem(raw){
    raw.forEach( (curr) => {
        if (curr.startsWith('$ cd')){
            if (getParam(curr) !== '..'){
                level.push(level[level.length-1][getParam(curr)])
                tmpSize.push(0)
            }else {
                const kickedOut = level.pop()
                if (tmpSize[tmpSize.length-1] <= 100000){
                    task1.push(tmpSize[tmpSize.length-1])
                }
                folders.push(tmpSize[tmpSize.length-1])
                tmpSize.pop()
            }
        } else if (curr.startsWith('dir')){
            createDirectory(getParam(curr))            
        }
        else if(/^[0-9]/.test(curr)){
            createFile(getParam(curr), curr.match(/^[0-9]+/)[0])
        }
    })
    folders =[...folders, ...tmpSize]
}



createFilesystem(data)
const sum = task1.reduce((acc, curr) => acc+=curr)
console.log('Solution ** TASK 1 **: ',sum)

//TASK 2
let toDelete = 0

function spaceNeeded(usedSpace){
    const total = 70000000
    const updateNeeded = 30000000
    return updateNeeded - (total - usedSpace)
}

folders.sort((a,b) => a-b)
const spaceToFree = spaceNeeded(folders[folders.length-1])
for (const folder of folders){
    toDelete = folder
    if (folder > spaceToFree) break 
}
console.log('Solution ** TASK 2 **: ', toDelete)