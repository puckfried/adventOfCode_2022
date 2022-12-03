import fs from 'fs'


//Initialisierung
//const data = fs.readFileSync('./test_input', 'utf-8').trimEnd()
const data = fs.readFileSync('./input', 'utf-8').trimEnd()
const array = data.split('\n')
let sum = 0

function buildRucksacks(inputString){
	const rLeft = inputString.slice(0,(inputString.length/2))
	const rRight = inputString.slice(inputString.length/2)
	return [rLeft, rRight]
}


function searchDouble(string1, string2){
 	for (const char of string1) {
		if (string2.includes(char)) return char
	}
}


function countPoints(char){
	const code =  char.charCodeAt(0)
	if (code > 96) return code-96
	else return code-38
}

//additional Functions Task 2
function grouping3(array){
	const arrayGrouped = []
	
	array.forEach((el,i) => {
		if (   !arrayGrouped[Math.floor(i/3)]   ) {
			arrayGrouped[Math.floor(i/3)] = []
		}
		arrayGrouped[Math.floor(i/3)].push(el)
	})

	return arrayGrouped
}

function findTriple(string1, string2, string3){
	for (const char of string1){
		if (string2.includes(char)){
			if (string3.includes(char)) return char
		}
	}
}

//Schleife Task 1
array.forEach(el => {
	const [left, right] = buildRucksacks(el)
	const double = searchDouble(left, right)
	const points = countPoints(double)
	sum += points
})

console.log('Result Task1: ', sum)


// Task 2
const groupedArray = grouping3(array)
sum = 0
groupedArray.forEach( (el,i) => {
	const badge = findTriple(el[0], el[1], el[2])
	console.log(`Round ${i}: ${badge} `)
	const points = countPoints(badge)
	sum += points
})

console.log('Result Task 2: ', sum)
