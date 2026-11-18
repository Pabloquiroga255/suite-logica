/**
 * Modulo A: Retos Logicos BairesDev
 * Funciones para simulacion de problemas de combinatoria, divisibilidad y logistica.
 */

/**
 * Valida que un valor sea un numero entero y que no sea menor al minimo.
 * Evita calculos con NaN (campo vacio), decimales o negativos.
 * @param {number} valor - Valor a validar
 * @param {string} nombre - Nombre del campo (para el mensaje de error)
 * @param {number} minimo - Valor minimo permitido
 */
function validarEntero(valor, nombre, minimo) {
  if (!Number.isInteger(valor)) {
    throw new Error(`${nombre} debe ser un numero entero (sin decimales ni campos vacios).`);
  }
  if (valor < minimo) {
    throw new Error(`${nombre} debe ser mayor o igual a ${minimo}.`);
  }
}

/**
 * Reto 1: Probabilidad de suma de 2 dados
 * @param {number} sumaObjetivo - Suma a evaluar (2 a 12)
 * @returns {{ casosFavorables: number, casosTotales: number, probabilidad: number, porcentaje: string }}
 */
export function calcularProbabilidadDados(sumaObjetivo) {
  validarEntero(sumaObjetivo, "La suma objetivo", 2);
  if (sumaObjetivo < 2 || sumaObjetivo > 12) {
    throw new Error("La suma objetivo en dos dados debe estar entre 2 y 12.");
  }

  let casosFavorables = 0;
  const casosTotales = 36; // 6 * 6

  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      if (d1 + d2 === sumaObjetivo) {
        casosFavorables++;
      }
    }
  }

  const probabilidad = casosFavorables / casosTotales;
  const porcentaje = (probabilidad * 100).toFixed(2) + "%";

  return {
    casosFavorables,
    casosTotales,
    probabilidad,
    porcentaje
  };
}

/**
 * Reto 2: Total de partidos de un torneo round-robin
 * Formula: C(n, 2) = n * (n - 1) / 2
 * @param {number} n - Cantidad de equipos (n >= 2)
 * @returns {number}
 */
export function calcularPartidosTorneo(n) {
  validarEntero(n, "La cantidad de equipos", 2);
  if (n < 2) {
    throw new Error("Se requieren al menos 2 equipos para jugar un torneo.");
  }
  return (n * (n - 1)) / 2;
}

/**
 * Reto 3: Multiplos estrictamente menores a un limite en tiempo O(1)
 * @param {number} limite - Limite superior (ej: 904)
 * @param {number} divisor - Divisor entero positivo (ej: 3)
 * @returns {number}
 */
export function contarMultiplosMenores(limite, divisor) {
  validarEntero(limite, "El limite", 1);
  validarEntero(divisor, "El divisor", 1);
  if (limite <= 1 || divisor <= 0) return 0;
  // Menores estrictos: [1, limite - 1]
  return Math.floor((limite - 1) / divisor);
}

/**
 * Reto 4: Minimo de viajes segun capacidad (Funcion Techo / Ceil)
 * @param {number} totalItems - Cantidad total de elementos a trasladar
 * @param {number} capacidadPorViaje - Capacidad maxima por viaje
 * @returns {number}
 */
export function calcularViajesMinimos(totalItems, capacidadPorViaje) {
  validarEntero(totalItems, "El total de botellas", 0);
  validarEntero(capacidadPorViaje, "La capacidad por viaje", 1);
  if (totalItems <= 0) return 0;
  if (capacidadPorViaje <= 0) {
    throw new Error("La capacidad por viaje debe ser mayor a 0.");
  }
  return Math.ceil(totalItems / capacidadPorViaje);
}

/* =============================================================
   RETOS NUEVOS (tomados del taller de 25 retos)
   ============================================================= */

/**
 * Valida que un valor sea un numero real (puede tener decimales)
 * y que no sea menor al minimo.
 * @param {number} valor - Valor a validar
 * @param {string} nombre - Nombre del campo (para el mensaje de error)
 * @param {number} minimo - Valor minimo permitido
 */
function validarNumero(valor, nombre, minimo) {
  if (!Number.isFinite(valor)) {
    throw new Error(`${nombre} debe ser un numero valido (el campo no puede estar vacio).`);
  }
  if (valor < minimo) {
    throw new Error(`${nombre} debe ser mayor o igual a ${minimo}.`);
  }
}

/**
 * Convierte pesos/dolares con decimales a centavos enteros.
 * Trabajar en centavos evita los residuos de punto flotante (ej: 0.1 + 0.2).
 * @param {number} valor - Monto con decimales (ej: 2.80)
 * @returns {number} Monto en centavos (ej: 280)
 */
function aCentavos(valor) {
  return Math.round(valor * 100);
}

/**
 * Compara dos numeros decimales con tolerancia (Cascarita 3).
 * En JS (2.80 / 8.75) * 100 da 32.00000000000001, asi que === 32 falla.
 * @param {number} a
 * @param {number} b
 * @returns {boolean} true si la diferencia es despreciable
 */
export function sonCasiIguales(a, b) {
  return Math.abs(a - b) < Number.EPSILON * 100;
}

/**
 * Reto 5: Conteo de un digito en todos los numeros de 1 a N
 * Ejemplo: del 1 al 30 el digito 1 aparece 13 veces.
 * Complejidad: O(N * cantidad de digitos de N)
 * @param {number} n - Limite superior (1 a 1.000.000)
 * @param {number} digito - Digito a buscar (0 a 9)
 * @returns {number} Total de apariciones
 */
export function contarDigito(n, digito) {
  validarEntero(n, "El limite N", 1);
  validarEntero(digito, "El digito", 0);
  if (digito > 9) {
    throw new Error("El digito debe estar entre 0 y 9.");
  }
  if (n > 1000000) {
    throw new Error("El limite N maximo es 1.000.000 para no congelar el navegador.");
  }

  const textoDigito = String(digito);
  let contador = 0;
  for (let i = 1; i <= n; i++) {
    const textoNumero = String(i);
    for (const caracter of textoNumero) {
      if (caracter === textoDigito) {
        contador++;
      }
    }
  }
  return contador;
}

/**
 * Reto 6: Problema de edades relativas
 * Pablo tiene hoy k veces la edad de su hermana. ¿En cuantos años
 * Pablo tendra exactamente el doble de la edad de ella?
 *   hermana = pablo / k
 *   pablo + t = 2 * (hermana + t)  =>  t = pablo - 2 * hermana
 * @param {number} edadPablo - Edad actual de Pablo
 * @param {number} k - Veces que Pablo es mayor que la hermana (k >= 2)
 * @returns {{ edadHermana: number, anios: number, edadPabloFutura: number, edadHermanaFutura: number }}
 */
export function calcularEdadFutura(edadPablo, k) {
  validarEntero(edadPablo, "La edad de Pablo", 1);
  validarNumero(k, "El factor k", 2);

  const edadHermana = edadPablo / k;
  const anios = edadPablo - 2 * edadHermana;

  return {
    edadHermana,
    anios,
    edadPabloFutura: edadPablo + anios,
    edadHermanaFutura: edadHermana + anios
  };
}

/**
 * Reto 7: Peso del recipiente vacio (proporciones)
 * lleno   = vacio + contenido
 * parcial = vacio + fraccion * contenido
 * Restando: contenido = (lleno - parcial) / (1 - fraccion)
 * @param {number} pesoLleno - Peso con el recipiente totalmente lleno
 * @param {number} pesoParcial - Peso con el recipiente lleno hasta la fraccion
 * @param {number} fraccion - Fraccion llenada (0 <= f < 1), ej: 0.5
 * @returns {{ vacio: number, contenido: number }}
 */
export function calcularPesoRecipiente(pesoLleno, pesoParcial, fraccion) {
  validarNumero(pesoLleno, "El peso lleno", 0);
  validarNumero(pesoParcial, "El peso parcial", 0);
  validarNumero(fraccion, "La fraccion", 0);
  if (fraccion >= 1) {
    throw new Error("La fraccion debe ser menor que 1 (si es 1 el recipiente esta lleno y no se puede despejar).");
  }
  if (pesoParcial > pesoLleno) {
    throw new Error("El peso parcial no puede ser mayor que el peso lleno.");
  }

  const contenido = (pesoLleno - pesoParcial) / (1 - fraccion);
  const vacio = pesoLleno - contenido;
  if (vacio < 0) {
    throw new Error("Los datos no son posibles: el recipiente daria un peso negativo.");
  }

  return {
    vacio: Math.round(vacio * 100) / 100,
    contenido: Math.round(contenido * 100) / 100
  };
}

/**
 * Reto 8: Diferencia de ingresos al cambiar el precio
 * Todo se calcula en centavos enteros y solo al final se pasa a dolares.
 * @param {number} q1 - Vasos vendidos antes
 * @param {number} p1 - Precio antes (centavos)
 * @param {number} q2 - Vasos vendidos despues
 * @param {number} p2 - Precio despues (centavos)
 * @returns {{ ingreso1: number, ingreso2: number, diferencia: number }} Valores en dolares
 */
export function calcularDiferenciaIngreso(q1, p1, q2, p2) {
  validarEntero(q1, "Los vasos iniciales", 0);
  validarEntero(p1, "El precio inicial", 0);
  validarEntero(q2, "Los vasos finales", 0);
  validarEntero(p2, "El precio final", 0);

  const ingreso1Centavos = q1 * p1;
  const ingreso2Centavos = q2 * p2;

  return {
    ingreso1: ingreso1Centavos / 100,
    ingreso2: ingreso2Centavos / 100,
    diferencia: (ingreso2Centavos - ingreso1Centavos) / 100
  };
}

/**
 * Reto 9: Ahorro al pagar de contado en vez de cuotas
 * Se trabaja en centavos para que 12 cuotas de 88.10 no den residuos.
 * @param {number} nCuotas - Cantidad de cuotas
 * @param {number} valorCuota - Valor de cada cuota
 * @param {number} precioContado - Precio pagando de contado
 * @returns {{ totalCuotas: number, ahorro: number }}
 */
export function calcularAhorroContado(nCuotas, valorCuota, precioContado) {
  validarEntero(nCuotas, "La cantidad de cuotas", 1);
  validarNumero(valorCuota, "El valor de la cuota", 0);
  validarNumero(precioContado, "El precio de contado", 0);

  const totalCentavos = nCuotas * aCentavos(valorCuota);
  const ahorroCentavos = totalCentavos - aCentavos(precioContado);

  return {
    totalCuotas: totalCentavos / 100,
    ahorro: ahorroCentavos / 100
  };
}

/**
 * Reto 10: Presupuesto y porcentaje inverso (incluye la Cascarita 3)
 * Si la comida es el P% del alquiler: alquiler = comida * 100 / P
 * Luego verifica con tolerancia que comida sea realmente el P% del alquiler.
 * @param {number} comida - Gasto en comida (ej: 2.80)
 * @param {number} porcentaje - Porcentaje que representa (ej: 32)
 * @returns {{ alquiler: number, porcentajeCalculado: number, comparacionEstricta: boolean, comparacionSegura: boolean }}
 */
export function calcularAlquiler(comida, porcentaje) {
  validarNumero(comida, "El gasto en comida", 0);
  validarNumero(porcentaje, "El porcentaje", 0);
  if (porcentaje === 0) {
    throw new Error("El porcentaje debe ser mayor que 0 (no se puede dividir entre 0).");
  }

  // Se divide en centavos y se redondea al centavo mas cercano
  const alquilerCentavos = Math.round((aCentavos(comida) * 100) / porcentaje);
  const alquiler = alquilerCentavos / 100;

  // Verificacion: ¿comida / alquiler * 100 es igual al porcentaje?
  const porcentajeCalculado = alquiler === 0 ? 0 : (comida / alquiler) * 100;

  return {
    alquiler,
    porcentajeCalculado,
    comparacionEstricta: porcentajeCalculado === porcentaje,
    comparacionSegura: sonCasiIguales(porcentajeCalculado, porcentaje)
  };
}
