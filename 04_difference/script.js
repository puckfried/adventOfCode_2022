import fs from 'fs'

//const data = fs.readFileSync('./input_test', 'utf-8').trimEnd()
const data = fs.readFileSync('./input', 'utf-8').trimEnd()
const array = data.split('\n')
let including = 0
let notIncluding = 0

// Without regex
// function parseData(array){
// 	return array.map( el => {
// 		const arr = el.replaceAll('-', ',').split(',')
// 		return arr.map(el => Number(el))
// 	})
// }

// Normalize Data --> [pair1Start, pair1End, pair2Start, pair2End] 
function normalize(array) {
	return array.map((el) =>{
		let result = el.match(/\d+/g)
	 	return result.map(el => Number(el))
})
}

// pair wih smaller start in front
function sortPairs(array, round) {
	return array.reduce( (acc, curr, i) => {
		if (curr[0] === curr[2]) {
			//console.log(`Similar starting - including count up --> ${curr}`)
			including += 1
			return [...acc]
		}
		else if (curr[0] > curr[2]){      // [1,1, 1,99]
			const result = [  curr[2], curr[3] , curr[0], curr[1]  ]
			//console.log(`Round ${i}: ${curr} turn around ${result}`)
			return [...acc, result]
		}
		//console.log(`Round ${i}: ${curr} stays`)
		return [...acc, curr]
	}, [])
}


const normalized  = normalize(array)
let sorted = sortPairs(normalized)
console.log('Already found: ', including,  ' - The array left over is: ', sorted.length)

sorted.forEach( el => el[1] >= el[3] ? including +=1 : notIncluding += 1)
console.log('TASK 1 --> Including: ', including, 'Not Including: ', notIncluding)

// TASK 2
including = 0
notIncluding = 0
sorted = sortPairs(normalized)
sorted.forEach( el => el[1] >= el[2] ? including +=1 : notIncluding += 1)
console.log('TASK 2 --> Overlapping: ', including, 'Not Including: ', notIncluding)