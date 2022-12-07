import fs from 'fs'

const data = fs.readFileSync('./input', 'utf8').trimEnd()
let marker = []
let stop = 0

// size differs of set and array, a doublet is inside
function checkMarker(marker){
    const testSet = new Set(marker)
    return marker.length === testSet.size
}


function setMarker(marker, newNum, markerMaxLength){
    if ( marker.push(newNum) > markerMaxLength) marker.shift()          // add new Item and keep max length
    if (marker.length === markerMaxLength && checkMarker(marker)){      //  check success condition
        return {marker, done: true}
    }
    return {marker, done:false}                                         
    }

// TASK 1 Check for Signal (marker.length === 4)

for (let i=0; i<data.length; i++){
    const result = setMarker(marker, data[i], 4)
    console.log('Getestet wird jetzt: ', data[i])
    await new Promise( resolve => setTimeout(resolve, 20))
    console.log('Der Marker ist jetzt: ', marker)
    if (result.done) {
        stop = i +1
        break}
    marker = [...result.marker]
}

console.log('TASK 1 --> Found something at: ', stop, '\nFinal marker looks like: ', marker)




// TASK 2 - Check for Message (marker.length === 14)

for (let i=0; i<data.length; i++){
    const result = setMarker(marker, data[i], 14)
    if (result.done) {
        stop = i +1
        break}
    marker = [...result.marker]
}
console.log('TASK 2 --> Found something at: ', stop, '\nFinal marker looks like: ', marker)

