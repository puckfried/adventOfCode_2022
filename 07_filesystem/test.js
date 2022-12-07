const obj = {
    '/': {
        'list': 36453, 
        'a': {
            'list2': 389347,
            'list3': 3784374 ,
            'b': {
                'test': 5000}
            } , 
            'x': {
                'hallo': 10000
            } 
        }
    }

const current = [obj['/'], obj['/']['a'], obj['/']['a']['b']]

const check = Object.entries(current[current.length-1])
current[current.length-1].hello ='Welt'



console.log(obj['/'].a.b)

function goOneUp(){
    current.pop()
}

function unknown(obj){
    if (obj.values.includes(current[current.length-1])){
        obj[current].new = 'Hallo Welt'
    }else {
        createData(obj)
    }
}

function createData(obj, name){
    obj[name] = {name}
}

// Ablauf
let fileSystem = {}

// cd $ /                          // current.push(filesystem[/])
fileSystem = {'/': {}}          // --> createData(currrent[last], {'/': {}})


//$ ls
// {},{},{}                     // createData obj?