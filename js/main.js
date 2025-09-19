

/* Ejercicio 1 */

// let number1 = 0;
// let string1 = "String";
// let boolean1 = false; 

// console.log("number:", number1);
// console.log("string:", string1);
// console.log("boolean:", boolean1);




/* Ejercicio 2 */

// cantidad de números que desea sumar - parseado a int
let cantidad = parseInt(prompt("Ingresa la cantidad de números que desea sumar:"));
console.log("los números a sumar son:", cantidad);

let suma = 0;

for (let i = 0; i < cantidad; i++) {
  let numero = parseFloat(prompt(`Ingresa el número ${i+1}:`));
  suma += numero;
};

alert("La suma final es: " + suma);