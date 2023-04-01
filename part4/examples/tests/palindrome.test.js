// el archivo de prueba importa la función a ser probada y la asigna a una variable llamada palindrome
const { palindrome } = require('../utils/for_testing');

// Los casos de prueba individual se definen con la función test. El primer parámetro de la función es
// la descripción de la prueba como una cadena. El segundo parámetro es una función, que define la funcionalidad para el caso de prueba
test('palindrome of a', () => {
  const result = palindrome('a');

  expect(result).toBe('a');
});

// Primero ejecutamos el código a probar, lo que significa que generamos un palíndromo para la cadena react. A continuación,
// verificamos los resultados con la función expect. Expect envuelve el valor resultante en un objeto que ofrece una colección de
// funciones matcher, que pueden usarse para verificar la exactitud del resultado. Dado que en este caso de prueba estamos comparando dos cadenas,
// podemos usar el comparador toBe.
test('palindrome of react', () => {
  const result = palindrome('react');

  expect(result).toBe('tcaer');
});

test('palindrome of releveler', () => {
  const result = palindrome('releveler');

  expect(result).toBe('releveler');
});
