import fs from 'fs'

const result = fs.readFileSync('./input', 'utf-8')
const foodArray = result.split('\n')

const sums = []

const highest = foodArray.reduce((acc, curr) => {
 if (curr !== ''){
    return acc += Number(curr)
 } else {
    sums.push(acc)
    return 0
 }
}, 0)

const sorting = (a,b) => b-a 

const sortedArr = sums.sort(sorting)

console.log('The highest Sum is: ', sortedArr[0])

// Part 2 - getting the top 3

const top3 = sortedArr.slice(0,3)
const sumTop3 = top3.reduce((acc,curr) => {
    return acc+= curr
}, 0)
console.log('The sum of the highest number: ',sumTop3)

