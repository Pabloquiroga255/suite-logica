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
