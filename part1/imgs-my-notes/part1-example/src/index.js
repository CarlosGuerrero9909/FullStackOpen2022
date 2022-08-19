import React from 'react'
import ReactDOM from 'react-dom'


/*Funcion sin parametros que se asigna a una variable const App*/
/*Como la esta funcion tiene solo una expresion se puede escribir sin el return*/
/*const App = () => ( 
  <div>
    <p>Hello world</p> 
  </div>
)*/

//example 2
/*JSX permite escribir etiqutas de html,este se incluye por efecto con create-react-app*/
/*const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>
  )
}*/

//example 3
/*const Hello = () => {  
  return (    
    <div>      
      <p>Hello world</p>    
    </div>  
  )
}

[>Hemos definido un nuevo componente Hello y lo usamos dentro del componente App. <]
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />    
      <Hello />    
      <Hello />    
    </div>
  )
}*/

//example 4
//Es posible pasar datos a componentes usando los llamados props.
const Hello = (props) => {  
  return (    
    <div>      
      <p>Hello {props.name}, you are {props.age} years old</p>    
    </div>  
  )
}

/*Nombres de los componentes con primera en mayuscula*/
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+age}/>    
      <Hello name={name} age={age}/>    
    </div>
  )
}


/*Se evalúa cualquier código JavaScript entre llaves y el resultado de esta evaluación se incrusta en el lugar definido en el HTML producido por el componente. */
/*Componente de react con el nombre App, y el comando en la linea final*/
ReactDOM.render(<App />, document.getElementById('root'))
