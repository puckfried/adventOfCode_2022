import fs from 'fs'

const data = fs.readFileSync('./input_test', 'utf-8').trimEnd().split('\n')

// Get Instructions
const instructions = data.reduce( (acc, curr) => {
    if (curr?.includes('items')){
        acc.push({items: []})
        const item = curr.match(/\d+/g)
        acc[acc.length-1].items.push(...item)
        acc[acc.length-1].active = 0
    }
    else if( curr.includes('Operation')){
    const operationArr = curr.split(' ')
        acc[acc.length-1].operations = [operationArr[operationArr.length-2], operationArr[operationArr.length-1]]
    }
    else if ( curr.includes('Test')){
        const divisible = curr.split(' ')
        acc[acc.length-1].test = Number(divisible[divisible.length-1])
    }
    else if (curr.includes('If true')){
        const truethy = curr.split(' ')
        acc[acc.length-1].true = Number(truethy[truethy.length-1])
    }
    else if (curr.includes('If false')){
        const falsy = curr.split(' ')
        acc[acc.length-1].false = Number(falsy[falsy.length-1])
    }

    
    return acc
},[])
// console.log(instructions)

function calcWorry(worry, operation, increase){
    let newWorry = 0
    switch (operation){
        case '*':
           newWorry = increase === 'old' ? worry*worry : worry*Number(increase)
            return newWorry
        case '+':
           return newWorry = Number(increase) + worry
        }
}

function monkeyBored(worry){
    return Math.floor(worry/3)
}

function checkModulo(worry, operation, increase, test){
    let newWorry = 0
    switch (operation){
        case '*':
        //    newWorry = increase === 'old' ? worry % test : worry % test || increase % test
           if (increase === 'old'){
            return [worry % test === 0, worry] 
           } else {
            return [worry % test === 0 || Number(increase) % test === 0, worry]
           }
            // return newWorry
        case '+':
           newWorry = Number(increase) + worry
           return [newWorry % test === 0, newWorry]
        }
}

for (let i=0; i<20; i++){
    
    instructions.forEach( (monkey, index) => {
        monkey.items.forEach( item => {
            monkey.active++
            // console.log(`Monley ${index} items: `, monkey.items)
            // console.log(`Monkey ${index} plays with item ${item}`)
            // let tmpWorry = calcWorry(Number(item), monkey.operations[0], monkey.operations[1] )
            // console.log('Worry level goes up to: ', tmpWorry)
            // tmpWorry = monkeyBored(tmpWorry)
            // console.log('monkey bored, level goes to: ', tmpWorry)
            const [check, tmpWorry] = checkModulo(Number(item), monkey.operations[0], monkey.operations[1], Number(monkey.test))
            console.log(check, tmpWorry)
            // const check = tmpWorry % Number(monkey.test) === 0 
            // console.log(check ? 'is divisible' : 'not divisible')
            if (check) {
                // console.log(`${tmpWorry} thrown to monkey ${monkey.true}`)
                instructions[Number(monkey.true)].items.push(tmpWorry) 
            }
            else {
                // console.log(`${tmpWorry} thrown to monkey ${monkey.false}`)
                instructions[Number(monkey.false)].items.push(tmpWorry) 
                
            }
            // console.log('\n')
        })
        monkey.items=[]
    
    })

}
instructions.sort( (a,b) => b.active - a.active)
 console.log(instructions)
const monkeyBusiness = instructions[0].active * instructions[1].active

console.log('TASK 1 - Monkey Business: ', monkeyBusiness)

