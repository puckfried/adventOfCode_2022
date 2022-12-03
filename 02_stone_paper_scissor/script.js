import fs from 'fs'

const data = fs.readFileSync('./input_original', 'utf-8')
//const data = fs.readFileSync('./input', 'utf-8')
console.log(data[0])

const inputArray = data.split('\n')

//Delete last empty array
inputArray.splice(-1,1)


const relation = { //[me, mewinning]
	A: ['X','Y'],
	B: ['Y','Z'],
	C: ['Z','X']
}

const relation_task2 = {
	X: 'lost',
	Y: 'draw',
	Z: 'win'
}

const points = {
	win: 6,
	draw: 3,
	lost: 0,
	X: 1,
	Y: 2,
	Z: 3
}

let result = 0

function checkWin(opponent, myTurn){
  if (relation[opponent][0] === myTurn){
	  return 'draw'}
	else if(relation[opponent][1] === myTurn){
		return 'win'}
	else return 'lost'
}

function calcPoints(roundResult, total, myTurn){
	return total += points[roundResult] + points[myTurn]
}

function calcMyTurn(opponentTurn, expectedResult){
if (expectedResult === 'win'){
	console.log('Expect to win')
	return relation[opponentTurn][1]
	}
	else if(expectedResult === 'draw'){
	console.log('Expect to draw')
		return relation[opponentTurn][0] 
	}
	else {
		console.log('Expect to lose')
		const myTurns = Object.keys(relation_task2)
		const myTurnNotWin = myTurns.filter(el => el !== relation[opponentTurn][1])
		const myTurnNotDraw = myTurnNotWin.filter(el => el !== relation[opponentTurn][0])
		return myTurnNotDraw[0]
}}

//Task 1 --> inputArray(opponentTurn, myTurn)

inputArray.forEach((el,index) => {
	let string = el.trim() 
	const iA = string.split(' ') //create intern Array

	const roundOutcome = checkWin(iA[0], iA[1])
	console.log(`Runde ${index}: ${roundOutcome}`)

	result = calcPoints(roundOutcome, result, iA[1])
	console.log(result)

})

console.log('Result Task1: ', result)


// Task 2 - inputArray(opponent, result) 
result = 0
inputArray.forEach((el,i) => {
	let string = el.trim()
	const iA = string.split(' ')
 const myTurn = calcMyTurn(iA[0], relation_task2[iA[1]])
	result = calcPoints(relation_task2[iA[1]]   , result, myTurn  )
	console.log('Points here ',result)

})

console.log('Points round 2: ', result)
