
//const ingreso1 = new Ingreso('Salario', 3000);
//const ingreso2 = new Ingreso('Venta auto', 600);
//const ingreso3 = new Ingreso('bono', 900);

//const egreso1 = new Egreso('Renta', 1000);
//const egreso2 = new Egreso('Ropa', 300);


// usar push ?
const ingresos = [];
const egresos = [];


// Función para calcular el total de ingresos
const totalIngresos = () => {
let totalIngresos = 0;
for (const ingreso of ingresos) {
  totalIngresos += ingreso.valor;
}
  return totalIngresos;
};

// Función para calcular el total de egresos
const totalEgresos = () => {
let totalEgresos = 0;
for (const egreso of egresos) {
  totalEgresos += egreso.valor;
}
  return totalEgresos;
};

const formatoMoneda = (valor) => valor.toLocaleString('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2
});

const formatoPorcentaje = (valor) => valor.toLocaleString('es-MX', {
  style: 'percent',
  minimumFractionDigits: 2
});

// Función para cargar los ingresos dinámicamente
const cargarIngresos = () => {
  let ingresosHTML = ''; // Variable para almacenar el contenido HTML de los ingresos
  // Recorre el arreglo ingresos con un ciclo for of
  for (const ingreso of ingresos) {
    // Concatena el resultado de la función crearIngresoHTML con el contenido del ingreso
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  // Asigna el contenido HTML a la lista de ingresos
  document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

// Función para crear el contenido HTML de un ingreso
const crearIngresoHTML = (ingreso) => {
  // Genera el contenido HTML utilizando template strings
  const ingresoHTML = `
   <div id="lista-ingresos" class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
       <div class="derecha limpiarEstilos">
           <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
           <div class="elemento_eliminar">
              <button class="elemento_eliminar_btn">
               <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
              </button>
           </div>
       </div>
    </div>
  `;
  return ingresoHTML; // Retorna el contenido HTML del ingreso
};


//Función para cargar los egresos dinámicamente
const cargarEgresos = () => {
  let egresosHTML = ''; // Variable para almacenar el contenido HTML de los egresos
  // Recorre el arreglo egresos con un ciclo for of
  for (const Egresos of egresos) {
    // Concatena el resultado de la función crearEgresosHTML con el contenido del Egresos
    egresosHTML += crearEgresosHTML(Egresos);
  }
  // Asigna el contenido HTML a la lista de egresos
  document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

// Función para crear el contenido HTML de un Egresos
const crearEgresosHTML = (Egresos) => {
  // Genera el contenido HTML utilizando template strings
  const EgresosHTML = `
   <div id="lista-egresos" class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${Egresos.descripcion}</div>
       <div class="derecha limpiarEstilos">
           <div class="elemento_valor">-${formatoMoneda(Egresos.valor)}</div>
           <div class="elemento_eliminar">
              <button class="elemento_eliminar_btn">
               <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${Egresos.id})"></ion-icon>
              </button>
           </div>
       </div>
    </div>
  `;
  return EgresosHTML; // Retorna el contenido HTML del Egresos
};

// Función para eliminar un egreso
const eliminarEgreso = (id) => {
  // Encuentra el índice del egreso en el arreglo egresos
  const indice = egresos.findIndex(egreso => egreso.id === id);
  // Elimina el egreso del arreglo egresos
  egresos.splice(indice, 1);
  // Llama a las funciones para cargar nuevamente el cabecero y la lista de egresos
  cargarCabecero();
  cargarEgresos();
};

// Función para eliminar un egreso
const eliminarIngreso = (id) => {
  // Encuentra el índice del egreso en el arreglo egresos
  const indice = ingresos.findIndex(ingreso => ingreso.id === id);
  // Elimina el egreso del arreglo egresos
  ingresos.splice(indice, 1);
  // Llama a las funciones para cargar nuevamente el cabecero y la lista de egresos
  cargarCabecero();
  cargarIngresos();
};

// Declara la función flecha agregarDato
const agregarDato = () => {
  // Recupera el formulario con id forma
  const forma = document.getElementById('forma');
  
  // Recupera el tipo de select que seleccionó el usuario, asignando a la variable tipo el contenido del select con id tipo del formulario forma
  const tipo = forma.tipo.value;
  
  // Recupera la descripción del formulario forma y asígnalo a la variable descripción
  const descripcion = forma.descripcion.value;
  
  // Recupera el valor del formulario forma y asígnalo a la variable valor
  //const valor = parseInt(forma.valor.value);
  const valor = validarNumeroDecimal(forma.valor.value);
  
  
  // Valida que el valor de descripcion y de valor no estén vacíos
  if (descripcion !== '' && valor !== '') {
    // Valida si el valor de tipo es igual a ingreso
    if (tipo === 'ingreso') {
      // Agrega el valor de la descripcion y el valor al arreglo ingresos a través del método push e invocando a un nuevo objeto del tipo Ingreso
      ingresos.push(new Ingreso(descripcion, valor));
      // Invoca a la función cargarCabecero y CargarIngreso
      cargarCabecero();
      cargarIngresos();
      LimpiaForm();
    }
    
    // Agrega el código para el caso de egreso, si es necesario
      if (tipo === 'egreso') {
        // Agrega el valor de la descripcion y el valor al arreglo ingresos a través del método push e invocando a un nuevo objeto del tipo Ingreso
        egresos.push(new Egreso(descripcion, valor));
        // Invoca a la función cargarCabecero y CargarIngreso
        cargarCabecero();
        cargarEgresos();
        LimpiaForm();
      }  
  }
}

const LimpiaForm = () => {
  document.getElementById('forma').descripcion.value ="";
  document.getElementById('forma').valor.value =0;


}


function validarNumeroDecimal(valor) {
  // Convierte el valor a un número usando parseFloat
  var numero = parseFloat(valor);

  // Verifica si el valor es un número y si no es NaN (Not a Number)
  // y si es un valor finito (no es Infinity o -Infinity)
  // y si el valor original es igual al valor convertido a número,
  // lo que indica que no hubo errores de redondeo
  if (!isNaN(numero) && isFinite(numero) && valor == numero) {
    return numero; // El valor es un número decimal válido
  } else {
    return parseInt(numero); // El valor no es un número decimal válido
  }
}



// Función para cargar el cabecero con el presupuesto y porcentaje de egreso
const cargarCabecero = () => {
  
  let presupuesto = 0;
  let porcentajeEgreso=0;

  presupuesto = totalIngresos() - totalEgresos();
  porcentajeEgreso = totalEgresos() / totalIngresos();
 
  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
  console.log( document.getElementById('presupuesto').innerHTML);

 /* console.log(formatoMoneda(presupuesto));
  console.log(formatoPorcentaje(porcentajeEgreso));
  console.log(formatoMoneda(totalIngresos()));
  console.log(formatoMoneda(totalEgresos()));

  console.log('Total Ingresos:', totalIngresos());
  console.log('Total Egresos:', totalEgresos());*/
};

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};


function validarNumero() {
  var numero = document.getElementById("valor").value;
  var regex = /^\d+(\.\d{1,2})?$/; // Expresión regular para validar números con dos decimales

  if (!regex.test(numero)) {
    alert("Por favor, ingresa un número válido con dos decimales.");
    document.getElementById("valor").value =0;
  } else {
    // El número es válido, puedes continuar con la lógica deseada
    // por ejemplo, enviar los datos al servidor o realizar alguna acción
    console.log("Número válido: " + numero);
  }
}




