//FUNCTIONAL PROGRAMING IN JAVASCRIPT
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const mascotas = [
	{nombre: 'Puchini', edad: 12, tipo: 'perro'},
	{nombre: "Chanchito feliz", edad: 3, tipo: 'perro'},
	{nombre: 'Pulga', edad: 10, tipo: 'perro'},
	{nombre: 'Pelusa', edad: 16, tipo: 'gato'},
]

//Filter: devuelve un arreglo de menor o igual cantidad de elementos que el arreglo con el que trabajamos inicialmente
//los elemnetos del nuevo arreglo seran los que cumplan con la condicion de la funcion 
const numerosFiltrados = numeros.filter(num => num < 5) 	

const perros = mascotas.filter(mas => mas.raza === 'perro')

//Map: permite transformar los elementos de un arreglo, devulve un arreglo de la misma logitud que el arreglo con el que se trabajo
//inicialmente pero con todos los elementos cambiados, segun sea la funcion que se le aplique a estos

//multiplicar por 2
const multiplicados = numeros.map(num => num = num * 2)
//a parejas de arreglos
const parejas = numeros.map(num => [num, num])
//edades
const edades = mascotas.map(mas => mas.edad)

//Reduce: permite ejecutar funciones reducer las cuales reciben dos argumentos; el primero es un valor que esta siendo acumulado
// y el segundo es el elemento del arreglo que se esta iterando (valor actual). Esta funcion devulve el nuevo elemento 
// que se va a estar acumulando (nuevo acumulador)
// cosnt reducer = (acumulador, valorActual) => nuevoAcumulador

//sumatoria de un arreglo: primer parametro es la funcion que recibe el reducer, segundo parametro es el valor inicial del acumulador
const resultado = numeros.reduce((acum, act) => acum + act, 0)

//indexacion para evitar llamar al metodo find multiples veces
const indexed = mascotas.reduce((acum, act) => ({
		...acum,
		[act.nombre]: act,
}), {})

const anidado = [1, [2, 3], 4, [5]]
const plano = anidado.reduce((acum, act) => acum.concat(act), [])
console.log(plano)
