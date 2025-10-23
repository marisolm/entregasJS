/// cantidad de números que desea sumar - parseado a int
function calculadora() {
  let continuar = true;
  let resultados = [];
  let verSumaTotal = true;

  //continua mientras el usuario desee hacer más operaciones
  while(continuar){
    let cantidad = parseInt(prompt("Ingresa la cantidad de números que desea sumar:"));
    console.log("los números a sumar son:", cantidad);

    let suma = 0;

    for (let i = 0; i < cantidad; i++) {
      let numero = parseInt(prompt("Ingresa el número " +(i+1) +":"));
      suma += numero;

    };

    alert("La suma final es: " + suma);
    resultados.push(suma); // acumula los resultados para la suma final 
    continuar = confirm ("Desea hacer otra suma?");
  }

  //mostrar la suma de las operaciones realizadas 
  verSumaTotal = confirm ("Desea sumar los resultados de todas las operaciones realizadas?");
  
  if (verSumaTotal){
    suma = 0; 
    for (let i = 0; i < resultados.length; i++){
      suma = suma + resultados[i];
    }
    alert ("la suma total es " + suma);
  }
};