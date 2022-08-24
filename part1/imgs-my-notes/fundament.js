//VARIABLES
/*const x = 1 let y = 5

console.log (x, y) // 1, 5 es impreso
y += 10
console. log (x, y) // 1, 15 es impreso
y = 'sometext'
console.log(x, y) // 1, sometext es impreso
//x = 4 // provoca un error*/


//ARRAYS
/*const t = [1, -1, 3]

t.push(5) //push()cambia el estado del array t, lo hace mutar, concat() por el contrario NO

const t2 = t.concat(5)//concat, que no agrega el elemento al array, pero crea un nuevo array en la que se incluyen el contenido del array anterior y el nuevo elemento.

console.log(t.length) // Se imprime 4 
console.log(t [1]) // -1 es impreso

// recibe una función definida usando la sintaxis de flecha como parámetro
t.forEach(value => {
  console.log (value) // se imprimen los números 1, -1, 3, 5, cada uno en la línea propia
}) 

//map crea un nuevo array, para la cual la función dada como parámetro se usa para crear los elementos.
const m1 = t.map(value => value * 2) 
//map también puede transformar el array en algo completamente diferente:
const m2 = t.map(value => '<li>' + value + '</li>')

console.log(m2)
console.log(m1) // [2, 4, 6] es impreso
console.log(t)
console.log(t2)

//Los elementos individuales de un array son fáciles de asignar a variables con la ayuda de la asignación de desestructuración.
const [first, second, ...rest] = t

console.log(first, second)  // 1, -1 es impreso
console.log(rest)          // [3, 5] es impreso*/

//OBJETOS
/*//Hay algunas formas diferentes de definir objetos en JavaScript. Un método muy común es usar objetos literales
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}

//Se hace referencia a las propiedades de un objeto usando la notación "de punto", o usando corchetes:
console.log(object1.name)         // se imprime Arto Hellas
const fieldName = 'age' 
console.log(object1[fieldName])    // 35 es impreso

//También puedes agregar propiedades a un objeto sobre la marcha usando notación de puntos o corchetes:
object1.address = 'Helsinki'
object1['secret number'] = 12341*/

//FUNCIONES
/*//funcion flecha
const sum = (p1, p2) => { //si hubiese un solo parametro se pueden excluir los parentesis de la definicion 
  console.log (p1) 
  console.log (p2) 
  return p1 + p2 
}

//llamando la funcion
const result = sum(1, 5)
console.log (result)

//Si la función solo contiene una expresión, entonces las llaves no son necesarias.
const square = p => p * p

//Esta forma es particularmente útil cuando se manipulan arrays, por ejemplo, cuando se usa el método map:
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared es ahora [1, 4, 9]

//funcion normal 
function product(a, b) {
  return a * b
}

const result1 = product(2, 6)
// result is now 12

//La otra forma de definir la función es usando una expresión de función
const average = function(a, b) {
  return (a + b) / 2
}

const result2 = average(2, 5)
// result is now 3.5*/

//METODOS DE OBJETO Y THIS
//Podemos asignar métodos a un objeto definiendo propiedades que son funciones:
/*const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {    
    console.log('hello, my name is ' + this.name)  
  },
  doAddition: function(a, b) {    
    console.log(a + b)  
  },
}
arto.greet()  // "hello, my name is Arto Hellas" es impreso

//Los métodos se pueden asignar a los objetos incluso después de la creación del objeto:
arto.growOlder = function() {  
  this.age += 1
}
console.log(arto.age)   // 35 es impreso
arto.growOlder()
console.log(arto.age)   // 36 es impreso

arto.doAddition(1, 4)        // 5 es impreso
//El método se llama de la forma habitual, utilizando el objeto arto.doAddition(1, 4) o almacenando una referencia de método en una variable y llamando al método a través de la variable: referenceToAddition(10, 15)
const referenceToAddition = arto.doAddition //referencia de metodo en una variable
referenceToAddition(10, 15)   // 25 es impreso*/

//  CLASES
//  En el siguiente ejemplo definimos una "clase" llamada Person y dos objetos Person:
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()


